import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MapPin, 
  Shield, 
  LogOut, 
  ArrowRight, 
  Edit2, 
  Globe, 
  Bell, 
  Moon, 
  Sun, 
  Lock, 
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';
import { cn } from '../../lib/utils';

export default function Account() {
  const { t } = useTranslation();
  const { 
    user, 
    setUser, 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    updateUserProfile 
  } = useStore();
  const navigate = useNavigate();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const isArabic = language === 'ar';

  const [isEditingName, setIsEditingName] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [tempName, setTempName] = useState(user?.name || '');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  const saveName = async () => {
    if (!user || !tempName.trim()) {
      setIsEditingName(false);
      setTempName(user?.name || '');
      return;
    }
    await updateUserProfile({ name: tempName });
    setIsEditingName(false);
    setSuccessMessage(isArabic ? 'تم تحديث الاسم بنجاح' : 'Name updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserProfile({ avatar: reader.result as string });
        setSuccessMessage(isArabic ? 'تم تحديث الصورة الشخصية' : 'Profile picture updated');
        setTimeout(() => setSuccessMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const input = document.getElementById('profile-upload') as HTMLInputElement;
    input?.click();
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    // Password validation: at least 8 characters, letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(passwordForm.new)) {
      setPasswordError(isArabic 
        ? 'يجب أن تحتوي كلمة المرور على 8 أرقام على الأقل مكونين من أرقام وحروف' 
        : 'Password must be at least 8 characters and contain both letters and numbers');
      return;
    }

    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError(isArabic ? 'كلمة المرور غير متطابقة' : 'Passwords do not match');
      return;
    }
    // Mock success
    setIsChangingPassword(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
    setShowPasswords({ current: false, new: false, confirm: false });
    setPasswordError('');
    setSuccessMessage(isArabic ? 'تم تعديل كلمة المرور بنجاح' : 'Password changed successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const privacyPolicyContent = (
    <div className="flex flex-col gap-4 text-sm max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center font-black text-primary mb-2">Last updated: 2026</div>
      
      <section>
        <h4 className="font-bold text-text-main mb-1">1. Introduction</h4>
        <p className="text-text-muted">Food Hub respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use the application.</p>
      </section>

      <section>
        <h4 className="font-bold text-text-main mb-1">2. Information We Collect</h4>
        <ul className="list-disc list-inside text-text-muted">
          <li>Name</li>
          <li>Email address</li>
          <li>Basic account information</li>
          <li>Usage data</li>
        </ul>
      </section>

      <section>
        <h4 className="font-bold text-text-main mb-1">3. How We Use Your Information</h4>
        <ul className="list-disc list-inside text-text-muted">
          <li>تشغيل التطبيق بشكل صحيح</li>
          <li>معالجة الطلبات</li>
          <li>تحسين تجربة المستخدم</li>
          <li>التواصل مع المستخدم إذا لزم الأمر</li>
        </ul>
      </section>

      <section>
        <h4 className="font-bold text-text-main mb-1">4. Data Security</h4>
        <p className="text-text-muted">We take reasonable measures to protect your data from unauthorized access or misuse.</p>
      </section>

      <section>
        <h4 className="font-bold text-text-main mb-1">5. Third-Party Services</h4>
        <p className="text-text-muted">The app may use third-party services ، وهذه الخدمات قد تجمع بيانات وفق سياساتهم الخاصة.</p>
      </section>

      <section>
        <h4 className="font-bold text-text-main mb-1">6. User Rights</h4>
        <ul className="list-disc list-inside text-text-muted">
          <li>تعديل بياناتك</li>
          <li>طلب حذف حسابك</li>
          <li>معرفة البيانات التي يتم جمعها عنك</li>
        </ul>
      </section>

      <section>
        <h4 className="font-bold text-text-main mb-1">7. Changes to This Policy</h4>
        <p className="text-text-muted">We may update this Privacy Policy from time to time. Any changes will be reflected within the app.</p>
      </section>

      <div className="h-px bg-border my-2" />

      <section>
        <h4 className="font-bold text-primary mb-1">8. Development Team</h4>
        <p className="font-bold mb-1 text-text-main">Zero Bugs Club</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-text-muted">
          <span>• Ahmed AbdelSalam</span>
          <span>• Esmail Elbeltagy</span>
          <span>• Khaled Gamal</span>
          <span>• Ahmed Mahmoud</span>
          <span>• Khaled Mohamed</span>
          <span>• Nada Alhussien</span>
          <span>• Mayar AbdelAziz</span>
          <span>• Basmala Mohamed</span>
        </div>
      </section>

      <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 mt-2">
        <p className="font-bold text-primary text-xs">Project: Food Hub App</p>
        <p className="text-xs text-text-muted">University: Sphinx University</p>
        <p className="text-xs text-text-muted">Course: Work-based Professional Project</p>
      </div>

      <section>
        <h4 className="font-bold text-text-main mb-1">9. Contact Us</h4>
        <p className="text-text-muted">If you have any questions, please contact us at:</p>
        <p className="font-bold text-primary">foodhub@app.com</p>
      </section>

      <div className="text-center font-bold text-text-muted mt-4 p-4 border-t border-border border-dashed">
        By using Food Hub, you agree to this Privacy Policy.
      </div>
    </div>
  );

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="max-w-2xl mx-auto w-full pb-44 px-4 sm:px-6">
      {/* Header - Matches image mockup with back button and brand pill */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors shadow-sm"
          >
            {isArabic ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          <h1 className="text-2xl font-black text-text-main">{isArabic ? 'الإعدادات' : 'Settings'}</h1>
        </div>

        {/* Brand Badge seen in top right of image */}
        <div className="px-4 py-2 bg-secondary rounded-full border border-border flex items-center gap-2 shadow-sm">
          <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center text-white text-xs">🌯</div>
          <span className="text-xs font-black text-primary tracking-tight">Food Hub</span>
        </div>
      </div>

      {/* Profile Card Section */}
      <div className="bg-secondary rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 border border-border shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden mb-6 sm:mb-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="flex flex-col items-center">
          <div className="relative mb-4 sm:mb-6 group">
            <input 
              type="file" 
              id="profile-upload" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageSelect}
            />
            <div className={cn(
              "w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-primary text-4xl sm:text-5xl font-black border-4 border-background shadow-xl overflow-hidden bg-secondary",
              !user?.avatar && "p-2"
            )}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="translate-y-[-2px]">{user?.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            {/* Camera Overlay for upload */}
            <button 
              onClick={triggerFileInput}
              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
            >
              <Edit2 size={24} className="sm:hidden" />
              <Edit2 size={32} className="hidden sm:block" />
            </button>
            {/* Initial indicator circle from the picture */}
            <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-secondary rounded-full border-2 border-primary flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-primary shadow-md">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          </div>
 
          <div className="text-center w-full max-w-xs transition-all">
            {isEditingName ? (
              <div className="flex items-center gap-2 mb-2 p-1 bg-secondary rounded-2xl border-2 border-primary shadow-lg">
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-transparent border-none px-4 py-2 outline-none text-center font-black text-lg sm:text-xl text-text-main"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && saveName()}
                />
                <button 
                  onClick={saveName}
                  className="bg-primary text-white p-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-transform"
                >
                  <ArrowRight size={20} className={cn(isArabic ? "rotate-180" : "")} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 mb-1 group">
                <h2 className="text-2xl sm:text-3xl font-black text-text-main">{user?.name}</h2>
                <button 
                  onClick={() => setIsEditingName(true)} 
                  className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
 
            <p className="text-text-muted font-bold text-xs sm:text-sm mb-4">{user?.email}</p>

            <AnimatePresence>
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-green-500 text-white text-[12px] font-black uppercase tracking-wider py-2 px-6 rounded-full inline-block shadow-lg"
                >
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="space-y-6">
        <h3 className="text-3xl font-black text-text-main px-4">
          {isArabic ? 'التفضيلات' : 'PREFERENCES'}
        </h3>

        <div className="bg-secondary rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4 border border-border shadow-md space-y-1">
          {/* Language Selection */}
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer" onClick={toggleLanguage}>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm group-hover:border-primary/30 transition-colors">
                <Globe size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="font-extrabold text-base sm:text-lg text-text-main">{isArabic ? 'اللغة' : 'Language'}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-bold text-text-muted">{isArabic ? 'العربية' : 'English'}</span>
              <ArrowRight size={18} className={cn("text-text-muted sm:w-5 sm:h-5", isArabic ? "rotate-180" : "")} />
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm">
                <Bell size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="font-extrabold text-base sm:text-lg text-text-main">{isArabic ? 'الإشعارات' : 'Notifications'}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer scale-90 sm:scale-100">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary rounded-full"></div>
            </label>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm">
                {theme === 'dark' ? <Moon size={20} className="sm:w-6 sm:h-6" /> : <Sun size={20} className="sm:w-6 sm:h-6" />}
              </div>
              <span className="font-extrabold text-base sm:text-lg text-text-main">{isArabic ? 'الوضع الداكن' : 'Dark Mode'}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer scale-90 sm:scale-100">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={theme === 'dark'} 
                onChange={toggleTheme}
              />
              <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary rounded-full"></div>
            </label>
          </div>

          {/* Map Location */}
          <div 
            onClick={() => navigate('/map')}
            className="flex items-center justify-between p-3 sm:p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm group-hover:border-primary/30 transition-colors">
                <MapPin size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="font-extrabold text-base sm:text-lg text-text-main">{t('Map Location')}</span>
            </div>
            <ArrowRight size={18} className={cn("text-text-muted transition-transform sm:w-5 sm:h-5", isArabic ? "rotate-180" : "group-hover:translate-x-1")} />
          </div>

          <div className="h-px bg-border my-1 sm:my-2 mx-4" />

          {/* Privacy Policy */}
          <div 
            onClick={() => setIsPrivacyModalOpen(true)}
            className="flex items-center justify-between p-3 sm:p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm group-hover:border-primary/30 transition-colors">
                <Shield size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="font-extrabold text-base sm:text-lg text-text-main">{t('Privacy Policy')}</span>
            </div>
            <ArrowRight size={18} className={cn("text-text-muted transition-transform sm:w-5 sm:h-5", isArabic ? "rotate-180" : "group-hover:translate-x-1")} />
          </div>

          {/* Change Password */}
          <div 
            onClick={() => setIsChangingPassword(true)}
            className="flex items-center justify-between p-3 sm:p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4 text-text-main">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm group-hover:border-primary/30 transition-colors">
                <Lock size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="font-extrabold text-base sm:text-lg">{isArabic ? 'تغيير كلمة المرور' : 'Change Password'}</span>
            </div>
            <ArrowRight size={18} className={cn("text-text-muted transition-transform sm:w-5 sm:h-5", isArabic ? "rotate-180" : "group-hover:translate-x-1")} />
          </div>

          {/* Admin Panel (Special access) */}
          {(user?.email === 'ahmedelsalam3000@gmail.com' || user?.email === 'elbeltagyesmail19@gmail.com') && (
            <div 
              onClick={() => navigate('/admin')}
              className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-primary text-white transition-all group cursor-pointer shadow-lg shadow-primary/20"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center border border-white/20 shadow-sm group-hover:bg-white/30 transition-colors">
                  <ShieldCheck size={20} className="sm:w-6 sm:h-6" />
                </div>
                <span className="font-black text-base sm:text-lg">ADMIN CONTROL PANEL</span>
              </div>
              <ArrowRight size={18} className={cn("text-white/80 transition-transform sm:w-5 sm:h-5", isArabic ? "rotate-180" : "group-hover:translate-x-1")} />
            </div>
          )}

          <div className="h-px bg-border my-2 mx-4" />

          {/* Logout */}
          <motion.div
            whileHover={{ x: isArabic ? -5 : 5 }}
            onClick={handleLogout}
            className="flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 text-red-500">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <LogOut size={24} />
              </div>
              <span className="font-extrabold text-lg">{t('Logout')}</span>
            </div>
            <ArrowRight size={20} className={cn("text-red-300 transition-transform", isArabic ? "rotate-180" : "group-hover:translate-x-1")} />
          </motion.div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={isPrivacyModalOpen}
        title={t('Privacy Policy')}
        message={privacyPolicyContent}
        confirmText={t('Close')}
        variant="primary"
        showCancel={false}
        onConfirm={() => setIsPrivacyModalOpen(false)}
        onCancel={() => setIsPrivacyModalOpen(false)}
      />

      <ConfirmModal 
        isOpen={isChangingPassword}
        title={isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
        message={
          <div className="space-y-4 py-2 text-right">
            {passwordError && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-xs font-bold border border-red-100 mb-2">
                {passwordError}
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-text-muted mb-1 block">{isArabic ? 'كلمة المرور الحالية' : 'Current Password'}</label>
              <div className="relative">
                <input 
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-text-main pr-12 ltr:pr-12 rtl:pl-12"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors",
                    isArabic ? "left-4" : "right-4"
                  )}
                >
                  {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-text-muted mb-1 block">{isArabic ? 'كلمة المرور الجديدة' : 'New Password'}</label>
              <div className="relative">
                <input 
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-text-main pr-12 ltr:pr-12 rtl:pl-12"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors",
                    isArabic ? "left-4" : "right-4"
                  )}
                >
                  {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-text-muted mb-1 block">{isArabic ? 'تأكيد كلمة المرور' : 'Confirm New Password'}</label>
              <div className="relative">
                <input 
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-text-main pr-12 ltr:pr-12 rtl:pl-12"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors",
                    isArabic ? "left-4" : "right-4"
                  )}
                >
                  {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
        }
        confirmText={isArabic ? 'حفظ' : 'Save'}
        cancelText={isArabic ? 'إلغاء' : 'Cancel'}
        onConfirm={handlePasswordChange}
        onCancel={() => {
          setIsChangingPassword(false);
          setPasswordForm({ current: '', new: '', confirm: '' });
          setShowPasswords({ current: false, new: false, confirm: false });
          setPasswordError('');
        }}
        variant="primary"
      />
    </div>
  );
}
