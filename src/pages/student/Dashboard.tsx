import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPin, MessageCircle, ShoppingCart, Search, Tag, ArrowRight, Heart, ClipboardList, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function StudentDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const restaurants = useStore(state => state.restaurants);
  const offers = useStore(state => state.offers);
  const cart = useStore(state => state.cart);
  const addToCart = useStore(state => state.addToCart);
  const language = useStore(state => state.language);
  const [searchQuery, setSearchQuery] = useState('');
  const [flyingItem, setFlyingItem] = useState<{ id: string, x: number, y: number } | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const timeout = setTimeout(() => setIsScrolling(false), 500);
      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [scrollTimeout]);

  const searchResults = searchQuery.trim() === '' ? [] : restaurants.flatMap(rest => 
    rest.menu
      .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(item => ({ 
        ...item, 
        restaurantName: rest.name, 
        restaurantId: rest.id, 
        restaurantIcon: rest.icon, 
        restaurantIsOpen: rest.isOpen,
        isAvailable: item.isAvailable !== false
      }))
  );

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.restaurantIsOpen || item.isAvailable === false) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyingItem({
      id: Math.random().toString(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });

    addToCart({
      id: item.id,
      restaurantId: item.restaurantId,
      name: item.name,
      price: item.price,
      quantity: 1
    });

    setTimeout(() => setFlyingItem(null), 800);
  };

  const filteredRestaurants = restaurants.filter(rest => {
    const query = searchQuery.toLowerCase();
    const matchesName = rest.name.toLowerCase().includes(query);
    return matchesName;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 pb-44"
    >
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-3xl border border-primary/20">
        <h1 className="text-2xl font-extrabold text-text-main">
          مرحباً بك يا <span className="text-primary">{user?.name}</span> 👋
        </h1>
        <p className="text-text-muted mt-1">ماذا تود أن تطلب اليوم؟</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto w-full">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search size={24} className="text-primary" />
        </div>
        <input
          type="text"
          placeholder={t('Search restaurants or food...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-secondary border-2 border-border rounded-2xl outline-none focus:border-primary transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-lg font-medium"
        />
      </div>

      {/* Search Results for items */}
      {searchQuery && searchResults.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            <ShoppingCart className="text-primary" size={24} />
            {t('Matching Items')}
            <span className="text-sm font-bold text-text-muted bg-secondary px-3 py-1 rounded-full border border-border">
              {searchResults.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {searchResults.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                key={`${item.restaurantId}-${item.id}`}
                className="bg-secondary p-3 rounded-2xl border border-border flex items-center gap-4 hover:border-primary transition-all group relative overflow-hidden"
              >
                <div 
                  className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-3xl shrink-0 cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/restaurant/${item.restaurantId}`)}
                >
                    {item.restaurantIcon && (item.restaurantIcon.includes('.') || item.restaurantIcon.startsWith('/') || item.restaurantIcon.includes('input_file')) ? (
                      <img 
                        src={item.restaurantIcon} 
                        alt={item.restaurantName} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    ) : item.restaurantIcon || '🏪'}
                </div>
                <div className="flex-grow min-w-0 cursor-pointer" onClick={() => navigate(`/restaurant/${item.restaurantId}`)}>
                  <div className="font-extrabold text-base truncate flex items-center gap-2">
                    {item.name}
                    {!item.restaurantIsOpen ? (
                      <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-black">CLOSED</span>
                    ) : item.isAvailable === false && (
                      <span className="text-[8px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-black">OUT OF STOCK</span>
                    )}
                  </div>
                  <div className="text-xs text-text-muted font-bold opacity-70">{item.restaurantName}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex flex-col items-end">
                    <div className={`font-black text-lg ${item.restaurantIsOpen && item.isAvailable !== false ? 'text-primary' : 'text-text-muted'}`}>{item.price} <span className="text-[10px]">EGP</span></div>
                    {item.originalPrice && (
                      <div className="text-[10px] text-text-muted line-through -mt-1">{item.originalPrice} EGP</div>
                    )}
                  </div>
                  <button 
                    onClick={(e) => handleAddToCart(item, e)}
                    disabled={!item.restaurantIsOpen || item.isAvailable === false}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md ${item.restaurantIsOpen && item.isAvailable !== false ? 'bg-primary text-white hover:scale-110 active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'}`}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Flying Animation Overlay */}
      <AnimatePresence>
        {flyingItem && (
          <motion.div
            key={flyingItem.id}
            initial={{ scale: 1, x: flyingItem.x, y: flyingItem.y, opacity: 1 }}
            animate={{ 
              scale: 0.2, 
              x: language === 'ar' ? window.innerWidth - 60 : 60, 
              y: window.innerHeight - 60, 
              opacity: 0.5 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "anticipate" }}
            className="fixed top-0 left-0 w-8 h-8 bg-primary rounded-full z-[100] flex items-center justify-center text-white pointer-events-none shadow-lg"
          >
            <ShoppingCart size={14} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restaurants Section */}
      <div>
        <h2 className="text-2xl font-extrabold mb-6">
          {searchQuery ? t('Matching Restaurants') : t('Featured Campus Restaurants')}
        </h2>
        
        {filteredRestaurants.length === 0 && searchResults.length === 0 ? (
          <div className="text-center py-16 text-text-muted bg-secondary rounded-3xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="text-5xl mb-4">🔍</div>
            <div className="text-xl font-bold">{t('No results found')}</div>
            <p className="mt-2 text-sm">Try searching for something else.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((rest, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={rest.id} 
                onClick={() => navigate(`/restaurant/${rest.id}`)}
                className="bg-secondary rounded-3xl p-6 flex flex-col gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform overflow-hidden">
                    {rest.icon && (rest.icon.includes('.') || rest.icon.startsWith('/') || rest.icon.includes('input_file')) ? (
                      <img 
                        src={rest.icon} 
                        alt={rest.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    ) : rest.icon || '🏪'}
                  </div>
                  <div>
                    <div className="text-xl font-extrabold mb-1 flex items-center gap-2">
                      {rest.name}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${rest.isOpen ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {rest.isOpen ? 'OPEN' : 'CLOSED'}
                      </span>
                    </div>
                    <div className="text-sm text-text-muted flex items-center gap-2">
                      <span className="text-[#FFB800] font-black text-base">★ {rest.rating}</span>
                      <span className="opacity-40">•</span>
                      <span className="font-black text-text-main">{rest.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-sm font-bold text-text-muted">{rest.menu.length} Items</span>
                  <button className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
