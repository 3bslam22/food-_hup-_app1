import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { motion } from 'motion/react';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, History, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function Wallet() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { balance, language, addFunds } = useStore();
  const isArabic = language === 'ar';
  
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const transactions = [
    { title: isArabic ? 'طلب من ماكدونالدز' : 'McDonald\'s Order', date: '2024-04-26', amount: -250, type: 'expense' },
    { title: isArabic ? 'شحن رصيد' : 'Top Up', date: '2024-04-25', amount: 500, type: 'income' },
    { title: isArabic ? 'طلب من كنتاكي' : 'KFC Order', date: '2024-04-24', amount: -180, type: 'expense' },
  ];

  const handleDeposit = () => {
    const amt = parseFloat(depositAmount);
    if (!isNaN(amt) && amt > 0) {
      addFunds(amt);
      setDepositAmount('');
      setIsDepositOpen(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-2xl mx-auto w-full pb-44"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors group"
        >
          <ArrowLeft className={cn("transition-transform", isArabic ? "rotate-180" : "group-hover:-translate-x-1")} />
        </button>
        <h2 className="text-3xl font-extrabold tracking-tight">{t('Wallet')}</h2>
      </div>

      <div className="bg-gradient-to-br from-primary to-orange-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4 text-white/80">
            <WalletIcon size={20} />
            <span className="font-bold tracking-widest text-sm uppercase">{t('Balance')}</span>
          </div>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-6xl font-black">{balance}</span>
            <span className="text-xl font-bold opacity-80">EGP</span>
          </div>
          
          <button 
            onClick={() => setIsDepositOpen(true)}
            className="flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all text-lg"
          >
            <Plus size={24} />
            {isArabic ? 'شحن رصيد' : 'Add Funds'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-black text-text-main flex items-center gap-3 px-2">
          <History className="text-primary" size={24} />
          {t('Transactions')}
        </h3>
        
        <div className="bg-secondary rounded-[2.5rem] p-4 border border-border shadow-sm flex flex-col gap-2">
          {transactions.map((tx, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-5 rounded-2xl bg-background/50 hover:bg-background transition-all border border-transparent hover:border-border group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {tx.type === 'income' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                </div>
                <div>
                  <div className="font-extrabold text-lg group-hover:text-primary transition-colors">{tx.title}</div>
                  <div className="text-sm text-text-muted font-bold">{tx.date}</div>
                </div>
              </div>
              <div className={`text-xl font-black ${tx.type === 'income' ? 'text-green-600' : 'text-text-main'}`}>
                {tx.type === 'income' ? '+' : ''}{tx.amount} EGP
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDepositOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-secondary p-8 rounded-[3rem] w-full max-w-md shadow-2xl border border-border"
          >
            <h4 className="text-2xl font-black mb-6 text-center">{isArabic ? 'كم تريد أن تشحن؟' : 'How much to add?'}</h4>
            <div className="flex flex-col gap-6">
              <div className="relative">
                <input 
                  type="number" 
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-background border-2 border-border focus:border-primary rounded-2xl px-6 py-5 text-3xl font-black text-center outline-none transition-all"
                  autoFocus
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-text-muted font-bold">EGP</span>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsDepositOpen(false)}
                  className="flex-1 py-4 rounded-2xl font-bold bg-background border border-border text-text-muted hover:bg-border transition-all"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                <button 
                  onClick={handleDeposit}
                  className="flex-1 py-4 rounded-2xl font-black bg-primary text-white shadow-lg hover:bg-primary/90 transition-all"
                >
                  {isArabic ? 'شحن الآن' : 'Add Now'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
