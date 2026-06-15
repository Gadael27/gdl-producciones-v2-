import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import {
  Package, Truck, ShieldCheck, ExternalLink, SlidersHorizontal, 
  X, ZoomIn, ChevronLeft, ChevronRight, Sparkles, 
  Ruler, Clock, CheckCircle2, Wrench, ShoppingBag, MapPin
} from 'lucide-react';
import Footer from '../components/Footer';

// Importaciones de cabinas (todos los nombres exactos de tu captura)
import cabinaBlanca4Diamantes from '../assets/Cabina DJ Blanca 4 diamantes frente.jpeg';
import cabinaBlancaDiamanteFrente from '../assets/Cabina DJ Blanca Diamante Frente.jpeg';
import cabinaBlancaDiamanteLateral from '../assets/Cabina DJ Blanca Diamante Lateral.jpeg';
import cabinaBlancaTriangulos from '../assets/Cabina DJ Blanca Triangulos.jpeg';
import cabinaOroEspejo from '../assets/Cabina DJ diamante Oro tipo espejo frente.jpeg';
import cabinaPlataEspejo from '../assets/Cabina DJ Diamante Plata tipo espejo frente.jpeg';
import cabinaNegraDiamanteFrente2 from '../assets/Cabina DJ negra Diamante frente 2.jpeg';
import cabinaNegraDiamanteFrente from '../assets/Cabina DJ Negra Diamante frente.jpeg';
import cabinaNegraDiamanteLateral from '../assets/Cabina DJ Negra Diamante Lateral.jpeg';
import cabinaNegraRayado from '../assets/Cabina DJ Negra Rayado.jpeg';
import cabinaNegraTriangulos from '../assets/Cabina DJ Negra Triangulos.jpeg';

