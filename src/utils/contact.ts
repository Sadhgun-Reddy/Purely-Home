import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';

export type ContactEnquiryType = 'general' | 'today' | 'pickup' | 'dietary' | 'bulk';

export interface ContactEnquiryPayload {
  name?: string;
  phone?: string;
  enquiryType: ContactEnquiryType;
  message?: string;
}

export function formatWhatsAppEnquiryMessage(
  payload: ContactEnquiryPayload,
  lang: 'en' | 'te' = 'en'
): string {
  const isTe = lang === 'te';
  const prefix = isTe
    ? 'నమస్తే Purely Home, నేను మీ కిచెన్‌తో సంప్రదించాలనుకుంటున్నాను.'
    : 'Hello Purely Home, I would like to enquire with your Hafeezpet kitchen.';

  const typeLabels: Record<ContactEnquiryType, { en: string; te: string }> = {
    general: { en: 'General Kitchen Enquiry', te: 'సాధారణ కిచెన్ విచారణ' },
    today: { en: "Today's Menu & Live Availability", te: 'నేటి మెనూ & లభ్యత' },
    pickup: { en: 'Direct Kitchen Pickup Arrangement', te: 'డైరెక్ట్ కిచెన్ పికప్ ఏర్పాటు' },
    dietary: { en: 'Special Dietary Adjustment (Mild Spice / Jain / Diabetic-Friendly)', te: 'ప్రత్యేక ఆహార నియమాలు (తక్కువ కారం / జైన్ / పత్యం)' },
    bulk: { en: 'Advance Domestic Meal / Bulk Lunch Batch', te: 'ముందస్తు భోజనం / బల్క్ లంచ్ బ్యాచ్' }
  };

  const typeText = isTe ? typeLabels[payload.enquiryType].te : typeLabels[payload.enquiryType].en;

  const parts: string[] = [prefix];

  if (payload.name && payload.name.trim()) {
    parts.push(isTe ? `నా పేరు: ${payload.name.trim()}` : `My Name: ${payload.name.trim()}`);
  }

  if (payload.phone && payload.phone.trim()) {
    parts.push(isTe ? `ఫోన్ నంబర్: ${payload.phone.trim()}` : `Phone: ${payload.phone.trim()}`);
  }

  parts.push(isTe ? `విషయం: ${typeText}` : `Topic: ${typeText}`);

  if (payload.message && payload.message.trim()) {
    parts.push(isTe ? `సందేశం: "${payload.message.trim()}"` : `Note: "${payload.message.trim()}"`);
  }

  return parts.join('\n');
}

export function getContactWhatsAppUrl(payload: ContactEnquiryPayload, lang: 'en' | 'te' = 'en'): string {
  const message = formatWhatsAppEnquiryMessage(payload, lang);
  return getWhatsAppUrl(message);
}
