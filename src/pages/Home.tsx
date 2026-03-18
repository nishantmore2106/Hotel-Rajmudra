import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, animate, useMotionValue } from 'framer-motion';
import { Twitter, Utensils, Star, MapPin, Clock, Info, Phone, Mail, Map, Car, Navigation } from 'lucide-react';
import { Footer } from '../components/Footer';
import { IMAGES } from '../../images';
import { Header } from '../components/Header';
import { useLanguage, FadeText } from '../LanguageContext';

const MENU_CATEGORIES = [
  { id: 'thali', label: { en: 'THALI', mr: 'थाळी' }, icon: '🍱' },
  { id: 'pizza', label: { en: 'PIZZA', mr: 'पिझ्झा' }, icon: '🍕' },
  { id: 'hotdog', label: { en: 'HOTDOG', mr: 'हॉटडॉग' }, icon: '🌭' },
  { id: 'dessert', label: { en: 'DESSERT', mr: 'मिठाई' }, icon: '🍩' },
  { id: 'drinks', label: { en: 'DRINKS', mr: 'पेये' }, icon: '🥤' },
];

const MENU_ITEMS: Record<string, { title: { en: string, mr: string }, image: string }[]> = {
  thali: [
    { title: { en: 'Maharashtrian Thali', mr: 'महाराष्ट्रीयन थाळी' }, image: IMAGES.menu.thali },
    { title: { en: 'Special Veg Thali', mr: 'स्पेशल व्हेज थाळी' }, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Chicken Thali', mr: 'चिकन थाळी' }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  ],
  pizza: [
    { title: { en: 'Margherita Pizza', mr: 'मार्गेरिटा पिझ्झा' }, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Cheese Slice Pull', mr: 'चीझ स्लाइस पिझ्झा' }, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Wood Fired Pizza', mr: 'वुड फायर पिझ्झा' }, image: 'https://images.unsplash.com/photo-1574129810591-df0917022b7a?auto=format&fit=crop&q=80&w=800' },
  ],
  hotdog: [
    { title: { en: 'Loaded Hotdog', mr: 'लोडेड हॉटडॉग' }, image: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Street Style Hotdog', mr: 'स्ट्रीट स्टाईल हॉटडॉग' }, image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Hotdog with Sauces', mr: 'सॉस हॉटडॉग' }, image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800' },
  ],
  dessert: [
    { title: { en: 'Chocolate Dessert', mr: 'चॉकलेट डेझर्ट' }, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Ice Cream', mr: 'आईस क्रीम' }, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dabb892?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Donut Platter', mr: 'डोनट प्लॅटर' }, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800' },
  ],
  drinks: [
    { title: { en: 'Cold Beverages', mr: 'कोल्ड ड्रिंक्स' }, image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Milkshake', mr: 'मिल्कशेक' }, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800' },
    { title: { en: 'Mocktails', mr: 'मॉकटेल्स' }, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800' },
  ],
};

const SIGNATURE_DISHES = [
  { id: 'misal', label: { en: 'Misal Pav', mr: 'मिसळ पाव' }, image: IMAGES.menu.misal },
  { id: 'kolhapuri', label: { en: 'Kolhapuri Chicken', mr: 'कोल्हापुरी चिकन' }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  { id: 'kabab', label: { en: 'Dilkhush Kabab', mr: 'दिलखुश कबाब' }, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
  { id: 'tandoori', label: { en: 'Tandoori Chicken', mr: 'तंदुरी चिकन' }, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
  { id: 'biryani', label: { en: 'Chicken Biryani', mr: 'चिकन बिर्याणी' }, image: IMAGES.menu.biryani },
  { id: 'paneer', label: { en: 'Paneer Tikka', mr: 'पनीर टिक्का' }, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800' },
  { id: 'thali', label: { en: 'Maharashtrian Thali', mr: 'महाराष्ट्रीयन थाळी' }, image: IMAGES.menu.thali },
  { id: 'butter', label: { en: 'Butter Chicken', mr: 'बटर चिकन' }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  { id: 'veg', label: { en: 'Veg Kolhapuri', mr: 'व्हेज कोल्हापुरी' }, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800' },
  { id: 'dal', label: { en: 'Dal Tadka', mr: 'दाल तडका' }, image: IMAGES.menu.dal },
  { id: 'rice', label: { en: 'Jeera Rice', mr: 'जिरा राईस' }, image: IMAGES.menu.rice },
  { id: 'soda', label: { en: 'Fresh Lime Soda', mr: 'फ्रेश लाईम सोडा' }, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800' }
];

const REVIEWS = [
  {
    id: 1,
    name: "Nistha Mukherjee",
    badge: "Local Guide · 16 reviews · 32 photos",
    rating: 5,
    text: { en: "Best place to stop by on the highway. They were not pet friendly yet they got us a table outside and made sure we were comfortable. Staffs are extremely professional and kind. Best part is the hygiene of the place. Everything was so hygienic and the food was also delicious.", mr: "महामार्गावर थांबण्यासाठी उत्तम ठिकाण. ते पेट फ्रेंडली नसले तरी त्यांनी आम्हाला बाहेर टेबल दिले आणि आमची काळजी घेतली. कर्मचारी अत्यंत व्यावसायिक आणि दयाळू आहेत. सर्वोत्तम भाग म्हणजे येथील स्वच्छता. सर्वकाही खूप स्वच्छ होते आणि जेवण देखील स्वादिष्ट होते." },
    time: "3 months ago"
  },
  {
    id: 2,
    name: "Sunny More",
    rating: 5,
    text: { en: "Best quality of food. Highly recommended. Must try.", mr: "जेवणाचा उत्कृष्ट दर्जा. अत्यंत शिफारसीय. नक्की वापरून पहा." },
    stats: { Food: 5, Service: 5, Atmosphere: 5 },
    time: "4 months ago"
  },
  {
    id: 3,
    name: "Pakhawaj Lover Mohite Omkar",
    badge: "Local Guide · 118 reviews · 102 photos",
    rating: 5,
    text: { en: "Nice experience with this hotel. Staff is good and service also good. Starter chicken items were great and I recommend everyone to try the Dilkhush Kabab at this place. It was awesome and tasty.", mr: "या हॉटेलचा चांगला अनुभव. कर्मचारी चांगले आहेत आणि सेवा देखील चांगली आहे. स्टार्टर चिकन आयटम छान होते आणि मी सर्वांना येथील दिलखुश कबाब वापरून पाहण्याची शिफारस करतो. ते खूप छान आणि चविष्ट होते." },
    time: "2 weeks ago"
  },
  {
    id: 4,
    name: "Rahul Dhotre",
    rating: 5,
    text: { en: "One of the best restaurants to stop for food on the Mumbai–Goa Highway. The ambience is very good and well maintained. Great food with authentic taste and good quality. Service was fast and staff was very polite. Overall, a great experience.", mr: "मुंबई-गोवा महामार्गावर जेवणासाठी थांबण्यासाठी सर्वोत्तम रेस्टॉरंट्सपैकी एक. वातावरण खूप चांगले आणि व्यवस्थित राखलेले आहे. अस्सल चव आणि उत्तम दर्जाचे उत्तम अन्न. सेवा वेगवान होती आणि कर्मचारी अतिशय सभ्य होते." },
    time: "1 month ago"
  },
  {
    id: 5,
    name: "Santoshi Dalvi",
    rating: 5,
    text: { en: "Hotel Rajmudra offers outstanding food, impeccable cleanliness, and a serene ambience. The dishes are rich in flavor and beautifully presented, making every meal delightful.", mr: "हॉटेल राजमुद्रा उत्कृष्ट अन्न, निर्दोष स्वच्छता आणि शांत वातावरण देते. पदार्थ चवीने समृद्ध आहेत आणि सुंदरपणे सादर केले आहेत, जे प्रत्येक जेवण आनंददायक बनवतात." },
    time: "1 month ago"
  },
  {
    id: 6,
    name: "MK Services",
    rating: 5,
    text: { en: "Very neat and clean restaurant with good service. Food is tasty and enjoyable.", mr: "चांगल्या सेवेसह अतिशय नीटनेटके आणि स्वच्छ रेस्टॉरंट. जेवण चविष्ट आणि आनंददायक आहे." },
    time: "1 month ago"
  },
  {
    id: 7,
    name: "Ankita G",
    badge: "Local Guide · 22 reviews · 37 photos",
    rating: 5,
    text: { en: "Food was very tasty. Neat and clean hotel with good ambience. Must recommend.", mr: "अन्न अतिशय चविष्ट होते. चांगल्या वातावरणासह नीटनेटके आणि स्वच्छ हॉटेल. नक्की शिफारस करेन." },
    time: "2 months ago"
  },
  {
    id: 8,
    name: "Vinayak Bhosle",
    badge: "Local Guide · 12 reviews · 5 photos",
    rating: 5,
    text: { en: "The ambience is absolutely lovely, bright and airy. Seating is comfortable and tables are spaced nicely. Food was delicious though slightly spicy for my liking, but we cooled our taste buds with some post lunch ice cream.", mr: "वातावरण अतिशय सुंदर, उज्ज्वल आणि हवेशीर आहे. बसण्याची सोय आरामदायी आहे. जेवण स्वादिष्ट होते, थोडं मसालेदार होतं पण आम्ही आईस्क्रीमने आमची चव शांत केली." },
    time: "1 month ago"
  },
  {
    id: 9,
    name: "Mansi Shinde",
    rating: 4,
    text: { en: "Great experience! The food was delicious and the place was very clean and well maintained, including the washrooms. Highly recommended.", mr: "उत्तम अनुभव! जेवण स्वादिष्ट होते आणि वॉशरूमसह जागा अतिशय स्वच्छ आणि व्यवस्थित राखलेली होती. अत्यंत शिफारसीय." },
    time: "3 months ago"
  }
];

const LEADERSHIP = [
  {
    name: "Sunil More",
    role: { en: "Founder", mr: "संस्थापक" },
    image: IMAGES.founder.sunil,
    description: { en: "The vision behind Hotel Rajmudra — bringing authentic Maharashtrian cuisine to travelers and families.", mr: "हॉटेल राजमुद्रा मागील दृष्टी — प्रवासी आणि कुटुंबांना अस्सल महाराष्ट्रीयन खाद्यपदार्थ पोहोचवणे." }
  },
  {
    name: "Gaurav More",
    role: { en: "CMD (Chairman & Managing Director)", mr: "CMD (अध्यक्ष आणि व्यवस्थापकीय संचालक)" },
    image: IMAGES.founder.gaurav,
    description: { en: "Leading the brand with innovation, hospitality, and excellence in dining experiences.", mr: "नवीन उपक्रम, आदरातिथ्य आणि जेवणाच्या उत्कृष्ट अनुभवासह ब्रँडचे नेतृत्व करत आहेत." }
  },
  {
    name: "Sanket More",
    role: { en: "JMD (Joint Managing Director)", mr: "JMD (सह व्यवस्थापकीय संचालक)" },
    image: IMAGES.founder.sanket,
    description: { en: "Driving the next generation of growth while preserving tradition and quality.", mr: "परंपरा आणि गुणवत्ता जपत पुढच्या पिढीच्या वाढीस चालना देत आहेत." }
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
  setActiveDish,
  language
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
    <span className={`text-2xl md:text-4xl font-black uppercase tracking-tighter transition-colors duration-300 ${activeDish.id === dish.id ? 'text-brand-accent' : 'text-[#F5F1E8] group-hover:text-brand-accent'}`}>
      <FadeText>{dish.label[language]}</FadeText>
    </span>
  </motion.button>
);

const DishShowcase = ({ activeDish, language }: { activeDish: typeof SIGNATURE_DISHES[0], language: 'en' | 'mr' }) => (
  <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
    <AnimatePresence mode="wait">
      <motion.img
        key={activeDish.id}
        src={activeDish.image}
        alt={activeDish.label.en}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
        loading="lazy"
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
        <FadeText>{activeDish.label[language]}</FadeText>
      </motion.h3>
    </div>
  </div>
);

const HighwayJourneySection = () => {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section className="relative py-24 md:py-40 px-4 md:px-8 bg-brand-bg overflow-hidden border-t border-white/5">
      {/* Parallax Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-[10%] text-6xl">🌴</motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-1/3 right-[10%] text-6xl">🌲</motion.div>
        <motion.div style={{ y: y1 }} className="absolute top-1/2 right-[20%] text-5xl">🪧</motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 left-[20%] text-4xl">🏔️</motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-accent font-black uppercase tracking-[0.4em] text-xs md:text-sm mb-6 block"
          >
            <FadeText>{t('highway_kicker')}</FadeText>
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-[#F5F1E8] text-4xl md:text-7xl font-black leading-[1] uppercase tracking-tighter mb-8"
          >
            <FadeText>{t('highway_title_1')}</FadeText><br />
            <span className="text-brand-accent"><FadeText>{t('highway_title_2')}</FadeText></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed"
          >
            <FadeText>{t('highway_sub')}</FadeText>
          </motion.p>
        </div>

        {/* Desktop Journey Map (Horizontal) */}
        <div className="hidden md:block relative h-[500px] w-full">
          {/* Background Track */}
          <div className="absolute top-1/2 left-0 w-full h-3 bg-white/5 rounded-full -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 dashed-line" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.2) 50%, transparent 50%)', backgroundSize: '20px 2px' }} />
          
          {/* Animated Painted Road */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 h-3 bg-brand-accent rounded-full -translate-y-1/2 shadow-[0_0_20px_rgba(244,163,0,0.5)]" 
          />

          {/* Points & Tooltips */}
          {/* Mumbai */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 group cursor-pointer">
            <div className="w-8 h-8 bg-brand-bg border-4 border-white/20 rounded-full flex items-center justify-center z-10 relative group-hover:border-brand-accent transition-colors" />
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <h4 className="text-xl font-black uppercase tracking-tighter text-[#F5F1E8] mb-1"><FadeText>{t('mumbai')}</FadeText></h4>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest"><FadeText>{t('tooltip_start')}</FadeText></p>
            </div>
          </div>

          {/* Goa */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 group cursor-pointer">
            <div className="w-8 h-8 bg-brand-bg border-4 border-white/20 rounded-full flex items-center justify-center z-10 relative group-hover:border-brand-accent transition-colors" />
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <h4 className="text-xl font-black uppercase tracking-tighter text-[#F5F1E8] mb-1"><FadeText>{t('goa')}</FadeText></h4>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest"><FadeText>{t('tooltip_continue')}</FadeText></p>
            </div>
          </div>

          {/* Poladpur / Hotel Rajmudra Marker */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 group z-20"
          >
            <div className="w-12 h-12 bg-brand-accent border-4 border-brand-bg rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(244,163,0,0.6)] cursor-pointer">
              <MapPin className="w-6 h-6 text-[#0B0B0F] fill-[#0B0B0F]" />
            </div>
            
            {/* Floating Hotel Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2, duration: 0.6 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 bg-[#111118] border border-brand-accent/30 rounded-3xl p-6 shadow-2xl pointer-events-auto"
            >
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#111118] border-b border-r border-brand-accent/30 rotate-45" />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-brand-accent leading-none"><FadeText>{t('hotel_highlight_title')}</FadeText></h3>
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1"><FadeText>{t('hotel_highlight_subtitle')}</FadeText></p>
                </div>
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                  <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
                  <span className="text-xs font-bold">4.2</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {[t('feature_1'), t('feature_2'), t('feature_3')].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <Utensils className="w-3 h-3 text-brand-accent opacity-50" />
                    <FadeText>{feat}</FadeText>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
                className="group/btn relative w-full px-6 py-3 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-xs rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-[#0B0B0F] transition-colors duration-500">
                  <Navigation className="w-4 h-4" /> <FadeText>{t('get_directions')}</FadeText>
                </span>
                <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>

            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <h4 className="text-xl font-black uppercase tracking-tighter text-brand-accent mb-1"><FadeText>{t('poladpur')}</FadeText></h4>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest"><FadeText>{t('tooltip_stop')}</FadeText></p>
            </div>
          </motion.div>

          {/* Distance Info Cards below the line */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 mt-12 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-center flex flex-col items-center shadow-xl"
          >
            <span className="text-brand-accent font-black text-lg"><FadeText>{t('distance_mumbai')}</FadeText></span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold"><FadeText>{t('mumbai')}</FadeText> → <FadeText>{t('poladpur')}</FadeText></span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="absolute top-1/2 left-[75%] -translate-y-1/2 -translate-x-1/2 mt-12 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-center flex flex-col items-center shadow-xl"
          >
            <span className="text-brand-accent font-black text-lg"><FadeText>{t('distance_goa')}</FadeText></span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold"><FadeText>{t('poladpur')}</FadeText> → <FadeText>{t('goa')}</FadeText></span>
          </motion.div>

          {/* Animated Car */}
          <motion.div
            initial={{ left: "0%" }}
            whileInView={{ left: "50%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl z-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          >
            <Car className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Mobile Journey Map (Vertical) */}
        <div className="md:hidden relative py-10 pl-8 pr-4">
          {/* Background Track */}
          <div className="absolute top-0 left-8 w-2 h-full bg-white/5 rounded-full -translate-x-1/2" />
          
          {/* Animated Painted Road */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-8 w-2 bg-brand-accent rounded-full -translate-x-1/2 shadow-[0_0_20px_rgba(244,163,0,0.5)]" 
          />

          {/* Animated Car */}
          <motion.div
            initial={{ top: "0%" }}
            whileInView={{ top: "50%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            className="absolute left-8 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-2xl z-30"
          >
            <Car className="w-5 h-5" />
          </motion.div>

          <div className="space-y-32 relative z-20">
            {/* Mumbai */}
            <div className="relative pl-10">
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-brand-bg border-4 border-white/20 rounded-full" />
              <h4 className="text-2xl font-black uppercase tracking-tighter text-[#F5F1E8] mb-1"><FadeText>{t('mumbai')}</FadeText></h4>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest"><FadeText>{t('tooltip_start')}</FadeText></p>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2 }}
                className="mt-6 bg-white/5 border border-white/10 px-4 py-3 rounded-xl max-w-[200px]"
              >
                <span className="text-brand-accent font-black text-lg block"><FadeText>{t('distance_mumbai')}</FadeText></span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold block"><FadeText>{t('time_mumbai')}</FadeText></span>
              </motion.div>
            </div>

            {/* Poladpur */}
            <div className="relative pl-10">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, type: "spring" }}
                className="absolute top-0 -left-8 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-brand-accent border-4 border-brand-bg rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(244,163,0,0.6)]"
              >
                <MapPin className="w-5 h-5 text-[#0B0B0F] fill-[#0B0B0F]" />
              </motion.div>
              
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 0.6 }}
                className="bg-[#111118] border border-brand-accent/30 rounded-2xl p-5 shadow-2xl -mt-6 relative before:absolute before:top-6 before:-left-3 before:w-6 before:h-6 before:bg-[#111118] before:border-b before:border-l before:border-brand-accent/30 before:rotate-45"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tighter text-brand-accent leading-none"><FadeText>{t('hotel_highlight_title')}</FadeText></h3>
                    <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1"><FadeText>{t('poladpur')}</FadeText></p>
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                    <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
                    <span className="text-xs font-bold">4.2</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {[t('feature_1'), t('feature_2'), t('feature_3')].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                      <Utensils className="w-3 h-3 text-brand-accent opacity-50 flex-shrink-0" />
                      <FadeText>{feat}</FadeText>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
                  className="group/btn relative w-full px-4 py-3 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-[10px] rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-[#0B0B0F] transition-colors duration-500">
                    <Navigation className="w-3 h-3" /> <FadeText>{t('get_directions')}</FadeText>
                  </span>
                  <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </button>
              </motion.div>
            </div>

            {/* Goa */}
            <div className="relative pl-10">
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-brand-bg border-4 border-white/20 rounded-full" />
              <h4 className="text-2xl font-black uppercase tracking-tighter text-[#F5F1E8] mb-1"><FadeText>{t('goa')}</FadeText></h4>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest"><FadeText>{t('tooltip_continue')}</FadeText></p>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.4 }}
                className="mt-6 bg-white/5 border border-white/10 px-4 py-3 rounded-xl max-w-[200px]"
              >
                <span className="text-brand-accent font-black text-lg block"><FadeText>{t('distance_goa')}</FadeText></span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold block"><FadeText>{t('poladpur')}</FadeText> → <FadeText>{t('goa')}</FadeText></span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Live Traffic Mock Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.8 }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-brand-accent/10 border border-brand-accent/20 px-6 py-3 rounded-full">
            <Clock className="w-4 h-4 text-brand-accent" />
            <span className="text-sm font-bold text-white/80 tracking-widest uppercase"><FadeText>{t('mahad')}</FadeText> → <FadeText>{t('poladpur')}</FadeText> : <span className="text-brand-accent"><FadeText>{t('time_mahad')}</FadeText></span></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AnimatedCounter = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

const DistanceCalculatorSection = () => {
  const { language, t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [autoDistance, setAutoDistance] = useState<number | null>(null);

  const TRAVEL_DATA: Record<string, { distance: number, timeKey: string, nameKey: string, msgKey: string }> = {
    mumbai: { distance: 166, timeKey: 'time_mumbai_full', nameKey: 'mumbai', msgKey: 'msg_mumbai' },
    pune: { distance: 130, timeKey: 'time_pune', nameKey: 'pune', msgKey: 'msg_pune' },
    mahad: { distance: 19, timeKey: 'time_mahad', nameKey: 'mahad', msgKey: 'msg_mahad' },
    goa: { distance: 366, timeKey: 'time_goa_full', nameKey: 'goa', msgKey: 'msg_goa' }
  };

  const activeData = selectedCity ? TRAVEL_DATA[selectedCity] : null;

  useEffect(() => {
    setLocationStatus('loading');
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dist = calculateDistance(position.coords.latitude, position.coords.longitude, 17.9853, 73.4514);
        setAutoDistance(dist);
        setLocationStatus('success');
      },
      (error) => {
        setLocationStatus('error');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  const getSmartMessage = (dist: number) => {
    if (dist < 20) return 'dist_close_msg';
    if (dist <= 80) return 'dist_mid_msg';
    return 'dist_far_msg';
  };

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-[#0B0B0F] relative border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#F5F1E8] mb-6 leading-tight"
          >
            <FadeText>{t('calc_title_1')}</FadeText><br />
            <span className="text-brand-accent"><FadeText>{t('calc_title_2')}</FadeText></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#F5F1E8]/60 text-base md:text-lg max-w-2xl mx-auto font-medium"
          >
            <FadeText>{t('calc_sub')}</FadeText>
          </motion.p>
        </div>

        {/* Loading State */}
        {locationStatus === 'loading' && (
          <div className="text-center text-[#F5F1E8]/60 py-10 animate-pulse">
            <MapPin className="w-8 h-8 mx-auto mb-4 opacity-50" />
            <p className="tracking-widest uppercase text-sm"><FadeText>{t('detecting_loc')}</FadeText></p>
          </div>
        )}

        {/* Success State (Geolocation Found) */}
        {locationStatus === 'success' && autoDistance !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-[#111118] border border-brand-accent/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden max-w-3xl mx-auto"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
            
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-brand-accent" />
              </div>
            </div>

            <div className="text-xl md:text-3xl font-black text-[#F5F1E8] tracking-tighter mb-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
               <span><FadeText>{t('you_are')}</FadeText></span>
               <span className="text-brand-accent text-5xl md:text-6xl my-2 md:my-0 flex items-baseline gap-1">
                 <AnimatedCounter value={autoDistance} />
                 <span className="text-xl md:text-2xl text-brand-accent/60 lowercase">km</span>
               </span>
               <span><FadeText>{t('away_from')}</FadeText></span>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl py-4 px-6 mb-10 inline-block"
            >
              <p className="text-brand-accent font-bold text-sm md:text-base tracking-wide flex items-center gap-3">
                <Star className="w-4 h-4 fill-brand-accent flex-shrink-0" />
                <FadeText>{t(getSmartMessage(autoDistance) as any)}</FadeText>
                <Star className="w-4 h-4 fill-brand-accent flex-shrink-0" />
              </p>
            </motion.div>

            <div>
              <button 
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
                className="group relative px-10 py-4 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#0B0B0F] transition-colors duration-500">
                  <Navigation className="w-4 h-4" /> <FadeText>{t('get_directions')}</FadeText>
                </span>
                <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Error / Denied Fallback State */}
        {locationStatus === 'error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-center text-[#F5F1E8]/60 font-medium mb-4"><FadeText>{t('loc_denied')}</FadeText></p>
            <div className="mb-12">
              <p className="text-center text-[#F5F1E8] font-bold tracking-widest uppercase mb-6 text-sm"><FadeText>{t('where_from')}</FadeText></p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(TRAVEL_DATA).map(([key, data], i) => (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedCity(key)}
                    className={`px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300 border ${
                      selectedCity === key 
                      ? 'bg-brand-accent text-[#0B0B0F] border-brand-accent shadow-[0_0_20px_rgba(244,163,0,0.4)]' 
                      : 'bg-transparent text-[#F5F1E8] border-white/20 hover:border-brand-accent hover:text-brand-accent'
                    }`}
                  >
                    <FadeText>{t(data.nameKey as any)}</FadeText>
                  </motion.button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeData && (
                <motion.div
                  key={selectedCity}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="bg-[#111118] border border-brand-accent/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden max-w-3xl mx-auto"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50" />
                  
                  <div className="mb-8">
                    <p className="text-[#F5F1E8]/40 uppercase tracking-widest font-bold text-xs mb-2"><FadeText>{t('from_label')}</FadeText> <span className="text-[#F5F1E8]"><FadeText>{t(activeData.nameKey as any)}</FadeText></span></p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10 mb-10">
                    <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
                      <span className="text-[#F5F1E8]/40 uppercase tracking-widest font-bold text-[10px] mb-4"><FadeText>{t('distance_label')}</FadeText></span>
                      <div className="text-5xl md:text-7xl font-black text-brand-accent tracking-tighter flex items-baseline gap-2">
                        <AnimatedCounter value={activeData.distance} />
                        <span className="text-xl md:text-2xl text-brand-accent/60 lowercase">km</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center pt-10 md:pt-0">
                      <span className="text-[#F5F1E8]/40 uppercase tracking-widest font-bold text-[10px] mb-4"><FadeText>{t('time_label')}</FadeText></span>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-5xl font-black text-[#F5F1E8] tracking-tighter"
                      >
                        <FadeText>{t(activeData.timeKey as any)}</FadeText>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl py-4 px-6 mb-10 inline-block"
                  >
                    <p className="text-brand-accent font-bold text-sm md:text-base tracking-wide flex items-center gap-3">
                      <Star className="w-4 h-4 fill-brand-accent flex-shrink-0" />
                      <FadeText>{t(activeData.msgKey as any)}</FadeText>
                      <Star className="w-4 h-4 fill-brand-accent flex-shrink-0" />
                    </p>
                  </motion.div>

                  <div>
                    <button 
                      onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')}
                      className="group relative px-10 py-4 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#0B0B0F] transition-colors duration-500">
                        <Navigation className="w-4 h-4" /> <FadeText>{t('get_directions')}</FadeText>
                      </span>
                      <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('thali');
  const [activeDish, setActiveDish] = useState(SIGNATURE_DISHES[0]);
  const { language, t } = useLanguage();

  const headline = t('hero_title');
  const words = headline.split(" ");

  useEffect(() => {
    document.title = `${t('hotel_name')} | ${t('nav_home')}`;
  }, [t]);

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
          initial={{ x: -250, y: 0, opacity: 0, rotate: -20 }}
          animate={{ x: 100, y: 0, opacity: 1, rotate: 0 }}
          whileHover={{ x: 120, y: -10, rotate: -5, scale: 1.05 }}
          transition={{ duration: 1.2, delay: 1, type: 'spring', stiffness: 50 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block z-30"
        >
          <div 
            className="w-[26rem] h-[26rem] bg-white p-2 shadow-2xl overflow-hidden"
            style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
          >
            <img 
              src={IMAGES.hero.dish1} 
              alt="Dish 1" 
              className="w-full h-full object-cover"
              style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 250, y: 0, opacity: 0, rotate: 20 }}
          animate={{ x: -100, y: 0, opacity: 1, rotate: 0 }}
          whileHover={{ x: -120, y: -10, rotate: 5, scale: 1.05 }}
          transition={{ duration: 1.2, delay: 1, type: 'spring', stiffness: 50 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block z-30"
        >
          <div 
            className="w-[26rem] h-[26rem] bg-white p-2 shadow-2xl overflow-hidden"
            style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
          >
            <img 
              src={IMAGES.hero.dish2} 
              alt="Dish 2" 
              className="w-full h-full object-cover"
              style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
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
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-brand-text uppercase">
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
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${i === 0 ? 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'})`,
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
            className="mt-4 text-brand-accent font-medium tracking-[0.3em] uppercase text-xs md:text-base italic"
          >
            <FadeText>{t('hero_subtitle')}</FadeText>
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
            <h3 className="text-xl md:text-2xl font-bold text-brand-accent"><FadeText>{t('hotel_name')}</FadeText></h3>
            <p className="text-base md:text-lg font-medium opacity-80"><FadeText>{t('hotel_name_mr')}</FadeText></p>
          </div>

          <div className="flex items-center gap-4 text-[10px] md:text-sm font-semibold tracking-widest uppercase opacity-60">
            <span><FadeText>{t('dine_in')}</FadeText></span>
            <span className="w-1 h-1 bg-brand-accent rounded-full" />
            <span><FadeText>{t('takeaway')}</FadeText></span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 z-20 flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              onClick={() => window.open('/explore', '_blank')}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 15, 
                delay: 1.6 
              }}
              className="group relative px-8 py-4 md:px-10 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-xs md:text-sm rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent w-full sm:w-auto"
            >
              <span className="relative z-10 group-hover:text-[#0B0B0F] transition-colors duration-500"><FadeText>{t('explore_hotel')}</FadeText></span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>

            <motion.button
              onClick={() => window.open('/menu', '_blank')}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 15, 
                delay: 1.7 
              }}
              className="group relative px-8 py-4 md:px-10 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-xs md:text-sm rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent w-full sm:w-auto"
            >
              <span className="relative z-10 group-hover:text-[#0B0B0F] transition-colors duration-500"><FadeText>{t('view_menu')}</FadeText></span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
              className="text-3xl md:text-5xl font-black text-brand-text uppercase tracking-tight"
            >
              <FadeText>
                {t('explore_menu_title')} <span className="text-brand-accent">{t('explore_menu_highlight')}</span>
              </FadeText>
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
                      <span className={`font-bold tracking-widest text-sm md:text-base ${activeCategory === cat.id ? 'text-brand-accent' : 'text-white/40 group-hover:text-white/70'}`}>
                        <FadeText>{cat.label[language]}</FadeText>
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
                    alt={item.title.en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <p className="text-brand-accent font-bold text-xl tracking-wide">
                      <FadeText>{item.title[language]}</FadeText>
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
              <span className="relative z-10 group-hover:text-[#0B0B0F] transition-colors duration-500"><FadeText>{t('view_full_menu')}</FadeText></span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
            <FadeText>{t('best_comfort_sub')}</FadeText>
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[#F5F1E8] text-4xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] md:leading-[0.85] tracking-tighter uppercase max-w-6xl mb-12 md:mb-16"
          >
            <FadeText>{t('best_comfort')}</FadeText><br />
            <FadeText>{t('best_comfort_2')}</FadeText>
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
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            
            <div className="absolute inset-0 flex items-end justify-center pb-12">
              <motion.button
                onClick={() => window.open('/explore', '_blank')}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent backdrop-blur-md"
              >
                <span className="relative z-10 flex items-center gap-3 group-hover:text-[#0B0B0F] transition-colors duration-500">
                  <FadeText>{t('explore_hotel')}</FadeText>
                  <Utensils className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </div>
          </motion.div>

          <div className="w-full border-t border-white/10 pt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-sm">
              <p className="text-[#F5F1E8]/60 text-sm leading-relaxed">
                <FadeText>{t('comfort_desc')}</FadeText>
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-start md:items-center">
              <span className="text-[#F5F1E8] text-4xl md:text-5xl font-black mb-2">4.2 ★</span>
              <span className="text-[#F5F1E8]/40 text-[10px] uppercase tracking-widest font-bold"><FadeText>{t('rating_text')}</FadeText></span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-start md:items-end">
              <span className="text-[#F5F1E8] text-4xl md:text-5xl font-black mb-2">₹200–400</span>
              <span className="text-[#F5F1E8]/40 text-[10px] uppercase tracking-widest font-bold"><FadeText>{t('cost_text')}</FadeText></span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highway Journey Section */}
      <HighwayJourneySection />

      {/* Interactive Distance Calculator Section */}
      <DistanceCalculatorSection />

      {/* Signature Dishes Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-[#0B0B0F] overflow-hidden">
        <FloatingElements />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#F5F1E8] text-4xl md:text-8xl font-black leading-tight uppercase tracking-tighter mb-6">
              <FadeText>{t('signature_flavours')}</FadeText>
            </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col">
                {SIGNATURE_DISHES.map((dish, index) => (
                  <DishMenuItem key={dish.id} dish={dish} index={index} activeDish={activeDish} setActiveDish={setActiveDish} language={language} />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 sticky top-32">
              <DishShowcase activeDish={activeDish} language={language} />
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
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-brand-text mb-4 leading-tight">
              <FadeText>{t('reviews_title')}</FadeText><br />
              <span className="text-brand-accent"><FadeText>{t('reviews_highlight')}</FadeText></span>
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 text-sm md:text-base max-w-2xl mx-auto font-medium tracking-wide"
            >
              <FadeText>{t('reviews_sub')}</FadeText>
            </motion.p>
          </motion.div>

          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center shrink-0 bg-[#111118] border border-white/5 p-8 rounded-2xl hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group"
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
                  <FadeText>{review.text[language]}</FadeText>
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
                  <span><FadeText>{t('google_review')}</FadeText></span>
                  <span><FadeText>{review.time}</FadeText></span>
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
              className="group relative px-10 py-4 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-widest text-xs rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent"
            >
              <span className="relative z-10 group-hover:text-[#0B0B0F] transition-colors duration-500"><FadeText>{t('view_all_reviews')}</FadeText></span>
              <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#F5F1E8] mb-4 leading-tight">
              <FadeText>{t('founders_title')}</FadeText><br />
              <span className="text-[#F5F1E8]"><FadeText>{t('founders_highlight')}</FadeText></span>
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#F5F1E8]/60 text-sm md:text-base italic tracking-wide"
            >
              <FadeText>{t('founders_sub')}</FadeText>
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 place-items-center">
            {LEADERSHIP.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative w-full max-w-sm"
              >
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-white/5 shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group-hover:-translate-y-2">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="text-center px-4">
                  <h3 className="text-2xl font-bold text-[#F5F1E8] uppercase tracking-wide mb-1">{leader.name}</h3>
                  <p className="text-[#F4A300] font-bold text-xs uppercase tracking-widest mb-4"><FadeText>{leader.role[language]}</FadeText></p>
                  <p className="text-[#F5F1E8]/50 text-sm leading-relaxed"><FadeText>{leader.description[language]}</FadeText></p>
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
