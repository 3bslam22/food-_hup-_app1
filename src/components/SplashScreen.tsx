import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Hide after exactly 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-orange-500 text-white"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl overflow-hidden ring-4 ring-white/30 border border-border">
          <img 
            src="/input_lo.png" 
            alt="Logo" 
            className="w-full h-full object-contain p-4" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-orange-500 to-primary flex items-center justify-center text-white text-6xl font-bold">🍔</div>';
              }
            }}
          />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-center">
          مرحباً بك في <br /> Food Hub
        </h1>
        <p className="text-xl font-medium opacity-90 text-center max-w-xs">
          أشهى المأكولات من أفضل المطاعم، تصلك أينما كنت!
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10"
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </motion.div>
    </motion.div>
  );
}
