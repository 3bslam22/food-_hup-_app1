import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Heart, Plus, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Favorites() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites, restaurants, addToCart, toggleFavorite, language } = useStore();
  const isArabic = language === 'ar';

  // Find all favorite items across all restaurants
  const favoriteItems = restaurants.flatMap(restaurant => 
    restaurant.menu
      .filter(item => favorites.includes(item.id))
      .map(item => ({ ...item, restaurantId: restaurant.id, restaurantName: restaurant.name }))
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 pb-44 max-w-5xl mx-auto w-full"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors group"
        >
          <ArrowLeft className={cn("transition-transform", isArabic ? "rotate-180" : "group-hover:-translate-x-1")} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-500 flex items-center justify-center">
            <Heart size={20} className="fill-current" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">{t('My Favorites')}</h2>
        </div>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="bg-secondary rounded-3xl p-12 text-center border border-border flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center text-text-muted">
            <Heart size={32} />
          </div>
          <h3 className="text-xl font-bold">{t('No favorites yet')}</h3>
          <p className="text-text-muted max-w-md">{t('Explore restaurants and tap the heart icon on your favorite meals to save them here for quick ordering.')}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            {t('Explore Food')} <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteItems.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={item.id} 
              className="bg-secondary p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border flex flex-col gap-4 group hover:border-primary/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{item.restaurantName}</div>
                  <div className="font-bold text-lg">{item.name}</div>
                  <div className="text-text-muted text-sm mt-1">{item.category}</div>
                </div>
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="text-red-500 hover:scale-110 transition-transform"
                >
                  <Heart size={24} className="fill-current" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <div className="font-extrabold text-xl">{item.price} <span className="text-sm text-text-muted font-normal">EGP</span></div>
                <button 
                  onClick={() => addToCart({
                    id: item.id,
                    restaurantId: item.restaurantId,
                    name: item.name,
                    price: item.price,
                    quantity: 1
                  })}
                  className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
