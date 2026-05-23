import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { Moon, Sun, Globe, Shield, ShieldCheck, User as UserIcon, Edit2, Check, X, Store, MapPin, Phone, Camera, Upload, LogOut, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

import Chatbot from '../components/Chatbot';
import ConfirmModal from '../components/ConfirmModal';

export default function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, theme, setTheme, language, setLanguage, setUser, restaurants, updateRestaurantProfile, updateUserProfile } = useStore();
  const isArabic = language === 'ar';
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Restaurant Profile State
  const restaurant = restaurants.find(r => r.id === user?.restaurantId);
  const [restName, setRestName] = useState(restaurant?.name || '');
  const [restLocation, setRestLocation] = useState(restaurant?.location || '');
  const [restContact, setRestContact] = useState(restaurant?.contactInfo || '');
  const [restPaymentMobile, setRestPaymentMobile] = useState(restaurant?.paymentMobile || '');
  const [restIsOpen, setRestIsOpen] = useState(restaurant?.isOpen ?? true);
  const [isSavingRest, setIsSavingRest] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (restaurant) {
      setRestName(restaurant.name);
      setRestLocation(restaurant.location);
      setRestContact(restaurant.contactInfo || '');
      setRestPaymentMobile(restaurant.paymentMobile || '');
      setRestIsOpen(restaurant.isOpen);
    }
  }, [restaurant]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploadingAvatar(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        await updateUserProfile({ avatar: base64String });
      } catch (error) {
        console.error("Failed to update avatar:", error);
      }
      setIsUploadingAvatar(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveName = async () => {
    if (!user || !newName.trim()) return;
    setIsSaving(true);
    try {
      await updateUserProfile({ name: newName.trim() });
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to update name:", error);
    }
    setIsSaving(false);
  };

  const handleSaveRestaurantProfile = async () => {
    if (!restaurant) return;
    setIsSavingRest(true);
    try {
      updateRestaurantProfile(restaurant.id, {
        name: restName,
        location: restLocation,
        contactInfo: restContact,
        paymentMobile: restPaymentMobile,
        isOpen: restIsOpen
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to update restaurant profile:", error);
    }
    setIsSavingRest(false);
  };

  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

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
    <div dir={isArabic ? 'rtl' : 'ltr'} className="max-w-2xl mx-auto w-full pb-32 px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-border hover:bg-border transition-colors shadow-sm"
          >
            {isArabic ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
          </button>
          <h1 className="text-2xl font-black text-text-main">{t('Settings')}</h1>
        </div>

        <div className="px-4 py-2 bg-secondary rounded-full border border-border flex items-center gap-2 shadow-sm">
          <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center text-white text-xs">🌯</div>
          <span className="text-xs font-black text-primary tracking-tight">Food Hub</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-secondary rounded-[2.5rem] p-6 sm:p-10 border border-border shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden mb-8">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="flex flex-col items-center">
          <div className="relative mb-6 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-primary text-4xl sm:text-5xl font-black border-4 border-background shadow-xl overflow-hidden bg-secondary">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="translate-y-[-2px]">{user?.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white cursor-pointer overflow-hidden">
              <Camera size={24} />
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} disabled={isUploadingAvatar} />
            </label>
            <div className="absolute top-0 right-0 w-8 h-8 bg-secondary rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold text-primary shadow-md">
              {user?.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="text-center w-full max-w-xs transition-all">
            {isEditingName ? (
              <div className="flex items-center gap-2 mb-2 p-1 bg-background rounded-2xl border-2 border-primary shadow-lg">
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-transparent border-none px-4 py-2 outline-none text-center font-black text-lg text-text-main"
                  autoFocus
                />
                <button 
                  onClick={handleSaveName}
                  disabled={isSaving}
                  className="bg-primary text-white p-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-transform"
                >
                  <Check size={20} />
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
            <p className="text-text-muted font-bold text-xs sm:text-sm">{user?.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
              {user?.role === 'student' ? t('Student') : user?.role === 'delivery' ? (language === 'ar' ? 'دليفري' : 'Delivery') : t('Restaurant Owner')}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Restaurant Management Section (Owners Only) */}
        {user?.role === 'owner' && restaurant && (
          <section className="space-y-6">
            <h3 className="text-2xl font-black text-text-main px-4 flex items-center gap-2">
              <Store size={24} className="text-primary"/>
              {isArabic ? 'إدارة المطعم' : 'MANAGE RESTAURANT'}
            </h3>
            <div className="bg-secondary rounded-[2.5rem] p-6 sm:p-8 border border-border shadow-md space-y-5">
              <div className="flex flex-col gap-2">
                <label className="font-black text-xs text-text-main uppercase tracking-widest px-2">{t('Restaurant Name')}</label>
                <input 
                  type="text" 
                  value={restName}
                  onChange={(e) => setRestName(e.target.value)}
                  className="bg-background border border-secondary p-4 rounded-2xl font-black text-text-main focus:ring-2 ring-primary/20 outline-none transition-all shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-black text-xs text-text-main uppercase tracking-widest px-2">{t('Location')}</label>
                <input 
                  type="text" 
                  value={restLocation}
                  readOnly
                  className="bg-background border border-secondary p-4 rounded-2xl font-black text-text-muted/80 cursor-default outline-none transition-all shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-black text-xs text-text-main uppercase tracking-widest px-2">{t('Contact Information')}</label>
                <input 
                  type="text" 
                  value={restContact}
                  onChange={(e) => setRestContact(e.target.value)}
                  placeholder="+20 100 123 4567"
                  className="bg-background border border-secondary p-4 rounded-2xl font-black text-text-main focus:ring-2 ring-primary/20 outline-none transition-all shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-black text-xs text-text-main uppercase tracking-widest px-2">{t('Payment Mobile')}</label>
                <input 
                  type="text" 
                  value={restPaymentMobile}
                  onChange={(e) => setRestPaymentMobile(e.target.value)}
                  placeholder="InstaPay / Vodafone Cash"
                  className="bg-background border border-secondary p-4 rounded-2xl font-black text-text-main focus:ring-2 ring-primary/20 outline-none transition-all shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <label className="font-black text-xs text-text-main uppercase tracking-widest px-2 block mb-2">{t('Restaurant Status')}</label>
                <div className="flex gap-2 p-1 bg-background rounded-2xl border border-secondary">
                  <button 
                    onClick={() => setRestIsOpen(true)}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-black text-sm transition-all",
                      restIsOpen ? "bg-green-500 text-white shadow-lg" : "text-text-muted hover:text-text-main"
                    )}
                  >
                    {isArabic ? 'مفتوح' : 'OPEN'}
                  </button>
                  <button 
                    onClick={() => setRestIsOpen(false)}
                    className={cn(
                      "flex-1 py-3 rounded-xl font-black text-sm transition-all",
                      !restIsOpen ? "bg-red-500 text-white shadow-lg" : "text-text-muted hover:text-text-main"
                    )}
                  >
                    {isArabic ? 'مغلق' : 'CLOSED'}
                  </button>
                </div>
              </div>

              <button 
                onClick={handleSaveRestaurantProfile}
                disabled={isSavingRest || saveSuccess}
                className={cn(
                  "w-full font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2",
                  saveSuccess 
                    ? "bg-green-500 text-white shadow-green-200" 
                    : "bg-primary text-white shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                {isSavingRest ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : saveSuccess ? (
                  <>
                    <Check size={20} />
                    {isArabic ? 'تم الحفظ بنجاح!' : 'Saved Successfully!'}
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    {t('Save Profile')}
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {/* Preferences Section */}
        <section className="space-y-6">
          <h3 className="text-2xl font-black text-text-main px-4 uppercase tracking-[0.1em]">
            {isArabic ? 'التفضيلات' : 'PREFERENCES'}
          </h3>

          <div className="bg-secondary rounded-[2.5rem] p-3 sm:p-4 border border-border shadow-md space-y-1">
            {/* Language */}
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-background transition-colors group cursor-pointer" onClick={toggleLanguage}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm group-hover:border-primary/30 transition-colors">
                  <Globe size={24} />
                </div>
                <span className="font-extrabold text-lg text-text-main">{t('Language')}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-text-muted">{isArabic ? 'العربية' : 'English'}</span>
                <ArrowRight size={20} className={cn("text-text-muted", isArabic ? "rotate-180" : "")} />
              </div>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-background transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm">
                  {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
                </div>
                <span className="font-extrabold text-lg text-text-main">{isArabic ? 'الوضع الداكن' : 'Dark Mode'}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer scale-110">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={theme === 'dark'} 
                  onChange={toggleTheme}
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary rounded-full"></div>
              </label>
            </div>

            {/* Privacy Policy */}
            <div 
              onClick={() => navigate('/privacy')}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-background transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center border border-border shadow-sm group-hover:border-primary/30 transition-colors">
                  <Shield size={24} />
                </div>
                <span className="font-extrabold text-lg text-text-main">{t('Privacy Policy')}</span>
              </div>
              <ArrowRight size={20} className={cn("text-text-muted transition-transform", isArabic ? "rotate-180" : "group-hover:translate-x-1")} />
            </div>
          </div>
        </section>

        {/* Other Actions */}
        <section className="space-y-6">
          <h3 className="text-2xl font-black text-red-500 px-4 uppercase tracking-[0.1em]">
            {isArabic ? 'إجراءات أخرى' : 'OTHER ACTIONS'}
          </h3>
          <div className="bg-secondary rounded-[2.5rem] p-3 sm:p-4 border border-border shadow-md">
            <motion.div
              whileHover={{ x: isArabic ? -5 : 5 }}
              onClick={() => setUser(null)}
              className="flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4 text-red-500">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center border border-red-200">
                  <LogOut size={24} />
                </div>
                <span className="font-extrabold text-lg">{t('Logout')}</span>
              </div>
              <ArrowRight size={20} className={cn("text-red-300 transition-transform", isArabic ? "rotate-180" : "group-hover:translate-x-1")} />
            </motion.div>
          </div>
        </section>
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
    </div>
  );
}
