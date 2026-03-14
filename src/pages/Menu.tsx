import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Utensils, Star, CheckCircle2, ChevronRight, ArrowRight, Search } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useLanguage, FadeText } from '../LanguageContext';

const MENU_DATA = [
  {
    category: { en: 'Starters', mr: 'स्टार्टर्स' },
    id: 'starters',
    items: [
      { name: { en: 'Dilkhush Kabab', mr: 'दिलखुश कबाब' }, description: { en: 'Juicy grilled kababs with rich spices.', mr: 'समृद्ध मसाल्यांसह रसाळ ग्रिल्ड कबाब.' }, price: '₹320', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Chicken Tikka', mr: 'चिकन टिक्का' }, description: { en: 'Tender chicken pieces marinated in spices and grilled.', mr: 'मसाल्यात मॅरीनेट केलेले मऊ चिकनचे तुकडे.' }, price: '₹280', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Paneer Tikka', mr: 'पनीर टिक्का' }, description: { en: 'Marinated paneer grilled in tandoor.', mr: 'तंदूरमध्ये ग्रिल केलेले मॅरीनेट केलेले पनीर.' }, price: '₹240', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Veg Hara Bhara Kabab', mr: 'व्हेज हरा भरा कबाब' }, description: { en: 'Healthy and delicious spinach and pea patties.', mr: 'आरोग्यदायी आणि चविष्ट पालक आणि मटार पॅटीस.' }, price: '₹210', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Chicken Lollipop', mr: 'चिकन लॉलीपॉप' }, description: { en: 'Deep fried chicken wings served with schezwan sauce.', mr: 'शेजवान चटणीसोबत सर्व्ह केलेले तळलेले चिकन विंग्स.' }, price: '₹260', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Fish Koliwada', mr: 'फिश कोळीवाडा' }, description: { en: 'Traditional spice-marinated fried fish.', mr: 'पारंपारिक मसाल्यात मॅरीनेट केलेले तळलेले मासे.' }, price: '₹350', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: { en: 'Veg Main Course', mr: 'शाकाहारी मुख्य कोर्स' },
    id: 'veg-main',
    items: [
      { name: { en: 'Veg Kolhapuri', mr: 'व्हेज कोल्हापुरी' }, description: { en: 'Spicy Maharashtrian vegetable curry.', mr: 'मसालेदार महाराष्ट्रीयन भाजीची करी.' }, price: '₹220', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Paneer Butter Masala', mr: 'पनीर बटर मसाला' }, description: { en: 'Paneer cooked in creamy tomato gravy.', mr: 'क्रीमी टोमॅटो ग्रेव्हीमध्ये शिजवलेले पनीर.' }, price: '₹260', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Dal Tadka', mr: 'दाल तडका' }, description: { en: 'Yellow lentils tempered with spices.', mr: 'मसाल्यांनी फोडणी दिलेली पिवळी डाळ.' }, price: '₹180', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Baingan Bharta', mr: 'वांग्याचं भरीत' }, description: { en: 'Smoky roasted eggplant mash with spices.', mr: 'मसाल्यांसह भाजलेले वांग्याचे भरीत.' }, price: '₹190', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Mutter Paneer', mr: 'मटार पनीर' }, description: { en: 'Peas and paneer in a rich tomato base.', mr: 'समृद्ध टोमॅटो बेसमध्ये मटार आणि पनीर.' }, price: '₹240', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Mix Veg Curry', mr: 'मिक्स व्हेज करी' }, description: { en: 'Seasonal vegetables in a balanced gravy.', mr: 'संतुलित ग्रेव्हीमध्ये हंगामी भाज्या.' }, price: '₹200', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: { en: 'Non-Veg Main Course', mr: 'मांसाहारी मुख्य कोर्स' },
    id: 'non-veg-main',
    items: [
      { name: { en: 'Kolhapuri Chicken', mr: 'कोल्हापुरी चिकन' }, description: { en: 'Authentic spicy chicken curry.', mr: 'अस्सल मसालेदार चिकन करी.' }, price: '₹320', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Butter Chicken', mr: 'बटर चिकन' }, description: { en: 'Classic creamy tomato chicken gravy.', mr: 'क्रीमी टोमॅटो चिकन ग्रेव्ही.' }, price: '₹350', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Chicken Masala', mr: 'चिकन मसाला' }, description: { en: 'Traditional flavorful chicken curry.', mr: 'पारंपारिक चविष्ट चिकन करी.' }, price: '₹300', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Mutton Handi', mr: 'मटण हंडी' }, description: { en: 'Slow-cooked mutton in a clay pot.', mr: 'मातीच्या भांड्यात शिजवलेले मटण.' }, price: '₹450', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Fish Curry', mr: 'फिश करी' }, description: { en: 'Coastal style fish curry with coconut.', mr: 'नारळासोबत कोस्टल स्टाईल फिश करी.' }, price: '₹380', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Egg Curry', mr: 'अंडा करी' }, description: { en: 'Boiled eggs in a spicy onion-tomato gravy.', mr: 'मसालेदार कांदा-टोमॅटो ग्रेव्हीमध्ये उकडलेले अंडी.' }, price: '₹220', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: { en: 'Tandoor', mr: 'तंदूर' },
    id: 'tandoor',
    items: [
      { name: { en: 'Tandoori Chicken (Full)', mr: 'तंदुरी चिकन (फुल)' }, description: { en: 'Whole chicken marinated and roasted.', mr: 'संपूर्ण चिकन मॅरीनेट केलेले आणि भाजलेले.' }, price: '₹520', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Chicken Seekh Kabab', mr: 'चिकन सीक कबाब' }, description: { en: 'Minced chicken skewers grilled.', mr: 'चिकन खिमा कबाब ग्रिल केलेले.' }, price: '₹280', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Tandoori Prawns', mr: 'तंदुरी प्रॉन्स' }, description: { en: 'Spicy marinated prawns grilled.', mr: 'मसालेदार मॅरीनेट केलेले प्रॉन्स ग्रिल केलेले.' }, price: '₹480', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Veg Seekh Kabab', mr: 'व्हेज सीक कबाब' }, description: { en: 'Minced vegetable skewers grilled.', mr: 'भाज्यांचा खिमा कबाब ग्रिल केलेले.' }, price: '₹220', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: { en: 'Rice & Biryani', mr: 'राईस आणि बिर्याणी' },
    id: 'rice-biryani',
    items: [
      { name: { en: 'Chicken Biryani', mr: 'चिकन बिर्याणी' }, description: { en: 'Fragrant basmati rice cooked with spices and chicken.', mr: 'मसाले आणि चिकनसोबत शिजवलेला बासमती तांदूळ.' }, price: '₹320', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Veg Biryani', mr: 'व्हेज बिर्याणी' }, description: { en: 'Mixed vegetables cooked with aromatic rice.', mr: 'सुगंधी तांदळासह शिजवलेल्या मिश्र भाज्या.' }, price: '₹260', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Jeera Rice', mr: 'जिरा राईस' }, description: { en: 'Simple cumin flavored basmati rice.', mr: 'जिऱ्याच्या फोडणीचा बासमती तांदूळ.' }, price: '₹150', image: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Steamed Rice', mr: 'स्टीम राईस' }, description: { en: 'Plain boiled basmati rice.', mr: 'साधा उकडलेला बासमती तांदूळ.' }, price: '₹120', image: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Mutton Biryani', mr: 'मटण बिर्याणी' }, description: { en: 'Rich and aromatic mutton biryani.', mr: 'समृद्ध आणि सुगंधी मटण बिर्याणी.' }, price: '₹420', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: { en: 'Indian Breads', mr: 'भारतीय ब्रेड' },
    id: 'breads',
    items: [
      { name: { en: 'Butter Naan', mr: 'बटर नान' }, description: { en: 'Soft leavened bread with butter.', mr: 'बटर लावून मऊ बनवलेला नान.' }, price: '₹45' },
      { name: { en: 'Garlic Naan', mr: 'गार्लिक नान' }, description: { en: 'Naan topped with minced garlic.', mr: 'लसूण लावून बनवलेला नान.' }, price: '₹55' },
      { name: { en: 'Tandoori Roti', mr: 'तंदुरी रोटी' }, description: { en: 'Whole wheat bread baked in tandoor.', mr: 'तंदूरमध्ये भाजलेली गव्हाची रोटी.' }, price: '₹25' },
      { name: { en: 'Butter Roti', mr: 'बटर रोटी' }, description: { en: 'Tandoori roti with butter.', mr: 'बटर लावून तंदुरी रोटी.' }, price: '₹30' },
      { name: { en: 'Kulcha', mr: 'कुलचा' }, description: { en: 'Stuffed or plain leavened bread.', mr: 'स्टफ्ड किंवा साधा कुलचा.' }, price: '₹50' },
    ]
  },
  {
    category: { en: 'Desserts', mr: 'मिठाई' },
    id: 'desserts',
    items: [
      { name: { en: 'Gulab Jamun', mr: 'गुलाब जामुन' }, description: { en: 'Deep fried milk dumplings in syrup.', mr: 'पाकात डीप फ्राईड गोड डंपलिंग्स.' }, price: '₹80', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Ice Cream', mr: 'आईस क्रीम' }, description: { en: 'Assorted flavors of creamy ice cream.', mr: 'क्रीमी आईसक्रीमचे विविध स्वाद.' }, price: '₹100', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dabb892?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Kulfi', mr: 'कुल्फी' }, description: { en: 'Traditional Indian frozen dessert.', mr: 'पारंपारिक भारतीय थंडगार मिठाई.' }, price: '₹90', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Gajar Halwa', mr: 'गाजर हलवा' }, description: { en: 'Sweet carrot pudding with nuts.', mr: 'सुकामेवा घातलेला गाजराचा गोड हलवा.' }, price: '₹120', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: { en: 'Beverages', mr: 'पेये' },
    id: 'beverages',
    items: [
      { name: { en: 'Fresh Lime Soda', mr: 'फ्रेश लाईम सोडा' }, description: { en: 'Refreshing lime soda with salt or sugar.', mr: 'मीठ किंवा साखरेसह ताजेतवाने लाईम सोडा.' }, price: '₹60', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Cold Coffee', mr: 'कोल्ड कॉफी' }, description: { en: 'Creamy and chilled coffee.', mr: 'क्रीमी आणि थंडगार कॉफी.' }, price: '₹120', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Masala Chaas', mr: 'मसाला ताक' }, description: { en: 'Spiced buttermilk.', mr: 'मसालेदार ताक.' }, price: '₹50', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Soft Drinks', mr: 'सॉफ्ट ड्रिंक्स' }, description: { en: 'Assorted carbonated beverages.', mr: 'विविध प्रकारचे शीतपेय.' }, price: '₹40', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=400' },
      { name: { en: 'Mineral Water', mr: 'मिनरल वॉटर' }, description: { en: 'Packaged drinking water.', mr: 'पॅकेज केलेले पिण्याचे पाणी.' }, price: '₹20' },
    ]
  }
];

const SPECIAL_HIGHLIGHTS = [
  { name: { en: 'Dilkhush Kabab', mr: 'दिलखुश कबाब' }, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
  { name: { en: 'Maharashtrian Thali', mr: 'महाराष्ट्रीयन थाळी' }, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800' },
  { name: { en: 'Kolhapuri Chicken', mr: 'कोल्हापुरी चिकन' }, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('hotel_name')} | ${t('nav_menu')}`;
  }, [t]);

  const filteredMenuData = MENU_DATA.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description[language].toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 220; // Account for floating header + sticky category bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveCategory(id);
    }
  };

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of filteredMenuData) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0B0B0F] text-[#F5F1E8] font-sans selection:bg-brand-accent selection:text-brand-bg overflow-x-hidden">
      <Header />
      
      {/* SECTION 1 — MENU HERO */}
      <section className="relative min-h-[50vh] md:h-[60vh] py-20 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0B0B0F]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,163,0,0.05),transparent_70%)]" />
        </div>

        {/* Floating Food Illustrations (Subtle) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/4 left-10 text-6xl"
          >
            🍲
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }} 
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-1/4 right-10 text-7xl"
          >
            🍗
          </motion.div>
          <motion.div 
            animate={{ x: [0, 20, 0], rotate: [0, 20, 0] }} 
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/3 right-1/4 text-5xl"
          >
            🌶️
          </motion.div>
          <motion.div 
            animate={{ x: [0, -15, 0], rotate: [0, -10, 0] }} 
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-1/3 left-1/4 text-4xl"
          >
            🌿
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-brand-accent font-black uppercase tracking-[0.4em] text-xs mb-6 block"
          >
            <FadeText>{t('menu_hero_kicker')}</FadeText>
          </motion.span>
          
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-[0.9] mb-8"
          >
            <FadeText>{t('menu_hero_title')}</FadeText>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-2xl text-[#F5F1E8]/60 font-medium tracking-wide max-w-2xl mx-auto italic"
          >
            <FadeText>{t('menu_hero_sub')}</FadeText>
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — MENU CATEGORY NAVIGATION */}
      <nav className="sticky top-[80px] md:top-[100px] z-40 bg-[#0B0B0F]/95 backdrop-blur-xl border-y border-white/5 py-4 md:py-6 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="w-full md:w-72 relative flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5F1E8]/40" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-[#F5F1E8] placeholder:text-[#F5F1E8]/40 focus:outline-none focus:border-brand-accent focus:bg-white/10 transition-all"
            />
          </div>
          <div className="flex w-full items-center justify-start gap-3 whitespace-nowrap overflow-x-auto no-scrollbar px-2">
            {filteredMenuData.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === section.id 
                ? 'bg-brand-accent text-brand-bg shadow-[0_0_20px_rgba(244,163,0,0.3)]' 
                : 'text-[#F5F1E8]/60 hover:text-brand-accent'
              }`}
            >
              <FadeText>{section.category[language]}</FadeText>
            </button>
          ))}
          </div>
        </div>
      </nav>

      {/* SECTION 3 — MENU ITEMS */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {filteredMenuData.length === 0 ? (
            <div className="text-center py-20 text-[#F5F1E8]/60">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl font-medium">
                <FadeText>{t('no_dishes')}</FadeText> "{searchQuery}"
              </p>
            </div>
          ) : (
            filteredMenuData.map((section, sectionIdx) => (
            <div key={section.id} id={section.id} className="scroll-mt-64 md:scroll-mt-72">
              <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                  <FadeText>{section.category[language]}</FadeText>
                </h2>
                <div className="h-px flex-grow bg-gradient-to-r from-brand-accent/40 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {section.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: itemIdx * 0.1 }}
                    className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:border-brand-accent/30 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  >
                    <div className="flex flex-col h-full">
                      {item.image && (
                        <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-brand-accent transition-colors">
                          <FadeText>{item.name[language]}</FadeText>
                        </h3>
                        <span className="text-brand-accent font-black text-lg">{item.price}</span>
                      </div>
                      <p className="text-[#F5F1E8]/40 text-sm leading-relaxed mb-6">
                        <FadeText>{item.description[language]}</FadeText>
                      </p>
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5F1E8]/30">Fresh Ingredients</span>
                        <Star className="w-4 h-4 text-brand-accent fill-brand-accent" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            ))
          )}
        </div>
      </section>

      {/* SECTION 4 — SPECIAL HIGHLIGHT */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-brand-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block"><FadeText>{t('chefs_choice')}</FadeText></span>
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter"><FadeText>{t('rajmudra_special')}</FadeText></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPECIAL_HIGHLIGHTS.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden group"
              >
                <img 
                  src={highlight.image} 
                  alt={highlight.name.en} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-brand-accent mb-2">
                    <FadeText>{highlight.name[language]}</FadeText>
                  </h3>
                  <div className="flex items-center gap-2 text-[#F5F1E8]/60 text-sm font-bold uppercase tracking-widest">
                    <span><FadeText>{t('authentic_taste')}</FadeText></span>
                    <div className="w-1 h-1 bg-brand-accent rounded-full" />
                    <span><FadeText>{t('premium_quality')}</FadeText></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — RESERVATION CTA */}
      <section className="py-24 md:py-40 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent opacity-[0.02]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12"
          >
            <FadeText>{t('enjoy_food')}</FadeText><br />
            <span className="text-brand-accent"><FadeText>{t('at_hotel')}</FadeText></span>
          </motion.h2>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="group relative px-16 py-6 bg-transparent border border-brand-accent/30 text-brand-accent font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:border-brand-accent"
          >
            <span className="relative z-10 group-hover:text-[#0B0B0F] transition-colors duration-500"><FadeText>{t('reserve_table')}</FadeText></span>
            <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
