import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Monitor, CreditCard, Sparkles, Plane, ArrowRight, Zap, Check, ShieldCheck, Activity, ChevronRight, Calculator } from 'lucide-react';

const PcBuilder = ({ isAr }: { isAr: boolean }) => {
  const [budget, setBudget] = useState('1000');
  const [usage, setUsage] = useState('gaming');
  const [casePref, setCasePref] = useState('mid');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const b = parseInt(budget);
    if (isNaN(b) || b <= 0) return;
    
    let rec: any = { title: '', cpu: '', gpu: '', ram: '', mobo: '', psu: '', ssd: '', pcCase: '', cooler: '', perf: '', error: '', link: '' };
    
    // Case preference logic
    const getCase = (tier: 'low' | 'mid' | 'high') => {
      if (casePref === 'sff') {
        if (tier === 'low') return isAr ? "صندوق ITX صغير جداً واقتصادي" : "Budget Mini-ITX SFF Case";
        if (tier === 'mid') return isAr ? "صندوق ITX فاخر (Cooler Master NR200)" : "Premium ITX Case (Cooler Master NR200)";
        if (tier === 'high') return isAr ? "صندوق ITX عالي الأداء مع تهوية قوية (Lian Li A4/FormD)" : "High-airflow ITX (Lian Li A4/FormD)";
      }
      if (casePref === 'atx') {
        if (tier === 'low') return isAr ? "صندوق Full Tower اقتصادي" : "Budget Full-Tower Case";
        if (tier === 'mid') return isAr ? "صندوق Full Tower احترافي" : "Professional Full-Tower Airflow Case";
        if (tier === 'high') return isAr ? "صندوق Full Tower فلاجشيب (Corsair 7000D)" : "Flagship Full-Tower Case (Corsair 7000D)";
      }
      // Default mid
      if (tier === 'low') return isAr ? "صندوق Micro-ATX مدمج واقتصادي" : "Budget Micro-ATX Case";
      if (tier === 'mid') return isAr ? "صندوق Mid-Tower تهوية ممتازة (Corsair 4000D)" : "Mid-Tower Airflow Case (Corsair 4000D)";
      return isAr ? "صندوق فاخر Dual-Chamber (Lian Li O11/NZXT H9)" : "Premium Dual-Chamber Case (Lian Li O11/NZXT H9)";
    };

    if (b < 100) {
      rec = {
        ...rec,
        title: isAr ? "ميزانية منخفضة جداً" : "Very Low Budget",
        error: isAr 
          ? "الميزانية لا تكفي لشراء جهاز كامل. ننصحك باستخدام هذا المبلغ لترقية جهازك الحالي (مثل زيادة سعة الرام أو شراء قرص SSD لتسريع الأداء)."
          : "Budget is too low for a full PC. We recommend upgrading your current PC (e.g., adding RAM or an SSD).",
        link: "https://amzn.to/3SSDRam"
      };
    } else if (b >= 100 && b < 300) {
      rec = {
        ...rec,
        title: isAr ? "جهاز تصفح وأعمال مكتبية (مجدد)" : "Refurbished Office/Browsing PC",
        cpu: isAr ? "Intel Core i5 (الجيل السادس/السابع مجدد)" : "Intel Core i5 (6th/7th Gen Refurbished) ~$80",
        gpu: isAr ? "كرت شاشة مدمج (لا يصلح للألعاب)" : "Integrated Graphics (Not for gaming)",
        ram: "8GB - 16GB DDR4 ~$30",
        mobo: isAr ? "لوحة أم OEM (HP/Dell)" : "OEM Motherboard (HP/Dell)",
        psu: "250W - 300W OEM",
        ssd: "256GB - 512GB SATA SSD",
        pcCase: getCase('low'),
        cooler: isAr ? "مشتت هوائي قياسي" : "Stock Intel Cooler",
        perf: isAr ? "مناسب جداً للفيسبوك، يوتيوب، وأبحاث المدرسة. لا يصلح للألعاب." : "Great for web browsing, YouTube, and school work. No gaming.",
        link: "https://amzn.to/3OaT7yD"
      };
    } else if (b >= 300 && b < 600) {
      rec = {
        ...rec,
        title: isAr ? "تجميعة اقتصادية جداً (APU)" : "Ultra Budget APU Build",
        cpu: isAr ? "Ryzen 5 8600G أو 5600G (يحتوي على كرت شاشة مدمج قوي) ~$150" : "Ryzen 5 8600G/5600G (Strong Integrated) ~$150",
        gpu: isAr ? "بطاقة مدمجة (AMD Radeon Graphics)" : "Integrated AMD Radeon Graphics",
        ram: "16GB (2x8GB) DDR5/DDR4 ~$50",
        mobo: isAr ? "B650M أو A520M" : "B650M or A520M Micro-ATX",
        psu: "450W - 550W 80+ Bronze ~$50",
        ssd: "500GB NVMe M.2 Gen3 ~$40",
        pcCase: getCase('low'),
        cooler: isAr ? "مشتت AMD المرفق (Wraith Stealth)" : "Stock AMD Wraith Stealth Cooler",
        perf: isAr ? "ألعاب خفيفة (Valorant, CS:GO, FIFA) على إعدادات منخفضة وتصفح ممتاز" : "Light esports gaming (Valorant, CS:GO) on low, excellent browsing",
        link: "https://amzn.to/3OaT7yD"
      };
    } else if (b >= 600 && b < 900) {
       rec = {
        ...rec,
        title: isAr ? "تجميعة الدخول الاقتصادية القوية" : "Strong Entry-Level Build",
        cpu: "Intel Core i5-12400F / Ryzen 5 5600 ~$130",
        gpu: "AMD Radeon RX 6600 8GB / RTX 3060 12GB ~$250",
        ram: "16GB (2x8GB) DDR4 3200MHz ~$40",
        mobo: isAr ? "B660M أو B550M" : "B660M or B550M Micro-ATX ~$100",
        psu: "550W - 600W 80+ Bronze ~$60",
        ssd: "1TB NVMe M.2 Gen4 ~$65",
        pcCase: getCase('mid'),
        cooler: isAr ? "مبرد هوائي اقتصادي (Thermalright Assassin X) ~$20" : "Budget Air Cooler (Thermalright Assassin X) ~$20",
        perf: isAr ? "أداء ممتاز جداً على دقة 1080p بمعظم الألعاب الحديثة (High Settings)" : "Great 1080p performance on most games (High Settings)",
        link: "https://amzn.to/3K3qgVj"
      };
    } else if (b >= 900 && b < 1500) {
      if (usage === 'gaming') {
        rec = {
          ...rec,
          title: isAr ? "تجميعة الألعاب المتوسطة-العليا" : "Mid-High Gaming Build",
          cpu: "AMD Ryzen 5 7600 ~$190",
          gpu: "NVIDIA RTX 4060 Ti 8GB / RX 7700 XT ~$400",
          ram: "32GB (2x16GB) DDR5 6000MHz CL30 ~$100",
          mobo: "B650 ATX / Micro-ATX ~$150",
          psu: "750W 80+ Gold Fully Modular ~$90",
          ssd: "1TB / 2TB NVMe M.2 Gen4 (WD Black SN850X / Samsung 980 Pro) ~$90-$150",
          pcCase: getCase('mid'),
          cooler: isAr ? "مبرد هوائي ثنائي (Thermalright Peerless Assassin) ~$35" : "Dual-Tower Air Cooler (Thermalright Peerless Assassin) ~$35",
          perf: isAr ? "ألعاب 2K (1440p) بسلاسة عالية وفرام ريت ممتاز للرياضات الإلكترونية" : "Smooth 1440p gaming & high FPS for esports",
          link: "https://amzn.to/42H7tY4"
        };
      } else {
        rec = {
          ...rec,
          title: isAr ? "تجميعة صناعة المحتوى والمونتاج المتوسطة" : "Mid Creator & Editing Build",
          cpu: "Intel Core i5-13600K (تعدد أنوية ممتاز) ~$280",
          gpu: "NVIDIA RTX 4060 8GB (للمونتاج وتسريع CUDA) ~$300",
          ram: "32GB (2x16GB) DDR5 6000MHz ~$100",
          mobo: "Z790 أو B760 ATX ~$180",
          psu: "750W 80+ Gold Fully Modular ~$90",
          ssd: "2TB NVMe M.2 Gen4 (للملفات والفيديو) ~$130",
          pcCase: getCase('mid'),
          cooler: isAr ? "مبرد مائي 240mm أو 360mm (AIO) ~$80" : "240mm/360mm AIO Liquid Cooler ~$80",
          perf: isAr ? "ممتازة للمونتاج (Premiere Pro) وتصيير الفيديو وبرامج أدوبي" : "Great for video editing (Premiere Pro) and Adobe apps",
          link: "https://amzn.to/3Sl1A1d"
        };
      }
    } else if (b >= 1500 && b < 2500) {
       rec = {
          ...rec,
          title: isAr ? "تجميعة الأحلام 2K / 4K" : "Dream High-End Build",
          cpu: "AMD Ryzen 7 7800X3D / Intel i7-14700K ~$380",
          gpu: "NVIDIA RTX 4070 Ti SUPER / RX 7900 XT ~$800",
          ram: "32GB (2x16GB) DDR5 6000MHz CL30 ~$110",
          mobo: "X670E أو Z790 ATX ~$250",
          psu: "850W 80+ Gold / Platinum ATX 3.0 ~$130",
          ssd: "2TB NVMe M.2 Gen4 High-End ~$150",
          pcCase: getCase('high'),
          cooler: isAr ? "مبرد مائي 360mm أداء عالي ~$120" : "High-Performance 360mm AIO Liquid Cooler ~$120",
          perf: isAr ? "أقصى أداء على دقة 2K ودخول قوي جداً ومستقر لدقة 4K" : "Max 1440p perf & very strong 4K entry",
          link: "https://amzn.to/3Sl1B2e"
        };
    } else {
       if(b > 10000) {
         rec = {
           ...rec,
           title: isAr ? "ميزانية فلكية!" : "Astronomical Budget!",
           error: isAr 
             ? "هذا الرقم كبير جداً (أكثر من 10,000 دولار). أفضل جهاز في العالم حالياً لا يتجاوز 5,000 - 7,000 دولار. يرجى إدخال ميزانية واقعية!" 
             : "This budget is massive. The absolute best consumer PC maxes out around $6,000. Please enter a realistic budget.",
           link: ""
         };
       } else {
         rec = {
            ...rec,
            title: isAr ? "التجميعة الخارقة (الفئة العليا المطلقة)" : "Ultra Enthusiast Maxed Build",
            cpu: usage === 'work' ? "Intel Core i9-14900K ~$550" : "AMD Ryzen 9 7950X3D ~$600",
            gpu: "NVIDIA RTX 4090 24GB ~$1800",
            ram: "64GB (2x32GB) DDR5 6000MHz CL30 ~$200",
            mobo: "X670E / Z790 E-ATX Flagship ~$400",
            psu: "1000W - 1200W 80+ Titanium ATX 3.0 ~$250",
            ssd: "4TB (2x2TB) NVMe M.2 Gen4/Gen5 ~$300+",
            pcCase: getCase('high'),
            cooler: isAr ? "مبرد مائي 360mm أو 420mm مع شاشة LCD ~$250" : "Premium 360mm/420mm AIO with LCD ~$250",
            perf: isAr ? "أعلى قطعة متوفرة للسوق الاستهلاكي. لا يوجد لعبة أو برنامج يصعب عليها بدقة 4K." : "Absolute highest tier consumer PC. Eats 4K gaming and heavy 3D rendering easily.",
            link: "https://amzn.to/4bcF9u"
          };
       }
    }
    setResult(rec);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "الميزانية ($)" : "Budget ($)"}</label>
          <input type="number" min="0" value={budget} onChange={e=>setBudget(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "الاستخدام" : "Usage"}</label>
          <select value={usage} onChange={e=>setUsage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
            <option value="gaming">{isAr ? "ألعاب (Gaming)" : "Gaming"}</option>
            <option value="work">{isAr ? "مونتاج وبرامج علمية" : "Work & Editing"}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "حجم الصندوق" : "Case Size"}</label>
          <select value={casePref} onChange={e=>setCasePref(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
            <option value="mid">{isAr ? "متوسط (Mid-Tower)" : "Mid-Tower"}</option>
            <option value="sff">{isAr ? "صغير جداً (Mini-ITX)" : "Small Form (Mini-ITX)"}</option>
            <option value="atx">{isAr ? "كبير (Full-Tower)" : "Large (Full-Tower)"}</option>
          </select>
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
        <Zap className="w-4 h-4" /> {isAr ? "حلّل الميزانية بذكاء" : "Smart Budget Analysis"}
      </button>

      {result && (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm text-start">
          <h4 className="font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-200">{result.title}</h4>
          
          {result.error ? (
             <div className="text-sm font-medium text-red-700 bg-red-50 p-4 rounded-xl border border-red-200">
               {result.error}
             </div>
          ) : (
            <>
              <ul className="space-y-3 text-sm text-indigo-900">
                {result.cpu && <li><span className="font-bold">CPU:</span> {result.cpu}</li>}
                {result.cooler && <li><span className="font-bold">Cooler:</span> {result.cooler}</li>}
                {result.gpu && <li><span className="font-bold">GPU:</span> {result.gpu}</li>}
                {result.ram && <li><span className="font-bold">RAM:</span> {result.ram}</li>}
                {result.mobo && <li><span className="font-bold">Motherboard:</span> {result.mobo}</li>}
                {result.ssd && <li><span className="font-bold">Storage (SSD):</span> {result.ssd}</li>}
                {result.psu && <li><span className="font-bold">Power Supply:</span> {result.psu}</li>}
                {result.pcCase && <li><span className="font-bold">Case:</span> {result.pcCase}</li>}
                <li className="mt-4 pt-3 border-t border-indigo-200 flex items-start gap-2 font-bold text-indigo-700">
                  <Activity className="w-4 h-4 shrink-0 mt-0.5"/> 
                  <span>{result.perf}</span>
                </li>
              </ul>
              <a href={result.link} target="_blank" rel="noopener noreferrer" className="mt-5 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 text-sm transition-colors shadow-sm">
                {isAr ? "تصفح الأسعار التقريبية (أمازون)" : "Browse Market Prices (Amazon)"} <ChevronRight className="w-4 h-4" />
              </a>
            </>
          )}
        </motion.div>
      )}
    </div>
  )
};

const SubsComparator = ({ isAr }: { isAr: boolean }) => {
  const [type, setType] = useState('movies');
  const [screens, setScreens] = useState('1');
  
  const subs = [
    { type: 'movies', name: 'Netflix', screens: [1,2,4], price: screens === '4' ? '$23' : screens === '2' ? '$15.5' : '$7 (With Ads)', cons: isAr ? 'لا يوجد خصم سنوي والخطة الأساسية بإعلانات' : 'No yearly discount, basic has ads', link:'https://netflix.com' },
    { type: 'movies', name: 'Amazon Prime', screens: [3], price: '$9', cons: isAr ? 'يشتمل على مزايا شحن وتويتش وألعاب' : 'Includes shipping, Twitch & games', link:'https://primevideo.com' },
    { type: 'movies', name: 'Disney+', screens: [1,4], price: screens === '4' ? '$14' : '$8', cons: isAr ? 'أفضل مكتبة للعائلات ومارفل وخصم سنوي' : 'Best family library & Marvel', link:'https://disneyplus.com' },
    { type: 'anime', name: 'Crunchyroll', screens: [1,4], price: screens === '4' ? '$10' : '$8', cons: isAr ? 'أكبر مكتبة أنمي خصم سنوي متوفر' : 'Huge anime library, annual discount', link:'https://crunchyroll.com' },
    { type: 'sports', name: 'TOD (beIN)', screens: [1,2], price: '$18', cons: isAr ? 'ممتاز للبطولات الكبرى والمباريات الحية' : 'Great for major tournaments & live matches', link:'https://tod.tv' },
    { type: 'sports', name: 'ESPN+', screens: [3], price: '$11', cons: isAr ? 'دوري أمريكي، UFC، وبعض الدوريات' : 'US sports, UFC, select leagues', link:'https://plus.espn.com' },
    { type: 'gaming', name: 'Xbox Game Pass Ultimate', screens: [1], price: '$17', cons: isAr ? 'مكتبة ألعاب ضخمة جداً للكمبيوتر والكونسول' : 'Huge PC/Console library + Cloud Gaming', link:'https://xbox.com' },
    { type: 'gaming', name: 'PlayStation Plus Extra', screens: [1], price: '$15', cons: isAr ? 'حصريات بلايستيشن الرائعة' : 'Great PS Exclusives', link:'https://playstation.com' },
  ];

  const filtered = subs.filter(s => s.type === type && (s.screens.includes(parseInt(screens)) || s.screens.some(val => val > parseInt(screens))));

  return (
    <div className="space-y-4 text-start">
      <div className="grid grid-cols-2 gap-4 mb-4">
         <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "نوع المحتوى المطلوب" : "Content Type"}</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none">
            <option value="movies">{isAr ? "أفلام ومسلسلات عالمية" : "Global Movies & Series"}</option>
            <option value="anime">{isAr ? "أنمي ياباني" : "Anime"}</option>
            <option value="sports">{isAr ? "رياضة وبطولات حية" : "Live Sports"}</option>
            <option value="gaming">{isAr ? "اشتراكات الألعاب" : "Gaming Subs"}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "كم شاشة بنفس الوقت؟" : "Simultaneous Screens"}</label>
          <select value={screens} onChange={e=>setScreens(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none">
            <option value="1">{isAr ? "1 (لنفسي فقط)" : "1 (Just me)"}</option>
            <option value="2">{isAr ? "2 (شخصين)" : "2 (Two users)"}</option>
            <option value="4">{isAr ? "4+ (عائلة)" : "4+ (Family)"}</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3 relative z-10">
         {filtered.length > 0 ? filtered.map((sub, i) => (
           <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-rose-300 transition-colors">
              <div>
                <span className="font-bold text-slate-900 text-lg">{sub.name}</span><br/>
                <span className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px] block">{sub.cons}</span>
              </div>
              <div className="text-end shrink-0">
                <span className="font-black text-rose-600 text-xl">{sub.price}</span><span className="text-xs text-rose-400">/mo</span><br/>
                <a href={sub.link} target="_blank" rel="noopener noreferrer" className="text-[11px] bg-slate-900 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg inline-block mt-2 font-bold transition-colors shadow-sm">{isAr ? "الموقع الرسمي" : "Official Site"}</a>
              </div>
           </div>
         )) : (
           <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-xl border border-slate-100">{isAr ? "لا توجد نتائج دقيقة، جرب تقليل عدد الشاشات" : "No exact match found, try reducing screens count"}</p>
         )}
      </div>
    </div>
  )
};

