const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// =========================================================================
// 🔐 MIDDLEWARE DE PROTECCIÓN
// =========================================================================
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(403).json({ success: false, error: 'Acceso denegado: Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ success: false, error: 'Token inválido o expirado' });
    req.user = user;
    next();
  });
};

// =========================================================================
// 🔥 INICIALIZACIÓN DE FIREBASE
// =========================================================================
let db;
try {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
  db = getFirestore();
  console.log("🔥 [SYSTEM] Conexión establecida con éxito a Google Firebase Firestore");
} catch (error) {
  console.error("❌ [ERROR] Falló la inicialización de Firebase:", error.message);
}

// =========================================================================
// 💳 INICIALIZACIÓN DE MERCADO PAGO
// =========================================================================
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

// =========================================================================
// 🛣️ ENDPOINT: GUARDAR RESERVACIONES (PÚBLICO)
// =========================================================================
app.post('/api/reservaciones', async (req, res) => {
  try {
    const { nombre, apellido, telefono, correo, fecha, horaInicio, tipoEvento, locacion, direccion, paymentType, packageType, extraHours, peopleRange } = req.body;

    // 1. VERIFICACIÓN DE CAMPOS MANDATORIOS
    if (!nombre || !telefono || !correo || !fecha || !horaInicio || !direccion) {
      return res.status(400).json({ success: false, error: 'Faltan campos obligatorios para agendar.' });
    }

    // 2. SANITIZACIÓN ROBUSTA (ANTI XSS / SQLI)
    // Usamos validator.escape para reemplazar <, >, &, ', " y / con entidades HTML.
    const cleanNombre = validator.escape(validator.trim(String(nombre)));
    const cleanApellido = validator.escape(validator.trim(String(apellido || '')));
    const cleanCorreo = validator.normalizeEmail(validator.trim(String(correo)));
    const cleanTelefono = String(telefono).replace(/\D/g, '').slice(0, 10);
    const cleanDireccion = validator.escape(validator.trim(String(direccion)));
    const cleanTipoEvento = validator.escape(validator.trim(String(tipoEvento || '')));
    const cleanLocacion = validator.escape(validator.trim(String(locacion || '')));
    
    // 3. VALIDACIÓN ESTRICTA
    if (!validator.isLength(cleanNombre, { min: 2, max: 100 })) {
      return res.status(400).json({ success: false, error: 'Nombre inválido.' });
    }
    if (!validator.isEmail(cleanCorreo)) {
      return res.status(400).json({ success: false, error: 'Correo electrónico inválido.' });
    }
    if (!validator.isLength(cleanTelefono, { min: 10, max: 10 })) {
      return res.status(400).json({ success: false, error: 'El teléfono debe tener 10 dígitos.' });
    }
    
    if (!validator.isDate(fecha, { format: 'YYYY-MM-DD' })) {
      return res.status(400).json({ success: false, error: 'Formato de fecha inválido.' });
    }

    // 4. CÁLCULO SEGURO EN EL BACKEND
    let serviceBasePrice = packageType === 'Premium' ? 7500 : 5500;
    const extraHoursCost = Number(extraHours || 0) * 1200;

    let peopleAdditionalCost = 0;
    if (peopleRange === '100-200') peopleAdditionalCost = 3000;
    else if (peopleRange === '200-300') peopleAdditionalCost = 5500;
    else if (peopleRange === '300+') peopleAdditionalCost = 7500;

    const totalCalculado = serviceBasePrice + extraHoursCost + peopleAdditionalCost;
    const anticipoCalculado = 1500;
    const montoPagarCalculado = paymentType === 'completo' ? totalCalculado : anticipoCalculado;

    const nuevaReservacion = {
      tipoItem: 'Servicio DJ',
      cliente: { nombre: cleanNombre + ' ' + cleanApellido, telefono: cleanTelefono, correo: cleanCorreo },
      logistica: { 
        fecha, horaInicio, tipoEvento: cleanTipoEvento, locacion: cleanLocacion, 
        direccion: cleanDireccion, 
        packageType, extraHours, peopleRange 
      },
      financiero: { totalEvent: totalCalculado, montoCobradoOnline: montoPagarCalculado, tipoPago: paymentType, estatus: 'Pendiente de Pago' },
      fechaRegistro: new Date().toISOString()
    };

    const docRef = await db.collection('reservaciones').add(nuevaReservacion);

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{
          id: docRef.id,
          title: paymentType === 'completo' ? `Pago Completo Show DJ - ${tipoEvento}` : `Anticipo Fecha Show DJ - ${tipoEvento}`,
          quantity: 1,
          unit_price: Number(montoPagarCalculado),
          currency_id: 'MXN'
        }],
        back_urls: {
          success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reserva-exitosa`,
          failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reserva-fallida`,
          pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/`
        },
        external_reference: docRef.id
      }
    });

    res.status(201).json({ success: true, message: 'Lead guardado.', id: docRef.id, init_point: result.init_point });
  } catch (error) {
    console.error("❌ Error en servidor:", error);
    res.status(500).json({ success: false, error: 'Error interno en el servidor.' });
  }
});

// =========================================================================
// 🛒 ENDPOINT: COMPRAR CABINA (PÚBLICO)
// =========================================================================
app.post('/api/comprar-cabina', async (req, res) => {
  try {
    const { cabinaId, nombre, precioStr } = req.body;
    if (!cabinaId || !nombre || !precioStr) {
      return res.status(400).json({ success: false, error: 'Faltan datos de la cabina.' });
    }

    const cleanNombre = validator.escape(validator.trim(String(nombre)));
    const precioNumerico = Number(String(precioStr).replace(/,/g, ''));

    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      return res.status(400).json({ success: false, error: 'Precio inválido.' });
    }

    const docRef = await db.collection('ventas_cabinas').add({
      cabinaId,
      nombre: cleanNombre,
      precio: precioNumerico,
      fechaRegistro: new Date().toISOString(),
      estatus: 'Pendiente de Pago'
    });

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{
          id: docRef.id,
          title: `Compra de ${cleanNombre}`,
          quantity: 1,
          unit_price: precioNumerico,
          currency_id: 'MXN'
        }],
        back_urls: {
          success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/compra-tu-cabina`,
          failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/compra-tu-cabina`,
          pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/compra-tu-cabina`
        },
        external_reference: docRef.id
      }
    });

    res.status(201).json({ success: true, init_point: result.init_point });
  } catch (error) {
    console.error("❌ Error en compra de cabina:", error);
    res.status(500).json({ success: false, error: 'Error interno en el servidor.' });
  }
});

