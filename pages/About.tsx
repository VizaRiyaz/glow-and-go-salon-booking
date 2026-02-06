
import React from 'react';
import { DB } from '../db';

const About = () => {
  const stylists = DB.stylists.getAll();

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
          <div className="order-2 md:order-1">
            <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">The Heritage</span>
            <h1 className="text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">Mastering the <span className="text-amber-600">Art of Grooming</span></h1>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              Founded in 2015, Glow & Go Salon brought the classic European barbering tradition to India. We believe every cut is a conversation and every shave is a ritual.
            </p>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
              Our artisans use world-class scissors, high-precision clippers, and organic grooming oils to ensure that your style isn't just maintained—it's perfected.
            </p>
            <div className="grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
              <div>
                <div className="text-4xl font-serif font-bold text-amber-700">9+</div>
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Years Mastery</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-amber-700">15k+</div>
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Artisan Cuts</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-amber-700">12+</div>
                <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Master Awards</div>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="absolute -inset-4 bg-amber-50 rounded-3xl -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800" 
              alt="Artisan at work" 
              className="relative rounded-3xl shadow-2xl w-full h-[650px] object-cover contrast-125"
            />
          </div>
        </div>

        <section>
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif font-bold text-slate-900 mb-4">The Artisans</h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">Our master stylists combine decades of experience with a passion for precision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {stylists.map(st => (
              <div key={st.id} className="text-center group">
                <div className="relative mb-8 inline-block">
                  <div className="absolute inset-0 bg-amber-600 rounded-[2.5rem] scale-95 opacity-0 group-hover:opacity-10 transition duration-500"></div>
                  <img src={st.image} alt={st.name} className="w-72 h-72 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white mx-auto transition duration-500 group-hover:scale-105 group-hover:-rotate-2 grayscale hover:grayscale-0" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">{st.name}</h3>
                <p className="text-amber-700 font-black uppercase text-[10px] tracking-widest mb-4">{st.specialization}</p>
                <div className="flex justify-center space-x-4">
                   <div className="w-8 h-[1px] bg-slate-200 mt-2"></div>
                   <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Available {st.availability.start} - {st.availability.end}</div>
                   <div className="w-8 h-[1px] bg-slate-200 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