export default function CompraCabina() {
  const [filterColor, setFilterColor] = useState('Todos');
  const [selectedCabina, setSelectedCabina] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleComprar = async (cabina) => {
    try {
      setIsRedirecting(true);
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/comprar-cabina`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cabinaId: cabina.id,
          nombre: cabina.nombre,
          precioStr: cabina.precio
        })
      });

      const data = await response.json();

      if (data.success && data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Error al generar la compra.');
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor.');
      setIsRedirecting(false);
    }
  };

  // Todas las cabinas con sus variantes de imagen y nueva data estructurada
  const cabinas = [
    {
      id: 1,
      nombre: 'Cabina Negra Diamante Premium',
      descripcion: 'Mueble de carpintería fina con corte geométrico en relieve tipo diamante. Acabado negro mate de alta resistencia al rayado y humedad.',
      color: 'Negro',
      precio: '8,500',
      tag: 'Best Seller',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaNegraDiamanteFrente, cabinaNegraDiamanteLateral, cabinaNegraDiamanteFrente2],
      specs: { material: 'Madera MDF Premium', peso: '18kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Corte diamante 3D', 'Acabado negro mate', 'Patas ajustables', 'Portacables integrado'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 2,
      nombre: 'Cabina Blanca Diamante Luxury',
      descripcion: 'Estructura modular blanca con diseño de diamantes tridimensionales. Ideal para bodas de gala y eventos corporativos de alto nivel.',
      color: 'Blanco',
      precio: '8,900',
      tag: 'Premium',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaBlancaDiamanteFrente, cabinaBlancaDiamanteLateral, cabinaBlanca4Diamantes],
      specs: { material: 'Madera MDF Premium', peso: '19kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Diamantes tridimensionales', 'Blanco satinado', 'Resistente a manchas', 'Diseño modular'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 3,
      nombre: 'Cabina Diamante Espejo Oro',
      descripcion: 'Edición especial con caras reflejantes en acabado acrílico tipo espejo dorado. Máxima presencia escénica garantizada.',
      color: 'Oro/Espejo',
      precio: '11,200',
      tag: 'Edición Limitada',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaOroEspejo],
      specs: { material: 'MDF + Acrílico Espejo', peso: '22kg', ensamble: '7 min', garantia: '2 años', medidas: '120 x 60 x 95 cm' },
      features: ['Acrílico espejo dorado', 'Efecto reflectante total', 'Estructura reforzada', 'Iluminación LED compatible'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: false
    },
    {
      id: 4,
      nombre: 'Cabina Diamante Espejo Plata',
      descripcion: 'Fachada reflectante plata tipo espejo con cortes diagonales de precisión. Estructura robusta y ligera de armar.',
      color: 'Plata/Espejo',
      precio: '10,800',
      tag: 'Exclusivo',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaPlataEspejo],
      specs: { material: 'MDF + Acrílico Espejo', peso: '21kg', ensamble: '7 min', garantia: '2 años', medidas: '120 x 60 x 95 cm' },
      features: ['Espejo plata premium', 'Cortes diagonales', 'Ligera y robusta', 'Montaje rápido'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: false
    },
    {
      id: 5,
      nombre: 'Cabina Negra Triángulos Rave',
      descripcion: 'Diseño geométrico lineal basado en patrones triangulares abstractos. Ideal para iluminación perimetral LED RGB.',
      color: 'Negro',
      precio: '7,900',
      tag: 'A medida',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaNegraTriangulos],
      specs: { material: 'Madera MDF Premium', peso: '17kg', ensamble: '4 min', garantia: '1 año', medidas: '110 x 55 x 85 cm' },
      features: ['Patrón triangular abstracto', 'Compatible LED RGB', 'Diseño rave/festival', 'Superficie difusora'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 6,
      nombre: 'Cabina Negra Minimal Rayado',
      descripcion: 'Líneas paralelas fresadas sobre madera premium con acabado negro satinado de alta durabilidad. Elegancia minimalista.',
      color: 'Negro',
      precio: '8,200',
      tag: 'Nuevo',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaNegraRayado],
      specs: { material: 'Madera MDF Premium', peso: '18kg', ensamble: '5 min', garantia: '1 año', medidas: '120 x 60 x 90 cm' },
      features: ['Líneas paralelas fresadas', 'Acabado satinado', 'Minimalista', 'Alta durabilidad'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    },
    {
      id: 7,
      nombre: 'Cabina Blanca Triángulos',
      descripcion: 'Versión blanca del diseño triangular con acabado satinado. Perfecta para eventos diurnos y exteriores.',
      color: 'Blanco',
      precio: '8,400',
      tag: 'Nuevo',
      amazonLink: 'https://www.amazon.com.mx',
      mlLink: 'https://www.mercadolibre.com.mx',
      fbLink: 'https://www.facebook.com/marketplace',
      imagenes: [cabinaBlancaTriangulos],
      specs: { material: 'Madera MDF Premium', peso: '17kg', ensamble: '4 min', garantia: '1 año', medidas: '110 x 55 x 85 cm' },
      features: ['Triángulos en blanco', 'Ideal exteriores', 'Satinado premium', 'Ligera'],
      envio: { gratis: '5km del Estadio Azteca', cdmx: '$200', interior: 'Cotizar', bodegas: ['Querétaro', 'Guadalajara'] },
      aMedida: true
    }
  ];

  const coloresDisponibles = ['Todos', 'Negro', 'Blanco', 'Oro/Espejo', 'Plata/Espejo'];

  const cabinasFiltradas = filterColor === 'Todos' 
    ? cabinas 
    : cabinas.filter(c => c.color === filterColor);

  const abrirModal = (cabina) => {
    setSelectedCabina(cabina);
    setCurrentImageIndex(0);
    setIsVisible(true);
  };

  const cerrarModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedCabina(null);
    }, 300);
  };

  const siguienteImagen = () => {
    if (selectedCabina) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedCabina.imagenes.length);
    }
  };

  const anteriorImagen = () => {
    if (selectedCabina) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedCabina.imagenes.length) % selectedCabina.imagenes.length);
    }
  };

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') cerrarModal();
      if (e.key === 'ArrowRight') siguienteImagen();
      if (e.key === 'ArrowLeft') anteriorImagen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCabina, anteriorImagen, siguienteImagen]);

  useEffect(() => {
    if (isVisible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isVisible]);

  return (
    <div className="bg-gradient-to-br from-[#03030c] to-[#0a0a1a] min-h-screen text-white pt-20 font-body overflow-x-hidden">
      <Helmet>
        <title>Compra tu Mesa DJ | GDL Producciones</title>
        <meta name="description" content="Catálogo de mesas y cabinas DJ profesionales hechas a medida. Diseños exclusivos con materiales premium e iluminación LED. Envíos a todo México." />
      </Helmet>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@300;400;600;800&display=swap');
        
        .font-cyber { font-family: 'Bangers', cursive; letter-spacing: 2px; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes neonPulse { 0%, 100% { box-shadow: 0 0 20px rgba(255,0,127,0.3); } 50% { box-shadow: 0 0 40px rgba(255,0,127,0.6); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        
        .cabina-card {
          background: linear-gradient(145deg, #0a0a1a, #070714);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
        }
        .cabina-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--card-color, var(--color-brand-pink)), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cabina-card:hover::before { opacity: 1; }
        .cabina-card:hover {
          transform: translateY(-8px);
          border-color: var(--card-color, var(--color-brand-pink));
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px var(--card-glow, rgba(255,0,127,0.1));
        }
        .cabina-card:hover .cabina-img {
          transform: scale(1.08);
          filter: saturate(1.2) contrast(1.1);
        }
        .cabina-img {
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          width: 100%; height: 100%; object-fit: cover;
        }
        .zoom-icon {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: rgba(255,0,127,0.9);
          width: 60px; height: 60px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          z-index: 10;
        }
        .cabina-card:hover .zoom-icon {
          transform: translate(-50%, -50%) scale(1);
        }
        
        .filter-btn {
          padding: 10px 20px;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .filter-btn.active {
          background: linear-gradient(135deg, var(--color-brand-pink), #bd00ff);
          border-color: var(--color-brand-pink);
          color: #fff;
          box-shadow: 0 0 20px rgba(255,0,127,0.4);
        }
        .filter-btn:hover:not(.active) {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
          background: rgba(255,255,255,0.08);
        }
        
        .modal-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(3,3,12,0.95);
          backdrop-filter: blur(20px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .modal-overlay.visible { opacity: 1; }
        .modal-content {
          background: linear-gradient(145deg, #0a0a1a, #070714);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          max-width: 1100px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          transform: scale(0.9) translateY(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .modal-overlay.visible .modal-content {
          transform: scale(1) translateY(0);
        }
        
        .spec-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 0.8rem; color: #aaa;
        }
        
        .feature-item {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 0; color: #ccc; font-size: 0.9rem;
        }
        
        .envio-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px; border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        @media (max-width: 768px) {
          .modal-grid { grid-template-columns: 1fr !important; }
          .cabina-grid { grid-template-columns: 1fr !important; }
          .filter-scroll { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 10px; }
        }
      `}</style>

      <div className="max-w-[1300px] mx-auto">

        {/* HERO CABECERA */}
        <div className="text-center mb-[60px] animate-[fadeIn_0.8s_ease]">
          <div className="inline-flex items-center gap-[10px] bg-[rgba(255,0,127,0.1)] border border-[rgba(255,0,127,0.3)] px-5 py-2 rounded-full mb-[25px] text-[var(--color-brand-pink)] text-[0.85rem] font-bold tracking-[2px]">
            <Sparkles size={14} /> CUSTOM WOODWORKING WORKSHOP
          </div>
          <h1 className="font-cyber text-[clamp(2.5rem,6vw,5rem)] m-0 leading-none bg-gradient-to-br from-white via-[var(--color-brand-pink)] to-[var(--color-brand-cyan)] bg-clip-text text-transparent">
            COMPRA TU CABINA DE DJ
          </h1>
          
          <p className="text-[#888] max-w-[600px] mx-auto mt-5 text-[1.05rem] leading-[1.7] font-light">
            Diseño y fabricación de mobiliario profesional para DJ. 
            Estructuras de madera premium con acabados de alta durabilidad y ensamble modular rápido.
          </p>
        </div>

        {/* BANNERS DE ENVÍO ACTUALIZADOS */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 mb-[50px]">
          <div className="bg-gradient-to-br from-[rgba(0,242,254,0.08)] to-[rgba(0,242,254,0.02)] border border-[rgba(0,242,254,0.2)] p-[25px] rounded-[20px] flex gap-[18px] items-start transition-all duration-300 cursor-default hover:border-[rgba(0,242,254,0.5)]">
            <div className="w-[50px] h-[50px] rounded-[14px] bg-[rgba(0,242,254,0.15)] flex items-center justify-center shrink-0">
              <Truck size={24} color="var(--color-brand-cyan)" />
            </div>
            <div>
              <h3 className="m-0 mb-1.5 text-white text-[1.05rem] font-bold">Envíos CDMX</h3>
              <p className="m-0 text-[#888] text-[0.9rem] leading-[1.5]">
                <strong className="text-[var(--color-brand-cyan)]">¡Gratis</strong> a domicilio en 5km del Estadio Azteca.<br/>
                <strong className="text-[var(--color-brand-cyan)]">$200</strong> resto de la Ciudad de México.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[rgba(255,0,127,0.08)] to-[rgba(255,0,127,0.02)] border border-[rgba(255,0,127,0.2)] p-[25px] rounded-[20px] flex gap-[18px] items-start transition-all duration-300 cursor-default hover:border-[rgba(255,0,127,0.5)]">
            <div className="w-[50px] h-[50px] rounded-[14px] bg-[rgba(255,0,127,0.15)] flex items-center justify-center shrink-0">
              <Package size={24} color="var(--color-brand-pink)" />
            </div>
            <div>
              <h3 className="m-0 mb-1.5 text-white text-[1.05rem] font-bold">Foráneo e Interior</h3>
              <p className="m-0 text-[#888] text-[0.9rem] leading-[1.5]">
                Bodegas en <strong className="text-[var(--color-brand-pink)]">Querétaro</strong> y <strong className="text-[var(--color-brand-pink)]">Guadalajara</strong>.<br/>
                Envíos al interior de México: <strong className="text-[var(--color-brand-pink)]">Cotizar</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col gap-[15px] bg-gradient-to-br from-[#0a0a1a] to-[#070714] px-[25px] py-5 rounded-[20px] border border-white/5 mb-[40px]">
          <div className="flex items-center gap-[10px] text-[var(--color-brand-yellow)]">
            <SlidersHorizontal size={18} />
            <span className="font-extrabold text-[0.9rem] tracking-[2px] uppercase">
              Filtrar por Acabado
            </span>
          </div>
          <div className="filter-scroll" className="flex gap-[10px] flex-wrap">
            {coloresDisponibles.map((color) => (
              <button
                key={color}
                onClick={() => setFilterColor(color)}
                className={`filter-btn ${filterColor === color ? 'active' : ''}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE CABINAS */}
        <div className="cabina-grid grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[30px]">
          {cabinasFiltradas.map((cabina, index) => {
            const colorMap = {
              'Negro': { color: 'var(--color-brand-pink)', glow: 'rgba(255,0,127,0.15)' },
              'Blanco': { color: 'var(--color-brand-cyan)', glow: 'rgba(0,242,254,0.15)' },
              'Oro/Espejo': { color: 'var(--color-brand-yellow)', glow: 'rgba(255,235,59,0.15)' },
              'Plata/Espejo': { color: '#aaa', glow: 'rgba(170,170,170,0.15)' }
            };
            const theme = colorMap[cabina.color] || colorMap['Negro'];
            
            return (
              <div 
                key={cabina.id}
                className="cabina-card"
                style={{ 
                  '--card-color': theme.color,
                  '--card-glow': theme.glow,
                  animation: `slideUp 0.6s ease ${index * 0.1}s both`
                }}
                onClick={() => abrirModal(cabina)}
              >
                {/* Imagen */}
                <div className="h-[280px] relative overflow-hidden cursor-pointer bg-[#03030d]">
                  <img 
                    src={cabina.imagenes[0]} 
                    alt={cabina.nombre}
                    className="cabina-img"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,3,12,0.8)] to-transparent to-[40%] pointer-events-none" />
                  
                  {/* Tag */}
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: theme.color,
                    color: '#03030c',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    boxShadow: `0 4px 15px ${theme.glow}`
                  }}>
                    {cabina.tag}
                  </div>
                  
                  {/* Badge a medida */}
                  {cabina.aMedida && (
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[0.7rem] text-white font-bold flex items-center gap-1">
                      <Wrench size={12} /> A MEDIDA
                    </div>
                  )}
                  
                  {/* Color badge */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[0.8rem] text-white border border-white/10">
                    {cabina.color}
                  </div>
                  
                  {/* Zoom icon */}
                  <div className="zoom-icon">
                    <ZoomIn size={28} color="#fff" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-[25px]">
                  <h2 className="font-cyber" className="text-[1.6rem] m-0 mb-2.5 text-white leading-[1.1]">
                    {cabina.nombre}
                  </h2>
                  
                  <p className="text-[#888] text-[0.9rem] leading-[1.6] m-0 mb-5 line-clamp-2">
                    {cabina.descripcion}
                  </p>

                  {/* Specs mini */}
                  <div className="flex gap-2 flex-wrap mb-5">
                    <span className="spec-badge">
                      <Ruler size={12} /> {cabina.specs.medidas}
                    </span>
                    <span className="spec-badge">
                      <Clock size={12} /> {cabina.specs.ensamble}
                    </span>
                    {cabina.aMedida && (
                      <span className="spec-badge" style={{ borderColor: 'rgba(255,0,127,0.3)', color: 'var(--color-brand-pink)' }}>
                        <Wrench size={12} /> Personalizable
                      </span>
                    )}
                  </div>

                  {/* Precio y CTA */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-[18px]">
                    <div>
                      <div className="text-[0.75rem] text-[#666] mb-0.5 uppercase tracking-[1px]">
                        Desde
                      </div>
                      <div style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: 800, 
                        color: 'var(--color-brand-yellow)',
                        lineHeight: '1'
                      }}>
                        ${cabina.precio}
                        <span className="text-[0.85rem] text-[#888] ml-1">MXN</span>
                      </div>
                    </div>
                    
                    <button style={{
                      background: 'transparent',
                      border: `1.5px solid ${theme.color}`,
                      color: theme.color,
                      padding: '10px 20px',
                      borderRadius: '50px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }} onMouseEnter={e => {
                      e.currentTarget.style.background = theme.color;
                      e.currentTarget.style.color = '#03030c';
                      e.currentTarget.style.boxShadow = `0 0 20px ${theme.glow}`;
                    }} onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = theme.color;
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      Ver <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA MUEBLES A LA MEDIDA */}
        <div className="my-[50px] bg-gradient-to-br from-[rgba(255,0,127,0.08)] to-[rgba(189,0,255,0.04)] border border-[rgba(255,0,127,0.25)] rounded-[24px] p-[40px] flex items-center justify-between gap-[30px] flex-wrap relative overflow-hidden reveal-on-scroll">
          <div className="absolute -top-[50%] -right-[10%] w-[300px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,0,127,0.15), transparent 70%)' }} />
          
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center gap-2.5 mb-3 text-[var(--color-brand-pink)]">
              <Wrench size={22} />
              <span className="font-extrabold text-[0.9rem] tracking-[2px] uppercase">Servicio Especial</span>
            </div>
            <h3 className="font-cyber text-[2rem] m-0 mb-2.5 text-white">
              ¿NECESITAS MEDIDAS ESPECIALES?
            </h3>
            <p className="text-[#888] m-0 leading-[1.6] text-[0.95rem]">
              Fabricamos muebles a la medida exacta de tu equipo y espacio. 
              Desde cabinas compactas hasta setups profesionales de gran formato.
            </p>
          </div>
          
          <button 
            onClick={() => window.location.href = 'https://wa.me/525567880698?text=Hola,%20me%20interesa%20solicitar%20una%20cotización%20para%20muebles%20a%20la%20medida.'}
            style={{
              background: 'linear-gradient(135deg, var(--color-brand-pink), #bd00ff)',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '50px',
              color: '#fff',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 8px 30px rgba(255,0,127,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              flexShrink: 0
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,0,127,0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,0,127,0.4)';
            }}
          >
            Solicitar Cotización
          </button>
        </div>

        <div className="mt-12 w-full"><Footer /></div>

      </div>

      {/* MODAL / LIGHTBOX */}
      {selectedCabina && (
        <div 
          className={`modal-overlay ${isVisible ? 'visible' : ''}`}
          onClick={cerrarModal}
        >
          <div 
            className="modal-content overflow-hidden" onClick={e => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={cerrarModal}
              className="absolute top-5 right-5 z-10 w-[44px] h-[44px] rounded-full bg-white/10 border border-white/20 text-white cursor-pointer flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:bg-[var(--color-brand-pink)] hover:border-[var(--color-brand-pink)] hover:rotate-90"
              
            >
              <X size={20} />
            </button>

            <div className="modal-grid grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] min-h-[500px]">
              {/* Lado izquierdo: Galería de imágenes */}
              <div className="relative bg-[#03030d] min-h-[400px]">
                <img 
                  src={selectedCabina.imagenes[currentImageIndex]} 
                  alt={selectedCabina.nombre}
                  className="w-full h-full object-contain block"
                />
                
                {/* Overlay gradiente sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent from-80% to-[rgba(3,3,12,0.5)] pointer-events-none" />

                {/* Navegación de imágenes */}
                {selectedCabina.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={anteriorImagen}
                      className="absolute left-[15px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-black/50 border border-white/20 text-white cursor-pointer flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:bg-[rgba(255,0,127,0.8)] hover:border-[var(--color-brand-pink)]"
                      
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={siguienteImagen}
                      className="absolute right-[15px] top-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-black/50 border border-white/20 text-white cursor-pointer flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:bg-[rgba(255,0,127,0.8)] hover:border-[var(--color-brand-pink)]"
                      
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Indicadores de imagen */}
                {selectedCabina.imagenes.length > 1 && (
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedCabina.imagenes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          border: 'none', cursor: 'pointer',
                          background: idx === currentImageIndex ? 'var(--color-brand-pink)' : 'rgba(255,255,255,0.3)',
                          transition: 'all 0.3s',
                          boxShadow: idx === currentImageIndex ? '0 0 10px var(--color-brand-pink)' : 'none'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Tag flotante */}
                <div className="absolute top-5 left-5 bg-[var(--color-brand-pink)] text-white px-3.5 py-1.5 rounded-[20px] text-[0.75rem] font-extrabold tracking-[1px] uppercase shadow-[0_4px_15px_rgba(255,0,127,0.4)]">
                  {selectedCabina.tag}
                </div>
              </div>

              {/* Lado derecho: Info detallada */}
              <div className="p-[40px] flex flex-col overflow-y-auto max-h-[90vh]">
                
                <div className="mb-[25px]">
                  <h2 className="font-cyber text-[2.2rem] m-0 mb-3 text-white leading-[1.1]">
                    {selectedCabina.nombre}
                  </h2>
                  <p className="text-[#888] text-[1rem] leading-[1.7] m-0">
                    {selectedCabina.descripcion}
                  </p>
                </div>

                {/* PRECIO Y BOTONES DE COMPRA (MOVIDO ARRIBA) */}
                <div className="mb-[35px]">
                  <div className="flex justify-between items-end mb-5 pb-5 border-b border-white/5">
                    <div>
                      <div className="text-[0.8rem] text-[#666] uppercase tracking-[2px] mb-1">
                        Precio de fábrica
                      </div>
                      <div style={{ 
                        fontSize: '2.8rem', fontWeight: 800, 
                        color: 'var(--color-brand-yellow)', lineHeight: '1',
                        textShadow: '0 0 20px rgba(255,235,59,0.3)'
                      }}>
                        ${selectedCabina.precio}
                        <span className="text-[1rem] text-[#888] ml-1.5">MXN</span>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,0,127,0.1)] border border-[rgba(255,0,127,0.3)] px-3 py-1.5 rounded-full text-[0.75rem] text-[var(--color-brand-pink)] font-bold">
                      {selectedCabina.color}
                    </div>
                  </div>

                  {/* Botones de Compra Multi-Plataforma */}
                  <div className="flex flex-col gap-3">
                    <button onClick={() => handleComprar(selectedCabina)} disabled={isRedirecting} className={`w-full bg-gradient-to-br from-[#009ee3] to-[#007bb5] border-none p-4 rounded-2xl text-white text-[1rem] font-extrabold flex items-center justify-center gap-[10px] transition-all duration-300 uppercase tracking-[1px] shadow-[0_8px_30px_rgba(0,158,227,0.3)] ${isRedirecting ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"}`}>
                      <ShoppingBag size={20} />
                      {isRedirecting ? 'Procesando...' : 'Comprar Ahora (Mercado Pago)'}
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <a href={selectedCabina.amazonLink} target="_blank" rel="noopener noreferrer" className="no-underline">
                        <button className="w-full bg-[#ff9900] border-none p-3 rounded-xl text-black text-[0.85rem] font-extrabold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03]">
                          <ExternalLink size={16} /> Amazon
                        </button>
                      </a>
                      <a href={selectedCabina.mlLink} target="_blank" rel="noopener noreferrer" className="no-underline">
                        <button className="w-full bg-[#ffe600] border-none p-3 rounded-xl text-black text-[0.85rem] font-extrabold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03]">
                          <ExternalLink size={16} /> Mercado Libre
                        </button>
                      </a>
                    </div>
                    
                    <a href={selectedCabina.fbLink} target="_blank" rel="noopener noreferrer" className="no-underline">
                      <button className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white text-[0.85rem] font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white/10">
                        <ExternalLink size={16} color="#1877f2" /> Contactar por Facebook Marketplace
                      </button>
                    </a>
                  </div>

                  <p className="text-center mt-3 mb-0 text-[#555] text-[0.75rem]">
                    <ShieldCheck size={12} className="inline align-middle mr-1" />
                    Compras protegidas a través de pasarelas oficiales
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-[10px] mb-[25px]">
                  {Object.entries(selectedCabina.specs).map(([key, val]) => (
                    <div key={key} className="bg-white/[0.03] border border-white/5 px-4 py-3 rounded-xl">
                      <div className="text-[0.7rem] text-[#666] uppercase tracking-[1px] mb-1">
                        {key === 'medidas' ? 'Medidas (LxPxA)' : key}
                      </div>
                      <div className="text-[0.95rem] text-white font-bold flex items-center gap-1.5">
                        {key === 'medidas' && <Ruler size={14} color="var(--color-brand-cyan)" />}
                        {key === 'peso' && <Package size={14} color="var(--color-brand-cyan)" />}
                        {key === 'ensamble' && <Clock size={14} color="var(--color-brand-cyan)" />}
                        {key === 'garantia' && <ShieldCheck size={14} color="var(--color-brand-cyan)" />}
                        {key === 'material' && <Sparkles size={14} color="var(--color-brand-cyan)" />}
                        {val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-[25px]">
                  <h3 className="text-[0.85rem] text-[var(--color-brand-pink)] m-0 mb-3 tracking-[2px] uppercase font-extrabold">
                    Características
                  </h3>
                  {selectedCabina.features.map((feat, idx) => (
                    <div key={idx} className="feature-item">
                      <CheckCircle2 size={16} color="var(--color-brand-cyan)" />
                      {feat}
                    </div>
                  ))}
                </div>

                {/* Envío y Entrega */}
                <div className="mb-[25px]">
                  <h3 className="text-[0.85rem] text-[var(--color-brand-yellow)] m-0 mb-3 tracking-[2px] uppercase font-extrabold">
                    Envío y Entrega
                  </h3>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="envio-item">
                      <MapPin size={16} color="var(--color-brand-pink)" />
                      <div>
                        <div className="text-[0.75rem] text-[#666] uppercase">CDMX</div>
                        <div className="text-[0.85rem] text-white font-semibold">{selectedCabina.envio.cdmx}</div>
                      </div>
                    </div>
                    <div className="envio-item">
                      <Package size={16} color="var(--color-brand-yellow)" />
                      <div>
                        <div className="text-[0.75rem] text-[#666] uppercase">Interior</div>
                        <div className="text-[0.85rem] text-white font-semibold">{selectedCabina.envio.interior}</div>
                      </div>
                    </div>
                    <div className="envio-item">
                      <MapPin size={16} color="#25d366" />
                      <div>
                        <div className="text-[0.75rem] text-[#666] uppercase">Bodegas</div>
                        <div className="text-[0.85rem] text-white font-semibold">{selectedCabina.envio.bodegas.join(' / ')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mueble a medida */}
                {selectedCabina.aMedida && (
                  <div className="bg-[rgba(255,0,127,0.08)] border border-[rgba(255,0,127,0.25)] rounded-xl px-4 py-3 mb-[25px] flex items-center gap-2.5">
                    <Wrench size={18} color="var(--color-brand-pink)" />
                    <div>
                      <div className="text-[0.85rem] text-white font-bold">Disponible a la medida</div>
                      <div className="text-[0.8rem] text-[#888]">Podemos ajustar dimensiones según tu setup</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
