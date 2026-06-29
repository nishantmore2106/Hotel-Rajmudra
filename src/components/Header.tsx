import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, FadeText } from '../LanguageContext';
import { IMAGES } from '../../images';

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between">
          {/* Logo — Script Style like Wilma */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group shrink-0">
            <img src={IMAGES.hero.logo} alt="Hotel Rajmudra Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="font-display text-[26px] md:text-[32px] text-cream font-light italic tracking-wide leading-none">
              Hotel Rajmudra
            </span>
          </Link>

          {/* Center Nav Links — Matching Wilma's horizontal nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[13px] font-sans font-medium uppercase tracking-[0.12em] transition-all duration-300 relative group ${location.pathname === link.path ? 'text-gold-accent' : 'text-cream/70 hover:text-cream'}`}
              >
                <FadeText>{link.name}</FadeText>
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-gold-accent transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* Right Side — Social Icons + Lang Toggle */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            <a href="https://instagram.com/hotelrajmudra_" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
              <Instagram className="w-[15px] h-[15px]" />
            </a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
              <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </a>
            <div className="w-[1px] h-4 bg-cream/15 mx-1" />
            <div className="flex gap-0.5">
              <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.08em] transition-all duration-300 ${language === 'en' ? 'text-gold-accent' : 'text-cream/40 hover:text-cream/70'}`}>EN</button>
              <span className="text-cream/20 text-[11px] self-center">|</span>
              <button onClick={() => setLanguage('mr')} className={`px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.08em] transition-all duration-300 ${language === 'mr' ? 'text-gold-accent' : 'text-cream/40 hover:text-cream/70'}`}>मराठी</button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-cream hover:text-gold-accent transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-deep-forest/90 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-deep-forest border-l border-gold-accent/10 z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-end mb-12">
                <button onClick={() => setIsMenuOpen(false)} className="p-3 text-cream/60 hover:text-gold-accent transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col items-start gap-8 flex-grow">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className={`font-display text-3xl italic tracking-wide ${location.pathname === link.path ? 'text-gold-accent' : 'text-cream/70 hover:text-cream'} transition-colors`}>
                    <FadeText>{link.name}</FadeText>
                  </Link>
                ))}
                <div className="w-16 h-[1px] bg-gold-accent/20 my-4" />
                <div className="flex gap-4 w-full">
                  <button onClick={() => { setLanguage('en'); setIsMenuOpen(false); }} className={`flex-1 py-3 text-[13px] font-sans font-medium uppercase tracking-[0.1em] border border-gold-accent/20 transition-all duration-300 ${language === 'en' ? 'bg-gold-accent text-deep-forest border-gold-accent' : 'text-cream/60 hover:text-cream'}`}>EN</button>
                  <button onClick={() => { setLanguage('mr'); setIsMenuOpen(false); }} className={`flex-1 py-3 text-[13px] font-sans font-medium uppercase tracking-[0.1em] border border-gold-accent/20 transition-all duration-300 ${language === 'mr' ? 'bg-gold-accent text-deep-forest border-gold-accent' : 'text-cream/60 hover:text-cream'}`}>मराठी</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};