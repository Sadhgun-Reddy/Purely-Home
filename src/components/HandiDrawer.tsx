import React, { useState } from 'react';
import type { SelectionItem } from '../utils/cart.ts';
import { generateWhatsAppEnquiryUrl } from '../utils/cart.ts';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { handleImageError } from '../utils/imageFallback.ts';

interface HandiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: SelectionItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  language: Language;
}

export const HandiDrawer: React.FC<HandiDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language
}) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [enquiryNotes, setEnquiryNotes] = useState<string>('');

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppEnquiryUrl({
      items,
      customerName,
      notes: enquiryNotes
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
                assignment
              </span>
              <div>
                <h2 className="font-serif text-lg font-bold">
                  {t.handi.title}
                </h2>
                <span className="text-[11px] text-[#ede1cb]">
                  {t.handi.subtitle}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close enquiry list"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {items.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#f8ece1] text-[#9d4225] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">assignment</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#201b14] mb-1">
                  {t.handi.emptyTitle}
                </h3>
                <p className="text-xs text-[#594e42] mb-5 leading-relaxed">
                  {t.handi.emptyDesc}
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#1a3c2c] text-white rounded-lg text-xs font-bold hover:bg-[#315342] transition-colors cursor-pointer"
                >
                  {t.handi.browseMenu}
                </button>
              </div>
            ) : (
              <>
                {/* Notice Banner */}
                <div className="p-3 bg-white rounded-xl border border-[#e8dcc6] text-xs text-[#414844] leading-relaxed">
                  <span className="font-bold text-[#201b14] block mb-0.5">
                    {t.handi.enquiryNoticeLabel}
                  </span>
                  {t.handi.disclaimer}
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.dish.id}
                      className="p-3 bg-white rounded-xl border border-[#e8dcc6] shadow-xs flex flex-col gap-2"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-16 h-16 rounded-lg object-cover border border-[#e8dcc6] shrink-0"
                          onError={handleImageError}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-serif text-xs sm:text-sm font-bold text-[#201b14] truncate">
                              {language === 'te' && item.dish.nameTe ? item.dish.nameTe : item.dish.name}
                            </h4>
                            <span className="text-[10px] font-bold text-[#9d4225] bg-[#f8ece1] px-1.5 py-0.5 rounded shrink-0">
                              {language === 'te' && item.dish.tagTe ? item.dish.tagTe : t.specials.sampleBadge}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#594e42] block mt-0.5">
                            {t.specials.priceNotice}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#e8dcc6] rounded-md bg-[#f8ece1]">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.dish.id, -1)}
                                className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#201b14] hover:bg-[#e8dcc6] cursor-pointer"
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
                                className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#201b14] hover:bg-[#e8dcc6] cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.dish.id)}
                              className="text-[11px] text-[#727973] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                            >
                              {t.handi.remove}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear List Button */}
                <div className="flex justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-[#727973] hover:text-[#ba1a1a] underline cursor-pointer"
                  >
                    {t.handi.clearList}
                  </button>
                </div>

                {/* Direct Enquiry Form */}
                <form onSubmit={handleSendEnquiry} className="space-y-4 pt-3 border-t border-[#e8dcc6]">
                  <div>
                    <label className="text-xs font-semibold text-[#201b14] block mb-1">
                      {t.handi.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t.handi.namePlaceholder}
                      className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#201b14] block mb-1">
                      {t.handi.notesLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={enquiryNotes}
                      onChange={(e) => setEnquiryNotes(e.target.value)}
                      placeholder={t.handi.notesPlaceholder}
                      className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
                    />
                  </div>

                  {/* WhatsApp Enquiry Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#9d4225] hover:bg-[#83341b] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>{t.handi.sendWhatsApp}</span>
                  </button>

                  <p className="text-[10px] text-[#727973] text-center leading-tight">
                    {t.handi.whatsappNotice}
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
