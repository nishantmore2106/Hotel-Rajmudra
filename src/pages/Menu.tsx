import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, Leaf, Drumstick } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useLanguage, FadeText } from '../LanguageContext';

type MenuItem = {
  name: { en: string; mr: string };
  price: string | number;
  veg: boolean;
  description?: { en: string; mr: string };
};

type MenuCategory = {
  id: string;
  category: { en: string; mr: string };
  items: MenuItem[];
};

const MENU_DATA: MenuCategory[] = [
  {
    id: 'soup',
    category: { en: 'Soup', mr: 'सूप' },
    items: [
      { name: { en: "Chicken Manchow Soup", mr: "चिकन मन्चाव सूप" }, price: 160, veg: false },
      { name: { en: "Hot & Sour Chicken Soup", mr: "हॉट अँड सॉवर चिकन सूप" }, price: 160, veg: false },
      { name: { en: "Veg Manchow Soup", mr: "व्हेज मन्चाव सूप" }, price: 140, veg: true },
      { name: { en: "Hot & Sour Veg Soup", mr: "हॉट अँड सॉवर व्हेज सूप" }, price: 140, veg: true },
      { name: { en: "Cream of Tomato Soup", mr: "क्रीम ऑफ टोमॅटो सूप" }, price: 150, veg: true }
    ]
  },
  {
    id: 'munching',
    category: { en: 'Munching', mr: 'मंचिंग' },
    items: [
      { name: { en: "Fry Papad", mr: "फ्राय पापड" }, price: 30, veg: true },
      { name: { en: "Roasted Papad", mr: "रोस्टेड पापड" }, price: 25, veg: true },
      { name: { en: "Masala Papad", mr: "मसाला पापड" }, price: 50, veg: true }
    ]
  },
  {
    id: 'veg-starter',
    category: { en: 'Veg Starter', mr: 'व्हेज स्टार्टर' },
    items: [
      { name: { en: "Paneer Chilli", mr: "पनीर चिली" }, price: 270, veg: true },
      { name: { en: "Paneer 65", mr: "पनीर 65" }, price: 290, veg: true },
      { name: { en: "Paneer Crispy", mr: "पनीर क्रिस्पी" }, price: 310, veg: true },
      { name: { en: "Paneer Hot Garlic", mr: "पनीर हॉट गार्लिक" }, price: 290, veg: true },
      { name: { en: "Paneer Schezwan", mr: "पनीर शेजवान" }, price: 290, veg: true },
      { name: { en: "Paneer Manchurian", mr: "पनीर मन्च्युरियन" }, price: 240, veg: true },
      { name: { en: "Veg Crispy", mr: "व्हेज क्रिस्पी" }, price: 240, veg: true },
      { name: { en: "Veg 65", mr: "व्हेज 65" }, price: 240, veg: true },
      { name: { en: "Veg Chilli", mr: "व्हेज चिली" }, price: 230, veg: true },
      { name: { en: "Veg Schezwan", mr: "व्हेज शेजवान" }, price: 240, veg: true },
      { name: { en: "Veg Manchurian", mr: "व्हेज मन्च्युरियन" }, price: 230, veg: true },
      { name: { en: "Mushroom Chilli", mr: "मशरूम चिली" }, price: 250, veg: true },
      { name: { en: "Mushroom Hot Garlic", mr: "मशरूम हॉट गार्लिक" }, price: 250, veg: true },
      { name: { en: "Mushroom 65", mr: "मशरूम 65" }, price: 250, veg: true }
    ]
  },
  {
    id: 'non-veg-starter',
    category: { en: 'Non Veg Starter', mr: 'नॉन व्हेज स्टार्टर' },
    items: [
      { name: { en: "Chicken Chilli", mr: "चिकन चिली" }, price: 290, veg: false },
      { name: { en: "Chicken 65", mr: "चिकन 65" }, price: 290, veg: false },
      { name: { en: "Chicken Crispy", mr: "चिकन क्रिस्पी" }, price: 310, veg: false },
      { name: { en: "Chicken Manchurian", mr: "चिकन मन्च्युरियन" }, price: 260, veg: false },
      { name: { en: "Chicken Lollipop", mr: "चिकन लॉलीपॉप" }, price: 240, veg: false },
      { name: { en: "Chicken Lollipop Masala Dry", mr: "चिकन लॉलीपॉप मसाला ड्राय" }, price: 270, veg: false },
      { name: { en: "Chicken Schezwan Dry", mr: "चिकन शेजवान ड्राय" }, price: 290, veg: false },
      { name: { en: "Kolambi Chilli", mr: "कोळंबी चिली" }, price: 360, veg: false },
      { name: { en: "Kolambi 65", mr: "कोळंबी 65" }, price: 360, veg: false },
      { name: { en: "Chicken Hot Garlic", mr: "चिकन हॉट गार्लिक" }, price: 290, veg: false }
    ]
  },
  {
    id: 'fish-village',
    category: { en: 'Fish Village', mr: 'फिश व्हिलेज' },
    items: [
      { name: { en: "Surmai Tawa Rawa Fry", mr: "सुरमई तवा रवा फ्राय" }, price: "APS", veg: false },
      { name: { en: "Pomfret Tawa Rawa Fry", mr: "पॉम्फ्रेट तवा रवा फ्राय" }, price: "APS", veg: false },
      { name: { en: "Prawns Tawa Rawa Fry", mr: "प्रॉन्स तवा रवा फ्राय" }, price: "APS", veg: false },
      { name: { en: "Prawns Kolivada", mr: "प्रॉन्स कोळीवाडा" }, price: "APS", veg: false },
      { name: { en: "Prawns Masala Fry", mr: "प्रॉन्स मसाला फ्राय" }, price: "APS", veg: false }
    ]
  },
  {
    id: 'main-course-non-veg',
    category: { en: 'Main Course Non Veg', mr: 'मेन कोर्स नॉन व्हेज' },
    items: [
      { name: { en: "Chicken Chingari", mr: "चिकन चिंगारी" }, price: 310, veg: false },
      { name: { en: "Chicken Tawa", mr: "चिकन तवा" }, price: 310, veg: false },
      { name: { en: "Chicken Kadhai", mr: "चिकन कढई" }, price: 310, veg: false },
      { name: { en: "Chicken Masala", mr: "चिकन मसाला" }, price: 250, veg: false },
      { name: { en: "Chicken Dehati", mr: "चिकन देहाती" }, price: 310, veg: false },
      { name: { en: "Chicken Kolhapuri", mr: "चिकन कोल्हापुरी" }, price: 290, veg: false },
      { name: { en: "Chicken Bhuna Masala", mr: "चिकन भुना मसाला" }, price: 320, veg: false },
      { name: { en: "Chicken Tikka Masala", mr: "चिकन टिक्का मसाला" }, price: 330, veg: false },
      { name: { en: "Chicken Sukha", mr: "चिकन सुक्का" }, price: 240, veg: false },
      { name: { en: "Mutton Kolhapuri", mr: "मटण कोल्हापुरी" }, price: 340, veg: false },
      { name: { en: "Mutton Rogan Josh", mr: "मटण रोगन जोश" }, price: 340, veg: false }
    ]
  },
  {
    id: 'tur-tadka',
    category: { en: 'Tur Tadka', mr: 'तूर तडका' },
    items: [
      { name: { en: "Dal Fry", mr: "दाल फ्राय" }, price: 150, veg: true },
      { name: { en: "Dal Tadka", mr: "दाल तडका" }, price: 170, veg: true },
      { name: { en: "Dal Kolhapuri", mr: "दाल कोल्हापुरी" }, price: 160, veg: true },
      { name: { en: "Butter Dal Fry", mr: "बटर दाल फ्राय" }, price: 170, veg: true }
    ]
  },
  {
    id: 'roti-basket',
    category: { en: 'Roti Basket', mr: 'रोटी बास्केट' },
    items: [
      { name: { en: "Roti / Butter Roti", mr: "रोटी / बटर रोटी" }, price: "25 / 30", veg: true },
      { name: { en: "Naan / Butter Naan", mr: "नान / बटर नान" }, price: "45 / 60", veg: true },
      { name: { en: "Kulcha / Butter Kulcha", mr: "कुलचा / बटर कुलचा" }, price: "35 / 45", veg: true },
      { name: { en: "Butter Garlic Naan", mr: "बटर गार्लिक नान" }, price: 100, veg: true },
      { name: { en: "Cheese Garlic Naan", mr: "चीज गार्लिक नान" }, price: 120, veg: true },
      { name: { en: "Chapati", mr: "चपाती" }, price: 20, veg: true },
      { name: { en: "Bhakari", mr: "भाकरी" }, price: 30, veg: true },
      { name: { en: "Garlic Naan", mr: "गार्लिक नान" }, price: 90, veg: true }
    ]
  },
  {
    id: 'basmati-ke-sang',
    category: { en: 'Basmati ke Sang', mr: 'बासमती के संग' },
    items: [
      { name: { en: "Chicken Biryani", mr: "चिकन बिर्याणी" }, price: 290, veg: false },
      { name: { en: "Mutton Biryani", mr: "मटण बिर्याणी" }, price: 330, veg: false },
      { name: { en: "Kolambi Biryani", mr: "कोळंबी बिर्याणी" }, price: 350, veg: false },
      { name: { en: "Egg Biryani", mr: "अंडा बिर्याणी" }, price: 250, veg: false },
      { name: { en: "Paneer Biryani", mr: "पनीर बिर्याणी" }, price: 290, veg: true },
      { name: { en: "Mushroom Biryani", mr: "मशरूम बिर्याणी" }, price: 250, veg: true },
      { name: { en: "Veg Biryani / Pulav", mr: "व्हेज बिर्याणी / पुलाव" }, price: 250, veg: true }
    ]
  },
  {
    id: 'beverage',
    category: { en: 'Beverage', mr: 'पेये' },
    items: [
      { name: { en: "Solkadhi", mr: "सोलकढी" }, price: 70, veg: true },
      { name: { en: "Taak", mr: "ताक" }, price: 50, veg: true },
      { name: { en: "Bisleri", mr: "बिसलेरी" }, price: 20, veg: true },
      { name: { en: "Cold Drink 250ml", mr: "कोल्ड ड्रिंक २५० मिली" }, price: 20, veg: true },
      { name: { en: "Cold Drink 500ml", mr: "कोल्ड ड्रिंक ५०० मिली" }, price: 50, veg: true },
      { name: { en: "Lassi", mr: "लस्सी" }, price: 70, veg: true }
    ]
  }
];

