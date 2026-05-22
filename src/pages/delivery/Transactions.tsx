import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { motion } from 'motion/react';
import { Wallet, ArrowUpRight, TrendingUp, Calendar, History } from 'lucide-react';

export default function DeliveryTransactions() {
  const { t } = useTranslation();
  const { user, orders, language } = useStore();
  const isArabic = language === 'ar';

  const myDeliveredOrders = orders.filter(o => 
    o.deliveryPersonId === user?.id && 
    o.deliveryStatus === 'delivered'
  );

  const totalEarnings = myDeliveredOrders.reduce((sum, o) => sum + (o.deliveryFee || 0), 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-2xl mx-auto w-full pb-20"
    >
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4 text-white/80">
            <TrendingUp size={20} />
            <span className="font-bold tracking-widest text-sm uppercase">{isArabic ? 'إجمالي الأرباح' : 'Total Earnings'}</span>
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-6xl font-black">{totalEarnings}</span>
            <span className="text-xl font-bold opacity-80">EGP</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="text-xs font-bold text-white/60 mb-1">{isArabic ? 'طلبات مكتملة' : 'Completed'}</div>
              <div className="text-2xl font-black">{myDeliveredOrders.length}</div>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="text-xs font-bold text-white/60 mb-1">{isArabic ? 'هذا الشهر' : 'This Month'}</div>
              <div className="text-2xl font-black">{totalEarnings}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-black text-text-main flex items-center gap-3 px-2">
          <History className="text-primary" size={24} />
          {isArabic ? 'سجل العمليات' : 'History'}
        </h3>
        
        <div className="bg-secondary rounded-[2.5rem] p-4 border border-border shadow-sm flex flex-col gap-2">
          {myDeliveredOrders.length === 0 ? (
            <div className="p-10 text-center text-text-muted italic">
              {isArabic ? 'لا توجد أرباح مسجلة بعد' : 'No earnings recorded yet'}
            </div>
          ) : (
            myDeliveredOrders.map((order, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-5 rounded-2xl bg-background/50 hover:bg-background transition-all border border-transparent hover:border-border group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                    <ArrowUpRight size={24} />
                  </div>
                  <div>
                    <div className="font-extrabold text-lg group-hover:text-primary transition-colors">
                      {isArabic ? 'توصيل طلب' : 'Delivery Profit'} #{order.id}
                    </div>
                    <div className="text-sm text-text-muted font-bold flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-xl font-black text-green-600">
                  +{order.deliveryFee} EGP
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
