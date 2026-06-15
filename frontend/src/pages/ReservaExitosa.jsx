import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Phone, ArrowRight } from 'lucide-react';

export default function ReservaExitosa() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#0a0a1a] border border-[#1a1a3e] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(37,211,102,0.1)]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#25d366] to-transparent opacity-50" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#25d366] rounded-full blur-[100px] opacity-10" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-brand-cyan rounded-full blur-[100px] opacity-10" />

        {/* Success Icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-[#25d366] rounded-full animate-ping opacity-20" />
          <div className="relative bg-[#07071c] border-2 border-[#25d366] w-full h-full rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.3)]">
            <CheckCircle2 size={48} className="text-[#25d366]" />
          </div>
        </div>

        <h1 className="font-['Bangers'] text-4xl md:text-5xl text-white tracking-widest mb-4">
          ¡RESERVA EXITOSA!
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Tu pago ha sido procesado correctamente y tu fecha ya se encuentra apartada en nuestro calendario oficial.
        </p>

        <div className="bg-[#07071c] border border-[#1a1a3e] rounded-2xl p-6 text-left mb-10 max-w-md mx-auto">
          <h3 className="text-brand-cyan font-bold uppercase tracking-wider text-sm mb-4">¿Qué sigue ahora?</h3>
          
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="bg-brand-cyan/10 p-2 rounded-lg text-brand-cyan shrink-0">
                <Calendar size={20} />
              </div>
              <p className="text-sm text-gray-400">
                <strong className="text-white block mb-1">Fecha Bloqueada</strong>
                Ya nadie más puede apartar el día y horario que elegiste. Está 100% garantizado para ti.
              </p>
            </li>
            
            <li className="flex gap-4 items-start">
              <div className="bg-[#25d366]/10 p-2 rounded-lg text-[#25d366] shrink-0">
                <Phone size={20} />
              </div>
              <p className="text-sm text-gray-400">
                <strong className="text-white block mb-1">Contacto Directo</strong>
                En las próximas horas, Gustavo Delgadillo se pondrá en contacto contigo vía WhatsApp para afinar la logística del evento.
              </p>
            </li>
          </ul>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-pink to-brand-purple hover:from-pink-500 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.3)] transition-all hover:-translate-y-1"
        >
          VOLVER AL INICIO <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
