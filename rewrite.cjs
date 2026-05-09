const fs = require('fs');

const pcBuilderReplace = `const PcBuilder = ({ isAr }: { isAr: boolean }) => {
  const [budget, setBudget] = useState('1000');
  const [usage, setUsage] = useState('gaming');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const b = parseInt(budget);
    let rec: any = {};
    if (b < 400) {
      rec = {
        title: isAr ? 'تجميعة اقتصادية جداً (APU)' : 'Ultra Budget APU Build',
        cpu: isAr ? 'Ryzen 5 5600G (يحتوي على كرت شاشة مدمج)' : 'Ryzen 5 5600G (Integrated Graphics)',
        gpu: isAr ? 'لا يوجد (كرت مدمج)' : 'None (Integrated)',
        ram: '16GB (2x8GB) DDR4 3200MHz',
        perf: isAr ? 'ألعاب خفيفة (Valorant, CS:GO) على إعدادات منخفضة وتصفح ممتاز' : 'Light gaming (Valorant, CS:GO) on low, excellent browsing',
        link: 'https://amzn.to/3OaT7yD'
      }
    } else if (b >= 400 && b < 800) {
       rec = {
        title: isAr ? 'تجميعة الدخول الاقتصادية' : 'Entry Level Build',
        cpu: 'Intel Core i3-12100F / Ryzen 5 5600',
        gpu: 'AMD Radeon RX 6600 8GB / RTX 3050',
        ram: '16GB (2x8GB) DDR4 3200MHz',
        perf: isAr ? 'أداء ممتاز على دقة 1080p بمعظم الألعاب' : 'Great 1080p performance on most games',
        link: 'https://amzn.to/3K3qgVj'
      }
    } else if (b >= 800 && b < 1300) {
      if (usage === 'gaming') {
        rec = {
          title: isAr ? 'تجميعة الألعاب المتوسطة-العليا' : 'Mid-High Gaming Build',
          cpu: 'AMD Ryzen 5 7600',
          gpu: 'NVIDIA RTX 4060 Ti 8GB / RX 7700 XT',
          ram: '32GB (2x16GB) DDR5 6000MHz',
          perf: isAr ? 'ألعاب 2K (1440p) بسلاسة عالية' : 'Smooth 1440p gaming',
          link: 'https://amzn.to/42H7tY4'
        }
      } else {
        rec = {
          title: isAr ? 'تجميعة صناعة المحتوى المتوسطة' : 'Mid Creator Build',
          cpu: 'Intel Core i5-13500 (تعدد أنوية ممتاز)',
          gpu: 'NVIDIA RTX 4060 8GB',
          ram: '32GB (2x16GB) DDR5 6000MHz',
          perf: isAr ? 'ممتازة للمونتاج وتصيير الفيديو (Rendering)' : 'Great for video editing and rendering',
          link: 'https://amzn.to/3Sl1A1d'
        }
      }
    } else if (b >= 1300 && b < 2000) {
       rec = {
          title: isAr ? 'تجميعة الأحلام' : 'High-End Build',
          cpu: 'AMD Ryzen 7 7800X3D / Intel i7-13700K',
          gpu: 'NVIDIA RTX 4070 SUPER 12GB',
          ram: '32GB DDR5 6000MHz CL30',
          perf: isAr ? 'أقصى أداء على دقة 2K ودخول قوي لدقة 4K' : 'Max 1440p perf & strong 4K entry',
          link: 'https://amzn.to/3Sl1B2e'
        }
    } else {
       rec = {
          title: isAr ? 'التجميعة الخارقة (الفئة العليا)' : 'Ultra Enthusiast Build',
          cpu: usage === 'work' ? 'Intel Core i9-14900K' : 'AMD Ryzen 9 7950X3D',
          gpu: 'NVIDIA RTX 4080 SUPER / RTX 4090',
          ram: '64GB (2x32GB) DDR5 6400MHz',
          perf: isAr ? 'كل ما تريده وبأعلى دقة 4K وفرام ريت غير محدود' : 'Everything at 4K, unlimited framerates',
          link: 'https://amzn.to/4bcF9u'
        }
    }
    setResult(rec);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'الميزانية ($)' : 'Budget ($)'}</label>
          <input type="number" min="0" value={budget} onChange={e=>setBudget(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'الاستخدام' : 'Usage'}</label>
          <select value={usage} onChange={e=>setUsage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900">
            <option value="gaming">{isAr ? 'ألعاب (Gaming)' : 'Gaming'}</option>
            <option value="work">{isAr ? 'مونتاج وبرمجة' : 'Work & Editing'}</option>
          </select>
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
        <Zap className="w-4 h-4" /> {isAr ? 'حلّل الأداء' : 'Analyze Performance'}
      </button>

      {result && (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-200">{result.title}</h4>
          <ul className="space-y-3 text-sm text-indigo-900">
            <li><span className="font-bold">CPU:</span> {result.cpu}</li>
            <li><span className="font-bold">GPU:</span> {result.gpu}</li>
            <li><span className="font-bold">RAM:</span> {result.ram}</li>
            <li className="mt-4 pt-3 border-t border-indigo-200 flex items-center gap-2 font-bold text-indigo-700"><Activity className="w-4 h-4 shrink-0"/> {result.perf}</li>
          </ul>
          
          <a href={result.link} target="_blank" rel="noopener noreferrer" className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 text-sm transition-colors cursor-pointer relative z-10">
            {isAr ? 'تصفح القطع (أمازون)' : 'Browse Parts (Amazon)'} <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </div>
  )
};`;