// =========================================================================

// =========================================================================
// 📅 ENDPOINT: FECHAS OCUPADAS (PÚBLICO)
// =========================================================================
app.get('/api/fechas-ocupadas', async (req, res) => {
  try {
    const snapshot = await db.collection('reservaciones').get();
    const ocupadas = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const isConfirmed = data.financiero?.estatus === 'Apartado Confirmado';
      const isManual = data.tipoItem === 'Bloqueo Manual';
      
      if ((isConfirmed || isManual) && data.logistica && data.logistica.fecha && data.logistica.horaInicio) {
        ocupadas.push({
          fecha: data.logistica.fecha,
          horaInicio: data.logistica.horaInicio,
          horasTotales: data.logistica.horasTotales || (5 + Number(data.logistica.extraHours || 0))
        });
      }
    });
    res.status(200).json({ success: true, data: ocupadas });
  } catch (error) {
    console.error('Error al obtener fechas ocupadas:', error);
    res.status(500).json({ success: false, error: 'Error al obtener fechas' });
  }
});

// 🔐 ENDPOINT: LOGIN
// =========================================================================
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  const passwordValido = await bcrypt.compare(password, process.env.ADMIN_HASH);

  if (email === process.env.ADMIN_EMAIL && passwordValido) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: 'Credenciales inválidas.' });
  }
});

// =========================================================================
// 🛣️ RUTAS PROTEGIDAS (Admin)
app.post('/api/admin/bloquear-fecha', verificarToken, async (req, res) => {
  try {
    const { fecha, horaInicio, horasTotales, notas } = req.body;
    const bloqueo = {
      tipoItem: 'Bloqueo Manual',
      logistica: { fecha, horaInicio, horasTotales: Number(horasTotales) },
      notas: notas || '',
      fechaRegistro: new Date().toISOString()
    };
    const docRef = await db.collection('reservaciones').add(bloqueo);
    res.status(201).json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al bloquear fecha.' });
  }
});

// =========================================================================
app.get('/api/admin/ventas', verificarToken, async (req, res) => {
  try {
    const snapshot = await db.collection('reservaciones').orderBy('fechaRegistro', 'desc').get();
    const ventas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data: ventas });
  } catch (error) {
    res.status(500).json({ success: false, error: 'No se pudo extraer el historial.' });
  }
});

app.post('/api/admin/blog', verificarToken, async (req, res) => {
  try {
    const { titulo, contenido, imagenUrl } = req.body;
    const nuevoPost = { titulo, autor: 'Gustavo Delgadillo', contenido, imagenUrl, fechaPublicacion: new Date().toISOString() };
    const docRef = await db.collection('blog').add(nuevoPost);
    res.status(201).json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al registrar la nota.' });
  }
});

app.delete('/api/admin/blog/:id', verificarToken, async (req, res) => {
  try {
    await db.collection('blog').doc(req.params.id).delete();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar.' });
  }
});

// =========================================================================
// 📝 RUTAS PÚBLICAS
// =========================================================================
app.get('/api/blog', async (req, res) => {
  try {
    const snapshot = await db.collection('blog').orderBy('fechaPublicacion', 'desc').get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'No se pudo obtener el blog.' });
  }
});

app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    const { query } = req;
    const topic = query.topic || query.type;
    if (topic === "payment") {
      const paymentId = query.id || query['data.id'];
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
      });
      if (response.ok) {
        const paymentData = await response.json();
        if (paymentData.status === "approved") {
          await db.collection('reservaciones').doc(paymentData.external_reference).update({
            'financiero.estatus': 'Apartado Confirmado'
          });
        }
      }
    }
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('Error');
  }
});

// =========================================================================
// 🌐 SERVIR FRONTEND (Opción A)
// =========================================================================
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  }
});

// =========================================================================
// 🚀 ARRANQUE
// =========================================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 [SERVER] Seguro y corriendo en puerto ${PORT}`));