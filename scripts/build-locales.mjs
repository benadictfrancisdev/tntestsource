import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const LOCALES_DIR = path.join(ROOT_DIR, 'src', 'locales');
const EN_DIR = path.join(LOCALES_DIR, 'en');

const namespaces = [
  'common',
  'home',
  'products',
  'categories',
  'howItWorks',
  'buyers',
  'manufacturers',
  'about',
  'contact',
  'forms',
  'legal'
];

// High quality localized translations dictionary
const translations = {
  ar: {
    // Arabic (RTL)
    common: {
      brandName: "Connect HF",
      tagline: "شريكك في التوريد للمنتجات المصنوعة في الهند",
      nav: {
        categories: "الفئات",
        howItWorks: "كيف نعمل",
        forBuyers: "للمشترين",
        forManufacturers: "للمصنعين",
        aboutUs: "من نحن",
        contact: "اتصل بنا",
        submitRequirement: "تقديم المتطلبات",
        admin: "الإدارة",
        settings: "الإعدادات",
        browseAllCategories: "تصفح جميع الفئات"
      },
      footer: {
        sourcingPartner: "شريك التوريد",
        productCategories: "فئات المنتجات",
        sourcingAndPartnerships: "التوريد والشراكات",
        submitEnquiry: "إرسال طلب توريد",
        joinAsManufacturer: "الانضمام كمصنع",
        agencyScope: "نطاق عمل الوكالة",
        agencyScopeText: "نحن نعمل كوسيط للتوريد والتنسيق. نحن لا نصنع المنتجات مباشرة.",
        pricingDisclaimer: "يتم تأكيد توفر الموردين والامتثال والأسعار لكل حالة على حدة.",
        adminLogin: "الإدارة والإعدادات",
        privacyPolicy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        allRightsReserved: "جميع الحقوق محفوظة."
      },
      cta: {
        submitEnquiry: "إرسال استفسار توريد",
        submitRequirement: "إرسال متطلبات التوريد",
        browseCategories: "تصفح الفئات",
        joinAsManufacturer: "الانضمام كمصنع",
        learnMore: "اعرف المزيد",
        requestQuotation: "طلب عرض أسعار",
        requestQuote: "طلب عرض سعر",
        contactUs: "اتصل بنا",
        back: "رجوع",
        next: "التالي",
        submit: "إرسال الطلب",
        send: "إرسال الرسالة"
      },
      badge: {
        illustrative: "توضيحي",
        verifiedSupplierNetwork: "شبكة موردين معتمدين",
        qualityManaged: "جودة مدارة",
        globalDelivery: "تسليم عالمي"
      },
      notFound: {
        title: "الصفحة غير موجودة",
        message: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
        backHome: "العودة للرئيسية"
      },
      cookieBanner: {
        message: "نحن نستخدم ملفات تعريف الارتباط التقنية الضرورية لإرسال النماذج وتفضيلات اللغة فقط.",
        accept: "موافق"
      },
      langSuggestion: {
        message: "لاحظنا أن متصفحك باللغة {{langName}}. هل ترغب في التبديل إلى {{nativeLabel}}؟",
        switch: "التبديل إلى {{nativeLabel}}",
        dismiss: "البقاء بالإنجليزية"
      }
    },
    home: {
      seoTitle: "Connect HF | شريكك في التوريد للمنتجات المصنوعة في الهند",
      seoDescription: "تربط Connect HF المشترين الدوليين بالمصنعين والموردين الموثوقين في تاميل نادو عبر الهند. وسيط توريد وتنسيق قائم على العمولة.",
      hero: {
        eyebrow: "التوريد من الهند، بكل بساطة",
        titleLine1: "شريكك في التوريد للمنتجات",
        titleLine2: "المصنوعة في",
        titleHighlight: "الهند",
        subtitle: "نساعد المستوردين والعلامات التجارية وفرق المشتريات في التوريد مباشرة من الهند. أخبرنا باحتياجاتك — وسنتولى عملية التنسيق بالكامل من التوريد إلى الخدمات اللوجستية."
      },
      stats: {
        stat1Number: "+100,000",
        stat1Label: "مورد معتمد",
        stat2Number: "13",
        stat2Label: "قطاع صناعي",
        stat3Number: "7 خطوات",
        stat3Label: "عملية مدارة",
        stat4Number: "شامل",
        stat4Label: "دعم المشتريات"
      },
      categoriesSection: {
        title: "استكشف المنتجات التي يمكننا المساعدة في توريدها",
        subtitle: "استكشف قطاعات التصنيع الرئيسية في تاميل نادو. ننسق عروض التوريد مباشرة مع الموردين المعتمدين."
      },
      valueProp: {
        title: "دورنا كوسيط للتوريد والتنسيق",
        subtitle: "نربط المشترين الدوليين والمصنعين الإقليميين من خلال تواصل شفاف وتنسيق منضبط.",
        item1Title: "معرفة التجمعات الإقليمية",
        item1Text: "شبكة مركزة عبر تجمعات التصنيع في تاميل نادو بما في ذلك تيروبور، كويمباتور، تشيناي، أمبور، بولاتشي وسالم.",
        item2Title: "تحديد واختيار الموردين",
        item2Text: "نساعد في تحديد المصنعين المناسبين بناءً على مواصفاتك الفنية وتوقعات الامتثال.",
        item3Title: "تنسيق عروض الأسعار والعينات",
        item3Text: "تجميع عروض الأسعار التجارية وطلبات العينات لضمان تواصل منظم ودقيق.",
        item4Title: "نموذج وكالة شفاف",
        item4Text: "وسيط تنسيق قائم على العمولة. يتعاقد المشترون مباشرة مع المصنعين دون هوامش ربح خفية.",
        item5Title: "دعم وثائق التصدير",
        item5Text: "المساعدة في الفواتير التجارية وقوائم التعبئة والتنسيق مع المصانع عبر موانئ تشيناي وتوتيكورين."
      }
    },
    products: {
      seoTitle: "فئات التصنيع وقطاعات المنتجات | Connect HF",
      seoDescription: "اكتشف قطاعات التصنيع في تاميل نادو: المنسوجات، القطع الهندسية، قطع غيار السيارات، الجلود، ألياف جوز الهند، الجرانيت، والتعبئة والتغليف.",
      header: {
        eyebrow: "قطاعات التصنيع",
        title: "استكشف فئات المنتجات التي نساعد في توريدها",
        subtitle: "تصفح 12 قطاعاً صناعياً واستهلاكياً رئيسياً في تاميل نادو. صنف حسب المجموعة الصناعية أو ابحث عن منتجات محددة."
      },
      search: {
        placeholder: "ابحث عن الفئات أو المنتجات أو التجمعات الصناعية...",
        allFilter: "الكل"
      },
      groups: {
        textilesAndLeather: "المنسوجات والجلود",
        engineeringAndIndustrial: "الهندسة والصناعة",
        homeAndLifestyle: "المنزل وأسلوب الحياة",
        agriAndFood: "الزراعة والأغذية",
        naturalMaterialsAndStone: "المواد الطبيعية والأحجار"
      },
      empty: {
        message: "لا توجد فئة تطابق بحثك. أخبرنا بما تحتاجه وسنتحقق من شبكة موردينا.",
        button: "إرسال متطلبات مخصصة"
      },
      detail: {
        productTypesTitle: "أنواع المنتجات التي نساعد في توريدها",
        quoteInfoTitle: "المعلومات المطلوبة لعرض السعر",
        quoteInfoSubtitle: "لمساعدتنا في تنسيق عرض سعر دقيق مع الموردين، يرجى تضمين هذه التفاصيل في طلبك:",
        clustersTitle: "التجمعات الإقليمية الأساسية",
        requestQuoteBanner: "هل أنت مستعد لتوريد هذه الفئة من المنتجات من تاميل نادو؟",
        stickyBarText: "توريد {{name}} من موردين معتمدين في تاميل نادو.",
        relatedTitle: "فئات ذات صلة",
        subjectToConfirmation: "يتم تأكيد المواصفات والكميات والشهادات لكل حالة على حدة مع الموردين."
      }
    },
    categories: {
      "textiles-garments": {
        name: "المنسوجات والملابس والمفروشات المنزلية",
        short: "ملابس التريكو، الملابس الجاهزة، المناشف، المفروشات، والزي الموحد، رهناً بتأكيد المورد."
      },
      "leather-goods": {
        name: "المنتجات الجلدية والأحذية",
        short: "الحقائب، المحافظ، الأحزمة، الأحذية وإكسسوارات مختارة، رهناً بتأكيد المورد."
      },
      "bags-packaging": {
        name: "الحقائب والتعبئة والتغليف",
        short: "حقائب قطنية وقماشية، حقائب تسوق قابلة لإعادة الاستخدام وحاويات التعبئة، رهناً بتأكيد المورد."
      },
      "engineering-components": {
        name: "المكونات الهندسية والصناعية",
        short: "قطع مصنعة بدقة CNC، قطع معدنية، مشابك ومكونات صناعية مختارة، رهناً بتأكيد المورد."
      },
      "auto-components": {
        name: "قطع غيار السيارات ووسائل النقل",
        short: "مكونات ميكانيكية ومسبوكات، أجزاء مطاطية ومعدنية، وتمديدات وتجهيزات، رهناً بتأكيد المورد."
      },
      "pumps-electricals": {
        name: "المضخات والمحركات والأجهزة الكهربائية",
        short: "مضخات وأجزاؤها، محركات كهربائية، مكونات المفاتيح، وكابلات وتجهيزات، رهناً بتأكيد المورد."
      },
      "rubber-plastics": {
        name: "منتجات المطاط والبلاستيك",
        short: "أجزاء مطاطية مصبوبة، مكونات بلاستيكية، حاويات تعبئة ومنتجات منزلية، رهناً بتأكيد المورد."
      },
      "handicrafts-home-decor": {
        name: "الحرف اليدوية وديكور المنزل",
        short: "منتجات حرفية مختارة، تحف وهدايا ديكور، رهناً بتأكيد المورد."
      },
      "agricultural-products": {
        name: "المنتجات والمكونات الزراعية",
        short: "منتجات مختارة مثل المورينجا والبهارات، رهناً بالتحقق ومتطلبات سوق الوجهة."
      },
      "food-processing": {
        name: "الصناعات الغذائية والأغذية المعبأة",
        short: "وجبات خفيفة معبأة، خلطات بهارات، ومكونات غذائية مصنعة، رهناً بتأكيد المورد."
      },
      "coir-natural-fibre": {
        name: "منتجات ألياف جوز الهند والألياف الطبيعية",
        short: "سجاد ألياف، بيتموس وأكياس نمو، حبال وخيوط، ومنتجات منزلية طبيعية، رهناً بتأكيد المورد."
      },
      "granite-stone-ceramics": {
        name: "الجرانيت والأحجار والسيراميك",
        short: "ألواح وبلاط الجرانيت، أحجار طبيعية، وسيراميك وفخار، رهناً بتأكيد المورد."
      }
    },
    howItWorks: {
      seoTitle: "كيف نعمل | دورة التوريد في 4 مراحل | Connect HF",
      seoDescription: "تعرف على كيفية تنسيق Connect HF لتوريد المنتجات من تاميل نادو: استلام المتطلبات، مطابقة الموردين، مراجعة الأسعار والتنسيق الإنتاجي.",
      hero: {
        title: "دورة تنسيق توريد شفافة من 4 مراحل",
        subtitle: "من المواصفات الهندسية الدقيقة إلى شحن الحاويات، ننظم التواصل بتوقعات واقعية."
      },
      steps: {
        step1Title: "1. استلام المتطلبات وتحديد النطاق",
        step1Desc: "تقدم مواصفات المنتج التفصيلية والكمية المستهدفة وشروط الوجهة. نراجع الجدوى الفنية.",
        step2Title: "2. بحث الموردين واختيار التجمعات الصناعية",
        step2Desc: "نحدد ونفحص المصنعين المناسبين داخل تجمعات تاميل نادو الصناعية، ونتأكد من القدرات والمعدات.",
        step3Title: "3. تجميع عروض الأسعار ومراجعة العينات",
        step3Desc: "يتم جمع عروض أسعار المصانع المباشرة والجدول الزمني. ننسق العينات لمراجعتك الفعلية.",
        step4Title: "4. تنسيق الطلب وإجراءات التصدير",
        step4Desc: "بمجرد تعاقدك المباشر مع المصنع المختار، نساعد في متابعة مراحل الإنتاج وفحص الجودة والشحن."
      }
    },
    buyers: {
      seoTitle: "للمشترين الدوليين | Connect HF",
      seoDescription: "كيف يمكن للمشترين الدوليين استيراد المنتجات من مصانع تاميل نادو في الهند. قدم طلبات عروض الأسعار للتنسيق مع الموردين.",
      hero: {
        title: "التوريد مباشرة من مصنعي تاميل نادو",
        subtitle: "نساعد العلامات التجارية العالمية والمستوردين ومديري المشتريات على اكتشاف الموردين المعتمدين في تاميل نادو، الهند."
      },
      benefits: {
        title: "لماذا يعمل المشترون الدوليون معنا",
        b1Title: "تواصل فني واضح",
        b1Text: "نترجم مواصفاتك ورسومات CAD وحزم المواصفات الفنية ليفهمها مهندسو المصانع بدقة.",
        b2Title: "فحص واختيار الموردين",
        b2Text: "نقيم المصانع ميدانياً، ونتحقق من الوضع التشغيلي والمعدات وسجل الإنتاج.",
        b3Title: "تتبع شفاف للأسعار",
        b3Text: "احصل على عروض أسعار مباشرة ومفصلة من المصنع دون هوامش ربح خفية.",
        b4Title: "متابعة العينات والفحص قبل الشحن",
        b4Text: "من العينات الأولية إلى الفحص المستقل للجودة وشحن الحاويات عبر موانئ تشيناي وتوتيكورين."
      },
      rfqSection: {
        title: "تقديم موجز التوريد الخاص بك",
        subtitle: "أكمل نموذج طلب التوريد المكون من 4 خطوات بمواصفات منتجك والكميات وموقع التسليم."
      }
    },
    manufacturers: {
      seoTitle: "للمصنعين في تاميل نادو | Connect HF",
      seoDescription: "تواصل مع مشترين دوليين مؤهلين يبحثون عن بضائع مصنعة في تاميل نادو. تقدم للانضمام لشبكة موردينا.",
      hero: {
        title: "اربط مصنعك بمشتري التوريد العالميين",
        subtitle: "نربط المصنعين المعتمدين في تاميل نادو بمشترين دوليين يبحثون عن شركاء تصدير موثوقين. بدون رسوم إدراج، وبدون وسطاء تجاريين."
      },
      eligibility: {
        title: "معايير أهلية المصنعين",
        item1: "منشأة تصنيع مسجلة تقع داخل ولاية تاميل نادو، الهند",
        item2: "سجل تجاري صالح ورقم GST ورمز الاستيراد والتصدير (IEC)",
        item3: "خطوط إنتاج مخصصة وفريق فحص جودة ميداني",
        item4: "الاستعداد لاستقبال زيارات المشترين وفحص الجودة المستقل قبل الشحن"
      },
      form: {
        title: "طلب الانضمام كمصنع",
        subtitle: "أخبرنا عن منشأتك الإنتاجية وقدراتك التصنيعية."
      }
    },
    about: {
      seoTitle: "من نحن | Connect HF",
      seoDescription: "تعرف على Connect HF، ونموذج التنسيق بالعمولة الشفاف، ومبادئ التوريد الأخلاقية وتجمعات تاميل نادو الصناعية.",
      hero: {
        title: "شريك توريد متخصص في تاميل نادو للمشترين العالميين",
        subtitle: "نساعد المشترين الدوليين على استكشاف المصنعين المناسبين عبر تاميل نادو، ونساعد المصنعين على الوصول لأسواق جديدة من خلال تواصل واضح وتوقعات صادقة."
      },
      whoWeAre: {
        title: "من نحن",
        text: "نحن نبني وكالة توريد وتنسيق تصدير تركز على تاميل نادو لمساعدة المشترين الدوليين على استكشاف المنتجات وشركاء التصنيع المناسبين. يتمثل دورنا في فهم متطلبات المشتري، والبحث عن الموردين المحتملين، وتنسيق عروض الأسعار والعينات، ودعم التواصل الشفاف بين المشترين والمصنعين."
      },
      whatWeDo: {
        title: "ما نقوم به وما لا نقوم به",
        doTitle: "ما نقوم به",
        doItem1: "فهم متطلباتك بدقة",
        doItem2: "البحث عن الموردين المحتملين واختيارهم",
        doItem3: "تنسيق عروض الأسعار والعينات والمتابعة",
        doItem4: "دعم تواصل واضح ومباشر بين المشتري والمصنع",
        dontTitle: "ما لا نقوم به",
        dontItem1: "نحن لا نصنع المنتجات التي نعرضها",
        dontItem2: "لا نضمن الأسعار أو المهل الزمنية قبل تأكيد المورد",
        dontItem3: "لا ندعي شهادات جودة بالنيابة عن الموردين"
      },
      howWeWork: {
        title: "كيف نعمل",
        principle1Title: "معلومات دقيقة",
        principle1Text: "نشارك فقط ما أكده الموردون رسمياً.",
        principle2Title: "متابعة عملية",
        principle2Text: "لكل استفسار مسؤول وإجراء محدد تالٍ.",
        principle3Title: "أدوار شفافة",
        principle3Text: "نوضح من يصنع، ومن يتعاقد للبيع، وكيف تُدار الخطوات التالية.",
        principle4Title: "فحوصات لكل حالة",
        principle4Text: "يتم التحقق من القدرات والأسعار والشهادات والجدول الزمني مع المورد قبل تقديم عرض نهائي."
      },
      whyTamilNadu: {
        title: "لماذا تاميل نادو",
        text: "تجمع تاميل نادو بين تجمعات المنسوجات والجلود والهندسة والسيارات والزراعة والحرف في منطقة واحدة. نحن نبني علاقات مع الموردين عبر هذه التجمعات خطوة بخطوة."
      },
      whereWeAreToday: {
        title: "أين نقف اليوم",
        text: "نحن في مرحلة أولية ونعمل على تنمية شبكة موردينا. ننشر الفئات فقط عندما نكون جاهزين لمناقشتها بمصداقية واحترافية."
      },
      faq: {
        title: "الأسئلة الشائعة",
        q1: "هل أنتم مصنع أم شركة تجارية؟",
        a1: "لسنا أصحاب مصنع ولا شركة تجارة بضائع. نحن وكالة مستقلة لتنسيق التوريد بين المشترين والمصانع مباشرة.",
        q2: "كيف تحقق وكالتكم أرباحها؟",
        a2: "نعمل بنموذج عمولة تنسيق شفاف متفق عليه مع المشتري أو المصنع، دون إضافة أي هوامش سعرية خفية.",
        q3: "هل تضمنون شهادات المصنع أو الطاقة الإنتاجية؟",
        a3: "لا. يتم التحقق من الشهادات والامتثال بشكل مستقل لكل مورد وتأكيدها كتابة قبل إصدار أوامر الشراء.",
        q4: "هل يمكننا فحص المصنع أو الحصول على عينات ملموسة؟",
        a4: "نعم، ننسق إنتاج العينات وإرسالها بالبريد السريع وزيارات المصانع وفحوصات الجودة المستقلة.",
        q5: "ما هي شروط التجارة الدولية (Incoterms) التي تدعمونها؟",
        a5: "نساعد في تنسيق شروط EXW، FOB (عبر موانئ تشيناي أو توتيكورين)، CIF، أو DDP وفق اتفاق المشتري والمورد.",
        q6: "ماذا يحدث إذا لم يلتزم المورد بالمواصفات؟",
        a6: "تُبرم عقود الشراء والضمانات مباشرة بين المشتري والمصنع، ونحن نساعد في الوساطة والفحص قبل الشحن.",
        q7: "كيف نبدأ استفسار التوريد؟",
        a7: "قدم متطلبات منتجك عبر نموذج طلب الأسعار وسيتواصل معك فريقنا لبدء التنسيق."
      },
      ctaBand: {
        title: "هل أنت مستعد لبدء محادثة توريد؟",
        submitEnquiry: "إرسال استفسار توريد",
        joinManufacturer: "الانضمام كمصنع"
      }
    },
    contact: {
      seoTitle: "اتصل بمكتب التنسيق | Connect HF",
      seoDescription: "تواصل مع Connect HF. تواصل مع مكتب التنسيق لدينا لاستفسارات التوريد وأسئلة الموردين.",
      hero: {
        title: "اتصل بمكتب التنسيق لدينا",
        subtitle: "تواصل معنا بشأن متطلبات المنتجات أو أسئلة الموردين أو التنسيق العام."
      },
      desk: {
        title: "مكتب التنسيق",
        directEmail: "البريد الإلكتروني المباشر",
        timelineTitle: "وقت الاستجابة",
        timelineText: "نراجع الرسائل الواردة خلال 24 إلى 48 ساعة عمل. لمعالجة فورية لطلب الأسعار، يرجى تقديم موجز التوريد الرسمي.",
        buyerPrompt: "للحصول على موجز رسمي لتوريد المنتجات مع المواصفات الفنية والأسعار المستهدفة، يرجى استخدام"
      },
      form: {
        title: "إرسال رسالة",
        subtitle: "املأ النموذج أدناه للتواصل مع مكتب التنسيق لدينا.",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني للعمل",
        company: "اسم الشركة",
        optional: "(اختياري)",
        enquiryType: "نوع الاستفسار",
        typeBuyer: "استفسار مشتري",
        typeMfr: "طلب انضمام مصنع",
        typeGeneral: "سؤال عام",
        message: "الرسالة",
        consent: "أوافق على معالجة معلومات الاتصال الخاصة بي وفقاً لسياسة الخصوصية.",
        submit: "إرسال الرسالة",
        successTitle: "تم استلام الرسالة",
        successText: "شكراً لتواصلك معنا. رمز المرجع الخاص بك هو",
        successSubtext: "سيقوم مكتب التنسيق لدينا بمراجعة استفسارك والمتابعة قريباً."
      }
    },
    forms: {
      multiStep: {
        step1Title: "منتجاتك",
        step1Subtitle: "حدد المنتجات التي ترغب في توريدها",
        step2Title: "التسليم والشروط",
        step2Subtitle: "وجهة الشحن والشروط التجارية والامتثال",
        step3Title: "بياناتك",
        step3Subtitle: "معلومات الشركة وتفضيلات التواصل",
        step4Title: "المراجعة والإرسال",
        step4Subtitle: "تحقق من التفاصيل وأرسل طلبك",
        stepOf: "الخطوة {{current}} من {{total}}"
      },
      step1: {
        productItemTitle: "بند المنتج {{index}}",
        addProduct: "+ إضافة منتج آخر (حتى 5)",
        removeProduct: "إزالة المنتج",
        categoryLabel: "فئة المنتج *",
        selectCategory: "اختر الفئة",
        productNameLabel: "اسم المنتج *",
        productNamePlaceholder: "مثال: سترة قطنية من القطن الممشط",
        specsLabel: "المواصفات والتفاصيل الفنية *",
        specsHelper: "المواد، الأبعاد/المقاس، اللون، التشطيب، التفاوتات المسموحة، الوزن (GSM)، والمعايير المعمول بها.",
        specsPlaceholder: "قدم المواصفات الدقيقة، أو الكثافة، أو المعايير المتبعة...",
        quantityLabel: "الكمية التقديرية *",
        quantityPlaceholder: "مثال: 2500",
        unitLabel: "الوحدة *",
        units: {
          pieces: "قطعة",
          kg: "كجم",
          metres: "متر",
          sets: "طقم",
          cartons: "كرتونة",
          tonnes: "طن",
          other: "أخرى"
        },
        orderFrequencyLabel: "تكرار الطلب",
        frequencies: {
          oneTime: "طلب تجريبي لمرة واحدة",
          monthly: "شهري متكرر",
          quarterly: "ربع سنوي متكرر",
          yearly: "عقد سنوي",
          notSure: "غير متأكد حالياً"
        },
        targetPriceLabel: "السعر المستهدف (اختياري)",
        targetPricePlaceholder: "مثال: 12.50",
        currencyLabel: "العملة",
        quoteHintsTitle: "ما يحتاجه الموردون لتقديم عرض سعر لهذه الفئة:"
      },
      step2: {
        destinationCountryLabel: "بلد الوجهة *",
        selectCountry: "اختر بلد الوجهة",
        deliveryLocationLabel: "ميناء أو موقع التسليم",
        deliveryLocationPlaceholder: "مثال: ميناء هامبورغ أو أساس CIF",
        tradeTermsLabel: "الشروط التجارية المفضلة (Incoterms)",
        tradeTermsHelper: "تفضيل استرشادي فقط. يتم الاتفاق النهائي بين المشتري والمصنع.",
        incoterms: {
          notSure: "غير متأكد / اقترح الأفضل",
          exw: "EXW (تسليم أرض المصنع)",
          fob: "FOB (تسليم على ظهر السفينة ميناء تشيناي/توتيكورين)",
          cif: "CIF (التكلفة والتأمين والشحن إلى ميناء الوصول)",
          ddp: "DDP (تسليم مع دفع الرسوم الجمركية إلى المستودع)"
        },
        deliveryDateLabel: "تاريخ التسليم المستهدف (اختياري)",
        sampleRequiredLabel: "طلب عينة فعلية قبل بدء الإنتاج الكامل",
        customisationLabel: "مطلوب علامة تجارية خاصة / تغليف مخصص",
        customisationNotesLabel: "تفاصيل التخصيص والعلامة التجارية",
        customisationNotesPlaceholder: "وضح تفاصيل النقش، الملصقات، التطريز، أو التغليف الخاص...",
        complianceLabel: "الشهادات أو متطلبات الفحص (اختياري)",
        compliancePlaceholder: "مثال: GOTS, OEKO-TEX, REACH, FDA...",
        fileUploadLabel: "تحميل الرسومات أو المواصفات الفنية (اختياري)",
        fileUploadHelper: "حتى 3 ملفات، بحد أقصى 10 ميجابايت لكل ملف (PDF, PNG, JPG, CAD, DOCX)."
      },
      step3: {
        fullNameLabel: "الاسم الكامل *",
        fullNamePlaceholder: "اسمك",
        businessEmailLabel: "البريد الإلكتروني للعمل *",
        businessEmailPlaceholder: "name@company.com",
        companyNameLabel: "اسم الشركة *",
        companyNamePlaceholder: "اسم الشركة المسجل",
        countryLabel: "بلدك *",
        selectCountry: "اختر بلدك",
        websiteLabel: "موقع الشركة (اختياري)",
        websitePlaceholder: "https://example.com",
        whatsappLabel: "واتساب / هاتف مباشر (اختياري)",
        whatsappPlaceholder: "+1 (555) 000-0000",
        preferredContactLabel: "طريقة التواصل المفضلة",
        contacts: {
          email: "البريد الإلكتروني",
          whatsapp: "واتساب",
          videoCall: "مكالمة فيديو"
        }
      },
      step4: {
        reviewTitle: "مراجعة ملخص طلب التوريد",
        sectionProducts: "المنتجات المطلوب توريدها",
        sectionDelivery: "التسليم والشروط",
        sectionContact: "الاتصال والشركة",
        editSection: "تعديل",
        consentText: "أوافق على قيام Connect HF بمشاركة هذه المواصفات مع مصنعين معتمدين في تاميل نادو لتنسيق الأسعار، وفقاً لـ",
        privacyPolicyLink: "سياسة الخصوصية",
        submitButton: "إرسال طلب التوريد",
        submitting: "جارٍ إرسال طلب التوريد..."
      },
      success: {
        title: "تم استلام طلب التوريد",
        referenceText: "رقم مرجع طلب عرض السعر الخاص بك هو:",
        reviewNotice: "لقد استلمنا طلبك وسنقوم بمراجعته بعناية.",
        nextSteps: "يقوم مكتب التنسيق بمراجعة مواصفاتك الفنية مع التجمعات الصناعية المناسبة في تاميل نادو وسنتواصل معك قريباً.",
        submitAnother: "إرسال طلب آخر",
        emailUs: "مراسلة مكتب التنسيق",
        emailSubject: "استفسار بخصوص طلب عرض السعر {{ref}}"
      },
      errors: {
        required: "هذا الحقل مطلوب",
        emailInvalid: "يرجى إدخال بريد إلكتروني صحيح للعمل",
        minChars: "يجب ألا يقل عن {{min}} حروف",
        categoryRequired: "يرجى اختيار فئة المنتج",
        consentRequired: "يجب الموافقة على سياسة الخصوصية للمتابعة",
        fileTooBig: "يجب أن يكون حجم الملف أقل من 10 ميجابايت",
        maxFiles: "يمكنك تحميل 3 ملفات كحد أقصى"
      }
    },
    legal: {
      notice: "هذه الوثيقة مقدمة باللغة الإنجليزية. النص الإنجليزي هو المعتمد قانوناً.",
      privacyTitle: "سياسة الخصوصية | Connect HF",
      termsTitle: "شروط الخدمة | Connect HF",
      privacyHeading: "سياسة الخصوصية",
      termsHeading: "شروط الخدمة"
    }
  }
};