const SubsComparatorReplace = `const SubsComparator = ({ isAr }: { isAr: boolean }) => {
  const [type, setType] = useState('movies');
  const [screens, setScreens] = useState('1');
  
  const subs = [
    { type: 'movies', name: 'Netflix', screens: [1,2,4], price: screens === '4' ? '$23' : screens === '2' ? '$15' : '$7', cons: isAr ? 'لا يوجد خصم سنوي' : 'No yearly discount', link:'https://netflix.com' },
    { type: 'movies', name: 'Amazon Prime', screens: [3], price: '$9', cons: isAr ? 'يشتمل على مزايا شحن وألعاب' : 'Includes shipping & games', link:'https://primevideo.com' },
    { type: 'anime', name: 'Crunchyroll', screens: [1,4], price: screens === '4' ? '$10' : '$8', cons: isAr ? 'مكتبة أنمي ضخمة خصم سنوي متوفر' : 'Huge anime library, annual discount', link:'https://crunchyroll.com' },
    { type: 'sports', name: 'TOD (beIN)', screens: [1,2], price: '$18', cons: isAr ? 'ممتاز للبطولات الكبرى والمباريات الحية' : 'Great for major tournaments & live matches', link:'https://tod.tv' },
    { type: 'gaming', name: 'Xbox Game Pass Ultimate', screens: [1], price: '$17', cons: isAr ? 'مكتبة ألعاب ضخمة + لعب سحابي' : 'Huge PC/Console library + Cloud Gaming', link:'https://xbox.com' },
  ];

  const filtered = subs.filter(s => s.type === type && (s.screens.includes(parseInt(screens)) || s.screens.some(val => val > parseInt(screens))));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
         <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'الاهتمام الأساسي' : 'Main Interest'}</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 pointer-events-auto relative z-10">
            <option value="movies">{isAr ? 'أفلام ومسلسلات' : 'Movies & Series'}</option>
            <option value="anime">{isAr ? 'الأنمي' : 'Anime'}</option>
            <option value="sports">{isAr ? 'الرياضة المباشرة' : 'Live Sports'}</option>
            <option value="gaming">{isAr ? 'الألعاب (بدون شراء)' : 'Gaming (No buying)'}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'شاشات متزامنة' : 'Simultaneous Screens'}</label>
          <select value={screens} onChange={e=>setScreens(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 pointer-events-auto relative z-10">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3 relative z-10">
         {filtered.length > 0 ? filtered.map((sub, i) => (
           <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-rose-200 transition-colors">
              <div>
                <span className="font-bold text-slate-900 text-lg">{sub.name}</span><br/>
                <span className="text-xs text-slate-500 font-medium">{sub.cons}</span>
              </div>
              <div className="text-end">
                <span className="font-black text-rose-600 text-xl">{sub.price}</span><span className="text-xs text-rose-400">/mo</span><br/>
                <a href={sub.link} target="_blank" rel="noopener noreferrer" className="text-[11px] bg-slate-900 hover:bg-violet-600 text-white px-3 py-1.5 rounded-lg inline-block mt-2 font-bold cursor-pointer transition-colors">{isAr ? 'اشترك الآن' : 'Subscribe'}</a>
              </div>
           </div>
         )) : (
           <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-xl">{isAr ? 'لا توجد نتائج مطابقة تماماً للمواصفات، جرب خيارات أخرى' : 'No exact match found, try different options'}</p>
         )}
      </div>
    </div>
  )
};`;

