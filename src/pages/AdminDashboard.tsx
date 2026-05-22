import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Store, ShoppingBag, 
  CheckCircle, XCircle, AlertCircle, Bell,
  ShieldCheck, ArrowLeft, Trash2, Send
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const { language, user, restaurants, deleteRestaurant, updateRestaurantProfile } = useStore();
  const navigate = useNavigate();
  const isArabic = language === 'ar';
  
  // States
  const [activeTab, setActiveTab] = useState('stats'); // stats, approval, notifications
  const [notificationTarget, setNotificationTarget] = useState('all');
  const [notificationText, setNotificationText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Security check - Force redirect if not admin
  if (user?.email !== 'ahmedelsalam3000@gmail.com' && user?.email !== 'elbeltagyesmail19@gmail.com') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-black">{isArabic ? 'غير مصرح لك بالدخول' : 'Unauthorized Access'}</h1>
        <button onClick={() => navigate('/')} className="mt-4 text-primary font-bold">{isArabic ? 'العودة للرئيسية' : 'Back to Home'}</button>
      </div>
    );
  }

  // Placeholder stats (initialized as 0 or from store)
  const studentsCount = 0; // Will be real when DB is connected
  const deliveryCount = 0;
  const restaurantsCount = restaurants.length;

  const handleSendNotification = () => {
    if (!notificationText.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setNotificationText('');
      alert(isArabic ? 'تم إرسال الإشعار بنجاح!' : 'Notification sent successfully!');
    }, 1500);
  };

  const handleApprove = (id: string) => {
    // In current mock logic, all are active, but let's simulate
    updateRestaurantProfile(id, { isOpen: true });
  };

  return (
    <div className="min-h-screen bg-background pb-44">
      {/* Header */}
      <div className="bg-primary p-6 text-white relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <ArrowLeft className={isArabic ? 'rotate-180' : ''} />
          </button>
          
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <ShieldCheck size={28} />
              {isArabic ? 'لوحة تحكم المدير' : 'ADMIN PANEL'}
            </h1>
            <div className="px-3 py-0.5 bg-white/20 rounded-full text-[10px] font-black uppercase mt-1">
              {isArabic ? 'تحكم كامل للنظام' : 'Full System Control'}
            </div>
          </div>
          
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex bg-secondary p-1 rounded-2xl border border-border">
          <button 
            onClick={() => setActiveTab('stats')}
            className={cn(
              "flex-1 py-3 rounded-xl font-black text-sm transition-all",
              activeTab === 'stats' ? "bg-primary text-white shadow-lg" : "text-text-muted hover:text-text-main"
            )}
          >
            {isArabic ? 'الإحصائيات' : 'OVERVIEW'}
          </button>
          <button 
            onClick={() => setActiveTab('approval')}
            className={cn(
              "flex-1 py-3 rounded-xl font-black text-sm transition-all",
              activeTab === 'approval' ? "bg-primary text-white shadow-lg" : "text-text-muted hover:text-text-main"
            )}
          >
            {isArabic ? 'إدارة المطاعم' : 'RESTAURANTS'}
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={cn(
              "flex-1 py-3 rounded-xl font-black text-sm transition-all",
              activeTab === 'notifications' ? "bg-primary text-white shadow-lg" : "text-text-muted hover:text-text-main"
            )}
          >
            {isArabic ? 'الإشعارات' : 'NOTIFICATIONS'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'stats' && (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Primary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary rounded-[2.5rem] p-6 border border-border shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                    <Users size={24} />
                  </div>
                  <div className="text-3xl font-black text-text-main">{studentsCount}</div>
                  <div className="text-xs font-black text-text-muted uppercase tracking-widest">{isArabic ? 'عدد الطلبة' : 'Students'}</div>
                </div>
                
                <div className="bg-secondary rounded-[2.5rem] p-6 border border-border shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-3">
                    <Store size={24} />
                  </div>
                  <div className="text-3xl font-black text-text-main">{restaurantsCount}</div>
                  <div className="text-xs font-black text-text-muted uppercase tracking-widest">{isArabic ? 'المطاعم الحالية' : 'Restaurants'}</div>
                </div>

                <div className="bg-secondary rounded-[2.5rem] p-6 border border-border shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="text-3xl font-black text-text-main">{deliveryCount}</div>
                  <div className="text-xs font-black text-text-muted uppercase tracking-widest">{isArabic ? 'عدد الدليفري' : 'Delivery Staff'}</div>
                </div>
              </div>

              {/* Detailed Profits Table */}
              <div className="bg-secondary rounded-[2.5rem] p-6 sm:p-8 border border-border shadow-md overflow-hidden">
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                  <ShoppingBag size={24} className="text-primary" />
                  {isArabic ? 'تفاصيل أرباح وطلبات المطاعم' : 'Restaurant Profits & Orders'}
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-text-muted text-[10px] font-black uppercase tracking-widest border-b border-border">
                        <th className="pb-4 px-2">{isArabic ? 'المطعم' : 'Restaurant'}</th>
                        <th className="pb-4 px-2">{isArabic ? 'عدد الطلبات' : 'Orders'}</th>
                        <th className="pb-4 px-2">{isArabic ? 'إجمالي الأرباح' : 'Total Profit'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {restaurants.map((rest) => (
                        <tr key={rest.id} className="group hover:bg-background transition-colors">
                          <td className="py-4 px-2 font-black text-text-main">{rest.name}</td>
                          <td className="py-4 px-2 font-bold text-text-muted">0</td>
                          <td className="py-4 px-2">
                            <span className="font-black text-green-500">0.00 EGP</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'approval' && (
            <motion.div 
              key="approval"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-black px-4">{isArabic ? 'إدارة المطاعم الحالية' : 'MANAGE RESTAURANTS'}</h3>
              
              <div className="grid gap-4">
                {restaurants.map((rest) => (
                  <div key={rest.id} className="bg-secondary rounded-[2rem] p-6 border border-border shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center font-black text-primary">
                        {rest.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-lg">{rest.name}</div>
                        <div className="text-xs text-text-muted font-bold">{rest.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleApprove(rest.id)}
                        className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm"
                        title={isArabic ? 'موافقة' : 'Approve'}
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button 
                        onClick={() => deleteRestaurant(rest.id)}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title={isArabic ? 'حذف' : 'Delete'}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div 
              key="notifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary rounded-[2.5rem] p-6 sm:p-10 border border-border shadow-md space-y-6"
            >
              <div>
                <h3 className="text-2xl font-black mb-1">{isArabic ? 'إرسال إشعارات' : 'Send Notifications'}</h3>
                <p className="text-sm text-text-muted font-bold">{isArabic ? 'تواصل مع مستخدمي المنصة بضغطة واحدة' : 'Sync alerts across all user segments'}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted block mb-2 px-2">{isArabic ? 'الفئة المستهدفة' : 'Target Audience'}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['all', 'students', 'restaurants', 'delivery'].map((target) => (
                      <button
                        key={target}
                        onClick={() => setNotificationTarget(target)}
                        className={cn(
                          "py-3 rounded-xl font-black text-xs transition-all border",
                          notificationTarget === target 
                            ? "bg-primary border-primary text-white shadow-lg" 
                            : "bg-background border-border text-text-muted hover:border-primary/30"
                        )}
                      >
                        {target.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted block mb-2 px-2">{isArabic ? 'نص الرسالة' : 'Message Text'}</label>
                  <textarea 
                    value={notificationText}
                    onChange={(e) => setNotificationText(e.target.value)}
                    placeholder={isArabic ? 'اكتب ما تريد إرساله هنا...' : 'Type your message here...'}
                    className="w-full bg-background border border-border rounded-2xl p-4 min-h-[120px] font-bold text-text-main focus:ring-2 ring-primary/20 outline-none transition-all"
                  />
                </div>

                <button 
                  onClick={handleSendNotification}
                  disabled={isSending || !notificationText.trim()}
                  className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      {isArabic ? 'إرسال الآن' : 'SEND NOW'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warning Section */}
        <div className="mt-12 bg-red-50 dark:bg-red-900/10 border-2 border-dashed border-red-200 dark:border-red-900/30 p-6 rounded-[2.5rem]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-lg">
              <AlertCircle size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-red-600 dark:text-red-400 text-lg">{isArabic ? 'تنبيه أمني هام' : 'Security Warning'}</h4>
              <p className="text-sm font-black text-red-500/80 leading-relaxed italic">
                {isArabic 
                  ? 'ذكره: هذه لوحة تحكم خاصة بالمدير فقط. أي تغييرات هنا تؤثر على نظام الجامعة بالكامل. يرجى الحذر عند إجراء عمليات الحذف أو التعديل.' 
                  : 'Remember: This is a restricted admin panel. Any changes here affect the entire university system. Please be cautious when performing deletions or modifications.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
