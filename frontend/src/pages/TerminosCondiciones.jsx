import { useEffect } from "react";
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TerminosCondiciones() {
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
          <ShieldCheck size={40} className="text-brand-pink" />
          <h1 className="font-['Bangers'] text-4xl md:text-5xl text-white tracking-widest">
            TÉRMINOS Y CONDICIONES
          </h1>
        </div>

        <div className="bg-[#0a0a1a] border border-[#1a1a3e] rounded-3xl p-8 md:p-12 space-y-8 shadow-[0_0_30px_rgba(255,0,127,0.05)] text-sm md:text-base leading-relaxed">
          
          <div className="bg-brand-yellow/10 border-l-4 border-brand-yellow p-4 rounded-r-lg mb-8">
            <p className="text-brand-yellow font-bold">Nota:</p>
            <p className="text-gray-400">Este es un documento temporal (PlaceHolder). Los términos y condiciones oficiales serán proporcionados por GDL Producciones posteriormente.</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Aspectos Generales</h2>
            <p>Al acceder y utilizar el sitio web y los servicios de GDL Producciones, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Reservaciones y Pagos</h2>
            <p>Las fechas para eventos solo se considerarán bloqueadas y confirmadas una vez que el pago correspondiente (anticipo o liquidación) haya sido acreditado satisfactoriamente a través de nuestros métodos de pago oficiales (Mercado Pago). Las cotizaciones no pagadas no garantizan disponibilidad de fecha.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Logística del Evento</h2>
            <p>El cliente es responsable de proveer un espacio adecuado, techado y con acceso a toma de corriente eléctrica estándar a no más de 10 metros del área de montaje. El personal de GDL Producciones se reserva el derecho de no instalar equipo si las condiciones del lugar ponen en riesgo la integridad de los equipos o del personal.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Propiedad del Equipo</h2>
            <p>Todo el equipo audiovisual (bocinas, cabinas, iluminación) es propiedad exclusiva de GDL Producciones. Cualquier daño ocasionado al equipo por invitados del evento, riñas o descuidos imputables al cliente será evaluado y el costo de reparación o reposición deberá ser cubierto por el contratante.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Modificaciones de Servicio</h2>
            <p>Cualquier solicitud de horas extra el día del evento estará sujeta a disponibilidad del DJ y del recinto, y deberá pagarse en efectivo o transferencia antes de iniciar el bloque adicional.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
