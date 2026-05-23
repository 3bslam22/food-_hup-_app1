import { ReactNode, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Moon, Sun, MapPin, ShoppingCart, Settings, Home, Heart, ClipboardList, LogOut, Bell, Menu, X, MessageCircle, Wallet, User } from 'lucide-react';
import { cn } from '../lib/utils';
import Chatbot from './Chatbot';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANTS } from '../data/mockData';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const { user, theme, setTheme, language, setLanguage, cart, setUser, notifications, markNotificationAsRead, setChatbotOpen, isChatbotOpen, restaurants, restoreRestaurant } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If Festival Land (ID: '2') is accidentally deleted, automatically restore it
    const hasFestival = restaurants.some(r => r.id === '2');
    if (!hasFestival) {
      const festivalTemplate = RESTAURANTS.find(r => r.id === '2');
      if (festivalTemplate) {
        restoreRestaurant(festivalTemplate as any);
      }
    }
  }, [restaurants, restoreRestaurant]);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      
      // Hide during scroll (if not already open)
      if (!isChatbotOpen) {
        setIsChatbotVisible(false);
      }
      
      // Clear previous timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Set timeout to show after scrolling stops
      const timeout = setTimeout(() => {
        setIsChatbotVisible(true);
      }, 800); 
      
      setScrollTimeout(timeout);
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout, isChatbotOpen]);

  const [flyingParticles, setFlyingParticles] = useState<{
    id: string;
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
  }[]>([]);

  useEffect(() => {
    const handleAddToCartAnim = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      const { x, y } = customEvent.detail;
      
      const cartEl = document.getElementById('bottom-cart-icon');
      // Cart is the 4th item out of 5 in English (LTR) (~70% of screen width)
      // Cart is the 2nd item out of 5 in Arabic (RTL) (~30% of screen width)
      let targetX = language === 'ar' ? window.innerWidth * 0.30 : window.innerWidth * 0.70;
      let targetY = window.innerHeight - 60;
      
      if (cartEl) {
        const rect = cartEl.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
      }
      
      const id = Math.random().toString();
      setFlyingParticles(prev => [...prev, {
        id,
        startX: x,
        startY: y,
        targetX,
        targetY
      }]);
      
      setTimeout(() => {
        setFlyingParticles(prev => prev.filter(p => p.id !== id));
      }, 1000);
    };

    window.addEventListener('add-to-cart-animation', handleAddToCartAnim);
    return () => window.removeEventListener('add-to-cart-animation', handleAddToCartAnim);
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    i18n.changeLanguage(language);
  }, [theme, language, i18n]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');
  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return <div className="min-h-screen bg-background text-text-main flex items-center justify-center">{children}</div>;
  }

  const userNotifications = notifications.filter(n => 
    n.userId === user.id || (user.role === 'owner' && n.userId === `owner_${user.restaurantId}`)
  );
  const unreadCount = userNotifications.filter(n => !n.read).length;
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const navItems = user.role === 'student' ? [
    { name: t('Favorites'), icon: Heart, path: '/favorites' },
    { name: t('My Orders'), icon: ClipboardList, path: '/orders' },
    { name: t('Home'), icon: Home, path: '/', prominent: true },
    { name: t('Cart'), icon: ShoppingCart, path: '/cart', badge: cartItemCount },
    { name: t('Account'), icon: User, path: '/account' },
  ] : user.role === 'delivery' ? [
    { name: t('Orders', 'Orders'), icon: ClipboardList, path: '/' },
    { name: t('Transactions', 'Transactions'), icon: Wallet, path: '/delivery-transactions' },
    { name: t('Settings'), icon: Settings, path: '/settings' },
  ] : [
    { name: t('Orders', 'Orders'), icon: ClipboardList, path: '/' },
    { name: t('Manage Menu'), icon: ClipboardList, path: '/menu' },
    { name: t('Settings'), icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex flex-col h-screen bg-background text-text-main overflow-hidden font-sans">
      {/* Main Container */}
      <div className="flex-grow h-full overflow-hidden flex flex-col bg-background">
        {/* Header - Hide on account page to match mockup design */}
        {location.pathname !== '/account' && (
          <header className="p-4 px-6 lg:px-10 flex justify-between items-center bg-transparent shrink-0">
            <div className="font-extrabold text-2xl text-primary flex items-center gap-2">
              <div className="w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden border border-border ring-2 ring-primary/20">
                <img 
                  src="/input_lo.png" 
                  alt="Food Hub Logo" 
                  className="w-full h-full object-contain p-1" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-orange-500 to-primary flex items-center justify-center text-white text-xl font-bold">🍔</div>';
                    }
                  }}
                />
              </div>
              {t('Food Hub')}
            </div>
            
            <div className="flex-grow"></div>

            <div className={cn(
              "flex items-center gap-2 lg:gap-4 p-1.5 lg:p-2 rounded-full border border-border bg-secondary/80 backdrop-blur-md shadow-sm transition-all duration-300"
            )}>
              <div className="relative">
                <button 
                  onClick={() => navigate('/notifications')}
                  className={cn(
                    "w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center border border-border text-text-main relative transition-all",
                    location.pathname === '/notifications' ? "bg-primary text-white border-primary" : "bg-background hover:bg-border/50"
                  )}
                >
                  <motion.div
                    animate={unreadCount > 0 ? {
                      rotate: [0, -10, 10, -10, 10, 0],
                    } : {}}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      repeatDelay: 2
                    }}
                  >
                    <Bell size={18} />
                  </motion.div>
                  {unreadCount > 0 && (
                    <span className={cn(
                      "absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2",
                      location.pathname === '/notifications' ? "border-primary" : "border-background"
                    )}></span>
                  )}
                </button>
              </div>

              <button 
                onClick={toggleTheme}
                className="w-10 h-10 lg:w-11 lg:h-11 bg-background rounded-full flex items-center justify-center border border-border text-text-main hover:bg-border/50 transition-colors"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button 
                onClick={toggleLanguage}
                className="w-10 h-10 lg:w-11 lg:h-11 bg-background rounded-full flex items-center justify-center border border-border text-text-main font-bold text-xs hover:bg-border/50 transition-colors"
              >
                {language === 'en' ? 'AR' : 'EN'}
              </button>
              <div className="flex items-center gap-3 ml-2">
                <div className="text-right rtl:text-left hidden sm:block">
                  <div className="text-sm font-extrabold">{user.name}</div>
                  <div className="text-[10px] text-text-muted font-black uppercase tracking-wider">
                    {user.role === 'student' ? t('Student') : user.role === 'delivery' ? (language === 'ar' ? 'دليفري' : 'Delivery') : t('Restaurant Owner')}
                  </div>
                </div>
                <div 
                  onClick={() => navigate('/account')}
                  className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold text-lg overflow-hidden border border-border cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Content Area with Transition Animation */}
        <main 
          ref={mainRef}
          className="flex-grow overflow-y-auto custom-scrollbar p-6 lg:p-10 pt-4 lg:pt-6 pb-24 lg:pb-10 relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation for Everyone */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-xl border-t border-border px-4 py-3 flex justify-around items-center rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          {navItems.map((item: any) => {
            const isActive = location.pathname === item.path;
            const isProminent = item.prominent;

            if (isProminent) {
              return (
                <div key={item.name} className="relative -top-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={isActive ? {
                      y: [0, -5, 0],
                    } : {}}
                    transition={{
                      repeat: isActive ? Infinity : 0,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(255,107,0,0.3)] transition-all border-4 border-background",
                      isActive ? "bg-primary text-white" : "bg-primary/90 text-white"
                    )}
                  >
                    <item.icon size={30} className={cn(isActive ? "fill-white/20" : "")} />
                  </motion.button>
                  <span className={cn(
                    "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-tight whitespace-nowrap transition-colors",
                    isActive ? "text-primary" : "text-text-muted"
                  )}>
                    {item.name}
                  </span>
                </div>
              );
            }

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all relative py-2 px-4 rounded-2xl min-w-[64px]",
                  isActive ? "text-primary bg-primary/5 scale-110" : "text-text-muted hover:text-text-main"
                )}
                id={item.path === '/cart' ? 'bottom-cart-icon' : undefined}
              >
                <item.icon size={24} className={cn(isActive ? "fill-primary/20" : "", "transition-transform duration-300")} />
                <span className="text-[10px] font-bold tracking-tight">{item.name}</span>
                {(item as any).badge > 0 && (
                  <motion.span 
                    key={(item as any).badge}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: [0.6, 1.4, 0.9, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-1 right-3 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-secondary"
                  >
                    {(item as any).badge}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
      <AnimatePresence>
        {user.role === 'student' && isChatbotVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-28 right-6 z-[60]"
          >
            <Chatbot />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {flyingParticles.map(flying => (
          <motion.div
            key={flying.id}
            initial={{ 
              left: 0, 
              top: 0, 
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 9999,
              direction: 'ltr'
            }}
            animate={{ 
              x: [flying.startX - 20, (flying.startX + flying.targetX) / 2 - 20, flying.targetX - 20],
              y: [flying.startY - 20, Math.min(flying.startY, flying.targetY) - 150, flying.targetY - 20],
              scale: [1, 1.3, 0.3],
              opacity: [1, 1, 0.9, 0],
              rotate: [0, 180, 540],
            }}
            transition={{ 
              duration: 0.9, 
              ease: [0.25, 1, 0.5, 1] 
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-orange-500 text-white flex items-center justify-center shadow-[0_8px_20px_rgba(255,107,0,0.5)] border-2 border-white"
          >
            <ShoppingCart size={16} className="text-white" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
