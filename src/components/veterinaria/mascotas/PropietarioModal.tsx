'use client';

import { X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mascotaService } from '@/utils/mascotaService';
import { Propietario } from '@/interfaces/Mascota';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface PropietarioModalProps {
  onClose: () => void;
  onSuccess?: (propietario: Propietario) => void;
}

export default function PropietarioModal({ onClose, onSuccess }: PropietarioModalProps) {
  const [loading, setLoading] = useState(false);
  const [tipoDocumentos, setTipoDocumentos] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    tipo_documento_id: '',
    nro_doc: '',
    nombre: '',
    paterno: '',
    materno: '',
    email: '',
    celular: '',
    nro_emergencia: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const docs = await mascotaService.getTipoDocumentos();
      setTipoDocumentos(docs);
    } catch (err) {
      console.error('Error fetching initial data:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newOwner = await mascotaService.createPropietario(formData);
      alert('Propietario creado con éxito');
      if (onSuccess) onSuccess(newOwner);
      onClose();
    } catch (err) {
      console.error('Error saving owner:', err);
      alert('Error al guardar el propietario. Por favor, verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <form 
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-extrabold text-gray-800">Registrar Propietario</h2>
          <button 
            type="button"
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
              <SearchableSelect 
                label="Tipo documento"
                required
                placeholder="Seleccione un tipo"
                value={formData.tipo_documento_id}
                onChange={(val) => setFormData({...formData, tipo_documento_id: val.toString()})}
                options={tipoDocumentos.map(td => ({
                  id: td.id,
                  label: td.nombre
                }))}
              />

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Nro documento <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="number" 
                  required
                  value={formData.nro_doc}
                  onChange={(e) => setFormData({...formData, nro_doc: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Nombres <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Apellido paterno <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.paterno}
                  onChange={(e) => setFormData({...formData, paterno: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Apellido materno
                </label>
                <input 
                  type="text" 
                  value={formData.materno}
                  onChange={(e) => setFormData({...formData, materno: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Email <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden mb-2">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-[15px] font-bold text-gray-800">Datos adicionales de contacto</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Celular
                </label>
                <input 
                  type="number" 
                  value={formData.celular}
                  onChange={(e) => setFormData({...formData, celular: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Nro Emergencia
                </label>
                <input 
                  type="number" 
                  value={formData.nro_emergencia}
                  onChange={(e) => setFormData({...formData, nro_emergencia: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end space-x-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors text-sm"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all duration-300 text-sm flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            Guardar Propietario
          </button>
        </div>
        
      </form>
    </div>
  );
}
