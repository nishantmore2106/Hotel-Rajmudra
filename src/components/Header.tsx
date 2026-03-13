import React, { useState } from 'react';
import { motion, AnimatePresence } from 'rom 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MENU', path: '/menu' },
    { name: 'EXPLORE', path: '/explore' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-black/20 backdrop-blur-md"
      >
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-[#F4A300]' : 'text-[#F5F1E8]/60 hover:text-[#F4A300]'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 text-[#F5F1E8]">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center cursor-pointer" onClick={() => window.location.href = '/'}>
          <h1 className="text-xl md:text-2xl font-display font-black tracking-widest text-[#F5F1E8]">
            HOTEL RAJMUDRA
          </h1>
          <span className="text-xs md:text-sm font-medium text-[#F4A300] tracking-widest">
            होटल राजमुद्रा
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="p-2 hover:text-[#F4A300] text-[#F5F1E8] transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="p-2 hover:text-[#F4A300] text-[#F5F1E8] transition-colors"><Facebook className="w-5 h-5" /></a>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#0B0B0F]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 left-6 p-2 text-[#F5F1E8] hover:text-[#F4A300] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-display font-black uppercase tracking-widest ${location.pathname === link.path ? 'text-[#F4A300]' : 'text-[#F5F1E8] hover:text-[#F4A300]'} transition-colors`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};