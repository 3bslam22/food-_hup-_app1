import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Lock, Users, FileText, Mail, Info, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Privacy() {
  const navigate = useNavigate();
  const { language } = useStore();
  const isArabic = language === 'ar';

  const sections = [
    {
      title: '1. Introduction',
      icon: Info,
      content: 'Food Hub respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use the application.'
    },
    {
      title: '2. Information We Collect',
      icon: FileText,
      content: isArabic ? (
        <ul className="list-disc mr-5 space-y-1">
          <li>الأسم</li>
          <li>البريد الإلكتروني</li>
          <li>بيانات الحساب الأساسية</li>
          <li>بيانات الاستخدام</li>
        </ul>
      ) : (
        <ul className="list-disc ml-5 space-y-1">
          <li>Name</li>
          <li>Email address</li>
          <li>Basic account information</li>
          <li>Usage data</li>
        </ul>
      )
    },
    {
      title: '3. How We Use Your Information',
      icon: Terminal,
      content: isArabic ? (
        <ul className="list-disc mr-5 space-y-1">
          <li>تشغيل التطبيق بشكل صحيح</li>
          <li>معالجة الطلبات</li>
          <li>تحسين تجربة المستخدم</li>
          <li>التواصل مع المستخدم إذا لزم الأمر</li>
        </ul>
      ) : (
        <ul className="list-disc ml-5 space-y-1">
          <li>Proper application operation</li>
          <li>Processing orders</li>
          <li>Enhancing user experience</li>
          <li>Communicating with users if necessary</li>
        </ul>
      )
    },
    {
      title: '4. Data Security',
      icon: Lock,
      content: isArabic 
        ? 'نتخذ تدابير معقولة لحماية بياناتك من الوصول غير المصرح به أو سوء الاستخدام.'
        : 'We take reasonable measures to protect your data from unauthorized access or misuse.'
    },
    {
      title: '5. Third-Party Services',
      icon: Shield,
      content: isArabic 
        ? 'التطبيق قد يستخدم خدمات طرف ثالث، وهذه الخدمات قد تجمع بيانات وفق سياساتهم الخاصة.'
        : 'The app may use third-party services, and these services may collect data according to their own policies.'
    },
    {
      title: '6. User Rights',
      icon: Shield,
      content: isArabic ? (
        <ul className="list-disc mr-5 space-y-1">
          <li>تعديل بياناتك</li>
          <li>طلب حذف حسابك</li>
          <li>معرفة البيانات التي يتم جمعها عنك</li>
        </ul>
      ) : (
        <ul className="list-disc ml-5 space-y-1">
          <li>Editing your data</li>
          <li>Requesting account deletion</li>
          <li>Accessing your collected data</li>
        </ul>
      )
    },
    {
      title: '7. Changes to This Policy',
      icon: FileText,
      content: isArabic
        ? 'قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم عكس أي تغييرات داخل التطبيق.'
        : 'We may update this Privacy Policy from time to time. Any changes will be reflected within the app.'
    },
    {
      title: '8. Development Team',
      icon: Users,
      isSpecial: true,
      content: (
        <div className="space-y-4">
          <div className="text-primary font-black italic text-xl border-b border-primary/20 pb-2">Zero Bugs Club</div>
          <div className="grid grid-cols-2 gap-2 text-sm font-bold">
            <div>• Ahmed AbdelSalam</div>
            <div>• Esmail Elbeltagy</div>
            <div>• Khaled Gamal</div>
            <div>• Ahmed Mahmoud</div>
            <div>• Khaled Mohamed</div>
            <div>• Nada Alhussien</div>
            <div>• Mayar AbdelAziz</div>
            <div>• Basmala Mohamed</div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-lg font-black">{isArabic ? 'جامعة سفنكس' : 'Sphinx University'}</div>
            <div className="text-text-muted text-xs">Work-based Professional Project: Food Hub App</div>
          </div>
        </div>
      )
    },
    {
      title: '9. Contact Us',
      icon: Mail,
      content: (
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            {isArabic ? 'إذا كان لديك أي أسئلة ، يرجى الاتصال بنا على:' : 'If you have any questions, please contact us at:'}
          </p>
          <div className="flex items-center gap-2 text-primary font-bold">
            <Mail size={16} />
            <span>foodhub@app.com</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary p-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10"></div>
        <button 
          onClick={() => navigate(-1)}
          className={`absolute top-6 ${isArabic ? 'right-6' : 'left-6'} w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl hover:bg-white/30 transition-colors z-10`}
        >
          <ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''} />
        </button>
        <h1 className="text-2xl font-black mt-2 tracking-tight">
          {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </h1>
        <p className="text-xs opacity-70 mt-1">Last Updated: 2026</p>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-4">
        {sections.map((section, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`bg-background border border-border rounded-[2rem] p-6 shadow-sm ${section.isSpecial ? 'bg-primary/5 border-primary/20' : ''}`}
          >
            <div className="flex items-center gap-3 mb-3 text-primary">
              <section.icon size={20} />
              <h2 className="text-lg font-black">{section.title}</h2>
            </div>
            <div className="text-text-muted leading-relaxed font-medium">
              {section.content}
            </div>
          </motion.div>
        ))}

        <div className="text-center pt-8">
          <div className="inline-block px-6 py-3 rounded-2xl bg-secondary text-primary font-black text-sm mb-4">
            {isArabic ? 'من خلال استخدام Food Hub، فإنك توافق على سياسة الخصوصية هذه.' : 'By using Food Hub, you agree to this Privacy Policy.'}
          </div>
        </div>
      </div>
    </div>
  );
}

