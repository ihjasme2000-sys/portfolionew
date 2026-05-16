import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent, useMemo } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/')({
  component: Home,
})

// --- UI Components ---

const Logo = ({ light = false }: { light?: boolean }) => (
  <div className={`flex h-12 w-12 items-center justify-center overflow-hidden ${light ? 'bg-white rounded-lg p-1' : ''}`}>
    <img 
      src="/logo.png" 
      alt="JAAL" 
      className="h-full w-full object-contain" 
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        const parent = e.currentTarget.parentElement!;
        parent.innerHTML = `<div class="flex h-10 w-10 items-center justify-center rounded ${light ? 'bg-[#C5A059] text-slate-900' : 'bg-[#003366] text-white'} font-black text-xl uppercase shadow-sm">J</div>`;
      }}
    />
  </div>
)

const SectionHeader = ({ tag, title, desc, dark = false, isAr = false }: { tag: string, title: string, desc?: string, dark?: boolean, isAr?: boolean }) => (
  <div className={`mb-16 ${isAr ? 'text-right' : ''}`}>
    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059] mb-4">{tag}</h2>
    <p className={`text-4xl font-black tracking-tight sm:text-5xl uppercase leading-none ${dark ? 'text-white' : 'text-[#003366]'}`}>{title}</p>
    {desc && <p className={`mt-6 max-w-md text-slate-600 font-medium leading-relaxed ${isAr ? 'mr-0 ml-auto' : ''}`}>{desc}</p>}
  </div>
)

// --- Main Page ---