const HealthAdvisorReplace = `const HealthAdvisor = ({ isAr }: { isAr: boolean }) => {
  const [goal, setGoal] = useState('skin');
  const [age, setAge] = useState('25-40');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let rec: any = {};
    if(goal === 'skin') {
      if(age === 'under25') {
         rec = {
            title: isAr ? 'روتين العناية بالبشرة الشابة والوقاية' : 'Young Skin & Prevention Routine',
            items: isAr ? ['منظف لطيف (خالي من العطور)', 'مرطب خفيف (يحتوي على حمض الهيالورونيك)', 'واقي شمس SPF 50+ (خطوة أساسية يومية)'] : ['Gentle Cleanser (Fragrance-Free)', 'Light Moisturizer (with Hyaluronic Acid)', 'SPF 50+ Sunscreen (Crucial daily step)'],
            link: 'https://iherb.co/example1'
         }
      } else {
         rec = {
            title: isAr ? 'روتين النضارة ومحاربة التجاعيد' : 'Anti-Aging & Glow Routine',
            items: isAr ? ['سيروم فيتامين C بتركيز 10-15% (صباحاً للتحفيز)', 'واقي شمس للوقاية من التصبغات وتلف الكولاجين', 'ريتينول 0.2% - 0.5% (مساءً لتجديد الخلايا)', 'مرطب غني بالسيراميد لتقوية حاجز البشرة'] : ['Vitamin C 10-15% Serum (AM)', 'Sunscreen (Pigmentation Defense)', 'Retinol 0.2-0.5% (PM Renewal)', 'Ceramide Rich Moisturizer'],
            link: 'https://iherb.co/example2'
         }
      }
    } else if (goal === 'energy') {
      rec = {
         title: isAr ? 'مكملات دعم الطاقة والنشاط' : 'Energy & Activity Supplements',
         items: isAr ? ['فيتامين B-Complex لدعم الجهاز العصبي وتقليل الإجهاد', 'أنزيم CoQ10 المساعد (لإنتاج الطاقة في الخلايا - خاصة لمن فوق الـ 30)', 'أوميغا 3 عالي الجودة للتركيز ونشاط الدماغ', 'ماغنيسيوم جلايسينات قبل النوم لتحسين جودة الراحة وتقليل الشد العضلي'] : ['B-Complex for nervous system', 'CoQ10 Engine (30+ usually)', 'High Quality Omega 3', 'Magnesium Glycinate for restful sleep'],
         link: 'https://iherb.co/example3'
      }
    } else if (goal === 'fitness') {
       rec = {
         title: isAr ? 'أساسيات اللياقة والبناء العضلي' : 'Fitness & Muscle Building Basics',
         items: isAr ? ['واي بروتين (Whey Protein Isolate) لتغطية الاحتياج اليومي من البروتين لتعافي أسرع', 'كرياتين مونوهيدرات 5 جرام يومياً (الأفضل علمياً للأداء والطاقة والقوة العضلية)', 'فيتامين D3 + K2 (أساسي لكثافة العظام وقوة المفاصل)'] : ['Whey Protein Isolate (Daily macro)', '5g Creatine Monohydrate (Performance)', 'Vitamin D3 + K2 (Bone health)'],
         link: 'https://iherb.co/example4'
      }
    }
    setResult(rec);
  }

  return (
     <div className="space-y-4">
       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'الهدف الصحي الأساسي:' : 'Main Health Goal:'}</label>
           <select value={goal} onChange={e=>setGoal(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 pointer-events-auto relative z-10">
             <option value="skin">{isAr ? 'البشرة والتجميل' : 'Skin & Beauty'}</option>
             <option value="energy">{isAr ? 'الطاقة والتركيز' : 'Energy & Focus'}</option>
             <option value="fitness">{isAr ? 'اللياقة والبناء العضلي' : 'Fitness & Muscle'}</option>
           </select>
         </div>
         <div>
           <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'الفئة العمرية' : 'Age Bracket'}</label>
           <select value={age} onChange={e=>setAge(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 pointer-events-auto relative z-10">
             <option value="under25">{isAr ? 'أقل من 25' : 'Under 25'}</option>
             <option value="25-40">25 - 40</option>
             <option value="over40">{isAr ? 'أكثر من 40' : 'Over 40'}</option>
           </select>
         </div>
       </div>
       <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer relative z-10">
         {isAr ? 'اعرض التوصيات الصحية' : 'Show Health Recommendations'}
       </button>
       
       {result && (
         <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1,scale:1}} className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl shadow-sm mt-4">
            <h4 className="font-bold text-emerald-900 mb-3 border-b border-emerald-200 pb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" /> {result.title}</h4>
            <ul className="list-disc list-inside space-y-3 text-sm text-emerald-800 font-medium">
               {result.items.map((item: string, idx: number) => (
                 <li key={idx} className="leading-relaxed">{item}</li>
               ))}
            </ul>
            <a href={result.link} target="_blank" rel="noopener noreferrer" className="mt-5 w-full bg-slate-900 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 text-sm transition-colors cursor-pointer relative z-10">
              {isAr ? 'تصفح المجموعة (iHerb)' : 'Browse Bundle (iHerb)'} <ChevronRight className="w-4 h-4" />
           </a>
         </motion.div>
       )}
     </div>
  );
};`;

