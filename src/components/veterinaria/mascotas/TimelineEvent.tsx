import { Calendar, Stethoscope, Syringe, Bug, FileSearch, Pill, CheckCircle2 } from 'lucide-react';

export interface ClinicEvent {
  id: string;
  fecha_hora: string;
  eventable_type: string;
  detalles: any;
}

interface TimelineEventProps {
  event: ClinicEvent;
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  const isConsulta = event.eventable_type === 'App\\Models\\Consulta';
  const isVacuna = event.eventable_type === 'App\\Models\\VacunaAnimal';
  const isDesparasitacion = event.eventable_type === 'App\\Models\\Desparasitacion';
  const isExamen = event.eventable_type === 'App\\Models\\Examen';

  const date = new Date(event.fecha_hora);
  const formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      {/* Desktop Timeline Date */}
      <div className="hidden sm:block absolute left-0 top-6 w-24 text-right">
        <div className="text-sm font-bold text-gray-800">{formattedDate}</div>
        <div className="text-[12px] font-medium text-gray-500">{formattedTime}</div>
      </div>

      {/* Timeline Line */}
      <div className="absolute left-4 sm:left-28 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent group-last:bg-none group-last:from-transparent"></div>

      {/* Timeline Icon */}
      <div className="absolute left-4 sm:left-28 top-6 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white border-[3px] shadow-sm z-10 transition-transform group-hover:scale-110
        ${isConsulta ? 'border-blue-400 text-blue-500' : 
          isVacuna ? 'border-emerald-400 text-emerald-500' : 
          isDesparasitacion ? 'border-purple-400 text-purple-500' : 
          'border-orange-400 text-orange-500'}"
      >
        {isConsulta && <Stethoscope size={14} strokeWidth={2.5} className="text-blue-500" />}
        {isVacuna && <Syringe size={14} strokeWidth={2.5} className="text-emerald-500" />}
        {isDesparasitacion && <Bug size={14} strokeWidth={2.5} className="text-purple-500" />}
        {isExamen && <FileSearch size={14} strokeWidth={2.5} className="text-orange-500" />}
      </div>

      {/* Mobile Date */}
      <div className="sm:hidden mb-2">
        <span className="text-sm font-bold text-gray-800 mr-2">{formattedDate}</span>
        <span className="text-[12px] font-medium text-gray-500">{formattedTime}</span>
      </div>

