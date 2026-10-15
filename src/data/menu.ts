import type { Dish } from '../utils/cart';

export const DISHES: Dish[] = [
  {
    id: 'homestyle-veg-thali',
    name: 'Special Homestyle Veg Thali',
    nameTe: 'ప్రత్యేకమైన ఇంటి భోజనం తాళి',
    price: 180,
    category: 'thalis',
    description: 'Steamed Sona Masoori Rice, Phulkas (3), Dal Tadka with Ghee, Seasonal Subzi, Pachadi, Curd & Roasted Papad.',
    descriptionTe: 'తాజా సోనా మసూరి అన్నం, 3 వేడి పుల్కాలు, స్వచ్ఛమైన నెయ్యి దాల్ తడ్కా, కూరగాయల సబ్జీ, ఇంట్లో చేసిన పచ్చడి, పెరుగు, వేయించిన అప్పడం.',
    tag: 'Most Loved',
    isVeg: true,
    mealTiming: 'Lunch & Dinner',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlWAJCXR1nUVrzjTRol0I4SALZnXrb5FiXAlRAXARlpzKvM2CIURLwpjKAoZs827ZH0YVA2SMOzIetwc8xsK6h59VObpXmUAleTwmW0rpkM9SDpezCDZlHR0VPGAqFqYg0gMQJ_ZlyRIHjnMVEJF6tf4Gp85H08QdyZrq9Rb34YC-aGc0QNywkhGBop3UT1qRsOEgSXCsraSjcimfCEVgdPB4MeDg_8Pyr_KdQFKH2nlsGZ_IDy95',
    ingredients: ['Sona Masoori Rice', 'Whole Wheat Atta', 'Toor Dal', 'Desi Cow Ghee', 'Fresh Vegetables', 'Cold-Pressed Groundnut Oil'],
    servings: 'Hearty meal for 1 person'
  },
  {
    id: 'traditional-dal-sambar-handi',
    name: 'Slow-Simmered Traditional Dal & Sambar Handi',
    nameTe: 'మట్టిపాత్రలో ఉడికించిన సాంబార్ & దాల్ హండీ',
    price: 140,
    category: 'curries',
    description: 'Tender drumstick sambar or dal tadka tempered with mustard, cumin and dried red chillies. Served with steamed rice.',
    descriptionTe: 'మునక్కాయ సాంబార్ లేదా దాల్ తడ్కా, ఆవాలు, జీలకర్ర, ఎండుమిర్చితో పోపు. తాజా అన్నంతో వడ్డింపు.',
    tag: 'Claypot Special',
    isVeg: true,
    mealTiming: "Chef's Signature",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5nPZc0cFrVDQSKqtmYCadme4SK8JpX-GPwdUW19B8sA2V3XtUFtcwG8F1nQaw9f2NFxWvnruiSqCmbok7DzVYkHNL-heqFNHeKAobTiFHLcO1CqASAGS-dvCpIaA7AzXok0gU8BvhKcfKTFbPlXKrri_QbiHyfqQPkDJrKORqeKoqWNUlMoAg1CtWsPtFT0riA0YoKdsm_vlFoEAApYhLYF0mwkka6OXOkASl1UcBQIOy3mg-aENR',
    ingredients: ['Drumsticks', 'Shallots', 'Carrots', 'Toor Dal', 'Curry Leaves', 'Guntur Dried Chillies', 'Cow Ghee'],
    servings: 'Served with 350ml Handi & Steamed Rice'
  },
  {
    id: 'phulkas-earthen-pot-kurma',
    name: 'Soft Phulkas with Earthen Pot Kurma',
    nameTe: 'మృదువైన పుల్కాలు & కుర్మా',
    price: 130,
    category: 'breads_rice',
    description: '4 whole wheat puffed phulkas served with slow-cooked coconut and cashew spiced vegetable gravy with seasonal root veggies.',
    descriptionTe: '4 వేడి గోధుమ పుల్కాలు, కొబ్బరి మరియు జీడిపప్పు మసాలాతో నెమ్మదిగా ఉడికించిన కూరగాయల కుర్మా.',
    tag: 'Evening Comfort',
    isVeg: true,
    mealTiming: 'Dinner Special',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV5MtDj8Jr0VC_1Kub47SH5I7nIs1tERmevHyKIywJd6F9kgqigVcdP194hLH4nFT2Q6owMiwf1ZgmZZbVgaeXfkZL33iTRpnjFGsBiNY2QxPvnC84bLR62_NW4TuIRu1eW3EIaySyMZuuasTXoAKZ5lsDsiftNAScXrsKS3iaXIjcz7lTjAhtg8y7f4oQMvGva6wOrPrVXldPdviUP4JaPVYjHWNwOnIsJoOIQRM7QRRQX2f-W6XC',
    ingredients: ['100% Whole Wheat', 'Cashews', 'Fresh Grated Coconut', 'Potatoes & Peas', 'Hand-ground Garam Masala'],
    servings: '4 Fresh Phulkas + 250ml Kurma'
  },
  {
    id: 'telangana-tomato-pappu',
    name: 'Telangana Tomato Pappu with Ghee Phulkas',
    nameTe: 'తెలంగాణ టమాటా పప్పు & నెయ్యి పుల్కాలు',
    price: 135,
    category: 'curries',
    description: 'Tangy country tomato dal tempered with garlic cloves, cumin, curry leaves in pure cow ghee, served with 3 soft phulkas.',
    descriptionTe: 'నాటు టమాటా పప్పు, వెల్లుల్లి, జీలకర్ర, కరివేపాకు నెయ్యి పోపుతో, 3 మెత్తని పుల్కాలు.',
    tag: 'Homestyle Classic',
    isVeg: true,
    mealTiming: 'Lunch & Dinner',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpH_wywcGCIShsAKxwrhzos3VMh4a4-JO_L3rwm478c1_eouEq6w9xk5s4oZ2Xj6p15mTXR0mTHgFahKEtoyWo48a1u1dCZCtVOfXruMI1CxDbHbM1ohixF48q-VYGFKXGtfRrk410ouzLV3mZoIPrY2qFZ-zEFcmFUInLg7oN2spt-EPLah9QTrqGRVgYDBxzeFLoE0BTTsws8tZYp8ZUfcQAKTkJbagLgypMiXBC2joOUZQd5pdy',
    ingredients: ['Country Tomatoes', 'Yellow Moong & Toor Dal', 'Garlic', 'Pure Desi Ghee', 'Whole Wheat Atta'],
    servings: '3 Phulkas + 250ml Dal'
  },
  {
    id: 'perugu-annam-curd-rice',
    name: 'Tempered Curd Rice with Pomegranate (Perugu Annam)',
    nameTe: 'దద్దోజనం (పెరుగు అన్నం & దానిమ్మ)',
    price: 95,
    category: 'breads_rice',
    description: 'Creamy homemade curd mixed with soft mashed rice, tempered with mustard seeds, curry leaves, ginger, and ruby pomegranate.',
    descriptionTe: 'ఇంట్లో తోడుపెట్టిన స్వచ్ఛమైన పెరుగు అన్నం, ఆవాలు, అల్లం, కరివేపాకు పోపు మరియు తాజా దానిమ్మ గింజలతో.',
    tag: 'Cooling & Light',
    isVeg: true,
    mealTiming: 'All Day Comfort',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7MASIvQaXFyv_4fMuFO8I0p0iJB9N1oGoCH-0ooX8K3W2AELFPgtir74a3pw8aTaz_ccapYKisxh1InZ968Ew8tSsU6q655HjJTapct5ZWt9N22xCrFj3P963nIsCXeHK5YVWg9K4hauQ6nszj8M6hq_pMq4VG0uP-2ALfSfjb4OmlKj2ACvQCvm4zJaWrfT4c2YB_jzXW0DBa07IoV3vtlLUSt0DvS6Zmu51NJ1ycDe_-_Zny1ll',
    ingredients: ['Home-Set Thick Curd', 'Sona Masoori Rice', 'Pomegranate Arils', 'Mustard & Ginger', 'Curry Leaves'],
    servings: '350ml Bowl'
  },
  {
    id: 'kumbakonam-filter-coffee',
    name: 'Kumbakonam Degree Filter Coffee',
    nameTe: 'కుంభకోణం డిగ్రీ ఫిల్టర్ కాఫీ',
    price: 50,
    category: 'beverages',
    description: 'Slow-brewed freshly roasted coffee decoction blended with full-cream hot milk and unrefined cane jaggery or sugar.',
    descriptionTe: 'తాజా ఫిల్టర్ కాఫీ డికాక్షన్, చిక్కని పాలు, సంప్రదాయ పద్ధతిలో కాచిన అమృతం.',
    tag: 'Fresh Brew',
    isVeg: true,
    mealTiming: 'Morning & Evening',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    ingredients: ['80:20 Roasted Coffee-Chicory', 'Fresh Full Cream Milk'],
    servings: '1 Brass Tumbler (150ml)'
  },
  {
    id: 'masala-majjiga',
    name: 'Spiced Buttermilk (Masala Majjiga)',
    nameTe: 'మసాలా మజ్జిగ',
    price: 40,
    category: 'beverages',
    description: 'Earthen pot churned buttermilk spiced with ginger, green chillies, curry leaves, and a dash of roasted cumin powder.',
    descriptionTe: 'మట్టిపాత్రలో చిలికిన చల్లని మజ్జిగ, జీలకర్ర పొడి, అల్లం, కరివేపాకుతో.',
    tag: 'Digestive Elixir',
    isVeg: true,
    mealTiming: 'With Meals',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Homemade Curd', 'Roasted Jeera', 'Ginger', 'Green Chilli', 'Rock Salt'],
    servings: '300ml Earthen Kulhad / Bottle'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Dr. Swapna Reddy',
    locality: 'SMR Vinay Fountainhead, Hafeezpet',
    rating: 5,
    date: '3 days ago',
    text: 'Living in the same community, Purely Home has been a blessing. The dal tadka smells exactly like my grandmother’s kitchen back in Warangal. No heavy restaurant acidity, no excess oil. Genuine home food.',
    verified: true
  },
  {
    id: 2,
    name: 'Karthik Varma',
    locality: 'Miyapur (HITEC Corridor)',
    rating: 5,
    date: '1 week ago',
    text: 'I work in HITEC City and order their lunch thali 4 days a week. The phulkas stay soft even after an hour, and the cold-pressed oil taste is unmistakable. Best cloud kitchen in Miyapur-Hafeezpet belt!',
    verified: true
  },
  {
    id: 3,
    name: 'Ananya & Rakesh Sen',
    locality: 'Calvary Temple Road, Hafeezpet',
    rating: 5,
    date: '2 weeks ago',
    text: 'We ordered the Handi Sambar and Phulka Kurma for a family gathering of 8. Everyone asked if we cooked it at home. Earthen pot aroma is real! Very humble and punctual hosts.',
    verified: true
  }
];
