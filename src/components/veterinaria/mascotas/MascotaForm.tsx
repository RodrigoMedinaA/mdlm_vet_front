'use client';

import { useState } from 'react';
import { ChevronRight, Plus, X } from 'lucide-react';
import PropietarioModal from './PropietarioModal';

interface MascotaFormProps {
  onCancel: () => void;
}

export default function MascotaForm({ onCancel }: MascotaFormProps) {
  const [isPropietarioModalOpen, setIsPropietarioModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="hover:text-gray-800 cursor-pointer" onClick={onCancel}>Mascotas</span>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">Crear</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Crear Mascota</h2>
        </div>

        {/* Form Container */}
        <div className="bg-white/50 backdrop-blur-md rounded-[28px] p-8 shadow-sm border border-white/60">
          
          <div className="mb-8 border border-gray-100 rounded-2xl bg-white/70 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-[15px] font-bold text-gray-800">Información de la Mascota</h3>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Propietario with + button */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Propietario <span className="text-pink-500">*</span>
                </label>
                <div className="flex">
                  <select className="flex-1 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm appearance-none text-gray-600">
                    <option value="">Seleccione una opción</option>
                    <option value="1">Juan Perez (DNI: 12345678)</option>
                    <option value="2">Ana Gomez (DNI: 87654321)</option>
                  </select>
                  <button 
                    type="button"
                    onClick={() => setIsPropietarioModalOpen(true)}
                    className="px-4 py-2.5 bg-white border border-l-0 border-gray-200 rounded-r-xl hover:bg-gray-50 text-gray-500 transition-colors flex items-center justify-center"
                    title="Registrar nuevo propietario"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Nombre de la Mascota <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Especie <span className="text-pink-500">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm appearance-none text-gray-600">
                  <option value="">Seleccione una opción</option>
                  <option value="canino">Canino</option>
                  <option value="felino">Felino</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Raza <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Sexo <span className="text-pink-500">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm appearance-none text-gray-600">
                  <option value="">Seleccione una opción</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Color <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Esterilización <span className="text-pink-500">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm appearance-none text-gray-600">
                  <option value="">Seleccione una opción</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>

            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Crear Mascota
            </button>
            <button 
              onClick={onCancel}
              className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      {isPropietarioModalOpen && (
        <PropietarioModal onClose={() => setIsPropietarioModalOpen(false)} />
      )}
    </>
  );
}
