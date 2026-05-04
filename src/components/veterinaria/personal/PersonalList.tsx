'use client';

import { useState } from 'react';
import { Search, Plus, UserX, UserCheck, AlertTriangle, Send } from 'lucide-react';
import Link from 'next/link';

interface Personal {
  id: string;
  tipo_doc: string;
  nro_doc: string;
  nombre: string;
  paterno: string;
  materno: string;
  email: string;
  celular: string;
  especialidad: string;
  rol_sistema: string;
  estado: 'activo' | 'inactivo';
  user: any | null;
}

const mockPersonalData: Personal[] = [
  {
    id: '1',
    tipo_doc: 'DNI',
    nro_doc: '74082478',
    nombre: 'Juan',
    paterno: 'Perez',
    materno: 'Gomez',
    email: 'juan.perez@example.com',
    celular: '999888777',
    especialidad: 'Cardiología',
    rol_sistema: 'veterinario',
    estado: 'activo',
    user: { id: 'u1' }
  },
  {
    id: '2',
    tipo_doc: 'DNI',
    nro_doc: '72345678',
    nombre: 'Ana',
    paterno: 'Maria',
    materno: 'Torres',
    email: 'ana.torres@example.com',
    celular: '988777666',
    especialidad: 'Cirugía',
    rol_sistema: 'veterinario',
    estado: 'activo',
    user: { id: 'u2' }
  },
  {
    id: '3',
    tipo_doc: 'CE',
    nro_doc: '00123456',
    nombre: 'Carlos',
    paterno: 'Diaz',
    materno: 'Ruiz',
    email: 'carlos.diaz@example.com',
    celular: '977666555',
    especialidad: 'Recepción',
    rol_sistema: 'recepcionista',
    estado: 'inactivo',
    user: { id: 'u3' }
  },
  {
    id: '4',
    tipo_doc: 'CE',
    nro_doc: '00654321',
    nombre: 'Luis',
    paterno: 'Ramirez',
    materno: 'Soto',
    email: 'luis.ramirez@example.com',
    celular: '966555444',
    especialidad: 'Laboratorio',
    rol_sistema: 'veterinario',
    estado: 'activo',
    user: null
  }
];

