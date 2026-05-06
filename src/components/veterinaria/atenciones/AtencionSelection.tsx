'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Loader2, HeartPulse, ChevronRight, Dog, Calendar, Check, ChevronLeft, FileText, Lock } from 'lucide-react';
import { mascotaService } from '@/utils/mascotaService';
import { Mascota } from '@/interfaces/Mascota';
import SearchableSelect from '@/components/ui/SearchableSelect';
import MascotaModal from '../mascotas/MascotaModal';
import { useAuthStore } from '@/store/useAuthStore';

export default function AtencionSelection() {
  const router = useRouter();
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedMascotaId, setSelectedMascotaId] = useState(searchParams.get('mascota_id') || '');
  const [isMascotaModalOpen, setIsMascotaModalOpen] = useState(false);

  // Consulta Form State (Step 2)
  const [consultaData, setConsultaData] = useState({
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
    peso_registrado: '',
    cita_id: '', // Disabled for now
  });

  const selectedMascota = mascotas.find(m => m.id === selectedMascotaId);

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      setLoading(true);
      const data = await mascotaService.getAllAnimals();
      setMascotas(data);
    } catch (err) {
      console.error('Error fetching mascotas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMascotaSuccess = (newPet: Mascota) => {
    setMascotas(prev => [newPet, ...prev]);
    setSelectedMascotaId(newPet.id);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedMascotaId) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!consultaData.motivo || !consultaData.diagnostico || !consultaData.peso_registrado) {
        alert('Por favor complete los campos obligatorios (Motivo, Diagnóstico y Peso)');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user || !selectedMascotaId) return;
    
    setSubmitting(true);
    try {
      const payload = {
        ...consultaData,
        animal_id: selectedMascotaId,
        personal_id: user.id, 
        peso_registrado: parseFloat(consultaData.peso_registrado)
      };

      await mascotaService.createConsulta(payload);
      alert('Atención médica registrada con éxito');
      router.push(`/mascotas/${selectedMascotaId}/historial`);
    } catch (err: any) {
      console.error('Error creating consulta:', err);
      alert(err.response?.data?.message || 'Error al registrar la consulta. Intente de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Mascota', icon: <Dog size={18} /> },
    { number: 2, title: 'Consulta', icon: <HeartPulse size={18} /> },
    { number: 3, title: 'Finalizar', icon: <Calendar size={18} /> },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-[#2ecc71]" size={48} />
        <p className="text-gray-500 font-medium">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Registro de Atención</h1>
        <p className="text-gray-500 font-medium">Siga los pasos para completar la atención médica</p>
      </div>

      {/* Stepper Indicator */}
      <div className="flex items-center justify-center mb-12 pt-4">
        <div className="flex items-center w-full max-w-2xl px-4">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative">
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200' 
                      : 'bg-white border-gray-200 text-gray-400'
                  } ${currentStep === step.number ? 'scale-110' : ''}`}
                >
                  {currentStep > step.number ? <Check size={22} strokeWidth={3} /> : step.icon}
                </div>
                <span 
                  className={`absolute -bottom-8 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest transition-colors duration-500 ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[3px] mx-4 bg-gray-100 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-700 ease-in-out" 
                    style={{ width: currentStep > step.number ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden">
        {/* Step 1: Selection */}
        {currentStep === 1 && (
          <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">Seleccione la Mascota</h3>
              <p className="text-gray-500 leading-relaxed">Busque una mascota registrada o cree una nueva si es la primera vez que se atiende.</p>
            </div>

            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-400 mb-3 ml-1 uppercase tracking-widest">
                  Buscar Mascota
                </label>
                <SearchableSelect 
                  placeholder="Escriba el nombre de la mascota o el dueño..."
                  value={selectedMascotaId}
                  onChange={(val) => setSelectedMascotaId(val.toString())}
                  options={mascotas.map(m => ({
                    id: m.id,
                    label: m.nombre,
                    sublabel: `${m.especie?.nombre || 'Especie'} - Prop: ${m.propietario?.nombre || 'N/A'}`
                  }))}
                  className="w-full"
                />
              </div>
              <button 
                onClick={() => setIsMascotaModalOpen(true)}
                className="h-[52px] w-[52px] bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 text-blue-600 transition-all flex items-center justify-center shrink-0 shadow-sm hover:shadow-md active:scale-95"
                title="Registrar nueva mascota"
              >
                <Plus size={24} strokeWidth={2.5} />
              </button>
            </div>

            {selectedMascotaId && (
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-[32px] p-8 flex items-center gap-6 shadow-sm animate-in slide-in-from-top-4 duration-500">
                <div className="w-20 h-20 bg-white rounded-[24px] shadow-sm border border-blue-100 flex items-center justify-center text-blue-500">
                  <Dog size={40} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold text-gray-800">
                    {selectedMascota?.nombre}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    Propietario: <span className="text-gray-700">{selectedMascota?.propietario?.nombre} {selectedMascota?.propietario?.paterno}</span>
                  </p>
                  <div className="pt-2 flex gap-2">
                    <span className="px-3 py-1 bg-blue-100/50 text-blue-700 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                      {selectedMascota?.especie?.nombre}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                      {selectedMascota?.raza?.nombre}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 flex justify-end">
              <button 
                onClick={handleNextStep}
                disabled={!selectedMascotaId}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-[20px] font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-3 text-lg"
              >
                Continuar
                <ChevronRight size={22} strokeWidth={3} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Consulta Form */}
        {currentStep === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Header Informative */}
            <div className="bg-blue-50/30 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center text-blue-500">
                  <Dog size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Atendiendo a:</p>
                  <h4 className="text-base font-bold text-gray-800">{selectedMascota?.nombre}</h4>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Responsable:</p>
                <p className="text-xs font-bold text-gray-600">{user?.name}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Detalles de la Consulta</h3>
                  <p className="text-gray-500">Ingrese la información clínica de la atención actual.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">
                  Motivo de la consulta <span className="text-pink-500">*</span>
                </label>
                <textarea 
                  required
                  rows={3}
                  value={consultaData.motivo}
                  onChange={(e) => setConsultaData({...consultaData, motivo: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm resize-none"
                  placeholder="Describa brevemente el motivo de la atención..."
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">
                  Peso registrado (kg) <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={consultaData.peso_registrado}
                    onChange={(e) => setConsultaData({...consultaData, peso_registrado: e.target.value})}
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm"
                    placeholder="0.00"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">
                    kg
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-wider">
                  Cita Relacionada (Opcional)
                </label>
                <div className="relative opacity-60">
                  <input 
                    type="text" 
                    disabled
                    className="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-[20px] text-sm cursor-not-allowed"
                    placeholder="Próximamente..."
                  />
                  <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">
                  Diagnóstico <span className="text-pink-500">*</span>
                </label>
                <textarea 
                  required
                  rows={3}
                  value={consultaData.diagnostico}
                  onChange={(e) => setConsultaData({...consultaData, diagnostico: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm resize-none"
                  placeholder="Ingrese el diagnóstico clínico..."
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">
                  Tratamiento
                </label>
                <textarea 
                  rows={4}
                  value={consultaData.tratamiento}
                  onChange={(e) => setConsultaData({...consultaData, tratamiento: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm resize-none"
                  placeholder="Medicamentos, dosis, frecuencia..."
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-wider">
                  Observaciones adicionales
                </label>
                <textarea 
                  rows={4}
                  value={consultaData.observaciones}
                  onChange={(e) => setConsultaData({...consultaData, observaciones: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm resize-none"
                  placeholder="Notas adicionales sobre la atención..."
                />
              </div>
            </div>

            <div className="pt-8 flex justify-between border-t border-gray-100">
              <button 
                onClick={handlePrevStep}
                className="px-8 py-4 rounded-[20px] font-bold text-gray-500 hover:bg-gray-100 transition-all flex items-center gap-2 hover:-translate-x-1"
              >
                <ChevronLeft size={20} strokeWidth={3} />
                Atrás
              </button>
              <button 
                onClick={handleNextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-[20px] font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center gap-3 hover:-translate-y-1"
              >
                Siguiente
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Resumen y Finalizar */}
        {currentStep === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="space-y-4 text-center">
              <div className="inline-flex p-3 bg-green-100 text-green-600 rounded-2xl mb-2">
                <Check size={32} strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-black text-gray-800">Resumen de Atención</h3>
              <p className="text-gray-500 leading-relaxed max-w-xl mx-auto">
                Revise la información antes de guardarla permanentemente en el historial clínico de {selectedMascota?.nombre}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bloque Mascota */}
              <div className="bg-gray-50/50 rounded-[28px] p-6 border border-gray-100">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Información del Paciente</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500">
                    <Dog size={24} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">{selectedMascota?.nombre}</p>
                    <p className="text-xs text-gray-500">{selectedMascota?.especie?.nombre} • {selectedMascota?.raza?.nombre}</p>
                  </div>
                </div>
              </div>

              {/* Bloque Clínico Rápido */}
              <div className="bg-gray-50/50 rounded-[28px] p-6 border border-gray-100">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Datos Clínicos</h4>
                <div className="flex items-center gap-6">
                   <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Peso</span>
                    <span className="text-lg font-black text-blue-600">{consultaData.peso_registrado} kg</span>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Fecha</span>
                    <span className="text-sm font-bold text-gray-700">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm">
                  <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2">Motivo de Consulta</h4>
                  <p className="text-gray-700 text-sm italic">"{consultaData.motivo}"</p>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm">
                  <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2">Diagnóstico</h4>
                  <p className="text-gray-700 text-sm font-medium">{consultaData.diagnostico}</p>
                </div>

                {(consultaData.tratamiento || consultaData.observaciones) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {consultaData.tratamiento && (
                      <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tratamiento</h4>
                        <p className="text-gray-700 text-sm">{consultaData.tratamiento}</p>
                      </div>
                    )}
                    {consultaData.observaciones && (
                      <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Observaciones</h4>
                        <p className="text-gray-700 text-sm">{consultaData.observaciones}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <button 
                onClick={handlePrevStep}
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-4 rounded-[20px] font-bold text-gray-500 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft size={20} strokeWidth={3} />
                Corregir datos
              </button>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => router.push('/dashboard')}
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 rounded-[20px] font-bold text-pink-500 hover:bg-pink-50 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full sm:w-auto bg-[#2ecc71] hover:bg-[#27ae60] text-white px-10 py-4 rounded-[20px] font-bold shadow-xl shadow-[#2ecc71]/20 transition-all flex items-center justify-center gap-3 hover:-translate-y-1 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" size={20} /> : <HeartPulse size={20} />}
                  Registrar consulta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info helper */}
      <div className="flex items-center justify-center gap-12 text-gray-400 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
            <Calendar size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Registro automático</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
            <HeartPulse size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Control clínico</span>
        </div>
      </div>

      {isMascotaModalOpen && (
        <MascotaModal 
          onClose={() => setIsMascotaModalOpen(false)} 
          onSuccess={handleMascotaSuccess}
        />
      )}
    </div>
  );
}
