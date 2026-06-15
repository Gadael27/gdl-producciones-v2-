import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Clock, MapPin, Calendar as CalendarIcon, User, DollarSign, AlertOctagon } from 'lucide-react';

export default function ReservationRow({ res }) {
  const [expanded, setExpanded] = useState(false);
  
  if (res.tipoItem === 'Bloqueo Manual') {
    return (
      <>
        <tr 
          onClick={() => setExpanded(!expanded)}
          className="border-b border-[#141435] cursor-pointer transition-colors hover:bg-orange-500/10 bg-transparent"
        >
          <td className="p-3 md:p-4 align-top">
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold border border-orange-500 text-orange-500 whitespace-nowrap">
              <AlertOctagon size={12} />
              BLOQUEADO
            </span>
          </td>
          <td className="p-3 md:p-4 align-top">
            <div className="font-bold text-white text-sm md:text-base">Evento Externo / Manual</div>
            <div className="text-orange-400 text-xs md:text-sm mt-0.5">{res.notas || 'Sin notas'}</div>
          </td>
          <td className="hidden md:table-cell p-3 md:p-4 align-top">
            <div className="text-white text-sm">{res.logistica?.fecha} @ {res.logistica?.horaInicio}h</div>
            <div className="text-gray-400 text-xs mt-0.5">{res.logistica?.horasTotales} Hrs de duración</div>
          </td>
          <td className="p-3 md:p-4 align-top text-right">
            <div className="font-bold text-gray-500 text-sm md:text-base">N/A</div>
            <div className="text-orange-500 text-xs mt-0.5 flex items-center justify-end gap-1">
              Ver más {expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </div>
          </td>
        </tr>
        {expanded && (
          <tr className="bg-black/30 border-b border-orange-500/20">
            <td colSpan={4} className="p-4 md:p-6">
              <div className="bg-[#07071c] p-4 rounded-xl border border-orange-500/30">
                <div className="flex items-center gap-2 text-orange-500 font-bold mb-3 uppercase text-sm font-cyber tracking-wider">
                  <CalendarIcon size={16} /> Detalles del Bloqueo
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-gray-500">Fecha y Hora:</span> <br/>{res.logistica?.fecha} a las {res.logistica?.horaInicio}</p>
                  <p><span className="text-gray-500">Duración:</span> <br/>{res.logistica?.horasTotales} Horas</p>
                  <p><span className="text-gray-500">Motivo / Notas:</span> <br/>{res.notas}</p>
                  <p><span className="text-gray-500">Fecha de Registro:</span> <br/>{new Date(res.fechaRegistro).toLocaleString()}</p>
                </div>
              </div>
            </td>
          </tr>
        )}
      </>
    );
  }

  const isPaid = res.financiero?.estatus === 'Apartado Confirmado';

  const formatDireccion = (dir) => {
    if (!dir) return 'Sin dirección';
    if (typeof dir === 'string') return dir;
    return `${dir.calle || ''}, ${dir.colonia || ''}, ${dir.delegacion || ''}, C.P. ${dir.cp || ''}`.replace(/(^[,s]+)|([,s]+$)/g, '');
  };

  return (
    <>
      {/* Row Principal */}
      <tr 
        onClick={() => setExpanded(!expanded)}
        className={`border-b border-[#141435] cursor-pointer transition-colors hover:bg-brand-dark/50 ${isPaid ? 'bg-[#25d366]/5' : 'bg-transparent'}`}
      >
        <td className="p-3 md:p-4 align-top">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold border ${isPaid ? 'border-[#25d366] text-[#25d366]' : 'border-brand-yellow text-brand-yellow'} whitespace-nowrap`}>
            {isPaid ? <CheckCircle size={12} /> : <Clock size={12} />}
            {isPaid ? 'CONFIRMADO' : 'PENDIENTE'}
          </span>
        </td>
        <td className="p-3 md:p-4 align-top">
          <div className="font-bold text-white text-sm md:text-base">{res.cliente?.nombre}</div>
          <div className="text-gray-400 text-xs md:text-sm mt-0.5">{res.cliente?.telefono}</div>
        </td>
        <td className="hidden md:table-cell p-3 md:p-4 align-top">
          <div className="text-white text-sm">{res.logistica?.fecha} @ {res.logistica?.horaInicio}h</div>
          <div className="text-gray-400 text-xs mt-0.5">{formatDireccion(res.logistica?.direccion)}</div>
        </td>
        <td className="p-3 md:p-4 align-top text-right">
          <div className="font-bold text-white text-sm md:text-base">${res.financiero?.totalEvent?.toLocaleString()} MXN</div>
          <div className="text-brand-pink text-xs mt-0.5 flex items-center justify-end gap-1">
            Ver más {expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
          </div>
        </td>
      </tr>

      {/* Detalle Expandible */}
      {expanded && (
        <tr className="bg-black/30 border-b border-brand-cyan/20">
          <td colSpan={4} className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Columna Cliente */}
              <div className="bg-[#07071c] p-4 rounded-xl border border-[#1a1a3e]">
                <div className="flex items-center gap-2 text-brand-cyan font-bold mb-3 uppercase text-sm font-cyber tracking-wider">
                  <User size={16} /> Detalles del Cliente
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-gray-500">Nombre:</span> <br/>{res.cliente?.nombre}</p>
                  <p><span className="text-gray-500">Teléfono:</span> <br/><a href={`https://wa.me/${res.cliente?.telefono}`} target="_blank" rel="noreferrer" className="text-[#25d366] hover:underline">{res.cliente?.telefono}</a></p>
                  <p><span className="text-gray-500">Correo:</span> <br/>{res.cliente?.correo}</p>
                </div>
              </div>

              {/* Columna Logística */}
              <div className="bg-[#07071c] p-4 rounded-xl border border-[#1a1a3e]">
                <div className="flex items-center gap-2 text-brand-pink font-bold mb-3 uppercase text-sm font-cyber tracking-wider">
                  <MapPin size={16} /> Logística del Evento
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-gray-500">Fecha y Hora:</span> <br/>{res.logistica?.fecha} a las {res.logistica?.horaInicio}</p>
                  <p><span className="text-gray-500">Lugar ({res.logistica?.tipoEvento}):</span> <br/>{res.logistica?.lugar || res.logistica?.locacion}</p>
                  <p><span className="text-gray-500">Dirección Exacta:</span> <br/>{formatDireccion(res.logistica?.direccion)}</p>
                  <p><span className="text-gray-500">Paquete Elegido:</span> <br/>{res.logistica?.packageType}</p>
                </div>
              </div>

              {/* Columna Financiera */}
              <div className="bg-[#07071c] p-4 rounded-xl border border-[#1a1a3e]">
                <div className="flex items-center gap-2 text-brand-yellow font-bold mb-3 uppercase text-sm font-cyber tracking-wider">
                  <DollarSign size={16} /> Datos Financieros
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><span className="text-gray-500">Tipo de Pago:</span> <br/><span className="text-white font-bold">{res.financiero?.tipoPago}</span></p>
                  <p><span className="text-gray-500">Horas Extra:</span> <br/>{res.logistica?.extraHours || 0} horas</p>
                  <p><span className="text-gray-500">Estatus de Pago:</span> <br/><span className={isPaid ? 'text-[#25d366] font-bold' : 'text-brand-yellow font-bold'}>{res.financiero?.estatus}</span></p>
                  <p className="border-t border-[#1a1a3e] pt-2 mt-2">
                    <span className="text-gray-500">Total Calculado:</span> <br/>
                    <span className="text-xl font-bold text-white">${res.financiero?.totalEvent?.toLocaleString()} MXN</span>
                  </p>
                </div>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
}
