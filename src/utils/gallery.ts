import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';

export interface GalleryCategory {
  id: string;
  name: string;
  nameTe: string;
  icon?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  titleTe?: string;
  caption: string;
  captionTe?: string;
  category: 'thalis' | 'curries' | 'kitchen' | 'breads';
  alt?: string;
  altTe?: string;
}

/**
 * Filter gallery images by selected category ID.
 * Returns all images if category is 'all'.
 */
export function filterGalleryImages(
  images: GalleryImage[],
  categoryId: string
): GalleryImage[] {
  if (!categoryId || categoryId === 'all') {
    return images;
  }
  return images.filter((img) => img.category === categoryId);
}

/**
 * Return only categories that have at least one image present in images list,
 * always preserving 'all' as the primary category.
 */
export function getAvailableCategories(
  images: GalleryImage[],
  allCategories: GalleryCategory[]
): GalleryCategory[] {
  const existingCategories = new Set(images.map((img) => img.category));
  return allCategories.filter((cat) => {
    if (cat.id === 'all') return true;
    return existingCategories.has(cat.id as GalleryImage['category']);
  });
}

/**
 * Calculate adjacent image index in lightbox carousel (circular wrap)
 */
export function getAdjacentImageIndex(
  currentIndex: number,
  total: number,
  direction: 'prev' | 'next'
): number {
  if (total <= 0) return 0;
  if (direction === 'next') {
    return (currentIndex + 1) % total;
  }
  return (currentIndex - 1 + total) % total;
}

/**
 * Construct URL-encoded WhatsApp enquiry link for a gallery photo
 */
export function getGalleryWhatsAppUrl(
  image: GalleryImage,
  language: 'en' | 'te' = 'en'
): string {
  const name = language === 'te' ? image.titleTe || image.title : image.title;
  const message =
    language === 'te'
      ? `నమస్తే Purely Home, మీ గ్యాలరీలోని "${name}" (ID: ${image.id}) వంటకం గురించి విచారించాలనుకుంటున్నాను. ఈ రోజు అందుబాటులో ఉందా మరియు ఆర్డర్ వివరాలు తెలుపగలరు.`
      : `Hello Purely Home! I'm enquiring about "${name}" (ID: ${image.id}) shown in your gallery. Is this available today, and what are the portion & ordering details?`;
  return getWhatsAppUrl(message);
}
