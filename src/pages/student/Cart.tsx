import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { Trash2, FileText, CreditCard, Banknote, CheckCircle2, Image as ImageIcon, Upload, X as CloseIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import ConfirmModal from '../../components/ConfirmModal';

export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, removeFromCart, addOrder, clearCart, user, restaurants, language } = useStore();
  const isArabic = language === 'ar';
  
  const [note, setNote] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('online');
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [requestDelivery, setRequestDelivery] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = requestDelivery ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + deliveryFee;

  const cartItemsByRestaurant = cart.reduce((acc, item) => {
    if (!acc[item.restaurantId]) acc[item.restaurantId] = [];
    acc[item.restaurantId].push(item);
    return acc;
  }, {} as Record<string, typeof cart>);

  const restaurantsInCart = restaurants.filter(r => Object.keys(cartItemsByRestaurant).includes(r.id));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckoutProcess = () => {
    setIsProcessing(true);
    // Simulate payment delay
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      if (!user) return;

      Object.entries(cartItemsByRestaurant).forEach(([restaurantId, items]) => {
        const restaurantSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const restaurantDeliveryFee = requestDelivery ? Math.round(restaurantSubtotal * 0.05) : 0;
        const restaurantTotal = restaurantSubtotal + restaurantDeliveryFee;

        addOrder({
          studentId: user.id,
          studentName: user.name,
          restaurantId,
          items: items.map(i => ({ 
            id: i.id, 
            name: i.name, 
            price: i.price, 
            quantity: i.quantity,
            isOffer: i.isOffer 
          })),
          total: restaurantTotal,
          note: note.trim() || undefined,
          paymentMethod,
          paymentScreenshot: paymentMethod === 'online' ? (paymentScreenshot || undefined) : undefined,
          isDeliveryRequested: requestDelivery,
          deliveryFee: restaurantDeliveryFee,
          deliveryStatus: requestDelivery ? 'pending' : 'none'
        });
      });

      setTimeout(() => {
        clearCart();
        navigate('/orders');
      }, 1500);
    }, paymentMethod === 'online' ? 1200 : 800); // Slightly faster for better UX
  };

  if (cart.length === 0 && !paymentSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full text-text-muted"
      >
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-xl font-bold">{t('Your cart is empty')}</h2>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-4xl mx-auto w-full pb-44 relative"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors group"
        >
          <ArrowLeft className={cn("transition-transform", isArabic ? "rotate-180" : "group-hover:-translate-x-1")} />
        </button>
        <h2 className="text-3xl font-extrabold tracking-tight">{t('Cart Summary')}</h2>
      </div>

      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isProcessing && !paymentSuccess && setShowCheckout(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-secondary w-full max-w-md rounded-[2.5rem] shadow-2xl z-10 overflow-y-auto max-h-[85vh] border border-border flex flex-col"
            >
              {paymentSuccess ? (
                <div className="p-10 flex flex-col items-center justify-center text-center gap-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring', delay: 0.2 }}>
                    <CheckCircle2 size={80} className="text-green-500" />
                  </motion.div>
                  <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-2xl font-extrabold text-text-main mt-4">
                    {t('Order Confirmed!')}
                  </motion.h3>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-text-muted font-medium">
                    {paymentMethod === 'online' ? t('Payment successful.') : t('Order placed.')}
                  </motion.p>
                </div>
              ) : (
                <div className="p-8 flex flex-col gap-6">
                  <h3 className="text-2xl font-extrabold text-text-main text-center">{t('Checkout')}</h3>
                  <div className="flex flex-col gap-4">
                    <label className="font-bold text-text-muted">{t('Select Payment Method')}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setPaymentMethod('online')}
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'online' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-text-muted hover:border-border/80'}`}
                        disabled={isProcessing}
                      >
                        <CreditCard size={32} />
                        <span className="font-bold text-sm text-center">دفع إلكتروني</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('cash')}
                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'cash' ? 'border-green-500 bg-green-500/10 text-green-600' : 'border-border bg-background text-text-muted hover:border-border/80'}`}
                        disabled={isProcessing}
                      >
                        <Banknote size={32} />
                        <span className="font-bold text-sm text-center">الدفع عند الاستلام</span>
                      </button>
                    </div>
                  </div>
                  
                  {paymentMethod === 'online' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex flex-col gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                      <p className="text-sm text-text-main font-bold text-center">يرجى تحويل المبلغ عبر (إنستا باي) أو (محفظة كاش) إلى الأرقام التالية:</p>
                      <div className="flex flex-col gap-2">
                        {restaurantsInCart.map(r => (
                          <div key={r.id} className="flex flex-col p-3 bg-background rounded-xl border border-border">
                            <span className="text-xs text-text-muted font-bold mb-1">{r.name}</span>
                            <span className="text-lg font-black text-primary tracking-wider text-center">{r.paymentMobile || 'رقم الموبايل غير محدد بعد'}</span>
                          </div>
                        ))}
                      </div>

                      {/* Image Upload for Screenshot */}
                      <div className="flex flex-col gap-3 mt-2">
                        <label className="text-sm font-bold text-text-main flex items-center gap-2">
                          <ImageIcon size={16} className="text-primary" />
                          ارفق صورة التحويل لتأكيد الطلب
                        </label>
                        
                        {!paymentScreenshot ? (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-background/50 transition-all group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload size={24} className="text-text-muted group-hover:text-primary transition-colors mb-2" />
                              <p className="text-xs text-text-muted font-bold">اضغط لاختيار صورة</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                          </label>
                        ) : (
                          <div className="relative group">
                            <img src={paymentScreenshot} alt="Payment Confirmation" className="w-full h-32 object-cover rounded-2xl border border-primary/30" />
                            <button 
                              onClick={() => setPaymentScreenshot(null)}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              <CloseIcon size={16} />
                            </button>
                          </div>
                        )}
                      </div>

                      <p className="text-[10px] text-text-muted text-center leading-relaxed">بمجرد التحويل وارفاق الصورة، اضغط على زر التأكيد بالأسفل.</p>
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-3 mt-4 pb-28">
                    <button 
                      onClick={handleCheckoutProcess}
                      disabled={isProcessing}
                      className="w-full bg-primary text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-wait"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {paymentMethod === 'online' ? 'جاري معالجة الدفع...' : 'جاري تأكيد الطلب...'}
                        </>
                      ) : (
                        `تأكيد ودفع ${total} ج.م`
                      )}
                    </button>
                    <button 
                      onClick={() => setShowCheckout(false)}
                      disabled={isProcessing}
                      className="w-full bg-transparent text-text-muted font-bold py-3 hover:text-text-main transition-colors disabled:opacity-50"
                    >
                      {t('Cancel')}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <div className="bg-secondary rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {cart.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id} 
              className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <div>
                <div className="font-bold text-lg flex items-center gap-2">
                  {item.name}
                  {item.isOffer && (
                    <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">{t('OFFER')}</span>
                  )}
                </div>
                <div className="text-sm text-text-muted mt-1">{t('Qty')}: {item.quantity}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="font-extrabold text-lg">{item.price * item.quantity} <span className="text-sm text-text-muted font-normal">EGP</span></div>
                <button 
                  onClick={() => setItemToRemove(item.id)}
                  className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <label className="flex items-center gap-3 p-4 bg-background rounded-2xl border border-border cursor-pointer hover:border-primary transition-all">
            <input 
              type="checkbox" 
              checked={requestDelivery} 
              onChange={(e) => setRequestDelivery(e.target.checked)}
              className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary"
            />
            <div className="flex flex-col">
              <span className="font-bold text-text-main">{language === 'ar' ? 'طلب توصيل (Delivery)' : 'Request Delivery'}</span>
              <span className="text-xs text-text-muted">{language === 'ar' ? 'رسوم توصيل إضافية 5%' : 'Additional 5% delivery fee'}</span>
            </div>
          </label>

          <div className="flex justify-between items-center">
            <label className="font-bold flex items-center gap-2 text-text-main">
              <FileText size={18} className="text-primary" />
              {t('Add a note to your order')}
            </label>
            <span className={`text-xs font-bold ${note.length > 180 ? 'text-red-500' : 'text-text-muted'}`}>
              {note.length}/200
            </span>
          </div>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 200))}
            maxLength={200}
            placeholder={t('e.g., No onions, extra spicy...')}
            className="w-full bg-background border border-border rounded-2xl p-4 outline-none focus:border-primary resize-none h-24 transition-colors"
          />
        </div>
        
        <div className="mt-4 pt-6 border-t border-border flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-text-muted">{t('Subtotal', 'Subtotal')}</div>
            <div className="text-lg font-bold text-text-main">{subtotal} EGP</div>
          </div>
          {requestDelivery && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex justify-between items-center">
              <div className="text-sm font-bold text-text-muted">{language === 'ar' ? 'رسوم التوصيل (5%)' : 'Delivery Fee (5%)'}</div>
              <div className="text-lg font-bold text-primary">+{deliveryFee} EGP</div>
            </motion.div>
          )}
          <div className="flex justify-between items-center mt-2">
            <div className="text-xl font-bold text-text-muted">{t('Total')}</div>
            <div className="text-3xl font-extrabold text-primary">{total} <span className="text-lg text-text-main font-bold">EGP</span></div>
          </div>
        </div>
        
        <button 
          onClick={() => setShowCheckout(true)}
          className="w-full bg-primary text-white font-bold text-lg py-4 rounded-2xl mt-4 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all active:translate-y-0"
        >
          {t('Checkout')}
        </button>
      </div>

      <ConfirmModal
        isOpen={!!itemToRemove}
        title={isArabic ? 'حذف من السلة' : 'Remove from Cart'}
        message={isArabic ? 'هل أنت متأكد من رغبتك في حذف هذا الصنف من السلة؟' : 'Are you sure you want to remove this item from the cart?'}
        onConfirm={() => {
          if (itemToRemove) {
            removeFromCart(itemToRemove);
            setItemToRemove(null);
          }
        }}
        onCancel={() => setItemToRemove(null)}
        confirmText={isArabic ? 'نعم، حذف' : 'Yes, Delete'}
        cancelText={isArabic ? 'تراجع' : 'Cancel'}
      />
    </motion.div>
  );
}
