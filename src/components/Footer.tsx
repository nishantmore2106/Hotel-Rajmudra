import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Map, ArrowUp } from 'lucide-react';
import { useLanguage, FadeText } from '../LanguageContext';
import { IMAGES } from '../../images';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative pt-20 md:pt-32 pb-10 md:pb-16 bg-brand-bg overflow-hidden border-t border-brand-accent/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-brand-text">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-24">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="mb-8 group">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={IMAGES.hero.logo} 
                  alt="Hotel Rajmudra Logo" 
                  className="w-12 h-12 object-contain brightness-0 invert"
                />
                <div>
                  <h3 className="text-brand-text text-2xl font-black tracking-widest leading-none">
                    <FadeText>{t('hotel_name')}</FadeText>
                  </h3>
                  <span className="text-brand-accent text-[10px] font-bold uppercase tracking-[0.4em]"><FadeText>{t('hotel_name_mr')}</FadeText></span>
                </div>
              </div>
            </div>
            <p className="text-brand-text/60 text-sm leading-relaxed mb-8 max-w-xs">
              <FadeText>{t('footer_desc')}</FadeText>
            </p>
            <div className="flex items-center gap-3 bg-brand-text/5 px-4 py-2 rounded-full border border-brand-text/10">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-bg bg-brand-accent/20 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-brand-accent">★</span>
                  </div>
                ))}
              </div>
              <span className="text-brand-text text-xs font-bold uppercase tracking-widest"><FadeText>4.2 {t('rating_text')}</FadeText></span>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h4 className="text-brand-text font-bold uppercase tracking-widest mb-8 text-sm border-b border-brand-accent pb-2">
              <FadeText>{t('quick_links')}</FadeText>
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                t('nav_home'), 
                t('nav_menu'), 
                t('founders_highlight'), 
                t('reviews_title'), 
                t('location_kicker')
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-brand-text/60 hover:text-brand-accent transition-colors text-sm font-medium relative group"
                  >
                    <FadeText>{link}</FadeText>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h4 className="text-brand-text font-bold uppercase tracking-widest mb-8 text-sm border-b border-brand-accent pb-2"><FadeText>{t('contact')}</FadeText></h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <span className="text-brand-text/60 text-sm leading-relaxed text-left">
                  <FadeText>{t('address_text').split(',')[0].trim()}</FadeText>,<br />
                  <FadeText>{t('address_text').split(',').slice(1).join(',').trim()}</FadeText>
                </span>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <a href={`tel:${t('footer_phone').replace(/\s/g, '')}`} className="text-brand-text/60 hover:text-brand-accent transition-colors text-sm font-medium">
                  <FadeText>{t('footer_phone')}</FadeText>
                </a>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <a href={`mailto:${t('footer_email')}`} className="text-brand-text/60 hover:text-brand-accent transition-colors text-sm font-medium">
                  <FadeText>{t('footer_email')}</FadeText>
                </a>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Instagram className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <a href={`https://instagram.com/${t('instagram_handle')}`} target="_blank" rel="noopener noreferrer" className="text-brand-text/60 hover:text-brand-accent transition-colors text-sm font-medium">
                   @<FadeText>{t('instagram_handle')}</FadeText>
                </a>
              </li>
            </ul>
            <button 
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
              className="mt-8 group relative px-8 py-3 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-xs rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"><FadeText>{t('get_directions')}</FadeText> <span className="text-lg">→</span></span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>

          {/* Column 4: Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h4 className="text-brand-text font-bold uppercase tracking-widest mb-8 text-sm border-b border-brand-accent pb-2"><FadeText>{t('opening_hours')}</FadeText></h4>
            <div className="mb-6">
              <p className="text-brand-text font-bold text-sm mb-1 uppercase tracking-wider"><FadeText>{t('days')}</FadeText></p>
              <p className="text-brand-accent text-2xl font-black"><FadeText>{t('hours')}</FadeText></p>
            </div>
            <div className="bg-brand-accent/10 border border-brand-accent/20 p-4 rounded-xl">
              <p className="text-brand-accent text-xs font-bold uppercase tracking-widest leading-relaxed">
                <FadeText>{t('open_daily')}</FadeText>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center gap-6 mb-8 md:mb-12"
        >
          {[
            { icon: Instagram, label: 'Instagram', href: `https://instagram.com/${t('instagram_handle')}` },
            { icon: Map, label: 'Google Maps', href: 'https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur' }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(241, 90, 36, 0.1)", boxShadow: "0 0 20px rgba(241, 90, 36, 0.2)" }}
              className="w-12 h-12 rounded-full border border-brand-text/10 flex items-center justify-center text-brand-text/60 hover:text-brand-accent transition-all"
              title={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(241, 90, 36, 0.1)", boxShadow: "0 0 20px rgba(241, 90, 36, 0.2)" }}
            className="w-12 h-12 rounded-full border border-brand-text/10 flex items-center justify-center text-brand-text/60 hover:text-brand-accent transition-all"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-8 md:pt-10 border-t border-brand-text/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
        >
          <p className="text-brand-text/30 text-[10px] uppercase tracking-[0.2em] font-bold">
            <FadeText>{t('rights_reserved')}</FadeText>
          </p>
          <p className="text-brand-text/30 text-[10px] uppercase tracking-[0.2em] font-bold italic">
            <FadeText>{t('designed_for')}</FadeText>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
