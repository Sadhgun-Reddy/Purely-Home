import type { GalleryCategory, GalleryImage } from '../utils/gallery.ts';

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'all', name: 'All Photos', nameTe: 'అన్ని ఫోటోలు', icon: 'photo_library' },
  { id: 'thalis', name: 'Thalis & Meals', nameTe: 'థాలీలు & భోజనాలు', icon: 'restaurant' },
  { id: 'curries', name: 'Traditional Curries', nameTe: 'సాంప్రదాయ కూరలు', icon: 'soup_kitchen' },
  { id: 'breads', name: 'Fresh Breads & Rice', nameTe: 'పుల్కాలు & అన్నం', icon: 'bakery_dining' },
  { id: 'kitchen', name: 'Kitchen & Preparation', nameTe: 'వంటశాల & తయారీ', icon: 'cooking' }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'ph-gal-01',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlWAJCXR1nUVrzjTRol0I4SALZnXrb5FiXAlRAXARlpzKvM2CIURLwpjKAoZs827ZH0YVA2SMOzIetwc8xsK6h59VObpXmUAleTwmW0rpkM9SDpezCDZlHR0VPGAqFqYg0gMQJ_ZlyRIHjnMVEJF6tf4Gp85H08QdyZrq9Rb34YC-aGc0QNywkhGBop3UT1qRsOEgSXCsraSjcimfCEVgdPB4MeDg_8Pyr_KdQFKH2nlsGZ_IDy95',
    title: 'Traditional Homestyle Thali',
    titleTe: 'సాంప్రదాయ ఇంటి భోజనం థాలీ',
    caption: 'Representative balanced noon meal with hot steamed rice, whole wheat phulkas, seasonal vegetable subji, and dal served on brassware.',
    captionTe: 'తాజా సోనా మసూరి అన్నం, వేడి పుల్కాలు, కాలానుగుణ కూరగాయల సబ్జీ, మరియు స్వచ్ఛమైన నెయ్యి దాల్‌తో కూడిన పరిపూర్ణ ఇంటి భోజనం.',
    category: 'thalis',
    alt: 'Purely Home homestyle vegetarian thali platter on banana leaf',
    altTe: 'అరటి ఆకుపై స్వచ్ఛమైన ఇంటి భోజనం థాలీ'
  },
  {
    id: 'ph-gal-02',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5nPZc0cFrVDQSKqtmYCadme4SK8JpX-GPwdUW19B8sA2V3XtUFtcwG8F1nQaw9f2NFxWvnruiSqCmbok7DzVYkHNL-heqFNHeKAobTiFHLcO1CqASAGS-dvCpIaA7AzXok0gU8BvhKcfKTFbPlXKrri_QbiHyfqQPkDJrKORqeKoqWNUlMoAg1CtWsPtFT0riA0YoKdsm_vlFoEAApYhLYF0mwkka6OXOkASl1UcBQIOy3mg-aENR',
    title: 'Slow-Simmered Sambar & Dal Handi',
    titleTe: 'మట్టిపాత్రలో ఉడికించిన సాంబార్ & దాల్',
    caption: 'Slow-simmered lentils tempered in pure ghee with mustard seeds, cumin, dried red chillies, and fresh curry leaves.',
    captionTe: 'ఆవాలు, జీలకర్ర, ఎండుమిరపకాయలు మరియు తాజా కరివేపాకుతో స్వచ్ఛమైన ఆవు నెయ్యిలో పోపు వేసిన మట్టిపాత్ర సాంబార్.',
    category: 'curries',
    alt: 'Traditional slow-cooked sambar in a rustic copper-bronze vessel',
    altTe: 'సాంప్రదాయ పాత్రలో మునక్కాయ సాంబార్'
  },
  {
    id: 'ph-gal-03',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV5MtDj8Jr0VC_1Kub47SH5I7nIs1tERmevHyKIywJd6F9kgqigVcdP194hLH4nFT2Q6owMiwf1ZgmZZbVgaeXfkZL33iTRpnjFGsBiNY2QxPvnC84bLR62_NW4TuIRu1eW3EIaySyMZuuasTXoAKZ5lsDsiftNAScXrsKS3iaXIjcz7lTjAhtg8y7f4oQMvGva6wOrPrVXldPdviUP4JaPVYjHWNwOnIsJoOIQRM7QRRQX2f-W6XC',
    title: 'Phulkas with Vegetable Kurma',
    titleTe: 'మృదువైన పుల్కాలు & కూరగాయల కుర్మా',
    caption: 'Soft whole wheat phulkas rolled fresh to order, paired with homestyle coconut and cashew mixed vegetable kurma in an earthenware bowl.',
    captionTe: 'తాజాగా కాల్చిన మృదువైన గోధుమ పుల్కాలు మరియు కొబ్బరి-జీడిపప్పు పేస్ట్‌తో నెమ్మదిగా ఉడికించిన హోమ్‌స్టైల్ కుర్మా.',
    category: 'breads',
    alt: 'Freshly roasted whole wheat phulkas with rich vegetable kurma in clay pot',
    altTe: 'మట్టిపాత్రలోని వెజిటబుల్ కుర్మాతో వేడి పుల్కాలు'
  },
  {
    id: 'ph-gal-04',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpH_wywcGCIShsAKxwrhzos3VMh4a4-JO_L3rwm478c1_eouEq6w9xk5s4oZ2Xj6p15mTXR0mTHgFahKEtoyWo48a1u1dCZCtVOfXruMI1CxDbHbM1ohixF48q-VYGFKXGtfRrk410ouzLV3mZoIPrY2qFZ-zEFcmFUInLg7oN2spt-EPLah9QTrqGRVgYDBxzeFLoE0BTTsws8tZYp8ZUfcQAKTkJbagLgypMiXBC2joOUZQd5pdy',
    title: 'Regional Festive Vegetarian Platter',
    titleTe: 'ప్రత్యేక ప్రాంతీయ శాకాహార విందు భోజనం',
    caption: 'Special ceremonial meal spread featuring rice, handmade phulkas, dal, vegetable stir-fry, sambar, fresh curd, and crisp papad.',
    captionTe: 'వేడి అన్నం, చేతితో చేసిన పుల్కాలు, పప్పు, కాలానుగుణ కూరలు, సాంబార్ మరియు చల్లని పెరుగుతో కూడిన ప్రత్యేక భోజనం.',
    category: 'thalis',
    alt: 'Festive regional South Indian vegetarian meal spread on brass plate',
    altTe: 'ఇత్తడి పళ్లెంలో సాంప్రదాయ శాకాహార భోజనం'
  },
  {
    id: 'ph-gal-05',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7MASIvQaXFyv_4fMuFO8I0p0iJB9N1oGoCH-0ooX8K3W2AELFPgtir74a3pw8aTaz_ccapYKisxh1InZ968Ew8tSsU6q655HjJTapct5ZWt9N22xCrFj3P963nIsCXeHK5YVWg9K4hauQ6nszj8M6hq_pMq4VG0uP-2ALfSfjb4OmlKj2ACvQCvm4zJaWrfT4c2YB_jzXW0DBa07IoV3vtlLUSt0DvS6Zmu51NJ1ycDe_-_Zny1ll',
    title: 'Everyday Stainless Plate Lunch Service',
    titleTe: 'రోజువారీ స్టీల్ ప్లేట్ భోజన సర్వింగ్',
    caption: 'Comforting daily lunch service with hot rice, tempered yellow dal, sabzi, home-set curd, sliced cucumber, and soft phulkas.',
    captionTe: 'రోజూ తినే ఆనందకరమైన ఇంటి భోజనం: వేడి అన్నం, నిమ్మకాయ-టమాటా పప్పు, కూర, చల్లని పెరుగు, దోసకాయ మరియు పుల్కాలు.',
    category: 'thalis',
    alt: 'Everyday Indian lunch service in stainless steel partitioned thali',
    altTe: 'రోజువారీ సాత్విక భోజనం ప్లేట్'
  },
  {
    id: 'ph-gal-06',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLGs6IxH-Yyo6Fj3pEhPhpd3jwQiVeZumU_AEbwDemSeQcjtyumgRBbT4HmvhwDiDfnErndk9SAZKHdSVB3NtB6IOMEKy4gpMMuR_jXWeps98BLfr4eW-cOd6WJrd5Cz3anqAyBLMKXUg6g2JuahMm5fGh7ybxFdu86l2N-hDLpbcQyC1Wy3aXWer_pdVHs5Qfr2f0rUdTc21fdrGxJz-zCbuph_bt4IP0Dz2NMbz-E6VD4V9xbZJd',
    title: 'Hafeezpet Kitchen Location & Neighborhood',
    titleTe: 'హఫీజ్‌పేట్ కిచెన్ కేంద్రం & పరిసర ప్రాంతం',
    caption: 'Operational residential base at SMR Vinay Fountainhead along Calvary Temple Road, Hafeezpet. Direct neighborhood pickup and local delivery arrangements.',
    captionTe: 'ఎస్.ఎం.ఆర్ వినయ్ ఫౌంటైన్‌హెడ్, కల్వరి టెంపుల్ రోడ్, హఫీజ్‌పేట్ వద్ద గల మా కిచెన్ కేంద్రం.',
    category: 'kitchen',
    alt: 'Purely Home Cloud Kitchen location at SMR Vinay Fountainhead, Hafeezpet',
    altTe: 'హఫీజ్‌పేట్ కిచెన్ లొకేషన్ మ్యాప్'
  }
];
