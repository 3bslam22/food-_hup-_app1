import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { Package, MapPin, CheckCircle, Clock, ArrowRight, User, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function DeliveryDashboard() {
  const { t } = useTranslation();
  const { user, orders, restaurants, acceptDeliveryOrder, updateDeliveryStatus, language } = useStore();
  const isArabic = language === 'ar';

  const availableOrders = orders.filter(o => 
    o.isDeliveryRequested && 
    o.deliveryStatus === 'pending' && 
    o.status !== 'cancelled' && 
    o.status !== 'rejected'
  );

  const myActiveOrders = orders.filter(o => 
    o.deliveryPersonId === user?.id && 
    o.deliveryStatus !== 'delivered'
  );

  const handleAcceptOrder = (orderId: string) => {
    if (user) {
      acceptDeliveryOrder(orderId, user.id);
    }
  };

  const handleUpdateStatus = (orderId: string, status: 'picked_up' | 'delivered') => {
    updateDeliveryStatus(orderId, status);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-10 pb-10"
    >
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary to-orange-500 p-8 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-2">
            {isArabic ? `مرحباً ${user?.name} 👋` : `Hello ${user?.name} 👋`}
          </h2>
          <p className="text-white/80 font-medium">
            {isArabic ? 'جاهز لتوصيل بعض الطلبات اليوم؟' : 'Ready to deliver some orders today?'}
          </p>
        </div>
      </div>

      {/* My Active Deliveries */}
      {myActiveOrders.length > 0 && (
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-extrabold flex items-center gap-3">
            <Clock className="text-primary" size={24} />
            {isArabic ? 'طلبات التوصيل الحالية' : 'Active Deliveries'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myActiveOrders.map(order => {
              const restaurant = restaurants.find(r => r.id === order.restaurantId);
              return (
                <motion.div 
                  layout
                  key={order.id}
                  className="bg-secondary rounded-3xl p-6 border-2 border-primary/30 shadow-md flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{isArabic ? 'كود الطلب' : 'Order ID'}</span>
                      <span className="text-lg font-black text-primary">#{order.id}</span>
                    </div>
                    <div className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider",
                      order.deliveryStatus === 'accepted' ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {order.deliveryStatus === 'accepted' ? (isArabic ? 'مقبول' : 'Accepted') : (isArabic ? 'تم الاستلام' : 'Picked Up')}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-4 bg-background rounded-2xl border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Package size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-text-muted font-bold">{isArabic ? 'من مطعم' : 'From'}</div>
                        <div className="font-extrabold">{restaurant?.name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-text-muted font-bold">{isArabic ? 'إلى الطالب' : 'To Student'}</div>
                        <div className="font-extrabold">{order.studentName}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text-muted">{isArabic ? 'ربحك' : 'Your Profit'}</span>
                      <span className="text-xl font-black text-green-600">{order.deliveryFee} EGP</span>
                    </div>
                    {order.deliveryStatus === 'accepted' ? (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'picked_up')}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm"
                      >
                        {isArabic ? 'استلام الطلب' : 'Pick Up Order'}
                        <ArrowRight size={18} className={isArabic ? 'rotate-180' : ''} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center gap-2 shadow-sm"
                      >
                        {isArabic ? 'تم التوصيل' : 'Mark Delivered'}
                        <CheckCircle size={18} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Delivery Requests */}
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-extrabold flex items-center gap-3">
          <MapPin className="text-primary" size={24} />
          {isArabic ? 'طلبات توصيل متاحة' : 'Available Requests'}
        </h3>
        
        {availableOrders.length === 0 ? (
          <div className="text-center py-20 bg-secondary rounded-[3rem] border border-dashed border-border">
            <div className="text-6xl mb-4">🛵</div>
            <h4 className="text-xl font-bold text-text-muted">
              {isArabic ? 'لا توجد طلبات توصيل حالياً' : 'No available delivery requests'}
            </h4>
            <p className="text-sm text-text-muted/60 mt-2">
              {isArabic ? 'انتظر قليلاً، ستظهر الطلبات الجديدة هنا.' : 'Wait a moment, new requests will appear here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableOrders.map(order => {
              const restaurant = restaurants.find(r => r.id === order.restaurantId);
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={order.id}
                  className="bg-secondary rounded-[2.5rem] p-6 border border-border hover:border-primary/40 transition-all group flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Package size={24} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-text-muted font-black uppercase tracking-widest">{isArabic ? 'ربح التوصيل' : 'Delivery Profit'}</div>
                      <div className="text-2xl font-black text-primary">{order.deliveryFee} EGP</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-lg mb-1">{restaurant?.name}</h4>
                    <p className="text-xs text-text-muted font-bold flex items-center gap-1">
                      <MapPin size={12} /> {restaurant?.location}
                    </p>
                  </div>

                  <div className="p-4 bg-background rounded-2xl border border-border flex justify-between items-center text-sm font-bold">
                    <span className="text-text-muted">{isArabic ? 'إجمالي الطلب' : 'Total Order'}</span>
                    <span>{order.total} EGP</span>
                  </div>

                  <button 
                    onClick={() => handleAcceptOrder(order.id)}
                    className="w-full bg-primary text-white py-4 rounded-xl font-extrabold hover:bg-primary/90 transition-all shadow-md group-hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isArabic ? 'قبول طلب التوصيل' : 'Accept Delivery'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
