import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Twitter, Utensils, Star, MapPin, Clock, Info, Phone, Mail, Map } from 'lucide-react';
import { Footer } from '../components/Footer';
import { IMAGES } from '../../images';
import { Header } from '../components/Header';

const MENU_CATEGORIES = [
  { id: 'thali', label: 'THALI', icon: '🍱' },
  { id: 'pizza', label: 'PIZZA', icon: '🍕' },
  { id: 'hotdog', label: 'HOTDOG', icon: '🌭' },
  { id: 'dessert', label: 'DESSERT', icon: '🍩' },
  { id: 'drinks', label: 'DRINKS', icon: '🥤' },
];

const MENU_ITEMS: Record<string, { title: string, image: string }[]> = {
  thali: [
    { title: 'Maharashtrian Thali', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Special Veg Thali', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800' },
    { title: 'Chicken Thali', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  ],
  pizza: [
    { title: 'Margherita Pizza', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800' },
    { title: 'Cheese Slice Pull', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800' },
    { title: 'Wood Fired Pizza', image: 'https://images.unsplash.com/photo-1574129810591-df0917022b7a?auto=format&fit=crop&q=80&w=800' },
  ],
  hotdog: [
    { title: 'Loaded Hotdog', image: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&q=80&w=800' },
    { title: 'Street Style Hotdog', image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&q=80&w=800' },
    { title: 'Hotdog with Sauces', image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800' },
  ],
  dessert: [
    { title: 'Chocolate Dessert', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800' },
    { title: 'Ice Cream', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dabb892?auto=format&fit=crop&q=80&w=800' },
    { title: 'Donut Platter', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800' },
  ],
  drinks: [
    { title: 'Cold Beverages', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=800' },
    { title: 'Milkshake', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800' },
    { title: 'Mocktails', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800' },
  ],
};

const SIGNATURE_DISHES = [
  { id: 'misal', label: 'Misal Pav', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&q=80&w=800' },
  { id: 'kolhapuri', label: 'Kolhapuri Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  { id: 'kabab', label: 'Dilkhush Kabab', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
  { id: 'tandoori', label: 'Tandoori Chicken', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
  { id: 'biryani', label: 'Chicken Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=800' },
  { id: 'paneer', label: 'Paneer Tikka', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800' },
  { id: 'thali', label: 'Maharashtrian Thali', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800' },
  { id: 'butter', label: 'Butter Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  { id: 'veg', label: 'Veg Kolhapuri', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800' },
  { id: 'dal', label: 'Dal Tadka', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800' },
  { id: 'rice', label: 'Jeera Rice', image: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?auto=format&fit=crop&q=80&w=800' },
  { id: 'soda', label: 'Fresh Lime Soda', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800' }
];

const REVIEWS = [
  {
    id: 1,
    name: "Nistha Mukherjee",
    badge: "Local Guide · 16 reviews · 32 photos",
    rating: 5,
    text: "Best place to stop by on the highway. They were not pet friendly yet they got us a table outside and made sure we were comfortable. Staffs are extremely professional and kind. Best part is the hygiene of the place. Everything was so hygienic and the food was also delicious.",
    time: "3 months ago"
  },
  {
    id: 2,
    name: "Sunny More",
    rating: 5,
    text: "Best quality of food. Highly recommended. Must try.",
    stats: { Food: 5, Service: 5, Atmosphere: 5 },
    time: "4 months ago"
  },
  {
    id: 3,
    name: "Pakhawaj Lover Mohite Omkar",
    badge: "Local Guide · 118 reviews · 102 photos",
    rating: 5,
    text: "Nice experience with this hotel. Staff is good and service also good. Starter chicken items were great and I recommend everyone to try the Dilkhush Kabab at this place. It was awesome and tasty.",
    time: "2 weeks ago"
  },
  {
    id: 4,
    name: "Rahul Dhotre",
    rating: 5,
    text: "One of the best restaurants to stop for food on the Mumbai–Goa Highway. The ambience is very good and well maintained. Great food with authentic taste and good quality. Service was fast and staff was very polite. Overall, a great experience.",
    time: "1 month ago"
  },
  {
    id: 5,
    name: "Santoshi Dalvi",
    rating: 5,
    text: "Hotel Rajmudra offers outstanding food, impeccable cleanliness, and a serene ambience. The dishes are rich in flavor and beautifully presented, making every meal delightful.",
    time: "1 month ago"
  },
  {
    id: 6,
    name: "MK Services",
    rating: 5,
    text: "Very neat and clean restaurant with good service. Food is tasty and enjoyable.",
    time: "1 month ago"
  },
  {
    id: 7,
    name: "Ankita G",
    badge: "Local Guide · 22 reviews · 37 photos",
    rating: 5,
    text: "Food was very tasty. Neat and clean hotel with good ambience. Must recommend.",
    time: "2 months ago"
  },
  {
    id: 8,
    name: "Vinayak Bhosle",
    badge: "Local Guide · 12 reviews · 5 photos",
    rating: 5,
    text: "The ambience is absolutely lovely, bright and airy. Seating is comfortable and tables are spaced nicely. Food was delicious though slightly spicy for my liking, but we cooled our taste buds with some post lunch ice cream.",
    time: "1 month ago"
  },
  {
    id: 9,
    name: "Mansi Shinde",
    rating: 4,
    text: "Great experience! The food was delicious and the place was very clean and well maintained, including the washrooms. Highly recommended.",
    time: "3 months ago"
  }
];

const LEADERSHIP = [
  {
    name: "Sunil More",
    role: "Founder",
    image: IMAGES.founder.sunil,
    description: "The vision behind Hotel Rajmudra — bringing authentic Maharashtrian cuisine to travelers and families."
  },
  {
    name: "Gaurav More",
    role: "CMD (Chairman & Managing Director)",
    image: IMAGES.founder.gaurav,
    description: "Leading the brand with innovation, hospitality, and excellence in dining experiences."
  },
  {
    name: "Sanket More",
    role: "JMD (Joint Managing Director)",
    image: IMAGES.founder.sanket,
    description: "Driving the next generation of growth while preserving tradition and quality."
  }
];

const FloatingElements = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div style={{ y: y1, rotate }} className="absolute top-1/4 left-10 text-4xl opacity-20">🌶️</motion.div>
      <motion.div style={{ y: y2, rotate: -rotate }} className="absolute top-1/2 right-10 text-6xl opacity-20">🍲</motion.div>
      <motion.div style={{ y: y1, rotate }} className="absolute bottom-1/4 left-1/4 text-5xl opacity-20">🍋</motion.div>
      <motion.div style={{ y: y2, rotate: -rotate }} className="absolute top-1/3 right-1/4 text-4xl opacity-20">🌿</motion.div>
      <motion.div style={{ y: y1, rotate }} className="absolute bottom-1/3 right-1/3 text-3xl opacity-20">✨</motion.div>
    </div>
  );
};

const DishMenuItem = ({ 
  dish, 
  index, 
  activeDish, 
  setActiveDish 
}: any) => (
  <motion.button
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    onMouseEnter={() => setActiveDish(dish)}
    onClick={() => setActiveDish(dish)}
    className={`group flex items-center gap-4 py-6 border-b border-white/5 text-left transition-all duration-300 ${activeDish.id === dish.id ? 'pl-4' : 'pl-0'}`}
  >
    <div className={`w-2 h-2 rounded-full bg-brand-accent transition-all duration-300 ${activeDish.id === dish.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
    <span className={`text-2xl md:text-4xl font-display font-black uppercase tracking-tighter transition-colors duration-300 ${activeDish.id === dish.id ? 'text-brand-accent' : 'text-[#F5F1E8] group-hover:text-brand-accent'}`}>
      {dish.label}
    </span>
  </motion.button>
);

const DishShowcase = ({ activeDish }: { activeDish: typeof SIGNATURE_DISHES[0] }) => (
  <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
    <AnimatePresence mode="wait">
      <motion.img
        key={activeDish.id}
        src={activeDish.image}
        alt={activeDish.label}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <div className="absolute bottom-10 left-10">
      <motion.h3
        key={activeDish.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[#F5F1E8] text-3xl md:text-5xl font-black uppercase tracking-tighter"
      >
        {activeDish.label}
      </motion.h3>
    </div>
  </div>
);

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('thali');
  const [activeDish, setActiveDish] = useState(SIGNATURE_DISHES[0]);

  const headline = "TASTE THE AUTHENTIC";
  const words = headline.split(" ");

  return (
    <div className="relative min-h-screen bg-brand-bg font-sans selection:bg-brand-accent selection:text-brand-bg overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 px-4 text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero.building}
            alt="Hotel Rajmudra Building" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-bg" />
        </div>

        {/* Side Food Images (Circled Images) - Hidden on mobile */}
        <motion.div
          initial={{ x: -300, opacity: 0, rotate: -20 }}
          animate={{ x: -80, opacity: 1, rotate: 0 }}
          whileHover={{ x: -60, rotate: -5, scale: 1.05 }}
          transition={{ duration: 1.2, delay: 1, type: 'spring', stiffness: 50 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block z-30"
        >
          <div className="w-64 h-64 rounded-full border-8 border-brand-accent/20 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" 
              alt="Burger" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 300, opacity: 0, rotate: 20 }}
          animate={{ x: 80, opacity: 1, rotate: 0 }}
          whileHover={{ x: 60, rotate: 5, scale: 1.05 }}
          transition={{ duration: 1.2, delay: 1, type: 'spring', stiffness: 50 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block z-30"
        >
          <div className="w-64 h-64 rounded-full border-8 border-brand-accent/20 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=400" 
              alt="Sandwich" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Traditional Rajmudra Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 15, 
            delay: 0.5 
          }}
          className="relative mb-8 z-20"
        >
          <motion.div 
            className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center"
          >
            <img 
              src={IMAGES.hero.logo}
              alt="Hotel Rajmudra Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(211,47,47,0.4)]"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <div className="relative z-20 max-w-5xl">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter text-brand-text uppercase">
            {words.map((word, i) => (
              <div key={i} className="inline-block mr-4 last:mr-0">
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.8 + (i * 0.15),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block relative"
                  style={(i === 0 || i === 2) ? { 
                    backgroundImage: `url(${i === 0 ? 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    display: 'inline-block'
                  } : {}}
                >
                  {word}
                </motion.span>
                {i === 1 && <br />}
              </div>
            ))}
          </h2>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-4 text-brand-accent font-display font-medium tracking-[0.3em] uppercase text-xs md:text-base italic"
          >
            Experience the Legacy of Flavors
          </motion.p>
        </div>

        {/* Subtext & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 z-20 flex flex-col items-center gap-6"
        >
          <div className="flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold text-brand-accent">Hotel Rajmudra</h3>
            <p className="text-base md:text-lg font-medium opacity-80">होटल राजमुद्रा</p>
          </div>

          <div className="flex items-center gap-4 text-[10px] md:text-sm font-semibold tracking-widest uppercase opacity-60">
            <span>Dine-in</span>
            <span className="w-1 h-1 bg-brand-accent rounded-full" />
            <span>Takeaway</span>
            <span className="w-1 h-1 bg-brand-accent rounded-full" />
            <span>Delivery</span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 z-20 flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(244, 163, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 15, 
                delay: 1.5 
              }}
              className="px-8 md:px-10 py-3 md:py-4 bg-brand-accent text-brand-bg font-bold rounded-full shadow-xl transition-shadow uppercase tracking-widest text-xs md:text-sm w-full sm:w-auto"
            >
              Reserve a Table
            </motion.button>

            <motion.button
              onClick={() => window.open('/explore', '_blank')}
              whileHover={{ scale: 1.05, border: "1px solid #F4A300" }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 15, 
                delay: 1.6 
              }}
              className="px-8 md:px-10 py-3 md:py-4 border border-white/20 text-brand-text font-bold rounded-full transition-all uppercase tracking-widest text-xs md:text-sm w-full sm:w-auto backdrop-blur-sm"
            >
              Explore Hotel
            </motion.button>

            <motion.button
              onClick={() => window.open('/menu', '_blank')}
              whileHover={{ scale: 1.05, border: "1px solid #F4A300" }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 15, 
                delay: 1.7 
              }}
              className="px-8 md:px-10 py-3 md:py-4 border border-white/20 text-brand-text font-bold rounded-full transition-all uppercase tracking-widest text-xs md:text-sm w-full sm:w-auto backdrop-blur-sm"
            >
              View Menu
            </motion.button>
          </div>
        </motion.div>

        {/* Background Texture/Gradient */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,163,0,0.05),transparent_70%)]" />
        </div>
      </section>

      {/* Menu Categories Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative py-16 md:py-24 px-4 md:px-8 bg-brand-bg"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl font-display font-black text-brand-text uppercase tracking-tight"
            >
              Explore Our <span className="text-brand-accent">Menu</span>
            </motion.h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-1 bg-brand-accent mx-auto mt-4"
            />
          </div>

          {/* Category Navigation Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative mb-16 border-b border-white/10"
          >
            <div className="flex overflow-x-auto no-scrollbar pb-4 gap-4 md:gap-0 md:justify-between items-center">
              {MENU_CATEGORIES.map((cat, index) => {
                const isLeft = index < 2;
                const isRight = index > 2;
                const isMiddle = index === 2;

                return (
                  <React.Fragment key={cat.id}>
                    <motion.button
                      initial={{ 
                        x: isLeft ? -100 : isRight ? 100 : 0,
                        opacity: 0,
                        scale: isMiddle ? 0.8 : 1
                      }}
                      whileInView={{ x: 0, opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: isMiddle ? 0.4 : index * 0.1,
                        ease: "easeOut"
                      }}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative flex items-center gap-3 px-6 py-3 transition-colors whitespace-nowrap group`}
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className={`font-display font-bold tracking-widest text-sm md:text-base ${activeCategory === cat.id ? 'text-brand-accent' : 'text-white/40 group-hover:text-white/70'}`}>
                        {cat.label}
                      </span>
                      
                      {activeCategory === cat.id && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-brand-accent shadow-[0_0_10px_rgba(244,163,0,0.8)]"
                        />
                      )}
                    </motion.button>
                    {index < MENU_CATEGORIES.length - 1 && (
                      <div className="hidden md:block w-[1px] h-8 bg-white/10" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>

          {/* Food Image Display Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {MENU_ITEMS[activeCategory].map((item, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 shadow-2xl cursor-pointer"
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <p className="text-brand-accent font-display font-bold text-xl tracking-wide">
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View Full Menu Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <button 
              onClick={() => window.open('/menu', '_blank')}
              className="group relative px-12 py-5 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent"
            >
              <span className="relative z-10">View Full Menu</span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <style>{`
                .group:hover span { color: #0B0B0F; }
              `}</style>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Premium Editorial Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-[#0B0B0F] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#F5F1E8]/60 text-xs md:text-base italic tracking-[0.4em] uppercase mb-8"
          >
            Your favourite highway food destination
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[#F5F1E8] text-4xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] md:leading-[0.85] tracking-tighter uppercase max-w-6xl mb-12 md:mb-16"
          >
            THE BEST<br />
            COMFORT<br />
            IN POLADPUR
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="relative w-full md:w-[70%] aspect-video rounded-2xl overflow-hidden shadow-2xl mb-20 group"
          >
            <img 
              src={IMAGES.comfort}
              alt="Hotel Rajmudra Building" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            
            <div className="absolute inset-0 flex items-end justify-center pb-12">
              <motion.button
                onClick={() => window.open('/explore', '_blank')}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(244, 163, 0, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 px-8 py-4 bg-[#F4A300] text-[#0B0B0F] font-bold rounded-full shadow-2xl transition-all group/btn"
              >
                <span className="tracking-widest uppercase text-xs md:text-sm">Explore Hotel</span>
                <div className="w-8 h-8 rounded-full bg-[#0B0B0F] flex items-center justify-center text-[#F4A300] group-hover/btn:rotate-45 transition-transform">
                  <Utensils className="w-4 h-4" />
                </div>
              </motion.button>
            </div>
          </motion.div>

          <div className="w-full border-t border-white/10 pt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-sm">
              <p className="text-[#F5F1E8]/60 text-sm leading-relaxed">
                Hotel Rajmudra is a popular dining destination on the Mumbai–Goa Highway in Poladpur, known for authentic Maharashtrian flavors and warm hospitality.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-start md:items-center">
              <span className="text-[#F5F1E8] text-4xl md:text-5xl font-black mb-2">4.2 ★</span>
              <span className="text-[#F5F1E8]/40 text-[10px] uppercase tracking-widest font-bold">Google Rating</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-start md:items-end">
              <span className="text-[#F5F1E8] text-4xl md:text-5xl font-black mb-2">₹200–400</span>
              <span className="text-[#F5F1E8]/40 text-[10px] uppercase tracking-widest font-bold">Average Cost Per Person</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-[#0B0B0F] overflow-hidden">
        <FloatingElements />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#F5F1E8] text-4xl md:text-8xl font-black leading-tight uppercase tracking-tighter mb-6">
              SIGNATURE<br />FLAVOURS
            </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col">
                {SIGNATURE_DISHES.map((dish, index) => (
                  <DishMenuItem key={dish.id} dish={dish} index={index} activeDish={activeDish} setActiveDish={setActiveDish} />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 sticky top-32">
              <DishShowcase activeDish={activeDish} />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-brand-bg relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter text-brand-text mb-4 leading-tight">
              What Our<br />
              <span className="text-brand-accent">Customers Say</span>
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-sm md:text-base max-w-2xl mx-auto font-medium tracking-wide"
            >
              “Real experiences from travelers and food lovers visiting Hotel Rajmudra on the Mumbai–Goa Highway.”
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111118] border border-white/5 p-8 rounded-2xl hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-orange-600 flex items-center justify-center text-brand-bg font-black text-lg">
                      {review.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text text-sm leading-tight">{review.name}</h4>
                      {review.badge && (
                        <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{review.badge.split('·')[0]}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? 'text-brand-accent fill-brand-accent group-hover:drop-shadow-[0_0_8px_rgba(244,163,0,0.6)]' : 'text-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6 flex-grow">
                  “{review.text}”
                </p>

                {review.stats && (
                  <div className="grid grid-cols-3 gap-2 mb-6 pt-4 border-t border-white/5">
                    {Object.entries(review.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{key}</div>
                        <div className="text-brand-accent font-bold text-xs">{value}/5</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-medium text-white/30 uppercase tracking-widest">
                  <span>Google Review</span>
                  <span>{review.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <button 
              onClick={() => window.open('https://www.google.com/search?q=hotel+rajmudra+poladpur+reviews', '_blank')}
              className="px-8 py-3 bg-brand-accent/10 border border-brand-accent text-brand-accent font-bold rounded-full hover:bg-brand-accent hover:text-brand-bg hover:shadow-[0_0_20px_rgba(244,163,0,0.4)] transition-all uppercase tracking-widest text-xs"
            >
              View All Reviews
            </button>
          </motion.div>
        </div>
      </section>

      {/* Founder Leadership Section */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-[#0B0B0F] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter text-[#F5F1E8] mb-4 leading-tight">
              The People<br />
              <span className="text-[#F5F1E8]">Behind Rajmudra</span>
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#F5F1E8]/60 text-sm md:text-base italic tracking-wide"
            >
              “Building a legacy of authentic Maharashtrian hospitality.”
            </motion.p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {LEADERSHIP.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-2rem)] max-w-sm"
              >
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-white/5 shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group-hover:-translate-y-2">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="text-center px-4">
                  <h3 className="text-2xl font-display font-bold text-[#F5F1E8] uppercase tracking-wide mb-1">{leader.name}</h3>
                  <p className="text-[#F4A300] font-bold text-xs uppercase tracking-widest mb-4">{leader.role}</p>
                  <p className="text-[#F5F1E8]/50 text-sm leading-relaxed">{leader.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
