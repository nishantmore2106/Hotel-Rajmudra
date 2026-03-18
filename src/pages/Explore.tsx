import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Clock, Phone, Mail, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useLanguage, FadeText } from '../LanguageContext';

import exploreHero from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.32 PM.jpeg';
import exploreExperience from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.32 PM (1).jpeg';
import dish1 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.32 PM (2).jpeg';
import dish2 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.33 PM.jpeg';
import dish3 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.35 PM.jpeg';
import dish4 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.37 PM (1).jpeg';
import dish5 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.37 PM.jpeg';
import dish6 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.38 PM.jpeg';
import ambience1 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.39 PM (1).jpeg';
import ambience2 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.39 PM (2).jpeg';
import ambience3 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.39 PM.jpeg';
import ambience4 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.41 PM.jpeg';
import ambience5 from '../../assets/explore/WhatsApp Image 2026-03-18 at 5.35.42 PM.jpeg';

const SIGNATURE_DISHES = [
  { name: { en: 'Misal Pav', mr: 'मिसळ पाव' }, image: dish1 },
  { name: { en: 'Kolhapuri Chicken', mr: 'कोल्हापुरी चिकन' }, image: dish2 },
  { name: { en: 'Dilkhush Kabab', mr: 'दिलखुश कबाब' }, image: dish3 },
  { name: { en: 'Maharashtrian Thali', mr: 'महाराष्ट्रीयन थाळी' }, image: dish4 },
  { name: { en: 'Butter Chicken', mr: 'बटर चिकन' }, image: dish5 },
  { name: { en: 'Tandoori Chicken', mr: 'तंदुरी चिकन' }, image: dish6 },
];

const AMBIENCE_IMAGES = [
  { url: ambience1, title: 'Exterior Building' },
  { url: ambience2, title: 'Dining Area' },
  { url: ambience3, title: 'Food Plates' },
  { url: ambience4, title: 'Night Lighting' },
  { url: ambience5, title: 'Seating Area' },
];