export default function MenuPage() {
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('hotel_name')} | ${t('nav_menu')}`;
  }, [t]);

  const filteredMenuData = MENU_DATA.map(category => ({
    ...category,
    items: category.items.filter(item => {
      const matchesSearch = item.name[language].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'veg' && item.veg) || 
        (filter === 'non-veg' && !item.veg);
      return matchesSearch && matchesFilter;
    })
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-[#F7F1E3] text-[#2D241E] font-sans pb-20">
      <Header />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#F15A24]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#F15A24]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-[#2D241E]"
          >
            Hotel Rajmudra
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 text-brand-accent font-bold tracking-widest uppercase text-sm"
          >
            <div className="h-px w-8 bg-[#F15A24]/30" />
            <FadeText>Authentic Culinary Journey</FadeText>
            <div className="h-px w-8 bg-[#F15A24]/30" />
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text/40 group-focus-within:text-brand-accent transition-colors" />
            <input
              type="text"
              placeholder={t('search_placeholder') || "Search for dishes..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EFE9D9] border border-[#DED4C1] rounded-2xl py-3 pl-12 pr-4 text-[#2D241E] placeholder:text-[#2D241E]/40 focus:outline-none focus:ring-2 focus:ring-[#F15A24]/20 transition-all shadow-sm"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex bg-[#EFE9D9] p-1.5 rounded-2xl border border-[#DED4C1] shadow-sm">
            {(['all', 'veg', 'non-veg'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-8 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 relative ${
                  filter === mode 
                    ? 'text-white' 
                    : 'text-brand-text/50 hover:text-brand-text'
                }`}
              >
                {filter === mode && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-[#F15A24] rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{mode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredMenuData.map((category, idx) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#FBF8EF] rounded-[40px] p-8 md:p-10 border border-[#EDDFCA] shadow-[0_10px_30px_rgba(45,36,30,0.05)] h-fit"
              >
                {/* Category Header */}
                <div className="inline-block bg-brand-accent/10 border border-brand-accent/20 px-6 py-2 rounded-full mb-8">
                  <h2 className="text-[#F15A24] font-black uppercase tracking-tighter text-xl md:text-2xl">
                    <FadeText>{category.category[language]}</FadeText>
                  </h2>
                </div>

                {/* Dish Items */}
                <div className="space-y-8">
                  {category.items.map((item, itemIdx) => (
                    <motion.div 
                      key={item.name.en}
                      className="group"
                    >
                      <div className="flex items-baseline gap-2 mb-1">
                        <div className="flex-shrink-0 mr-2">
                          {item.veg ? (
                            <div className="w-5 h-5 border-2 border-green-600 p-0.5 flex items-center justify-center rounded-sm">
                              <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 border-2 border-red-600 p-0.5 flex items-center justify-center rounded-sm">
                              <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-baseline justify-between w-full">
                            <h3 className="text-lg md:text-xl font-bold text-[#2D241E]">
                              {item.name.en}
                            </h3>
                            <div className="mx-2 flex-grow border-b border-dotted border-brand-text/20 mb-1" />
                            <span className="text-xl font-black text-[#F15A24]">
                              {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                            </span>
                          </div>
                          <p className="text-[#2D241E]/60 font-medium text-sm mt-0.5 italic">
                            {item.name.mr}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredMenuData.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 px-6 bg-[#FBF8EF] rounded-[40px] border border-dotted border-brand-text/20"
          >
            <Info className="w-12 h-12 mx-auto mb-4 text-brand-text/20" />
            <h3 className="text-2xl font-bold text-brand-text/40 mb-2">No dishes found</h3>
            <p className="text-brand-text/30">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
