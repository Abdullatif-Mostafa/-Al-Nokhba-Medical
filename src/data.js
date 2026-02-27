export const WHATSAPP_NUMBER = '966500000000'
export const PHONE_PRIMARY = '+966500000000'
export const PHONE_EMERGENCY = '+96611234567'
export const EMAIL = 'info@nakhba-clinic.com'
export const ADDRESS = 'شارع الملك فهد، الرياض 12345'
export const WORKING_HOURS = 'السبت – الخميس | 8 ص – 10 م'

export const SERVICES = [
  {
    id: 1,
    icon: 'fas fa-heartbeat',
    title: 'أمراض القلب والأوعية',
    desc: 'تشخيص وعلاج أمراض القلب بأحدث التقنيات وأجهزة القسطرة والمسح الطيفي.',
    price: '200',
  },
  {
    id: 2,
    icon: 'fas fa-brain',
    title: 'طب الأعصاب والمخ',
    desc: 'فريق متخصص في تشخيص وعلاج اضطرابات الجهاز العصبي والمخ والأعصاب الطرفية.',
    price: '250',
  },
  {
    id: 3,
    icon: 'fas fa-bone',
    title: 'جراحة العظام',
    desc: 'علاج إصابات العظام والمفاصل وعمليات تركيب الركبة والورك بالمنظار الجراحي.',
    price: '180',
  },
  {
    id: 4,
    icon: 'fas fa-baby',
    title: 'طب الأطفال',
    desc: 'رعاية صحية متكاملة للأطفال من الولادة حتى البلوغ في بيئة مريحة وودودة.',
    price: '150',
  },
  {
    id: 5,
    icon: 'fas fa-eye',
    title: 'طب وجراحة العيون',
    desc: 'تصحيح البصر بالليزر وعمليات إزالة الماء الأبيض وزراعة العدسات التجميلية.',
    price: '160',
  },
  {
    id: 6,
    icon: 'fas fa-tooth',
    title: 'طب الأسنان التجميلي',
    desc: 'ابتسامة هوليود وتبييض الأسنان وتقويم الأسنان الشفاف ووجوه البورسلين.',
    price: '120',
  },
]

export const STATS = [
  { icon: 'fas fa-users', value: 15000, label: 'مريض تم علاجهم بنجاح', suffix: '' },
  { icon: 'fas fa-award', value: 20, label: 'سنة خبرة طبية', suffix: '' },
  { icon: 'fas fa-user-md', value: 45, label: 'طبيب متخصص', suffix: '' },
  { icon: 'fas fa-star', value: 98, label: 'معدل رضا المرضى', suffix: '%' },
]

export const DOCTORS = [
  {
    id: 1,
    name: 'د. أحمد الراشد',
    specialty: 'استشاري أمراض القلب والأوعية',
    university: 'جامعة هارفارد',
    experience: '18 سنة',
    rating: 5,
    available: true,
    badgeColor: 'var(--accent)',
    avatarGradient: 'linear-gradient(135deg, #0A6EBD, #1e90d4)',
    bgGradient: 'linear-gradient(160deg, #E8F4FD 0%, #d0eeff 100%)',
  },
  {
    id: 2,
    name: 'د. سارة المنصور',
    specialty: 'استشارية طب الأطفال والحديثي الولادة',
    university: 'جامعة أكسفورد',
    experience: '14 سنة',
    rating: 5,
    available: true,
    badgeColor: '#F5A623',
    avatarGradient: 'linear-gradient(135deg, #e91e63, #c2185b)',
    bgGradient: 'linear-gradient(160deg, #fce4ec, #ffd0d0)',
  },
  {
    id: 3,
    name: 'د. خالد العتيبي',
    specialty: 'استشاري جراحة العظام والمفاصل',
    university: 'جامعة جونز هوبكنز',
    experience: '22 سنة',
    rating: 4,
    available: true,
    badgeColor: '#2e7d32',
    avatarGradient: 'linear-gradient(135deg, #2e7d32, #43a047)',
    bgGradient: 'linear-gradient(160deg, #e8f5e9, #c8e6c9)',
  },
]

export const TESTIMONIALS = [
  {
    id: 1,
    text: 'تجربة استثنائية! الدكاترة محترفون جداً والخدمة ممتازة. شعرت بالاطمئنان منذ اللحظة الأولى. أنصح الجميع بالتوجه لعيادة النخبة.',
    name: 'محمد عبد الله',
    role: 'مريض قلب • منذ 3 أشهر',
    rating: 5,
    avatarGradient: 'linear-gradient(135deg, #0A6EBD, #1e90d4)',
  },
  {
    id: 2,
    text: 'الدكتورة سارة رائعة مع أطفالي. ولدي كان خائفاً من الأطباء لكنها تعاملت معه بطريقة رائعة. شكراً جزيلاً على هذه الخدمة المميزة.',
    name: 'نورة الشمري',
    role: 'أم لطفلين • منذ شهر',
    rating: 5,
    avatarGradient: 'linear-gradient(135deg, #e91e63, #c2185b)',
  },
  {
    id: 3,
    text: 'أجريت عملية الركبة مع الدكتور خالد وكانت ناجحة 100%. الآن أمشي بشكل طبيعي بعد سنوات من الألم. الله يعطيهم العافية.',
    name: 'عبدالرحمن الحربي',
    role: 'مريض عظام • منذ 6 أشهر',
    rating: 5,
    avatarGradient: 'linear-gradient(135deg, #2e7d32, #43a047)',
  },
  {
    id: 4,
    text: 'الحجز سهل والاستقبال ممتاز والانتظار قصير. المكان نظيف ومرتب. الطبيب شرح لي كل شيء بالتفصيل وأنا مرتاح جداً.',
    name: 'فاطمة القحطاني',
    role: 'مريضة مراجعة • منذ أسبوع',
    rating: 5,
    avatarGradient: 'linear-gradient(135deg, #ff6f00, #f57c00)',
  },
  {
    id: 5,
    text: 'خدمة 5 نجوم بكل معنى الكلمة. فريق طبي محترف ومتعاون. لأول مرة أشعر بالراحة والثقة التامة في المكان الذي يعالجني.',
    name: 'سلطان الدوسري',
    role: 'مريض • منذ 2 أشهر',
    rating: 5,
    avatarGradient: 'linear-gradient(135deg, #1565c0, #1976d2)',
  },
]

export const NAV_LINKS = [
  { href: '#home', label: 'الرئيسية' },
  { href: '#services', label: 'خدماتنا' },
  { href: '#doctors', label: 'أطباؤنا' },
  { href: '#testimonials', label: 'آراء المرضى' },
  { href: '#contact', label: 'تواصل معنا' },
]
