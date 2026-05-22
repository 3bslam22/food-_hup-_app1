import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2, Check, X, Plus, Trash2, Tag, ChevronDown, AlertCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';
import { cn } from '../../lib/utils';

export default function ManageMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const restaurants = useStore(state => state.restaurants);
  const { updateMenuItem, deleteMenuItem, offers, addOffer, deleteOffer, language } = useStore();
  const isArabic = language === 'ar';

  const restaurant = restaurants.find(r => r.id === user?.restaurantId);
  const restaurantOffers = offers.filter(o => o.restaurantId === user?.restaurantId);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState<string>('');
  const [editOriginalPrice, setEditOriginalPrice] = useState<string>('');
  
  // New Offer State
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDesc, setOfferDesc] = useState('');
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [offerOriginalPrice, setOfferOriginalPrice] = useState<string>('');

  // Confirm Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'offer' | 'menuItem' | null;
    targetId: string | null;
  }>({ isOpen: false, type: null, targetId: null });

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
        initialState[cat] = false;
      });
      setExpandedCategories(initialState);
    }
  }, [restaurant?.id]);

  if (!restaurant) {
    return <div className="p-8 text-center text-text-muted">Restaurant not found</div>;
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditPrice(item.price.toString());
    setEditOriginalPrice(item.originalPrice?.toString() || '');
  };

  const handleSave = (itemId: string) => {
    updateMenuItem(restaurant.id, itemId, { 
      name: editName, 
      price: Number(editPrice),
      originalPrice: editOriginalPrice ? Number(editOriginalPrice) : undefined
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleAddOffer = () => {
    if (!offerTitle || !offerPrice) return;
    addOffer({
      restaurantId: restaurant.id,
      title: offerTitle,
      description: offerDesc,
      price: Number(offerPrice),
      originalPrice: offerOriginalPrice ? Number(offerOriginalPrice) : undefined
    });
    setShowOfferForm(false);
    setOfferTitle('');
    setOfferDesc('');
    setOfferPrice('');
    setOfferOriginalPrice('');
  };

  const confirmDelete = () => {
    if (modalState.type === 'offer' && modalState.targetId) {
      deleteOffer(modalState.targetId);
    } else if (modalState.type === 'menuItem' && modalState.targetId) {
      deleteMenuItem(restaurant.id, modalState.targetId);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-10 pb-10 max-w-5xl mx-auto w-full"
    >
      <ConfirmModal
        isOpen={modalState.isOpen}
        title={modalState.type === 'offer' ? t('Delete Offer') : t('Delete Menu Item')}
        message={t('Are you sure you want to delete this item? This action cannot be undone.')}
        confirmText={t('Delete')}
        cancelText={t('Cancel')}
        onConfirm={confirmDelete}
        onCancel={() => setModalState({ isOpen: false, type: null, targetId: null })}
      />

      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors group"
        >
          <ArrowLeft className={cn("transition-transform", isArabic ? "rotate-180" : "group-hover:-translate-x-1")} />
        </button>
        <h2 className="text-3xl font-extrabold tracking-tight">{t('Manage Menu')}</h2>
      </div>

      {/* Offers Section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-3">
            <Tag className="text-primary" size={24} />
            {t('Special Offers')}
          </h2>
          <button 
            onClick={() => setShowOfferForm(!showOfferForm)}
            className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm"
          >
            {showOfferForm ? <X size={20} /> : <Plus size={20} />}
            {showOfferForm ? t('Cancel') : t('Create Offer')}
          </button>
        </div>

        {showOfferForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-secondary p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/30 flex flex-col gap-4"
          >
            <h3 className="font-bold text-lg">{t('New Special Offer')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                value={offerTitle} 
                onChange={(e) => setOfferTitle(e.target.value)}
                placeholder={t('Offer Title (e.g., Buy 1 Get 1 Free)')}
                className="bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
              <input 
                type="text" 
                value={offerDesc} 
                onChange={(e) => setOfferDesc(e.target.value)}
                placeholder={t('Description')}
                className="bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={offerPrice} 
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder={t('Offer Price')}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
                <span className="text-text-muted font-bold">EGP</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={offerOriginalPrice} 
                  onChange={(e) => setOfferOriginalPrice(e.target.value)}
                  placeholder={t('Original Price (Optional)')}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary"
                />
                <span className="text-text-muted font-bold">EGP</span>
              </div>
            </div>
            <button 
              onClick={handleAddOffer}
              className="mt-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              {t('Publish Offer')}
            </button>
          </motion.div>
        )}

        {restaurantOffers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantOffers.map((offer) => (
              <div key={offer.id} className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-6 relative group">
                <button 
                  onClick={() => setModalState({ isOpen: true, type: 'offer', targetId: offer.id })}
                  className="absolute top-4 right-4 w-8 h-8 bg-background rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <Trash2 size={16} />
                </button>
                <div className="font-extrabold text-xl mb-1">{offer.title}</div>
                <div className="text-sm text-text-muted mb-4">{offer.description}</div>
                <div className="flex items-end gap-2">
                  <div className="font-extrabold text-2xl text-primary">{offer.price} <span className="text-sm">EGP</span></div>
                  {offer.originalPrice && (
                    <div className="text-sm text-text-muted line-through mb-1">{offer.originalPrice} EGP</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-px bg-border my-2"></div>

      {/* Menu Section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold tracking-tight">{t('Manage Menu')}</h2>

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
                        {items.map((item, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            key={item.id} 
                            className="bg-background rounded-3xl p-6 shadow-sm border border-border flex flex-col gap-4 hover:border-primary/30 transition-all"
                          >
                            {editingId === item.id ? (
                              <div className="flex flex-col gap-3">
                                <input 
                                  type="text" 
                                  value={editName} 
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-sm font-bold"
                                  placeholder="Item Name"
                                />
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="number" 
                                    value={editPrice} 
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-sm font-bold"
                                    placeholder="Price"
                                  />
                                  <span className="text-text-muted font-bold">EGP</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="number" 
                                    value={editOriginalPrice} 
                                    onChange={(e) => setEditOriginalPrice(e.target.value)}
                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-sm font-bold"
                                    placeholder="Original Price"
                                  />
                                  <span className="text-text-muted font-bold">EGP</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                  <button onClick={() => handleSave(item.id)} className="flex-1 bg-primary text-white py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-primary/90">
                                    <Check size={18} /> Save
                                  </button>
                                  <button onClick={handleCancel} className="flex-1 bg-secondary border border-border text-text-main py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-border">
                                    <X size={18} /> Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-extrabold text-lg">{item.name}</h3>
                                    <p className="text-sm text-text-muted mt-1">{item.category}</p>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="font-extrabold text-primary text-xl leading-none">{item.price} <span className="text-sm">EGP</span></div>
                                    {item.originalPrice && (
                                      <div className="text-[10px] text-text-muted line-through mt-1">{item.originalPrice} EGP</div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                                  <span className={`text-xs font-bold uppercase tracking-wider ${item.isAvailable !== false ? 'text-green-600' : 'text-red-500'}`}>
                                    {item.isAvailable !== false ? 'متوفر' : 'غير متوفر'}
                                  </span>
                                  <button 
                                    onClick={() => updateMenuItem(restaurant.id, item.id, { isAvailable: item.isAvailable === false ? true : false })}
                                    className={`w-10 h-5 rounded-full relative transition-all duration-300 ${item.isAvailable !== false ? 'bg-green-500' : 'bg-red-400'}`}
                                  >
                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${item.isAvailable !== false ? (language === 'ar' ? 'left-1' : 'right-1') : (language === 'ar' ? 'right-5' : 'left-1')}`} />
                                  </button>
                                </div>
                                
                                <div className="flex gap-3 mt-auto pt-4 border-t border-border">
                                  <button onClick={() => handleEdit(item)} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold text-text-muted hover:text-primary transition-colors bg-secondary rounded-xl border border-transparent hover:border-primary/20">
                                    <Edit2 size={16} />
                                    {t('Edit')}
                                  </button>
                                  <button 
                                    onClick={() => setModalState({ isOpen: true, type: 'menuItem', targetId: item.id })} 
                                    className="px-4 flex items-center justify-center py-2 text-sm font-bold text-red-500 hover:text-white transition-colors bg-secondary hover:bg-red-500 rounded-xl border border-transparent hover:border-red-500/50"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
