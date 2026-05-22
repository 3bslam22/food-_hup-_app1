import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  showCancel?: boolean;
}

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  variant = 'danger',
  showCancel = true
}: ConfirmModalProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
            <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-secondary w-full max-w-sm rounded-[2.5rem] shadow-2xl z-10 overflow-hidden border border-border"
          >
            <div className="p-6 text-right">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                variant === 'danger' ? 'bg-red-100 dark:bg-red-900/30 text-red-500' : 'bg-primary/10 text-primary'
              }`}>
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-main mb-2">{title}</h3>
              <div className="text-text-muted">{message}</div>
            </div>
            <div className="bg-background/50 p-4 flex gap-3 rtl:flex-row-reverse border-t border-border">
              {showCancel && (
                <button 
                  onClick={onCancel}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-text-main hover:bg-border transition-colors focus:ring-2 focus:ring-border"
                >
                  {cancelText}
                </button>
              )}
              <button 
                onClick={onConfirm}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition-colors focus:ring-2 ${
                  variant === 'danger' 
                    ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500/50' 
                    : 'bg-primary hover:bg-primary/90 focus:ring-primary/50'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
