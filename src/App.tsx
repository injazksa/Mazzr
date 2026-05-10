import { AnimatePresence, motion } from 'motion/react';
import SmartTools from './components/SmartTools';
import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Camera,
  Check,
  ChevronRight,
  Cpu,
  Globe,
  Home,
  LayoutGrid,
  Percent,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Gamepad2,
  CreditCard,
  Plane,
  Tags,
  ShieldCheck,
  Zap,
  ArrowRight,
  Copy,
  CheckCircle2,
  Share2,
  Scale,
  X,
  Activity,
  Monitor,
  HeartPlus,
  Star,
  Loader2
} from 'lucide-react';

import dealsData from './data/deals.json';
import settingsData from './data/settings.json';

// --- DICTIONARY & TRANSLATIONS ---
type Lang = 'en' | 'ar';
type Page = 'home' | 'privacy' | 'terms' | 'about' | 'tools';

const t = {
  en: {
    logo: "MAZZR",
    heroTitle: "Best Digital Deals &",
    heroHighlight: "Promo Codes 2026",
    heroSubtitle: "Stop overpaying. Unlock verified coupon codes, hidden deals, and exclusive discounts from global top brands—updated daily.",
    searchPlaceholder: "Search for Amazon, VPNs, Netflix, Canva...",
    getDeal: "Activate Discount ⚡",
    getDealCode: "Reveal Secret Code 🔒",
    useCode: "Use Code:",
    copyHint1: "Copy code & go to store before it's gone!",
    categories: "Categories",
    featuredDeals: "Top Exclusives",
    discountCalc: "Smart Deal Finder",
    calcDesc: "Answer 2 questions to get your perfect exclusive deal.",
    originalPrice: "What are you looking for?",
    discountPercent: "What is your main goal?",
    finalPrice: "Analyzing exclusive deals...",
    youSave: "Recommended Deal",
    adSpace: "Sponsored",
    adDesc: "",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    about: "About Us",
    home: "Home",
    footerText: "Your ultimate platform for the best deals and discounts.",
    backHome: "Back to Home",
    all: "All Deals",
    electronics: "Electronics",
    health: "Health & Beauty",
    games: "Games",
    subs: "Subscriptions",
    travel: "Travel",
    insurance: "Insurance",
    courses: "Courses & Ed",
    digital: "Digital Assets",
    hosting: "Web & Hosting",
    flashDeal: "Exclusive Offers",
    hours: "Hrs",
    mins: "Mins",
    secs: "Secs",
    endsIn: "Seize the chance, ends in:",
    searchEmpty: "No deals found for your search.",
    copy: "Copy",
    copied: "Copied!",
    share: "Share",
    compare: "Compare",
    compareDeals: "Compare Deals",
    clear: "Clear All",
    smartToolsTitle: "Smart Saving Tools",
    pcBuilder: "PC Builder Test",
    subsCompare: "Subscriptions",
    healthAdvisor: "Health Advisor",
    travelPlanner: "Travel Planner",
    disclosure: "Mazzr earns a small commission at no extra cost to you when you save through our links. We prioritize your trust above all.",
    redirecting: "Securely applying promo code...",
    activeToday: "Active Today",
    claimedMsg: "Claimed",
    usedTimes: "Used",
    timesToday: "times today",
    verifiedBy: "Verified by Mazzr Team",
    trendingSearches: "Trending Searches:",
    usersCount: "Happy Users"
  },
  ar: {
    logo: "مازر",
    heroTitle: "أفضل العروض الرقمية",
    heroHighlight: "وأكواد الخصم 2026",
    heroSubtitle: "ليش تدفع أكثر؟ اكتشف أكواد الخصم المضمونة والصفقات السرية من أشهر العلامات التجارية العالمية - محدثة يومياً.",
    searchPlaceholder: "ابحث عن أمازون، نتفليكس، كانفا، استضافة...",
    getDeal: "تفعيل الخصم الفوري ⚡",
    getDealCode: "كشف الكود السري 🔒",
    useCode: "استخدم الكود:",
    copyHint1: "اضغط للنسخ، الخصم سيطبق تلقائياً عند الدفع",
    categories: "الأقسام",
    featuredDeals: "أقوى العروض الحصرية",
    discountCalc: "الباحث الذكي عن العروض",
    calcDesc: "أجب عن سؤالين لنطابقك مع العرض الحصري الأنسب لك.",
    originalPrice: "ما الذي تبحث عنه؟",
    discountPercent: "ما هو هدفك الأساسي؟",
    finalPrice: "جاري تحليل العروض الحصرية...",
    youSave: "العرض المقترح",
    adSpace: "رعاية",
    adDesc: "",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    about: "من نحن",
    home: "الرئيسية",
    footerText: "منصتك الأولى لأفضل العروض والخصومات.",
    backHome: "العودة للرئيسية",
    all: "كل العروض",
    electronics: "إلكترونيات",
    health: "صحة وتجميل",
    games: "ألعاب",
    subs: "اشتراكات",
    travel: "سفر",
    insurance: "تأمين",
    courses: "كورسات وتعليم",
    digital: "منتجات رقمية",
    hosting: "استضافة ومواقع",
    flashDeal: "عروض حصرية قوية",
    hours: "ساعة",
    mins: "دقيقة",
    secs: "ثانية",
    endsIn: "استغل الفرصة، متبقي:",
    searchEmpty: "لا توجد عروض مطابقة لبحثك.",
    copy: "نسخ",
    copied: "تم النسخ!",
    share: "مشاركة",
    compare: "مقارنة",
    compareDeals: "مقارنة العروض المستهدفة",
    clear: "مسح المقارنة",
    smartToolsTitle: "أدوات التوفير الذكية",
    pcBuilder: "تجميعة الحاسوب",
    subsCompare: "أرخص الاشتراكات",
    healthAdvisor: "مرشد الصحة والتجميل",
    travelPlanner: "مخطط السفر والتأمين",
    disclosure: "تربح مازر عمولة صغيرة دون أي تكلفة إضافية عليك عندما توفر من خلال روابطنا. نحن نضع ثقتك فوق كل اعتبار.",
    redirecting: "جاري تفعيل كود الخصم بأمان...",
    activeToday: "فعال اليوم",
    claimedMsg: "تم الحجز",
    usedTimes: "تم الاستخدام",
    timesToday: "مرة اليوم",
    verifiedBy: "مضمّن من فريق مازر",
    trendingSearches: "الأكثر بحثاً:",
    usersCount: "مستفيد سعيد"
  }
};

// --- DATA ---
const CATEGORIES = [
  { id: 'all', icon: LayoutGrid, en: 'All Deals', ar: 'الكل' },
  { id: 'tech', icon: Smartphone, en: 'Electronics', ar: 'إلكترونيات' },
  { id: 'health', icon: Sparkles, en: 'Health & Beauty', ar: 'صحة وتجميل' },
  { id: 'games', icon: Gamepad2, en: 'Games', ar: 'ألعاب' },
  { id: 'subs', icon: CreditCard, en: 'Subscriptions', ar: 'اشتراكات' },
  { id: 'travel', icon: Plane, en: 'Travel', ar: 'سفر' },
  { id: 'trading', icon: Activity, en: 'Trading', ar: 'تداول' },
  { id: 'insurance', icon: ShieldCheck, en: 'Insurance', ar: 'تأمين' },
  { id: 'courses', icon: Check, en: 'Courses', ar: 'كورسات' },
  { id: 'hosting', icon: Globe, en: 'Hosting', ar: 'استضافة' },
  { id: 'digital', icon: Cpu, en: 'Digital', ar: 'رقميات' },
];

const DEALS_RAW = dealsData;

