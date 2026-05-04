'use client';

import { X } from 'lucide-react';

interface PropietarioModalProps {
  onClose: () => void;
}

export default function PropietarioModal({ onClose }: PropietarioModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-extrabold text-gray-800">Registrar Propietario</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Body (Scrollable) */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-[15px] font-bold text-gray-800">Información del Propietario</h3>
            </div>
            
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden mb-2">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center cursor-pointer">
              <h3 className="text-[15px] font-bold text-gray-800">Datos adicionales de contacto</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end space-x-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors text-sm"
          >
            Cancelar
          </button>
          <button 
            className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all duration-300 text-sm"
          >
            Guardar Propietario
          </button>
        </div>
        
      </div>
    </div>
  );
}
