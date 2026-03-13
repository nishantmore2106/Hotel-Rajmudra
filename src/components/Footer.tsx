import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook, Map } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative pt-20 md:pt-32 pb-10 md:pb-16 bg-[#0B0B0F] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 md:mb-24">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="mb-8">
              <h3 className="text-[#F5F1E8] text-2xl font-display font-black tracking-widest mb-1">
                HOTEL RAJMUDRA
              </h3>
              <span className="text-[#F4A300] text-[10px] font-bold uppercase tracking-[0.4em]">होटल राजमुद्रा</span>
            </div>
            <p className="text-[#F5F1E8]/60 text-sm leading-relaxed mb-8 max-w-xs">
              Serving authentic Maharashtrian flavors since 2010. A legacy of taste and hospitality on the Mumbai-Goa Highway.
            </p>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0B0B0F] bg-brand-accent/20 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-[#F4A300]">★</span>
                  </div>
                ))}
              </div>
              <span className="text-[#F5F1E8] text-xs font-bold uppercase tracking-widest">4.2 Google Rating</span>
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
            <h4 className="text-[#F5F1E8] font-bold uppercase tracking-widest mb-8 text-sm border-b border-[#F4A300] pb-2">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'Menu', 'About Us', 'Founders', 'Customer Reviews', 'Location'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-[#F5F1E8]/60 hover:text-[#F4A300] transition-colors text-sm font-medium relative group"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F4A300] transition-all duration-300 group-hover:w-full" />
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
            <h4 className="text-[#F5F1E8] font-bold uppercase tracking-widest mb-8 text-sm border-b border-[#F4A300] pb-2">Contact</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-[#F4A300] flex-shrink-0" />
                <span className="text-[#F5F1E8]/60 text-sm leading-relaxed">
                  Mumbai - Goa Hwy<br />
                  Poladpur, Maharashtra 402303
                </span>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-[#F4A300] flex-shrink-0" />
                <span className="text-[#F5F1E8]/60 text-sm font-medium">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-[#F4A300] flex-shrink-0" />
                <a href="mailto:info@hotelrajmudra.com" className="text-[#F5F1E8]/60 hover:text-[#F4A300] transition-colors text-sm font-medium">
                  info@hotelrajmudra.com
                </a>
              </li>
            </ul>
            <button 
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
              className="mt-8 text-[#F4A300] text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              Get Directions <span className="text-lg">→</span>
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
            <h4 className="text-[#F5F1E8] font-bold uppercase tracking-widest mb-8 text-sm border-b border-[#F4A300] pb-2">Opening Hours</h4>
            <div className="mb-6">
              <p className="text-[#F5F1E8] font-bold text-sm mb-1 uppercase tracking-wider">Monday — Sunday</p>
              <p className="text-[#F4A300] text-2xl font-black">7:00 AM — 11:30 PM</p>
            </div>
            <div className="bg-[#F4A300]/10 border border-[#F4A300]/20 p-4 rounded-xl">
              <p className="text-[#F4A300] text-xs font-bold uppercase tracking-widest leading-relaxed">
                Open Daily for Breakfast, Lunch & Dinner
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
            { icon: Instagram, label: 'Instagram' },
            { icon: Facebook, label: 'Facebook' },
            { icon: Map, label: 'Google Maps' }
          ].map((social, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(244, 163, 0, 0.1)", boxShadow: "0 0 20px rgba(244, 163, 0, 0.2)" }}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#F5F1E8]/60 hover:text-[#F4A300] transition-all"
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
        >
          <p className="text-[#F5F1E8]/30 text-[10px] uppercase tracking-[0.2em] font-bold">
            © 2025 Hotel Rajmudra. All Rights Reserved.
          </p>
          <p className="text-[#F5F1E8]/30 text-[10px] uppercase tracking-[0.2em] font-bold italic">
            Designed for the authentic taste of Maharashtra.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
