'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Dog, FileText, Activity, AlertTriangle, Syringe, Bug, Scale, HeartPulse, History, Plus, Download } from 'lucide-react';
import TimelineEvent, { ClinicEvent } from './TimelineEvent';

// Mocks Data
const mockMascotaData = {
  id: 1,
  nombre: 'Max',
  especie: 'Canino',
  raza: 'Golden Retriever',
  sexo: 'Macho',
  color: 'Dorado',
  esterilizacion: true,
  propietario: { nombre: 'Juan Perez Gomez', celular: '987654321' },
  alergias: [
    { id: 1, alergia_id: 'Alergia Alimentaria', severidad: 'Alta', estado_clinico: 'Activo' },
    { id: 2, alergia_id: 'Polvo', severidad: 'Baja', estado_clinico: 'Controlado' }
  ],
  condiciones: [
    { id: 1, condicion_id: 'Displasia de cadera', estado_clinico: 'En Observación' }
  ]
};

// Historial Clinico Data (Resource API shape)
const mockTimeline: ClinicEvent[] = [
  {
    id: "uuid-1",
    fecha_hora: "2026-05-04 10:30:00",
    eventable_type: "App\\Models\\Consulta",
    detalles: {
      motivo: "Control de peso y chequeo general",
      diagnostico: "Paciente sano, en buen estado de carnes. Se recomienda bajar ligeramente la ración de comida.",
      peso_registrado: 32.5,
      receta: [
        {
          estado_receta: "Emitida",
          indicaciones_generales: "Suplemento vitamínico",
          lineas_medicamento: [
            { medicamento_id: "Omega 3 y 6 Plus", cantidad: 1, instruccion_especifica: "1 cápsula diaria con la comida por 30 días" }
          ]
        }
      ]
    }
  },
  {
    id: "uuid-2",
    fecha_hora: "2026-04-15 09:00:00",
    eventable_type: "App\\Models\\VacunaAnimal",
    detalles: {
      esquema_vacuna: "Sextuple",
      fecha_aplicacion: "2026-04-15",
      fecha_proxima: "2027-04-15",
      nro_dosis: 1,
      lote: "L-8821B",
      fabricante: "Zoetis",
      observaciones: "Ninguna reacción alérgica post-aplicación."
    }
  },
  {
    id: "uuid-3",
    fecha_hora: "2026-03-10 11:15:00",
    eventable_type: "App\\Models\\Desparasitacion",
    detalles: {
      medicamento: "Bravecto 20-40kg",
      dosis: "1 pastilla",
      via: "Oral",
      observaciones: "Tomado con comida húmeda sin problemas",
      fecha_aplicacion: "2026-03-10",
      fecha_aplicacion_sgte: "2026-06-10"
    }
  },
  {
    id: "uuid-4",
    fecha_hora: "2026-01-20 16:45:00",
    eventable_type: "App\\Models\\Examen",
    detalles: {
      nombre: "Radiografía de Cadera",
      descripcion: "Descarte de progresión de displasia",
      estado: "Completado",
      fecha_solicitud: "2026-01-20",
      fecha_resultado: "2026-01-21",
      resultado: {
        hallazgos: "Ligera subluxación coxofemoral bilateral",
        valores: "Grado B (Leve)",
        interpretacion: "Controlable con dieta y suplementos articulares",
        observaciones: ""
      }
    }
  }
];

export default function MascotaHistorial({ id }: { id: string }) {
  // En la implementación real, aquí haríamos fetch del animal y su historial:
  // /api/animales/${id}  y /api/animales/${id}/historial

  // Extraer el peso más reciente de las consultas
  const consultas = mockTimeline.filter(e => e.eventable_type === 'App\\Models\\Consulta');
  const ultimoPeso = consultas.length > 0 ? consultas[0].detalles.peso_registrado : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumb & Acciones */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/mascotas" className="hover:text-[#015f33] transition-colors">Directorio</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-800 font-semibold">Historial Clínico</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap">
            <Download size={18} />
            <span>Exportar en PDF</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-[#015f33] to-[#2ecc71] hover:shadow-lg hover:shadow-[#2ecc71]/30 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap">
            <Plus size={18} />
            <span>Nueva atención</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">

        {/* Fila Superior: Datos Generales y Alergias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Tarjeta Mascota */}
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 shadow-sm border border-white/60">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-gray-800">{mockMascotaData.nombre}</h2>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-[13px] font-semibold">Propietario</span>
                <span className="text-gray-800 font-medium text-sm text-right">
                  {mockMascotaData.propietario.nombre}<br />
                  <span className="text-gray-400 text-xs">{mockMascotaData.propietario.celular}</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-[13px] font-semibold">Especie/Raza</span>
                <span className="text-gray-800 font-medium text-sm">{mockMascotaData.especie} - {mockMascotaData.raza}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-[13px] font-semibold">Sexo</span>
                <span className="text-gray-800 font-medium text-sm">{mockMascotaData.sexo}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500 text-[13px] font-semibold">Esterilizado</span>
                <span className="text-gray-800 font-medium text-sm">{mockMascotaData.esterilizacion ? 'Sí' : 'No'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500 text-[13px] font-semibold flex items-center gap-1.5"><Scale size={14} /> Peso Actual</span>
                <span className="text-gray-800 font-bold text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-xl">
                  {ultimoPeso ? `${ultimoPeso} kg` : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta Alergias y Condiciones */}
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 shadow-sm border border-white/60 flex flex-col">

            {/* Alergias */}
            <div>
              <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-red-500" /> Alergias
              </h3>
              {mockMascotaData.alergias.length > 0 ? (
                <div className="space-y-2">
                  {mockMascotaData.alergias.map(alergia => (
                    <div key={alergia.id} className="bg-red-50/50 border border-red-100 p-3 rounded-xl flex flex-col gap-1 text-[13px]">
                      <span className="font-bold text-red-900">{alergia.alergia_id}</span>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-red-100 text-red-700">Sev: {alergia.severidad}</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-white text-gray-500 border border-gray-200">{alergia.estado_clinico}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No registra alergias.</p>
              )}
            </div>

            <div className="h-px bg-gray-100 w-full my-5"></div>

            {/* Condiciones */}
            <div>
              <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                <HeartPulse size={16} className="text-orange-500" /> Condiciones
              </h3>
              {mockMascotaData.condiciones.length > 0 ? (
                <div className="space-y-2">
                  {mockMascotaData.condiciones.map(cond => (
                    <div key={cond.id} className="bg-orange-50/50 border border-orange-100 p-3 rounded-xl flex flex-col gap-1 text-[13px]">
                      <span className="font-bold text-orange-900">{cond.condicion_id}</span>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-white text-gray-500 border border-gray-200">{cond.estado_clinico}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No registra condiciones previas.</p>
              )}
            </div>

          </div>
        </div>

        {/* Fila Inferior: Timeline */}
        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 sm:p-8 shadow-sm border border-white/60">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Línea de Tiempo Clínica</h2>
              <p className="text-sm text-gray-500 mt-0.5">Registro de eventos médicos ordenados por fecha</p>
            </div>
          </div>

          {mockTimeline.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p>Esta mascota aún no tiene eventos registrados en su historial clínico.</p>
            </div>
          ) : (
            <div className="relative">
              {mockTimeline.map((event) => (
                <TimelineEvent key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
