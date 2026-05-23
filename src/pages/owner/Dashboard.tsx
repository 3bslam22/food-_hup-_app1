import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { motion } from 'motion/react';
import { FileText, Eye, Image as ImageIcon, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const restaurants = useStore(state => state.restaurants);
  const orders = useStore(state => state.orders);
  const updateOrderStatus = useStore(state => state.updateOrderStatus);

  const restaurant = restaurants.find(r => r.id === user?.restaurantId);
  const restaurantOrders = orders.filter(o => o.restaurantId === user?.restaurantId);
  const activeOrders = restaurantOrders.filter(o => o.status !== 'delivered');

  if (!restaurant) {
    return <div className="p-8 text-center text-text-muted">Restaurant not found</div>;
  }

  const handleStatusChange = (orderId: string, currentStatus: string) => {
    if (currentStatus === 'pending') updateOrderStatus(orderId, 'preparing');
    else if (currentStatus === 'preparing') updateOrderStatus(orderId, 'ready');
    else if (currentStatus === 'ready') updateOrderStatus(orderId, 'delivered');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 pb-36"
    >
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-primary mb-3">مرحباً بك يا {user?.name} 👋</h2>
          <p className="text-text-main font-medium text-lg">لديك <span className="font-extrabold text-primary text-xl mx-1">{activeOrders.length}</span> طلبات نشطة في مطعم {restaurant.name}.</p>
        </div>
        {user?.avatar && (
          <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-lg shrink-0 hidden md:block">
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div>
        <h3 className="text-3xl font-extrabold tracking-tight mb-6">{t('Orders')}</h3>
        {restaurantOrders.length === 0 ? (
          <div className="text-center py-16 text-text-muted bg-secondary rounded-3xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="text-5xl mb-4">📋</div>
            <div className="text-xl font-bold">No orders yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurantOrders.map((order, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={order.id} 
                className="bg-secondary rounded-[2rem] p-6 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border hover:border-primary/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-xl">#{order.id}</span>
                      <span className="text-sm text-text-muted font-bold bg-background px-3 py-1 rounded-full border border-border">{order.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        title={t('View Details')}
                      >
                        <Eye size={16} />
                      </button>
                      {order.isDeliveryRequested && (
                        <div className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg flex items-center gap-1.5 font-bold text-[10px]">
                          <Package className="w-3 h-3" />
                          Delivery
                        </div>
                      )}
                      <span className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'ready' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm font-bold">
                        <div className="flex items-center gap-2">
                          <span>{item.quantity}x {item.name}</span>
                          {item.isOffer && (
                            <span className="text-[8px] bg-primary text-white px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">{t('OFFER')}</span>
                          )}
                        </div>
                        <span className="text-text-muted">{item.price * item.quantity} EGP</span>
                      </div>
                    ))}
                  </div>

                  {order.note && (
                    <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800/30 flex gap-3 items-start">
                      <FileText size={18} className="text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-yellow-800 dark:text-yellow-300 font-bold leading-relaxed">{order.note}</p>
                    </div>
                  )}

                  {order.paymentScreenshot && (
                    <div className="mb-4 p-4 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                        <ImageIcon size={14} />
                        صورة إثبات الدفع (Payment Proof)
                      </div>
                      <a href={order.paymentScreenshot} target="_blank" rel="noreferrer" className="block w-full h-32 overflow-hidden rounded-xl border border-border hover:border-primary transition-colors">
                        <img src={order.paymentScreenshot} alt="Payment Proof" className="w-full h-full object-cover" />
                      </a>
                    </div>
                  )}
                  
                  <div className="font-extrabold text-3xl text-primary mb-6 pt-4 border-t border-border">{order.total} <span className="text-sm text-text-main font-bold">EGP</span></div>
                </div>
                
                <div className="flex flex-col gap-2 mt-auto">
                  {order.status === 'pending' && (
                    <div className="flex flex-col gap-2">
                      <button onClick={() => handleStatusChange(order.id, order.status)} className="w-full bg-primary text-white py-3 md:py-4 rounded-xl font-bold text-lg hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-sm active:translate-y-0">
                        {t('Accept Order')}
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('هل تريد رفض هذا الطلب؟ سيتم إخطار الطالب بأن الطلب غير متاح.')) {
                            updateOrderStatus(order.id, 'rejected');
                          }
                        }}
                        className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100 transition-all border border-red-100"
                      >
                        رفض الطلب (غير متاح حالياً)
                      </button>
                    </div>
                  )}
                  {order.status === 'preparing' && (
                    <button onClick={() => handleStatusChange(order.id, order.status)} className="w-full bg-blue-500 text-white py-3 md:py-4 rounded-xl font-bold text-lg hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-sm active:translate-y-0">
                      {t('Mark as Ready')}
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button onClick={() => handleStatusChange(order.id, order.status)} className="w-full bg-green-500 text-white py-3 md:py-4 rounded-xl font-bold text-lg hover:bg-green-600 hover:-translate-y-1 transition-all shadow-sm active:translate-y-0">
                      {t('Mark as Delivered')}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
