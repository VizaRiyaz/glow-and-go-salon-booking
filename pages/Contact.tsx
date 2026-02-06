
import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-6xl font-serif font-bold text-slate-900 mb-6">Contact Concierge</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Whether you have a specific styling query or want to provide feedback on your session, we are here to ensure your experience is flawless.
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mt-10"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-100">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 text-3xl shadow-xl shadow-green-100">✓</div>
                <h3 className="text-3xl font-serif font-bold text-slate-900">Message Received</h3>
                <p className="text-slate-500 mt-4 text-lg font-medium">Our concierge will review your message and reach out shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-10 text-amber-600 font-black uppercase text-xs tracking-widest hover:text-amber-700 transition">Send Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition" placeholder="Ex: Vikram Singh" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Email Address</label>
                  <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition" placeholder="v.singh@example.in" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Message</label>
                  <textarea rows={5} required className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition" placeholder="How can our artisans help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-amber-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-amber-700 transition shadow-xl shadow-amber-900/20">
                  Deliver Message
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-16">
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex-shrink-0 flex items-center justify-center text-2xl shadow-xl shadow-amber-100/50">📍</div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2">The Heritage Salon</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">Park Street, Heritage Block, <br/>South Mumbai, MH 400001</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex-shrink-0 flex items-center justify-center text-2xl shadow-xl shadow-amber-100/50">📞</div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2">Direct Line</h4>
                  <p className="text-slate-500 leading-relaxed font-bold text-xl">+91 7738839027</p>
                  <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-black">Call for express booking</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex-shrink-0 flex items-center justify-center text-2xl shadow-xl shadow-amber-100/50">✉️</div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2">Official Email</h4>
                  <p className="text-slate-500 leading-relaxed font-bold text-xl">Topbinstales@gmail.com</p>
                  <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-black">For corporate & events</p>
                </div>
              </div>
            </div>

            <div className="mt-16 rounded-[3rem] overflow-hidden shadow-2xl h-80 bg-slate-200 relative group border-8 border-slate-50">
               <iframe 
                title="Salon Location"
                width="100%" height="100%" 
                frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Park%20Street,%20Mumbai,%20India+(Glow%20&amp;%20Go%20Salon)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                className="opacity-70 contrast-75 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition duration-1000"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
