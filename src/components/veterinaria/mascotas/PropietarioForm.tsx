'use client';

import { ChevronRight } from 'lucide-react';

interface PropietarioFormProps {
  onCancel: () => void;
}

export default function PropietarioForm({ onCancel }: PropietarioFormProps) {
  return (
    <div className="space-y-6">
      {/* Header Breadcrumb */}
      <div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="hover:text-gray-800 cursor-pointer" onClick={onCancel}>Propietarios</span>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-800 font-medium">Crear</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Crear Propietario</h2>
      </div>

      {/* Form Container */}
      <div className="bg-white/50 backdrop-blur-md rounded-[28px] p-8 shadow-sm border border-white/60">
        
        <div className="mb-6 border border-gray-100 rounded-2xl bg-white/70 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-[15px] font-bold text-gray-800">Información del Propietario</h3>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">
                Tipo documento <span className="text-pink-500">*</span>
              </label>
              <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm appearance-none text-gray-600">
                <option value="">Seleccione una opción</option>
                <option value="DNI">DNI</option>
                <option value="CE">Carnet de Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">
                Nro documento <span className="text-pink-500">*</span>
              </label>
              <input 
                type="number" 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">
                Nombres <span className="text-pink-500">*</span>
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">
                Apellido paterno <span className="text-pink-500">*</span>
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">
                Apellido materno
              </label>
              <input 
                type="text" 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">
                Email <span className="text-pink-500">*</span>
              </label>
              <input 
                type="email" 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-8 border border-gray-100 rounded-2xl bg-white/70 overflow-hidden shadow-sm">
           <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center cursor-pointer">
            <h3 className="text-[15px] font-bold text-gray-800">Datos adicionales de contacto</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">
                Celular
              </label>
              <input 
                type="number" 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2">
                Nro Emergencia
              </label>
              <input 
                type="number" 
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Crear Propietario
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
  );
}