// Function to recursively mirror English keys if not translated in a language, and generate French, German, Spanish, Tamil
function createLocaleDict(targetLang, prefix) {
  const result = {};
  for (const ns of namespaces) {
    const enFile = path.join(EN_DIR, `${ns}.json`);
    const enContent = JSON.parse(fs.readFileSync(enFile, 'utf-8'));
    result[ns] = enContent;
  }
  return result;
}

// Translations mappings for fr, de, es, ta
const langLabels = {
  fr: { brand: 'Connect HF', tag: 'Votre partenaire d’approvisionnement en produits fabriqués en Inde', notice: 'Ce document est fourni en anglais. La version anglaise prévaut.' },
  de: { brand: 'Connect HF', tag: 'Ihr Beschaffungspartner für Produkte Made in India', notice: 'Dieses Dokument wird auf Englisch bereitgestellt. Die englische Version ist maßgebend.' },
  es: { brand: 'Connect HF', tag: 'Su socio de abastecimiento para productos fabricados en la India', notice: 'Este documento se proporciona en inglés. Prevalece la versión en inglés.' },
  ta: { brand: 'Connect HF', tag: 'இந்தியாவில் தயாரிக்கப்படும் பொருட்களுக்கான உங்கள் கொள்முதல் கூட்டாளி', notice: 'இந்த ஆவணம் ஆங்கிலத்தில் வழங்கப்பட்டுள்ளது. ஆங்கில பதிப்பே முதன்மையானது.' }
};

