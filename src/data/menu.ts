import type { Dish } from '../utils/cart.ts';
import { BUSINESS_CONFIG } from '../config/business.ts';

export interface MenuCategory {
  id: string;
  name: string;
  nameTe: string;
  icon: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'all', name: 'All Selections', nameTe: 'అన్ని వంటకాలు', icon: 'restaurant_menu' },
  { id: 'thalis', name: 'Thalis & Meals', nameTe: 'తాళి భోజనం', icon: 'lunch_dining' },
  { id: 'curries', name: 'Curries & Dal', nameTe: 'కూరలు & పప్పు', icon: 'soup_kitchen' },
  { id: 'breads_rice', name: 'Breads & Rice', nameTe: 'పుల్కాలు & అన్నం', icon: 'bakery_dining' },
  { id: 'beverages', name: 'Beverages', nameTe: 'పానీయాలు', icon: 'local_cafe' }
];

/**
 * Sample / Representative Dishes
 * Note: These dishes represent typical home-style culinary offerings.
 * Actual daily menu, pricing, and availability are subject to kitchen confirmation via WhatsApp.
 */
export const SAMPLE_DISHES: Dish[] = [
  {
    id: 'homestyle-veg-thali',
    name: 'Homestyle Vegetarian Thali',
    nameTe: 'ఇంటి భోజనం తాళి (శాకాహారం)',
    category: 'thalis',
    price: 180,
    description: 'Representative homestyle noon meal: steamed Sona Masoori rice, 2 whole wheat phulkas, dal of the day, seasonal regional curry, curd, and papad.',
    descriptionTe: 'సంప్రదాయ ఇంటి భోజనం: వేడి సోనా మసూరి అన్నం, రెండు గోధుమ పుల్కాలు, రోజూ మారే పప్పు, తాజా కూరగాయల కూర, పెరుగు మరియు అప్పడం.',
    tag: 'Sample Representation',
    tagTe: 'నమూనా వంటకం',
    tags: ['Sona Masoori Rice', '2 Phulkas', 'Daily Dal', 'Seasonal Sabzi', 'Curd'],
    tagsTe: ['సోనా మసూరి అన్నం', '2 పుల్కాలు', 'పప్పు', 'కూరగాయల కూర', 'పెరుగు'],
    isVeg: true,
    mealTiming: 'Lunch & Dinner',
    mealTimingTe: 'మధ్యాహ్నం & రాత్రి',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlWAJCXR1nUVrzjTRol0I4SALZnXrb5FiXAlRAXARlpzKvM2CIURLwpjKAoZs827ZH0YVA2SMOzIetwc8xsK6h59VObpXmUAleTwmW0rpkM9SDpezCDZlHR0VPGAqFqYg0gMQJ_ZlyRIHjnMVEJF6tf4Gp85H08QdyZrq9Rb34YC-aGc0QNywkhGBop3UT1qRsOEgSXCsraSjcimfCEVgdPB4MeDg_8Pyr_KdQFKH2nlsGZ_IDy95',
    isSample: true,
    notes: 'Price & exact items confirmed on WhatsApp'
  },
  {
    id: 'traditional-dal-sambar',
    name: 'Traditional Dal & Sambar',
    nameTe: 'సాంబార్ & దాల్ హండీ',
    category: 'curries',
    price: 130,
    description: 'Slow-simmered homestyle toor dal and regional vegetable sambar tempered with mustard, cumin, and fresh curry leaves.',
    descriptionTe: 'సాంప్రదాయ పద్ధతిలో ఉడికించిన కందిపప్పు మరియు ఆవాలు, జీలకర్ర పోపు పెట్టిన కూరగాయల సాంబార్.',
    tag: 'Sample Representation',
    tagTe: 'నమూనా వంటకం',
    tags: ['Toor Dal', 'Regional Tamarind', 'Fresh Curry Leaves', 'Tempering'],
    tagsTe: ['కందిపప్పు', 'నాటు చింతపండు', 'కరివేపాకు పోపు', 'సాంబార్'],
    isVeg: true,
    mealTiming: 'Daily Kitchen Spec',
    mealTimingTe: 'రోజువారీ వంటకం',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5nPZc0cFrVDQSKqtmYCadme4SK8JpX-GPwdUW19B8sA2V3XtUFtcwG8F1nQaw9f2NFxWvnruiSqCmbok7DzVYkHNL-heqFNHeKAobTiFHLcO1CqASAGS-dvCpIaA7AzXok0gU8BvhKcfKTFbPlXKrri_QbiHyfqQPkDJrKORqeKoqWNUlMoAg1CtWsPtFT0riA0YoKdsm_vlFoEAApYhLYF0mwkka6OXOkASl1UcBQIOy3mg-aENR',
    isSample: true,
    notes: 'Price & exact items confirmed on WhatsApp'
  },
  {
    id: 'phulkas-vegetable-kurma',
    name: 'Phulkas with Homestyle Kurma',
    nameTe: 'పుల్కాలు & కూరగాయల కుర్మా',
    category: 'breads_rice',
    price: 140,
    description: 'Four soft oil-free whole wheat phulkas served with mildly spiced homestyle mixed vegetable kurma in light coconut gravy.',
    descriptionTe: 'నూనె లేకుండా కాల్చిన 4 మెత్తని గోధుమ పుల్కాలు మరియు స్వచ్ఛమైన కూరగాయల కుర్మా.',
    tag: 'Sample Representation',
    tagTe: 'నమూనా వంటకం',
    tags: ['4 Phulkas', 'Whole Wheat Atta', 'Mixed Veg Kurma', 'No Added Palm Oil'],
    tagsTe: ['4 పుల్కాలు', 'గోధుమ పిండి', 'కూరగాయల కుర్మా', 'కొబ్బరి గ్రేవీ'],
    isVeg: true,
    mealTiming: 'Evening Spec',
    mealTimingTe: 'సాయంత్రం / రాత్రి',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV5MtDj8Jr0VC_1Kub47SH5I7nIs1tERmevHyKIywJd6F9kgqigVcdP194hLH4nFT2Q6owMiwf1ZgmZZbVgaeXfkZL33iTRpnjFGsBiNY2QxPvnC84bLR62_NW4TuIRu1eW3EIaySyMZuuasTXoAKZ5lsDsiftNAScXrsKS3iaXIjcz7lTjAhtg8y7f4oQMvGva6wOrPrVXldPdviUP4JaPVYjHWNwOnIsJoOIQRM7QRRQX2f-W6XC',
    isSample: true,
    notes: 'Price & exact items confirmed on WhatsApp'
  },
  {
    id: 'telangana-tomato-pappu',
    name: 'Regional Tomato Pappu',
    nameTe: 'నాటు టమాటా పప్పు',
    category: 'curries',
    price: 120,
    description: 'Familiar regional tomato and toor dal preparation infused with crushed garlic, green chillies, and aromatic tempering.',
    descriptionTe: 'వెల్లుల్లి, పచ్చిమిర్చి మరియు ఆవాల పోపుతో సంప్రదాయ పద్ధతిలో వండిన నాటు టమాటా పప్పు.',
    tag: 'Sample Representation',
    tagTe: 'నమూనా వంటకం',
    tags: ['Country Tomatoes', 'Toor Dal', 'Garlic Tadka', 'Regional Taste'],
    tagsTe: ['నాటు టమాటాలు', 'కందిపప్పు', 'వెల్లుల్లి పోపు', 'రుచికరమైన పప్పు'],
    isVeg: true,
    mealTiming: 'Daily Homestyle',
    mealTimingTe: 'రోజువారీ ఇంటి భోజనం',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpH_wywcGCIShsAKxwrhzos3VMh4a4-JO_L3rwm478c1_eouEq6w9xk5s4oZ2Xj6p15mTXR0mTHgFahKEtoyWo48a1u1dCZCtVOfXruMI1CxDbHbM1ohixF48q-VYGFKXGtfRrk410ouzLV3mZoIPrY2qFZ-zEFcmFUInLg7oN2spt-EPLah9QTrqGRVgYDBxzeFLoE0BTTsws8tZYp8ZUfcQAKTkJbagLgypMiXBC2joOUZQd5pdy',
    isSample: true,
    notes: 'Price & exact items confirmed on WhatsApp'
  },
  {
    id: 'gutthi-vankaya-kura',
    name: 'Gutthi Vankaya Curry',
    nameTe: 'గుత్తి వంకాయ కూర',
    category: 'curries',
    price: 150,
    description: 'Traditional stuffed small brinjals simmered in a savory roasted peanut, sesame seed, and fragrant regional masala gravy.',
    descriptionTe: 'వేరుశనగలు, నువ్వులు మరియు మసాలాతో కూడిన సంప్రదాయ ప్రాంతీయ గుత్తి వంకాయ కూర.',
    tag: 'Sample Representation',
    tagTe: 'నమూనా వంటకం',
    tags: ['Small Brinjals', 'Roasted Peanuts', 'Sesame Gravy', 'Homestyle Spices'],
    tagsTe: ['గుత్తి వంకాయలు', 'వేరుశనగలు', 'నువ్వుల మసాలా', 'గ్రేవీ కూర'],
    isVeg: true,
    mealTiming: 'Special Lunch & Dinner',
    mealTimingTe: 'ప్రత్యేక మధ్యాహ్నం & రాత్రి',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    isSample: true,
    notes: 'Price & exact items confirmed on WhatsApp'
  },
  {
    id: 'perugu-annam-curd-rice',
    name: 'Seasoned Curd Rice (Perugu Annam)',
    nameTe: 'దద్దోజనం (పెరుగు అన్నం)',
    category: 'breads_rice',
    price: 95,
    description: 'Simple home-style curd rice with fresh domestic curd, tempered with mustard seeds, cumin, chopped ginger, and curry leaves.',
    descriptionTe: 'ఇంట్లో తోడుపెట్టిన తాజా పెరుగుతో కలిపిన అన్నం, ఆవాలు, అల్లం మరియు కరివేపాకు పోపు.',
    tag: 'Sample Representation',
    tagTe: 'నమూనా వంటకం',
    tags: ['Fresh Domestic Curd', 'Mustard Seeds', 'Ginger', 'Curry Leaves'],
    tagsTe: ['ఇంటి పెరుగు', 'ఆవాలు & జీలకర్ర', 'అల్లం', 'కరివేపాకు'],
    isVeg: true,
    mealTiming: 'Comfort Fare',
    mealTimingTe: 'హోమ్‌స్టైల్ వంటకం',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7MASIvQaXFyv_4fMuFO8I0p0iJB9N1oGoCH-0ooX8K3W2AELFPgtir74a3pw8aTaz_ccapYKisxh1InZ968Ew8tSsU6q655HjJTapct5ZWt9N22xCrFj3P963nIsCXeHK5YVWg9K4hauQ6nszj8M6hq_pMq4VG0uP-2ALfSfjb4OmlKj2ACvQCvm4zJaWrfT4c2YB_jzXW0DBa07IoV3vtlLUSt0DvS6Zmu51NJ1ycDe_-_Zny1ll',
    isSample: true,
    notes: 'Price & exact items confirmed on WhatsApp'
  },
  {
    id: 'masala-majjiga',
    name: 'Traditional Majjiga (Spiced Buttermilk)',
    nameTe: 'మసాలా మజ్జిగ',
    category: 'beverages',
    price: 40,
    description: 'Chilled home-churned buttermilk lightly seasoned with crushed ginger, green chilli, cumin powder, and fresh coriander leaves.',
    descriptionTe: 'అల్లం, జీలకర్ర మరియు కొత్తిమీర కలిపిన చల్లని, సహజమైన ఇంటి మజ్జిగ.',
    tag: 'Sample Representation',
    tagTe: 'నమూనా వంటకం',
    tags: ['Churned Curd', 'Crushed Ginger', 'Roasted Jeera', 'Coriander'],
    tagsTe: ['చల్లని మజ్జిగ', 'అల్లం ముక్కలు', 'జీలకర్ర పొడి', 'కొత్తిమీర'],
    isVeg: true,
    mealTiming: 'With Meals',
    mealTimingTe: 'భోజనంతో పాటు',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    isSample: true,
    notes: 'Price & exact items confirmed on WhatsApp'
  },
  {
    id: 'south-filter-coffee',
    name: 'Traditional Filter Coffee',
    nameTe: 'సంప్రదాయ ఫిల్టర్ కాఫీ',
    category: 'beverages',
    price: 50,
    description: 'Freshly brewed aromatic chicory-blend South Indian coffee decoction served piping hot with creamy boiled milk.',
    descriptionTe: 'సంప్రదాయ పద్ధతిలో కాచిన ఘుమఘుమలాడే తాజా ఫిల్టర్ కాఫీ.',
    tag: 'Sample Representation',
    tagTe: 'నమూనా వంటకం',
    tags: ['Fresh Brewed Decoction', 'Hot Boiled Milk', 'Traditional Taste'],
    tagsTe: ['తాజా డికాక్షన్', 'వేడి పాలు', 'సంప్రదాయ కాఫీ'],
    isVeg: true,
    mealTiming: 'Morning & Evening',
    mealTimingTe: 'ఉదయం & సాయంత్రం',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    isSample: true,
    notes: 'Price & exact items confirmed on WhatsApp'
  }
];

export const DISHES = SAMPLE_DISHES;

/**
 * Public Reputation Information
 * Sourced directly from Google Maps listing; subject to live verification with business owner.
 */
export const GOOGLE_REPUTATION = {
  rating: BUSINESS_CONFIG.reputation.rating,
  reviewCount: BUSINESS_CONFIG.reputation.reviewCount,
  mapsUrl: BUSINESS_CONFIG.googleMapsUrl,
  note: BUSINESS_CONFIG.reputation.verificationNote
};
