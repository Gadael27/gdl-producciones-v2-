import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import { addDays, setHours, setMinutes } from 'date-fns';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { 
  ShieldCheck, CreditCard, Clock, CheckCircle, AlertTriangle, 
  MapPin, User, Phone, Mail, Calendar, Users, Home, 
  Package, Sparkles, MessageSquare, Check
} from 'lucide-react';
import InputField from '../components/InputField';

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function Cotizacion() {
  
  // ESTADOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', telefono: '', correo: '', 
    fecha: addDays(new Date(), 2),
    horaInicio: setHours(setMinutes(addDays(new Date(), 2), 0), 14), tipoEvento: 'Boda', 
    locacion: 'Interior', calleYNumero: '', colonia: '', alcaldia: '', codigoPostal: '', detalles: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ESTADOS DE NEGOCIO
  const [packageType, setPackageType] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('paquete');
    return ['Base', 'Pro', 'Premium', 'Custom'].includes(p) ? p : 'Base';
  });
  const [extraHours, setExtraHours] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('paquete') === 'Premium' ? 2 : 0;
  }); 
  const [peopleRange, setPeopleRange] = useState('10-100');
  const [paymentType, setPaymentType] = useState('anticipo'); 

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isTimeSlotBlocked, setIsTimeSlotBlocked] = useState(false);

  // AUTOCOMPLETADO




  
  const [dbEvents, setDbEvents] = useState([]);
  const [excludedDates, setExcludedDates] = useState([]);

  useEffect(() => {
    const fetchOcupadas = async () => {
      try {
        const url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${url}/api/fechas-ocupadas`);
        const data = await res.json();
        if (data.success && data.data) {
          const parsedEvents = data.data.map(e => {
            const partes = e.fecha.split('-');
            const [evHour, evMin] = e.horaInicio.split(':').map(Number);
            const startMs = new Date(partes[0], partes[1] - 1, partes[2], evHour, evMin, 0).getTime();
            const endMs = startMs + (e.horasTotales * 3600000);
            
            // Lógica avanzada de buffers: si termina de madrugada (0 a 10 am), 8 horas de buffer total (3 traslado + 5 descanso)
            const endDate = new Date(endMs);
            const endHour = endDate.getHours();
            const bufferMs = (endHour >= 0 && endHour <= 10) ? (8 * 3600000) : (3 * 3600000);
            const endWithBufferMs = endMs + bufferMs;
            
            return { startMs, endWithBufferMs };
          });
          setDbEvents(parsedEvents);
          // Ya no bloqueamos días enteros, dejamos que la validación de horas haga el trabajo
          setExcludedDates([]);
        }
      } catch (err) {
        console.error('Error fetching fechas ocupadas:', err);
      }
    };
    fetchOcupadas();
  }, []);




  // DETECTOR DE COLISIONES
  useEffect(() => {
    const checkCollision = () => {
      if (!formData.fecha || !formData.horaInicio) return;
      const selectedDate = formData.fecha.toISOString().split('T')[0];
      const selHour = formData.horaInicio.getHours();
      const selMin = formData.horaInicio.getMinutes();
      const startMinutes = selHour * 60 + selMin;
      const totalDurationMinutes = (5 + extraHours) * 60;
      const endMinutes = startMinutes + totalDurationMinutes;

      const sameDayEvents = dbEvents.filter(e => e.fecha === selectedDate);
      let isBlocked = false;

      for (let event of sameDayEvents) {
        const [evHour, evMin] = event.horaInicio.split(':').map(Number);
        const evStartMinutes = evHour * 60 + evMin;
        const evEndMinutesWithTransit = evStartMinutes + (event.horasTotales * 60) + 180;

        if (
          (startMinutes >= evStartMinutes && startMinutes < evEndMinutesWithTransit) ||
          (endMinutes > evStartMinutes && endMinutes <= evEndMinutesWithTransit) ||
          (startMinutes <= evStartMinutes && endMinutes >= evEndMinutesWithTransit)
        ) {
          isBlocked = true;
          break;
        }
      }
      setIsTimeSlotBlocked(isBlocked);
    };
    checkCollision();
  }, [formData.fecha, formData.horaInicio, extraHours, dbEvents]);

  // SDK MERCADO PAGO
  useEffect(() => {
    const mpScript = document.createElement('script');
    mpScript.src = 'https://sdk.mercadopago.com/js/v2';
    mpScript.async = true;
    mpScript.onload = () => {};
    document.body.appendChild(mpScript);
    return () => { document.body.removeChild(mpScript); };
  }, []);

  // VALIDACIONES
  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
      case 'apellido':
        if (!value.trim()) return 'Este campo es obligatorio';
        if (value.trim().length < 2) return 'Mínimo 2 caracteres';
        return '';
      case 'telefono':
        if (!value) return 'Teléfono obligatorio';
        if (!/^\d{10}$/.test(value)) return '10 dígitos requeridos';
        return '';
      case 'correo':
        if (!value) return 'Correo obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo inválido';
        return '';
      case 'direccion':
        if (!value.trim()) return 'Dirección obligatoria';
        return '';
      default: return '';
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const isFormValid = () => {
    const newErrors = {};
    ['nombre', 'apellido', 'telefono', 'correo', 'calleYNumero', 'colonia', 'alcaldia', 'codigoPostal'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched({ nombre: true, apellido: true, telefono: true, correo: true, calleYNumero: true, colonia: true, alcaldia: true, codigoPostal: true });
    return Object.keys(newErrors).length === 0 && !isTimeSlotBlocked;
  };

  const handlePhoneChange = (e) => handleChange('telefono', e.target.value.replace(/\D/g, '').slice(0, 10));



  const handlePackageSelect = (pkg) => {
    setPackageType(pkg);
    if (pkg === 'Premium') setExtraHours(2);
  };

  // CÁLCULOS
  const calculateTotal = () => {
    let serviceBasePrice = 5500;
    if (packageType === 'Base') serviceBasePrice = 5500;
    else if (packageType === 'Pro') serviceBasePrice = 7500;
    else if (packageType === 'Premium') serviceBasePrice = 7500; // El costo llega a 9900 por las 2 horas extra forzosas
    else if (packageType === 'Custom') serviceBasePrice = 5500;
    const extraHoursCost = extraHours * 1200;
    let peopleAdditionalCost = 0;
    if (peopleRange === '100-200') peopleAdditionalCost = 3000;
    else if (peopleRange === '200-300') peopleAdditionalCost = 5500;
    else if (peopleRange === '300+') peopleAdditionalCost = 7500;

    const totalEvent = serviceBasePrice + extraHoursCost + peopleAdditionalCost;
    const anticipo = 1500;
    const saldoPendiente = totalEvent - anticipo;
    const montoPagar = paymentType === 'completo' ? totalEvent : anticipo;

    return { totalEvent, extraHoursCost, peopleAdditionalCost, anticipo, saldoPendiente, montoPagar };
  };

  const { totalEvent, extraHoursCost, peopleAdditionalCost, saldoPendiente, montoPagar } = calculateTotal();

  

  const handleSubmitContract = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const phoneNumber = parsePhoneNumberFromString(formData.telefono, 'MX');
    if (!phoneNumber || !phoneNumber.isValid()) {
      alert('Número de teléfono inválido. Asegúrate de incluir la lada correcta.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reservaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, telefono: phoneNumber.format('E.164'), direccion: `${formData.calleYNumero}, Col. ${formData.colonia}, Alc/Mun ${formData.alcaldia}, CP ${formData.codigoPostal}`, totalEvent, paymentType, montoPagar })
      });
      const data = await response.json();
      if (data.success && data.init_point) {
        setIsRedirecting(true);
        setTimeout(() => { window.location.href = data.init_point; }, 2200);
      } else {
        alert('Error al procesar la reserva.');
      }
    } catch {
      alert('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#121230] to-[#0d0d2a] py-24 px-4 font-sans text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@300;400;600;700;800&display=swap');
        .font-cyber { font-family: 'Bangers', cursive; letter-spacing: 2px; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 px-5 py-2 rounded-full mb-5 text-cyan-400 text-sm font-bold tracking-widest">
            <Sparkles size={14} /> RESERVA TU FECHA AHORA
          </div>
          <h1 className="font-cyber text-4xl md:text-6xl m-0 leading-tight bg-gradient-to-br from-white via-cyan-400 to-pink-500 bg-clip-text text-transparent">
            SISTEMA DE RESERVAS
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mt-4 text-base leading-relaxed">
            Completa tu información y aparta tu fecha. El pago se procesa de forma segura vía Mercado Pago.
          </p>
        </div>

        <form onSubmit={handleSubmitContract} className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8">
          
          {/* ========== COLUMNA IZQUIERDA ========== */}
          <div className="flex flex-col gap-8">

            {/* SECCIÓN 3: CONFIGURACIÓN DEL PAQUETE */}
            <div className="bg-gradient-to-br from-[#0a0a1a]/90 to-[#070714]/95 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Package size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-cyber text-2xl m-0 text-white">TU PAQUETE</h2>
                  <p className="text-gray-400 text-xs mt-1">Personaliza tu experiencia</p>
                </div>
              </div>

              {/* PAQUETES (CON DISEÑO PREMIUM MEJORADO) */}
              <div className="mb-6">
                <label className="text-gray-300 text-sm font-semibold uppercase tracking-wide block mb-3">Selecciona tu Paquete</label>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                  
                  {/* PAQUETE BASE */}
                  <div onClick={() => handlePackageSelect('Base')} className={`p-5 rounded-2xl border-2 cursor-pointer select-none transition-all duration-300 relative flex flex-col ${packageType === 'Base' ? 'border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(0,242,254,0.15)]' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
                    <div className="text-xl font-black text-cyan-400 mb-1">BASE</div>
                    <div className="text-2xl font-black text-white mb-4">$5,500 <span className="text-xs font-normal text-gray-500">MXN</span></div>
                    <ul className="text-sm text-gray-200 font-medium space-y-3 flex-grow">
                      <li className="flex items-center gap-2"><Check size={16} className="text-cyan-400 shrink-0"/> 5 Horas de música continua</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-cyan-400 shrink-0"/> Sonido para hasta 80 personas</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-cyan-400 shrink-0"/> Cabina DJ iluminada</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-cyan-400 shrink-0"/> Luces básicas de pista</li>
                    </ul>
                  </div>

                  {/* PAQUETE PRO */}
                  <div onClick={() => handlePackageSelect('Pro')} className={`p-5 rounded-2xl border-2 cursor-pointer select-none transition-all duration-300 relative flex flex-col ${packageType === 'Pro' ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_25px_rgba(255,0,127,0.2)]' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[9px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                      Nuevo
                    </div>
                    <div className="text-xl font-black text-pink-500 mb-1">PRO</div>
                    <div className="text-2xl font-black text-white mb-4">$7,500 <span className="text-xs font-normal text-gray-500">MXN</span></div>
                    <ul className="text-sm text-white font-semibold space-y-3 flex-grow drop-shadow-md">
                      <li className="flex items-center gap-2"><Check size={16} className="text-pink-400 shrink-0 drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]"/> 5 Horas de música continua</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-pink-400 shrink-0 drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]"/> Sonido potente (150 personas)</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-pink-400 shrink-0 drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]"/> Luces robóticas de antro</li>
                      <li className="flex items-center gap-2"><Check size={16} className="text-pink-400 shrink-0 drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]"/> Máquina de humo para ambiente</li>
                    </ul>
                  </div>

                  {/* PAQUETE PREMIUM MEJORADO */}
                  <div onClick={() => handlePackageSelect('Premium')} className={`p-5 rounded-2xl border-2 cursor-pointer select-none transition-all duration-300 relative overflow-hidden flex flex-col ${packageType === 'Premium' ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_25px_rgba(250,204,21,0.2)]' : 'border-white/10 bg-gradient-to-br from-yellow-400/5 to-amber-600/5 hover:border-yellow-400/50'}`}>
                    {/* Badge Más Popular */}
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[9px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                      Más Popular
                    </div>
                    <div className="text-xl font-black text-yellow-400 mb-1">PREMIUM</div>
                    <div className="text-2xl font-black text-white mb-4">$9,900 <span className="text-xs font-normal text-gray-500">MXN</span></div>
                    <ul className="text-sm text-white font-semibold space-y-3 flex-grow drop-shadow-md">
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"/> 7 Horas de música continua</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"/> Sonido masivo (300+ personas)</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"/> Show láser y chispas (Pirotecnia fría)</li>
                      <li className="flex items-center gap-2"><CheckCircle size={16} className="text-yellow-400 shrink-0 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"/> Humo pesado (Bailar en las nubes)</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className="mb-6">
                <label className="text-gray-300 text-sm font-semibold uppercase tracking-wide block mb-3">Horas Adicionales <span className="text-gray-500 normal-case">(Máx. 2)</span></label>
                <div className="flex gap-3">
                  {[0, 1, 2].map((h) => (
                    <button 
                      key={h} 
                      type="button" 
                      onClick={() => setExtraHours(h)} 
                      disabled={packageType === 'Premium' && h !== 2}
                      className={`flex-1 py-3 rounded-xl border-2 select-none transition-all ${
                        extraHours === h ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.2)]' : 
                        packageType === 'Premium' && h !== 2 ? 'opacity-30 cursor-not-allowed border-transparent bg-white/5' : 
                        'border-transparent bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`text-base font-bold ${extraHours === h ? 'text-yellow-400' : 'text-white'}`}>{h === 0 ? 'Sin extra' : `+${h}h`}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {packageType === 'Premium' && h === 2 ? 'Incluido (7 hrs)' :
                         h === 0 ? '5 hrs totales' : 
                         `$${h * 1200} extra`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-semibold uppercase tracking-wide flex items-center gap-2 mb-3">
                  <Users size={14} /> Número de Asistentes
                </label>
                <select value={peopleRange} onChange={e => setPeopleRange(e.target.value)} className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white text-base border border-[#2a2a4e] outline-none cursor-pointer">
                  <option value="10-100">10 a 100 personas (Precio base)</option>
                  <option value="100-200">100 a 200 personas (+$3,000)</option>
                  <option value="200-300">200 a 300 personas (+$5,500)</option>
                  <option value="300+">300 o más personas (+$7,500)</option>
                </select>
              </div>
            </div>            {/* SECCIÓN 1: DATOS PERSONALES */}
            <div className="bg-gradient-to-br from-[#0a0a1a]/90 to-[#070714]/95 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-cyber text-2xl m-0 text-white">TUS DATOS</h2>
                  <p className="text-gray-400 text-xs mt-1">Información de contacto obligatoria</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField icon={User} label="Nombre" name="nombre" placeholder="Ej. Juan" value={formData.nombre} error={errors.nombre} touched={touched.nombre} onChange={e => handleChange('nombre', e.target.value)} onBlur={() => handleBlur('nombre')} autoComplete="given-name" />
                <InputField icon={User} label="Apellido" name="apellido" placeholder="Ej. Pérez" value={formData.apellido} error={errors.apellido} touched={touched.apellido} onChange={e => handleChange('apellido', e.target.value)} onBlur={() => handleBlur('apellido')} autoComplete="family-name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField icon={Phone} label="Teléfono" name="telefono" type="tel" placeholder="10 dígitos" value={formData.telefono} error={errors.telefono} touched={touched.telefono} onChange={handlePhoneChange} onBlur={() => handleBlur('telefono')} autoComplete="tel" />
                <InputField icon={Mail} label="Correo" name="correo" type="email" placeholder="juan@correo.com" value={formData.correo} error={errors.correo} touched={touched.correo} onChange={e => handleChange('correo', e.target.value)} onBlur={() => handleBlur('correo')} autoComplete="email" />
              </div>
            </div>

            {/* SECCIÓN 2: AGENDA Y EVENTO */}
            <div className="bg-gradient-to-br from-[#0a0a1a]/90 to-[#070714]/95 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-cyber text-2xl m-0 text-white">AGENDA TU EVENTO</h2>
                  <p className="text-gray-400 text-xs mt-1">Selecciona fecha y detalles logísticos</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="mb-4">
                  <label className="text-gray-300 text-sm flex items-center gap-2 mb-2 font-semibold uppercase tracking-wide">
                    <Calendar size={14} className={errors.fecha && touched.fecha ? "text-red-500" : "text-cyan-400"} />
                    Fecha del Evento <span className="text-pink-500">*</span>
                  </label>
                  <DatePicker
                    selected={formData.fecha}
                    onChange={(date) => handleChange('fecha', date)}
                    minDate={addDays(new Date(), 2)}
                    excludeDates={excludedDates}
                    locale={es}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona una fecha"
                    className={`w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base outline-none transition-all duration-300 border cursor-pointer ${
                      errors.fecha && touched.fecha
                        ? 'border-red-500 shadow-[0_0_10px_rgba(255,68,68,0.2)]'
                        : 'border-[#2a2a4e] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)]'
                    }`}
                  />
                  {errors.fecha && touched.fecha && <p className="text-red-500 text-xs mt-1 font-bold">{errors.fecha}</p>}
                </div>

                <div className="mb-4">
                  <label className="text-gray-300 text-sm flex items-center gap-2 mb-2 font-semibold uppercase tracking-wide">
                    <Clock size={14} className="text-cyan-400" />
                    Hora de Inicio <span className="text-pink-500">*</span>
                  </label>
                  <DatePicker
                    selected={formData.horaInicio}
                    onChange={(date) => handleChange('horaInicio', date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Hora"
                    dateFormat="h:mm aa"
                    filterTime={(time) => {
                      if (!formData.fecha) return true;
                      
                      // Regla de 2 días y 12 PM
                      const limitDate = addDays(new Date(), 2);
                      const isLimitDay = formData.fecha.getDate() === limitDate.getDate() && 
                                         formData.fecha.getMonth() === limitDate.getMonth() && 
                                         formData.fecha.getFullYear() === limitDate.getFullYear();
                      if (isLimitDay && time.getHours() < 12) return false;
                      
                      // Regla del motor de colisiones
                      const proposedStartMs = new Date(
                        formData.fecha.getFullYear(),
                        formData.fecha.getMonth(),
                        formData.fecha.getDate(),
                        time.getHours(),
                        time.getMinutes(),
                        0
                      ).getTime();
                      
                      const proposedEndMs = proposedStartMs + ((5 + extraHours) * 3600000);
                      const proposedEndDate = new Date(proposedEndMs);
                      const proposedEndHour = proposedEndDate.getHours();
                      const proposedBufferMs = (proposedEndHour >= 0 && proposedEndHour <= 10) ? (8 * 3600000) : (3 * 3600000);
                      const proposedEndWithBufferMs = proposedEndMs + proposedBufferMs;

                      for (let ev of dbEvents) {
                        if (proposedStartMs < ev.endWithBufferMs && ev.startMs < proposedEndWithBufferMs) {
                          return false; // Time is blocked!
                        }
                      }
                      
                      return true;
                    }}
                    className="w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base outline-none transition-all duration-300 border border-[#2a2a4e] focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)] cursor-pointer"
                  />
                </div>

              </div>

              {isTimeSlotBlocked && (
                <div className="bg-red-500/10 border-2 border-red-500 p-4 rounded-xl flex items-start gap-3 mt-2 mb-4">
                  <AlertTriangle size={22} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-red-400 font-bold text-sm mb-1">Horario no disponible</div>
                    <div className="text-red-300/80 text-xs leading-relaxed">Este horario interfiere con otro evento agendado o con el tiempo de traslado (+3 hrs).</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InputField icon={Sparkles} label="Tipo de Evento" name="tipoEvento">
                  <select value={formData.tipoEvento} onChange={e => handleChange('tipoEvento', e.target.value)} className="w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base border border-[#2a2a4e] outline-none cursor-pointer">
                    <option value="Boda">Boda de Gala</option>
                    <option value="XV Años">XV Años</option>
                    <option value="Corporativo">Evento Corporativo</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Otro">Otro</option>
                  </select>
                </InputField>

                <InputField icon={Home} label="Entorno" name="locacion">
                  <select value={formData.locacion} onChange={e => handleChange('locacion', e.target.value)} className="w-full p-3 md:p-4 rounded-xl bg-[#0a0a1a] text-white text-base border border-[#2a2a4e] outline-none cursor-pointer">
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Jardín">Jardín</option>
                    <option value="Salón">Salón de Eventos</option>
                  </select>
                </InputField>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-cyan-400" />
                  <h3 className="text-white font-bold tracking-widest text-sm uppercase">Dirección del Evento</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <InputField icon={MapPin} label="Calle y Número" name="calleYNumero" placeholder="Ej. Av. Reforma 222" value={formData.calleYNumero} error={errors.calleYNumero} touched={touched.calleYNumero} onChange={e => handleChange('calleYNumero', e.target.value)} onBlur={() => handleBlur('calleYNumero')} autoComplete="street-address" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField icon={MapPin} label="Colonia" name="colonia" placeholder="Ej. Juárez" value={formData.colonia} error={errors.colonia} touched={touched.colonia} onChange={e => handleChange('colonia', e.target.value)} onBlur={() => handleBlur('colonia')} autoComplete="address-level3" />
                  <InputField icon={MapPin} label="Alcaldía / Municipio" name="alcaldia" placeholder="Ej. Cuauhtémoc" value={formData.alcaldia} error={errors.alcaldia} touched={touched.alcaldia} onChange={e => handleChange('alcaldia', e.target.value)} onBlur={() => handleBlur('alcaldia')} autoComplete="address-level2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <InputField icon={MapPin} label="Código Postal" name="codigoPostal" placeholder="Ej. 06600" value={formData.codigoPostal} error={errors.codigoPostal} touched={touched.codigoPostal} onChange={e => handleChange('codigoPostal', e.target.value.replace(/\D/g, '').slice(0, 5))} onBlur={() => handleBlur('codigoPostal')} autoComplete="postal-code" />
                </div>
              </div>

                        </div>
            
            {/* SECCIÓN: COTIZACIÓN EN CDMX Y ÁREA METROPOLITANA */}
            <div className="bg-gradient-to-br from-[#0a1a0a]/90 to-[#071407]/95 border border-green-500/20 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="font-cyber text-lg m-0 text-white leading-tight">FUERA DE CDMX Y ÁREA METROPOLITANA</h2>
                  <p className="text-gray-400 text-xs">Atención personalizada</p>
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center">
                <p className="text-gray-300 text-sm mb-4">Si te encuentras fuera de CDMX o Área Metropolitana, contáctanos.</p>
                <button type="button" onClick={() => window.location.href = 'https://wa.me/525567880698'} className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 uppercase text-sm tracking-wide transition-transform hover:-translate-y-1 shadow-[0_4px_15px_rgba(37,211,102,0.3)]">
                  <MessageSquare size={16} /> Cotizar por WhatsApp
                </button>
              </div>
            </div>
            
          </div>

          {/* ========== COLUMNA DERECHA: RESUMEN ========== */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gradient-to-br from-[#0a0a1a]/95 to-[#140514]/95 border-2 border-pink-500/30 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
              <h2 className="font-cyber text-3xl mb-6 text-white text-center">RESUMEN</h2>

              <div className="mb-6">
                <label className="text-gray-300 text-xs font-bold uppercase tracking-widest block mb-4">¿Cómo deseas pagar?</label>
                <div className="flex flex-col gap-3">
                  
                  <div onClick={() => setPaymentType('anticipo')} className={`p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all ${paymentType === 'anticipo' ? 'border-pink-500 bg-pink-500/10 shadow-lg' : 'border-white/10 bg-white/5'}`}>
                    <div className={`w-5 h-5 rounded-full border-4 shrink-0 ${paymentType === 'anticipo' ? 'border-pink-500 bg-white' : 'border-gray-500'}`} />
                    <div className="flex-1">
                      <div className="font-bold text-white text-sm">Pagar Anticipo</div>
                      <div className="text-gray-400 text-xs mt-0.5">Aparta tu fecha hoy</div>
                    </div>
                    <div className="font-black text-green-400 text-lg">$1,500</div>
                  </div>

                  <div onClick={() => setPaymentType('completo')} className={`p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all ${paymentType === 'completo' ? 'border-pink-500 bg-pink-500/10 shadow-lg' : 'border-white/10 bg-white/5'}`}>
                    <div className={`w-5 h-5 rounded-full border-4 shrink-0 ${paymentType === 'completo' ? 'border-pink-500 bg-white' : 'border-gray-500'}`} />
                    <div className="flex-1">
                      <div className="font-bold text-white text-sm">Pago Completo</div>
                      <div className="text-gray-400 text-xs mt-0.5">Liquida el total ahora</div>
                    </div>
                    <div className="font-black text-yellow-400 text-lg">${totalEvent.toLocaleString()}</div>
                  </div>

                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-6 mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Desglose del Paquete</div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Paquete {packageType}</span>
                  <span className="text-white font-bold">${packageType === 'Premium' ? '9,900' : packageType === 'Pro' ? '7,500' : '5,500'}</span>
                </div>
                {extraHours > 0 && packageType !== 'Premium' && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Horas extra ({extraHours}h)</span>
                    <span className="text-yellow-400 font-bold">+${extraHoursCost.toLocaleString()}</span>
                  </div>
                )}
                {peopleAdditionalCost > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Ajuste por aforo</span>
                    <span className="text-yellow-400 font-bold">+${peopleAdditionalCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-400">Duración total</span>
                  <span className="text-cyan-400 font-bold">{5 + extraHours} hrs</span>
                </div>
              </div>

              <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl p-5 text-center mb-6">
                <div className="text-xs text-brand-cyan uppercase tracking-widest mb-2 font-bold">Total del Evento</div>
                <div className="text-4xl font-black text-white leading-none drop-shadow-[0_0_10px_rgba(0,242,254,0.3)]">
                  ${totalEvent.toLocaleString()} <span className="text-base text-gray-400 font-normal">MXN</span>
                </div>
              </div>

              <div className={`text-center p-5 rounded-2xl border mb-6 transition-all duration-300 ${paymentType === 'completo' ? 'bg-brand-pink/10 border-brand-pink/40 shadow-[0_0_20px_rgba(255,0,127,0.2)]' : 'bg-brand-cyan/10 border-brand-cyan/30'}`}>
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${paymentType === 'completo' ? 'text-brand-pink' : 'text-brand-cyan'}`}>
                  Monto a pagar ahora
                </div>
                <div className={`text-4xl font-black text-white ${paymentType === 'completo' ? 'drop-shadow-[0_0_15px_rgba(255,0,127,0.6)]' : 'drop-shadow-[0_0_10px_rgba(0,242,254,0.4)]'}`}>
                  ${montoPagar.toLocaleString()} <span className={`text-base font-bold ${paymentType === 'completo' ? 'text-brand-pink' : 'text-brand-cyan'}`}>MXN</span>
                </div>
                {paymentType === 'anticipo' && (
                  <div className="text-xs text-gray-400 mt-2">Saldo pendiente a pagar el día del evento: <span className="text-white font-bold">${saldoPendiente.toLocaleString()}</span> MXN</div>
                )}
              </div>

              <button type="submit" disabled={isRedirecting || isTimeSlotBlocked} className={`w-full py-4 rounded-xl text-white text-lg font-bold uppercase tracking-wide flex items-center justify-center gap-3 transition-all ${isTimeSlotBlocked ? 'bg-gray-700 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.4)]'}`}>
                <CreditCard size={22} />
                {isRedirecting ? 'Procesando...' : `Pagar ${paymentType === 'completo' ? 'completo' : 'anticipo'}`}
              </button>

              {isRedirecting && (
                <div className="mt-4 bg-cyan-400/10 border border-cyan-400/30 p-3 rounded-xl flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-cyan-400 font-bold text-sm">Redirigiendo a Mercado Pago...</span>
                </div>
              )}


              <div className="mt-5 flex flex-col items-center justify-center gap-2 text-gray-500 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-green-500" />
                  Pago seguro procesado por Mercado Pago
                </div>
                <div className="text-center text-brand-cyan/70 mt-2 p-2 bg-brand-cyan/5 border border-brand-cyan/10 rounded">
                  Servicio exclusivo para la República Mexicana. Precios en MXN.
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
