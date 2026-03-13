import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Clock, Phone, Mail, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const SIGNATURE_DISHES = [
  { name: 'Misal Pav', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&q=80&w=800' },
  { name: 'Kolhapuri Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  { name: 'Dilkhush Kabab', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
  { name: 'Maharashtrian Thali', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Butter Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  { name: 'Tandoori Chicken', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
];

const AMBIENCE_IMAGES = [
  { url: 'https://storage.googleapis.com/m-infra.appspot.com/v0/b/m-infra.appspot.com/o/ptqlcho4njueflmp5mpf-2026-03-12T17%3A36%3A20.370Z-0.png?alt=media&token=788863f9-712b-4786-981c-6d97c3856111', title: 'Exterior Building' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', title: 'Dining Area' },
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', title: 'Food Plates' },
  { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', title: 'Night Lighting' },
  { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800', title: 'Seating Area' },
];

export default function Explore() {
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
            src="https://storage.googleapis.com/m-infra.appspot.com/v0/b/m-infra.appspot.com/o/ptqlcho4njueflmp5mpf-2026-03-12T17%3A36%3A20.370Z-0.png?alt=media&token=788863f9-712b-4786-981c-6d97c3856111" 
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
            className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] mb-6"
          >
            Explore<br />
            <span className="text-brand-accent">Hotel Rajmudra</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-[#F5F1E8]/80 font-medium tracking-wide mb-10 max-w-2xl mx-auto"
          >
            Experience authentic Maharashtrian hospitality on the Mumbai–Goa Highway.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => window.open('/menu', '_blank')}
              className="w-full sm:w-auto px-10 py-4 bg-brand-accent text-brand-bg font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
            >
              View Menu
            </button>
            <button 
              onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
              className="w-full sm:w-auto px-10 py-4 border border-white/20 text-[#F5F1E8] font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-colors"
            >
              Get Directions
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
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" 
                alt="Dining Space" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
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
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">The Ambience</span>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-[1] md:leading-[0.9] mb-8">
              A Comfortable Highway Dining Experience
            </h2>
            <p className="text-[#F5F1E8]/60 text-lg leading-relaxed mb-10">
              Hotel Rajmudra offers travelers a relaxing and hygienic dining environment with authentic Maharashtrian cuisine. Located conveniently on the Mumbai–Goa Highway in Poladpur, it has become a favorite stop for families, travelers, and food lovers.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-brand-accent text-3xl font-black mb-1">15+</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-[#F5F1E8]/40">Years Legacy</p>
              </div>
              <div>
                <h4 className="text-brand-accent text-3xl font-black mb-1">50k+</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-[#F5F1E8]/40">Happy Guests</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — SIGNATURE DISHES SHOWCASE */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">Our Specialties</span>
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">Signature Dishes</h2>
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
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-brand-accent">
                    {dish.name}
                  </h3>
                </div>
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
              <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">Gallery</span>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">Restaurant Ambience</h2>
            </div>
            <p className="text-[#F5F1E8]/40 text-sm font-bold uppercase tracking-widest mb-2">
              Scroll to explore our space
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="col-span-2 row-span-2">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="h-full rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[0].url} alt={AMBIENCE_IMAGES[0].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
            <div className="col-span-2">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[1].url} alt={AMBIENCE_IMAGES[1].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
            <div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[2].url} alt={AMBIENCE_IMAGES[2].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
            <div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[3].url} alt={AMBIENCE_IMAGES[3].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
            <div className="col-span-2 md:col-span-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              >
                <img src={AMBIENCE_IMAGES[4].url} alt={AMBIENCE_IMAGES[4].title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — WHY PEOPLE LOVE RAJMUDRA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">Why People Love Rajmudra</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Authentic Maharashtrian Food', text: 'Traditional recipes and authentic spices used in every dish.' },
              { title: 'Clean & Hygienic', text: 'Maintained cleanliness and comfortable dining for your peace of mind.' },
              { title: 'Perfect Highway Stop', text: 'Ideal place for travelers between Mumbai and Goa to rest and refuel.' }
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
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{feature.title}</h3>
                <p className="text-[#F5F1E8]/60 leading-relaxed">{feature.text}</p>
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
              <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">Location</span>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter mb-12">Visit Us</h2>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Address</h4>
                    <p className="text-[#F5F1E8]/60 leading-relaxed">
                      Mumbai - Goa Hwy<br />
                      Poladpur, Maharashtra 402303
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Hours</h4>
                    <p className="text-[#F5F1E8]/60 leading-relaxed">
                      7:00 AM — 11:30 PM<br />
                      Open All Days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Contact</h4>
                    <p className="text-[#F5F1E8]/60 leading-relaxed">
                      +91 XXXXX XXXXX<br />
                      info@hotelrajmudra.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
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
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.9] mb-12">
            Stop by and Experience<br />
            <span className="text-brand-accent">Hotel Rajmudra</span>
          </h2>
          <button 
            onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
            className="px-16 py-6 bg-brand-accent text-brand-bg font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(244,163,0,0.2)]"
          >
            Get Directions
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
