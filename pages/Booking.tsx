
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DB } from '../db';
import { useApp } from '../App';
import { Appointment } from '../types';

const Booking = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const services = DB.services.getAll();
  const stylists = DB.stylists.getAll();
  const appointments = DB.appointments.getAll();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    gender: currentUser?.gender || 'not-specified',
    serviceId: '',
    stylistId: '',
    date: '',
    time: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 9; h < 20; h++) {
      for (let m = 0; m < 60; m += 30) {
        slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  }, []);

  const isSlotBooked = (date: string, time: string, stylistId: string) => {
    return appointments.some(app => 
      app.date === date && 
      app.time === time && 
      app.stylistId === stylistId && 
      app.status !== 'cancelled'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setMessage({ type: 'error', text: 'Please login to book your grooming session.' });
      return;
    }

    if (!formData.serviceId || !formData.stylistId || !formData.date || !formData.time) {
      setMessage({ type: 'error', text: 'Please select all session details.' });
      return;
    }

    if (isSlotBooked(formData.date, formData.time, formData.stylistId)) {
      setMessage({ type: 'error', text: 'Master Stylist is unavailable at this time. Please try another slot.' });
      return;
    }

    const service = services.find(s => s.id === formData.serviceId);
    const stylist = stylists.find(st => st.id === formData.stylistId);

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      serviceId: formData.serviceId,
      stylistId: formData.stylistId,
      date: formData.date,
      time: formData.time,
      status: 'pending',
      createdAt: new Date().toISOString(),
      userName: formData.name,
      serviceName: service?.name || '',
      stylistName: stylist?.name || '',
      userPhone: formData.phone
    };

    DB.appointments.add(newAppointment);
    setMessage({ type: 'success', text: 'Session confirmed! Your stylist will be ready for you.' });
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-10 text-white text-center">
          <h1 className="text-4xl font-serif font-bold text-amber-500">Reserve Your Chair</h1>
          <p className="opacity-80 mt-2 tracking-wide uppercase text-xs font-bold">Select Your Artisan & Style</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {message && (
            <div className={`md:col-span-2 p-5 rounded-xl text-sm font-bold tracking-tight ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em] border-b border-slate-100 pb-3">1. Identity</h3>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Full Name</label>
              <input 
                type="text" required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition" 
                placeholder="Ex: Vikram Singh"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Mobile Number</label>
              <input 
                type="tel" required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition" 
                placeholder="+91"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Email Address</label>
              <input 
                type="email" required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition" 
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em] border-b border-slate-100 pb-3">2. Grooming Specs</h3>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Service</label>
              <select 
                required
                value={formData.serviceId}
                onChange={e => setFormData({...formData, serviceId: e.target.value})}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition"
              >
                <option value="">Choose Service</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.name} (₹{s.price})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Artisan Stylist</label>
              <select 
                required
                value={formData.stylistId}
                onChange={e => setFormData({...formData, stylistId: e.target.value})}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition"
              >
                <option value="">Select Stylist</option>
                {stylists.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Preferred Date</label>
                <input 
                  type="date" required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Slot</label>
                <select 
                  required
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-amber-500 outline-none transition"
                >
                  <option value="">Time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time} disabled={formData.date && formData.stylistId && isSlotBooked(formData.date, time, formData.stylistId)}>
                      {time} {formData.date && formData.stylistId && isSlotBooked(formData.date, time, formData.stylistId) ? '(Full)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 pt-6">
            <button type="submit" className="w-full bg-amber-600 text-white py-5 rounded-xl font-black text-lg hover:bg-amber-700 transition-all shadow-xl shadow-amber-900/20 active:scale-[0.98]">
              Confirm My Chair
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
