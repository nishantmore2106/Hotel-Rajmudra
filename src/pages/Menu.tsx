import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Utensils, Star, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const MENU_DATA = [
  {
    category: 'Starters',
    id: 'starters',
    items: [
      { name: 'Dilkhush Kabab', description: 'Juicy grilled kababs with rich spices.', price: '₹320', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
      { name: 'Chicken Tikka', description: 'Tender chicken pieces marinated in spices and grilled.', price: '₹280', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
      { name: 'Paneer Tikka', description: 'Marinated paneer grilled in tandoor.', price: '₹240', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400' },
      { name: 'Veg Hara Bhara Kabab', description: 'Healthy and delicious spinach and pea patties.', price: '₹210', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400' },
      { name: 'Chicken Lollipop', description: 'Deep fried chicken wings served with schezwan sauce.', price: '₹260', image: 'https://images.unsplash.com/photo-1626132646529-500637532537?auto=format&fit=crop&q=80&w=400' },
      { name: 'Fish Koliwada', description: 'Traditional spice-marinated fried fish.', price: '₹350', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: 'Veg Main Course',
    id: 'veg-main',
    items: [
      { name: 'Veg Kolhapuri', description: 'Spicy Maharashtrian vegetable curry.', price: '₹220', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400' },
      { name: 'Paneer Butter Masala', description: 'Paneer cooked in creamy tomato gravy.', price: '₹260', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400' },
      { name: 'Dal Tadka', description: 'Yellow lentils tempered with spices.', price: '₹180', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
      { name: 'Baingan Bharta', description: 'Smoky roasted eggplant mash with spices.', price: '₹190', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mutter Paneer', description: 'Peas and paneer in a rich tomato base.', price: '₹240', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mix Veg Curry', description: 'Seasonal vegetables in a balanced gravy.', price: '₹200', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: 'Non-Veg Main Course',
    id: 'non-veg-main',
    items: [
      { name: 'Kolhapuri Chicken', description: 'Authentic spicy chicken curry.', price: '₹320', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
      { name: 'Butter Chicken', description: 'Classic creamy tomato chicken gravy.', price: '₹350', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
      { name: 'Chicken Masala', description: 'Traditional flavorful chicken curry.', price: '₹300', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mutton Handi', description: 'Slow-cooked mutton in a clay pot.', price: '₹450', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400' },
      { name: 'Fish Curry', description: 'Coastal style fish curry with coconut.', price: '₹380', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
      { name: 'Egg Curry', description: 'Boiled eggs in a spicy onion-tomato gravy.', price: '₹220', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: 'Tandoor',
    id: 'tandoor',
    items: [
      { name: 'Tandoori Chicken (Full)', description: 'Whole chicken marinated and roasted.', price: '₹520', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
      { name: 'Chicken Seekh Kabab', description: 'Minced chicken skewers grilled.', price: '₹280', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400' },
      { name: 'Tandoori Prawns', description: 'Spicy marinated prawns grilled.', price: '₹480', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=400' },
      { name: 'Veg Seekh Kabab', description: 'Minced vegetable skewers grilled.', price: '₹220', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: 'Rice & Biryani',
    id: 'rice-biryani',
    items: [
      { name: 'Chicken Biryani', description: 'Fragrant basmati rice cooked with spices and chicken.', price: '₹320', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400' },
      { name: 'Veg Biryani', description: 'Mixed vegetables cooked with aromatic rice.', price: '₹260', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400' },
      { name: 'Jeera Rice', description: 'Simple cumin flavored basmati rice.', price: '₹150', image: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?auto=format&fit=crop&q=80&w=400' },
      { name: 'Steamed Rice', description: 'Plain boiled basmati rice.', price: '₹120', image: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mutton Biryani', description: 'Rich and aromatic mutton biryani.', price: '₹420', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: 'Indian Breads',
    id: 'breads',
    items: [
      { name: 'Butter Naan', description: 'Soft leavened bread with butter.', price: '₹45' },
      { name: 'Garlic Naan', description: 'Naan topped with minced garlic.', price: '₹55' },
      { name: 'Tandoori Roti', description: 'Whole wheat bread baked in tandoor.', price: '₹25' },
      { name: 'Butter Roti', description: 'Tandoori roti with butter.', price: '₹30' },
      { name: 'Kulcha', description: 'Stuffed or plain leavened bread.', price: '₹50' },
    ]
  },
  {
    category: 'Desserts',
    id: 'desserts',
    items: [
      { name: 'Gulab Jamun', description: 'Deep fried milk dumplings in syrup.', price: '₹80', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400' },
      { name: 'Ice Cream', description: 'Assorted flavors of creamy ice cream.', price: '₹100', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dabb892?auto=format&fit=crop&q=80&w=400' },
      { name: 'Kulfi', description: 'Traditional Indian frozen dessert.', price: '₹90', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400' },
      { name: 'Gajar Halwa', description: 'Sweet carrot pudding with nuts.', price: '₹120', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400' },
    ]
  },
  {
    category: 'Beverages',
    id: 'beverages',
    items: [
      { name: 'Fresh Lime Soda', description: 'Refreshing lime soda with salt or sugar.', price: '₹60', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Cold Coffee', description: 'Creamy and chilled coffee.', price: '₹120', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=400' },
      { name: 'Masala Chaas', description: 'Spiced buttermilk.', price: '₹50', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400' },
      { name: 'Soft Drinks', description: 'Assorted carbonated beverages.', price: '₹40', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=400' },
      { name: 'Mineral Water', description: 'Packaged drinking water.', price: '₹20' },
    ]
  }
];

const SPECIAL_HIGHLIGHTS = [
  { name: 'Dilkhush Kabab', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800' },
  { name: 'Maharashtrian Thali', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Kolhapuri Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].id);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Navigation bar height
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
      const scrollPosition = window.scrollY + 150;
      for (const section of MENU_DATA) {
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
            Mumbai – Goa Highway Favorite Stop
          </motion.span>
          
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-9xl font-display font-black tracking-tighter uppercase leading-[0.9] mb-8"
          >
            Our Menu
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-2xl text-[#F5F1E8]/60 font-medium tracking-wide max-w-2xl mx-auto italic"
          >
            “Authentic Maharashtrian flavours and delicious dishes served fresh at Hotel Rajmudra.”
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — MENU CATEGORY NAVIGATION */}
      <nav className="sticky top-[72px] md:top-[80px] z-40 bg-[#0B0B0F]/95 backdrop-blur-xl border-y border-white/5 py-4 md:py-6 px-4 md:px-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-3 md:gap-8 whitespace-nowrap px-2">
          {MENU_DATA.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === section.id 
                ? 'bg-brand-accent text-brand-bg shadow-[0_0_20px_rgba(244,163,0,0.3)]' 
                : 'text-[#F5F1E8]/60 hover:text-brand-accent'
              }`}
            >
              {section.category}
            </button>
          ))}
        </div>
      </nav>

      {/* SECTION 3 — MENU ITEMS */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {MENU_DATA.map((section, sectionIdx) => (
            <div key={section.id} id={section.id} className="scroll-mt-32">
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter">
                  {section.category}
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
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-brand-accent transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-brand-accent font-black text-lg">{item.price}</span>
                      </div>
                      <p className="text-[#F5F1E8]/40 text-sm leading-relaxed mb-6">
                        {item.description}
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
          ))}
        </div>
      </section>

      {/* SECTION 4 — SPECIAL HIGHLIGHT */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-brand-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-sm mb-4 block">Chef's Choice</span>
            <h2 className="text-4xl md:text-8xl font-display font-black uppercase tracking-tighter">Rajmudra Special</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPECIAL_HIGHLIGHTS.map((highlight, i) => (
              <motion.div
                key={highlight.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden group"
              >
                <img 
                  src={highlight.image} 
                  alt={highlight.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-brand-accent mb-2">
                    {highlight.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#F5F1E8]/60 text-sm font-bold uppercase tracking-widest">
                    <span>Authentic Taste</span>
                    <div className="w-1 h-1 bg-brand-accent rounded-full" />
                    <span>Premium Quality</span>
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
            className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9] mb-12"
          >
            Enjoy Authentic Maharashtrian Food<br />
            <span className="text-brand-accent">At Hotel Rajmudra</span>
          </motion.h2>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(244, 163, 0, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-6 bg-brand-accent text-brand-bg font-black uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all"
          >
            Reserve a Table
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
