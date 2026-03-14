import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, FadeText } from '../LanguageContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const navLinks = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_menu'), path: '/menu' },
    { name: t('nav_explore'), path: '/explore' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-4 md:top-6 left-1/2 w-[95%] max-w-6xl z-50 px-5 md:px-8 py-3 flex items-center justify-between bg-[#0B0B0F]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors ${location.pathname === link.path ? 'text-[#F4A300]' : 'text-[#F5F1E8]/60 hover:text-[#F4A300]'}`}
            >
              <FadeText>{link.name}</FadeText>
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 text-[#F5F1E8]">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-center cursor-pointer" onClick={() => window.location.href = '/'}>
          <h1 className="text-base md:text-2xl font-black tracking-widest text-[#F5F1E8]">
            <FadeText>{t('hotel_name')}</FadeText>
          </h1>
          <span className="text-[10px] md:text-sm font-medium text-[#F4A300] tracking-widest">
            <FadeText>{t('hotel_name_mr')}</FadeText>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/hotelrajmudra_" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 hover:text-[#F4A300] text-[#F5F1E8] transition-colors"
          ><Instagram className="w-5 h-5" /></a>
          <div className="flex bg-white/5 rounded-full p-0.5 md:p-1 border border-white/10 ml-1 md:ml-2">
            <button onClick={() => setLanguage('en')} className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold rounded-full transition-all duration-300 ${language === 'en' ? 'bg-[#F4A300] text-[#0B0B0F]' : 'text-[#F5F1E8]/60 hover:text-[#F5F1E8]'}`}>EN</button>
            <button onClick={() => setLanguage('mr')} className={`px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold rounded-full transition-all duration-300 ${language === 'mr' ? 'bg-[#F4A300] text-[#0B0B0F]' : 'text-[#F5F1E8]/60 hover:text-[#F5F1E8]'}`}>मराठी</button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-[#0B0B0F]/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-[#0B0B0F] border-l border-white/10 z-[70] p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-end mb-12">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 bg-white/5 rounded-full text-[#F5F1E8] hover:text-[#F4A300] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col items-start gap-8 flex-grow">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-2xl font-black uppercase tracking-widest ${location.pathname === link.path ? 'text-[#F4A300]' : 'text-[#F5F1E8] hover:text-[#F4A300]'} transition-colors`}
                  >
                    <FadeText>{link.name}</FadeText>
                  </Link>
                ))}
                <div className="w-full h-px bg-white/10 my-4" />
                <div className="flex bg-white/5 rounded-full p-1 border border-white/10 w-full relative">
                  <button onClick={() => { setLanguage('en'); setIsMenuOpen(false); }} className={`flex-1 py-3 text-sm font-bold rounded-full transition-all duration-300 ${language === 'en' ? 'bg-[#F4A300] text-[#0B0B0F]' : 'text-[#F5F1E8]/60 hover:text-[#F5F1E8]'}`}>EN</button>
                  <button onClick={() => { setLanguage('mr'); setIsMenuOpen(false); }} className={`flex-1 py-3 text-sm font-bold rounded-full transition-all duration-300 ${language === 'mr' ? 'bg-[#F4A300] text-[#0B0B0F]' : 'text-[#F5F1E8]/60 hover:text-[#F5F1E8]'}`}>मराठी</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};