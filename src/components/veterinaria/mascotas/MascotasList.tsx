'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Plus, Search, Dog, FileText, Trash2, Loader2 } from 'lucide-react';
import MascotaForm from './MascotaForm';
import { mascotaService } from '@/utils/mascotaService';
import { Mascota } from '@/interfaces/Mascota';
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function MascotasList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [pets, setPets] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const editId = searchParams.get('edit');
  const isCreating = searchParams.get('new') === 'true';

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await mascotaService.getAllAnimals({ albergue: false });
      setPets(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('No se pudieron cargar las mascotas.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Evitar que el clic en el botón active el clic en la fila
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      try {
        await mascotaService.deleteAnimal(id);
        setPets(pets.filter(p => p.id !== id));
      } catch (err) {
        alert('Error al eliminar la mascota');
      }
    }
  };

  const handleRowClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('edit', id);
    params.delete('new');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCreateClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('new', 'true');
    params.delete('edit');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCancel = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('edit');
    params.delete('new');
    router.push(`${pathname}?${params.toString()}`);
    fetchPets(); // Refresh list
  };

  if (isCreating || editId) {
    return <MascotaForm onCancel={handleCancel} editId={editId || undefined} />;
  }

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-[28px] p-7 shadow-sm border border-white/60">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Directorio de Mascotas</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona las mascotas registradas en el sistema</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar mascota..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm placeholder:text-gray-400"
            />
          </div>
          <button 
            onClick={handleCreateClick}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#015f33] to-[#2ecc71] hover:shadow-lg hover:shadow-[#2ecc71]/30 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Plus size={18} />
            <span>Crear Mascota</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] text-left text-gray-500">
          <thead className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
            <tr className="border-b border-gray-200/50">
              <th scope="col" className="px-4 py-3 pb-4 w-16">Acciones</th>
              <th scope="col" className="px-4 py-3 pb-4">Mascota</th>
              <th scope="col" className="px-4 py-3 pb-4">Especie / Raza</th>
              <th scope="col" className="px-4 py-3 pb-4">Sexo</th>
              <th scope="col" className="px-4 py-3 pb-4">Propietario</th>
              <th scope="col" className="px-4 py-3 pb-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-[#2ecc71]" size={24} />
                    <span className="text-gray-400">Cargando mascotas...</span>
                  </div>
                </td>
              </tr>
            ) : pets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  {error || 'No hay mascotas registradas.'}
                </td>
              </tr>
            ) : (
              (pets || []).map((pet) => (
                <tr 
                  key={pet.id} 
                  onClick={() => handleRowClick(pet.id)}
                  className="border-b border-gray-200/50 last:border-0 hover:bg-white/40 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        title="Ver Historial Clínico"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/mascotas/${pet.id}/historial`);
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#11ba82] hover:bg-[#11ba82]/10 rounded-full transition-all"
                      >
                        <FileText size={18} strokeWidth={2} />
                      </button>
                      <button 
                        title="Eliminar registro"
                        onClick={(e) => handleDelete(e, pet.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4.5 font-bold text-gray-800 flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#015f33] shrink-0">
                      <Dog size={16} />
                    </div>
                    <span>{pet.nombre}</span>
                  </td>
                  <td className="px-4 py-4.5">
                    <div className="font-medium text-gray-800">{pet.especie?.nombre || pet.especie_id || 'N/A'}</div>
                    <div className="text-[11px] text-gray-500">{pet.raza?.nombre || pet.raza_id || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-4.5 font-medium">{pet.sexo}</td>
                  <td className="px-4 py-4.5 font-medium">
                    {pet.propietario ? `${pet.propietario.nombre} ${pet.propietario.paterno}` : 'N/A'}
                  </td>
                  <td className="px-4 py-4.5 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${
                      pet.esterilizacion ? 'bg-[#2ecc71]/20 text-[#015f33]' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {pet.esterilizacion ? 'Esterilizado' : 'Sin Esterilizar'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
