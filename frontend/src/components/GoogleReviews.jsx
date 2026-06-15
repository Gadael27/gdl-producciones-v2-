import { Star } from 'lucide-react';

// Estos testimonios se renderizarán mientras configuras tu widget oficial de Google.
const mockReviews = [
  { name: "Mariana & Luis", event: "Boda - CDMX", text: "¡La pista NUNCA estuvo vacía! El mejor DJ de la ciudad, sin duda.", rating: 5, date: "Hace 2 semanas" },
  { name: "Corp. TechVision", event: "Evento Corporativo", text: "Profesionalismo de otro nivel. El montaje truss fue espectacular y la iluminación robótica le dio un toque muy premium a nuestra cena de fin de año.", rating: 5, date: "Hace 1 mes" },
  { name: "Fernanda R.", event: "XV Años", text: "Hasta mi abuela bailó. Mezcla impecable, no paramos de saltar y la cabina diamante es un show visual impresionante.", rating: 5, date: "Hace 2 meses" },
];

export default function GoogleReviews() {
  return (
    <div className="py-20 bg-brand-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header con estilo de Google */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-cyber text-3xl text-white tracking-widest">RESEÑAS REALES</span>
            <div className="flex bg-white px-3 py-1 rounded-full items-center gap-2 ml-4">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.15C1.43 8.55 1 10.22 1 12s.43 3.45 1.15 4.93l3.69-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.15 7.07l3.69 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-black font-bold text-sm">Google</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-white">5.0</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={24} fill="#FBBC05" color="#FBBC05" />
              ))}
            </div>
          </div>
          <p className="text-[#888] mt-3">Calificación excelente basada en reseñas de clientes reales.</p>
        </div>

        {/* Contenedor de Reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReviews.map((review, idx) => (
            <div key={idx} className="bg-[#0a0a1a] border border-white/10 rounded-2xl p-8 hover:-translate-y-2 hover:border-[var(--color-brand-cyan)] hover:shadow-[0_10px_30px_rgba(0,242,254,0.15)] transition-all duration-300">
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-xl uppercase border border-white/10">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-white font-bold m-0">{review.name}</h5>
                    <span className="text-xs text-[#666]">{review.date}</span>
                  </div>
                </div>
                {/* Logo G pequeña */}
                <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.15C1.43 8.55 1 10.22 1 12s.43 3.45 1.15 4.93l3.69-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.15 7.07l3.69 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>

              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="#FBBC05" color="#FBBC05" />
                ))}
              </div>

              <p className="text-[#ccc] text-[0.95rem] leading-relaxed mb-4">
                "{review.text}"
              </p>
              
              <div className="inline-block bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-[var(--color-brand-cyan)] font-semibold tracking-wider uppercase">
                {review.event}
              </div>
            </div>
          ))}
        </div>

        {/* NOTA PARA EL CLIENTE: 
            Cuando tengas tu widget de Elfsight o Trustmary, puedes borrar este div entero de 'grid' y pegar tu <iframe> o <script> oficial justo aquí.
        */}
      </div>
    </div>
  );
}
