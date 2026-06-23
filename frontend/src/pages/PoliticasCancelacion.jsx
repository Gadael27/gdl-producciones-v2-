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
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Política de Reembolso de Anticipos</h2>
            <p>El anticipo o pago parcial realizado para el bloqueo y separación de la fecha tiene el propósito fundamental de garantizar la exclusividad del equipo y personal para el evento de El Cliente, obligando a GDL Producciones a rechazar activamente cualquier otra solicitud para ese mismo día y horario.</p>
            <p className="mt-2 text-pink-400 font-semibold">Por consiguiente, todos los anticipos y pagos iniciales son estrictamente NO REEMBOLSABLES bajo ninguna circunstancia, salvo las excepciones expresamente mencionadas en estas políticas.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Cancelaciones Definitivas por Parte del Cliente</h2>
            <p>Si El Cliente decide cancelar definitivamente la prestación del servicio, deberá notificarlo formalmente por escrito (correo electrónico o mensaje directo al canal oficial de WhatsApp de GDL Producciones).</p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-400">
              <li><strong>Cancelación con más de 30 días de anticipación:</strong> El Cliente no estará obligado a liquidar el saldo pendiente. El anticipo pagado se perderá íntegramente como compensación por daños y perjuicios de agenda.</li>
              <li><strong>Cancelación con menos de 14 días de anticipación:</strong> Dada la imposibilidad comercial de re-vender la fecha en corto plazo, El Cliente quedará obligado a cubrir el <strong>100% del costo total del evento</strong> estipulado originalmente, a pesar de que el evento no se lleve a cabo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Reprogramación o Cambio de Fecha</h2>
            <p>Comprendemos que los planes pueden cambiar. Se permitirá un máximo de una (1) reprogramación por evento, sujeta a los siguientes lineamientos:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-400">
              <li>La solicitud de reprogramación deberá hacerse con un mínimo de <strong>20 días naturales</strong> previos a la fecha original del evento.</li>
              <li>La nueva fecha estará estrictamente sujeta a la disponibilidad del calendario de GDL Producciones.</li>
              <li>El anticipo se trasladará a la nueva fecha sin penalización.</li>
              <li>Si la nueva fecha corresponde a una tarifa mayor (ej. cambio de tarifa por nuevo año, o cambio de temporada baja a temporada alta), El Cliente deberá absorber la diferencia del ajuste de precios.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Cancelaciones por GDL Producciones</h2>
            <p>En el escenario extraordinario e improbable de que GDL Producciones deba cancelar el servicio por razones de fuerza mayor (enfermedad grave incapacitante del DJ titular, siniestro total de transporte o equipos en ruta), nos comprometemos a:</p>
            <ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-400">
              <li>Proveer un DJ/Equipo de reemplazo de calidad y experiencia igual o superior, asumiendo nosotros cualquier diferencia de costo con el subcontratista.</li>
              <li>Si El Cliente no está de acuerdo con el reemplazo propuesto, se realizará un <strong>reembolso íntegro del 100%</strong> de todo el dinero pagado hasta el momento, en un lapso no mayor a 3 días hábiles.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Causas de Fuerza Mayor o Actos de Dios</h2>
            <p>En caso de contingencias mayores fuera del control de ambas partes (desastres naturales declarados, pandemias, clausura gubernamental del recinto), no aplicarán reembolsos de anticipos. En su lugar, el saldo pagado se congelará como "Saldo a Favor" y El Cliente tendrá un plazo de doce (12) meses para reagendar una nueva fecha, sujeto a disponibilidad.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
