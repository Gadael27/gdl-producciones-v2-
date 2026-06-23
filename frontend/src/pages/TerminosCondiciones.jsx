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
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Aspectos Generales y Ámbito de Aplicación</h2>
            <p>Al acceder, navegar o utilizar la plataforma de cotización y reserva de GDL Producciones, usted (en adelante "El Cliente") acepta estar plenamente sujeto a los presentes Términos y Condiciones. Estos términos rigen la contratación de servicios de DJ, audio, iluminación y efectos especiales (en adelante "El Servicio") proveídos exclusivamente dentro del territorio de la República Mexicana.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Reservaciones, Anticipos y Pagos</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Bloqueo de Fecha:</strong> La fecha y horario del evento solo se considerarán bloqueados, confirmados y garantizados una vez que se haya acreditado el pago del anticipo o la liquidación total a través de nuestra pasarela oficial (Mercado Pago).</li>
              <li><strong>Cotizaciones:</strong> Las cotizaciones generadas no garantizan disponibilidad de fecha hasta no realizar el pago correspondiente.</li>
              <li><strong>Liquidación del Saldo:</strong> En caso de haber pagado únicamente el anticipo, el saldo restante deberá liquidarse en su totalidad <strong>el mismo día del evento</strong>, previo al inicio del servicio, ya sea en efectivo o mediante transferencia bancaria. El DJ no comenzará la prestación del servicio si existe un saldo pendiente no aclarado.</li>
              <li><strong>Moneda:</strong> Todos los precios expresados en la plataforma están en Pesos Mexicanos (MXN).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Requisitos Logísticos y Espaciales</h2>
            <p className="mb-3">Para garantizar la excelencia y seguridad del espectáculo, El Cliente se compromete a proporcionar las siguientes condiciones en el recinto del evento:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li><strong>Suministro Eléctrico:</strong> Acceso a al menos una toma de corriente eléctrica estándar (110V-120V) estable, a una distancia no mayor a 10 metros del área designada para el montaje de la cabina.</li>
              <li><strong>Protección contra Elementos:</strong> Si el evento es en exteriores, el área del equipo deberá estar estrictamente techada (carpa, lona firme o estructura) para proteger los componentes electrónicos contra lluvia, sol directo extremo o humedad.</li>
              <li><strong>Tiempo de Montaje:</strong> Permitir el acceso al equipo técnico de GDL Producciones al menos 2 a 3 horas antes del inicio oficial del servicio para el montaje y pruebas de sonido.</li>
            </ul>
            <p className="mt-3 text-red-400/80 italic text-sm">Nota: El personal de GDL Producciones se reserva el derecho de no instalar o suspender el equipo si las condiciones del lugar representan un riesgo inminente de cortocircuito o daño estructural, sin responsabilidad de reembolso.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Responsabilidad y Cuidado del Equipo</h2>
            <p>Todo el equipo audiovisual, estructuras, cableado y periféricos son propiedad exclusiva de GDL Producciones.</p>
            <p className="mt-2">El Cliente asume total responsabilidad por cualquier daño, alteración, derrame de líquidos o robo ocasionado al equipo durante el evento que sea imputable a El Cliente, sus invitados, o personal de otros servicios contratados por él (ej. meseros). En caso de siniestro, El Cliente deberá cubrir el costo total de reparación o reposición del equipo afectado en un lapso no mayor a 5 días hábiles.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Extensión de Servicios (Horas Extra)</h2>
            <p>Si durante el desarrollo del evento El Cliente desea prolongar el servicio más allá de las horas previamente contratadas, la extensión estará sujeta a:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-400">
              <li>Disponibilidad del personal y del recinto.</li>
              <li>El pago de la hora u horas extra correspondientes, las cuales deberán ser liquidadas <strong>inmediatamente antes</strong> de comenzar el bloque adicional.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Fuerza Mayor</h2>
            <p>GDL Producciones no será responsable por la interrupción parcial o total del servicio debido a causas fuera de nuestro control, incluyendo pero no limitado a: fallas eléctricas generales del recinto, desastres naturales, clausuras gubernamentales del salón, o disturbios públicos.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