export default function Explore() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('hotel_name')} | ${t('nav_explore')}`;
  }, [t]);

  return (
    <div className="bg-[#0B0B0F] text-[#F5F1E8] font-sans selection:bg-brand-accent selection:text-brand-bg overflow-x-hidden">
      <Header />

      {/* SECTION 1 — EXPLORE HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={exploreHero}
            alt="Hotel Rajmudra Exterior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0B0B0F]" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-6"
          >
            <FadeText>{t('explore_hero_title')}</FadeText><br />
            <span className="text-brand-accent"><FadeText>{t('explore_hero_highlight')}</FadeText></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-[#F5F1E8]/80 font-medium tracking-wide mb-10 max-w-2xl mx-auto"
          >
            <FadeText>{t('explore_hero_sub')}</FadeText>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={() => window.open('/menu', '_blank')}
              className="group relative px-10 py-4 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent w-full sm:w-auto"
            >
              <span className="relative z-10 group-hover:text-[#0B0B0F] transition-colors duration-500"><FadeText>{t('view_menu')}</FadeText></span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <button
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
              className="group relative px-10 py-4 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent w-full sm:w-auto"
            >
              <span className="relative z-10 group-hover:text-[#0B0B0F] transition-colors duration-500"><FadeText>{t('get_directions')}</FadeText></span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-brand-accent"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* SECTION 2 — HOTEL EXPERIENCE */}
      <section className="py-20 md:py-32 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img
                src={exploreExperience}
                alt="Dining Space"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-accent/10 blur-[60px] rounded-full" />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block"><FadeText>{t('ambience_kicker')}</FadeText></span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1] md:leading-[0.9] mb-8">
              <FadeText>{t('ambience_title')}</FadeText>
            </h2>
            <p className="text-[#F5F1E8]/60 text-lg leading-relaxed mb-10">
              <FadeText>{t('ambience_desc')}</FadeText>
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-brand-accent text-3xl font-black mb-1">15+</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-[#F5F1E8]/40"><FadeText>{t('years_legacy')}</FadeText></p>
              </div>
              <div>
                <h4 className="text-brand-accent text-3xl font-black mb-1">50k+</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-[#F5F1E8]/40"><FadeText>{t('happy_guests')}</FadeText></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — SIGNATURE DISHES SHOWCASE */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block"><FadeText>{t('ambience_kicker')}</FadeText></span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter"><FadeText>{t('comfort ambience')}</FadeText></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SIGNATURE_DISHES.map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
              >
                <img
                  src={dish.image}
                  alt={dish.name.en}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — RESTAURANT AMBIENCE GALLERY */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block"><FadeText>{t('gallery_kicker')}</FadeText></span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter"><FadeText>{t('gallery_title')}</FadeText></h2>
            </div>
            <p className="text-[#F5F1E8]/40 text-sm font-bold uppercase tracking-widest mb-2">
              <FadeText>{t('scroll_explore')}</FadeText>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="col-span-2 row-span-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-full rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[0].url} alt={AMBIENCE_IMAGES[0].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
            </div>
            <div className="col-span-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[1].url} alt={AMBIENCE_IMAGES[1].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
            </div>
            <div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[2].url} alt={AMBIENCE_IMAGES[2].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
            </div>
            <div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[3].url} alt={AMBIENCE_IMAGES[3].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
            </div>
            <div className="col-span-2 md:col-span-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[4].url} alt={AMBIENCE_IMAGES[4].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY PEOPLE LOVE RAJMUDRA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter"><FadeText>{t('why_love_title')}</FadeText></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: { en: 'Authentic Maharashtrian Food', mr: 'अस्सल महाराष्ट्रीयन जेवण' }, text: { en: 'Traditional recipes and authentic spices used in every dish.', mr: 'प्रत्येक डिशमध्ये वापरल्या जाणाऱ्या पारंपारिक पाककृती आणि अस्सल मसाले.' } },
              { title: { en: 'Clean & Hygienic', mr: 'स्वच्छ आणि आरोग्यदायी' }, text: { en: 'Maintained cleanliness and comfortable dining for your peace of mind.', mr: 'तुमच्या मनःशांतीसाठी स्वच्छता आणि आरामदायी जेवणाची व्यवस्था.' } },
              { title: { en: 'Perfect Highway Stop', mr: 'परफेक्ट हायवे स्टॉप' }, text: { en: 'Ideal place for travelers between Mumbai and Goa to rest and refuel.', mr: 'मुंबई आणि गोवा दरम्यानच्या प्रवाशांसाठी विश्रांती आणि ताजेतवाने होण्यासाठी आदर्श ठिकाण.' } }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="p-12 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-brand-accent/30 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-8 group-hover:bg-brand-accent transition-colors">
                  <CheckCircle2 className="w-8 h-8 text-brand-accent group-hover:text-brand-bg transition-colors" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4"><FadeText>{feature.title[language]}</FadeText></h3>
                <p className="text-[#F5F1E8]/60 leading-relaxed"><FadeText>{feature.text[language]}</FadeText></p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — VISIT US */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block"><FadeText>{t('location_kicker')}</FadeText></span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-12"><FadeText>{t('location_title')}</FadeText></h2>

              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2"><FadeText>{t('address')}</FadeText></h4>
                    <p className="text-[#F5F1E8]/60 leading-relaxed">
                      <FadeText>{t('address_text').split(',')[0]}</FadeText><br />
                      <FadeText>{t('address_text').split(',').slice(1).join(',')}</FadeText>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2"><FadeText>{t('hours')}</FadeText></h4>
                    <p className="text-[#F5F1E8]/60 leading-relaxed">
                      <FadeText>{t('opening_hours')}</FadeText><br />
                      <FadeText>{t('open_all_days')}</FadeText>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2"><FadeText>{t('contact')}</FadeText></h4>
                    <p className="text-[#F5F1E8]/60 leading-relaxed">
                      <a href={`tel:${t('footer_phone').replace(/\s/g, '')}`} className="hover:text-brand-accent transition-colors">
                        <FadeText>{t('footer_phone')}</FadeText>
                      </a><br />
                      <a href={`mailto:${t('footer_email')}`} className="hover:text-brand-accent transition-colors">
                        <FadeText>{t('footer_email')}</FadeText>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.88123456789!2d73.468123456789!3d17.98123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDU4JzUyLjQiTiA3M8KwMjgnMDUuMiJF!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CALL TO ACTION */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent opacity-[0.02]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
            <FadeText>{t('stop_by')}</FadeText><br />
            <span className="text-brand-accent"><FadeText>{t('explore_hero_highlight')}</FadeText></span>
          </h2>
          <button
            onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
            className="group relative px-16 py-6 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent"
          >
            <span className="relative z-10 group-hover:text-[#0B0B0F] transition-colors duration-500"><FadeText>{t('get_directions')}</FadeText></span>
            <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