function Home() {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN')
  const isAr = lang === 'AR'
  const createInquiry = useMutation(api.inquiries.create)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' })

  const t = useMemo(() => ({
    EN: {
      title: 'JAAL TYPING',
      subtitle: 'TRANSLATION AND DOCUMENT PROCESSING SERVICES',
      heroTitle: 'One Centre for All Your Legal & Business Needs',
      heroDesc: "Al Khor's premier Service Centre. We provide end-to-end solutions for legal translation, corporate setup, and government relations with over 30 years of excellence.",
      services: 'Our Services', about: 'About Us', contact: 'Contact', callNow: 'Call Now',
      history: 'Official Business Support Since 1990',
      ourServices: 'Our Services', spec: 'Our Specialization', compSol: 'Comprehensive Business Solutions',
      specDesc: 'We provide a full suite of professional services for individuals and corporations in Qatar, ensuring compliance and efficiency.',
      visitUs: 'Visit Us', loc: 'Al Khor, Qatar', street: 'Main Commercial Street', directions: 'Get Directions',
      historyTitle: 'Al Khor Service Excellence',
      historyDesc: 'Conveniently located in Al Khor, we are the trusted partner for residents and businesses alike. Our long-standing presence since 1990 is a testament to our commitment to accuracy and customer satisfaction.',
      exp1Title: 'Unmatched Local Expertise', exp1Desc: "Navigating Qatar's government portals and legal requirements since 1990.",
      exp2Title: 'Fast & Accurate Processing', exp2Desc: 'Minimizing delays with precise document preparation and expert follow-up.',
      exp3Title: 'Corporate & Individual Focus', exp3Desc: 'Whether starting a business or renewing a family visa, we provide personalized care.',
      footerDesc: 'Providing professional business support in Al Khor since 1990. Accuracy, efficiency, and reliability in every document.',
      inquiryTitle: 'Service Inquiry', inquiryDesc: 'Need assistance? Send us your requirements and our team will get back to you shortly.',
      formName: 'Full Name', formPhone: 'Phone Number', formEmail: 'Email (Optional)', formService: 'Select Service',
      formMessage: 'How can we help you?', formSubmit: 'Send Inquiry', formSuccess: 'Thank you! We have received your inquiry.',
      formError: 'Something went wrong. Please try again.',
      phName: 'Enter your name', phPhone: 'e.g. 55XX XXXX', phEmail: 'email@example.com', phMsg: 'Tell us about your requirements...',
    },
    AR: {
      title: 'جال للطباعة',
      subtitle: 'لخدمات الترجمة ومعالجة المستندات',
      heroTitle: 'مركز واحد لجميع احتياجاتكم القانونية والتجارية',
      heroDesc: 'مركز الخدمات الرائد في الخور. نوفر حلولاً متكاملة للترجمة القانونية، وتأسيس الشركات، والعلاقات الحكومية مع أكثر من ٣٠ عاماً من التميز.',
      services: 'خدماتنا', about: 'من نحن', contact: 'اتصل بنا', callNow: 'اتصل الآن',
      history: 'دعم رسمي للأعمال منذ عام ١٩٩٠',
      ourServices: 'خدماتنا', spec: 'تخصصنا', compSol: 'حلول أعمال شاملة',
      specDesc: 'نحن نقدم مجموعة كاملة من الخدمات المهنية للأفراد والشركات في قطر، مما يضمن الامتثال والكفاءة.',
      visitUs: 'زرنا في موقعنا', loc: 'الخور، قطر', street: 'الشارع التجاري الرئيسي', directions: 'احصل على الاتجاهات',
      historyTitle: 'تميز الخدمة في الخور',
      historyDesc: 'بموقعنا المتميز في قلب الخور، نحن الشريك الموثوق للسكان والشركات على حد سواء. تواجدنا منذ عام ١٩٩٠ هو دليل على التزامنا بالدقة ورضا العملاء.',
      exp1Title: 'خبرة محلية لا تضاهى', exp1Desc: 'التعامل مع البوابات الحكومية والمتطلبات القانونية القطرية منذ عام ١٩٩٠.',
      exp2Title: 'علاج سريع ودقيق', exp2Desc: 'تقليل التأخير من خلال إعداد المستندات بدقة ومتابعة الخبراء.',
      exp3Title: 'تركيز على الشركات والأفراد', exp3Desc: 'سواء كنت تبدأ عملاً تجارياً أو تجدد تأشيرة عائلية، فنحن نقدم رعاية شخصية.',
      footerDesc: 'تقديم دعم احترافي للأعمال في الخور منذ عام ١٩٩٠. الدقة والكفاءة والموثوقية في كل وثيقة.',
      inquiryTitle: 'طلب خدمة', inquiryDesc: 'هل تحتاج إلى مساعدة؟ أرسل متطلباتك وسيقوم فريقنا بالرد عليك قريباً.',
      formName: 'الاسم الكامل', formPhone: 'رقم الهاتف', formEmail: 'البريد الإلكتروني (اختياري)', formService: 'اختر الخدمة',
      formMessage: 'كيف يمكننا مساعدتك؟', formSubmit: 'إرسال الطلب', formSuccess: 'شكراً لك! لقد تلقينا طلبك.',
      formError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      phName: 'أدخل اسمك', phPhone: 'مثال: ٥٥XX XXXX', phEmail: 'email@example.com', phMsg: 'أخبرنا عن متطلباتك...',
    }
  }[lang]), [lang])

  const services = useMemo(() => [
    { title: isAr ? 'الترجمة القانونية' : 'Legal Translation', desc: isAr ? 'ترجمة رسمية للوزارات والسفارات والمحاكم بجميع اللغات.' : 'Official translations for ministries, embassies, and courts in all languages.', icon: '⚖️' },
    { title: isAr ? 'تأسيس الشركات' : 'Company Formation', desc: isAr ? 'تسجيل الشركات الجديدة (CR)، رخصة البلدية، وخدمات قيد المنشأة.' : 'New business registration (CR), Municipality license, and Computer Card services.', icon: '🏢' },
    { title: isAr ? 'خدمات المندوب (PRO)' : 'PRO Services', desc: isAr ? 'خبير علاقات عامة لمتابعة وزارة العمل والداخلية والجهات الحكومية الأخرى.' : 'Expert liaison for Ministry of Labour, MOI, and other government departments.', icon: '👔' },
    { title: isAr ? 'تصديق الشهادات' : 'Certificate Attestation', desc: isAr ? 'تصديق وزارة الخارجية القطرية وتوثيق السفارات للمستندات المحلية والدولية.' : 'MOFA Qatar attestation and embassy legalization for local and global documents.', icon: '📜' },
    { title: isAr ? 'خدمات التأشيرات' : 'Visa Services', desc: isAr ? 'تأشيرة العائلة، تصريح العمل، نقل الكفالة، وتحديد مواعيد الفحص الطبي.' : 'Family visa, work permit, change of sponsorship, and medical scheduling.', icon: '✈️' },
    { title: isAr ? 'الضرائب ونظام ضريبة' : 'Tax Filing & Dhareeba', desc: isAr ? 'حلول ضريبية متكاملة، مخالصة مالية، وإدارة بوابة ضريبة.' : 'Complete tax solutions, financial clearance, and Dhareeba portal management.', icon: '📊' },
    { title: isAr ? 'صياغة العقود' : 'Contract Drafting', desc: isAr ? 'صياغة احترافية لاتفاقيات الشراكة وعقود الإيجار ومذكرات التفاهم.' : 'Professional drafting of partnership agreements, rental contracts, and MoUs.', icon: '✍️' },
    { title: isAr ? 'خدمات حكومي' : 'Hukoomi Services', desc: isAr ? 'المعالجة الإلكترونية للنماذج الحكومية، مطراش2، وبوابة موارد.' : 'Online processing of government forms, Metrash2, and Mawared portals.', icon: '💻' },
    { title: isAr ? 'الرخص التجارية' : 'Trade License', desc: isAr ? 'إصدار رخص جديدة، تجديد، والامتثال التجاري المهني.' : 'New license issuance, renewals, and professional commercial compliance.', icon: '🛡️' },
  ], [isAr])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      await createInquiry({ ...formData, email: formData.email || undefined })
      setFormStatus('success')
      setFormData({ name: '', phone: '', email: '', service: '', message: '' })
    } catch { setFormStatus('error') }
  }

  return (
    <div className={`min-h-screen bg-white font-sans text-slate-900 ${isAr ? 'rtl font-["Amiri",serif]' : ''}`}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Logo />
            <div className="flex flex-col">
              <span className="text-lg font-black text-[#003366] leading-none uppercase">{t.title}</span>
              <span className="text-[9px] font-bold text-[#C5A059] uppercase leading-tight">{t.subtitle}</span>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-wide">
            {['services', 'about', 'inquiry', 'contact'].map(link => (
              <a key={link} href={`#${link}`} className="text-slate-600 hover:text-[#003366] border-b-2 border-transparent hover:border-[#C5A059] pb-0.5 transition-all">
                {link === 'inquiry' ? t.inquiryTitle : t[link as keyof typeof t]}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
             <button onClick={() => setLang(isAr ? 'EN' : 'AR')} className="text-[10px] font-black text-[#003366] border border-[#003366]/20 px-2 py-1 rounded hover:bg-[#003366] hover:text-white transition-all">
                {isAr ? 'EN' : 'AR / عربي'}
             </button>
             <div className={`hidden md:flex flex-col ${isAr ? 'items-start' : 'items-end'}`}>
                <a href="tel:+97466719241" className="text-[10px] font-black text-[#003366] hover:text-[#C5A059]">6671 9241</a>
                <a href="tel:+97455293553" className="text-[10px] font-black text-[#003366] hover:text-[#C5A059]">5529 3553</a>
             </div>
             <a href="https://wa.me/97455293553" target="_blank" className="rounded bg-[#25D366] px-3 sm:px-4 py-2 text-[10px] font-black text-white hover:bg-[#128C7E] shadow-md uppercase tracking-widest flex items-center gap-2">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {isAr ? 'واتساب' : 'WhatsApp'}
             </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#003366] ring-1 ring-blue-100 mb-8">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                {t.history}
              </div>
              <h1 className="text-4xl font-black text-[#003366] sm:text-6xl uppercase leading-tight">
                {isAr ? t.heroTitle : <>One Centre for <span className="text-[#C5A059]">All Your Legal</span> & Business Needs</>}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 font-medium">{t.heroDesc}</p>
              
              <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 max-w-fit">
                <div>
                  <div className="flex items-center gap-1 text-[#FBBF24]">
                    {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                    <span className="mx-2 text-sm font-bold text-slate-900">4.0</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{isAr ? '٤٦ تقييم جوجل' : '46 Google Reviews'}</div>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="h-6 w-6" />
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="tel:+97466719241" className="rounded bg-[#003366] px-6 py-4 text-[10px] font-black text-white shadow-xl hover:bg-[#002244] tracking-widest">6671 9241</a>
                <a href="tel:+97455293553" className="rounded bg-[#C5A059] px-6 py-4 text-[10px] font-black text-white shadow-xl hover:bg-[#a6864a] tracking-widest">5529 3553</a>
                <a href="#services" className="rounded bg-white px-10 py-4 text-[10px] font-black text-[#003366] shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 tracking-widest whitespace-nowrap">{t.ourServices}</a>
              </div>
            </div>
            
            <div className="mt-16 lg:col-span-5 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#003366] to-[#C5A059] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-700"></div>
              <div className="relative aspect-[3/4] rounded-2xl bg-white overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=1000" alt="Legal" className="h-full w-full object-cover grayscale-[20%] group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-transparent to-transparent"></div>
                <div className={`absolute bottom-0 p-8 text-white ${isAr ? 'right-0 text-right' : 'left-0'}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A059] mb-2">{isAr ? 'كفاءة ودقة' : 'Efficiency & Accuracy'}</p>
                  <h3 className="text-2xl font-black uppercase leading-tight">{isAr ? 'خبراء معالجة المستندات' : 'Document Processing Experts'}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tag={t.spec} title={t.compSol} desc={t.specDesc} isAr={isAr} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={i} className="group relative overflow-hidden rounded bg-white p-10 shadow-sm border border-slate-100 hover:border-[#C5A059]/30 transition-all duration-300">
                <div className={`absolute top-0 h-24 w-24 translate-x-12 -translate-y-12 bg-slate-50 rounded-full group-hover:bg-[#C5A059]/10 transition-all duration-300 ${isAr ? 'left-0' : 'right-0'}`}></div>
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded bg-slate-50 text-2xl group-hover:scale-110 transition-all">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#003366] uppercase">{s.title}</h3>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed font-medium">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 -mb-20 -mr-20 h-96 w-96 rounded-full bg-slate-50 blur-3xl -z-10"></div>
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <SectionHeader tag={t.inquiryTitle} title={t.inquiryTitle} desc={t.inquiryDesc} isAr={isAr} />
            </div>
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 sm:p-12">
              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="h-20 w-20 inline-flex items-center justify-center rounded-full bg-green-50 text-green-500 mb-6">
                    <svg className="w-10 h-10 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#003366] uppercase mb-4">{t.formSuccess}</h3>
                  <button onClick={() => setFormStatus('idle')} className="text-sm font-bold text-[#C5A059] uppercase tracking-widest border-b-2 border-[#C5A059]">Send another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {['name', 'phone'].map(key => (
                      <div key={key} className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">{t[key === 'name' ? 'formName' : 'formPhone']}</label>
                        <input required value={formData[key as keyof typeof formData]} onChange={e => setFormData({...formData, [key]: e.target.value})} type={key === 'phone' ? 'tel' : 'text'} placeholder={t[key === 'name' ? 'phName' : 'phPhone']} className="w-full rounded-lg border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#003366] focus:ring-[#003366]" />
                      </div>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">{t.formEmail}</label>
                      <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder={t.phEmail} className="w-full rounded-lg border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#003366] focus:ring-[#003366]" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">{t.formService}</label>
                      <select required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full rounded-lg border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#003366] focus:ring-[#003366]">
                        <option value="">{t.formService}</option>
                        {services.map((s, idx) => <option key={idx} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">{t.formMessage}</label>
                    <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} placeholder={t.phMsg} className="w-full rounded-lg border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#003366] focus:ring-[#003366]" />
                  </div>
                  <button disabled={formStatus === 'submitting'} type="submit" className="w-full rounded bg-[#003366] py-4 text-xs font-black text-white shadow-xl hover:bg-[#002244] uppercase tracking-[0.2em] disabled:opacity-50 transition-all">
                    {formStatus === 'submitting' ? (isAr ? 'جاري الإرسال...' : 'Sending...') : t.formSubmit}
                  </button>
                  {formStatus === 'error' && <p className="text-center text-red-500 text-xs font-bold mt-4">{t.formError}</p>}
                </form>
              )}
            </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-slate-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className={`absolute -top-10 text-[12rem] font-black text-white select-none -z-10 ${isAr ? '-right-10' : '-left-10'}`}>JAAL</div>
                    <SectionHeader tag={t.historyTitle} title={t.historyTitle} desc={t.historyDesc} isAr={isAr} />
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="bg-[#003366] p-8 rounded-xl text-white shadow-xl">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C5A059] mb-4">{t.visitUs}</h4>
                            <p className="font-bold text-lg mb-1">{t.loc}</p>
                            <p className="text-sm opacity-80 mb-6">{t.street}</p>
                            <a href="https://maps.app.goo.gl/71PJygGYCWo5YHZx6" target="_blank" rel="noopener" className="text-xs font-black uppercase border-b border-[#C5A059] pb-1">{t.directions} ↗</a>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-100 shadow-lg min-h-[200px] overflow-hidden">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.137812903718!2d51.5036153!3d25.6998944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e460596395b095f%3A0x6334f4095f4c56e3!2sJAAL%20TYPING%20(Al%20Khor%20Typing%20%26%20Document%20Service%20Centre)!5e0!3m2!1sen!2sqa!4v1715686000000!5m2!1sen!2sqa" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
                        </div>
                    </div>
                </div>
                <div className="space-y-8 lg:pl-12">
                    {[
                      { id: '01', title: t.exp1Title, desc: t.exp1Desc },
                      { id: '02', title: t.exp2Title, desc: t.exp2Desc },
                      { id: '03', title: t.exp3Title, desc: t.exp3Desc }
                    ].map((item, i) => (
                      <div key={i} className={`flex gap-6 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                          <div className="flex-none h-12 w-12 bg-blue-50 flex items-center justify-center rounded font-black text-[#003366]">{item.id}</div>
                          <div>
                              <h4 className="text-lg font-black text-[#003366] uppercase mb-2">{item.title}</h4>
                              <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                          </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 pt-20 pb-10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid md:grid-cols-3 gap-12 mb-16 ${isAr ? 'text-right' : ''}`}>
                <div className={isAr ? 'md:order-3' : ''}>
                    <div className={`flex items-center gap-2 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <Logo light />
                        <div className="flex flex-col">
                          <span className="text-lg font-black uppercase leading-none">{t.title}</span>
                          <span className="text-[9px] font-bold text-[#C5A059] uppercase leading-tight">{t.subtitle}</span>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">{t.footerDesc}</p>
                </div>
                <div className={isAr ? 'md:order-2' : ''}>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C5A059] mb-8">{t.contact}</h4>
                    <dl className="space-y-4">
                        <div className={`flex gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <dt className="text-slate-500 font-bold w-12 text-[10px]">TEL</dt>
                            <dd className={`text-white font-bold tracking-wider flex flex-col ${isAr ? 'items-end' : ''}`}>
                                <a href="tel:+97466719241" className="hover:text-[#C5A059] transition-all">+974 6671 9241</a>
                                <a href="tel:+97455293553" className="hover:text-[#C5A059] transition-all">+974 5529 3553</a>
                            </dd>
                        </div>
                        <div className={`flex gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <dt className="text-slate-500 font-bold w-12 text-[10px]">LOC</dt>
                            <dd className="text-white font-medium text-sm">{t.loc}</dd>
                        </div>
                        <div className={`flex gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                            <dt className="text-slate-500 font-bold w-12 text-[10px]">EMAIL</dt>
                            <dd className="text-white font-medium text-sm">jaaltyping@gmail.com</dd>
                        </div>
                    </dl>
                </div>
                <div className={isAr ? 'md:order-1' : ''}>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C5A059] mb-8">{isAr ? 'روابط سريعة' : 'Quick Links'}</h4>
                    <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
                        <li><a href="#services" className="text-slate-400 hover:text-[#C5A059] transition-all">{t.services}</a></li>
                        <li><a href="#about" className="text-slate-400 hover:text-[#C5A059] transition-all">{t.about}</a></li>
                        <li><a href="tel:+97466719241" className="text-[#C5A059] hover:text-white underline decoration-2 underline-offset-4">{t.callNow}</a></li>
                    </ul>
                </div>
            </div>
            <div className={`border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest ${isAr ? 'md:flex-row-reverse' : ''}`}>
                <p className="text-center md:text-left">&copy; {new Date().getFullYear()} JAAL TYPING TRANSLATION AND DOCUMENT PROCESSING.</p>
                <p className="text-center md:text-right">{t.subtitle}</p>
            </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <a href="https://wa.me/97455293553" target="_blank" rel="noopener" className={`fixed bottom-8 ${isAr ? 'left-8' : 'right-8'} z-[100] group flex items-center gap-3 transition-all duration-500`}>
        <div className={`overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 bg-white shadow-xl rounded-full px-4 py-2 border border-slate-100 hidden sm:block ${isAr ? 'order-2' : 'order-1'}`}>
          <span className="text-[10px] font-black text-[#003366] uppercase whitespace-nowrap tracking-widest">{isAr ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp'}</span>
        </div>
        <div className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 animate-bounce hover:animate-none">
            <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
            <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </div>
      </a>
    </div>
  )
}
