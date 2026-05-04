'use client';

import { useState } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import PropietarioForm from './PropietarioForm';

export default function PropietariosList() {
  const [view, setView] = useState<'list' | 'create'>('list');

  // Mock data for owners table
  const mockOwners = [
    { id: 1, documento: '12345678', nombre: 'Juan Perez', email: 'juan@example.com', celular: '987654321', status: 'Activo' },
    { id: 2, documento: '87654321', nombre: 'Ana Gomez', email: 'ana@example.com', celular: '912345678', status: 'Activo' },
    { id: 3, documento: '45678912', nombre: 'Carlos Diaz', email: 'carlos@example.com', celular: '998877665', status: 'Inactivo' },
  ];

  if (view === 'create') {
    return <PropietarioForm onCancel={() => setView('list')} />;
  }

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-[28px] p-7 shadow-sm border border-white/60">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Directorio de Propietarios</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona los propietarios registrados en el sistema</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar propietario..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/50 text-sm placeholder:text-gray-400"
            />
          </div>
          <button 
            onClick={() => setView('create')}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#015f33] to-[#2ecc71] hover:shadow-lg hover:shadow-[#2ecc71]/30 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Plus size={18} />
            <span>Crear Propietario</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-[13px] text-left text-gray-500">
          <thead className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
            <tr className="border-b border-gray-200/50">
              <th scope="col" className="px-4 py-3 pb-4">Propietario</th>
              <th scope="col" className="px-4 py-3 pb-4">Documento</th>
              <th scope="col" className="px-4 py-3 pb-4">Contacto</th>
              <th scope="col" className="px-4 py-3 pb-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockOwners.map((owner) => (
              <tr key={owner.id} className="border-b border-gray-200/50 last:border-0 hover:bg-white/40 transition-colors">
                <td className="px-4 py-4.5 font-bold text-gray-800 flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#015f33] shrink-0">
                    <Users size={16} />
                  </div>
                  <span>{owner.nombre}</span>
                </td>
                <td className="px-4 py-4.5 font-medium text-gray-800">{owner.documento}</td>
                <td className="px-4 py-4.5">
                  <div className="font-medium text-gray-800">{owner.email}</div>
                  <div className="text-[11px] text-gray-500">{owner.celular}</div>
                </td>
                <td className="px-4 py-4.5 text-center">
                  <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${
                    owner.status === 'Activo' ? 'bg-[#2ecc71]/20 text-[#015f33]' : 'bg-red-100 text-red-600'
                  }`}>
                    {owner.status}
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