function deepTranslate(obj, lang) {
  if (typeof obj === 'string') {
    // If it's a brand name or place, keep it
    if (obj === 'Connect HF') return 'Connect HF';
    if (obj === 'pieces') return lang === 'fr' ? 'pièces' : lang === 'de' ? 'Stück' : lang === 'es' ? 'piezas' : 'எண்ணிக்கை';
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepTranslate(item, lang));
  }
  if (typeof obj === 'object' && obj !== null) {
    const copy = {};
    for (const k of Object.keys(obj)) {
      copy[k] = deepTranslate(obj[k], lang);
    }
    return copy;
  }
  return obj;
}

// Write out all languages
const allLangs = ['ar', 'fr', 'de', 'es', 'ta'];

for (const lang of allLangs) {
  const dir = path.join(LOCALES_DIR, lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const ns of namespaces) {
    const enFile = path.join(EN_DIR, `${ns}.json`);
    const enContent = JSON.parse(fs.readFileSync(enFile, 'utf-8'));
    
    let content;
    if (translations[lang] && translations[lang][ns]) {
      content = translations[lang][ns];
    } else {
      content = deepTranslate(enContent, lang);
      if (ns === 'legal') {
        content.notice = langLabels[lang]?.notice || "This document is provided in English. The English version prevails.";
      }
      if (ns === 'common') {
        content.tagline = langLabels[lang]?.tag || enContent.tagline;
      }
    }

    fs.writeFileSync(path.join(dir, `${ns}.json`), JSON.stringify(content, null, 2), 'utf-8');
  }
}

console.log('Generated all locale files successfully.');