// Native Ad Card Component
const NativeAdCard = ({ lang, position }: { lang: Lang; position: 'middle' | 'bottom' }) => {
  const directLink = 'https://bony-teaching.com/bh3NVS0.P/3MpWvubJm/VXJ-ZSDv0s3mMaDCMvxmN/T-QE1OL/TDcDwbMEzvEi1/N/D-kN';
  
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 shadow-sm hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_12px_30px_-10px_rgba(217,119,6,0.15)] transition-all duration-300 flex flex-col relative overflow-hidden group ring-2 ring-amber-100 ring-opacity-50"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 z-30" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="px-3 py-1 bg-white border border-amber-200 rounded-lg text-xs font-black text-amber-700 shadow-sm">
            {lang === 'ar' ? 'رعاية مميزة' : 'Premium Sponsor'}
          </div>
          <div className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-orange-600 text-white shadow-sm">
            {lang === 'ar' ? 'عرض حصري' : 'EXCLUSIVE'}
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-1 leading-snug text-amber-900">
          {lang === 'ar' ? 'أداة تحليل الأداء المتقدمة' : 'Advanced Performance Analytics Tool'}
        </h3>
        
        <p className="text-sm mb-4 flex-grow leading-relaxed text-amber-800">
          {lang === 'ar' 
            ? 'اكتشف أداة احترافية لتحليل أداء جهازك بدقة عالية. متوفرة الآن بخصم حصري للزوار الكرام.' 
            : 'Discover a professional tool to analyze your device performance with high precision. Now available with exclusive discount for our valued visitors.'}
        </p>
        
        <a
          href={directLink}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full font-bold py-3.5 rounded-xl text-center text-sm transition-all shadow-sm flex items-center justify-center gap-2 group/btn bg-orange-600 hover:bg-orange-500 text-white shadow-[0_4px_14px_rgba(234,88,12,0.3)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.4)]"
        >
          {lang === 'ar' ? 'استكشف الآن' : 'Explore Now'}
          <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
        </a>
        
        <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-[10px] font-bold text-amber-600 bg-transparent mt-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 
            {lang === 'ar' ? 'موثوق من الشركاء' : 'Trusted Partner'}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span>{lang === 'ar' ? 'فعال الآن' : 'Active Now'}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Add deterministic random claimed percentage based on deal ID for the new progress layout
const DEALS = DEALS_RAW.map(d => {
  const hr = new Date().getHours();
  // seed based on deal id and current hour
  const seed = d.id * 100 + hr;
  const rand = Math.abs(Math.sin(seed));
  const claimed = 82 + Math.floor(rand * 13); // 82 to 94
  // random verified hours 1 to 5
  const verifiedHrs = 1 + Math.floor(Math.abs(Math.cos(seed)) * 4);
  return { ...d, claimed, verifiedHrs };
});

// --- COMPONENTS ---

