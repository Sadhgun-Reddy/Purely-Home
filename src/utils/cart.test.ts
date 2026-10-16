import test from 'node:test';
import assert from 'node:assert/strict';
import { countSelectedItems, generateWhatsAppEnquiryMessage, generateWhatsAppEnquiryUrl } from './cart.ts';
import type { Dish, SelectionItem, EnquiryDetails } from './cart.ts';

const sampleDish1: Dish = {
  id: 'homestyle-veg-thali',
  name: 'Homestyle Vegetarian Thali',
  category: 'thalis',
  description: 'Steamed rice, phulkas, dal and seasonal homestyle curry.',
  isVeg: true,
  mealTiming: 'Lunch & Dinner',
  image: 'https://example.com/thali.jpg',
  isSample: true
};

const sampleDish2: Dish = {
  id: 'phulkas-kurma',
  name: 'Phulkas with Vegetable Kurma',
  category: 'breads_rice',
  description: 'Whole wheat phulkas served with spiced vegetable kurma.',
  isVeg: true,
  mealTiming: 'Dinner',
  image: 'https://example.com/phulkas.jpg',
  isSample: true
};

test('countSelectedItems sums quantities accurately', () => {
  const items: SelectionItem[] = [
    { dish: sampleDish1, quantity: 2 },
    { dish: sampleDish2, quantity: 3 }
  ];
  assert.equal(countSelectedItems(items), 5);
  assert.equal(countSelectedItems([]), 0);
});

test('generateWhatsAppEnquiryMessage does not claim an order is submitted and formats conversation politely', () => {
  const details: EnquiryDetails = {
    items: [{ dish: sampleDish1, quantity: 2 }],
    customerName: 'Sadhgun',
    notes: 'Please let me know if pickup is available this afternoon.'
  };

  const message = generateWhatsAppEnquiryMessage(details);

  // Must not claim order submitted or simulate checkout
  assert.ok(!message.includes('Total Amount'));
  assert.ok(!message.includes('Payment QR'));
  assert.ok(!message.includes('Order Placed'));

  // Must contain clear enquiry phrasing
  assert.ok(message.includes('enquire about the availability'));
  assert.ok(message.includes('Homestyle Vegetarian Thali (Qty: 2)'));
  assert.ok(message.includes('Sadhgun'));
  assert.ok(message.includes('SMR Vinay Fountainhead'));
  assert.ok(message.includes('Please let me know if pickup is available this afternoon.'));
});

test('generateWhatsAppEnquiryUrl creates a valid URL targeting verified phone number', () => {
  const details: EnquiryDetails = {
    items: [],
    customerName: 'Visitor'
  };

  const url = generateWhatsAppEnquiryUrl(details);
  assert.ok(url.startsWith('https://wa.me/918790563262?text='));
  assert.ok(url.includes('Namaste%20Purely%20Home'));
});

test('generateWhatsAppEnquiryUrl correctly handles multiple items and Telugu characters', () => {
  const details: EnquiryDetails = {
    items: [
      { dish: sampleDish1, quantity: 1 },
      { dish: sampleDish2, quantity: 4 }
    ],
    customerName: 'సుమంత్',
    notes: 'హఫీజ్‌పేట్ పికప్'
  };

  const url = generateWhatsAppEnquiryUrl(details);
  assert.ok(url.includes('918790563262'));
  assert.ok(url.includes(encodeURIComponent('సుమంత్')));
  assert.ok(url.includes(encodeURIComponent('Homestyle Vegetarian Thali (Qty: 1)')));
  assert.ok(url.includes(encodeURIComponent('Phulkas with Vegetable Kurma (Qty: 4)')));
});
