import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSubtotal, calculatePackagingFee, calculateDeliveryFee, calculateTotal, generateWhatsAppMessage } from './cart.ts';
import type { CartItem, Dish, OrderDetails } from './cart.ts';

const mockDish1: Dish = {
  id: 'thali-1',
  name: 'Special Homestyle Veg Thali',
  price: 180,
  category: 'thalis',
  description: 'Steamed Sona Masoori Rice, Phulkas (3), Dal Tadka',
  isVeg: true,
  mealTiming: 'Lunch & Dinner',
  image: 'https://example.com/thali.jpg'
};

const mockDish2: Dish = {
  id: 'phulka-1',
  name: 'Soft Phulkas with Earthen Pot Kurma',
  price: 130,
  category: 'breads_rice',
  description: '4 whole wheat puffed phulkas with kurma',
  isVeg: true,
  mealTiming: 'Dinner Special',
  image: 'https://example.com/phulka.jpg'
};

test('cart subtotal computes correctly for multiple quantities', () => {
  const items: CartItem[] = [
    { dish: mockDish1, quantity: 2, spiceLevel: 'medium' },
    { dish: mockDish2, quantity: 1, spiceLevel: 'mild' }
  ];
  // 180 * 2 + 130 = 490
  assert.equal(calculateSubtotal(items), 490);
});

test('packaging fee caps reasonably and handles empty cart', () => {
  assert.equal(calculatePackagingFee([]), 0);
  const items: CartItem[] = [
    { dish: mockDish1, quantity: 1, spiceLevel: 'medium' }
  ];
  assert.equal(calculatePackagingFee(items), 5);
});

test('delivery fee is 0 for pickup, 30 for low value, and free above 400', () => {
  assert.equal(calculateDeliveryFee(200, 'pickup'), 0);
  assert.equal(calculateDeliveryFee(200, 'delivery'), 30);
  assert.equal(calculateDeliveryFee(450, 'delivery'), 0);
});

test('calculateTotal sums subtotal, packaging, and delivery correctly', () => {
  const items: CartItem[] = [
    { dish: mockDish1, quantity: 1, spiceLevel: 'medium' }
  ];
  // subtotal 180 + packaging 5 + delivery 30 = 215
  assert.equal(calculateTotal(items, 'delivery'), 215);
  // for pickup: subtotal 180 + packaging 5 + delivery 0 = 185
  assert.equal(calculateTotal(items, 'pickup'), 185);
});

test('generateWhatsAppMessage contains key dish names and delivery details', () => {
  const details: OrderDetails = {
    items: [{ dish: mockDish1, quantity: 2, spiceLevel: 'andhra-spicy' }],
    orderType: 'delivery',
    deliverySlot: '12:30 PM - 1:15 PM',
    customerName: 'Aditi Rao',
    customerPhone: '9876543210',
    deliveryAddress: 'Flat 402, SMR Vinay Fountainhead, Hafeezpet',
    notes: 'Please pack ghee separately'
  };

  const message = generateWhatsAppMessage(details);
  assert.ok(message.includes('Special Homestyle Veg Thali'));
  assert.ok(message.includes('Aditi Rao'));
  assert.ok(message.includes('Flat 402, SMR Vinay Fountainhead'));
  assert.ok(message.includes('Andhra Spicy'));
  assert.ok(message.includes('Please pack ghee separately'));
});
