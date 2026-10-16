import React from 'react';
import type { Language } from '../data/translations.ts';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';

interface QuickOrderBarProps {
  onOpenCart: () => void;
  cartCount: number;
  language: Language;
}

export const QuickOrderBar: React.FC<QuickOrderBarProps> = ({
  onOpenCart,
  cartCount,
  language
}) => {
  const whatsappUrl = getWhatsAppUrl(
    language === 'te'
      ? 'నమస్తే ప్యూర్లీ హోమ్, నేటి హోమ్‌స్టైల్ భోజన లభ్యత గురించి తెలుసుకోవాలనుకుంటున్నాను.'
      : 'Hello Purely Home, I would like to enquire about today’s meal availability.'
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#fff8f4]/95 backdrop-blur-md border-t border-[#e8dcc6] p-3 shadow-lg md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-[#201b14] truncate">
            {language === 'te' ? 'హఫీజ్‌పేట్‌లో ఇంటి భోజనం' : 'Home-style food in Hafeezpet'}
          </div>
          <div className="text-[10px] text-[#594e42] truncate">
            {language === 'te'
              ? `కాల్ / వాట్సాప్: ${BUSINESS_CONFIG.phoneDisplay}`
              : `Call / WhatsApp: ${BUSINESS_CONFIG.phoneDisplay}`}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {cartCount > 0 && (
            <button
              onClick={onOpenCart}
              className="px-3 py-2 bg-[#1a3c2c] text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
              aria-label="View Enquiry List"
            >
              <span className="material-symbols-outlined text-[16px]">assignment</span>
              <span>{cartCount}</span>
            </button>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#9d4225] hover:bg-[#83341b] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>{language === 'te' ? 'వాట్సాప్' : 'WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
