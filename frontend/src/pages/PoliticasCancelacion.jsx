import { useEffect } from "react";
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PoliticasCancelacion() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black text-gray-300 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto mt-8">
        
        <Link to="/" className="inline-flex items-center gap-2 text-brand-cyan hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>

        <div className="flex items-center gap-4 mb-10">
          <AlertTriangle size={40} className="text-orange-500" />
          <h1 className="font-['Bangers'] text-4xl md:text-5xl text-white tracking-widest">
            POLÍTICAS DE CANCELACIÓN
          </h1>
        </div>

        <div className="bg-[#0a0a1a] border border-[#1a1a3e] rounded-3xl p-8 md:p-12 space-y-8 shadow-[0_0_30px_rgba(255,165,0,0.05)] text-sm md:text-base leading-relaxed">
          
          <div className="bg-brand-yellow/10 border-l-4 border-brand-yellow p-4 rounded-r-lg mb-8">
            <p className="text-brand-yellow font-bold">Nota:</p>
            <p className="text-gray-400">Este es un documento temporal (PlaceHolder). Las políticas oficiales serán proporcionadas por GDL Producciones posteriormente.</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Cancelaciones por Parte del Cliente</h2>
            <p>Toda cancelación deberá notificarse formalmente por escrito vía correo electrónico o al número oficial de WhatsApp. Las cancelaciones están sujetas a los siguientes criterios de reembolso:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-400">
              <li><strong>Con más de 30 días de anticipación:</strong> Se podrá reembolsar hasta el 50% del anticipo o reprogramar la fecha (sujeto a disponibilidad).</li>
              <li><strong>Con menos de 30 días de anticipación:</strong> No se realizarán reembolsos de anticipos bajo ninguna circunstancia, ya que esa fecha fue bloqueada impidiendo la venta a otros clientes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Reprogramaciones de Fecha</h2>
            <p>Se permite un máximo de una (1) reprogramación por evento, solicitada con al menos 20 días de anticipación. La nueva fecha está sujeta a la disponibilidad del calendario de GDL Producciones y podría estar sujeta a un ajuste de tarifas si los precios del año o temporada han cambiado.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Cancelaciones por Causas de Fuerza Mayor</h2>
            <p>En caso de desastres naturales, contingencias sanitarias impuestas por el gobierno local o federal que prohíban eventos sociales, se congelará el saldo a favor del cliente para agendar una nueva fecha dentro de los 12 meses siguientes al evento original. No habrá devoluciones en efectivo.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Cancelaciones por GDL Producciones</h2>
            <p>En el caso altamente improbable de que GDL Producciones deba cancelar por una emergencia extrema e insalvable del DJ titular, se proporcionará un reemplazo de igual o mayor calidad sin costo extra. Si el cliente no acepta el reemplazo, se devolverá el 100% del pago realizado.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
