import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useStore, Role } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Lock, User, Store, ArrowRight, Bike, ShieldCheck, 
  Languages, ArrowLeft, Eye, EyeOff, Hash, ChevronDown, AlertCircle 
} from 'lucide-react';

export default function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const restaurants = useStore(state => state.restaurants);
  const setUser = useStore(state => state.setUser);
  const { language, setLanguage } = useStore();
  
  const isArabic = language === 'ar';
  
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [ownerIsLogin, setOwnerIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggleLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
  };

  const validatePassword = (pass: string) => {
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    return pass.length >= 8 && hasLetter && hasNumber;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePassword(password)) {
      setError(isArabic 
        ? 'يجب أن تكون كلمة المرور 8 أحرف على الأقل وتحتوي على حروف وأرقام' 
        : 'Password must be at least 8 characters and contain both letters and numbers');
      return;
    }

    setLoading(true);
    
    // Mock Authentication delay
    setTimeout(() => {
      if (isLogin) {
        // Mock Login
        setUser({
          id: Math.random().toString(36).substring(2, 9),
          name: email.split('@')[0],
          email: email,
          role: role,
          universityId: universityId,
          restaurantId: role === 'owner' ? restaurantId : undefined
        });
      } else {
        // Mock Signup
        setUser({
          id: Math.random().toString(36).substring(2, 9),
          name: name || 'User',
          email: email,
          role: role,
          universityId: universityId,
          restaurantId: role === 'owner' ? restaurantId : undefined
        });
      }
      navigate('/');
      setLoading(false);
    }, 1500);
  };

  // If Owner Role is selected, render a specialized "Owner Portal"
  if (role === 'owner') {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-8" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`absolute top-8 ${isArabic ? 'left-8' : 'right-8'} z-20`}>
          <div className="bg-white dark:bg-gray-800 p-1 rounded-xl flex items-center border border-border shadow-sm">
            <button
              onClick={() => toggleLanguage('ar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isArabic ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main font-sans'}`}
            >
              العربية
            </button>
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!isArabic ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main font-sans'}`}
            >
              English
            </button>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-border/50 relative"
        >
          {/* Header */}
          <div className="bg-primary p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10"></div>
            <button 
              onClick={() => {
                setRole('student');
                setError('');
                setSuccess('');
                setOwnerIsLogin(true);
              }}
              className={`absolute top-6 ${isArabic ? 'right-6' : 'left-6'} w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors z-10`}
            >
              <ArrowLeft size={18} className={isArabic ? 'rotate-180' : ''} />
            </button>
            <div className="relative z-10 flex flex-col items-center mt-2">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg text-primary overflow-hidden">
                <Store size={32} />
              </div>
              <h2 className="text-2xl font-extrabold text-center">{ownerIsLogin ? t('PartnersPortal') : t('OwnerSignup')}</h2>
              <p className="text-white/80 text-sm mt-2 text-center">{t('VerifyIdentity')}</p>
            </div>
          </div>

          <div className="p-8 pb-10">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm font-bold border border-red-200 text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-xl text-sm font-bold border border-green-200 text-center">
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {!ownerIsLogin && (
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 p-6 rounded-2xl text-center">
                  <AlertCircle className="mx-auto text-orange-500 mb-3" size={32} />
                  <p className="text-orange-700 dark:text-orange-300 font-bold leading-relaxed transition-all">
                    {isArabic 
                      ? 'قم بالتنسيق مع اداره الجامعه و مطوري التطبيق لاضافه مطعمك داخل التطبيق' 
                      : 'Please coordinate with the university administration and app developers to add your restaurant to the app'}
                  </p>
                  <button 
                    type="button"
                    onClick={() => {
                      setOwnerIsLogin(true);
                      setError('');
                    }}
                    className="mt-4 text-orange-600 dark:text-orange-400 font-black text-sm underline hover:text-orange-700 transition-colors"
                  >
                    {t('Login')}
                  </button>
                </div>
              )}

              {ownerIsLogin && (
                <div className="flex flex-col gap-5">
                  <div className="relative">
                    <label className="block text-sm font-bold text-text-muted mb-2">({t('المطعم')})</label>
                    <div className={`absolute top-[42px] ${isArabic ? 'left-3' : 'right-3'} flex items-center pointer-events-none text-primary`}>
                      <ChevronDown size={20} />
                    </div>
                    <div className={`absolute top-[42px] ${isArabic ? 'right-4' : 'left-4'} flex items-center pointer-events-none text-text-muted`}>
                      <Store size={20} />
                    </div>
                    <select 
                      required
                      value={restaurantId}
                      onChange={(e) => setRestaurantId(e.target.value)}
                      className={`w-full bg-secondary border border-border rounded-xl px-12 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none`}
                    >
                      <option value="" disabled>{isArabic ? 'اختر مطعمك' : 'Choose your restaurant'}</option>
                      {restaurants.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-bold text-text-muted mb-2">{t('UniversityEmail')}</label>
                    <div className={`absolute top-[42px] ${isArabic ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none text-text-muted`}>
                      <Mail size={20} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@sphinx.edu.eg"
                      className={`w-full bg-secondary border border-border rounded-xl ${isArabic ? 'pl-12 pr-4' : 'pr-12 pl-4'} py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium`}
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-bold text-text-muted mb-2">{t('YourPassword')}</label>
                    <div className={`absolute top-[42px] ${isArabic ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none text-text-muted`}>
                      <Lock size={20} />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-[42px] ${isArabic ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center text-text-muted hover:text-primary transition-colors`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-secondary border border-border rounded-xl px-12 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary text-white font-extrabold text-lg py-4 rounded-xl mt-4 hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {t('LoginAsOwner')}
                        <ArrowRight size={20} className={isArabic ? 'rotate-180' : ''} />
                      </>
                    )}
                  </motion.button>
                </div>
              )}

              <div className="text-center mt-4">
                <p className="text-text-muted font-medium text-sm">
                  {ownerIsLogin ? `${t('NoAccount')} ` : `${t('AlreadyHaveAccount')} `}
                  <button 
                    type="button"
                    onClick={() => {
                      setOwnerIsLogin(!ownerIsLogin);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-primary font-extrabold hover:underline"
                  >
                    {ownerIsLogin ? t('RegisterNow') : t('Login')}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4 sm:p-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={`absolute top-8 ${isArabic ? 'left-8' : 'right-8'} z-20`}>
        <div className="bg-white dark:bg-gray-800 p-1 rounded-xl flex items-center border border-border shadow-sm font-sans">
          <button
            onClick={() => toggleLanguage('ar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isArabic ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'}`}
          >
            العربية
          </button>
          <button
            onClick={() => toggleLanguage('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!isArabic ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-text-main'}`}
          >
            English
          </button>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border/50"
      >
        {/* Left Side - Branding / Image */}
        <div className="md:w-5/12 bg-gradient-to-br from-primary to-orange-500 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 -right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg overflow-hidden border border-border">
              <img 
                src="/input_lo.png" 
                alt="Food Hub Logo" 
                className="w-full h-full object-contain p-1" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-orange-500 to-primary flex items-center justify-center text-white text-3xl font-bold">🍔</div>';
                  }
                }}
              />
            </div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold mb-4 leading-tight"
            >
              {t('Welcome')}
            </motion.h1>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 font-medium text-lg max-w-sm"
            >
              {t('FastestWay')}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mt-12 md:mt-0 flex flex-col gap-4"
          >
            <button
              onClick={() => {
                setRole('delivery');
                setIsLogin(true);
                setError('');
                setSuccess('');
                setOwnerIsLogin(true);
              }}
              className={`flex items-center justify-between ${role === 'delivery' ? 'bg-orange-600 text-white' : 'bg-white text-primary'} p-4 rounded-2xl w-full border-none shadow-md font-bold hover:bg-orange-50 hover:text-primary transition-colors group cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <Bike size={20} />
                {isArabic ? 'تسجيل دخول (دليفري)' : 'Login as Delivery'}
              </div>
              <ArrowRight size={18} className={`${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
            </button>

            <button
              onClick={() => {
                setRole('owner');
                setOwnerIsLogin(true);
                setError('');
                setSuccess('');
              }}
              className={`flex items-center justify-between ${role === 'owner' ? 'bg-orange-600 text-white' : 'bg-white text-primary'} p-4 rounded-2xl w-full border-none shadow-md font-bold hover:bg-orange-50 hover:text-primary transition-colors group cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <Store size={20} />
                {t('LoginAsRestaurantOwner')}
              </div>
              <ArrowRight size={18} className={`${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
            </button>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-background relative text-right rtl:text-right">
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex items-center gap-4">
              {role !== 'student' && (
                <button 
                  onClick={() => {
                    setRole('student');
                    setError('');
                    setSuccess('');
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-secondary rounded-xl hover:bg-primary/10 hover:text-primary transition-all shadow-sm"
                >
                  <ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''} />
                </button>
              )}
              <h2 className="text-3xl font-extrabold text-text-main">
                {role === 'delivery' 
                  ? (isLogin ? (isArabic ? 'دخول الدليفري' : 'Delivery Login') : (isArabic ? 'تسجيل الدليفري' : 'Delivery Signup'))
                  : (isLogin ? t('StudentLogin') : t('StudentSignup'))}
              </h2>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm font-bold border border-red-200 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-xl text-sm font-bold border border-green-200 text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <AnimatePresence mode="wait">
              {/* Name Field (Signup Student) */}
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="relative"
                >
                  <div className={`absolute inset-y-0 ${isArabic ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none text-text-muted`}>
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('Name')}
                    className={`w-full bg-secondary border border-border rounded-xl ${isArabic ? 'pl-12 pr-4' : 'pr-12 pl-4'} py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium`}
                  />
                </motion.div>
              )}

              {/* University ID Field */}
              <motion.div
                key="id-field"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className={`absolute inset-y-0 ${isArabic ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none text-text-muted`}>
                  <Hash size={20} />
                </div>
                <input 
                  type="text" 
                  required
                  value={universityId}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val) && val.length <= 9) {
                      setUniversityId(val);
                    }
                  }}
                  placeholder={t('UniversityID')}
                  className={`w-full bg-secondary border border-border rounded-xl ${isArabic ? 'pl-12 pr-4' : 'pr-12 pl-4'} py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium`}
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                key="email-field"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className={`absolute inset-y-0 ${isArabic ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none text-text-muted`}>
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('UniversityEmail')}
                  className={`w-full bg-secondary border border-border rounded-xl ${isArabic ? 'pl-12 pr-4' : 'pr-12 pl-4'} py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium`}
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                key="password-field"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className={`absolute inset-y-0 ${isArabic ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none text-text-muted`}>
                  <Lock size={20} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 ${isArabic ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center text-text-muted hover:text-primary transition-colors`}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('Password')}
                  className="w-full bg-secondary border border-border rounded-xl px-12 py-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </motion.div>
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-extrabold text-lg py-4 rounded-xl mt-4 hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? t('Sign In') : t('Sign Up')}
                  <ArrowRight size={20} className={isArabic ? 'rotate-180' : ''} />
                </>
              )}
            </motion.button>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              <p className="text-text-muted font-medium">
                {isLogin ? `${t('NoAccount')} ` : `${t('AlreadyHaveAccount')} `}
                <button 
                  type="button" 
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setSuccess('');
                  }} 
                  className="text-primary font-extrabold hover:underline"
                >
                  {isLogin ? t('RegisterNow') : t('Login')}
                </button>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