      {/* Content Card */}
      <div className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-sm transition-shadow hover:shadow-md
        ${isConsulta ? 'border-blue-100' : 
          isVacuna ? 'border-emerald-100' : 
          isDesparasitacion ? 'border-purple-100' : 
          'border-orange-100'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-base font-bold text-gray-800 flex items-center gap-2">
            {isConsulta && 'Consulta Médica'}
            {isVacuna && 'Vacunación'}
            {isDesparasitacion && 'Desparasitación'}
            {isExamen && 'Examen Clínico'}
            
            {isExamen && event.detalles.estado === 'Completado' && (
               <CheckCircle2 size={16} className="text-emerald-500" />
            )}
          </h4>
        </div>

        {/* Dynamic Body */}
        <div className="text-[13px] text-gray-600 space-y-4">
          
          {/* CONSULTA */}
          {isConsulta && (
            <>
              <div>
                <strong className="text-gray-800 block mb-1">Motivo:</strong>
                {event.detalles.motivo}
              </div>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                <strong className="text-blue-900 block mb-1">Diagnóstico:</strong>
                <p className="text-blue-800">{event.detalles.diagnostico}</p>
              </div>
              {event.detalles.receta && event.detalles.receta.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <strong className="text-gray-800 flex items-center gap-1.5 mb-2">
                    <Pill size={14} className="text-blue-500"/> Receta Médica
                  </strong>
                  <ul className="space-y-2">
                    {event.detalles.receta.map((receta: any, i: number) => (
                      <li key={i} className="text-[12.5px]">
                        <p className="font-medium text-gray-700">{receta.indicaciones_generales}</p>
                        {receta.lineas_medicamento?.map((linea: any, j: number) => (
                          <div key={j} className="flex items-start gap-2 mt-1.5 ml-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 shrink-0"></div>
                            <div>
                              <span className="font-semibold text-gray-800">{linea.medicamento_id}</span> - {linea.cantidad}
                              <p className="text-gray-500 italic">{linea.instruccion_especifica}</p>
                            </div>
                          </div>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* VACUNA */}
          {isVacuna && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <strong className="text-gray-500 block text-[11px] uppercase tracking-wider mb-0.5">Esquema / Vacuna</strong>
                <span className="font-medium text-gray-800">{event.detalles.esquema_vacuna}</span>
              </div>
              <div>
                <strong className="text-gray-500 block text-[11px] uppercase tracking-wider mb-0.5">Nro Dosis</strong>
                <span className="font-medium text-gray-800">{event.detalles.nro_dosis}</span>
              </div>
              <div>
                <strong className="text-gray-500 block text-[11px] uppercase tracking-wider mb-0.5">Fabricante / Lote</strong>
                <span className="font-medium text-gray-800">{event.detalles.fabricante} (Lote: {event.detalles.lote})</span>
              </div>
              {event.detalles.fecha_proxima && (
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  <strong className="text-emerald-700 block text-[11px] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <Calendar size={12} /> Próxima Dosis
                  </strong>
                  <span className="font-bold text-emerald-800">{new Date(event.detalles.fecha_proxima).toLocaleDateString('es-ES')}</span>
                </div>
              )}
              {event.detalles.observaciones && (
                <div className="sm:col-span-2">
                  <strong className="text-gray-500 block text-[11px] uppercase tracking-wider mb-0.5">Observaciones</strong>
                  <p>{event.detalles.observaciones}</p>
                </div>
              )}
            </div>
          )}

          {/* DESPARASITACION */}
          {isDesparasitacion && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <strong className="text-gray-500 block text-[11px] uppercase tracking-wider mb-0.5">Medicamento</strong>
                <span className="font-medium text-gray-800">{event.detalles.medicamento}</span>
              </div>
              <div>
                <strong className="text-gray-500 block text-[11px] uppercase tracking-wider mb-0.5">Dosis / Vía</strong>
                <span className="font-medium text-gray-800">{event.detalles.dosis} - {event.detalles.via}</span>
              </div>
              {event.detalles.fecha_aplicacion_sgte && (
                <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100 sm:col-span-2">
                  <strong className="text-purple-700 block text-[11px] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <Calendar size={12} /> Próxima Aplicación
                  </strong>
                  <span className="font-bold text-purple-800">{new Date(event.detalles.fecha_aplicacion_sgte).toLocaleDateString('es-ES')}</span>
                </div>
              )}
              {event.detalles.observaciones && (
                <div className="sm:col-span-2">
                  <strong className="text-gray-500 block text-[11px] uppercase tracking-wider mb-0.5">Observaciones</strong>
                  <p>{event.detalles.observaciones}</p>
                </div>
              )}
            </div>
          )}

          {/* EXAMEN */}
          {isExamen && (
            <div className="space-y-4">
              <div>
                <strong className="text-gray-800 block mb-1">Nombre del Examen:</strong>
                <span className="font-medium">{event.detalles.nombre}</span>
              </div>
              {event.detalles.descripcion && (
                <p className="text-gray-500">{event.detalles.descripcion}</p>
              )}
              {event.detalles.resultado && (
                <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50 mt-3">
                  <strong className="text-orange-900 block mb-2 border-b border-orange-200/50 pb-1">Resultados</strong>
                  <div className="space-y-2 text-[12.5px]">
                    <div><strong className="text-orange-800">Hallazgos:</strong> {event.detalles.resultado.hallazgos}</div>
                    <div><strong className="text-orange-800">Valores:</strong> {event.detalles.resultado.valores}</div>
                    <div><strong className="text-orange-800">Interpretación:</strong> {event.detalles.resultado.interpretacion}</div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
