'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { 
  Dog, HeartPulse, Activity, Syringe, ClipboardList 
} from 'lucide-react';

const mockBarData = [
  { name: 'Lun', visitas: 40 },
  { name: 'Mar', visitas: 30 },
  { name: 'Mié', visitas: 55 },
  { name: 'Jue', visitas: 45 },
  { name: 'Vie', visitas: 60 },
  { name: 'Sáb', visitas: 80 },
  { name: 'Dom', visitas: 25 },
];

const mockStandings = [
  { id: 1, name: 'Campaña Desparasitación', date: '15 Nov 2026', status: 'Activa', total: 150 },
  { id: 2, name: 'Vacunación Antirrábica', date: '20 Nov 2026', status: 'Programada', total: 300 },
  { id: 3, name: 'Esterilización Canina', date: '25 Nov 2026', status: 'Programada', total: 50 },
  { id: 4, name: 'Registro de Mascotas', date: '01 Dic 2026', status: 'Pendiente', total: 0 },
];

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Left Column: Cards and Table (Takes 2 cols on lg) */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Weekly Stats */}
          <div className="bg-white/50 backdrop-blur-md rounded-[28px] p-7 shadow-sm border border-white/60 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-gray-500 font-medium text-sm">Estadísticas Semanales</h3>
                <button className="text-[13px] text-[#2ecc71] font-semibold hover:underline">Ver todas</button>
              </div>
              
              {/* Simulated Progress Bar */}
              <div className="w-full h-3 bg-white/60 rounded-full mt-2 mb-6 flex overflow-hidden border border-white/50 shadow-inner">
                <div className="h-full bg-[#015f33]" style={{ width: '55%' }}></div>
                <div className="h-full bg-[#2ecc71]" style={{ width: '25%' }}></div>
                <div className="h-full bg-red-400" style={{ width: '10%' }}></div>
              </div>
            </div>
            
            <div className="flex justify-between text-center bg-white/30 rounded-2xl p-4 border border-white/40">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total</p>
                <p className="text-xl font-bold text-gray-800 mt-1">120</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Atend.</p>
                <p className="text-xl font-bold text-gray-800 mt-1">72</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Pend.</p>
                <p className="text-xl font-bold text-gray-800 mt-1">30</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Canc.</p>
                <p className="text-xl font-bold text-gray-800 mt-1">18</p>
              </div>
            </div>
          </div>

          {/* Card 2: Promotional Card */}
          <div className="bg-gradient-to-br from-[#015f33] to-[#2ecc71] rounded-[28px] p-8 shadow-xl shadow-[#2ecc71]/20 text-white relative overflow-hidden group cursor-pointer flex flex-col justify-between h-full">
            {/* Decorative shapes */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors duration-500"></div>
            <div className="absolute right-12 bottom-0 w-20 h-20 bg-black/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-3">Recordatorio</p>
                <h3 className="text-[26px] font-extrabold leading-tight mb-6">
                  Configura la <br/> próxima campaña
                </h3>
              </div>
              <button className="bg-white text-[#015f33] px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-gray-50 transition-colors inline-block hover:scale-105 transform duration-300 self-start">
                Ir a Campañas
              </button>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white/50 backdrop-blur-md rounded-[28px] p-7 shadow-sm border border-white/60">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 font-medium text-sm">Próximas Campañas</h3>
            <button className="text-[13px] text-[#2ecc71] font-semibold hover:underline">Ver todas</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-left text-gray-500">
              <thead className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                <tr className="border-b border-gray-200/50">
                  <th scope="col" className="px-4 py-3 pb-4">#</th>
                  <th scope="col" className="px-4 py-3 pb-4">Campaña</th>
                  <th scope="col" className="px-4 py-3 pb-4 text-center">Fecha</th>
                  <th scope="col" className="px-4 py-3 pb-4 text-center">Estado</th>
                  <th scope="col" className="px-4 py-3 pb-4 text-right">Cupos</th>
                </tr>
              </thead>
              <tbody>
                {mockStandings.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200/50 last:border-0 hover:bg-white/40 transition-colors">
                    <td className="px-4 py-4.5">{row.id}</td>
                    <td className="px-4 py-4.5 font-bold text-gray-800 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#015f33]">
                        <Dog size={14} />
                      </div>
                      <span>{row.name}</span>
                    </td>
                    <td className="px-4 py-4.5 text-center font-medium">{row.date}</td>
                    <td className="px-4 py-4.5 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide ${
                        row.status === 'Activa' ? 'bg-[#2ecc71]/20 text-[#015f33]' : 'bg-white/80 text-gray-500 shadow-sm'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4.5 font-bold text-gray-800 text-right">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Column: Metrics and Charts */}
      <div className="space-y-8">
        
        {/* 2x2 Metrics Grid */}
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white/50 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-white/60 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-3 shadow-sm">
              <Dog size={20} />
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Mascotas Reg.</p>
            <p className="text-[28px] font-extrabold text-gray-800 leading-none">1,245</p>
          </div>
          <div className="bg-white/50 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-white/60 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500 mb-3 shadow-sm">
              <HeartPulse size={20} />
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Atenciones</p>
            <p className="text-[28px] font-extrabold text-gray-800 leading-none">8,530</p>
          </div>
          <div className="bg-white/50 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-white/60 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-3 shadow-sm">
              <ClipboardList size={20} />
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Presupuesto</p>
            <p className="text-[28px] font-extrabold text-gray-800 leading-none">S/ 42k</p>
          </div>
          <div className="bg-white/50 backdrop-blur-md rounded-[24px] p-5 shadow-sm border border-white/60 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300 cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-[#e6f4f1] flex items-center justify-center text-[#015f33] mb-3 shadow-sm">
              <Activity size={20} />
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Prom. Diario</p>
            <p className="text-[28px] font-extrabold text-gray-800 leading-none">42.5</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white/50 backdrop-blur-md rounded-[28px] p-7 shadow-sm border border-white/60">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-gray-500 font-medium text-sm">Visitas por Día</h3>
             <span className="text-[11px] bg-white text-gray-500 px-3 py-1 rounded-full font-bold shadow-sm">Esta semana</span>
           </div>
           <div className="h-[200px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={mockBarData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 500 }} />
                 <Tooltip 
                   cursor={{ fill: 'rgba(46, 204, 113, 0.05)' }}
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontWeight: 'bold', color: '#1f2937' }}
                 />
                 <Bar dataKey="visitas" fill="#2ecc71" radius={[6, 6, 6, 6]} barSize={24} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>



      </div>
    </div>
  );
}