const HealthAdvisor = ({ isAr }: { isAr: boolean }) => {
  const [goal, setGoal] = useState('skin');
  const [age, setAge] = useState('25-40');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let rec: any = { title: '', desc: '', items: [] };
    if (goal === 'skin') {
      if (age === 'under25') {
         rec = {
            ...rec,
            title: isAr ? "دليل البشرة الشابة وعلاج حب الشباب" : "Young Skin & Acne Defense",
            desc: isAr ? "بعمرك، التركيز يجب أن يكون على الترطيب وحماية حاجز البشرة، ومكافحة المسام المسدودة." : "Focus on barrier protection, hydration and preventing clogged pores.",
            items: isAr ? [
              "غسول يحتوي على حمض الساليسيليك 2% (لمنع حب الشباب والزيوت)", 
              "مرطب مائي (Water-based) خالي من الزيوت", 
              "لصقات حب الشباب الغروانية (Hydrocolloid) للحبوب الفجائية",
              "واقي شمس واسع الطيف SPF 50+ يومياً"
            ] : [
              "2% Salicylic Acid Cleanser (Oil control)", 
              "Oil-free Water Gel Moisturizer", 
              "Hydrocolloid Pimple Patches",
              "SPF 50+ Broad Spectrum Daily"
            ]
         };
      } else if (age === '25-40') {
         rec = {
            ...rec,
            title: isAr ? "روتين تأخير الشيخوخة والحفاظ على الإشراقة" : "Pro-aging & Glow Routine",
            desc: isAr ? "بعد سن الـ 25 يبدأ إنتاج الكولاجين بالانخفاض الملحوظ بطيئاً. يجب إدخال محفزات." : "Collagen production drops slightly after 25. Time to introduce actives.",
            items: isAr ? [
              "سيروم فيتامين C بتركيز 10-15% (كل صباح قبل واقي الشمس)", 
              "ريتينول بتركيز 0.3% (مرتين أسبوعياً مساءً لتحفيز الكولاجين)", 
              "سيروم حمض الهيالورونيك (للترطيب العميق)", 
              "واقي شمس مخصص للبشرة ومضاد للشيخوخة الضوئية"
            ] : [
              "Vitamin C 10-15% Serum (AM before SPF)", 
              "Retinol 0.3% (PM 2x a week for collagen)", 
              "Hyaluronic Acid Serum (Plumping)",
              "Anti-photoaging Sunscreen"
            ]
         };
      } else if (age === '40-50') {
         rec = {
            ...rec,
            title: isAr ? "روتين دعم البشرة وتقوية الكولاجين" : "Firming & Collagen Support",
            desc: isAr ? "في هذا العمر، التركيز على شد البشرة وتعويض نقص الكولاجين بشكل مكثف." : "Focus deeply on firming and aggressively combating collagen loss.",
            items: isAr ? [
              "غسول كريمي مرطب (وليس رغوي قاسي)",
              "ريتينالدهيد (Retinal) أو ريتينول قوي (0.5% - 1%)", 
              "كريم مرطب ثقيل يحتوي على الببتيدات (Peptides)",
              "التقشير بأحماض الفواكه (AHA) مرة أسبوعياً للتقشير السطحي"
            ] : [
              "Creamy Hydrating Cleanser", 
              "Retinaldehyde or Strong Retinol (0.5-1%)", 
              "Thick Peptide-Rich Cream",
              "AHA Exfoliation 1x weekly"
            ]
         };
      } else {
         rec = {
            ...rec,
            title: isAr ? "روتين دعم البشرة الناضجة والتجاعيد العميقة" : "Mature Skin & Deep Wrinkle Support",
            desc: isAr ? "البشرة تصبح أرق وأكثر جفافاً. الترطيب الكثيف وتجديد الخلايا هما الحل." : "Skin becomes thinner and drier. Deep hydration and cell renewal are key.",
            items: isAr ? [
              "استخدام زيوت الوجه لحبس الرطوبة بفعالية (Squalane/Rosehip)",
              "ريتينول خفيف أو بوكوشيول (بديل نباتي ألطف للريتينول) لتجنب التهيج", 
              "كريم ليلي غني جداً يحتوي على السيراميد المكثف",
              "استخدام واقي شمس مرطب بدرجة عالية 50+ وتجديده باستمرار"
            ] : [
              "Face Oils (Squalane/Rosehip) for moisture locking", 
              "Gentle Retinol or Bakuchiol to prevent irritation", 
              "Very rich Night Cream with intensive Ceramides",
              "Highly moisturizing Broad-Spectrum SPF 50+"
            ]
         };
      }
    } else if (goal === 'energy') {
      if(age === 'under25') {
        rec = {
           ...rec,
           title: isAr ? "طاقة وتركيز للمذاكرة والدراسة الجامعية" : "Focus & Energy for Studies",
           items: isAr ? ["أوميغا 3 للتركيز الذهني والمذاكرة", "فيتامين B12 للطاقة العصبية", "مصادر الكافيين الطبيعية كالماتشا بدلاً من مشروبات الطاقة"] : ["Omega 3 for Focus", "Vitamin B12 for Nerve Energy", "Matcha instead of Energy Drinks"]
        };
      } else if (age === '25-40') {
         rec = {
           ...rec,
           title: isAr ? "مكافحة إرهاق العمل والحياة وضغوطها" : "Combat Workspace & Stress Fatigue",
           items: isAr ? ["أشواغاندا (للتحكم بهرمون التوتر الكورتيزول)", "فيتامين B-Complex (لتعويض التوتر المهني)", "ماغنيسيوم بيسجلايسينات (للنوم العميق ليلاً)", "فيتامين D3 + K2 (حيوي لمن يعمل بمكاتب مغلقة)"] : ["Ashwagandha (Cortisol control)", "B-Complex", "Magnesium Bisglycinate (Sleep)", "Vitamin D3+K2 (Indoor workers)"]
        };
      } else if (age === '40-50') {
         rec = {
           ...rec,
           title: isAr ? "دعم النشاط الأيضي والطاقة العصبية" : "Metabolic & Nervous Energy Support",
           items: isAr ? ["ماكا رووت (Maca Root) للتوازن الهرموني والطاقة", "إل-ثيانين (L-Theanine) لتركيز ثابت وطويل بدون توتر", "مولتي-فيتامين يحتوي على مضادات الأكسدة"] : ["Maca Root for hormone balance & energy", "L-Theanine for steady, calm focus", "Antioxidant-rich Multivitamin"]
        };
      } else {
         rec = {
           ...rec,
           title: isAr ? "طاقة مستدامة وصحة خلوية عامة" : "Sustained Energy & Cellular Health",
           items: isAr ? ["مرافق الإنزيم CoQ10 (أساسي لإنتاج طاقة الخلايا وتناقصه)", "مولتي-فيتامين متكامل بمكونات سهلة الامتصاص", "فيتامين B12 سائل لضمان الامتصاص السريع للحيوية"] : ["CoQ10 Engine (Critical cellular energy)", "Highly bioavailable Multivitamin", "Liquid B12 drop for rapid absorption"]
        };
      }
    } else if (goal === 'fitness') {
       if (age === 'under25' || age === '25-40') {
         rec = {
           ...rec,
           title: isAr ? "أساسيات اللياقة والبناء العضلي السليم" : "Fitness & Muscle Building Basics",
           desc: isAr ? "الأساس هو النوم الجيد، ثم التغذية، ثم المكملات إذا احتجت." : "Basics are Sleep, Nutrition, then Supplements.",
           items: isAr ? [
             "واي بروتين (Whey Protein Isolate) لمساعدة التقفيلات اليومية 1.8-2g/kg", 
             "كرياتين مونوهيدرات 5 جرام يومياً (الأفضل علمياً والأكثر آماناً)", 
             "مشروبات طاقة قبل التمرين (Pre-workout) في أيام التعب الشديد فقط"
           ] : [
             "Whey Protein Isolate (Achieve 1.8-2g/kg daily)", 
             "5g Creatine Monohydrate (Safest & most studied)", 
             "Pre-workout (Only on very low energy days)"
           ]
         };
       } else {
         rec = {
           ...rec,
           title: isAr ? "الحفاظ على الكتلة العضلية وصحة المفاصل" : "Muscle Preservation & Joint Health",
           desc: isAr ? "الهدف هنا هو الحفاظ على الكتلة العضلية التي تقل مع تقدم العمر وتقوية المفاصل." : "The goal here is preserving muscle mass and ensuring joint longevity.",
           items: isAr ? [
             "بروتين كازين (Casein) قبل النوم لتقليل الهدم العضلي", 
             "كولاجين ببتيد (Type 2) أو جلوكوزامين لدعم صحة المفاصل والغضاريف", 
             "أوميغا 3 عالي التركيز (EPA/DHA) لتقليل التهابات المفاصل"
           ] : [
             "Casein Protein before bed to prevent muscle breakdown", 
             "Type 2 Collagen Peptides or Glucosamine for joints", 
             "High-concentration Omega-3 for joint inflammation"
           ]
         };
       }
    } else if (goal === 'immunity') {
       if (age === 'over65' || age === '50-65') {
         rec = {
           ...rec,
           title: isAr ? "دعم المناعة المكثف للكبار" : "Intensive Immune Support",
           items: isAr ? ["فيتامين C بمصادر طبيعية مع الزنك للوقاية الشاملة", "البروبيوتيك المعوي المعزز للمناعة", "خلاصة البلسان (Elderberry) في الشتاء", "الحرص على تطعيمات الإنفلونزا الموسمية"] : ["Natural source Vitamin C & Zinc", "Probiotics for gut-based immunity", "Elderberry Extract in Winter", "Consider seasonal flu vaccines"]
        };
       } else {
         rec = {
           ...rec,
           title: isAr ? "تقوية المناعة الوقائية" : "Preventative Immunity",
           items: isAr ? ["تناول الفيتامين D3 بانتظام للحفاظ على المستويات", "عسل المانوكا (حسب الرغبة كبديل مضاد للأكسدة قوي)", "الزنك بيكولينات عند الشعور ببداية الزكام"] : ["Regular Vitamin D3 to maintain optimal levels", "Manuka Honey for intense antioxidant support", "Zinc Picolinate at the onset of a cold"]
        };
       }
    } else if (goal === 'digestion') {
       rec = {
         ...rec,
         title: isAr ? "صحة الهضم المتقدمة" : "Advanced Digestive Health",
         items: isAr ? ["إنزيمات هاضمة طبيعية (مع الوجبات الثقيلة)", "البروبيوتيك والبكتيريا النافعة 50 مليار خلية لتحسين بيئة الأمعاء", "مغلي البابونج والنعناع المستمر، وشرب ألياف السيليوم (Psyllium Husks)", "التقليل المفرط من الأغذية المصنعة والسكريات المضافة"] : ["Digestive Enzymes (with heavy meals)", "50 Billion+ Probiotics for microbiome", "Chamomile/Peppermint tea & Psyllium Husks", "Severely limit ultra-processed food and added sugar"]
       };
    }
    setResult(rec);
  }

  return (
     <div className="space-y-4 text-start">
       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "الهدف الصحي:" : "Health Goal:"}</label>
           <select value={goal} onChange={e=>setGoal(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
             <option value="skin">{isAr ? "البشرة ومكافحة التجاعيد" : "Skin & Anti-Aging"}</option>
             <option value="energy">{isAr ? "الطاقة، التركيز والنوم" : "Energy, Focus & Sleep"}</option>
             <option value="fitness">{isAr ? "الرياضة وبناء العضلات" : "Fitness & Muscles"}</option>
             <option value="immunity">{isAr ? "دعم المناعة" : "Immunity Support"}</option>
             <option value="digestion">{isAr ? "صحة الجهاز الهضمي" : "Digestive Health"}</option>
           </select>
         </div>
         <div>
           <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "الفئة العمرية" : "Age Bracket"}</label>
           <select value={age} onChange={e=>setAge(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
             <option value="under25">{isAr ? "أقل من 25 (الشباب)" : "Under 25"}</option>
             <option value="25-40">{isAr ? "25 - 40" : "25 - 40"}</option>
             <option value="40-50">{isAr ? "40 - 50" : "40 - 50"}</option>
             <option value="50-65">{isAr ? "50 - 65" : "50 - 65"}</option>
             <option value="over65">{isAr ? "أكثر من 65" : "Over 65"}</option>
           </select>
         </div>
       </div>
       <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
         <Sparkles className="w-4 h-4" /> {isAr ? "توليد الخطة المخصصة علمياً" : "Generate Custom Plan"}
       </button>
       
       {result && (
         <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl shadow-sm mt-4">
            <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-2"><Check className="w-5 h-5 text-emerald-600" /> {result.title}</h4>
            {result.desc && <p className="text-xs text-emerald-700 mb-4 pb-3 border-b border-emerald-200">{result.desc}</p>}
            <ul className="list-disc list-inside space-y-3 text-sm text-emerald-800 font-medium">
               {result.items?.map((item: string, idx: number) => (
                 <li key={idx} className="leading-relaxed">{item}</li>
               ))}
            </ul>
         </motion.div>
       )}
     </div>
  );
};

const TravelPlanner = ({ isAr }: { isAr: boolean }) => {
  const [people, setPeople] = useState('1');
  const [duration, setDuration] = useState('5');
  const [budgetTotal, setBudgetTotal] = useState('1000');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseInt(people) || 1;
    const d = parseInt(duration) || 1;
    const b = parseInt(budgetTotal) || 0;
    
    if (p <= 0 || d <= 0 || b <= 0) return;

    let dests: string[] = [];
    let ins = "";
    
    // Calculate Budget Per Person Per Day
    // Exclude ~30% for flights out of total
    const dailyPerPerson = ((b * 0.70) / p) / d;

    // Logic based on strictly calculative daily value remaining
    if (dailyPerPerson < 25) {
      setResult({
        error: isAr 
         ? `بناءً على المعطيات، الميزانية الفعلية للفرد في اليوم بعد خصم تذاكر الطيران التقريبية هي ($${Math.floor(dailyPerPerson)}). هذا المبلغ غير كافٍ للسفر الدولي بأمان. نوصي بتقليل الأيام، أو زيادة الميزانية، أو اختيار سياحة داخلية.`
         : `Based on inputs, your daily budget per person is around $${Math.floor(dailyPerPerson)}. This is severely insufficient for international travel. Reduce days or increase budget.`
      });
      return;
    }

    if (dailyPerPerson >= 25 && dailyPerPerson < 60) {
      dests = isAr ? ["مصر (دهب / شرم الشيخ)", "المغرب (اكتشاف اقتصادي)", "جورجيا وأرمينيا (طبيعة جبلية رخيصة)", "سريلانكا (مناسبة جداً للسفر الاقتصادي)"] : ["Egypt (Dahab/Sharm)", "Morocco (Budget exploring)", "Georgia/Armenia (Cheap nature)", "Sri Lanka (Super budget friendly)"];
      ins = isAr ? "تأمين السفر الاقتصادي (يغطي الحوادث الكبرى والطوارئ فقط)" : "Basic Medical (Major emergencies only)";
    } else if (dailyPerPerson >= 60 && dailyPerPerson < 150) {
      if (d <= 6) {
         dests = isAr ? ["تركيا (إسطنبول/أنطاليا)", "الإمارات (دبي/أبوظبي بشكل متوسط)", "اليونان (أثينا)"] : ["Turkey (Istanbul)", "UAE (Dubai/Abu Dhabi mid-range)", "Greece (Athens)"];
      } else {
         dests = isAr ? ["تايلاند (رحلة متكاملة رائعة)", "ماليزيا واندونيسيا (طبيعة خلابة)", "البوسنة والهرسك"] : ["Thailand (Amazing value)", "Malaysia/Indonesia (Nature gems)", "Bosnia & Herzegovina"];
      }
      ins = isAr ? "باقة التأمين الشاملة (تغطي التأخير وإلغاء الرحلات والمستشفيات)" : "Standard Comprehensive (Medical, Delay, Cancel)";
    } else if (dailyPerPerson >= 150 && dailyPerPerson < 350) {
       dests = isAr ? ["أوروبا الغربية (لندن، باريس، روما)", "اليابان وكوريا الجنوبية", "جزر المالديف (فئة 4 نجوم)"] : ["Western Europe (London, Paris, Rome)", "Japan & South Korea", "Maldives (4-Star resorts)"];
       ins = isAr ? "تأمين سفر ممتاز (تغطية أمريكية وأوروبية بالكامل بمبالغ عالية)" : "Premium Insurance (High limits globally)";
    } else {
       dests = isAr ? ["سويسرا الفاخرة", "منتجعات 5 نجوم مالديف فوق الماء", "رحلات سفاري فخمة في كينيا/تنزانيا"] : ["Luxury Switzerland", "5-Star Overwater Maldives", "Luxury African Safari"];
       ins = isAr ? "تأمين السفر الذهبي VIP (طيران طبي وإخلاء سريع وأجنحة خاصة)" : "Gold VIP Insurance (MedEvac, Private Suites)";
    }

    setResult({ 
       dests, 
       ins, 
       daily: dailyPerPerson.toFixed(0),
       flightEstimate: (b * 0.30).toFixed(0),
       flightLink: "https://skyscanner.com" 
    });
  }

  return (
    <div className="space-y-4 text-start">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "عدد المسافرين" : "Travelers"}</label>
          <input type="number" min="1" max="25" value={people} onChange={e=>setPeople(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "الأيام" : "Days"}</label>
          <input type="number" min="1" max="90" value={duration} onChange={e=>setDuration(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
        </div>
        <div>
           <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? "ميزانيتك ($)" : "Total Budget ($)"}</label>
           <input type="number" min="100" value={budgetTotal} onChange={e=>setBudgetTotal(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none font-bold text-sky-700" />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
        <Calculator className="w-4 h-4" /> {isAr ? "تحليل الميزانية والوجهة" : "Analyze Budget & Destination"}
      </button>

      {result && (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="bg-sky-50 border border-sky-100 p-5 rounded-2xl shadow-sm mt-4">
          
          {result.error ? (
             <div className="text-sm font-medium text-red-700 bg-red-50 p-4 rounded-xl border border-red-200 leading-relaxed">
               {result.error}
             </div>
          ) : (
            <ul className="space-y-4 text-sm text-sky-900">
               <li className="flex justify-between items-center bg-white p-3 rounded-xl border border-sky-100 shadow-sm">
                 <span className="font-bold text-slate-600 text-xs uppercase">{isAr ? "ميزانية اليوم للفرد:" : "Daily Budget per Person:"}</span>
                 <span className="font-black text-xl text-sky-600">~${result.daily}</span>
               </li>
               <li>
                 <strong className="block mb-2 text-slate-600 font-bold uppercase text-[10px] tracking-wider">{isAr ? "الوجهات الأكثر واقعية لمعطياتك:" : "Most Realistic Destinations:"}</strong>
                 <div className="flex gap-2 flex-wrap">
                   {result.dests?.map((d:string, i:number) => <span key={i} className="bg-white border border-sky-200 px-3 py-2 rounded-lg text-sm font-bold shadow-sm">{d}</span>)}
                 </div>
               </li>
               <li className="pt-3 border-t border-sky-200 text-xs space-y-2 text-slate-600">
                 <p><strong>{isAr ? "تأمين السفر المقترح:" : "Suggested Insurance:"}</strong> {result.ins}</p>
                 <p className="opacity-80 mt-1">*{isAr ? `تم خصم تكلفة الطيران بنسبة 30% من ميزانيتك (~$${result.flightEstimate})` : `Flight costs account for roughly 30% deducted (~$${result.flightEstimate})`}</p>
               </li>
               
            </ul>
          )}
        </motion.div>
      )}
    </div>
  )
};

export default function SmartTools({ lang, t }: { lang: 'en'|'ar', t: any }) {
  const isAr = lang === 'ar';
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { id: 'pc', icon: Monitor, color: 'text-indigo-600 bg-indigo-50', bgFrom: 'from-indigo-50', title: t[lang].pcBuilder, desc: isAr ? 'اختبر متطلبات التجميعة الحقيقية والميزانية المنطقية قبل الشراء' : 'Test realistic budget parts before buying', Content: PcBuilder },
    { id: 'subs', icon: CreditCard, color: 'text-rose-600 bg-rose-50', bgFrom: 'from-rose-50', title: t[lang].subsCompare, desc: isAr ? 'قارن منصات الترفيه وما يناسب الشاشات لديك بدقة' : 'Accurate platform comparisons', Content: SubsComparator },
    { id: 'health', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50', bgFrom: 'from-emerald-50', title: t[lang].healthAdvisor, desc: isAr ? 'روتينات مثبتة علمياً مخصصة للعمر (بشرة/طاقة/لياقة)' : 'Science-based health routines by age', Content: HealthAdvisor },
    { id: 'travel', icon: Plane, color: 'text-sky-600 bg-sky-50', bgFrom: 'from-sky-50', title: t[lang].travelPlanner, desc: isAr ? 'تحليل ذكي وحقيقي لتكلفة الرحلة وواقعية الوجهات' : 'Smart flight and cost realistic analysis', Content: TravelPlanner },
  ];

  return (
    <div className="w-full" id="smart-tools">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3 w-full sm:w-auto">
           <Activity className="w-8 h-8 text-violet-500" />
           {t[lang].smartToolsTitle}
        </h2>
        {activeTool && (
           <button 
             onClick={() => setActiveTool(null)}
             className={`px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full text-sm transition-colors flex items-center gap-2 self-start sm:self-auto`}
           >
              {isAr ? 'العودة للأدوات' : 'Back to Tools'} <ArrowRight className={`w-4 h-4 ${isAr ? '' : 'rotate-180'}`} />
           </button>
        )}
      </div>
      
      <AnimatePresence mode='wait'>
        {!activeTool ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {tools.map(tool => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className="bg-white p-6 sm:p-7 rounded-[2rem] border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:border-violet-200 transition-all text-start flex flex-col group relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-violet-100"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${tool.bgFrom} to-transparent opacity-50 rounded-bl-full group-hover:from-violet-50 transition-colors duration-500 z-0`} />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${tool.color} relative z-10 transition-transform group-hover:scale-110 duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-black text-slate-900 text-xl mb-2 relative z-10 tracking-tight">{tool.title}</h3>
                  <p className="text-sm text-slate-500 relative z-10 leading-relaxed font-medium">{tool.desc}</p>
                  
                  <div className={`mt-6 flex items-center gap-2 text-violet-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity relative z-10 translate-y-2 group-hover:translate-y-0 duration-300`}>
                     {isAr ? 'بدأ الاستخدام' : 'Start Using'} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  </div>
                </button>
              )
            })}
          </motion.div>
        ) : (
          <motion.div 
            key="tool"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white rounded-[2rem] p-6 sm:p-10 border border-slate-200 shadow-xl relative max-w-3xl mx-auto"
          >
             <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                   {(() => {
                      const ActiveToolObj = tools.find(t => t.id === activeTool);
                      if (!ActiveToolObj) return null;
                      const Icon = ActiveToolObj.icon;
                      return <Icon className="w-8 h-8 text-violet-600" />;
                   })()}
                   {tools.find(t => t.id === activeTool)?.title}
                </h3>
             </div>
             
             {(() => {
                const ActiveToolObj = tools.find(t => t.id === activeTool);
                if (!ActiveToolObj) return null;
                const Content = ActiveToolObj.Content;
                return <Content isAr={isAr} />;
             })()}

             {/* IN-TOOL SPONSOR BANNER */}
             <div className="mt-8 pt-6 border-t border-slate-100">
               <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">{isAr ? 'رعاية مميزة' : 'Premium Sponsor'}</span>
                   <p className="text-sm font-bold text-amber-900">
                     {isAr ? 'أداة الأداء المتقدمة — حسّن جهازك بخصم حصري' : 'Advanced Performance Tool — Boost your device with exclusive discount'}
                   </p>
                 </div>
                 <a
                   href="https://bony-teaching.com/bh3NVS0.P/3MpWvubJm/VXJ-ZSDv0s3mMaDCMvxmN/T-QE1OL/TDcDwbMEzvEi1/N/D-kN"
                   target="_blank"
                   rel="noopener noreferrer"
                   referrerPolicy="no-referrer-when-downgrade"
                   className="shrink-0 bg-orange-600 hover:bg-orange-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm whitespace-nowrap"
                 >
                   {isAr ? 'اكتشف الآن' : 'Explore Now'}
                 </a>
               </div>
             </div>
             
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
