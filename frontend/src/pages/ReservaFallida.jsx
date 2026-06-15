import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { XCircle, RefreshCcw } from 'lucide-react';

export default function ReservaFallida() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-[#0a0a1a] border border-[#1a1a3e] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(255,59,48,0.1)]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#ff3b30] to-transparent opacity-50" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#ff3b30] rounded-full blur-[100px] opacity-10" />

        {/* Failed Icon */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-[#ff3b30] rounded-full animate-ping opacity-20" />
          <div className="relative bg-[#07071c] border-2 border-[#ff3b30] w-full h-full rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,59,48,0.3)]">
            <XCircle size={48} className="text-[#ff3b30]" />
          </div>
        </div>

        <h1 className="font-['Bangers'] text-4xl md:text-5xl text-white tracking-widest mb-4">
          ¡PAGO DECLINADO!
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Lamentablemente tu tarjeta fue rechazada o hubo un problema de conexión con tu banco. Tu fecha <strong>no</strong> ha sido apartada.
        </p>

        <div className="bg-[#07071c] border border-[#1a1a3e] rounded-2xl p-6 text-left mb-10 max-w-md mx-auto">
          <h3 className="text-[#ff3b30] font-bold uppercase tracking-wider text-sm mb-4">¿Qué puedes hacer?</h3>
          
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="bg-[#ff3b30]/10 p-2 rounded-lg text-[#ff3b30] shrink-0">
                <RefreshCcw size={20} />
              </div>
              <p className="text-sm text-gray-400">
                <strong className="text-white block mb-1">Intentar con otra tarjeta</strong>
                Puedes volver a la página de cotización e intentar usar una tarjeta diferente o contactar a tu banco.
              </p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/cotizacion" 
            className="inline-flex justify-center items-center gap-2 bg-[#ff3b30] hover:bg-[#ff4b40] text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(255,59,48,0.3)] transition-all hover:-translate-y-1"
          >
            INTENTAR DE NUEVO <RefreshCcw size={20} />
          </Link>
          <Link 
            to="/" 
            className="inline-flex justify-center items-center gap-2 bg-transparent border border-[#1a1a3e] hover:bg-white/5 text-gray-300 font-bold py-4 px-8 rounded-xl transition-all"
          >
            VOLVER AL INICIO
          </Link>
        </div>
      </div>
    </div>
  );
}
