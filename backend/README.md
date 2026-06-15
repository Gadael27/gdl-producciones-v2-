# Guía del Backend - GDL Producciones

El backend actúa como una API intermediaria segura entre el Frontend de React, la base de datos (Firebase), y la pasarela de pagos (Mercado Pago).

## Arquitectura de Seguridad

*   **Helmet:** Usado para configurar cabeceras HTTP de seguridad básicas (prevención de XSS y Clickjacking).
*   **CORS:** Configurado para aceptar solicitudes exclusivamente desde dominios permitidos (el frontend de producción y el entorno local `http://localhost:5173`).
*   **Express JSON Middleware:** Para analizar eficientemente y de forma nativa los payloads entrantes.

## Endpoints Principales (`server.js`)

Todas las rutas se definen bajo el prefijo `/api`:

### 1. `POST /api/reservaciones`
El núcleo comercial del sistema.
*   **Recepción:** Recibe el formulario de Cotización procesado (`formData`, `totalEvent`, `paymentType`, `montoPagar`).
*   **Validación:** Chequeo estricto del lado del servidor usando la librería `validator` (Ej. sanitiza el correo, verifica longitud mínima del teléfono) para evitar inyección de datos impuros o modificaciones maliciosas desde herramientas de desarrollo del navegador.
*   **Lógica Mercado Pago:** Inicia una nueva Preferencia de Mercado Pago mediante `new Preference(client).create()`. Se envía un token único por transacción.
*   **Integración Firebase:** Crea un documento de estatus *"Pendiente"* en la colección `reservaciones` asociándole el `preferenceId` generado por Mercado Pago. Esto bloquea la fecha temporalmente.
*   **Respuesta:** Devuelve el URL de inicialización de checkout (`init_point`) de Mercado Pago hacia donde el frontend debe redirigir al usuario.

### 2. `GET /api/fechas-ocupadas`
*   **Propósito:** Consulta a Firestore las fechas de las reservaciones que tienen estatus *"Pendiente"* o *"Pagado"*.
*   **Función:** Le sirve al `Date picker` del frontend (en `Cotizacion.jsx`) para bloquear visualmente los días y horarios que ya no están disponibles, evitando conflictos de "Overbooking".

### 3. Webhooks y Sincronización de Pagos (Si es implementado)
El sistema puede recibir *webhooks* de Mercado Pago confirmando el pago. Este script de webhook (ej. `POST /api/webhook`) se encargaría de buscar la reservación por su `preference_id` y actualizar su estatus en Firestore a *"Pagado"*, enviando un email confirmatorio.

### 4. `POST /api/admin/login` y `GET /api/admin/reservaciones`
Provee una capa de autenticación básica (vía Token/Contraseña estática) para que los administradores extraigan la data de Firebase al panel `Admin.jsx` en la interfaz.

## Configuración de Variables de Entorno (`.env`)

Crea un archivo `.env` en este directorio con la siguiente estructura (reemplazando los valores reales):

\`\`\`env
# Puerto local
PORT=5000

# Firebase Admin SDK Credentials (JSON Format convertido a String base64 o variables separadas)
FIREBASE_PROJECT_ID="gdl-producciones-db"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxx@gdl-producciones-db.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIE...\\n-----END PRIVATE KEY-----\\n"

# Mercado Pago API Keys
MERCADOPAGO_ACCESS_TOKEN="TEST-1234567890..." # Usa las TEST keys en local, y las APP_USR reales en Prod

# Frontend URL (Para configurar CORS adecuadamente)
FRONTEND_URL="http://localhost:5173" 
# En producción debe ser: FRONTEND_URL="https://midominio.com"
\`\`\`
