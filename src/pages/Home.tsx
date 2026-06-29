import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, animate, useMotionValue } from 'framer-motion';
import { Utensils, Star, MapPin, Clock, Phone, Mail, Map, Car, Navigation, BatteryCharging, Zap, Coffee, Soup, ChefHat, Leaf, Flame, Sparkles, Award, UtensilsCrossed, Heart, ChevronLeft, ChevronRight, ArrowRight, X } from 'lucide-react';
import { Footer } from '../components/Footer';
import { IMAGES } from '../../images';
import { Header } from '../components/Header';
import { useLanguage, FadeText } from '../LanguageContext';



const SIGNATURE_DISHES = [
  { id: 'solkadhi', label: { en: 'Solkadhi', mr: 'सोलकढी' }, subtitle: { en: 'REFRESHING DRINK', mr: 'ताजे पेय' }, description: { en: 'A cooling, digestive drink made from coconut milk and kokum, perfectly balancing tangy and creamy flavours.', mr: 'नारळाचे दूध आणि कोकम यापासून बनवलेले थंडगार, पाचक पेय.' }, icon: Coffee, image: IMAGES.menu.solkadhi },
  { id: 'taak', label: { en: 'Taak', mr: 'ताक' }, subtitle: { en: 'CLASSIC BEVERAGE', mr: 'पारंपारिक पेय' }, description: { en: 'Spiced Indian buttermilk churned to perfection, flavoured with cumin and fresh coriander.', mr: 'जिरे आणि ताजी कोथिंबीर घालून बनवलेले मसालेदार ताक.' }, icon: Coffee, image: IMAGES.menu.taak },
  { id: 'lassi', label: { en: 'Lassi', mr: 'लस्सी' }, subtitle: { en: 'SWEET DELIGHT', mr: 'गोड पेय' }, description: { en: 'Rich, thick, and creamy yogurt drink that serves as the perfect sweet companion to your meal.', mr: 'जेवणासोबत एक परिपूर्ण गोड साथीदार म्हणून काम करणारे जाडसर दही पेय.' }, icon: Coffee, image: IMAGES.menu.lassi },
  { id: 'misal', label: { en: 'Misal Pav', mr: 'मिसळ पाव' }, subtitle: { en: 'SPICY MAHARASHTRIAN', mr: 'झणझणीत महाराष्ट्रीयन' }, description: { en: 'A fiery curry made from sprouted moth beans, topped with crispy farsan, and served with soft pav.', mr: 'मोड आलेल्या मटकीची झणझणीत उसळ, फरसाण आणि मऊ पावासोबत.' }, icon: Soup, image: IMAGES.menu.misal },
  { id: 'biryani', label: { en: 'Chicken Biryani', mr: 'चिकन बिर्याणी' }, subtitle: { en: 'AROMATIC RICE', mr: 'सुगंधी भात' }, description: { en: 'A rich and aromatic preparation of basmati rice and marinated chicken slow-cooked with exotic spices.', mr: 'बासमती तांदूळ आणि मसालेदार चिकन एकत्र शिजवलेला सुगंधी भात.' }, icon: ChefHat, image: IMAGES.menu.biryani },
  { id: 'thali', label: { en: 'Maharashtrian Thali', mr: 'महाराष्ट्रीयन थाळी' }, subtitle: { en: 'MAHARASHTRIAN', mr: 'महाराष्ट्रीयन' }, description: { en: 'A wholesome platter that captures the true essence of Maharashtra. A perfect balance of flavours, textures and tradition.', mr: 'महाराष्ट्राचे खरे सार टिपणारे एक परिपूर्ण ताट. चव, पोत आणि परंपरा यांचा सुरेख संगम.' }, icon: UtensilsCrossed, image: IMAGES.menu.thali },
  { id: 'dal', label: { en: 'Dal Tadka', mr: 'दाल तडका' }, subtitle: { en: 'COMFORT FOOD', mr: 'आरामदायक जेवण' }, description: { en: 'Yellow lentils tempered with ghee, cumin, garlic, and red chilies for a smoky, earthy flavour.', mr: 'तूप, जिरे, लसूण आणि लाल मिरचीचा तडका दिलेले पिवळे वरण.' }, icon: Soup, image: IMAGES.menu.dal },
  { id: 'rice', label: { en: 'Jeera Rice', mr: 'जिरा राईस' }, subtitle: { en: 'FRAGRANT SIDES', mr: 'सुगंधी भात' }, description: { en: 'Fluffy basmati rice subtly flavoured with roasted cumin seeds and fresh coriander leaves.', mr: 'भाजलेले जिरे आणि कोथिंबीर घालून बनवलेला मऊ बासमती भात.' }, icon: Soup, image: IMAGES.menu.rice },
  { id: 'paneer', label: { en: 'Paneer Kabab', mr: 'पनीर कबाब' }, subtitle: { en: 'TANDOORI STARTER', mr: 'तंदुरी स्टार्टर' }, description: { en: 'Soft paneer cubes marinated in a spiced yogurt mixture and grilled to perfection in a tandoor.', mr: 'मसालेदार दह्यात मुरवलेले आणि तंदूरमध्ये भाजलेले मऊ पनीरचे तुकडे.' }, icon: ChefHat, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=800' },
  { id: 'butter', label: { en: 'Butter Chicken', mr: 'बटर चिकन' }, subtitle: { en: 'RICH CURRY', mr: 'समृद्ध रस्सा' }, description: { en: 'Tender chicken pieces simmered in a rich, creamy, and mildly spiced tomato gravy.', mr: 'मलईदार आणि किंचित मसालेदार टोमॅटोच्या ग्रेव्हीमध्ये शिजवलेले मऊ चिकनचे तुकडे.' }, icon: ChefHat, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
  { id: 'kolhapuri', label: { en: 'Kolhapuri Chicken', mr: 'कोल्हापुरी चिकन' }, subtitle: { en: 'FIERY REGIONAL', mr: 'झणझणीत प्रादेशिक' }, description: { en: 'A notoriously spicy and deeply flavourful chicken curry made with traditional Kolhapuri masala.', mr: 'पारंपारिक कोल्हापुरी मसाला वापरून बनवलेली अत्यंत झणझणीत आणि चविष्ट चिकन करी.' }, icon: Flame, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
];

const REVIEWS = [
  { id: 1, name: "Nistha Mukherjee", badge: "Local Guide · 16 reviews · 32 photos", rating: 5, text: { en: "Best place to stop by on the highway. They were not pet friendly yet they got us a table outside and made sure we were comfortable. Staffs are extremely professional and kind. Best part is the hygiene of the place.", mr: "महामार्गावर थांबण्यासाठी उत्तम ठिकाण. कर्मचारी अत्यंत व्यावसायिक आणि दयाळू आहेत. सर्वोत्तम भाग म्हणजे येथील स्वच्छता." }, time: "3 months ago" },
  { id: 2, name: "Sunny More", rating: 5, text: { en: "Best quality of food. Highly recommended. Must try.", mr: "जेवणाचा उत्कृष्ट दर्जा. अत्यंत शिफारसीय. नक्की वापरून पहा." }, time: "4 months ago" },
  { id: 3, name: "Pakhawaj Lover Mohite Omkar", badge: "Local Guide · 118 reviews", rating: 5, text: { en: "Nice experience with this hotel. Staff is good and service also good. I recommend everyone to try the Dilkhush Kabab at this place. It was awesome and tasty.", mr: "या हॉटेलचा चांगला अनुभव. कर्मचारी चांगले आहेत. येथील दिलखुश कबाब वापरून पाहण्याची शिफारस करतो." }, time: "2 weeks ago" },
  { id: 4, name: "Rahul Dhotre", rating: 5, text: { en: "One of the best restaurants to stop for food on the Mumbai–Goa Highway. The ambience is very good and well maintained. Great food with authentic taste.", mr: "मुंबई-गोवा महामार्गावर जेवणासाठी थांबण्यासाठी सर्वोत्तम रेस्टॉरंट्सपैकी एक. वातावरण खूप चांगले." }, time: "1 month ago" },
  { id: 5, name: "Santoshi Dalvi", rating: 5, text: { en: "Hotel Rajmudra offers outstanding food, impeccable cleanliness, and a serene ambience. The dishes are rich in flavor and beautifully presented.", mr: "हॉटेल राजमुद्रा उत्कृष्ट अन्न, निर्दोष स्वच्छता आणि शांत वातावरण देते." }, time: "1 month ago" },
  { id: 6, name: "Ankita G", badge: "Local Guide · 22 reviews", rating: 5, text: { en: "Food was very tasty. Neat and clean hotel with good ambience. Must recommend.", mr: "अन्न अतिशय चविष्ट होते. चांगल्या वातावरणासह नीटनेटके हॉटेल." }, time: "2 months ago" },
];

const LEADERSHIP = [
  { name: "Sunil More", role: { en: "Founder", mr: "संस्थापक" }, image: IMAGES.founder.sunil, description: { en: "The vision behind Hotel Rajmudra — bringing authentic Maharashtrian cuisine to travelers and families.", mr: "हॉटेल राजमुद्रा मागील दृष्टी — प्रवासी आणि कुटुंबांना अस्सल महाराष्ट्रीयन खाद्यपदार्थ पोहोचवणे." } },
  { name: "Gaurav More", role: { en: "CMD (Chairman & Managing Director)", mr: "CMD (अध्यक्ष आणि व्यवस्थापकीय संचालक)" }, image: IMAGES.founder.gaurav, description: { en: "Leading the brand with innovation, hospitality, and excellence in dining experiences.", mr: "नवीन उपक्रम, आदरातिथ्य आणि जेवणाच्या उत्कृष्ट अनुभवासह ब्रँडचे नेतृत्व करत आहेत." } },
  { name: "Sanket More", role: { en: "JMD (Joint Managing Director)", mr: "JMD (सह व्यवस्थापकीय संचालक)" }, image: IMAGES.founder.sanket, description: { en: "Driving the next generation of growth while preserving tradition and quality.", mr: "परंपरा आणि गुणवत्ता जपत पुढच्या पिढीच्या वाढीस चालना देत आहेत." } }
];

/* ── Realistic Botanical Leaf Decoration ────────────────── */
import leafImg from '../../images/image.png';

const MonsteraLeaf = ({ className = "", flip = false, rotate = 0, style = {} }: { className?: string, flip?: boolean, rotate?: number, style?: React.CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, x: flip ? 60 : -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className={`pointer-events-none select-none absolute z-30 ${className}`}
    style={{ ...style }}
  >
    <img
      src={leafImg}
      alt=""
      className="w-full h-full object-contain"
      style={{
        transform: `${flip ? 'scaleX(-1)' : ''} rotate(${rotate}deg)`,
        filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.5)) brightness(0.9) contrast(1.1)',
      }}
      loading="lazy"
    />
  </motion.div>
);

/* ── Animated Counter ──────────────────────────────────── */
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
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLine = R * c;
  
  // Account for GPS inaccuracies and coordinate offset. If within ~4km radius, consider it 0.
  if (straightLine < 4) return 0;
  
  // Multiply by 1.3 to approximate driving distance more accurately
  return Math.round(straightLine * 1.3);
};

import patternImg from '../../images/image copy.png';
import chefRecommendsImg from '../../images/image copy 4.png';
import kokanBeachImg from '../../images/kokan_beach_outline.png';

/* ── Pattern Divider ──────────────────────────────────────── */
const GoldDivider = () => (
  <img src={patternImg} alt="" className="h-[150px] md:h-[250px] w-auto object-contain brightness-150 contrast-150" />
);



/* ══════════════════════════════════════════════════════════
   SEAFOOD SECTION
   ══════════════════════════════════════════════════════════ */
const SeafoodSection = () => {
  const { language } = useLanguage();
  const seafoodItems = [
    { en: 'Pomfret Rava Tava Fry', mr: 'पापलेट रवा तवा फ्राय' },
    { en: 'Surmai Rava Tava Fry', mr: 'सुरमई रवा तवा फ्राय' },
    { en: 'Prawns Rava Tava Fry', mr: 'कोळंबी रवा तवा फ्राय' },
    { en: 'Prawns Koliwada', mr: 'कोळंबी कोळीवाडा' },
    { en: 'Prawns Masala Fry', mr: 'कोळंबी मसाला फ्राय' },
  ];

  return (
    <section className="relative py-24 md:py-40 px-6 md:px-12 bg-[#080c0d] overflow-hidden border-t border-b border-gold-accent/10">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src={kokanBeachImg} 
          alt="Konkan Coast Background" 
          className="w-full h-full object-cover opacity-40 md:opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080c0d] via-transparent to-[#080c0d]" />
        <div className="absolute inset-0 bg-[#080c0d]/70 backdrop-blur-[2px]" />
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-accent/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Top Text */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center">
          <p className="text-gold-accent text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-4">
            <FadeText>Coastal Delicacies</FadeText>
          </p>
          <h2 className="font-display text-cream text-5xl md:text-7xl font-light italic leading-[1.1] mb-6 drop-shadow-lg">
            Fresh Catch<br />
            <span className="text-gold-accent">From Konkan</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold-accent/40 mb-8" />
          <p className="text-cream/70 text-base md:text-lg font-sans font-light leading-[1.8] mb-16 max-w-2xl">
            <FadeText>We bring the authentic taste of the Konkan coast straight to your plate. Enjoy our premium selection of fresh seafood, marinated in traditional spices and perfectly fried.</FadeText>
          </p>
        </motion.div>

        {/* Menu Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-gold-accent/20 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group hover:border-gold-accent/40 transition-colors duration-500">
          <div className="absolute -right-10 -top-10 text-gold-accent/5 rotate-12 pointer-events-none">
             <span className="text-9xl">🐟</span>
          </div>
          <h3 className="text-gold-accent font-sans text-[11px] font-bold uppercase tracking-[0.3em] mb-8 pb-5 border-b border-gold-accent/20">Seafood Specialties</h3>
          <ul className="space-y-6 relative z-10 text-left pl-0 md:pl-8">
            {seafoodItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-6 group/item">
                <div className="w-2 h-2 rounded-full border border-gold-accent/50 group-hover/item:bg-gold-accent transition-colors shrink-0 shadow-[0_0_8px_rgba(200,163,95,0.5)]" />
                <span className="text-cream/90 font-display text-2xl md:text-3xl italic group-hover/item:text-gold-accent transition-colors drop-shadow-md">
                  <FadeText>{item[language as keyof typeof item]}</FadeText>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════
   DISTANCE CALCULATOR SECTION
   ══════════════════════════════════════════════════════════ */
const DistanceCalculatorSection = () => {
  const { language, t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [autoDistance, setAutoDistance] = useState<number | null>(null);

  const TRAVEL_DATA: Record<string, { distance: number, timeKey: string, nameKey: string, msgKey: string }> = {
    mumbai: { distance: 195, timeKey: 'time_mumbai_full', nameKey: 'mumbai', msgKey: 'msg_mumbai' },
    pune: { distance: 135, timeKey: 'time_pune', nameKey: 'pune', msgKey: 'msg_pune' },
    mahad: { distance: 17, timeKey: 'time_mahad', nameKey: 'mahad', msgKey: 'msg_mahad' },
    goa: { distance: 390, timeKey: 'time_goa_full', nameKey: 'goa', msgKey: 'msg_goa' }
  };

  const activeData = selectedCity ? TRAVEL_DATA[selectedCity] : null;

  useEffect(() => {
    setLocationStatus('loading');
    if (!navigator.geolocation) { setLocationStatus('error'); return; }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dist = calculateDistance(position.coords.latitude, position.coords.longitude, 17.9853, 73.4514);
        setAutoDistance(dist);
        setLocationStatus('success');
      },
      () => setLocationStatus('error'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  const getSmartMessage = (dist: number) => {
    if (dist < 20) return 'dist_close_msg';
    if (dist <= 80) return 'dist_mid_msg';
    return 'dist_far_msg';
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-forest-mid relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gold-accent text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-4">
            <FadeText>{t('calc_sub')}</FadeText>
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-cream text-4xl md:text-6xl font-light italic leading-[1.1]">
            <FadeText>{t('calc_title_1')}</FadeText><br />
            <span className="text-gold-accent"><FadeText>{t('calc_title_2')}</FadeText></span>
          </motion.h2>
        </div>

        {locationStatus === 'loading' && (
          <div className="text-center text-cream/50 py-10 animate-pulse">
            <MapPin className="w-8 h-8 mx-auto mb-4 opacity-50" />
            <p className="tracking-widest uppercase text-sm font-sans"><FadeText>{t('detecting_loc')}</FadeText></p>
          </div>
        )}

        {locationStatus === 'success' && autoDistance !== null && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="bg-forest-light border border-gold-accent/15 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gold-accent/10 rounded-full flex items-center justify-center">
                <Car className="w-8 h-8 text-gold-accent" />
              </div>
            </div>
            <div className="text-xl md:text-3xl font-display italic text-cream mb-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
              <span><FadeText>{t('you_are')}</FadeText></span>
              <span className="text-gold-accent text-5xl md:text-6xl my-2 md:my-0 flex items-baseline gap-1 not-italic font-bold">
                <AnimatedCounter value={autoDistance} />
                <span className="text-xl md:text-2xl text-gold-accent/60 lowercase font-sans">km</span>
              </span>
              <span><FadeText>{t('away_from')}</FadeText></span>
            </div>
            <div className="bg-gold-accent/10 border border-gold-accent/20 rounded-xl py-4 px-6 mb-10 inline-block">
              <p className="text-gold-accent font-sans font-medium text-sm tracking-wide flex items-center gap-3">
                <Star className="w-4 h-4 fill-gold-accent flex-shrink-0" />
                <FadeText>{t(getSmartMessage(autoDistance) as any)}</FadeText>
              </p>
            </div>
            <div>
              <button onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')} className="inline-flex items-center gap-3 px-8 py-3 border border-gold-accent/40 text-gold-accent font-sans text-[12px] font-medium uppercase tracking-[0.2em] rounded-full hover:bg-gold-accent hover:text-deep-forest transition-all duration-500">
                <Navigation className="w-4 h-4" /> <FadeText>{t('get_directions')}</FadeText>
              </button>
            </div>
          </motion.div>
        )}

        {(locationStatus === 'error' || locationStatus === 'idle') && (
          <div>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {Object.entries(TRAVEL_DATA).map(([key, data]) => (
                <button key={key} onClick={() => setSelectedCity(key)} className={`px-6 py-3 border rounded-full font-sans text-[12px] font-medium uppercase tracking-[0.15em] transition-all duration-300 ${selectedCity === key ? 'bg-gold-accent text-deep-forest border-gold-accent' : 'border-gold-accent/30 text-cream/60 hover:text-cream hover:border-gold-accent/60'}`}>
                  <FadeText>{t(data.nameKey as any)}</FadeText>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeData && (
                <motion.div key={selectedCity} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-forest-light border border-gold-accent/15 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
                  <div className="text-gold-accent text-5xl md:text-7xl font-display italic mb-4">
                    {activeData.distance} <span className="text-2xl font-sans not-italic text-gold-accent/60">km</span>
                  </div>
                  <p className="text-cream/60 text-sm font-sans mb-2"><FadeText>{t(activeData.timeKey as any)}</FadeText></p>
                  <p className="text-cream/40 text-xs font-sans italic mb-8"><FadeText>{t(activeData.msgKey as any)}</FadeText></p>
                  <button onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hotel+Rajmudra+Poladpur', '_blank')} className="inline-flex items-center gap-3 px-8 py-3 border border-gold-accent/40 text-gold-accent font-sans text-[12px] font-medium uppercase tracking-[0.2em] rounded-full hover:bg-gold-accent hover:text-deep-forest transition-all duration-500">
                    <Navigation className="w-4 h-4" /> <FadeText>{t('get_directions')}</FadeText>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════
   EV PUMP SECTION
   ══════════════════════════════════════════════════════════ */
const EVPumpSection = () => {
  const { language, t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setActiveImage(i => (i + 1) % IMAGES.evPump.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-deep-forest relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-gold-accent text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-4">
              <FadeText>{t('ev_kicker')}</FadeText>
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6">
              <FadeText>{t('ev_headline')}</FadeText>
            </motion.h2>
            
            <motion.div initial={{ opacity: 0, width: 0 }} whileInView={{ opacity: 1, width: 64 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="h-[2px] bg-gold-accent/40 mb-8" />
            
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-cream/60 text-base font-sans leading-relaxed mb-10 max-w-lg">
              <FadeText>{t('ev_body')}</FadeText>
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-col gap-5 mb-12">
              {[t('ev_spec_1'), t('ev_spec_2'), t('ev_spec_3')].map((spec, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-gold-accent" />
                  </div>
                  <span className="text-cream/80 text-sm font-sans tracking-wide"><FadeText>{spec}</FadeText></span>
                </div>
              ))}
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gold-accent/10 border border-gold-accent/30 text-gold-accent font-sans text-[11px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(200,163,95,0.15)]">
                <BatteryCharging className="w-4 h-4" />
                <FadeText>{t('ev_tagline')}</FadeText>
              </div>
            </motion.div>
          </div>

          {/* Right Image Content - 3D Curved Carousel */}
          <div 
            className="w-full lg:w-1/2 relative h-[600px] lg:h-[800px] flex items-center justify-center overflow-visible mt-12 lg:mt-0"
            style={{ perspective: 1400 }}
          >
            {IMAGES.evPump.map((img, index) => {
              // Calculate relative position (shortest path)
              let diff = index - activeImage;
              const len = IMAGES.evPump.length;
              if (diff > len / 2) diff -= len;
              if (diff < -len / 2) diff += len;

              const isActive = diff === 0;
              const isNext = diff === 1;
              const isPrev = diff === -1;
              const isHidden = Math.abs(diff) > 1;
              
              let x = 0;
              let z = -400;
              let rotateY = 0;
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                x = 0;
                z = 0;
                rotateY = 0;
                opacity = 1;
                zIndex = 10;
              } else if (isNext) {
                x = window.innerWidth < 768 ? 100 : 220; // Move right
                z = -200;
                rotateY = -40;
                opacity = 0.5;
                zIndex = 5;
              } else if (isPrev) {
                x = window.innerWidth < 768 ? -100 : -220; // Move left
                z = -200;
                rotateY = 40;
                opacity = 0.5;
                zIndex = 5;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute w-[300px] md:w-[400px] lg:w-[500px] xl:w-[550px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)] border border-white/10 cursor-pointer"
                  initial={false}
                  animate={{
                    x,
                    z,
                    rotateY,
                    opacity,
                    zIndex,
                    pointerEvents: isHidden ? 'none' : 'auto'
                  }}
                  transition={{ duration: 1.2, type: "spring", stiffness: 70, damping: 25, mass: 1.2 }}
                  onClick={() => {
                    if (!isHidden) {
                      if (isActive) setSelectedImage(img);
                      else setActiveImage(index);
                    }
                  }}
                >
                  <img
                    src={img}
                    alt={`EV Charging ${index}`}
                    className="w-full h-full object-contain bg-black/20"
                    referrerPolicy="no-referrer"
                  />
                  {!isActive && <div className="absolute inset-0 bg-black/40 transition-colors duration-500 hover:bg-black/20" />}
                </motion.div>
              );
            })}
            
            {/* Pagination Dots */}
            <div className="absolute bottom-[-20px] md:bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {IMAGES.evPump.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)} 
                  className={`h-2 transition-all duration-300 rounded-full ${activeImage === i ? 'bg-gold-accent w-8' : 'bg-cream/40 hover:bg-cream/80 w-2'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full hover:bg-black/40 backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
              src={selectedImage}
              alt="Fullscreen View"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent click on image from closing modal
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ── Dish List Item ──────────────────────────────────────── */
const DishMenuItem = ({ dish, index, activeDish, setActiveDish, language }: any) => {
  const isActive = activeDish.id === dish.id;
  const Icon = dish.icon;
  
  return (
    <motion.button
      onClick={() => setActiveDish(dish)}
      className={`w-full text-left py-4 px-6 flex items-center justify-between group transition-all duration-300 ${
        isActive 
          ? 'bg-gold-accent text-deep-forest rounded-full shadow-lg shadow-gold-accent/20' 
          : 'border-b border-cream/5 hover:bg-white/5 hover:rounded-xl text-cream/70'
      }`}
      whileHover={isActive ? {} : { x: 8 }}
    >
      <div className="flex items-center gap-4">
        <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-deep-forest' : 'text-gold-accent/70 group-hover:text-gold-accent'}`} />
        <span className={`font-display text-xl transition-colors ${isActive ? 'font-medium' : 'group-hover:text-cream'}`}>
          <FadeText>{dish.label[language]}</FadeText>
        </span>
      </div>
      <span className={`text-xs font-sans tracking-widest transition-colors ${isActive ? 'font-bold opacity-70' : 'opacity-40 group-hover:opacity-60'}`}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.button>
  );
};

/* ── Dish Showcase ──────────────────────────────────────── */
const DishShowcase = ({ activeDish, language, onNext, onPrev }: any) => {
  const { t } = useLanguage();
  return (
    <div className="relative group/showcase">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDish.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[2rem] overflow-hidden bg-[#0a1011] border border-white/5 flex flex-col md:flex-row shadow-2xl"
        >
          {/* Left Text Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center z-10">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gold-accent text-[10px] font-sans font-semibold uppercase tracking-[0.3em] mb-3">
              <FadeText>{activeDish.subtitle[language]}</FadeText>
            </motion.p>
            <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display text-4xl md:text-5xl text-cream mb-4">
              <FadeText>{activeDish.label[language]}</FadeText>
            </motion.h3>
            
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 48 }} transition={{ delay: 0.4 }} className="h-[2px] bg-gold-accent/40 mb-6" />
            
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-cream/60 font-sans text-sm leading-relaxed mb-10 max-w-sm">
              <FadeText>{activeDish.description[language]}</FadeText>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center gap-6 mb-12">
              <div className="flex flex-col items-center gap-2">
                <Leaf className="w-6 h-6 text-gold-accent/80 stroke-[1.5]" />
                <span className="text-[9px] text-cream/50 uppercase tracking-widest text-center">Fresh<br/>Ingredients</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Soup className="w-6 h-6 text-gold-accent/80 stroke-[1.5]" />
                <span className="text-[9px] text-cream/50 uppercase tracking-widest text-center">Traditional<br/>Recipe</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Flame className="w-6 h-6 text-gold-accent/80 stroke-[1.5]" />
                <span className="text-[9px] text-cream/50 uppercase tracking-widest text-center">Authentic<br/>Flavours</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image Content */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1011] via-[#0a1011]/50 to-transparent z-10 md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1011] via-[#0a1011]/50 to-transparent z-10 md:hidden block" />
            <img src={activeDish.image} alt={activeDish.label.en} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" loading="lazy" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-deep-forest border border-gold-accent/30 rounded-full flex items-center justify-center text-gold-accent hover:bg-gold-accent hover:text-deep-forest transition-colors z-20 opacity-0 group-hover/showcase:opacity-100 shadow-xl hidden md:flex">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={onNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-deep-forest border border-gold-accent/30 rounded-full flex items-center justify-center text-gold-accent hover:bg-gold-accent hover:text-deep-forest transition-colors z-20 opacity-0 group-hover/showcase:opacity-100 shadow-xl hidden md:flex">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

/* ── Signature Features ──────────────────────────────────────── */
const SignatureFeatures = () => {
  const features = [
    { icon: Award, title: "Authentic Recipes", desc: "Time-honoured Maharashtrian recipes passed down generations." },
    { icon: UtensilsCrossed, title: "Premium Ingredients", desc: "We use the finest ingredients and traditional spices." },
    { icon: ChefHat, title: "Expertly Crafted", desc: "Prepared with care by our expert chefs." },
    { icon: Heart, title: "Loved by Many", desc: "Our guests' favourites for years." }
  ];

  return (
    <div className="w-full bg-[#0a1011] border border-white/5 rounded-[2rem] p-8 md:p-12 mt-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-2xl">
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <div key={i} className="flex gap-5 flex-1 w-full">
            <div className="flex-shrink-0">
              <Icon className="w-8 h-8 text-gold-accent stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-gold-accent font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{feature.title}</h4>
              <p className="text-cream/50 font-sans text-xs leading-relaxed max-w-[200px]">{feature.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   MAIN HOME COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function Home() {
  const [activeDish, setActiveDish] = useState(SIGNATURE_DISHES[0]);
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('hotel_name')} | ${t('nav_home')}`;
  }, [t]);

  return (
    <div className="relative min-h-screen bg-deep-forest font-sans selection:bg-gold-accent selection:text-deep-forest overflow-x-hidden">
      <Header />

      {/* ═══════════════════════════════════════════════════
          SECTION 1: HERO — Photo Collage + Headline
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-deep-forest overflow-visible">
        {/* Monstera leaves popping out from edges */}
        <MonsteraLeaf className="-right-32 top-[10%] w-[600px] h-[900px] hidden lg:block z-40" flip rotate={-45} />
        <MonsteraLeaf className="-left-32 bottom-[5%] w-[500px] h-[750px] hidden lg:block z-40" rotate={75} />

        {/* Single Full-Screen Hero Image */}
        <div className="relative w-full h-screen">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
            <img src={IMAGES.hero.main} alt="Hotel Rajmudra Hero" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="eager" />
            <div className="absolute inset-0 bg-deep-forest/40" />
          </motion.div>

          {/* Gradient overlays for smooth transitions to the next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/70 via-transparent to-deep-forest pointer-events-none" />

          {/* Headline overlaid on the image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pt-20">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="text-gold-accent text-[11px] md:text-[13px] font-sans font-medium uppercase tracking-[0.4em] mb-6">
              <FadeText>More Flavor For Less</FadeText>
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1 }} className="font-display text-cream font-light italic leading-[0.95] mb-8" style={{ fontSize: 'clamp(48px, 10vw, 120px)' }}>
              <FadeText>{t('hero_title')}</FadeText>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }} className="text-cream/60 text-sm md:text-base font-sans font-light max-w-xl leading-relaxed mb-8">
              <FadeText>{t('hero_subtitle')}</FadeText>
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.5 }} className="flex items-center justify-center gap-4 mb-10">
              <div className="flex items-center gap-2 px-5 py-2 bg-black/30 backdrop-blur-md border border-green-500/30 rounded-full">
                <div className="w-4 h-4 border-2 border-green-500 p-0.5 flex items-center justify-center rounded-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <span className="text-green-400 font-sans text-[11px] font-semibold uppercase tracking-[0.15em]">Veg</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2 bg-black/30 backdrop-blur-md border border-red-500/30 rounded-full">
                <div className="w-4 h-4 border-2 border-red-500 p-0.5 flex items-center justify-center rounded-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                </div>
                <span className="text-red-400 font-sans text-[11px] font-semibold uppercase tracking-[0.15em]">Non-Veg</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.6 }}>
              <button onClick={() => window.location.href = '/menu'} className="px-10 py-3 border border-gold-accent/50 text-gold-accent font-sans text-[12px] font-medium uppercase tracking-[0.25em] rounded-none hover:bg-gold-accent hover:text-deep-forest transition-all duration-500">
                <FadeText>{t('view_menu')}</FadeText>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Gold divider line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: EDITORIAL SPLIT — Image + Text
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6 md:px-12 bg-deep-forest overflow-hidden">
        <MonsteraLeaf className="-right-40 top-10 w-[550px] h-[825px] hidden md:block" flip rotate={-80} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Tall Image */}
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={IMAGES.comfort} alt="Hotel Rajmudra Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3s]" referrerPolicy="no-referrer" loading="lazy" />
            </div>
            {/* Floating rating badge */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -bottom-6 -right-6 bg-forest-mid border border-gold-accent/20 px-6 py-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gold-accent fill-gold-accent" />
                <span className="text-cream font-display text-2xl italic">4.8</span>
              </div>
              <p className="text-cream/40 text-[9px] font-sans uppercase tracking-[0.15em] mt-1">Google Rating</p>
            </motion.div>
          </motion.div>

          {/* Right: Editorial Text */}
          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}>
            <p className="text-gold-accent text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-6">
              <FadeText>{t('best_comfort_sub')}</FadeText>
            </p>
            <h2 className="font-display text-cream text-3xl md:text-5xl font-light leading-[1.2] mb-8">
              <FadeText>{t('hotel_name')}</FadeText> is a premium taste that yearns to be <em className="text-gold-accent">savored</em>, authentic flavors between your <em className="text-gold-accent">senses</em>
            </h2>
            <div className="my-8">
              <GoldDivider />
            </div>
            <p className="text-cream/60 text-base font-sans font-light leading-[1.8] mb-10 max-w-lg">
              <FadeText>{t('comfort_desc')}</FadeText>
            </p>
            <div className="flex items-center gap-8 text-sm font-sans">
              <div>
                <span className="text-cream text-3xl font-display italic">4.2 ★</span>
                <p className="text-cream/40 text-[10px] uppercase tracking-widest mt-1"><FadeText>{t('rating_text')}</FadeText></p>
              </div>
              <div className="w-[1px] h-12 bg-gold-accent/20" />
              <div>
                <span className="text-cream text-3xl font-display italic">₹200–400</span>
                <p className="text-cream/40 text-[10px] uppercase tracking-widest mt-1"><FadeText>{t('cost_text')}</FadeText></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: CHEF RECOMMENDS — Text + Image
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 px-6 md:px-12 bg-forest-mid overflow-hidden">
        <MonsteraLeaf className="-left-40 bottom-10 w-[500px] h-[750px] hidden md:block" rotate={35} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <p className="text-gold-accent text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-4">
              <FadeText>Delight in Every Bite</FadeText>
            </p>
            <h2 className="font-display text-cream text-4xl md:text-6xl font-light italic leading-[1.1] mb-6">
              Our Chef<br />Recommends
            </h2>
            <p className="text-cream/60 text-base font-sans font-light leading-[1.8] mb-10 max-w-md">
              <FadeText>Experience our signature Chicken Dilkhush Kabab, a mouthwatering delicacy made with perfectly spiced, tender pieces of meat roasted to perfection. A truly unforgettable culinary journey and our chef's top recommendation.</FadeText>
            </p>
            <div className="w-16 h-[1px] bg-gold-accent/40 mb-8" />
            <button onClick={() => window.open('/menu', '_blank')} className="px-10 py-3 border border-gold-accent/50 text-gold-accent font-sans text-[12px] font-medium uppercase tracking-[0.25em] rounded-none hover:bg-gold-accent hover:text-deep-forest transition-all duration-500">
              <FadeText>{t('view_menu')}</FadeText>
            </button>
          </motion.div>

          {/* Right: Feature Dish Image */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="relative flex justify-center items-center h-full">
            <img src={chefRecommendsImg} alt="Chicken Dilkhush Kabab" className="w-full h-auto object-contain scale-[1.35] lg:scale-[1.2] origin-left" referrerPolicy="no-referrer" loading="lazy" />
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          SECTION 5: SIGNATURE DISHES
          ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-deep-forest overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gold-accent text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-4">
              <FadeText>Authentic Recipes</FadeText>
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-cream text-5xl md:text-7xl font-light">
              <FadeText>{t('signature_flavours')}</FadeText>
            </motion.h2>
            <div className="flex items-center justify-center gap-4 mt-6 mb-4">
              <div className="w-12 h-[1px] bg-gold-accent/40" />
              <Sparkles className="w-4 h-4 text-gold-accent/60" />
              <div className="w-12 h-[1px] bg-gold-accent/40" />
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-cream/50 font-sans text-sm max-w-xl mx-auto">
              <FadeText>A curated selection of our most loved dishes, crafted with authentic spices and time-honoured recipes.</FadeText>
            </motion.p>
          </div>

          <div className="flex flex-col xl:flex-row gap-12 items-start">
            {/* Left Glassmorphic Menu */}
            <div className="w-full xl:w-[350px] flex-shrink-0 bg-black/20 backdrop-blur-md border border-white/5 rounded-3xl p-4 shadow-2xl">
              <div className="max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                {SIGNATURE_DISHES.map((dish, index) => (
                  <DishMenuItem key={dish.id + index} dish={dish} index={index} activeDish={activeDish} setActiveDish={setActiveDish} language={language} />
                ))}
              </div>
            </div>
            
            {/* Right Showcase Card */}
            <div className="w-full flex-grow">
              <DishShowcase 
                activeDish={activeDish} 
                language={language} 
                onNext={() => {
                  const idx = SIGNATURE_DISHES.findIndex(d => d.id === activeDish.id);
                  setActiveDish(SIGNATURE_DISHES[(idx + 1) % SIGNATURE_DISHES.length]);
                }}
                onPrev={() => {
                  const idx = SIGNATURE_DISHES.findIndex(d => d.id === activeDish.id);
                  setActiveDish(SIGNATURE_DISHES[(idx - 1 + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length]);
                }}
              />
              
              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {SIGNATURE_DISHES.map((dish) => (
                  <button 
                    key={dish.id} 
                    onClick={() => setActiveDish(dish)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${activeDish.id === dish.id ? 'bg-gold-accent w-6' : 'bg-cream/20 hover:bg-cream/40 w-1.5'}`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Features Card */}
          <SignatureFeatures />
        </div>
      </section>


      {/* Seafood Specialties */}
      <SeafoodSection />

      {/* Distance Calculator */}
      <DistanceCalculatorSection />

      {/* EV Charging */}
      <EVPumpSection />

      {/* ═══════════════════════════════════════════════════
          REVIEWS SECTION
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0a1011] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          {/* Header & Rating Summary */}
          <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between mb-16 md:mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl text-left">
              <p className="text-gold-accent text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-4">What Our Guests Say</p>
              <h2 className="font-display text-cream text-4xl md:text-6xl font-light italic mb-2">
                <FadeText>{t('reviews_title')}</FadeText><br />
                <span className="text-gold-accent"><FadeText>{t('reviews_highlight')}</FadeText></span>
              </h2>
            </motion.div>
            
            {/* Rating Summary Box */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-center gap-6 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="text-center">
                <span className="font-display text-5xl text-gold-accent">4.9</span>
                <span className="text-cream/50 text-xl font-sans block mt-1">/ 5</span>
              </div>
              <div className="w-[1px] h-16 bg-white/10" />
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-gold-accent fill-gold-accent drop-shadow-[0_0_8px_rgba(200,163,95,0.5)]" />
                  ))}
                </div>
                <p className="text-cream/70 text-sm font-sans">Based on <span className="text-cream font-medium">500+</span> Google Reviews</p>
              </div>
            </motion.div>
          </div>

          {/* Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={review.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.6 }} 
                className={`relative bg-black/20 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:border-gold-accent/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col group ${i % 3 === 1 ? 'lg:mt-12' : ''} ${i % 3 === 2 ? 'lg:mt-24' : ''}`}
              >
                {/* Gold Quotation Watermark */}
                <div className="absolute top-4 right-8 text-gold-accent/5 font-display text-9xl leading-none italic pointer-events-none group-hover:text-gold-accent/10 transition-colors duration-500">
                  "
                </div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-accent/20 to-gold-accent/5 border border-gold-accent/20 flex items-center justify-center text-gold-accent font-display text-2xl italic shadow-lg">
                      {review.name[0]}
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-cream text-base">{review.name}</h4>
                      {review.badge && <p className="text-[10px] text-cream/50 font-sans mt-1 tracking-wider uppercase">{review.badge.split('·')[0]}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-gold-accent fill-gold-accent' : 'text-cream/10'}`} />
                  ))}
                </div>

                <p className="text-cream/80 text-[15px] font-sans font-light leading-[1.8] mb-8 flex-grow italic relative z-10">
                  "<FadeText>{review.text[language]}</FadeText>"
                </p>
                
                <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-sans text-cream/40 uppercase tracking-widest relative z-10 group-hover:border-gold-accent/20 transition-colors duration-500">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold-accent" /><FadeText>{t('google_review')}</FadeText></span>
                  <span><FadeText>{review.time}</FadeText></span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 lg:mt-32 text-center">
            <button onClick={() => window.open('https://www.google.com/search?q=hotel+rajmudra+poladpur+reviews', '_blank')} className="px-10 py-4 bg-transparent border border-gold-accent/50 text-gold-accent font-sans text-[12px] font-bold uppercase tracking-[0.25em] rounded-full hover:bg-gold-accent hover:text-deep-forest hover:shadow-[0_0_30px_rgba(200,163,95,0.4)] transition-all duration-500">
              <FadeText>{t('view_all_reviews')}</FadeText>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOUNDERS SECTION (Redesigned)
          ═══════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 px-6 md:px-12 bg-[#080c0d] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-accent/5 via-[#080c0d]/80 to-[#080c0d] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-accent/10 rounded-full blur-[150px] pointer-events-none" />
        
        {/* Floating Botanical Leaves */}
        <MonsteraLeaf className="-left-40 top-32 w-[600px] h-[900px] hidden lg:block opacity-40" rotate={35} />
        <MonsteraLeaf className="-right-32 bottom-0 w-[500px] h-[750px] hidden lg:block opacity-40" flip rotate={-15} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24 lg:mb-32">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold-accent/60" />
              <Star className="w-5 h-5 text-gold-accent/80 fill-gold-accent/20" />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold-accent/60" />
            </div>
            <h2 className="font-display text-cream text-5xl md:text-7xl font-light italic mb-6 tracking-wide drop-shadow-xl">
              <FadeText>{t('founders_title')}</FadeText><br />
              <span className="text-gold-accent"><FadeText>{t('founders_highlight')}</FadeText></span>
            </h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-cream/60 text-base md:text-lg font-sans font-light leading-[1.8] max-w-2xl mx-auto mt-8 relative">
              <span className="absolute -top-4 -left-6 text-gold-accent/20 font-display text-6xl">"</span>
              <FadeText>{t('founders_sub')}</FadeText>
              <span className="absolute -bottom-6 -right-2 text-gold-accent/20 font-display text-6xl">"</span>
            </motion.p>
          </motion.div>

          {/* Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {LEADERSHIP.map((leader, i) => (
              <motion.div 
                key={leader.name} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8, delay: i * 0.2 }} 
                className={`relative group ${i === 1 ? 'lg:mt-24' : ''} ${i === 2 ? 'lg:mt-12' : ''}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-[#0a1011] border border-white/5 hover:border-gold-accent/40 transition-colors duration-700 shadow-2xl">
                  {/* Image */}
                  <img src={leader.image} alt={leader.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" loading="lazy" />
                  
                  {/* Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1011] via-[#0a1011]/50 to-transparent opacity-90 lg:opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gold-accent/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Content Overlays */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="transform lg:translate-y-16 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                      <div className="inline-flex items-center justify-center px-4 py-1.5 border border-gold-accent/30 bg-black/40 backdrop-blur-md rounded-full mb-5 shadow-lg">
                        <span className="text-gold-accent font-sans text-[9px] font-bold uppercase tracking-[0.25em]"><FadeText>{leader.role[language]}</FadeText></span>
                      </div>
                      
                      <h3 className="text-cream font-display text-3xl md:text-4xl italic mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {leader.name}
                      </h3>
                      
                      <div className="h-[2px] w-12 bg-gold-accent/60 mb-5 transform origin-left scale-x-100 lg:scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />
                      
                      <p className="text-cream/80 text-sm font-sans font-light leading-relaxed opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 drop-shadow-md">
                        <FadeText>{leader.description[language]}</FadeText>
                      </p>
                    </div>
                  </div>
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
