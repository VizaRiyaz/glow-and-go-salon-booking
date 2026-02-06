
import React, { useState, useMemo } from 'react';
import { DB } from '../db';
import { Appointment, Service, Stylist, AppointmentStatus } from '../types';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'stylists'>('appointments');
  const [appointments, setAppointments] = useState(DB.appointments.getAll());
  const [services, setServices] = useState(DB.services.getAll());
  const [stylists, setStylists] = useState(DB.stylists.getAll());

  // Filters
  const [dateFilter, setDateFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      const matchDate = dateFilter ? app.date === dateFilter : true;
      const matchService = serviceFilter ? app.serviceId === serviceFilter : true;
      return matchDate && matchService;
    });
  }, [appointments, dateFilter, serviceFilter]);

  const updateAppStatus = (id: string, status: AppointmentStatus) => {
    DB.appointments.updateStatus(id, status);
    setAppointments(DB.appointments.getAll());
  };

  const deleteService = (id: string) => {
    if (window.confirm("Remove this service from menu?")) {
      DB.services.delete(id);
      setServices(DB.services.getAll());
    }
  };

  const deleteStylist = (id: string) => {
    if (window.confirm("Deactivate this stylist profile?")) {
      DB.stylists.delete(id);
      setStylists(DB.stylists.getAll());
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900">Salon Management</h1>
          <p className="text-slate-500 font-medium">Operations Center - Glow & Go India</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner">
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'appointments' ? 'bg-white shadow-lg text-amber-700' : 'text-slate-500 hover:text-amber-600'}`}
          >
            Schedules
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'services' ? 'bg-white shadow-lg text-amber-700' : 'text-slate-500 hover:text-amber-600'}`}
          >
            Menu
          </button>
          <button 
            onClick={() => setActiveTab('stylists')}
            className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stylists' ? 'bg-white shadow-lg text-amber-700' : 'text-slate-500 hover:text-amber-600'}`}
          >
            Artisans
          </button>
        </div>
      </div>

      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap gap-6 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Calendar Filter</label>
              <input 
                type="date" 
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-amber-500" 
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Service Type</label>
              <select 
                value={serviceFilter}
                onChange={e => setServiceFilter(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">All Treatments</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <button 
              onClick={() => { setDateFilter(''); setServiceFilter(''); }}
              className="px-6 py-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-amber-600 transition"
            >
              Reset
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase text-slate-400 font-black tracking-widest border-b bg-slate-50">
                    <th className="px-8 py-5">Guest</th>
                    <th className="px-8 py-5">Treatment</th>
                    <th className="px-8 py-5">Timeline</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length > 0 ? filteredAppointments.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/50">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-900">{app.userName}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{app.userPhone}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold text-slate-800">{app.serviceName}</div>
                        <div className="text-[10px] text-amber-600 font-black uppercase tracking-widest">{app.stylistName}</div>
                      </td>
                      <td className="px-8 py-6 text-sm">
                        <div className="font-bold">{app.date}</div>
                        <div className="text-xs opacity-60 font-medium">{app.time}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          app.status === 'confirmed' ? 'bg-amber-100 text-amber-700' :
                          app.status === 'cancelled' ? 'bg-slate-100 text-slate-400' :
                          app.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right space-x-2">
                        {app.status === 'pending' && (
                          <button onClick={() => updateAppStatus(app.id, 'confirmed')} className="text-[9px] font-black uppercase tracking-widest bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition shadow-sm">Confirm</button>
                        )}
                        {app.status !== 'completed' && app.status !== 'cancelled' && (
                          <>
                            <button onClick={() => updateAppStatus(app.id, 'completed')} className="text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-black transition shadow-sm">Done</button>
                          </>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="p-20 text-center font-medium text-slate-400">No matching reservations found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase text-slate-400 font-black tracking-widest border-b bg-slate-50">
                <th className="px-8 py-5">Service Catalog</th>
                <th className="px-8 py-5">Price (INR)</th>
                <th className="px-8 py-5">Duration</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map(s => (
                <tr key={s.id}>
                  <td className="px-8 py-6 font-bold text-slate-900">{s.name}</td>
                  <td className="px-8 py-6 font-black text-amber-700">₹{s.price}</td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-500">{s.duration} mins</td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => deleteService(s.id)} className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-rose-600 transition">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'stylists' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase text-slate-400 font-black tracking-widest border-b bg-slate-50">
                <th className="px-8 py-5">Artisan</th>
                <th className="px-8 py-5">Mastery</th>
                <th className="px-8 py-5">Availability</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stylists.map(st => (
                <tr key={st.id}>
                  <td className="px-8 py-6 flex items-center">
                    <img src={st.image} className="w-10 h-10 rounded-xl mr-4 object-cover shadow-sm grayscale hover:grayscale-0 transition duration-300" />
                    <span className="font-bold text-slate-900">{st.name}</span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold uppercase tracking-tight text-slate-500">{st.specialization}</td>
                  <td className="px-8 py-6 text-[10px] font-black text-amber-700">{st.availability.start} - {st.availability.end}</td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => deleteStylist(st.id)} className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-rose-600 transition">Retire</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
