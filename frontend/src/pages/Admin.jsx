import { useState, useEffect } from "react";
import { ShieldCheck, Lock, Calendar, LayoutGrid, Menu, X, CheckCircle2, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';
import ReservationRow from '../components/ReservationRow';

export default function Admin() {
  // ─── ESTADO DE AUTENTICACIÓN ──────────────────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = sessionStorage.getItem('gd_admin_auth');
    const savedTime = sessionStorage.getItem('gd_admin_timestamp');
    const savedToken = sessionStorage.getItem('gd_admin_token');

    if (savedAuth === 'true' && savedTime && savedToken) {
      const tiempoTranscurrido = Date.now() - parseInt(savedTime, 10);
      const limiteCincoMinutos = 5 * 60 * 1000;

      if (tiempoTranscurrido < limiteCincoMinutos) {
        return true;
      } else {
        sessionStorage.clear();
      }
    }
    return false;
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // ─── ESTADO DEL PANEL ─────────────────────────────────────
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ─── HELPER ──────────────────────────
  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('gd_admin_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // ─── MOTOR DE INACTIVIDAD ─────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return;

    const actualizarActividad = () => {
      sessionStorage.setItem('gd_admin_timestamp', Date.now().toString());
    };

    window.addEventListener('mousemove', actualizarActividad);
    window.addEventListener('click', actualizarActividad);
    window.addEventListener('keydown', actualizarActividad);
    window.addEventListener('scroll', actualizarActividad);

    const intervaloVerificacion = setInterval(() => {
      const savedTime = sessionStorage.getItem('gd_admin_timestamp');
      if (savedTime) {
        const tiempoInactivo = Date.now() - parseInt(savedTime, 10);
        if (tiempoInactivo >= 5 * 60 * 1000) {
          handleCerrarSesion();
          alert('Tu sesión expiró por 5 minutos de inactividad.');
        }
      }
    }, 10000);

    return () => {
      window.removeEventListener('mousemove', actualizarActividad);
      window.removeEventListener('click', actualizarActividad);
      window.removeEventListener('keydown', actualizarActividad);
      window.removeEventListener('scroll', actualizarActividad);
      clearInterval(intervaloVerificacion);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'ventas') {
      fetchVentas();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, activeTab]);

  // ─── LOGIN ────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const resData = await response.json();

      if (resData.success && resData.token) {
        sessionStorage.setItem('gd_admin_auth', 'true');
        sessionStorage.setItem('gd_admin_token', resData.token);
        sessionStorage.setItem('gd_admin_timestamp', Date.now().toString());
        setIsAuthenticated(true);
        setEmail('');
        setPassword('');
      } else {
        setLoginError(resData.error || 'Credenciales incorrectas.');
      }
    } catch {
      setLoginError('Error de comunicación con el servidor.');
    }
  };

  function handleCerrarSesion() {
    sessionStorage.clear();
    setIsAuthenticated(false);
  }

  // ─── FETCH VENTAS ─────────────────────────────────────
  async function fetchVentas() {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/ventas', {
        headers: getAuthHeaders()
      });

      if (response.status === 401 || response.status === 403) {
        handleCerrarSesion();
        return;
      }

      const resData = await response.json();
      if (resData.success) setReservaciones(resData.data);
    } catch (error) {
      console.error('Error al obtener ventas:', error);
    } finally {
      setLoading(false);
    }
  }

  // ─── SUBMIT BLOQUEO MANUAL ─────────────────────────────
  const handleBloquearFecha = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch('/api/admin/bloquear-fecha', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(Object.fromEntries(formData))
      });
      if (response.ok) {
        alert('Fecha bloqueada con éxito');
        e.target.reset();
        setActiveTab('dashboard');
      } else {
        alert('Error al bloquear fecha');
      }
    } catch {
      alert('Error de conexión');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#121230] to-[#0d0d2a] px-4">
        <div className="max-w-md w-full bg-[#07071c] border border-[#1a1a3e] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-pink-500" />
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border-2 border-cyan-400/30 flex items-center justify-center mb-4">
              <Lock size={30} className="text-cyan-400" />
            </div>
            <h2 className="font-['Bangers'] text-4xl text-white tracking-widest">ZONA RESTRINGIDA</h2>
            <p className="text-gray-400 text-sm mt-2 text-center">Acceso exclusivo para administradores de GD Producciones.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Correo Electrónico</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white border border-[#2a2a4e] outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)] transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Clave de Acceso</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white border border-[#2a2a4e] outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,242,254,0.1)] transition-all" />
            </div>
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> {loginError}
              </div>
            )}
            <button type="submit" className="w-full mt-4 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all">
              INGRESAR AL SISTEMA
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendientes = reservaciones.filter(r => r.financiero?.estatus !== 'Apartado Confirmado');
  const pagados = reservaciones.filter(r => r.financiero?.estatus === 'Apartado Confirmado');
  const ingresosPagados = pagados.reduce((acc, curr) => acc + Number(curr.financiero?.montoCobradoOnline || 0), 0);

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans flex flex-col md:flex-row relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
        .admin-sidebar { width: 280px; background: #07071c; border-right: 1px solid #1a1a3e; padding: 30px; height: 100vh; position: sticky; top: 0; display: flex; flex-direction: column; }
        @media (max-width: 768px) {
          .admin-sidebar { position: fixed; transform: translateX(-100%); z-index: 50; transition: transform 0.3s; }
          .admin-sidebar.open { transform: translateX(0); }
        }
      `}</style>

      {/* 📱 MOBILE MENU BTN */}
      <div className="md:hidden p-4 bg-[#07071c] border-b border-[#1a1a3e] flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2 font-['Bangers'] text-2xl tracking-wider text-white">
          <ShieldCheck size={24} className="text-cyan-400" /> GD CONSOLE
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-white/5 rounded-lg border border-white/10 text-white">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🖥️ SIDEBAR */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between pb-5 border-b border-[#1a1a3e] mb-6">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-cyan-400" />
            <div className="text-xl font-bold font-['Bangers'] tracking-wider">GD CONSOLE</div>
          </div>
          <button className="md:hidden text-gray-500" onClick={() => setMobileMenuOpen(false)}><X size={20} /></button>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full p-4 rounded-xl border-none cursor-pointer flex items-center gap-3 text-sm font-semibold text-left transition-all ${activeTab === 'dashboard' ? 'bg-cyan-400/15 text-cyan-400' : 'bg-transparent text-gray-400 hover:bg-white/5'}`}
          >
            <LayoutGrid size={18} /> Inicio
          </button>
          
          <button
            onClick={() => { setActiveTab('ventas'); setMobileMenuOpen(false); }}
            className={`w-full p-4 rounded-xl border-none cursor-pointer flex items-center gap-3 text-sm font-semibold text-left transition-all ${activeTab === 'ventas' ? 'bg-pink-500/15 text-pink-500' : 'bg-transparent text-gray-400 hover:bg-white/5'}`}
          >
            <CheckCircle2 size={18} /> Ver Eventos
          </button>

          <button
            onClick={() => { setActiveTab('bloqueos'); setMobileMenuOpen(false); }}
            className={`w-full p-4 rounded-xl border-none cursor-pointer flex items-center gap-3 text-sm font-semibold text-left transition-all ${activeTab === 'bloqueos' ? 'bg-orange-500/15 text-orange-500' : 'bg-transparent text-gray-400 hover:bg-white/5'}`}
          >
            <Calendar size={18} /> Bloquear Fechas
          </button>
        </div>

        <div className="pt-6 border-t border-[#1a1a3e] mt-auto">
          <button onClick={handleCerrarSesion} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold p-3 rounded-xl transition-all border border-red-500/30">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* 📋 CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-y-auto">
        
        {/* ---------------- DASHBOARD ---------------- */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in-up">
            <h1 className="font-['Bangers'] text-4xl md:text-5xl text-white tracking-widest mb-2">PANEL DE CONTROL</h1>
            <p className="text-gray-400 mb-10">¿Qué deseas hacer hoy?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div 
                onClick={() => setActiveTab('ventas')}
                className="bg-[#0a0a1a] border border-[#2a2a4e] hover:border-pink-500 p-8 rounded-2xl cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,0,127,0.15)] group"
              >
                <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:bg-pink-500/20 transition-all">
                  <CheckCircle2 size={28} className="text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ver Eventos</h3>
                <p className="text-gray-400 text-sm mb-6">Revisa tus cotizaciones, cobros e historial de eventos agendados por clientes.</p>
                <div className="flex items-center text-pink-500 text-sm font-bold gap-2">
                  Ingresar <ArrowRight size={16} />
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('bloqueos')}
                className="bg-[#0a0a1a] border border-[#2a2a4e] hover:border-orange-500 p-8 rounded-2xl cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,165,0,0.15)] group"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-all">
                  <Calendar size={28} className="text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Bloquear Fechas</h3>
                <p className="text-gray-400 text-sm mb-6">Añade eventos manuales para evitar que la página venda fechas donde ya estás ocupado.</p>
                <div className="flex items-center text-orange-500 text-sm font-bold gap-2">
                  Configurar <ArrowRight size={16} />
                </div>
              </div>

              <div 
                onClick={() => window.open('https://ghost.org/', '_blank')}
                className="bg-[#0a0a1a] border border-[#2a2a4e] hover:border-blue-500 p-8 rounded-2xl cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] group"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                  <ExternalLink size={28} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Gestionar Blog</h3>
                <p className="text-gray-400 text-sm mb-6">Accede al panel externo de Ghost para escribir, editar o eliminar artículos del blog.</p>
                <div className="flex items-center text-blue-500 text-sm font-bold gap-2">
                  Abrir Ghost <ExternalLink size={16} />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ---------------- VENTAS ---------------- */}
        {activeTab === 'ventas' && (
          <div className="animate-fade-in-up">
            <h1 className="font-['Bangers'] text-4xl text-white tracking-widest mb-6 border-b border-[#1a1a3e] pb-4">AUDITORÍA DE LOGÍSTICA COMERCIAL</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#07071c] border border-[#1a1a3e] p-6 rounded-2xl">
                <span className="text-gray-500 text-xs font-bold block mb-1">COTIZACIONES LEADS</span>
                <span className="text-3xl font-bold text-yellow-400">{pendientes.length} Registros</span>
              </div>
              <div className="bg-[#07071c] border border-[#1a1a3e] p-6 rounded-2xl">
                <span className="text-gray-500 text-xs font-bold block mb-1">EVENTOS CONFIRMADOS</span>
                <span className="text-3xl font-bold text-green-400">{pagados.length} Registros</span>
              </div>
              <div className="bg-[#07071c] border border-[#1a1a3e] p-6 rounded-2xl lg:col-span-2">
                <span className="text-gray-500 text-xs font-bold block mb-1">INGRESOS ONLINE TOTALES</span>
                <span className="text-3xl font-bold text-pink-500">${ingresosPagados.toLocaleString()} MXN</span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20 text-gray-500">Cargando base de datos...</div>
            ) : (
              <div className="bg-[#07071c] rounded-2xl border border-[#1a1a3e] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0a0a1a] text-gray-400 text-xs uppercase tracking-wider">
                        <th className="p-4 border-b border-[#1a1a3e]">Fecha / Status</th>
                        <th className="p-4 border-b border-[#1a1a3e]">Cliente</th>
                        <th className="p-4 border-b border-[#1a1a3e]">Logística</th>
                        <th className="p-4 border-b border-[#1a1a3e]">Finanzas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservaciones.length === 0 ? (
                        <tr><td colSpan="4" className="text-center p-8 text-gray-500">No hay registros aún.</td></tr>
                      ) : (
                        reservaciones.map((res) => (
                          <ReservationRow key={res.id} res={res} />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- BLOQUEOS MANUALES ---------------- */}
        {activeTab === 'bloqueos' && (
          <div className="animate-fade-in-up">
            <h1 className="font-['Bangers'] text-4xl text-white tracking-widest mb-6 border-b border-[#1a1a3e] pb-4">BLOQUEO DE FECHAS MANUAL</h1>
            
            <div className="bg-[#07071c] border border-[#1a1a3e] rounded-2xl p-6 md:p-10 max-w-2xl">
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">Usa este formulario para bloquear días u horarios por eventos externos. Estos horarios no se podrán elegir en la cotización pública de la página.</p>
              
              <form onSubmit={handleBloquearFecha} className="flex flex-col gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Fecha del Evento Externo</label>
                  <input required name="fecha" type="date" className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white border border-[#2a2a4e] outline-none focus:border-orange-500 transition-all" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Hora de Inicio</label>
                    <input required name="horaInicio" type="time" defaultValue="14:00" className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white border border-[#2a2a4e] outline-none focus:border-orange-500 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Duración Estimada (Hrs)</label>
                    <input required name="horasTotales" type="number" min="1" defaultValue="5" className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white border border-[#2a2a4e] outline-none focus:border-orange-500 transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Razón o Notas Adicionales</label>
                  <input required name="notas" type="text" placeholder="Ej. Evento privado en Toluca" className="w-full p-4 rounded-xl bg-[#0a0a1a] text-white border border-[#2a2a4e] outline-none focus:border-orange-500 transition-all" />
                </div>
                
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold py-4 rounded-xl mt-4 shadow-[0_0_20px_rgba(255,165,0,0.3)] transition-all flex items-center justify-center gap-2">
                  <Calendar size={20} /> GUARDAR BLOQUEO
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}