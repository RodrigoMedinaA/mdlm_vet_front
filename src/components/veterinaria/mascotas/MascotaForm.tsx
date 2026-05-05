'use client';

import { ChevronLeft, ChevronRight, Plus, Loader2 } from 'lucide-react';
import PropietarioModal from './PropietarioModal';
import { useEffect, useState } from 'react';
import { mascotaService } from '@/utils/mascotaService';
import { Propietario } from '@/interfaces/Mascota';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface MascotaFormProps {
  onCancel: () => void;
  editId?: string;
}

export default function MascotaForm({ onCancel, editId }: MascotaFormProps) {
  const [isPropietarioModalOpen, setIsPropietarioModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState<Propietario[]>([]);
  const [species, setSpecies] = useState<any[]>([]);
  const [razas, setRazas] = useState<any[]>([]);
  const [fetchingData, setFetchingData] = useState(!!editId);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    propietario_id: '',
    especie_id: '',
    raza_id: '',
    sexo: 'Macho',
    color: '',
    esterilizacion: false
  });

  useEffect(() => {
    fetchAllData();
  }, [editId]);

  const fetchAllData = async () => {
    setFetchingData(true);
    try {
      const [ownersData, speciesData, razasData] = await Promise.all([
        mascotaService.getAllOwners(),
        mascotaService.getAllSpecies(),
        mascotaService.getAllRazas()
      ]);
      setOwners(ownersData);
      setSpecies(speciesData);
      setRazas(razasData);

      if (editId) {
        const animal = await mascotaService.getAnimalById(editId);
        setFormData({
          nombre: animal.nombre,
          propietario_id: animal.propietario?.id || animal.propietario_id || '',
          especie_id: animal.especie?.id || animal.especie_id || '',
          raza_id: animal.raza?.id || animal.raza_id || '',
          sexo: animal.sexo,
          color: animal.color,
          esterilizacion: animal.esterilizacion
        });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setFetchingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await mascotaService.updateAnimal(editId, formData);
        alert('Mascota actualizada con éxito');
      } else {
        await mascotaService.createAnimal(formData);
        alert('Mascota creada con éxito');
      }
      onCancel();
    } catch (err) {
      console.error('Error saving animal:', err);
      alert('Error al guardar la mascota. Verifique los datos.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#2ecc71] mb-4" size={48} />
        <p className="text-gray-500 font-medium">Cargando datos de la mascota...</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="hover:text-gray-800 cursor-pointer" onClick={onCancel}>Mascotas</span>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">{editId ? 'Editar' : 'Crear'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {editId ? 'Editar Mascota' : 'Crear Mascota'}
          </h2>
        </div>

        {/* Form Container */}
        <div className="bg-white/50 backdrop-blur-md rounded-[28px] p-8 shadow-sm border border-white/60">
          
          <div className="mb-8 border border-gray-100 rounded-2xl bg-white/70 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-[15px] font-bold text-gray-800">Información de la Mascota</h3>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Propietario with + button */}
              <div className="flex gap-2 items-end">
                <SearchableSelect 
                  label="Propietario"
                  required
                  className="flex-1"
                  placeholder="Seleccione un propietario"
                  value={formData.propietario_id}
                  onChange={(val) => setFormData({...formData, propietario_id: val.toString()})}
                  options={owners.map(o => ({
                    id: o.id,
                    label: `${o.nombre} ${o.paterno}`,
                    sublabel: `Doc: ${o.nro_doc}`
                  }))}
                />
                <button 
                  type="button"
                  onClick={() => setIsPropietarioModalOpen(true)}
                  className="mb-[2px] h-[45px] w-[45px] bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors flex items-center justify-center shrink-0 shadow-sm"
                  title="Registrar nuevo propietario"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Nombre de la Mascota <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <SearchableSelect 
                label="Especie"
                required
                placeholder="Seleccione una especie"
                value={formData.especie_id}
                onChange={(val) => setFormData({...formData, especie_id: val.toString(), raza_id: ''})}
                options={species.map(s => ({
                  id: s.id,
                  label: s.nombre
                }))}
              />

              <SearchableSelect 
                label="Raza"
                required
                placeholder="Seleccione una raza"
                value={formData.raza_id}
                onChange={(val) => setFormData({...formData, raza_id: val.toString()})}
                options={razas
                  .filter(r => !formData.especie_id || r.especie_id === formData.especie_id)
                  .map(r => ({
                    id: r.id,
                    label: r.nombre
                  }))
                }
              />

              <SearchableSelect 
                label="Sexo"
                required
                value={formData.sexo}
                onChange={(val) => setFormData({...formData, sexo: val.toString() as any})}
                options={[
                  { id: 'Macho', label: 'Macho' },
                  { id: 'Hembra', label: 'Hembra' }
                ]}
              />

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Color <span className="text-pink-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm"
                />
              </div>

              <SearchableSelect 
                label="Esterilización"
                required
                value={formData.esterilizacion ? '1' : '0'}
                onChange={(val) => setFormData({...formData, esterilizacion: val === '1'})}
                options={[
                  { id: '1', label: 'Sí' },
                  { id: '0', label: 'No' }
                ]}
              />

            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {editId ? 'Guardar Cambios' : 'Crear Mascota'}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>

      {isPropietarioModalOpen && (
        <PropietarioModal onClose={() => setIsPropietarioModalOpen(false)} />
      )}
    </>
  );
}

