import test from 'node:test';
import assert from 'node:assert/strict';
import { formatWhatsAppEnquiryMessage, getContactWhatsAppUrl } from './contact.ts';

test('formatWhatsAppEnquiryMessage formats English payload correctly', () => {
  const message = formatWhatsAppEnquiryMessage({
    name: 'Sravan Kumar',
    phone: '9876543210',
    enquiryType: 'dietary',
    message: 'Need low spice sambar for elderly parents'
  }, 'en');

  assert.ok(message.includes('Hello Purely Home'));
  assert.ok(message.includes('My Name: Sravan Kumar'));
  assert.ok(message.includes('Special Dietary Adjustment'));
  assert.ok(message.includes('Need low spice sambar'));
});

test('formatWhatsAppEnquiryMessage formats Telugu payload correctly', () => {
  const message = formatWhatsAppEnquiryMessage({
    name: 'స్రవణ్',
    enquiryType: 'today',
    message: 'ఈరోజు మధ్యాహ్నం భోజనం ఉందా?'
  }, 'te');

  assert.ok(message.includes('నమస్తే Purely Home'));
  assert.ok(message.includes('నా పేరు: స్రవణ్'));
  assert.ok(message.includes('నేటి మెనూ & లభ్యత'));
});

test('getContactWhatsAppUrl generates wa.me URL with phone 918790563262 and encoded query', () => {
  const url = getContactWhatsAppUrl({
    enquiryType: 'pickup'
  }, 'en');

  assert.ok(url.startsWith('https://wa.me/918790563262?text='));
  assert.ok(url.includes(encodeURIComponent('Direct Kitchen Pickup Arrangement')));
});