export default function PersonalList() {
  const [personal, setPersonal] = useState<Personal[]>(mockPersonalData);
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDeactivate, setUserToDeactivate] = useState<Personal | null>(null);
  const [userToReactivate, setUserToReactivate] = useState<Personal | null>(null);

  const filteredPersonal = personal.filter(p => {
    const fullName = `${p.nombre} ${p.paterno} ${p.materno}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || p.nro_doc.includes(searchTerm);
  });

  const handleDeactivateConfirm = () => {
    if (userToDeactivate) {
      setPersonal(prev => prev.map(p => p.id === userToDeactivate.id ? { ...p, estado: 'inactivo' } : p));
      setUserToDeactivate(null);
    }
  };

  const handleReactivateConfirm = () => {
    if (userToReactivate) {
      setPersonal(prev => prev.map(p => p.id === userToReactivate.id ? { ...p, estado: 'activo' } : p));
      setUserToReactivate(null);
    }
  };

  const handleResendInvitation = (person: Personal) => {
    console.log(`Reenviando invitación a ${person.email}...`);
    // Aquí iría la llamada al endpoint POST /api/personal/{id}/reenviar-invitacion
    alert(`Se ha reenviado la invitación a ${person.email}`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[28px] p-8 shadow-sm border border-white/60">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Directorio de Personal</h2>
          <p className="text-gray-500 text-sm mt-1">Gestiona el personal registrado en el sistema</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar personal..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#11ba82] focus:border-[#11ba82] outline-none transition-all text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link 
            href="/personal/crear" 
            className="flex items-center gap-2 bg-gradient-to-r from-[#015f33] to-[#2ecc71] text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
          >
            <Plus size={18} strokeWidth={2} />
            Crear Personal
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-100 rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                <th className="p-4 w-12 text-center"></th>
                <th className="p-4">Tipo y Número de Doc</th>
                <th className="p-4">Nombres y Apellidos</th>
                <th className="p-4">Correo Electrónico</th>
                <th className="p-4">Número de Celular</th>
                <th className="p-4">Especialidad</th>
                <th className="p-4">Rol</th>
                <th className="p-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPersonal.map((person) => (
                <tr key={person.id} className="hover:bg-green-50/30 transition-colors group">
                  <td className="p-4 text-center align-middle">
                    {person.user === null ? (
                      <button
                        onClick={() => handleResendInvitation(person)}
                        className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                        title="Reenviar invitación"
                      >
                        <Send size={18} strokeWidth={1.5} className="-ml-0.5" />
                      </button>
                    ) : person.estado === 'activo' ? (
                      <button
                        onClick={() => setUserToDeactivate(person)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        title="Desactivar personal"
                      >
                        <UserX size={20} strokeWidth={1.5} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setUserToReactivate(person)}
                        className="p-2 text-gray-400 hover:text-[#11ba82] hover:bg-[#11ba82]/10 rounded-full transition-all"
                        title="Reintegrar personal"
                      >
                        <UserCheck size={20} strokeWidth={1.5} />
                      </button>
                    )}
                  </td>
                  <td className="p-4 align-middle">
                    <span className="font-bold text-gray-800 text-[14px]">
                      {person.tipo_doc}: {person.nro_doc}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <span className="text-[14px] text-gray-700 font-medium">
                      {`${person.nombre} ${person.paterno} ${person.materno}`}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 align-middle text-[14px]">{person.email}</td>
                  <td className="p-4 text-gray-600 align-middle text-[14px]">{person.celular}</td>
                  <td className="p-4 text-gray-600 align-middle text-[14px]">{person.especialidad}</td>
                  <td className="p-4 text-gray-600 align-middle text-[14px] capitalize">{person.rol_sistema}</td>
                  <td className="p-4 align-middle text-center">
                    {person.user === null ? (
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[13px] font-bold min-w-[80px] bg-yellow-100/80 text-yellow-700 whitespace-nowrap">
                        Pendiente de confirmación
                      </span>
                    ) : (
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[13px] font-bold min-w-[80px] ${
                        person.estado === 'activo' 
                          ? 'bg-green-100/80 text-green-700' 
                          : 'bg-red-100/80 text-red-600'
                      }`}>
                        {person.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPersonal.length === 0 && (
            <div className="text-center py-16 text-gray-500 bg-gray-50/50">
              <p className="text-lg font-medium text-gray-600 mb-1">No hay registros</p>
              <p className="text-sm">No se encontró personal con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {userToDeactivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Desactivar Usuario</h3>
              <p className="text-gray-600">
                ¿Estás seguro que deseas poner en modo inactivo a <strong className="text-gray-800">{userToDeactivate.nombre} {userToDeactivate.paterno}</strong>?
              </p>
              <p className="text-gray-500 text-[13px] mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                Esta acción restringirá el acceso del usuario al sistema. Podrás reactivarlo más adelante si es necesario.
              </p>
            </div>
            
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setUserToDeactivate(null)}
                className="flex-1 px-6 py-2.5 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeactivateConfirm}
                className="flex-1 px-6 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 active:bg-red-700 transition-colors shadow-sm shadow-red-500/20"
              >
                Desactivar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reintegration Modal */}
      {userToReactivate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-[#11ba82]/10 text-[#11ba82] rounded-full flex items-center justify-center mb-4">
                <UserCheck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Reintegrar Personal</h3>
              <p className="text-gray-600">
                ¿Estás seguro que deseas reactivar a <strong className="text-gray-800">{userToReactivate.nombre} {userToReactivate.paterno}</strong>?
              </p>
              <p className="text-gray-500 text-[13px] mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                Esta acción restaurará el acceso del usuario al sistema con su rol actual.
              </p>
            </div>
            
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setUserToReactivate(null)}
                className="flex-1 px-6 py-2.5 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleReactivateConfirm}
                className="flex-1 px-6 py-2.5 bg-[#11ba82] text-white font-medium rounded-xl hover:bg-[#0e9d6d] active:bg-[#0c8a60] transition-colors shadow-sm shadow-[#11ba82]/20"
              >
                Reintegrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