const TravelPlannerReplace = `const TravelPlanner = ({ isAr }: { isAr: boolean }) => {
  const [people, setPeople] = useState('1');
  const [duration, setDuration] = useState('5');
  const [budgetLevel, setBudgetLevel] = useState('mid');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseInt(people) || 1;
    const d = parseInt(duration) || 1;
    
    let dests: string[] = [];
    let ins = "";
    
    if (budgetLevel === 'low') {
      dests = isAr ? ['جورجيا (طبيعة ورخص)', 'مصر (تاريخ وأسعار ممتازة)', 'سريلانكا (شواطئ وجبال)'] : ['Georgia (Nature & Budget)', 'Egypt (History & Value)', 'Sri Lanka (Tropical)'];
      ins = isAr ? 'تأمين السفر الاقتصادي الأساسي (يغطي الحالات الطارئة فقط)' : 'Basic Travel Medical Insurance (Emergencies only)';
    } else if (budgetLevel === 'mid') {
      if (d <= 5) {
         dests = isAr ? ['دبي (ترفيه وتسوّق حديث)', 'إسطنبول (مزيج آسيوي أوروبي)', 'أثينا (حضارة وبحر)'] : ['Dubai (Modern Entertainment)', 'Istanbul (Rich Culture)', 'Athens (History)'];
      } else {
         dests = isAr ? ['تايلاند (بوكيت/بانكوك)', 'ماليزيا (طبيعة استوائية وتسوّق)', 'بالي، إندونيسيا'] : ['Thailand (Phuket/Bkk)', 'Malaysia (Tropical & Deals)', 'Bali, Indonesia'];
      }
      ins = isAr ? 'باقة التأمين الشامل المتوسطة (تغطية أمراض وإلغاء رحلات وتأخير أمتعة)' : 'Standard Comprehensive (Medical, Cancellation, Delay covered)';
    } else {
       dests = isAr ? ['النمسا وسويسرا (جبال الألب الرائعة)', 'المالديف (منتجعات 5 نجوم وبرايفت بول)', 'لندن وباريس'] : ['Austria/Switzerland (Alps)', 'Maldives (5-Star Resorts)', 'London & Paris'];
       ins = isAr ? 'تأمين السفر الذهبي (تغطية مفتوحة + إخلاء طبي + رعاية VIP)' : 'Gold VIP Insurance (High limit + Medical Evac + VIP Care)';
    }

    if (p >= 3) {
       ins += isAr ? ' - (تم تطبيق خصم الباقة العائلية)' : ' - (Family Bundle Rate Applied)';
    }

    // Cost logic
    let perDayPerPerson = budgetLevel === 'low' ? 60 : budgetLevel === 'mid' ? 150 : 450;
    let total = p * d * perDayPerPerson;

    setResult({ dests, ins, estCost: total, flightLink: 'https://skyscanner.com', insLink: 'https://safetywing.com' });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'عدد الأشخاص' : 'Travelers (People)'}</label>
          <input type="number" min="1" max="20" value={people} onChange={e=>setPeople(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 pointer-events-auto relative z-10" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'المدة المقدرة (أيام)' : 'Duration (Days)'}</label>
          <input type="number" min="1" max="90" value={duration} onChange={e=>setDuration(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 pointer-events-auto relative z-10" />
        </div>
        <div className="col-span-2">
           <label className="block text-xs font-semibold text-slate-700 mb-1">{isAr ? 'مستوى الميزانية والتجربة' : 'Budget & Experience Level'}</label>
           <select value={budgetLevel} onChange={e=>setBudgetLevel(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 pointer-events-auto relative z-10">
             <option value="low">{isAr ? 'اقتصادية جداً (توفير أقصى)' : 'Very Budget-Friendly (Max savings)'}</option>
             <option value="mid">{isAr ? 'متوسطة وممتازة القيمة (الأكثر شعبية)' : 'Medium / Great Value (Most Popular)'}</option>
             <option value="high">{isAr ? 'فاخرة / مريحة / رفاهية (5 نجوم)' : 'Luxury / High-End (5 Stars)'}</option>
           </select>
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer relative z-10">
        <Plane className="w-4 h-4" /> {isAr ? 'خطط رحلتي وتوقّع المصاريف' : 'Plan Trip & Estimate Costs'}
      </button>

      {result && (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="bg-sky-50 border border-sky-100 p-5 rounded-2xl shadow-sm mt-4">
          <h4 className="font-bold text-sky-900 mb-4 border-b border-sky-200 pb-3 flex items-center gap-2"><Plane className="w-4 h-4" /> {isAr ? 'الخطة المقترحة لك' : 'Your Recommended Plan'}</h4>
          <ul className="space-y-4 text-sm text-sky-900">
             <li>
               <strong className="block mb-2">🌍 {isAr ? 'الوجهات المرشحة بشدة لمعاييرك:' : 'Highly Matched Destinations:'}</strong>
               <div className="flex gap-2 flex-wrap">
                 {result.dests.map((d:string, i:number) => <span key={i} className="bg-white border border-sky-200 px-3 py-2 rounded-lg text-xs font-bold shadow-sm">{d}</span>)}
               </div>
             </li>
             <li className="bg-white p-3 rounded-xl border border-sky-100">
               <strong className="block mb-1">🛡️ {isAr ? 'نوع التأمين الموصى به لرحلتك:' : 'Recommended Insurance:'}</strong> 
               <span className="font-medium text-slate-700 leading-relaxed block mt-1">{result.ins}</span>
             </li>
             <li className="pt-3 border-t border-sky-200">
               <div className="flex justify-between items-end">
                  <div>
                     <strong className="block text-slate-500 mb-1 text-xs uppercase">{isAr ? 'التكلفة التقريبية بدون طيران:' : 'Est. cost (excl. flights):'} </strong>
                     <span className="font-black text-2xl text-slate-900">~${result.estCost}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                     {people} {isAr ? 'أشخاص' : 'People'} / {duration} {isAr ? 'أيام' : 'Days'}
                  </span>
               </div>
             </li>
          </ul>
          <div className="grid grid-cols-2 gap-3 mt-6">
             <a href={result.flightLink} target="_blank" rel="noopener noreferrer" className="w-full bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 font-bold py-3.5 rounded-xl flex justify-center items-center text-xs transition-colors cursor-pointer relative z-10 shadow-sm">
                {isAr ? 'المقارنة عبر Skyscanner' : 'Compare on Skyscanner'}
             </a>
             <a href={result.insLink} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 hover:bg-sky-700 text-white font-bold py-3.5 rounded-xl flex justify-center items-center text-xs transition-colors cursor-pointer relative z-10 shadow-sm">
                {isAr ? 'تأمين SafetyWing' : 'SafetyWing Medical'}
             </a>
          </div>
        </motion.div>
      )}
    </div>
  )
};`;

const originalCode = fs.readFileSync('src/components/SmartTools.tsx', 'utf8');

const regexPC = /const PcBuilder = [\s\S]*?(?=const SubsComparator = )/m;
const regexSubs = /const SubsComparator = [\s\S]*?(?=const HealthAdvisor = )/m;
const regexHealth = /const HealthAdvisor = [\s\S]*?(?=const TravelPlanner = )/m;
const regexTravel = /const TravelPlanner = [\s\S]*?(?=export default function SmartTools)/m;

let newCode = originalCode.replace(regexPC, pcBuilderReplace + '\n\n');
newCode = newCode.replace(regexSubs, SubsComparatorReplace + '\n\n');
newCode = newCode.replace(regexHealth, HealthAdvisorReplace + '\n\n');
newCode = newCode.replace(regexTravel, TravelPlannerReplace + '\n\n');

fs.writeFileSync('src/components/SmartTools.tsx', newCode);
