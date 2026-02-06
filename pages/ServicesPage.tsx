
import React from 'react';
import { Link } from 'react-router-dom';
import { DB } from '../db';
import { INITIAL_SERVICES } from '../constants';

const ServicesPage = () => {
  // Use INITIAL_SERVICES directly if DB doesn't have images yet, 
  // or merge images in. For this app, they are static.
  const services = INITIAL_SERVICES;

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-serif font-bold text-slate-900 mb-6">Elite Treatments</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            From precision artisan scissor cuts to comprehensive skin rituals, explore our curated menu of luxury grooming services.
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mt-10"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-amber-100 transition-all duration-500 group border border-slate-100">
              <div className="h-72 bg-slate-950 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-amber-600 px-4 py-1.5 rounded-full shadow-lg">{service.category}</span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 leading-tight">{service.name}</h3>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-700">₹{service.price}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium min-h-[48px]">{service.description}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-8">
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center">
                    <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {service.duration} Min
                  </span>
                  <Link to="/booking" className="bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition shadow-lg shadow-slate-200">
                    Reserve
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
