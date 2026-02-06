
import React, { useState } from 'react';
import { DB } from '../db';
import { useApp } from '../App';
import { AppointmentStatus } from '../types';

const Dashboard = () => {
  const { currentUser } = useApp();
  const [appointments, setAppointments] = useState(
    DB.appointments.getAll().filter(a => a.userId === currentUser?.id)
  );

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-slate-100 text-slate-400';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const handleCancel = (id: string, date: string, time: string) => {
    const appDateTime = new Date(`${date}T${time}`);
    if (appDateTime < new Date()) {
      alert("Past appointments cannot be modified.");
      return;
    }

    if (window.confirm("Cancel your grooming reservation?")) {
      DB.appointments.updateStatus(id, 'cancelled');
      setAppointments(DB.appointments.getAll().filter(a => a.userId === currentUser?.id));
    }
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-slate-900">Namaste, {currentUser?.name}</h1>
        <p className="text-slate-500 mt-2 font-medium">Your grooming timeline and status.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-5 bg-slate-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-slate-900 uppercase tracking-widest text-xs">My Reservations</h2>
          <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full">{appointments.length} Total</span>
        </div>
        
        <div className="overflow-x-auto">
          {appointments.length === 0 ? (
            <div className="p-20 text-center">
              <div className="text-4xl mb-6">✂️</div>
              <p className="text-slate-400 mb-6 font-medium">No active sessions found.</p>
              <a href="#/booking" className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition">Book New Session</a>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-slate-400 font-black tracking-widest border-b">
                  <th className="px-8 py-5">Service Type</th>
                  <th className="px-8 py-5">Artisan</th>
                  <th className="px-8 py-5">Scheduled At</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{app.serviceName}</div>
                    </td>
                    <td className="px-8 py-6 text-slate-600 font-medium">{app.stylistName}</td>
                    <td className="px-8 py-6 text-slate-600">
                      <div className="font-bold">{app.date}</div>
                      <div className="text-xs opacity-60">{app.time}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {app.status === 'pending' || app.status === 'confirmed' ? (
                        <button 
                          onClick={() => handleCancel(app.id, app.date, app.time)}
                          className="text-amber-600 text-xs font-black uppercase tracking-widest hover:text-amber-800 transition"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-slate-300 text-xs font-bold">---</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
