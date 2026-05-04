'use client';

import { useState } from 'react';
import { Plus, Search, Dog } from 'lucide-react';
import MascotaForm from './MascotaForm';

export default function MascotasList() {
  const [view, setView] = useState<'list' | 'create'>('list');

  // Mock data for pets table
  const mockPets = [
    { id: 1, nombre: 'Max', especie: 'Canino', raza: 'Golden Retriever', sexo: 'Macho', propietario: 'Juan Perez', status: 'Activo' },
    { id: 2, nombre: 'Luna', especie: 'Felino', raza: 'Siamés', sexo: 'Hembra', propietario: 'Ana Gomez', status: 'Activo' },
    { id: 3, nombre: 'Rocky', especie: 'Canino', raza: 'Bulldog', sexo: 'Macho', propietario: 'Carlos Diaz', status: 'Inactivo' },
  ];

  if (view === 'create') {
    return <MascotaForm onCancel={() => setView('list')} />;
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
            onClick={() => setView('create')}
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
              <th scope="col" className="px-4 py-3 pb-4">ID</th>
              <th scope="col" className="px-4 py-3 pb-4">Mascota</th>
              <th scope="col" className="px-4 py-3 pb-4">Especie / Raza</th>
              <th scope="col" className="px-4 py-3 pb-4">Sexo</th>
              <th scope="col" className="px-4 py-3 pb-4">Propietario</th>
              <th scope="col" className="px-4 py-3 pb-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockPets.map((pet) => (
              <tr key={pet.id} className="border-b border-gray-200/50 last:border-0 hover:bg-white/40 transition-colors">
                <td className="px-4 py-4.5 font-medium text-gray-500">#{pet.id.toString().padStart(4, '0')}</td>
                <td className="px-4 py-4.5 font-bold text-gray-800 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#015f33] shrink-0">
                    <Dog size={16} />
                  </div>
                  <span>{pet.nombre}</span>
                </td>
                <td className="px-4 py-4.5">
                  <div className="font-medium text-gray-800">{pet.especie}</div>
                  <div className="text-[11px] text-gray-500">{pet.raza}</div>
                </td>
                <td className="px-4 py-4.5 font-medium">{pet.sexo}</td>
                <td className="px-4 py-4.5 font-medium">{pet.propietario}</td>
                <td className="px-4 py-4.5 text-center">
                  <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${
                    pet.status === 'Activo' ? 'bg-[#2ecc71]/20 text-[#015f33]' : 'bg-red-100 text-red-600'
                  }`}>
                    {pet.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
