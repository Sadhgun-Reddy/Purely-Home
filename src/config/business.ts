/**
 * Business Configuration for Purely Home – The Cloud Kitchen
 * Centralized business facts and verified contact details.
 */

export const BUSINESS_CONFIG = {
  name: 'Purely Home – The Cloud Kitchen',
  shortName: 'Purely Home',
  tagline: 'The Cloud Kitchen',
  phoneDisplay: '087905 63262',
  phoneLink: 'tel:+918790563262',
  whatsappNumber: '918790563262',
  whatsappDisplay: '+91 87905 63262',
  isWhatsAppCandidate: true,
  candidateVerificationNotice: 'Candidate number to be verified before launch',
  candidateVerificationNoticeTe: 'లాంచ్‌కు ముందు ధృవీకరించబడవలసిన నంబర్',
  mapStaticImageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCh-RFSyi0o2YRq_MHY9PUmM7G3Bm9z2NDRN45nYhsyXF5OZBtaK9NF-pfL4YTcA_je38JIo1yI9qbB1vdqjm692wXOZnFFb0IW1EwOD-PCosiKB4mFS5Ms1Rjoda1r_rXYLtLfih1NdkrWOj3PpCTdJHl9spDwYdgT1ontuXa-1YtO147Mserp1jlsjAqRsOv31_zIBooU_cfpqJiPkg9HZg16fQkfClqUigccU6g',
  address: {
    line1: 'SMR VINAY FOUNTAINHEAD',
    line2: 'Calvary Temple Road, Hafeezpet',
    city: 'Miyapur, Hyderabad, Telangana',
    pincode: '500049',
    fullAddress: 'SMR VINAY FOUNTAINHEAD, Calvary Temple Road, Hafeezpet, Miyapur, Hyderabad, Telangana 500049'
  },
  googleMapsUrl: 'https://maps.app.goo.gl/3goZGuGS9tBUfm6N8',
  // Listed Google rating and count; flagged for re-verification prior to final publication
  reputation: {
    rating: 5.0,
    reviewCount: 16,
    platform: 'Google Maps',
    requiresVerification: true,
    verificationNote: 'Google Maps Rating • subject to verification before launch',
    verificationNoteTe: 'గూగుల్ మ్యాప్స్ రేటింగ్ • లాంచ్‌కు ముందు ధృవీకరణ పెండింగ్‌లో ఉంది'
  },
  kitchenHours: {
    lunchBatch: '12:00 PM – 3:30 PM',
    dinnerBatch: '7:00 PM – 10:30 PM'
  }
};

/**
 * Helper to build verified WhatsApp conversation links
 */
export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
