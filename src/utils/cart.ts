import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';

export interface Dish {
  id: string;
  name: string;
  nameTe?: string;
  category: 'thalis' | 'curries' | 'breads_rice' | 'specials' | 'beverages';
  description: string;
  descriptionTe?: string;
  tag?: string;
  tagTe?: string;
  isVeg: boolean;
  mealTiming: string;
  mealTimingTe?: string;
  image: string;
  isSample: boolean;
  notes?: string;
  price?: number;
  tags?: string[];
  tagsTe?: string[];
}

export interface SelectionItem {
  dish: Dish;
  quantity: number;
}

export interface EnquiryDetails {
  items: SelectionItem[];
  customerName?: string;
  notes?: string;
}

/**
 * Total item count selected by the visitor
 */
export function countSelectedItems(items: SelectionItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Generate formatted WhatsApp message for meal availability enquiry
 * Does NOT simulate a checkout or claim an order is placed.
 * Opens a real enquiry conversation with the kitchen.
 */
export function generateWhatsAppEnquiryMessage(details: EnquiryDetails): string {
  const { items, customerName, notes } = details;

  let msg = `Namaste Purely Home,\n\n`;
  msg += `I am contacting you regarding your home-style cloud kitchen in Hafeezpet (SMR Vinay Fountainhead).\n`;

  if (customerName && customerName.trim()) {
    msg += `Name: ${customerName.trim()}\n`;
  }

  if (items.length > 0) {
    msg += `\nI would like to enquire about the availability and pricing for the following dishes today:\n`;
    items.forEach((item) => {
      msg += `• ${item.dish.name} (Qty: ${item.quantity})\n`;
    });
  } else {
    msg += `\nCould you please share today's available lunch/dinner menu and order timings?\n`;
  }

  if (notes && notes.trim()) {
    msg += `\nNote/Question: ${notes.trim()}\n`;
  }

  msg += `\nThank you!`;
  return msg;
}

/**
 * Generates direct WhatsApp URL with the enquiry message
 */
export function generateWhatsAppEnquiryUrl(details: EnquiryDetails): string {
  const text = generateWhatsAppEnquiryMessage(details);
  return getWhatsAppUrl(text);
}

/**
 * Generates direct WhatsApp URL for a single dish enquiry
 */
export function getDishWhatsAppUrl(dish: Dish, language: 'en' | 'te' = 'en'): string {
  const dishName = language === 'te' && dish.nameTe ? dish.nameTe : dish.name;
  const priceText = dish.price ? ` (Indicative: ₹${dish.price})` : '';
  const text = language === 'te'
    ? `నమస్తే ప్యూర్లీ హోమ్,\n\nమీ హఫీజ్‌పేట్ క్లౌడ్ కిచెన్‌లో నేడు "${dishName}" లభ్యత మరియు ఆర్డర్ వివరాల గురించి తెలుసుకోవాలనుకుంటున్నాను.\n\nధన్యవాదాలు!`
    : `Namaste Purely Home,\n\nI would like to enquire about the availability and details for "${dishName}"${priceText} at your Hafeezpet cloud kitchen today.\n\nThank you!`;
  return getWhatsAppUrl(text);
}

