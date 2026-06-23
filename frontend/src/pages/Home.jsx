import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, Play, Sparkles, 
  Music, Zap, Disc, Headphones, 
  ChevronRight, Volume2, ChevronDown
} from 'lucide-react';

import Footer from '../components/Footer';
import GoogleReviews from '../components/GoogleReviews';
import ServicesSection from '../components/ServicesSection';

// 📸 GALERÍA COMPLETA DE FOTOS REALES DEL PROYECTO
import heroBackground from '../assets/premium_hero_bg.jpg';
import heroOldBackground from '../assets/hero.png';
import premiumTurntable from '../assets/minimalist_vinyl.jpg';
import showLasers from '../assets/40e7af3d-94f8-418e-bfe0-6e7f11e86996.jpg';
import disparoCo2 from '../assets/160523.jpg';
import cabinaDenonPista from '../assets/AE69E51A-CF1E-409E-8899-B4E2D45FB79F.jpg';
import escenarioGalactus from '../assets/Cabina DJ Blanca Diamante Frente.jpeg';
import setupJardin from '../assets/IMG_4921.JPG';
import consolaCloseup from '../assets/BB8F1BA0-38B6-4B43-8F62-B3A346AB7D5C.jpg';
import consolaDJ from '../assets/IMG_4911.JPG';
import setupExterior2 from '../assets/IMG_5401.JPG';
import setupExterior3 from '../assets/IMG_5404.JPG';

// NUEVAS FOTOS DE GÉNEROS
import cumbiaDance from '../assets/cumbia_dance.jpg';
import rockCrowd from '../assets/rock_crowd.jpg';
import openFormat from '../assets/open_format.jpg';

// 🎥 VIDEOS DEL PROYECTO
import videoShowUrl from '../assets/IMG_5404.MP4?url';
import videoGenteBailando from '../assets/IMG_2958.MOV?url';
import videoConsolaYBailando from '../assets/FE8097BE-2C22-4D19-89BA-407922426329.mp4?url';



