
import React from 'react';
import { Link } from 'react-router-dom';
import { REVIEWS, INITIAL_SERVICES } from '../constants';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-slate-950 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1599351431247-f13b3dc7c331?auto=format&fit=crop&q=80&w=2000" 
            alt="Master Barber" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full lg:w-3/5">
          <div className="inline-flex items-center space-x-3 mb-6 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Established 2015 • Mumbai</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-[1.1] tracking-tight">
            The <span className="text-amber-500 italic">Master</span> <br/>Barber’s Ritual
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed font-medium">
            Discover a sanctuary where classic Indian heritage meets contemporary artisan grooming. Precision scissor cuts and legendary shaves designed for the discerning gentleman.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/booking" className="bg-amber-600 text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-700 transition shadow-2xl shadow-amber-900/40 text-center">
              Reserve Your Chair
            </Link>
            <Link to="/services" className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition text-center">
              Explore Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">Our Artisan Menu</h2>
              <p className="text-slate-500 font-medium text-lg">Every treatment is a dedicated session. We combine traditional techniques with modern styling to craft your signature look.</p>
            </div>
            <Link to="/services" className="text-xs font-black uppercase tracking-widest text-amber-600 border-b-2 border-amber-600 pb-2 hover:text-amber-700 hover:border-amber-700 transition">
              View Full Menu
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {INITIAL_SERVICES.slice(0, 3).map(service => (
              <div key={service.id} className="group relative">
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl transition duration-700 group-hover:shadow-amber-100">
                   <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition"></div>
                   <div className="absolute bottom-10 left-10 right-10">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-3 block">{service.category}</span>
                      <h3 className="text-2xl font-serif font-bold text-white mb-4">{service.name}</h3>
                      <div className="flex items-center justify-between text-white border-t border-white/20 pt-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
                         <span className="text-xl font-bold">₹{service.price}</span>
                         <Link to="/booking" className="bg-amber-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition">Book Now</Link>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-950 py-32 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-serif font-bold text-white mb-4">Groomed To Perfection</h2>
            <p className="text-slate-400 font-medium tracking-widest uppercase text-[10px]">Client Experiences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {REVIEWS.map(review => (
              <div key={review.id} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-sm">
                <div className="flex items-center mb-10">
                  <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-2xl mr-5 border-2 border-amber-500 grayscale" />
                  <div>
                    <h4 className="text-white font-bold text-lg">{review.name}</h4>
                    <div className="flex text-amber-500 text-xs mt-1">
                      {"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 italic text-lg leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
