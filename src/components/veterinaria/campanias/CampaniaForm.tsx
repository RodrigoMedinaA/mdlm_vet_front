'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, CalendarPlus, CheckCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const MapSelector = dynamic(() => import('./MapSelector'), { 
  ssr: false, 
  loading: () => <div className="h-[300px] bg-gray-50 animate-pulse rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100">Cargando mapa...</div> 
});

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-40 bg-gray-50 animate-pulse rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">Cargando editor...</div> 
});

// Mock active personal
const mockActivePersonal = [
  { id: '123e4567-e89b-12d3-a456-426614174000', nombre: 'Juan Perez Gomez' },
  { id: '123e4567-e89b-12d3-a456-426614174001', nombre: 'Ana Maria Torres' },
  { id: '123e4567-e89b-12d3-a456-426614174002', nombre: 'Luis Ramirez Soto' }
];

export default function CampaniaForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    lugar: '',
    fecha_hora_inicio: '',
    fecha_hora_fin: '',
    estado: 'planificada',
    responsable_id: ''
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuillChange = (content: string) => {
    setFormData(prev => ({ ...prev, descripcion: content }));
  };

  const handleLocationSelect = (address: string) => {
    setFormData(prev => ({ ...prev, lugar: address }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    console.log('Form data to submit:', formData);
    // Aquí iría el POST a /api/campanias
    router.push('/campanias');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/campanias" className="hover:text-[#015f33] transition-colors">Campañas</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-800 font-semibold">Nueva Campaña</span>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-sm border border-white/60">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-br from-[#015f33] to-[#2ecc71] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#2ecc71]/20">
            <CalendarPlus size={24} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Crear Nueva Campaña</h2>
            <p className="text-gray-500 text-sm mt-1">Ingresa los detalles de la nueva campaña de salud animal</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                Nombre de la Campaña <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. Campaña Antirrábica 2026"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#11ba82] focus:border-[#11ba82] outline-none transition-all text-[15px]"
              />
            </div>

            {/* Fechas */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                Fecha y Hora de Inicio <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="fecha_hora_inicio"
                required
                value={formData.fecha_hora_inicio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#11ba82] focus:border-[#11ba82] outline-none transition-all text-[15px] text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                Fecha y Hora de Fin <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="fecha_hora_fin"
                required
                value={formData.fecha_hora_fin}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#11ba82] focus:border-[#11ba82] outline-none transition-all text-[15px] text-gray-700"
              />
            </div>

            {/* Responsable y Estado */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                Responsable <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="responsable_id"
                  required
                  value={formData.responsable_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#11ba82] focus:border-[#11ba82] outline-none transition-all text-[15px] appearance-none"
                >
                  <option value="" disabled>Seleccione un responsable</option>
                  {mockActivePersonal.map(personal => (
                    <option key={personal.id} value={personal.id}>{personal.nombre}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                Estado
              </label>
              <input
                type="text"
                name="estado"
                value="Planificada"
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-500 font-medium cursor-not-allowed outline-none text-[15px]"
              />
            </div>

            {/* Lugar / Mapa */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                Ubicación / Lugar <span className="text-red-500">*</span>
              </label>
              <MapSelector onLocationSelect={handleLocationSelect} initialAddress={formData.lugar} />
            </div>

            {/* Descripción (React Quill) */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2 mb-2">
                Descripción <span className="text-red-500">*</span>
              </label>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-[#11ba82] focus-within:border-transparent transition-all">
                <ReactQuill 
                  theme="snow" 
                  value={formData.descripcion} 
                  onChange={handleQuillChange}
                  className="h-40 mb-10 border-none"
                  placeholder="Escribe los detalles de la campaña aquí..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 flex items-center gap-6 border-t border-gray-100">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#015f33] to-[#2ecc71] hover:opacity-90 active:scale-[0.98] text-white font-bold rounded-xl transition-all shadow-sm shadow-[#2ecc71]/30 text-[15px]"
            >
              <CalendarPlus size={20} strokeWidth={2.5} />
              Crear Campaña
            </button>
            <Link
              href="/campanias"
              className="text-gray-500 font-bold hover:text-gray-800 transition-colors text-[15px]"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-[#11ba82]/10 text-[#11ba82] rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmar Creación</h3>
              <p className="text-gray-600 mb-5 text-[14px]">
                Revisa los datos antes de confirmar la creación de la nueva campaña.
              </p>
              
              <div className="w-full text-left bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-5 space-y-3 text-[14px]">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-gray-500 col-span-1">Campaña:</span> 
                  <span className="text-gray-800 font-medium col-span-2">{formData.nombre}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-gray-500 col-span-1">Lugar:</span> 
                  <span className="text-gray-800 font-medium col-span-2">{formData.lugar || 'No especificado'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-gray-500 col-span-1">Inicio:</span> 
                  <span className="text-gray-800 font-medium col-span-2">
                    {formData.fecha_hora_inicio ? new Date(formData.fecha_hora_inicio).toLocaleString('es-ES') : '-'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-6 py-2.5 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Volver y editar
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="flex-1 px-6 py-2.5 bg-[#11ba82] text-white font-bold rounded-xl hover:bg-[#0e9d6d] active:bg-[#0c8a60] transition-colors shadow-sm shadow-[#11ba82]/20"
              >
                Confirmar y crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