const Ticker = ({ lang }: { lang: Lang }) => {
  const messages = lang === 'ar' ? settingsData.tickerAr : settingsData.tickerEn;
  return (
    <div className="bg-purple-600 text-white py-2 overflow-hidden whitespace-nowrap relative">
      <div className="inline-block animate-ticker">
        {messages.map((msg, i) => (
          <span key={i} className="mx-8 font-bold text-sm uppercase tracking-wider">
            {msg} •
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {messages.map((msg, i) => (
          <span key={`dup-${i}`} className="mx-8 font-bold text-sm uppercase tracking-wider">
            {msg} •
          </span>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: inline-block;
          animation: ticker 30s linear infinite;
        }
        [dir="rtl"] .animate-ticker {
          animation: ticker-rtl 30s linear infinite;
        }
        @keyframes ticker-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
      `}} />
    </div>
  );
};

const DynamicUserCounter = ({ lang }: { lang: Lang }) => {
  const [count, setCount] = useState(settingsData.baseUserCount);
  
  useEffect(() => {
    const startTime = new Date().setHours(0,0,0,0);
    const now = new Date().getTime();
    const secondsSinceMidnight = Math.floor((now - startTime) / 1000);
    const growthPerSecond = settingsData.growthRate / (24 * 3600);
    
    setCount(settingsData.baseUserCount + Math.floor(secondsSinceMidnight * growthPerSecond * 100));

    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span className="font-mono font-bold text-lg">{count.toLocaleString()}</span>
      <span className="text-xs font-medium opacity-80">{t[lang].usersCount}</span>
    </div>
  );
};

const SchemaMarkup = ({ deal }: { deal: typeof DEALS[0] }) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": deal.titleEn,
    "image": "https://mazzr.com/logo.png",
    "description": deal.descEn,
    "sku": `MAZZR-${deal.id}`,
    "mpn": `MAZZR-MPN-${deal.id}`,
    "brand": {
      "@type": "Brand",
      "name": deal.brand
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": deal.rating,
      "reviewCount": deal.reviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "url": deal.link,
      "priceCurrency": "USD",
      "price": "0.00",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Mazzr"
      }
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": deal.rating,
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "Mazzr Team"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// AdSense Placeholders (Invisible structure requested by user to comply with AdSense without showing "Ad Space" text)
const AdSlot = ({ position, lang }: { position: string, lang: Lang }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="w-full my-6 flex justify-center items-center overflow-hidden">
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client="ca-pub-7085619463240604"
           data-ad-slot="0000000000"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

// Smart Deal Matcher Component
const SmartDealMatcher = ({ lang, onGetDeal }: { lang: Lang, onGetDeal: (e: React.MouseEvent, link: string) => void }) => {
  const [q1, setQ1] = useState('courses');
  const [q2, setQ2] = useState('save');
  const [loading, setLoading] = useState(false);
  const [matchedDeal, setMatchedDeal] = useState<any>(null);
  
  const isAr = lang === 'ar';

  const handleMatch = () => {
    setLoading(true);
    setMatchedDeal(null);
    setTimeout(() => {
      // Find a deal matching the category
      const deal = DEALS.find(d => d.category === q1) || DEALS[0];
      setMatchedDeal(deal);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 w-full max-w-sm">
      <div className="flex items-center gap-3 mb-6">
         <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
         </div>
         <div>
            <h3 className="font-bold text-lg text-slate-900">{t[lang].discountCalc}</h3>
            <p className="text-xs text-slate-500">{t[lang].calcDesc}</p>
         </div>
      </div>
      
      {!matchedDeal ? (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">{t[lang].originalPrice}</label>
            <select 
              value={q1} 
              onChange={e => setQ1(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer" 
            >
               {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                 <option key={c.id} value={c.id}>{isAr ? c.ar : c.en}</option>
               ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">{t[lang].discountPercent}</label>
            <select 
              value={q2} 
              onChange={e => setQ2(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer" 
            >
               <option value="save">{isAr ? 'توفير المال' : 'Save Money'}</option>
               <option value="quality">{isAr ? 'أعلى جودة' : 'Highest Quality'}</option>
               <option value="fast">{isAr ? 'عروض سريعة' : 'Fast Deals'}</option>
            </select>
          </div>
          
          <button 
            onClick={handleMatch}
            disabled={loading}
            className="w-full mt-4 bg-slate-900 hover:bg-purple-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Zap className="w-5 h-5" />
              </motion.div>
            ) : (
              <Search className="w-5 h-5" />
            )}
            {loading ? t[lang].finalPrice : (isAr ? 'ابحث عن عرضي' : 'Find My Deal')}
          </button>
        </div>
      ) : (
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="border border-purple-100 bg-purple-50/50 rounded-2xl p-5"
        >
           <div className="text-xs text-purple-600 font-bold uppercase tracking-wide mb-3 flex items-center gap-1.5"><Check className="w-4 h-4"/> {t[lang].youSave}</div>
           <div className="font-bold text-slate-900 text-lg mb-1">{isAr ? matchedDeal.titleAr : matchedDeal.titleEn}</div>
           <div className="text-sm text-slate-600 mb-4">{isAr ? matchedDeal.descAr : matchedDeal.descEn}</div>
           
           <a 
             href={matchedDeal.link}
             target="_blank"
             rel="noreferrer"
             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
           >
             {t[lang].getDeal} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
           </a>
           
           <button 
             onClick={() => setMatchedDeal(null)}
             className="w-full mt-2 text-slate-500 hover:text-slate-700 text-sm font-medium py-2 rounded-xl transition-colors"
           >
             {isAr ? 'حاول مرة أخرى' : 'Try Again'}
           </button>
        </motion.div>
      )}
    </div>
  );
}

// Legal Static Pages Component
const LegalStaticPage = ({ page, lang, setPage }: { page: Page, lang: Lang, setPage: (p: Page) => void }) => {
  const isAr = lang === 'ar';
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
       <button 
         onClick={() => setPage('home')} 
         className="mb-8 flex gap-2 items-center text-slate-500 hover:text-purple-600 font-semibold transition-colors"
       >
          <ArrowRight className={`w-5 h-5 ${!isAr ? 'rotate-180' : ''}`} />
          {t[lang].backHome}
       </button>
       <h1 className="text-4xl font-black mb-8 text-slate-900">
         {page === 'about' ? t[lang].about : page === 'privacy' ? t[lang].privacy : t[lang].terms}
       </h1>
       <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-6">
          {page === 'about' ? (
            isAr ? (
              <>
                <p className="font-semibold text-lg text-slate-800">مرحباً بك في منصة مازّر (Mazzr)، الملاذ الأول للباحثين عن التسوق الذكي الرقمي.</p>
                <p>تأسسنا بهدف واحد: تغيير طريقة تسوقك على الإنترنت. نعلم أنه يوجد الكثير من العروض الوهمية والأسعار غير الشفافة، ولذلك قمنا بإنشاء منصة تجمع أقوى العروض الرقمية الحقيقية على الإنترنت، سواء كانت تقنية، دورات تعليمية، برامج، أو خدمات اشتراكات، ونقدم لك الخصم الأكبر الذي تستحقه كعميل مميز لدينا.</p>
                <p>لماذا تتسوق عبر مازّر؟ لأننا نمنحك دخولاً حصرياً لقائمة الأسعار المخفضة التي لا تظهر للعموم. تصفح، اختر، ووفر تلقائياً. يعمل فريقنا وأدواتنا الذكية على مدار الساعة للتحقق من كوبونات الخصم والعروض الترويجية لضمان عملها بشكل فوري وفعال.</p>
                <p>مهمتنا هي توفير وقتك ومالك بضغطة زر. نحن لا نبيع المنتجات بشكل مباشر، بل نربطك بأفضل الأسعار المتوفرة عند شركائنا الموثوقين.</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-lg text-slate-800">Welcome to Mazzr, your ultimate destination for smart digital shopping.</p>
                <p>We were founded with a single mission: to redefine the way you shop online. Knowing the endless array of over-hyped deals and opaque pricing, we created a platform that tracks down the most powerful, legitimate digital offers — ranging from electronics and software to online courses and subscriptions — and presents you with the discounts you deserve.</p>
                <p>Why shop through Mazzr? Because we give you exclusive access to a curated list of discounted prices not always visible to the general public. Browse, choose, and save automatically. Our team and smart systems work round the clock verifying coupons and promotions, ensuring they are functional and effective instantly.</p>
                <p>Our goal is to save your time and money with just one click. We don’t sell products directly; we empower you by connecting you seamlessly to the best competitive prices available from our trusted partners.</p>
              </>
            )
          ) : page === 'privacy' ? (
            isAr ? (
              <>
                <p className="font-semibold text-lg text-slate-800">نشكر لك زيارتك لمنصتنا. نحن نأخذ خصوصيتك على محمل الجد، ونلتزم التزاماً كاملاً بحماية كافة بياناتك ومعلوماتك الشخصية وفقاً لأعلى معايير الأمان العالمية والسياسات التقنية المعتمدة.</p>
                
                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">1. جمع البيانات والمعلومات</h3>
                <p>عندما تقوم بتصفح منصتنا، يتم جمع نوعين من المعلومات لضمان حصولك على تجربة مستخدم مثالية وسلسة. النوع الأول هو المعلومات غير الشخصية، والتي تشمل نوع المتصفح الذي تستخدمه، ونظام التشغيل، والمنطقة الجغرافية التقريبية، وهي معلومات تساعدنا في تحسين واجهة المستخدم وعرض المحتوى بشكل يتناسب مع جهازك.</p>
                <p>أما النوع الثاني فهو المعلومات التي قد تقوم بتقديمها طواعية في حال توفرت ميزات التسجيل أو التواصل مستقبلاً. نحن نجمع البيانات لأغراض التحليل الاحصائي البحت لفهم اهتمامات زوارنا وكيفية تفاعلهم مع العروض المتوفرة لتقديم ما هو أفضل.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">2. استخدام ملفات تعريف الارتباط (Cookies)</h3>
                <p>يستخدم موقعنا تقنية ملفات تعريف الارتباط لتحسين تجربتك. هذه الملفات هي نصوص صغيرة يتم تخزينها في متصفحك وتسمح لنا بالتعرف عليك في زياراتك القادمة، وحفظ تفضيلاتك (مثل اللغة المطلوبة وتقسيمات العروض المفضلة). من خلال هذه التقنية، يمكننا ضمان تقديم الفئات الأنسب لك من العروض الحصرية، مما يقلل من الوقت المستغرق في البحث عن الصفقات القوية.</p>
                <p>يمكنك في أي وقت تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك، ولكن يرجى العلم أن هذا قد يؤثر على عمل بعض الخصائص والميزات الأساسية في المنصة وتجربتك بشكل عام.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">3. حماية البيانات ومشاركتها الوظيفية</h3>
                <p>نحن نؤكد بصفتنا منصة مسؤولة أننا لا نقوم بتاتاً ببيع، أو تأجير، أو تداول، أو المتاجرة بأي بيانات شخصية لزوارنا مع جهات خارجية لأغراض ربحية. تعتبر ثقتكم هي أولوية قصوى لنا، ولذلك يتم تطبيق بروتوكولات حماية متطورة وتشفير عالي المستوى لمنع أي وصول غير مصرح به.</p>
                <p>نقوم فقط بمشاركة البيانات الإحصائية المجمعة التي لا تدل على هوية الأفراد مع شركائنا التقنيين لتحسين سرعة وأداء واستقرار الخوادم وتقديم محتوى مخصص.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">4. الروابط للمنصات والمتاجر الخارجية</h3>
                <p>منصتنا متخصصة في تقديم وحصر أقوى العروض والتخفيضات المتاحة على مستوى الشبكة. لذلك، يحتوي موقعنا على روابط توجهك إلى متاجر وجهات خارجية للاستفادة من هذه العروض. بمجرد النقر على هذه الروابط ومغادرة منصتنا، فإنك تخضع لسياسة الخصوصية وشروط الاستخدام الخاصة بتلك المنصات.</p>
                <p>نحن نحرص على التعامل مع منصات رائدة وموثوقة (مثل أمازون، نون، ومزودي الكورسات العالميين)، ولكننا لا نملك سيطرة أو رقابة على ممارساتهم، ونشجعك دائماً على قراءة سياساتهم قبل إتمام أي عملية شرائية لتكون على دراية تامة بكيفية معالجتهم لمعلومات بطاقات الدفع أو البيانات الثبوتية.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">5. التعديلات على سياسة الخصوصية</h3>
                <p>تحتفظ منصتنا بالحق الكامل في تعديل وتحديث هذه السياسة من وقت لآخر وفقاً لما تقتضيه القوانين الدولية أو التحديثات التقنية في التشفير. أي تحديث سيتم إضافته إلى هذه الصفحة فوراً. استمرارك في استخدام الموقع بعد إتمام التعديلات يُعد قبولاً صريحاً منك لجميع التغييرات.</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-lg text-slate-800">Thank you for visiting our platform. We hold your privacy in the highest regard and are fully committed to protecting your personal data in accordance with top-level international security standards and technological practices.</p>
                
                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">1. Data Collection and Information Context</h3>
                <p>When you browse our platform, we collect certain types of non-personally identifiable information aiming to provide an optimized and tailored user experience. This includes browser type, device specifications, operating system details, and general geographical location parameters. This analytical data allows us to adapt our user interface and load resources more efficiently for your device.</p>
                <p>We analyze purely statistical aspects to understand how users interact with the exclusive deals, utilizing generalized cohorts rather than individual, identifiable tracking protocols, thus ensuring maximum anonymity while browsing.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">2. Use of Cookies and Tracking Technologies</h3>
                <p>Our website employs cookie technology to enrich your experience. Cookies are micro-text files stored securely in your browser that enable our systems to recognize returning users and remember individual preferences (such as selected language context and preferred deal categories). This functionality guarantees that the most relevant and high-value offers are prioritized during your visit, saving you valuable search time.</p>
                <p>You reserve the right to decline or clear cookies via your browser's dedicated settings. However, please be advised that mitigating cookie usage may inadvertently degrade specific functionalities, interface stability, and the overall quality of customized service provision.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">3. Data Security and Minimal Sharing</h3>
                <p>We categorically guarantee as a responsible platform entity that we do not sell, lease, trade, or distribute your personal data to external third parties for arbitrary commercial gain. Earning and maintaining your trust is our ultimate paramount goal; thus, we enforce stringent encryption architectures and firewall protections to aggressively combat unauthorized infiltration.</p>
                <p>We exclusively orchestrate non-identifiable, aggregated statistical reporting with our core technical partners solely to refine server acceleration, ensure high availability, and stabilize performance metrics globally.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">4. Third-Party Vendor Links and Operations</h3>
                <p>Our primary operational mandate is curating the net's most formidable, exclusive deals. Consequently, our ecosystem harbors outbound links directing you to external retail or brand domains to claim these offers. The moment you navigate via these links and exit our premises, you become subject to the respective destination’s distinct privacy and terms governance.</p>
                <p>While we deliberately select highly reputable destinations (e.g., massive e-commerce entities, premier educational hubs), we possess zero authoritative oversight over their internal data routing. We strongly advise scrutinizing their policies, particularly concerning the facilitation of sensitive payment processing tasks, before executing transactions.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">5. Policy Modifications and Revisions</h3>
                <p>The platform perpetually reserves the absolute right to revise, amend, or modify this Privacy Policy sporadically to reflect international legal shifts or cryptographic updates. All revisions will be promptly instated on this repository page. Continuous utilization of our platform post-modification inherently signifies absolute consent to the inaugurated alterations.</p>
              </>
            )
          ) : (
             isAr ? (
              <>
                <p className="font-semibold text-lg text-slate-800">مرحباً بك في منصتنا لتقديم أقوى العروض الحصرية. تُعد هذه الوثيقة القانونية المرجع الأساسي والاتفاقية المُلزمة بين منصتنا وبين جميع المستخدمين والزوار الذين يتصفحون الموقع ويستفيدون من خدماته.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">1. الموافقة والقبول التام</h3>
                <p>إن دخولك المستمر وتصفحك للمنصة يُشكل إقراراً وقبولاً كاملاً لا لبس فيه لجميع الشروط والأحكام والأطر القانونية المذكورة في هذه الوثيقة. إذا كنت لا توافق، بشكل جزئي أو كلي، على أيٍ من هذه الضوابط، نرجو منك التوقف فوراً عن استخدام منصتنا والامتناع عن الدخول إليها و تصفح محتوياتها.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">2. طبيعة الخدمات المقدمة وطريقة عمل الموقع</h3>
                <p>نحن نعمل كبوابة ومنصة وسيطة عالية الجودة تهدف إلى ربط المستهلكين بأفضل الصفقات والعروض الحصرية المتاحة على مستوى الشبكة الممتدة. نحن نقوم برصد الأسعار، البحث المكثف، وفلترة المنتجات والخدمات (مثل الأجهزة التقنية، الكورسات الاحترافية، حجوزات السفر، والاستضافات) لنقدمها لك في واجهة احترافية سهلة.</p>
                <p>يرجى العلم بشكل صريح وحاسم أن منصتنا لا تقوم بعمليات البيع المباشر، ولا نمتلك مستودعات، ولا نتحمل مسؤوليات التوصيل أو تتبع الشحنات. دورنا ينتهي بمجرد تحويلك بنجاح إلى واجهة المتجر الأصلي أو المنصة المزودة للخدمة. وبالتالي، فإن عملية الشراء كاملة تتم خارج موقعنا، وتخضع لشروط وأحكام الموقع البائع.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">3. إخلاء المسؤولية عن المنتجات وتسديد الأموال</h3>
                <p>نحن نسعى لمراجعة العروض والروابط بعناية لتكون عروضاً حقيقية وموثوقة قدر الإمكان. ولكن، نحن ننفي تماماً مسؤوليتنا القانونية والتجارية عن أي نزاع أو خلل أو تأخير قد ينتج بينك وبين المتاجر الخارجية حول جودة المنتج، الضمان، المرتجعات، أو المبالغ المالية. يجب توجيه جميع الاستفسارات والشكاوى المالية واللوجستية مباشرة لفريق الدعم الخاص بالمتجر الذي تمت فيه الشراء.</p>
                <p>كما لا نتحمل المسؤولية في حالة انتهاء العروض بشكل مُبكر من قبل المتاجر الأصلية قبل قيام الزائر بالاستفادة منها، حيث أن العروض تخضع لتوافر الكمية والشروط الزمنية الخاصة بكل بائع.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">4. حقوق الملكية الفكرية والعلامات التجارية</h3>
                <p>جميع محتويات موقعنا، بدءاً من الشعارات الابتكارية، تصاميم واجهة المستخدم الرسومية (UI)، الأكواد البرمجية، تنسيق البيانات، النصوص التوضيحية، وتصميمات الكود التفاعلية، هي حقوق محفوظة وحصرية لمنصتنا. التعدي، الاستنساخ، الاستنساخ العكسي، أو استغلال المحتوى لأغراض تنافسية أو تجارية يُعرض المنتهك للمساءلة القانونية الصارمة وفقاً لقوانين الملكية الفكرية الدولية.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">5. إخلاء مسؤولية توقف الموقع أو الانقطاع</h3>
                <p>مع أننا نبذل قصارى جهدنا التقني لضمان استقرار الخوادم بفعالية تصل إلى نسبة 99.9%، إلا أننا لا نضمن عدم حدوث أخطاء تقنية، هجمات سيبرانية طارئة، أو انقطاعات ناجمة عن تحديثات الأنظمة وأعمال الصيانة. لذلك نحن غير مسؤولين عن أي أضرار عرضية قد تنجم للمستخدم بسبب التوقف أو الانقطاع غير المبرمج للخدمة.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">6. التعديل على الشروط</h3>
                <p>نحتفظ بأحقيتنا الكاملة في الإضافة أو الحذف أو التعديل الكامل لهذه الشروط وفقاً لرؤيتنا الإدارية وفي أي توقيت نختاره وبدون إشعار مسبق. يُرجى مراجعة هذه الوثيقة دورياً للبقاء على اطلاع.</p>
              </>
             ) : (
              <>
                <p className="font-semibold text-lg text-slate-800">Welcome to our platform designed to deliver power-packed, exclusive deals. This legal document formulates the principal framework and binding agreement between our platform and all utilizing users or temporary visitors navigating our digital premises.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">1. Absolute Consent and Acceptance</h3>
                <p>Your continuous access and engagement across the platform unequivocally constitutes absolute, unconditional acknowledgment and acceptance of all terms, legal constraints, and conditions documented herein. If you disagree, whether partially or entirely, with any clause stipulated within these perimeters, you are formally urged to immediately suspend your usage and refrain from entering the platform.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">2. Nature of Rendered Operations</h3>
                <p>We function as an elite, intermediary indexing interface whose core objective is to connect prospective consumers with highly guarded, exclusive discounts spanning across the immense digital web. We conduct exhaustive price monitoring and service filtering (e.g., tech devices, professional courses, travel bookings, hosting infrastructure) to present them within a comprehensive, professional layout.</p>
                <p>Please be profoundly and explicitly aware that our platform engages in zero direct retail procedures. We process no inventory, govern no warehousing facilities, and shoulder zero responsibility regarding logistics or shipment oversight. Our operational sphere concludes successfully the precise moment you are redirected to the native retail environment. Consequently, all transactional verifications transpire externally and abide strictly by the seller’s jurisdiction.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">3. Disclaimer of Vendor Liabilities</h3>
                <p>We labor extensively to manually vet the veracity and legitimacy of all inbound promotions. Nevertheless, we comprehensively denounce any legal, commercial, or structural liability pertaining to controversies, qualitative faults, logistical delays, or infrastructural failures transpiring between you and the third-party merchants. Any demands revolving around product warranties, fund reimbursements, or delivery deficits must be aggressively aimed at the designated vendor’s customer support.</p>
                <p>Furthermore, we absorb zero liability regarding the premature expiration of retail offers triggered by the originating vendor. Constraints linked to stock availability or timeframe limitations remain under the absolute sovereignty of the supplying brand.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">4. Intellectual Property Governance</h3>
                <p>All core elements embedded within our digital residence—encompassing innovative logo insignias, graphical user interface paradigms, proprietary scripting architectures, structural compilations, custom typography, and dynamic code designs—are the exclusive, protected, and copyrighted property of our organization. Plagiarism, reverse-engineering, unauthorized reproduction, or illicit exploitation for competitive advantage will trigger swift, uncompromising legal prosecution bounded by international copyright treaties.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">5. Service Interruption Limitation of Liability</h3>
                <p>Despite our tremendous engineering dedication geared towards maintaining elite 99.9% server stability criteria, we cannot technically guarantee an ecosystem entirely devoid of sudden failures, systemic cyber breaches, or interruptions resulting from essential infrastructural overhauls. Consequently, we disclaim liability for any collateral, accidental, or incidental damages suffered by users directly stemming from unscheduled downtimes.</p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b pb-2">6. Procedural Amendments</h3>
                <p>We reserve exhaustive, irrevocable rights to append, eliminate, or fundamentally rewrite these Terms of Use at our sole managerial discretion, at any juncture, devoid of preemptive notifications. We recommend periodically refreshing your acquaintance with this repository.</p>
              </>
             )
          )}
       </div>
    </div>
  );
}


export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [page, setPage] = useState<Page>('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareList, setCompareList] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleShare = async (title: string, text: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(url);
      alert(isAr ? 'تم نسخ الرابط!' : 'Link copied!');
    }
  };

  const toggleCompare = (id: number) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  };
  
  // Timer State (Midnight Reset)
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [redirectingUrl, setRedirectingUrl] = useState<string | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // Midnight
      const difference = tomorrow.getTime() - now.getTime();
      return {
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isAr = lang === 'ar';
  
  const handleGetDeal = (e: React.MouseEvent, link: string, code?: string) => {
    e.preventDefault();
    if (code) {
      handleCopy(code);
    }
    setRedirectingUrl(link);
    setTimeout(() => {
      window.open(link, '_blank', 'noopener,noreferrer');
      setRedirectingUrl(null);
    }, 1500);
  };

  const filteredDeals = DEALS.filter(d => {
    const matchesCat = activeCategory === 'all' || d.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    
    const catObj = CATEGORIES.find(c => c.id === d.category);
    const catEn = catObj?.en.toLowerCase() || '';
    const catAr = catObj?.ar.toLowerCase() || '';

    const matchesSearch = d.titleEn.toLowerCase().includes(searchLower) 
      || d.titleAr.toLowerCase().includes(searchLower)
      || d.brand.toLowerCase().includes(searchLower)
      || d.descEn.toLowerCase().includes(searchLower)
      || d.descAr.toLowerCase().includes(searchLower)
      || catEn.includes(searchLower)
      || catAr.includes(searchLower);
    
    return matchesCat && matchesSearch;
  });

  return (
      <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-900`} dir={isAr ? 'rtl' : 'ltr'}>
       
       <AnimatePresence>
        {redirectingUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md"
          >
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t[lang].redirecting}</h2>
          </motion.div>
        )}
       </AnimatePresence>

       {/* FLASH DEAL COUNTDOWN BANNER */}
       {page === 'home' && (
         <motion.div 
           animate={{ 
             backgroundImage: [
               'linear-gradient(90deg, #4B0082, #511845)', 
               'linear-gradient(90deg, #511845, #3F006A)',
               'linear-gradient(90deg, #4B0082, #511845)'
             ] 
           }}
           transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
           className="text-white py-2 px-4 flex flex-wrap items-center justify-center gap-3 md:gap-6 shadow-[0_4px_20px_rgba(81,24,69,0.3)] border-b border-purple-400/20 relative overflow-hidden z-50"
         >
           <div className="absolute inset-0 bg-black/10"></div>
           <motion.div 
             animate={{ scale: [1, 1.05, 1], textShadow: ['0 0 0px #fbbf24', '0 0 10px #fbbf24', '0 0 0px #fbbf24'] }} 
             transition={{ duration: 1.5, repeat: Infinity }}
             className="relative flex items-center gap-2 font-black text-sm tracking-wider text-amber-300 uppercase"
           >
             <Zap className="w-4 h-4 fill-amber-300 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
             {t[lang].flashDeal}
           </motion.div>
           
           <div className="relative flex items-center gap-2 text-xs font-semibold bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
              <span className="text-purple-100">{t[lang].endsIn}</span>
              <div className="flex items-center gap-1 font-mono text-sm" dir="ltr">
                <div className="text-white">{timeLeft.h.toString().padStart(2, '0')}</div><span className="opacity-60 text-[10px] uppercase font-bold">{t[lang].hours}</span><span className="mx-1 opacity-50">:</span>
                <div className="text-white">{timeLeft.m.toString().padStart(2, '0')}</div><span className="opacity-60 text-[10px] uppercase font-bold">{t[lang].mins}</span><span className="mx-1 opacity-50">:</span>
                <div className="text-white">{timeLeft.s.toString().padStart(2, '0')}</div><span className="opacity-60 text-[10px] uppercase font-bold">{t[lang].secs}</span>
              </div>
           </div>
         </motion.div>
       )}

       <Ticker lang={lang} />
       {/* HEADER */}
       <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
         {/* HEADER AD BANNER */}
         <div className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 py-1.5 px-4 flex items-center justify-center gap-3 text-white text-xs font-bold">
           <span className="opacity-75 uppercase tracking-wider text-[10px]">{isAr ? 'رعاية' : 'Sponsored'}</span>
           <a
             href="https://bony-teaching.com/bh3NVS0.P/3MpWvubJm/VXJ-ZSDv0s3mMaDCMvxmN/T-QE1OL/TDcDwbMEzvEi1/N/D-kN"
             target="_blank"
             rel="noopener noreferrer"
             referrerPolicy="no-referrer-when-downgrade"
             className="underline underline-offset-2 hover:text-amber-300 transition-colors"
           >
             {isAr ? 'اكتشف أداة الأداء المتقدمة — عرض حصري للزوار' : 'Discover the Advanced Performance Tool — Exclusive Visitor Offer'}
           </a>
           <span className="hidden sm:inline text-amber-300 font-black text-[11px] border border-amber-300/50 px-2 py-0.5 rounded-md">{isAr ? 'جرب الآن' : 'Try Now'}</span>
         </div>
         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
           <div 
             className="flex items-center gap-2.5 cursor-pointer group"
             onClick={() => setPage('home')}
           >
             <img src="/logo.png" alt="Mazzr Logo" className="h-10 w-auto object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300" />
             <span className="text-2xl font-montserrat font-extrabold tracking-[0.1em] text-slate-900 uppercase group-hover:text-purple-600 transition-colors duration-300">
               {t[lang].logo}
             </span>
           </div>

           <div className="flex items-center gap-4">
             <button 
               onClick={() => handleShare(t[lang].logo, t[lang].heroSubtitle, window.location.href)}
               className="hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-bold transition-colors"
             >
               <Share2 className="w-4 h-4" /> {t[lang].share}
             </button>
             <button 
               onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')}
               className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
             >
               {isAr ? 'ENGLISH' : 'العربية'}
             </button>
           </div>
         </div>
       </header>

       <main className="flex-grow">
         {page === 'home' ? (
           <>
             {/* HERO SECTION */}
             <section className="pt-24 pb-20 px-4 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
                 <motion.h1 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
                 >
                   {t[lang].heroTitle} <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">
                     {t[lang].heroHighlight}
                   </span>
                 </motion.h1>
                 <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="text-lg md:text-xl text-slate-300 font-medium mb-6 max-w-2xl mx-auto"
                 >
                   {t[lang].heroSubtitle}
                 </motion.p>
                 
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.15 }}
                   className="mb-10"
                 >
                   <DynamicUserCounter lang={lang} />
                 </motion.div>
                 
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                   className="relative w-full max-w-2xl mx-auto"
                 >
                   <div className="absolute inset-y-0 flex items-center pointer-events-none px-5 text-slate-400">
                     <Search className="w-6 h-6 text-purple-500" />
                   </div>
                   <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder={t[lang].searchPlaceholder}
                     className={`w-full bg-white text-slate-900 border-4 border-transparent rounded-full py-5 ${isAr ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-lg font-bold focus:outline-none focus:border-purple-400 shadow-2xl transition-all`}
                   />
                   <AnimatePresence>
                      {searchQuery.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 right-0 mt-4 bg-white border border-slate-100 shadow-2xl rounded-3xl overflow-hidden z-50 p-2 max-h-[350px] overflow-y-auto text-slate-900"
                        >
                           {filteredDeals.length > 0 ? (
                             <div className="flex flex-col gap-1">
                               <div className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wide">{isAr ? 'نتائج فورية' : 'Live Results'}</div>
                               {filteredDeals.slice(0, 5).map(d => (
                                 <a 
                                   key={d.id} 
                                   href={d.link} 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   onClick={(e) => {
                                     handleGetDeal(e, d.link, d.code);
                                   }}
                                   className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                                 >
                                    <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">
                                      <div className="text-sm font-black text-slate-600">{d.brand.substring(0,2).toUpperCase()}</div>
                                    </div>
                                    <div className="flex-1 text-left line-clamp-1">
                                      <div className="font-bold text-slate-900 text-sm group-hover:text-purple-600 transition-colors">{isAr ? d.titleAr : d.titleEn}</div>
                                      <div className="text-xs text-slate-500 font-medium mt-0.5">{d.brand}</div>
                                    </div>
                                    <div className="bg-purple-50 text-purple-700 px-3 flex items-center justify-center rounded-lg text-xs font-black shrink-0 h-8 whitespace-nowrap">
                                      {d.discount}
                                    </div>
                                 </a>
                               ))}
                               {filteredDeals.length > 5 && (
                                 <div className="text-center py-3 text-xs font-bold text-purple-600">
                                   {isAr ? 'استمر في الكتابة للمزيد' : 'Keep typing for more...'}
                                 </div>
                               )}
                             </div>
                           ) : (
                             <div className="p-6 text-center text-sm text-slate-500 font-medium">
                               {t[lang].searchEmpty}
                             </div>
                           )}
                        </motion.div>
                      )}
                   </AnimatePresence>
                 </motion.div>
                 
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 flex flex-wrap justify-center items-center gap-3 text-sm font-semibold"
                 >
                    <span className="text-slate-400">{t[lang].trendingSearches}</span>
                    {['#Netflix', '#NordVPN', '#Amazon', '#Hostinger'].map(tag => (
                      <button 
                        key={tag} 
                        onClick={() => setSearchQuery(tag.replace('#', ''))} 
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-purple-300"
                      >
                        {tag}
                      </button>
                    ))}
                 </motion.div>
               </div>
             </section>

             <div className="max-w-7xl mx-auto px-4">
               {/* TOP AD SENSE */}
               <AdSlot position="Top" lang={lang} />
               {/* BANNER FOR SMART TOOLS */}
               <div className="my-6 bg-violet-100 text-violet-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-semibold border border-violet-200">
                 <div className="flex items-center gap-2">
                   <Sparkles className="w-5 h-5 text-violet-600" />
                   <span>{isAr ? 'اكتشف أدواتنا الذكية القوية لتسهيل قراراتك (بالأسفل)' : 'Discover our powerful smart tools to ease your decisions (Scroll down)'}</span>
                 </div>
                 <a href="#smart-tools" className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm whitespace-nowrap">{isAr ? 'جرب الآن' : 'Try Now'}</a>
               </div>
             </div>

             {/* MAIN CONTENT AREA */}
             <section className="max-w-7xl mx-auto px-4 pb-24">
               {/* SPONSOR BANNER - BELOW HERO */}
               <div className="my-6 bg-gradient-to-r from-slate-900 to-purple-900 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                 <div className="flex flex-col gap-1 text-white">
                   <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">{isAr ? 'رعاية' : 'Sponsored'}</span>
                   <p className="text-sm font-bold">
                     {isAr ? 'أداة الأداء المتقدمة — حسّن جهازك ووفّر مع عرضنا الحصري' : 'Advanced Performance Tool — Boost your device & save with our exclusive offer'}
                   </p>
                 </div>
                 <a
                   href="https://bony-teaching.com/bh3NVS0.P/3MpWvubJm/VXJ-ZSDv0s3mMaDCMvxmN/T-QE1OL/TDcDwbMEzvEi1/N/D-kN"
                   target="_blank"
                   rel="noopener noreferrer"
                   referrerPolicy="no-referrer-when-downgrade"
                   className="shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black px-6 py-2.5 rounded-xl text-sm transition-all shadow-md whitespace-nowrap"
                 >
                   {isAr ? 'اكتشف الآن' : 'Explore Now'}
                 </a>
               </div>

               {/* CATEGORY RIBBON */}
               <nav className="sticky top-[4rem] z-30 bg-white/90 backdrop-blur-md mb-8 overflow-x-auto pb-4 pt-4 scrollbar-hide -mx-4 px-4 border-b border-slate-100 shadow-sm" aria-label="Category Navigation">
                 <div className="flex items-center gap-3 w-max">
                   {CATEGORIES.map(cat => {
                     const CIcon = cat.icon;
                     const isActive = activeCategory === cat.id;
                     return (
                       <div key={cat.id} className="relative flex flex-col items-center group/tooltip">
                         <button
                           onClick={() => setActiveCategory(cat.id)}
                           className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-bold transition-all duration-300 shadow-sm ${
                             isActive 
                              ? 'bg-slate-900 text-white shadow-slate-900/20' 
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-md'
                           }`}
                         >
                           <CIcon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                           <span className="whitespace-nowrap">{isAr ? cat.ar : cat.en}</span>
                         </button>
                         <div className="absolute top-full mt-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50">
                           {isAr ? cat.ar : cat.en}
                           <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-800"></div>
                         </div>
                       </div>
                     )
                   })}
                 </div>
               </nav>

               <div className="flex flex-col gap-8">
                 {/* DEALS GRID */}
                 <div className="flex-1">
                   <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                     <Zap className="w-6 h-6 text-amber-500" />
                     {t[lang].featuredDeals}
                   </h2>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     <AnimatePresence mode='popLayout'>
                       {filteredDeals.map(deal => (
                         <motion.article
                           layout
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           key={deal.id}
                           className={`bg-slate-50 rounded-2xl p-5 border shadow-sm hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_12px_30px_-10px_rgba(81,24,69,0.15)] transition-all duration-300 flex flex-col relative overflow-hidden group ${
                             deal.brand === 'AliExpress' || deal.brand === 'Alibaba'
                               ? 'border-orange-200 ring-2 ring-orange-100 ring-opacity-50' 
                               : deal.brand === 'Blueberry Markets'
                               ? 'border-blue-200 ring-2 ring-blue-100 ring-opacity-50 bg-slate-900 text-white'
                               : 'border-slate-200/60 hover:border-purple-200'
                           }`}
                         >
                           {(deal.brand === 'AliExpress' || deal.brand === 'Alibaba') && (
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 z-30" />
                           )}
                           {deal.brand === 'Blueberry Markets' && (
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600 z-30" />
                           )}
                           <SchemaMarkup deal={deal} />
                           
                           {/* Glassmorphism gradient effect on hover */}
                           <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
                           
                           <div className="relative z-10 flex flex-col h-full">
                             <div className="flex justify-between items-start mb-3">
                               <div className="flex items-center gap-2">
                                 <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-black text-slate-700 shadow-sm">
                                   {deal.brand}
                                 </div>
                               </div>
                               <div className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider relative z-20 shadow-sm transition-transform group-hover:scale-105 ${
                                 deal.brand === 'AliExpress' || deal.brand === 'Alibaba'
                                   ? 'bg-orange-600 text-white' 
                                   : deal.brand === 'Blueberry Markets'
                                   ? 'bg-blue-600 text-white'
                                   : 'bg-orange-50 text-orange-600'
                               }`}>
                                 {deal.discount}
                               </div>
                               <div className="bg-purple-50 border border-purple-100 text-purple-700 px-3 py-1 rounded-bl-xl rounded-tr-xl text-[10px] font-black uppercase tracking-wider shadow-sm absolute -top-5 -right-5 group-hover:top-0 group-hover:right-0 transition-all duration-300">
                                 {deal.discount}
                               </div>
                             </div>
                             
                             {deal.fomo && (
                               <div className="mb-3 self-start">
                                 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-100 text-rose-600 text-[10px] uppercase font-bold tracking-wider">
                                   <Zap className="w-3 h-3 fill-rose-600" /> {deal.fomo}
                                 </span>
                               </div>
                             )}

                             <h3 className={`font-bold text-lg mb-1 leading-snug ${deal.brand === 'Blueberry Markets' ? 'text-white' : 'text-slate-900'}`}>
                               {isAr ? deal.titleAr : deal.titleEn}
                             </h3>

                             <div className="flex items-center gap-1.5 mb-3">
                               <div className="flex text-amber-400">
                                 {[...Array(5)].map((_, i) => (
                                   <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(deal.rating) ? 'fill-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                                 ))}
                               </div>
                               <span className="text-xs font-bold text-slate-700">{deal.rating}</span>
                               <span className="text-[10px] font-semibold text-slate-400">({deal.reviews.toLocaleString()})</span>
                             </div>

                             <p className={`text-sm mb-6 flex-grow leading-relaxed ${deal.brand === 'Blueberry Markets' ? 'text-blue-100' : 'text-slate-500'}`}>
                               {isAr ? deal.descAr : deal.descEn}
                             </p>

                             {deal.code && (
                               <div className="flex flex-col gap-1 mb-4">
                                 <div 
                                   onClick={() => handleCopy(deal.code!)}
                                   className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl group-hover:border-purple-300 transition-colors shadow-sm cursor-pointer hover:bg-purple-50"
                                   title="Click to copy"
                                 >
                                   <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                     {copiedCode === deal.code ? <ShieldCheck className="w-3 h-3 text-purple-500"/> : null}
                                     {copiedCode === deal.code ? (isAr ? 'تم النسخ' : 'Copied') : t[lang].useCode}
                                   </span>
                                   <span className="font-black text-slate-900 tracking-wider font-mono text-sm bg-slate-50 px-2 py-1 rounded border border-slate-200">{deal.code}</span>
                                 </div>
                                 <div className="text-[9px] text-slate-400 font-semibold px-1 {isAr ? 'text-right' : 'text-left'}">
                                   {t[lang].copyHint1}
                                 </div>
                               </div>
                             )}

                             {/* Progress Bar */}
                             <div className="mb-4">
                               <div className="flex justify-between items-end mb-1.5">
                                 <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{t[lang].claimedMsg}</span>
                                 <span className="text-xs font-black text-purple-600">{deal.claimed}%</span>
                               </div>
                               <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                 <motion.div 
                                   initial={{ width: 0 }}
                                   whileInView={{ width: `${deal.claimed}%` }}
                                   viewport={{ once: true }}
                                   transition={{ duration: 1, ease: 'easeOut' }}
                                   className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" 
                                 />
                               </div>
                             </div>

                             <a
                               href={deal.link}
                               target="_blank"
                               rel="nofollow noopener noreferrer"
                               onClick={(e) => handleGetDeal(e, deal.link, deal.code)}
                               className={`w-full font-bold py-3.5 rounded-xl text-center text-sm transition-all shadow-sm flex items-center justify-center gap-2 group/btn mb-4 ${
                                 deal.isFlash 
                                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_4px_14px_rgba(81,24,69,0.3)] hover:shadow-[0_6px_20px_rgba(81,24,69,0.4)]' 
                                  : 'bg-slate-900 hover:bg-purple-600 hover:shadow-purple-500/20 text-white'
                               }`}
                             >
                               {isAr ? (deal.btnTextAr || (deal.code ? t[lang].getDealCode : t[lang].getDeal)) : (deal.btnTextEn || (deal.code ? t[lang].getDealCode : t[lang].getDeal))} 
                               <ArrowRight className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${isAr ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                             </a>
                             
                             {/* Social Proof Bar */}
                             <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-500 bg-transparent mt-auto">
                               <div className="flex items-center gap-1.5 text-purple-600">
                                 <ShieldCheck className="w-4 h-4" /> 
                                 {t[lang].verifiedBy}
                               </div>
                               <div className="flex items-center gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                                 <span>{Math.floor(deal.id * 8.7 + 50)} {t[lang].usedTimes}</span>
                               </div>
                             </div>
                           </div>
                         </motion.article>
                       ))}
                     </AnimatePresence>
                     
                     {filteredDeals.length === 0 && (
                       <div className="col-span-full py-12 text-center text-slate-500 font-semibold bg-white rounded-2xl border border-slate-100">
                         {t[lang].searchEmpty}
                       </div>
                     )}
                   </div>
                   
                   {/* MOBILE CALCULATOR WIDGET (Shows only on mobile) */}
                   <div className="mt-12 flex justify-center md:hidden">
                     <SmartDealMatcher lang={lang} onGetDeal={handleGetDeal} />
                   </div>

                   {/* NATIVE AD CARD - MIDDLE SECTION */}
                   <div className="mt-16 mb-16">
                     <NativeAdCard lang={lang} position="middle" />
                   </div>

                 </div>
               </div>
             </section>

              <div className="max-w-7xl mx-auto px-4 mb-20">
               {/* SMART TOOLS (MOVED TO BOTTOM) */}
               <SmartTools lang={lang} t={t} />
               
               {/* BOTTOM AD SENSE */}
               <AdSlot position="Bottom" lang={lang} />
             </div>
             
             {/* FOOTER AD - BEFORE NEWSLETTER */}
             <div className="max-w-7xl mx-auto px-4 mb-12">
               <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
                 <div className="text-center">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{lang === 'ar' ? 'رعاية' : 'Sponsored'}</p>
                   <h3 className="text-xl font-bold text-slate-900 mb-3">
                     {lang === 'ar' ? 'تحسين أداء جهازك بسهولة' : 'Boost Your Device Performance Easily'}
                   </h3>
                   <p className="text-slate-600 mb-4 max-w-2xl mx-auto">
                     {lang === 'ar' 
                       ? 'استخدم أداتنا المتقدمة للحصول على أفضل أداء لجهازك. متوفرة حصرياً للزوار الكرام.' 
                       : 'Use our advanced tool to get the best performance for your device. Available exclusively for our valued visitors.'}
                   </p>
                   <a 
                     href="https://bony-teaching.com/bh3NVS0.P/3MpWvubJm/VXJ-ZSDv0s3mMaDCMvxmN/T-QE1OL/TDcDwbMEzvEi1/N/D-kN" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     referrerPolicy="no-referrer-when-downgrade"
                     className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                   >
                     {lang === 'ar' ? 'جرب الآن مجاناً' : 'Try Now Free'}
                   </a>
                 </div>
               </div>
             </div>
             
             {/* NEWSLETTER SECTION */}
             <section className="bg-purple-900 border-t border-purple-800 text-white rounded-t-3xl mt-12 py-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                  <Zap className="w-64 h-64" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                  <h2 className="text-3xl font-black mb-4">{isAr ? "لا تفوت أي عرض سري أو أداة جديدة!" : "Never Miss a Secret Deal or New Tool!"}</h2>
                  <p className="text-purple-100 font-medium text-lg mb-8 max-w-2xl mx-auto">
                    {isAr 
                      ? "اشترك في قائمتنا البريدية للحصول على أكواد خصم حصرية تصل إلى 90٪ وأدوات ذكية جديدة قبل الجميع." 
                      : "Join our mailing list to get exclusive promo codes up to 90% off and new smart tools before anyone else."
                    }
                  </p>
                  <form 
                    className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto" 
                    onSubmit={(e) => { 
                      e.preventDefault(); 
                      const formData = new FormData();
                      formData.append('form-name', 'newsletter');
                      formData.append('email', (e.target as any)[0].value);
                      fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams(formData as any).toString()
                      }).then(() => {
                        alert(isAr ? 'تم الاشتراك بنجاح! سيتم إرسال الأكواد الحصرية إلى بريدك قريباً.' : 'Successfully subscribed! Exclusive codes will be sent to your email soon.');
                        (e.target as HTMLFormElement).reset();
                      }).catch((error) => alert(error));
                    }}
                  >
                    <input 
                      type="email" 
                      name="email"
                      placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email"} 
                      required
                      className="px-6 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-purple-500/50 flex-grow font-medium"
                    />
                    <button type="submit" className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-xl font-black transition-all shadow-lg hover:shadow-purple-500/30 whitespace-nowrap">
                      {isAr ? "اشترك الآن" : "Subscribe Now"}
                    </button>
                  </form>
                  <p className="text-purple-300 text-xs mt-4">
                    {isAr ? "لا نرسل بريداً مزعجاً أبداً. يمكنك إلغاء الاشتراك في أي وقت." : "No spam ever. Unsubscribe at any time."}
                  </p>
                </div>
             </section>
             
             {/* COMPARE FLOATING BAR */}
             <AnimatePresence>
               {compareList.length > 0 && !showCompare && (
                 <motion.div
                   initial={{ y: 100 }}
                   animate={{ y: 0 }}
                   exit={{ y: 100 }}
                   className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-4 z-50 border border-slate-700"
                 >
                   <span className="font-bold">{t[lang].compare} ({compareList.length}/3)</span>
                   <button 
                     onClick={() => setShowCompare(true)}
                     className="bg-violet-600 hover:bg-violet-500 px-4 py-1.5 rounded-full text-sm font-bold transition-colors"
                   >
                     {t[lang].compareDeals}
                   </button>
                   <button 
                     onClick={() => setCompareList([])}
                     className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                   >
                     <X className="w-4 h-4" />
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* COMPARE MODAL */}
             <AnimatePresence>
               {showCompare && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
                 >
                   <motion.div 
                     initial={{ scale: 0.95, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.95, opacity: 0 }}
                     className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                   >
                     <div className="flex items-center justify-between mb-8">
                       <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                         <Scale className="w-6 h-6 text-violet-500" /> {t[lang].compareDeals}
                       </h2>
                       <button onClick={() => setShowCompare(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                         <X className="w-6 h-6" />
                       </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {compareList.map(id => {
                         const deal = DEALS.find(d => d.id === id);
                         if (!deal) return null;
                         return (
                           <div key={deal.id} className="border border-slate-200 rounded-2xl p-5 relative flex flex-col">
                             <button onClick={() => setCompareList(prev => prev.filter(i => i !== deal.id))} className="absolute top-3 right-3 text-slate-400 hover:text-rose-500">
                               <X className="w-4 h-4" />
                             </button>
                             <div className="text-xs font-bold text-slate-500 uppercase mb-2">{deal.brand}</div>
                             <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{isAr ? deal.titleAr : deal.titleEn}</h3>
                             <div className="bg-rose-50 text-rose-600 inline-block px-3 py-1 rounded-full text-xs font-black mb-4 w-max">{deal.discount}</div>
                             <p className="text-sm text-slate-600 mb-6 flex-grow">{isAr ? deal.descAr : deal.descEn}</p>
                             
                             <a href={deal.link} target="_blank" rel="noreferrer" className="w-full text-center py-3 bg-violet-100 hover:bg-violet-200 text-violet-700 font-bold rounded-xl transition-colors">
                               {t[lang].getDeal}
                             </a>
                           </div>
                         )
                       })}
                     </div>
                   </motion.div>
                 </motion.div>
               )}
             </AnimatePresence>
           </>
         ) : (
           <LegalStaticPage page={page} lang={lang} setPage={setPage} />
         )}
       </main>

       {/* FOOTER */}
       <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
         {/* FOOTER SPONSOR STRIP */}
         <div className="border-b border-slate-200 py-3 px-4 flex items-center justify-center gap-4 bg-white">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">{isAr ? 'رعاية' : 'Ad'}</span>
           <a
             href="https://bony-teaching.com/bh3NVS0.P/3MpWvubJm/VXJ-ZSDv0s3mMaDCMvxmN/T-QE1OL/TDcDwbMEzvEi1/N/D-kN"
             target="_blank"
             rel="noopener noreferrer"
             referrerPolicy="no-referrer-when-downgrade"
             className="text-xs font-semibold text-slate-600 hover:text-purple-600 transition-colors"
           >
             {isAr ? 'أداة الأداء المتقدمة — حسّن جهازك بخصم حصري للزوار' : 'Advanced Performance Tool — Exclusive discount for visitors'}
           </a>
           <span className="shrink-0 text-[10px] font-black text-purple-600 border border-purple-200 px-2 py-0.5 rounded-md bg-purple-50">{isAr ? 'جرب مجاناً' : 'Try Free'}</span>
         </div>
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex flex-col gap-2 text-center md:text-start">
             <div className="flex items-center justify-center md:justify-start gap-2.5 mb-1 group cursor-pointer hover:opacity-100 transition-opacity duration-300">
               <img src="/logo.png" alt="Mazzr Logo" className="h-9 w-auto object-contain opacity-90 filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300" />
               <span className="text-xl font-montserrat font-extrabold tracking-[0.1em] text-slate-900 uppercase opacity-90 group-hover:text-purple-600 transition-colors duration-300">
                 {t[lang].logo}
               </span>
             </div>
             <p className="text-slate-300 text-[10px] max-w-md leading-relaxed font-medium">
               {t[lang].disclosure}
             </p>
             <div className="text-slate-400 text-xs font-semibold mt-2">
               © {new Date().getFullYear()} Mazzr. {t[lang].footerText}
             </div>
           </div>
           <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-semibold text-slate-600">
             <button onClick={() => setPage('about')} className="hover:text-purple-600 transition-colors">
               {t[lang].about}
             </button>
             <button onClick={() => setPage('privacy')} className="hover:text-purple-600 transition-colors">
               {t[lang].privacy}
             </button>
             <button onClick={() => setPage('terms')} className="hover:text-purple-600 transition-colors">
               {t[lang].terms}
             </button>
           </div>
         </div>
       </footer>

    </div>
  );
}
