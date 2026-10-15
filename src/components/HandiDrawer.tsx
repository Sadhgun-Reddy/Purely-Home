import React, { useState } from 'react';
import type { CartItem } from '../utils/cart';
import {
  calculateSubtotal,
  calculatePackagingFee,
  calculateDeliveryFee,
  calculateTotal,
  generateWhatsAppOrderUrl
} from '../utils/cart';
import type { Language } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface HandiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onUpdateSpice: (dishId: string, level: 'mild' | 'medium' | 'andhra-spicy') => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  language: Language;
}

export const HandiDrawer: React.FC<HandiDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onUpdateSpice,
  onRemoveItem,
  onClearCart,
  language
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliverySlot, setDeliverySlot] = useState<string>('12:30 PM (Lunch Dispatch)');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [cookingNotes, setCookingNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const t = TRANSLATIONS[language];
  const subtotal = calculateSubtotal(items);
  const packaging = calculatePackagingFee(items);
  const deliveryFee = calculateDeliveryFee(subtotal, orderType);
  const total = calculateTotal(items, orderType);

  if (!isOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage(
        language === 'te'
          ? 'దయచేసి మీ డెలివరీ చిరునామాను నమోదు చేయండి'
          : 'Please enter your delivery address in Hafeezpet/Miyapur'
      );
      return;
    }

    setErrorMessage('');
    const url = generateWhatsAppOrderUrl({
      items,
      orderType,
      deliverySlot,
      customerName,
      customerPhone,
      deliveryAddress,
      notes: cookingNotes
    });

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#fff8f4] shadow-2xl flex flex-col border-l border-[#e8dcc6]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-[#1a3c2c] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#c5ebd5] text-[22px]">
                shopping_bag
              </span>
              <div>
                <h2 className="font-serif text-lg font-bold">
                  {t.handi.title}
                </h2>
                <span className="text-[11px] text-[#ede1cb]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your handi
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {items.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f8ece1] text-[#9d4225] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">soup_kitchen</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#201b14] mb-1">
                  {t.handi.emptyTitle}
                </h3>
                <p className="text-xs text-[#594e42] mb-5">
                  {t.handi.emptyDesc}
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#1a3c2c] text-white rounded-lg text-xs font-bold hover:bg-[#315342] transition-colors"
                >
                  {language === 'te' ? 'మెనూ చూడండి' : 'Browse Daily Specials'}
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery banner */}
                <div className="p-2.5 bg-[#f8ece1] rounded-lg border border-[#e8dcc6] text-center text-xs font-semibold text-[#1a3c2c]">
                  {subtotal >= 400 ? (
                    <span className="flex items-center justify-center gap-1 text-[#1a7f37]">
                      <span className="material-symbols-outlined text-[16px]">celebration</span>
                      <span>You qualify for FREE doorstep delivery!</span>
                    </span>
                  ) : (
                    <span>Add ₹{400 - subtotal} more to enjoy FREE delivery!</span>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.dish.id}
                      className="p-3 bg-white rounded-xl border border-[#e8dcc6] shadow-xs flex flex-col gap-2.5"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-16 h-16 rounded-lg object-cover border border-[#e8dcc6] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-serif text-xs sm:text-sm font-bold text-[#201b14] truncate">
                              {language === 'te' && item.dish.nameTe ? item.dish.nameTe : item.dish.name}
                            </h4>
                            <span className="text-xs font-bold text-[#9d4225] shrink-0">
                              ₹{item.dish.price * item.quantity}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#594e42] block">
                            ₹{item.dish.price} each
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#e8dcc6] rounded-md bg-[#f8ece1]">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.dish.id, -1)}
                                className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#201b14] hover:bg-[#e8dcc6]"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-bold text-[#201b14]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.dish.id, 1)}
                                className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#201b14] hover:bg-[#e8dcc6]"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.dish.id)}
                              className="text-[11px] text-[#727973] hover:text-[#ba1a1a] transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Spice selector for curries / thalis */}
                      <div className="pt-2 border-t border-[#f2e6db] flex items-center justify-between text-[11px]">
                        <span className="text-[#594e42] font-medium">Spice:</span>
                        <div className="flex gap-1">
                          {(['mild', 'medium', 'andhra-spicy'] as const).map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => onUpdateSpice(item.dish.id, lvl)}
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                                item.spiceLevel === lvl
                                  ? 'bg-[#1a3c2c] text-white'
                                  : 'bg-[#f8ece1] text-[#414844] hover:bg-[#e8dcc6]'
                              }`}
                            >
                              {lvl === 'mild' ? 'Mild' : lvl === 'medium' ? 'Medium' : 'Spicy 🔥'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-[#727973] hover:text-[#ba1a1a] underline"
                  >
                    Clear Handi
                  </button>
                </div>

                {/* Order Options Form */}
                <form onSubmit={handleCheckout} className="space-y-4 pt-3 border-t border-[#e8dcc6]">
                  {/* Pickup / Delivery selector */}
                  <div>
                    <label className="text-xs font-bold text-[#201b14] block mb-1.5">
                      {t.handi.orderTypeLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                          orderType === 'delivery'
                            ? 'bg-[#1a3c2c] text-white border-[#1a3c2c]'
                            : 'bg-white text-[#414844] border-[#e8dcc6]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">moped</span>
                        <span>Delivery</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('pickup')}
                        className={`p-2.5 rounded-lg text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                          orderType === 'pickup'
                            ? 'bg-[#1a3c2c] text-white border-[#1a3c2c]'
                            : 'bg-white text-[#414844] border-[#e8dcc6]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">storefront</span>
                        <span>Pickup (Free)</span>
                      </button>
                    </div>
                  </div>

                  {/* Dispatch slot */}
                  <div>
                    <label className="text-xs font-bold text-[#201b14] block mb-1">
                      {t.handi.slotLabel}
                    </label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
                    >
                      <option value="12:30 PM (Lunch Dispatch 1)">12:30 PM (Lunch Batch 1)</option>
                      <option value="1:15 PM (Lunch Dispatch 2)">1:15 PM (Lunch Batch 2)</option>
                      <option value="7:30 PM (Dinner Dispatch 1)">7:30 PM (Dinner Batch 1)</option>
                      <option value="8:15 PM (Dinner Dispatch 2)">8:15 PM (Dinner Batch 2)</option>
                    </select>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-[#201b14] block mb-1">
                        {t.handi.nameLabel}
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Sumanth"
                        className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#201b14] block mb-1">
                        {t.handi.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
                      />
                    </div>
                  </div>

                  {/* Address if delivery */}
                  {orderType === 'delivery' && (
                    <div>
                      <label className="text-xs font-semibold text-[#201b14] block mb-1">
                        {t.handi.addressLabel} *
                      </label>
                      <textarea
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Flat no., Tower name, SMR Vinay Fountainhead or Hafeezpet address..."
                        className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
                        required
                      />
                    </div>
                  )}

                  {/* Special Notes */}
                  <div>
                    <label className="text-xs font-semibold text-[#201b14] block mb-1">
                      {t.handi.specialNotesLabel}
                    </label>
                    <input
                      type="text"
                      value={cookingNotes}
                      onChange={(e) => setCookingNotes(e.target.value)}
                      placeholder="e.g. pack papad separately, less oil, mild spice"
                      className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2 text-xs text-[#ba1a1a] bg-[#ffdad6] rounded">
                      {errorMessage}
                    </div>
                  )}

                  {/* Bill Breakdown */}
                  <div className="p-3.5 bg-white rounded-xl border border-[#e8dcc6] space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#594e42]">
                      <span>{t.handi.subtotal}</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[#594e42]">
                      <span>{t.handi.packaging}</span>
                      <span>₹{packaging}</span>
                    </div>
                    <div className="flex justify-between text-[#594e42]">
                      <span>{t.handi.deliveryFee}</span>
                      <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
                    </div>
                    <div className="pt-2 border-t border-[#f2e6db] flex justify-between font-serif text-sm font-bold text-[#1a3c2c]">
                      <span>{t.handi.total}</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  {/* WhatsApp Order Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#9d4225] hover:bg-[#83341b] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>{t.handi.sendWhatsApp}</span>
                  </button>

                  <p className="text-[10px] text-[#727973] text-center leading-tight">
                    Opens WhatsApp with your structured order bill for instant confirmation with our chef.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