export default function Home() {
  const [activeGenre, setActiveGenre] = useState('reggaeton');
  const [playingSet, setPlayingSet] = useState(null);
  const audioRef = useRef(null);

  const toggleSet = (idx) => {
    if (playingSet === idx) {
      audioRef.current.pause();
      setPlayingSet(null);
    } else {
      setPlayingSet(idx);
      // Wait for React to update the audio src, then play
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log('Error reproduciendo audio', e));
        }
      }, 50);
    }
  };

  const irACotizar = (tipoPaquete) => {
    window.location.href = `/cotizacion?paquete=${tipoPaquete}`;
  };

  const abrirWhatsApp = (mensajeCustom = null) => {
    const tuNumeroWhatsapp = "525567880698"; 
    const texto = mensajeCustom || "¡Hola Gustavo! Me interesa cotizar un evento en la CDMX y apartar mi fecha.";
    const mensajeURL = encodeURIComponent(texto);
    const linkCompletoWA = `https://wa.me/${tuNumeroWhatsapp}?text=${mensajeURL}`;
    window.open(linkCompletoWA, '_blank', 'noopener,noreferrer');
  };



  const genres = [
    { id: 'reggaeton', name: 'Reggaetón', icon: <Music size={16} />, color: 'var(--color-brand-pink)' },
    { id: 'electronic', name: 'Electrónica', icon: <Zap size={16} />, color: 'var(--color-brand-cyan)' },
    { id: 'cumbia', name: 'Cumbia/Banda', icon: <Disc size={16} />, color: 'var(--color-brand-yellow)' },
    { id: 'rock', name: 'Rock/Indie', icon: <Headphones size={16} />, color: '#ff5e00' },
    { id: 'open', name: 'Formato Abierto', icon: <Sparkles size={16} />, color: '#bd00ff' },
  ];



  const sets = [
    { title: "Set Reggaetón Old School", duration: "45 min", plays: "2.4k", color: "var(--color-brand-pink)", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Electro House Fiesta", duration: "60 min", plays: "1.8k", color: "var(--color-brand-cyan)", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Cumbia Remix En Vivo", duration: "50 min", plays: "3.1k", color: "var(--color-brand-yellow)", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  ];

  return (
    <div className="bg-[#03030c] min-h-screen text-white font-body overflow-x-hidden relative select-none">
      <Helmet>
        <title>Gustavo Delgadillo - DJ en CDMX y Todo México | Audio Profesional</title>
        <meta name="description" content="Contrata al mejor DJ para tu evento de música, boda o fiesta corporativa. Servicio de sonido, iluminación y renta de cabinas DJ en CDMX, Estado de México y foráneos." />
        <meta name="keywords" content="DJ Gustavo Delgadillo, evento de musica, Sonido, renta de audio, DJ para bodas CDMX, cabinas DJ" />
      </Helmet>

      <audio 
        ref={audioRef} 
        src={playingSet !== null ? sets[playingSet].audioSrc : undefined} 
        loop 
        style={{ display: 'none' }} 
      />
      
      

      {/* 🟢 BOTÓN FLOTANTE WA */}
      <button 
        onClick={abrirWhatsApp}
        className="wa-float border-none cursor-pointer p-0" title="Contactar por WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </button>

      {/* 🌌 HERO SECTION EN TAILWIND */}
      <div id="inicio" className="relative min-h-screen flex items-center bg-cover bg-center overflow-hidden pt-24 pb-16 md:py-0" style={{ 
        backgroundImage: 'linear-gradient(to bottom, rgba(3,3,12,0.3) 0%, rgba(3,3,12,0.7) 50%, #03030c 100%), url(' + heroBackground + ')'
      }}>
        <div className="laser top-[30%]" />
        <div className="laser top-[60%]" style={{ animationDelay: '4s', background: 'linear-gradient(90deg, transparent, var(--color-brand-pink), #fff, transparent)' }} />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full opacity-30" style={{
              width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
              background: i % 2 === 0 ? 'var(--color-brand-pink)' : 'var(--color-brand-cyan)',
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              boxShadow: `0 0 20px ${i % 2 === 0 ? 'var(--color-brand-pink)' : 'var(--color-brand-cyan)'}`,
              animation: `float ${5 + i}s ease-in-out infinite alternate`
            }} />
          ))}
        </div>

        <div className="max-w-[1300px] mx-auto w-full px-4 md:pl-4 md:pr-8 lg:pl-4 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div className="text-center md:text-left flex flex-col items-center md:items-start lg:-ml-8 md:-translate-y-16 lg:-translate-y-24">
            <span className="sr-only">Gustavo Delgadillo - DJ de eventos de música y Sonido Profesional</span>



            <div className="inline-flex items-center gap-2.5 bg-[#ff007f1a] border border-[#ff007f4d] px-4 py-2 rounded-full mb-6 text-white text-[0.75rem] font-bold tracking-wider backdrop-blur-md select-none">
              <Sparkles size={12} color="var(--color-brand-yellow)" /> DJ PARA FIESTAS EN CDMX • MEZCLAS EN VIVO
            </div>

            <h1 className="font-cyber m-0 leading-[1.1] drop-shadow-[0_0_40px_rgba(255,0,127,0.5)] cursor-default select-none glitch-hover flex flex-wrap items-center justify-center md:justify-start gap-4 text-[3.5rem] md:text-[5rem] lg:text-[6rem] w-full">
              <span className="text-[var(--color-brand-pink)] whitespace-nowrap">SERVICIO DE</span>
              <span className="text-[var(--color-brand-cyan)] whitespace-nowrap">DJ</span>
            </h1>

            <p className="text-[1.1rem] text-[#ccc] max-w-[500px] my-6 leading-relaxed font-light mx-auto md:mx-0 select-none">
              El mejor <strong className="text-white font-bold">servicio de DJ y renta de equipo audiovisual</strong> en CDMX y Foráneo. Aparta tu fecha hoy con un anticipo y asegura el éxito de tu evento.
            </p>

            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              <a href="/cotizacion?paquete=Base" className="bg-gradient-to-br from-[var(--color-brand-pink)] to-[#bd00ff] text-white border-none px-9 py-[18px] rounded-full text-[1.1rem] font-extrabold cursor-pointer select-none inline-flex items-center gap-2.5 shadow-[0_10px_30px_rgba(255,0,127,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_40px_rgba(255,0,127,0.6)] tracking-wider no-underline">
                COTIZAR MI EVENTO <ArrowRight size={20} />
              </a>
              
              <a 
                href="/paquetes"
                className="bg-white/5 text-white border border-white/20 px-9 py-[18px] rounded-full text-[1.1rem] font-semibold no-underline inline-flex select-none items-center gap-2.5 backdrop-blur-md transition-all duration-300 cursor-pointer hover:bg-white/10 hover:border-white">
                <Disc size={20} />
                VER PAQUETES DE DJ
              </a>
            </div>

            <div className="mt-10 flex gap-8 items-center justify-center md:justify-start select-none">
              <div className="flex gap-1 h-8 items-end">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="eq-bar h-full" />
                ))}
              </div>
              <span className="text-[#888] text-[0.9rem] font-medium">
                Escuchando ahora: <span className="text-[var(--color-brand-cyan)]">Set En Vivo - GD Producciones</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex relative justify-center">
            <div className="w-[320px] h-[320px] rounded-full p-1 relative shadow-[0_0_60px_rgba(255,0,127,0.3)] bg-[conic-gradient(from_0deg,var(--color-brand-pink),var(--color-brand-cyan),var(--color-brand-yellow),var(--color-brand-pink))]">
              <div className="w-full h-full rounded-full relative overflow-hidden vinyl-spin-slow" style={{ background: 'url(' + premiumTurntable + ') center/cover' }}>
                <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_10px,rgba(0,0,0,0.3)_10px,rgba(0,0,0,0.3)_12px)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#03030c] border-2 border-white/20 flex items-center justify-center">
                  <Disc size={32} color="var(--color-brand-pink)" />
                </div>
              </div>
            </div>
            
            <div className="absolute top-5 right-0 bg-[#07071c]/80 backdrop-blur-md border border-[var(--color-brand-cyan)]/30 rounded-2xl px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] select-none">
              <div className="text-[1.8rem] font-extrabold text-[var(--color-brand-cyan)]">500+</div>
              <div className="text-[0.8rem] text-[#aaa]">Eventos realizados</div>
            </div>
            
            <div className="absolute -bottom-10 left-0 bg-[#07071c]/80 backdrop-blur-md border border-[var(--color-brand-pink)]/30 rounded-2xl px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] select-none">
              <div className="text-[1.8rem] font-extrabold text-[var(--color-brand-pink)]">10+</div>
              <div className="text-[0.8rem] text-[#aaa]">Años de experiencia</div>
            </div>
          </div>
        </div>
      </div>
      {/* FIN HERO SECTION */}

      <div className="max-w-[1200px] mx-auto px-5 w-full">

        
        {/* 🎥 GALERÍA MASONRY COMPLETA - SIN REPETIR FOTOS */}
        <div id="galería" className="mb-[100px]">
          <div className="text-center mb-[50px]">
            <h2 className="font-cyber text-[3rem] m-0">
              ASÍ SE VIVE LA <span className="text-[var(--color-brand-cyan)]">ENERGÍA</span>
            </h2>
            <p className="text-[#666] mt-[10px] text-[1.1rem]">
              Producciones reales. Pistas llenas. Momentos épicos.
            </p>
          </div>

          {/* CONEXIÓN HUMANA: CONOCE A TU DJ */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white/5 border border-white/10 rounded-3xl p-8 mb-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-pink/20 relative">
                <img src="/Logo.jpeg" alt="Gustavo Delgadillo DJ" className="w-full h-[250px] object-cover saturate-110" />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-left">
              <h3 className="font-cyber text-2xl text-brand-pink mb-4">¿QUIÉN PONDRÁ EL AMBIENTE?</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                "Mi objetivo no es solo poner música, es crear la <strong>banda sonora perfecta</strong> para tu evento."
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Al contratar nuestros servicios, te garantizo trato directo y personalizado. <strong>Nada de intermediarios ni agencias sin rostro.</strong> Estaré contigo desde la entrevista inicial para entender tus gustos, hasta el último minuto en la pista de baile asegurando que la energía nunca caiga.
              </p>
              <div className="flex gap-4">
                <span className="bg-brand-cyan/10 text-brand-cyan px-4 py-1.5 rounded-full text-sm font-semibold border border-brand-cyan/20">Trato Directo</span>
                <span className="bg-brand-pink/10 text-brand-pink px-4 py-1.5 rounded-full text-sm font-semibold border border-brand-pink/20">+10 Años Experiencia</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-5">
            {/* 1. Video Show Láser - Grande arriba izquierda */}
            <div className="media-v2 md:col-span-2 md:row-span-1 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
              <video src={videoShowUrl} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
              <div className="absolute top-5 left-5 bg-[#ff007fe6] px-3.5 py-1.5 rounded-lg text-[0.8rem] font-bold flex items-center gap-1.5 z-10 text-white">
                <Play size={12} fill="#fff" /> ILUMINACIÓN SYNCHRO
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-[30px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
                <h3 className="font-cyber text-[1.8rem] m-0">SHOW LASER EN VIVO</h3>
                <p className="text-[#aaa] mt-[5px] text-[0.9rem]">Estructuras Truss con cabezas Beam programadas al ritmo</p>
              </div>
            </div>

            {/* 2. Consola DJ (IMG_4911) - Derecha arriba */}
            <div className="media-v2 md:row-span-2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
              <img src={consolaDJ} alt="Equipo de DJ profesional" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
              <div className="absolute bottom-0 left-0 right-0 p-[25px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
                <h4 className="font-cyber text-[1.5rem] text-[var(--color-brand-cyan)] m-0">EQUIPO PROFESIONAL</h4>
                <p className="text-[#888] text-[0.85rem] mt-[5px]">Consolas digitales de última generación</p>
              </div>
            </div>

            {/* 3. Setup Jardín (IMG_4921) */}
            <div className="media-v2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
              <img src={setupJardin} alt="Montaje en jardín" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
              <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
                <h4 className="font-cyber text-[1.3rem] text-[var(--color-brand-yellow)] m-0 flex items-center gap-[6px]">
                  <Sparkles size={16} /> MONTAJE EXTERIOR
                </h4>
              </div>
            </div>

            {/* 4. Setup Exterior 2 (IMG_5401) */}
            <div className="media-v2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
              <img src={setupExterior2} alt="Producción en exterior" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
              <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
                <h4 className="font-cyber text-[1.3rem] text-white m-0 flex items-center gap-[6px]">
                  <Music size={16} /> PRODUCCIÓN COMPLETA
                </h4>
              </div>
            </div>

            {/* 5. Video Gente Bailando (IMG_2958) - Grande medio */}
            <div className="media-v2 md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
              <video src={videoGenteBailando} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-[0.85] group-hover:saturate-125" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-10">
                <div className="w-[60px] h-[60px] rounded-full bg-[#ff007fe6] flex items-center justify-center">
                  <Play size={28} fill="#fff" color="#fff" />
                </div>
              </div>
              <div className="absolute top-5 right-5 bg-[#00f2fee6] px-3.5 py-1.5 rounded-lg text-[0.75rem] font-extrabold text-[#03030c] z-20 tracking-widest">
                PISTA LLENA
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-[30px] bg-gradient-to-t from-[#03030cf2] to-transparent z-20">
                <h3 className="font-cyber text-[2rem] m-0">LA GENTE NO PARA</h3>
                <p className="text-[#aaa] mt-[5px] text-[0.9rem]">Ambiente real de pista de baile</p>
              </div>
            </div>

            {/* 6. Setup Exterior 3 (IMG_5404) */}
            <div className="media-v2 md:row-span-2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
              <img src={setupExterior3} alt="Montaje audiovisual" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
              <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
                <h4 className="font-cyber text-[1.3rem] text-[var(--color-brand-pink)] m-0 flex items-center gap-[6px]">
                  <Zap size={16} /> AUDIOVISUAL
                </h4>
              </div>
            </div>

            {/* 7. Video Consola + Gente (FE8097BE...) */}
            <div className="media-v2 md:col-span-2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] group">
              <video src={videoConsolaYBailando} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-[0.85] group-hover:saturate-125" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-10">
                <div className="w-[50px] h-[50px] rounded-full bg-[#00f2fee6] flex items-center justify-center">
                  <Play size={22} fill="#fff" color="#fff" />
                </div>
              </div>
              <div className="absolute top-[15px] left-[15px] bg-[#ffeb3be6] px-2.5 py-1 rounded-md text-[0.7rem] font-extrabold text-[#03030c] z-20">
                BEHIND THE DECKS
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-20">
                <h4 className="font-cyber text-[1.3rem] text-[var(--color-brand-yellow)] m-0 flex items-center gap-[6px]">
                  <Music size={14} /> DESDE LA CONSOLA
                </h4>
              </div>
            </div>

            {/* 12. Disparo CO2 (160523) */}
            <div className="media-v2 relative rounded-2xl overflow-hidden bg-[#07071c] border border-white/10 transition-all duration-500 hover:scale-105 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)]">
              <img src={disparoCo2} alt="Efectos especiales CO2" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 saturate-[0.85] hover:saturate-125" />
              <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-[#03030cf2] to-transparent z-10">
                <h4 className="font-cyber text-[1.3rem] text-[var(--color-brand-yellow)] m-0 flex items-center gap-[6px]">
                  <Sparkles size={16} /> CO2 FX
                </h4>
              </div>
            </div>
          </div>
        </div>

        
        {/* GÉNEROS EN TAILWIND */}
        <div className="text-center my-[100px] md:mb-[60px]">
          <h2 className="font-cyber text-[3rem] mb-[15px]">
            ¿QUÉ SUENA EN TU <span className="text-[var(--color-brand-pink)]">FIESTA</span>?
          </h2>
          <p className="text-[#888] text-[1.1rem] mb-[40px]">
            Selecciona un género y escucha cómo transformamos la pista
          </p>
          
          <div className="flex gap-[12px] justify-center flex-wrap mb-[50px]">
            {genres.map(g => (
              <button 
                key={g.id}
                onClick={() => setActiveGenre(g.id)}
                className={`genre-tag ${activeGenre === g.id ? 'active' : ''}`}
                style={{ color: activeGenre === g.id ? g.color : '#aaa' }}
              >
                {g.icon} {g.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-[#07071c] to-[#0d0d2a] rounded-[28px] p-10 border border-white/5">
            <div className="text-left">
              <div className="flex items-center gap-[10px] mb-[20px] select-none">
                <Volume2 size={24} color={genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)'} />
                <span className="font-bold text-[0.9rem] tracking-[2px] uppercase" style={{ 
                  color: genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)',
                }}>
                  Reproduciendo ahora
                </span>
              </div>
              <h3 className="font-cyber text-[2.5rem] mb-[15px]">
                {genres.find(g => g.id === activeGenre)?.name.toUpperCase()}
              </h3>
              <p className="text-[#aaa] leading-[1.7] text-[1.05rem] mb-[25px]">
                {activeGenre === 'reggaeton' && "Desde el clásico hasta el perreo intenso. Transiciones perfectas que mantienen la pista prendida toda la noche."}
                {activeGenre === 'electronic' && "House, Techno, EDM y Progressive. Beats que elevan la energía y crean momentos épicos en la pista."}
                {activeGenre === 'cumbia' && "La esencia mexicana con toques modernos. Cumbia rebajada, sonidera y banda para todos los gustos."}
                {activeGenre === 'rock' && "Alternativo, Indie, Clásicos en inglés y español. Para esos momentos de pura energía y nostalgia."}
                {activeGenre === 'open' && "¿Por qué elegir uno solo? Mezclamos TODO en vivo. Del reggaetón al rock en segundos sin cortes abruptos."}
              </p>
              <div className="flex gap-[8px] h-[40px] items-end opacity-60">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="eq-bar w-[6px]" style={{ 
                    animationDuration: `${0.5 + (i % 5) * 0.2}s`,
                    background: genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)'
                  }} />
                ))}
              </div>
            </div>
            
            <div className="rounded-[20px] overflow-hidden h-[300px] border-2 shadow-2xl transition-all duration-300" style={{ 
              borderColor: `${genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)'}40`,
              boxShadow: `0 0 40px ${genres.find(g => g.id === activeGenre)?.color || 'var(--color-brand-pink)'}20`
            }}>
              <img 
                src={
                  activeGenre === 'electronic' ? showLasers : 
                  activeGenre === 'cumbia' ? cumbiaDance : 
                  activeGenre === 'rock' ? rockCrowd :
                  activeGenre === 'open' ? openFormat :
                  cabinaDenonPista
                } 
                alt="DJ en acción" 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>

        
        {/* SETS EN TAILWIND */}
        <div id="sets" className="mb-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
            <div>
              <div className="flex items-center gap-[10px] text-[var(--color-brand-pink)] mb-[15px] font-bold tracking-[2px] text-[0.9rem]">
                <Disc size={20} className="vinyl-spin" /> SETS RECIENTES
              </div>
              <h2 className="font-cyber text-[3rem] m-0 mb-[20px] leading-none">
                ESCUCHA ANTES DE <span className="text-[var(--color-brand-cyan)]">CONTRATAR</span>
              </h2>
              <p className="text-[#aaa] leading-[1.7] mb-[30px] text-[1.05rem]">
                Nuestros sets no son playlists automáticas. Son mezclas en vivo, 
                leídas de la pista, con transiciones limpias y energía calculada.
              </p>
              
              <div className="mt-[20px] flex flex-col gap-3">
                {sets.map((set, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-[var(--color-brand-pink)]/10 hover:border-[var(--color-brand-pink)]/30 hover:translate-x-2 transition-all duration-300 cursor-pointer" onClick={() => toggleSet(idx)}>
                    <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center shrink-0" style={{
                      background: `linear-gradient(135deg, ${set.color}40, ${set.color}20)`,
                      border: `1px solid ${set.color}60`,
                      color: set.color
                    }}>
                      {playingSet === idx ? (
                        <div className="flex gap-[3px] items-end h-[16px]">
                          <div className="eq-bar w-1" style={{ background: set.color }} />
                          <div className="eq-bar w-1" style={{ background: set.color, animationDelay: '0.1s' }} />
                          <div className="eq-bar w-1" style={{ background: set.color, animationDelay: '0.2s' }} />
                        </div>
                      ) : (
                        <Play size={20} fill={set.color} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[1rem] mb-1 transition-colors duration-300" style={{ color: playingSet === idx ? set.color : '#fff' }}>{set.title}</div>
                      <div className="text-[0.85rem] text-[#666] flex gap-[12px]">
                        <span>{set.duration}</span>
                        <span>•</span>
                        <span>{set.plays} reproducciones</span>
                      </div>
                    </div>
                    <ChevronRight size={20} color="#444" />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block relative">
              <div className="rounded-[24px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <img src={consolaCloseup} alt="Setup" className="w-full block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03030ccc] to-transparent flex items-end p-[30px]">
                  <div>
                    <div className="inline-flex items-center gap-[8px] bg-[#00f2fe26] border border-[#00f2fe66] px-3.5 py-1.5 rounded-full mb-[10px] text-[var(--color-brand-cyan)] text-[0.8rem] font-bold">
                      <Zap size={12} /> LIVE MIXING
                    </div>
                    <div className="text-[1.3rem] font-bold text-white">Consolas Denon Prime 4</div>
                    <div className="text-[#888] text-[0.9rem]">Mezcla totalmente en vivo</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-[20px] -right-[20px] w-[100px] h-[100px] rounded-[20px] bg-gradient-to-br from-[var(--color-brand-pink)] to-[#bd00ff] opacity-80 blur-[30px] -z-10" />
            </div>
          </div>
        </div>

        <GoogleReviews />

        {/* SERVICIOS MODULARIZADOS */}
        <ServicesSection />

        {/* PREGUNTAS FRECUENTES (FAQ) */}
        <div className="mb-[100px] mt-20">
          <div className="text-center mb-12">
            <h2 className="font-cyber text-[3rem] m-0">PREGUNTAS <span className="text-[var(--color-brand-cyan)]">FRECUENTES</span></h2>
            <p className="text-[#666] mt-[10px] text-[1.1rem]">Todo lo que necesitas saber antes de contratar.</p>
          </div>
          <div className="max-w-[800px] mx-auto flex flex-col gap-4">
            <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
              <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
                ¿Haces labor de Animador (MC) o solo mezclas?
                <ChevronDown className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="text-gray-400 mt-4 leading-relaxed">
                Sí. Me encargo de hacer los anuncios protocolarios (entrada de novios, vals, inicio de baile) y de interactuar con el público con el micrófono para mantener la energía en alto, pero <strong>sin ser invasivo</strong> ni hablar sobre las canciones todo el tiempo.
              </div>
            </details>
            <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
              <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
                ¿Puedo darte una "Lista Negra" de canciones prohibidas?
                <ChevronDown className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="text-gray-400 mt-4 leading-relaxed">
                ¡Claro! Tu evento, tus reglas. Siempre tenemos una entrevista previa para conocer tus gustos y es vital que me compartas tanto tus canciones favoritas como aquellos géneros o temas que definitivamente no quieres que suenen bajo ninguna circunstancia.
              </div>
            </details>
            <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-colors">
              <summary className="flex justify-between items-center font-bold text-lg cursor-pointer list-none text-white group-open:text-[var(--color-brand-cyan)]">
                ¿Cuáles son tus requerimientos técnicos para montar?
                <ChevronDown className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="text-gray-400 mt-4 leading-relaxed">
                Requerimos <strong>2 tomas de corriente independientes a no más de 10 metros</strong> de la zona de montaje. Para paquetes grandes, necesitamos acceso al lugar al menos <strong>3 horas antes</strong> del inicio del evento para armar estructuras y configurar iluminación sin interrumpir.
              </div>
            </details>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}