
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { User, Service, Stylist, Appointment } from './types';
import { DB } from './db';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

// Context for state sharing
interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const Navbar = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold text-amber-700 tracking-tight">Glow & Go<span className="text-slate-400">.</span></Link>
          </div>
          <div className="hidden md:flex space-x-10 text-[11px] font-black uppercase tracking-[0.2em]">
            <Link to="/" className="text-slate-500 hover:text-amber-600 transition">Home</Link>
            <Link to="/services" className="text-slate-500 hover:text-amber-600 transition">Services</Link>
            <Link to="/booking" className="text-slate-500 hover:text-amber-600 transition">Book</Link>
            <Link to="/about" className="text-slate-500 hover:text-amber-600 transition">About</Link>
            <Link to="/contact" className="text-slate-500 hover:text-amber-600 transition">Contact</Link>
          </div>
          <div className="flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-amber-600">
                  {currentUser.role === 'admin' ? 'Dashboard' : 'Profile'}
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition shadow-lg shadow-slate-200">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-amber-600 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition shadow-lg shadow-amber-100">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold text-amber-500">Glow & Go<span className="text-white">.</span></h3>
        <p className="text-slate-400 text-sm leading-relaxed">Defining Indian grooming excellence through precision, artistry, and an unwavering commitment to luxury.</p>
      </div>
      <div>
        <h4 className="font-black uppercase tracking-widest text-[11px] text-amber-500 mb-6">Menu</h4>
        <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <li><Link to="/services" className="hover:text-white transition">Artisan Cuts</Link></li>
          <li><Link to="/booking" className="hover:text-white transition">Online Booking</Link></li>
          <li><Link to="/about" className="hover:text-white transition">Our Legacy</Link></li>
          <li><Link to="/contact" className="hover:text-white transition">Get In Touch</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-black uppercase tracking-widest text-[11px] text-amber-500 mb-6">Hours</h4>
        <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <li>Mon - Fri: 09:00 - 20:00</li>
          <li>Sat: 10:00 - 18:00</li>
          <li>Sun: Private Sessions Only</li>
        </ul>
      </div>
      <div>
        <h4 className="font-black uppercase tracking-widest text-[11px] text-amber-500 mb-6">Connect</h4>
        <p className="text-slate-400 text-sm mb-4">+91 7738839027</p>
        <p className="text-slate-400 text-sm mb-6">Topbinstales@gmail.com</p>
        <div className="flex space-x-4">
           {/* Social Icons Placeholder */}
           <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:border-amber-500 transition cursor-pointer">IG</div>
           <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:border-amber-500 transition cursor-pointer">FB</div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
      <div>&copy; {new Date().getFullYear()} Glow & Go Salon. Crafted for the Modern Indian Gentleman.</div>
      <div className="mt-4 md:mt-0 flex space-x-8">
        <a href="#" className="hover:text-amber-500">Privacy</a>
        <a href="#" className="hover:text-amber-500">Terms</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(DB.session.get());

  const logout = () => {
    DB.session.clear();
    setCurrentUser(null);
  };

  const login = (user: User) => {
    DB.session.set(user);
    setCurrentUser(user);
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser: login, logout }}>
      <Router>
        <div className="min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/admin" element={currentUser?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}
