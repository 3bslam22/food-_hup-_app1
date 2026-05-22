import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { ArrowRight, Clock, MapPin, Phone, Text, Image as ImageIcon, XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import ConfirmModal from '../components/ConfirmModal';
import { cn } from '../lib/utils';

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { orders, restaurants, user, updateOrderStatus, updateDeliveryStatus, language } = useStore();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-full text-center">
        <h2 className="text-2xl font-bold text-text-main mb-4">{t('Order Not Found')}</h2>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90"
        >
          {t('Go Back')}
        </button>
      </div>
    );
  }

  const restaurant = restaurants.find(r => r.id === order.restaurantId);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'preparing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ready': return 'bg-green-100 text-green-700 border-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-100 text-gray-700 bg-border';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return t('Pending');
      case 'preparing': return t('Preparing');
      case 'ready': return t('Ready for Pickup');
      case 'delivered': return t('Delivered');
      case 'cancelled': return 'ملغي (Cancelled)';
      case 'rejected': return 'مرفوض (Rejected)';
      default: return status;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-44"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-secondary hover:bg-border transition-colors rounded-full text-text-main border border-border"
        >
          <ArrowRight className="rtl:rotate-180" size={20} />
        </button>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t('Order Details')}</h2>
      </div>

      <div className="bg-secondary rounded-[2rem] p-6 md:p-8 shadow-sm border border-border flex flex-col gap-8">
        
        {/* Header Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
          <div className="flex flex-col gap-1">
            <span className="text-text-muted text-sm font-bold uppercase tracking-wider">{t('Order ID')} #{order.id}</span>
            <div className="flex items-center gap-2 mt-1">
              <Clock size={16} className="text-primary"/>
              <span className="text-text-main font-semibold">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </div>
        </div>

        {/* Entities context depending on role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border">
          {user?.role === 'student' ? (
            <div className="flex flex-col gap-3">
              <h3 className="font-extrabold text-lg text-text-main">{t('Restaurant Info')}</h3>
              {restaurant && (
                <div className="flex items-start gap-4 mt-2">
                  <div className="w-16 h-16 bg-background rounded-xl p-1 border border-border overflow-hidden flex items-center justify-center text-4xl">
                    {restaurant.icon && (restaurant.icon.includes('.') || restaurant.icon.startsWith('/') || restaurant.icon.includes('input_file')) ? (
                      <img 
                        src={restaurant.icon} 
                        alt={restaurant.name} 
                        className="w-full h-full object-contain p-1" 
                        referrerPolicy="no-referrer"
                      />
                    ) : restaurant.icon || '🏪'}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-text-main">{restaurant.name}</span>
                    <span className="flex items-center gap-1.5 text-sm text-text-muted"><MapPin size={14} className="text-primary"/> {restaurant.location}</span>
                    {restaurant.contactInfo && (
                       <span className="flex items-center gap-1.5 text-sm text-text-muted"><Phone size={14} className="text-primary"/> {restaurant.contactInfo}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h3 className="font-extrabold text-lg text-text-main">{t('Customer Info')}</h3>
              <div className="flex flex-col gap-1 mt-2">
                <span className="font-bold text-text-main">{order.studentName}</span>
                <span className="text-sm text-text-muted">ID: {order.studentId}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-3">
            <h3 className="font-extrabold text-lg text-text-main">{t('Payment Method')}</h3>
            <div className="mt-2 text-text-main font-semibold bg-background border border-border p-3 rounded-xl inline-flex w-max">
              {order.paymentMethod === 'online' ? 'دفع إلكتروني' : 'الدفع عند الاستلام'}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-4">
          <h3 className="font-extrabold text-lg text-text-main">{t('Order Items')}</h3>
          <div className="flex flex-col gap-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-background border border-border p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">{item.quantity}x</span>
                  <span className="font-bold text-text-main">{item.name}</span>
                </div>
                <span className="font-extrabold text-text-main">{item.price * item.quantity} <span className="text-sm font-bold text-text-muted">EGP</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        {order.note && (
          <div className="flex flex-col gap-2 mt-2 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-2xl border border-yellow-200 dark:border-yellow-900/50">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
              <Text size={16}/> {t('Note from customer')}
            </h4>
            <p className="text-yellow-700 dark:text-yellow-300">{order.note}</p>
          </div>
        )}

        {/* Payment Screenshot */}
        {order.paymentScreenshot && (
          <div className="flex flex-col gap-4 mt-2 p-4 bg-primary/5 rounded-2xl border border-primary/20">
            <h4 className="font-bold text-primary flex items-center gap-2">
              <ImageIcon size={18}/> صورة إثبات الدفع (Payment Proof)
            </h4>
            <div className="rounded-xl overflow-hidden border border-border">
              <img src={order.paymentScreenshot} alt="Payment Proof" className="w-full object-contain max-h-[400px] bg-background" />
            </div>
            <a 
              href={order.paymentScreenshot} 
              target="_blank"
              rel="noreferrer"
              className="text-center text-sm font-bold text-primary hover:underline"
            >
              فتح الصورة في نافذة جديدة
            </a>
          </div>
        )}

        {/* Total Summary */}
        <div className="mt-2 pt-6 border-t border-border flex flex-col gap-2">
          {order.isDeliveryRequested && (
            <>
              <div className="flex justify-between items-center text-sm font-bold text-text-muted">
                <span>{t('Subtotal', 'Subtotal')}</span>
                <span>{order.total - (order.deliveryFee || 0)} EGP</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-primary">
                <span>{language === 'ar' ? 'رسوم التوصيل (5%)' : 'Delivery Fee (5%)'}</span>
                <span>+{order.deliveryFee} EGP</span>
              </div>
            </>
          )}
          <div className="flex justify-between items-center mt-2">
            <div className="text-xl font-bold text-text-muted">{t('Total Amount')}</div>
            <div className="text-3xl font-extrabold text-primary">{order.total} <span className="text-lg text-text-main font-bold">EGP</span></div>
          </div>
        </div>

        {/* Delivery Status for Student and Delivery role */}
        {order.isDeliveryRequested && (
          <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-200 dark:border-orange-900/50 flex flex-col gap-3">
            <h4 className="font-bold text-orange-800 dark:text-orange-200 flex items-center gap-2">
              <MapPin size={18}/> {language === 'ar' ? 'حالة التوصيل' : 'Delivery Status'}
            </h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className={cn(
                "px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider",
                order.deliveryStatus === 'pending' ? "bg-yellow-100 text-yellow-700" :
                order.deliveryStatus === 'accepted' ? "bg-blue-100 text-blue-700" :
                order.deliveryStatus === 'picked_up' ? "bg-orange-100 text-orange-700" :
                "bg-green-100 text-green-700"
              )}>
                {order.deliveryStatus === 'pending' && (language === 'ar' ? 'قيد البحث عن مندوب' : 'Searching for Delivery')}
                {order.deliveryStatus === 'accepted' && (language === 'ar' ? 'تم قبول الطلب' : 'Delivery Accepted')}
                {order.deliveryStatus === 'picked_up' && (language === 'ar' ? 'تم استلام الطلب' : 'Picked Up')}
                {order.deliveryStatus === 'delivered' && (language === 'ar' ? 'تم التوصيل' : 'Delivered')}
              </div>

              {user?.role === 'delivery' && order.deliveryPersonId === user.id && order.deliveryStatus === 'picked_up' && (
                <button 
                  onClick={() => setIsDeliveryModalOpen(true)}
                  className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                  {language === 'ar' ? 'تأكيد التسليم' : 'Confirm Delivery'}
                  <CheckCircle size={18} />
                </button>
              )}

              {user?.role === 'delivery' && order.deliveryPersonId === user.id && order.deliveryStatus === 'accepted' && (
                <button 
                  onClick={() => updateDeliveryStatus(order.id, 'picked_up')}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                  {language === 'ar' ? 'استلام الطلب' : 'Pick Up'}
                  <ArrowRight size={18} className="rtl:rotate-180" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Cancellation for student - Move outside the main card into a separate rectangle */}
      {user?.role === 'student' && order.status === 'pending' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-900/30 rounded-[2rem] p-6 flex flex-col gap-4 shadow-sm"
        >
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <XCircle size={24} />
            </div>
            <div>
              <h3 className="font-black text-lg">{language === 'ar' ? 'هل تريد إلغاء الطلب؟' : 'Want to cancel?'}</h3>
              <p className="text-sm font-medium opacity-80">{language === 'ar' ? 'لا يزال بإمكانك إلغاء الطلب قبل بدئنا في تجهيزه.' : 'You can still cancel before preparation starts.'}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCancelModalOpen(true)}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-lg hover:bg-red-700 transition-all active:scale-[0.98]"
          >
            {t('Cancel Order')}
          </button>
        </motion.div>
      )}

      <ConfirmModal 
        isOpen={isCancelModalOpen}
        title="إلغاء الطلب"
        message="هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟"
        onConfirm={() => {
          updateOrderStatus(order.id, 'cancelled');
          setIsCancelModalOpen(false);
        }}
        onCancel={() => setIsCancelModalOpen(false)}
        confirmText="نعم، إلغاء"
        cancelText="لا، العودة"
      />

      <ConfirmModal 
        isOpen={isDeliveryModalOpen}
        title={language === 'ar' ? 'تأكيد التوصيل' : 'Confirm Delivery'}
        message={language === 'ar' ? 'هل تود تأكيد وصول الطلب للعميل؟' : 'Are you sure you want to mark this order as delivered?'}
        onConfirm={() => {
          updateDeliveryStatus(order.id, 'delivered');
          setIsDeliveryModalOpen(false);
        }}
        onCancel={() => setIsDeliveryModalOpen(false)}
        confirmText={language === 'ar' ? 'تأكيد' : 'Confirm'}
        cancelText={language === 'ar' ? 'إلغاء' : 'Cancel'}
        variant="primary"
      />
    </motion.div>
  );
}
