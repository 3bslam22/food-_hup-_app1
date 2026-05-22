import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { ArrowLeft, Plus, Star, Heart, ChevronDown, ShoppingCart, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function RestaurantMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const addToCart = useStore(state => state.addToCart);
  const restaurants = useStore(state => state.restaurants);
  const rateRestaurant = useStore(state => state.rateRestaurant);
  const rateMenuItem = useStore(state => state.rateMenuItem);
  const language = useStore(state => state.language);
  const { favorites, toggleFavorite, offers: storeOffers } = useStore();

  const restaurant = restaurants.find(r => r.id === id);

  // Combine static offers from mockData and dynamic offers from store
  const allOffers = [
    ...(restaurant?.offers || []),
    ...storeOffers.filter(o => o.restaurantId === id)
  ];

  // Group menu items by category
  const groupedMenu = restaurant ? restaurant.menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof restaurant.menu>) : {};

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (restaurant) {
      const initialState: Record<string, boolean> = {};
      Object.keys(groupedMenu).forEach((cat) => {
        initialState[cat] = false; // All categories closed by default
      });
      setExpandedCategories(initialState);
    }
  }, [restaurant?.id]);

  if (!restaurant) {
    return <div className="p-8 text-center">{t('Restaurant not found')}</div>;
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleRateRestaurant = (rating: number) => {
    rateRestaurant(restaurant.id, rating);
  };

  const handleRateItem = (itemId: string, rating: number) => {
    rateMenuItem(restaurant.id, itemId, rating);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      restaurantId: restaurant.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 pb-44"
    >
      {/* Header / Hero */}
      <div className="relative bg-gradient-to-br from-primary to-orange-500 p-8 md:p-12 rounded-[2rem] text-white shadow-lg overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-5xl shrink-0 shadow-inner overflow-hidden">
            {restaurant.icon && (restaurant.icon.includes('.') || restaurant.icon.startsWith('/') || restaurant.icon.includes('input_file')) ? (
              <img 
                src={restaurant.icon} 
                alt={restaurant.name} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            ) : restaurant.icon || '🏪'}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-extrabold">{restaurant.name}</h1>
              <span className={`text-xs px-3 py-1 rounded-full font-black uppercase tracking-widest ${restaurant.isOpen ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'}`}>
                {restaurant.isOpen ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-white/90 font-medium">
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                {[1, 2, 3, 4, 5].map(star => (
                   <Star 
                     key={star} 
                     size={16} 
                     className={`cursor-pointer transition-transform hover:scale-125 ${star <= Math.round(restaurant.rating) ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`}
                     onClick={() => handleRateRestaurant(star)}
                   />
                ))}
                <span className="font-bold ml-2">{restaurant.rating}</span>
                <span className="text-xs opacity-80">({restaurant.ratingCount || 10})</span>
              </div>
              <span className="opacity-50 hidden md:block">•</span>
              <span className="bg-white/30 px-4 py-2 rounded-2xl backdrop-blur-md font-black shadow-sm tracking-tight border border-white/20 select-none">
                {restaurant.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      {allOffers.length > 0 && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Tag className="text-primary" size={24} />
              </div>
              {t('Special Offers')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allOffers.map((offer, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={offer.id}
                className="bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-[2rem] p-6 border-2 border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all"
              >
                <div className="absolute top-0 right-0 p-4">
                   <div className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg transform rotate-3">{t('OFFER')}</div>
                </div>
                
                <h3 className="text-xl font-extrabold mb-2 pr-12">{offer.title}</h3>
                <p className="text-text-muted text-sm mb-4 line-clamp-2">{offer.description}</p>
                
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-primary/10">
                  <div className="flex flex-col">
                    <div className="text-2xl font-black text-primary">
                      {offer.price} <span className="text-xs font-bold text-text-main">EGP</span>
                    </div>
                    {offer.originalPrice && (
                      <div className="text-sm text-text-muted line-through">{offer.originalPrice} EGP</div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => restaurant.isOpen && handleAddToCart({...offer, name: offer.title, isOffer: true})}
                    disabled={!restaurant.isOpen}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-md",
                      restaurant.isOpen 
                        ? "bg-primary text-white hover:bg-primary-dark hover:scale-105 active:scale-95 shadow-primary/20" 
                        : "bg-gray-200 text-gray-500 cursor-not-allowed opacity-50"
                    )}
                  >
                    <ShoppingCart size={18} />
                    {t('Add to Cart')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Categories */}
      <div className="flex flex-col gap-6">
        {Object.entries(groupedMenu).map(([category, items], catIdx) => {
          const isExpanded = expandedCategories[category];
          return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1 }}
            key={category}
            className="bg-secondary rounded-[2rem] p-2 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border"
          >
            <button 
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-4 rounded-[1.5rem] hover:bg-background transition-colors group"
            >
              <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                {category}
                <span className="text-sm font-bold text-text-muted bg-background px-3 py-1 rounded-full ml-2 border border-border">
                  {items.length}
                </span>
              </h2>
              <div className={`w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-text-muted group-hover:text-primary transition-colors" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-2 md:p-4 pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, idx) => {
                      const isFavorite = favorites.includes(item.id);
                      return (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          key={item.id} 
                          className="bg-background p-5 rounded-3xl border border-border flex flex-col gap-4 hover:border-primary/30 transition-all group relative shadow-sm"
                        >
                          <button 
                            onClick={() => toggleFavorite(item.id)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary/80 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
                          >
                            <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-text-muted'} />
                          </button>

                          {item.isAvailable === false && (
                            <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] rounded-3xl z-[5] flex items-center justify-center">
                              <span className="bg-red-500 text-white px-3 py-1.5 rounded-xl font-black text-xs shadow-lg uppercase tracking-wider">
                                {language === 'ar' ? 'غير متوفر حالياً' : 'Currently Unavailable'}
                              </span>
                            </div>
                          )}
                          
                          <div className="pr-10">
                            <div className="font-extrabold text-lg mb-1 truncate">{item.name}</div>
                            {item.description && (
                              <div className="text-[10px] text-text-muted line-clamp-1 mb-2">{item.description}</div>
                            )}
                            <div className="flex items-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star 
                                  key={star} 
                                  size={14} 
                                  className={`cursor-pointer transition-transform hover:scale-125 ${star <= Math.round(item.rating || 0) ? 'text-[#FFB800] fill-[#FFB800]' : 'text-gray-300'}`}
                                  onClick={() => handleRateItem(item.id, star)}
                                />
                              ))}
                              <span className="text-xs text-text-muted ml-1 font-medium">{item.rating ? item.rating : 'No rating'}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-end justify-between mt-auto pt-4 border-t border-border">
                            <div className="flex flex-col">
                              <div className="text-2xl font-extrabold text-primary leading-none">
                                {item.price} <span className="text-sm font-bold text-text-main">EGP</span>
                              </div>
                              {item.originalPrice && (
                                <div className="text-sm text-text-muted line-through mt-1">{item.originalPrice} EGP</div>
                              )}
                            </div>
                            <button 
                              onClick={() => restaurant.isOpen && item.isAvailable !== false && handleAddToCart(item)}
                              disabled={!restaurant.isOpen || item.isAvailable === false}
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${restaurant.isOpen && item.isAvailable !== false ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white group-hover:scale-105' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'}`}
                            >
                              <Plus size={24} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )})}
      </div>
    </motion.div>
  );
}
