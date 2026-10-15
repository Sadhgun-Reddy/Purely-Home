export interface Dish {
  id: string;
  name: string;
  nameTe?: string;
  price: number;
  category: 'thalis' | 'curries' | 'breads_rice' | 'specials' | 'beverages';
  description: string;
  descriptionTe?: string;
  tag?: string;
  isVeg: boolean;
  mealTiming: string;
  image: string;
  ingredients?: string[];
  servings?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  spiceLevel: 'mild' | 'medium' | 'andhra-spicy';
  specialNote?: string;
}

export interface OrderDetails {
  items: CartItem[];
  orderType: 'delivery' | 'pickup';
  deliverySlot: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  notes?: string;
  phoneNumber?: string; // target WhatsApp phone number
}

/**
 * Calculates item subtotal
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.dish.price * item.quantity, 0);
}

/**
 * Packaging fee: ₹10 per main meal/thali container, eco-friendly food grade packaging
 */
export function calculatePackagingFee(items: CartItem[]): number {
  const totalQuantity = items.reduce((count, item) => count + item.quantity, 0);
  return totalQuantity > 0 ? Math.min(totalQuantity * 5, 25) : 0;
}

/**
 * Delivery fee calculation:
 * Pickup is ₹0.
 * In Hafeezpet / Miyapur area: Flat ₹30 (or free above ₹400).
 */
export function calculateDeliveryFee(subtotal: number, orderType: 'delivery' | 'pickup'): number {
  if (orderType === 'pickup') return 0;
  if (subtotal >= 400) return 0;
  return 30;
}

/**
 * Total payable amount
 */
export function calculateTotal(items: CartItem[], orderType: 'delivery' | 'pickup'): number {
  const subtotal = calculateSubtotal(items);
  if (subtotal === 0) return 0;
  const packaging = calculatePackagingFee(items);
  const delivery = calculateDeliveryFee(subtotal, orderType);
  return subtotal + packaging + delivery;
}

/**
 * Format Indian rupee currency
 */
export function formatCurrency(amount: number): string {
  return `₹${amount}`;
}

/**
 * Generate formatted WhatsApp message and direct click URL
 */
export function generateWhatsAppMessage(details: OrderDetails): string {
  const { items, orderType, deliverySlot, customerName, customerPhone, deliveryAddress, notes } = details;
  const subtotal = calculateSubtotal(items);
  const packaging = calculatePackagingFee(items);
  const delivery = calculateDeliveryFee(subtotal, orderType);
  const total = subtotal + packaging + delivery;

  let msg = `🌿 *PURELY HOME – ORDER REQUEST*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `*Order Type:* ${orderType === 'pickup' ? '🛍️ Kitchen Pickup (SMR Fountainhead)' : '🛵 Doorstep Delivery'}\n`;
  msg += `*Dispatch Slot:* ${deliverySlot}\n`;

  if (customerName) {
    msg += `*Name:* ${customerName}\n`;
  }
  if (customerPhone) {
    msg += `*Phone:* ${customerPhone}\n`;
  }
  if (orderType === 'delivery' && deliveryAddress) {
    msg += `*Delivery Address:* ${deliveryAddress}\n`;
  }

  msg += `\n*Selected Items:*\n`;
  items.forEach((item, index) => {
    const spiceText = item.spiceLevel === 'mild' ? 'Mild' : item.spiceLevel === 'andhra-spicy' ? 'Andhra Spicy 🔥' : 'Medium Spice';
    msg += `${index + 1}. *${item.dish.name}* x ${item.quantity} - ₹${item.dish.price * item.quantity}\n`;
    msg += `   └ Spice: ${spiceText}${item.specialNote ? ` | Note: ${item.specialNote}` : ''}\n`;
  });

  msg += `\n*Bill Summary:*\n`;
  msg += `• Subtotal: ₹${subtotal}\n`;
  msg += `• Eco-packaging: ₹${packaging}\n`;
  msg += `• Delivery: ${delivery === 0 ? 'Free' : `₹${delivery}`}\n`;
  msg += `*Total Amount:* ₹${total}\n`;

  if (notes) {
    msg += `\n*Special Instructions:* ${notes}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Please confirm today's availability and send payment QR. Thank you!_`;

  return msg;
}

export function generateWhatsAppOrderUrl(details: OrderDetails): string {
  const targetPhone = details.phoneNumber || '918790563262';
  const text = generateWhatsAppMessage(details);
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}
