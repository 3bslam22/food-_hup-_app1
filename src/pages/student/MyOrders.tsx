import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function MyOrders() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, orders, restaurants, updateOrderStatus, language } = useStore();
  const [cancelModal, setCancelModal] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null
  });

  const myOrders = orders.filter(o => o.studentId === user?.id);
  
  const handleCancelClick = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    setCancelModal({ isOpen: true, orderId });
  };

  const confirmCancel = () => {
    if (cancelModal.orderId) {
      updateOrderStatus(cancelModal.orderId, 'cancelled');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'preparing': return 'bg-blue-100 text-blue-700';
      case 'ready': return 'bg-green-100 text-green-700';
      case 'delivered': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'rejected': return 'bg-red-50 text-red-500 border border-red-100';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full pb-44">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors group"
        >
          <ArrowRight className={cn("transition-transform", language === 'ar' ? "" : "rotate-180 group-hover:-translate-x-1")} />
        </button>
        <h2 className="text-3xl font-extrabold tracking-tight">{t('My Orders')}</h2>
      </div>
      
      {myOrders.length === 0 ? (
        <div className="text-center py-10 text-text-muted bg-secondary rounded-xl border border-border">
          {t('No orders yet')}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {myOrders.map(order => {
            const restaurant = restaurants.find(r => r.id === order.restaurantId);
            return (
              <div 
                key={order.id} 
                className="bg-secondary rounded-[1.5rem] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-border flex flex-col gap-3 transition-colors"
              >
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-background rounded-xl border border-border overflow-hidden flex items-center justify-center text-2xl shrink-0">
                      {restaurant?.icon && (restaurant.icon.includes('.') || restaurant.icon.startsWith('/') || restaurant.icon.includes('input_file')) ? (
                        <img 
                          src={restaurant.icon} 
                          alt={restaurant.name} 
                          className="w-full h-full object-contain p-1" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        restaurant?.icon || '🏪'
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-lg">{restaurant?.name || 'Unknown Restaurant'}</div>
                      {order.isDeliveryRequested && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600">
                          <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></span>
                          {order.deliveryStatus === 'pending' ? 'جاري البحث عن دليفري' : 
                           order.deliveryStatus === 'accepted' ? 'الدليفري في الطريق للمطعم' : 
                           order.deliveryStatus === 'picked_up' ? 'الدليفري استلم طلبك' : 'تم التوصيل'}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="text-sm text-text-muted">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-1">
                      <div className="flex items-center gap-2">
                        <span>{item.quantity}x {item.name}</span>
                        {item.isOffer && (
                          <span className="text-[8px] bg-primary text-white px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">{t('OFFER')}</span>
                        )}
                      </div>
                      <span>{item.price * item.quantity} EGP</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-text-muted">{new Date(order.createdAt).toLocaleString()}</div>
                    {order.status === 'pending' && (
                      <div className="h-4"></div>
                    )}
                  </div>
                  <button 
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-xs hover:bg-primary/20 transition-all"
                  >
                    {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal 
        isOpen={cancelModal.isOpen}
        title="إلغاء الطلب"
        message="هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟"
        onConfirm={confirmCancel}
        onCancel={() => setCancelModal({ isOpen: false, orderId: null })}
        confirmText="نعم، إلغاء"
        cancelText="لا، العودة"
      />
    </div>
  );
}
