import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { motion } from 'motion/react';
import { Bell, ArrowLeft, Check, Clock, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Notifications() {
  const { t } = useTranslation();
  const { notifications, markNotificationAsRead, user, language } = useStore();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const userNotifications = notifications.filter(n => 
    n.userId === user?.id || (user?.role === 'owner' && n.userId === `owner_${user.restaurantId}`)
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto w-full pb-44"
    >
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors group"
        >
          <ArrowLeft className={cn("transition-transform", isArabic ? "rotate-180" : "group-hover:-translate-x-1")} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-text-main">{t('Notifications')}</h1>
          <p className="text-text-muted font-bold">{userNotifications.length} {t('total messages') || 'messages'}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {userNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted bg-secondary rounded-[3rem] border border-dashed border-border gap-4">
            <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
              <Bell size={40} className="opacity-20" />
            </div>
            <p className="text-xl font-bold">{t('No notifications')}</p>
          </div>
        ) : (
          userNotifications.map((notification, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={notification.id}
              onClick={() => markNotificationAsRead(notification.id)}
              className={cn(
                "p-6 rounded-[2.5rem] border transition-all cursor-pointer relative overflow-hidden group",
                notification.read 
                  ? "bg-secondary/50 border-border opacity-80" 
                  : "bg-secondary border-primary/20 shadow-lg"
              )}
            >
              {!notification.read && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 rounded-bl-[2.5rem] flex items-center justify-center text-primary">
                  <Check size={16} />
                </div>
              )}
              
              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                  notification.read ? "bg-background text-text-muted" : "bg-primary/10 text-primary"
                )}>
                  <Bell size={24} />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={cn(
                      "font-black text-lg",
                      notification.read ? "text-text-main/70" : "text-text-main"
                    )}>
                      {notification.title}
                    </h3>
                  </div>
                  <p className={cn(
                    "leading-relaxed font-medium mb-3",
                    notification.read ? "text-text-muted/80" : "text-text-muted"
                  )}>
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-text-muted/60 bg-background/50 w-fit px-3 py-1.5 rounded-full">
                    <Clock size={12} />
                    {new Date(notification.createdAt).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
