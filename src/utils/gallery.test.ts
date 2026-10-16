import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterGalleryImages,
  getAvailableCategories,
  getAdjacentImageIndex,
  getGalleryWhatsAppUrl,
  type GalleryImage,
  type GalleryCategory
} from './gallery.ts';

const mockImages: GalleryImage[] = [
  {
    id: 'thali-1',
    src: 'https://example.com/thali.jpg',
    title: 'Veg Thali',
    titleTe: 'శాకాహార భోజనం',
    caption: 'Full meal with rice and curries',
    captionTe: 'అన్నం మరియు కూరలతో భోజనం',
    category: 'thalis',
    alt: 'Veg Thali'
  },
  {
    id: 'curry-1',
    src: 'https://example.com/curry.jpg',
    title: 'Tomato Dal',
    titleTe: 'టమాటా పప్పు',
    caption: 'Tempered lentil curry',
    captionTe: 'పోపు పెట్టిన పప్పు',
    category: 'curries',
    alt: 'Dal'
  },
  {
    id: 'bread-1',
    src: 'https://example.com/phulkas.jpg',
    title: 'Phulkas',
    titleTe: 'పుల్కాలు',
    caption: 'Whole wheat phulkas',
    captionTe: 'గోధుమ పుల్కాలు',
    category: 'breads',
    alt: 'Phulkas'
  }
];

const mockCategories: GalleryCategory[] = [
  { id: 'all', name: 'All', nameTe: 'అన్నీ' },
  { id: 'thalis', name: 'Thalis', nameTe: 'థాలీలు' },
  { id: 'curries', name: 'Curries', nameTe: 'కూరలు' },
  { id: 'kitchen', name: 'Kitchen', nameTe: 'వంటశాల' },
  { id: 'breads', name: 'Breads', nameTe: 'రొట్టెలు' }
];

test('filterGalleryImages returns all images when category is all or empty', () => {
  assert.equal(filterGalleryImages(mockImages, 'all').length, 3);
  assert.equal(filterGalleryImages(mockImages, '').length, 3);
});

test('filterGalleryImages filters images by specific category', () => {
  const thalis = filterGalleryImages(mockImages, 'thalis');
  assert.equal(thalis.length, 1);
  assert.equal(thalis[0].id, 'thali-1');

  const curries = filterGalleryImages(mockImages, 'curries');
  assert.equal(curries.length, 1);
  assert.equal(curries[0].id, 'curry-1');

  const emptyResult = filterGalleryImages(mockImages, 'kitchen');
  assert.equal(emptyResult.length, 0);
});

test('getAvailableCategories excludes categories with no images', () => {
  const available = getAvailableCategories(mockImages, mockCategories);
  const ids = available.map((c) => c.id);
  assert.deepEqual(ids, ['all', 'thalis', 'curries', 'breads']);
  assert.equal(ids.includes('kitchen'), false);
});

test('getAdjacentImageIndex handles forward and backward navigation with circular wrap', () => {
  assert.equal(getAdjacentImageIndex(0, 3, 'next'), 1);
  assert.equal(getAdjacentImageIndex(1, 3, 'next'), 2);
  assert.equal(getAdjacentImageIndex(2, 3, 'next'), 0); // wrap to 0

  assert.equal(getAdjacentImageIndex(0, 3, 'prev'), 2); // wrap to 2
  assert.equal(getAdjacentImageIndex(2, 3, 'prev'), 1);
  assert.equal(getAdjacentImageIndex(1, 3, 'prev'), 0);
});

test('getGalleryWhatsAppUrl creates a valid wa.me URL with phone and encoded query', () => {
  const enUrl = getGalleryWhatsAppUrl(mockImages[0], 'en');
  assert.match(enUrl, /^https:\/\/wa\.me\/918790563262\?text=/);
  assert.match(enUrl, /Veg%20Thali/);
  assert.match(enUrl, /thali-1/);

  const teUrl = getGalleryWhatsAppUrl(mockImages[0], 'te');
  assert.match(teUrl, /^https:\/\/wa\.me\/918790563262\?text=/);
  assert.match(teUrl, /thali-1/);
});
