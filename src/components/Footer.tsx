import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Map, ArrowUp } from 'lucide-react';
import { useLanguage, FadeText } from '../LanguageContext';
import { IMAGES } from '../../images';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-deep-forest overflow-hidden border-t border-gold-accent/10">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={IMAGES.hero.logo} 
                  alt="Hotel Rajmudra Logo" 
                  className="w-12 h-12 object-contain opacity-80"
                />
                <div>
                  <h3 className="font-display text-cream text-2xl italic leading-none">
                    <FadeText>{t('hotel_name')}</FadeText>
                  </h3>
                  <span className="text-gold-accent text-[10px] font-sans font-medium uppercase tracking-[0.3em]"><FadeText>{t('hotel_name_mr')}</FadeText></span>
                </div>
              </div>
            </div>
            <p className="text-cream/50 text-sm font-sans font-light leading-relaxed mb-8 max-w-xs">
              <FadeText>{t('footer_desc')}</FadeText>
            </p>
            <div className="flex items-center gap-3 bg-gold-accent/5 px-4 py-2 rounded-full border border-gold-accent/10">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-deep-forest bg-gold-accent/15 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-gold-accent">★</span>
                  </div>
                ))}
              </div>
              <span className="text-cream text-xs font-sans font-medium uppercase tracking-widest"><FadeText>4.2 {t('rating_text')}</FadeText></span>
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
            <h4 className="text-cream font-sans font-medium uppercase tracking-[0.2em] mb-8 text-sm">
              <FadeText>{t('quick_links')}</FadeText>
              <div className="w-8 h-[1px] bg-gold-accent/40 mt-3 mx-auto md:mx-0" />
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
                    className="text-cream/50 hover:text-gold-accent transition-colors text-sm font-sans font-light relative group"
                  >
                    <FadeText>{link}</FadeText>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-accent transition-all duration-300 group-hover:w-full" />
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
            <h4 className="text-cream font-sans font-medium uppercase tracking-[0.2em] mb-8 text-sm">
              <FadeText>{t('contact')}</FadeText>
              <div className="w-8 h-[1px] bg-gold-accent/40 mt-3 mx-auto md:mx-0" />
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-gold-accent flex-shrink-0 mt-1" />
                <span className="text-cream/50 text-sm font-sans font-light leading-relaxed text-left">
                  <FadeText>{t('address_text').split(',')[0].trim()}</FadeText>,<br />
                  <FadeText>{t('address_text').split(',').slice(1).join(',').trim()}</FadeText>
                </span>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-gold-accent flex-shrink-0" />
                <a href={`tel:${t('footer_phone').replace(/\s/g, '')}`} className="text-cream/50 hover:text-gold-accent transition-colors text-sm font-sans font-light">
                  <FadeText>{t('footer_phone')}</FadeText>
                </a>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-gold-accent flex-shrink-0" />
                <a href={`mailto:${t('footer_email')}`} className="text-cream/50 hover:text-gold-accent transition-colors text-sm font-sans font-light">
                  <FadeText>{t('footer_email')}</FadeText>
                </a>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Instagram className="w-4 h-4 text-gold-accent flex-shrink-0" />
                <a href={`https://instagram.com/${t('instagram_handle')}`} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold-accent transition-colors text-sm font-sans font-light">
                   @<FadeText>{t('instagram_handle')}</FadeText>
                </a>
              </li>
            </ul>
            <button 
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
              className="mt-8 px-8 py-3 border border-gold-accent/40 text-gold-accent font-sans text-[11px] font-medium uppercase tracking-[0.2em] rounded-full hover:bg-gold-accent hover:text-deep-forest transition-all duration-500"
            >
              <FadeText>{t('get_directions')}</FadeText> →
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
            <h4 className="text-cream font-sans font-medium uppercase tracking-[0.2em] mb-8 text-sm">
              <FadeText>{t('opening_hours')}</FadeText>
              <div className="w-8 h-[1px] bg-gold-accent/40 mt-3 mx-auto md:mx-0" />
            </h4>
            <div className="mb-6">
              <p className="text-cream font-sans font-medium text-sm mb-1 uppercase tracking-wider"><FadeText>{t('days')}</FadeText></p>
              <p className="text-gold-accent text-2xl font-display italic"><FadeText>{t('open_daily')}</FadeText></p>
            </div>
            <div className="bg-gold-accent/5 border border-gold-accent/15 p-5 rounded-xl space-y-3">
              {(['hours_breakfast', 'hours_lunch', 'hours_snacks', 'hours_dinner'] as const).map((key, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? 'bg-amber-400' : i === 1 ? 'bg-orange-400' : i === 2 ? 'bg-amber-400' : 'bg-gold-accent'}`} />
                  <p className="text-cream/70 text-xs font-sans font-medium tracking-wide">
                    <FadeText>{t(key)}</FadeText>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center gap-6 mb-10"
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
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full border border-gold-accent/15 flex items-center justify-center text-cream/40 hover:text-gold-accent hover:border-gold-accent/40 transition-all duration-300"
              title={social.label}
            >
              <social.icon className="w-4 h-4" />
            </motion.a>
          ))}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full border border-gold-accent/15 flex items-center justify-center text-cream/40 hover:text-gold-accent hover:border-gold-accent/40 transition-all duration-300"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-8 border-t border-gold-accent/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <p className="text-cream/25 text-[10px] font-sans uppercase tracking-[0.2em]">
            <FadeText>{t('rights_reserved')}</FadeText>
          </p>
          <p className="text-cream/25 text-[10px] font-sans uppercase tracking-[0.2em] italic">
            <FadeText>{t('designed_for')}</FadeText>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
