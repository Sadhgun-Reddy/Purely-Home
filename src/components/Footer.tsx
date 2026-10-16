import React from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { BUSINESS_CONFIG } from '../config/business.ts';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = TRANSLATIONS[language];
  const { phoneLink, phoneDisplay, googleMapsUrl } = BUSINESS_CONFIG;

  return (
    <footer className="w-full bg-[#1a3c2c] text-[#ede1cb] pt-12 sm:pt-16 pb-12 sm:pb-16 border-t border-[#315342]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#315342]">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#315342] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#ede1cb] text-[20px]">soup_kitchen</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white block">Purely Home</span>
                <span className="text-[10px] font-bold text-[#c5ebd5] tracking-widest uppercase block">
                  The Cloud Kitchen
                </span>
              </div>
            </div>
            <p className="text-xs text-[#d1c5b0] leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <span className="font-serif text-sm font-bold text-white pb-1">
              {t.footer.quickLinks}
            </span>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('home')}
                className="text-left text-xs text-[#d1c5b0] hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="text-left text-xs text-[#d1c5b0] hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.menu}
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left text-xs text-[#d1c5b0] hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="text-left text-xs text-[#d1c5b0] hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.gallery}
              </button>
              <button
                onClick={() => onNavigate('reviews')}
                className="text-left text-xs text-[#d1c5b0] hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.reviews}
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left text-xs text-[#d1c5b0] hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </nav>
          </div>

          {/* Column 3: Kitchen & Order Details */}
          <div className="flex flex-col gap-3">
            <span className="font-serif text-sm font-bold text-white pb-1">
              {t.footer.kitchenDetails}
            </span>
            <p className="text-xs text-[#d1c5b0] leading-relaxed">
              SMR VINAY FOUNTAINHEAD,<br />
              Calvary Temple Road, Hafeezpet,<br />
              Miyapur, Hyderabad, Telangana 500049
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={phoneLink}
                className="text-xs text-[#c5ebd5] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>{phoneDisplay}</span>
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#d1c5b0] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">map</span>
                <span>{language === 'te' ? 'గూగుల్ మ్యాప్స్‌లో చూడండి' : 'View on Google Maps'}</span>
              </a>
            </div>
          </div>

          {/* Column 4: Notice */}
          <div className="flex flex-col gap-3">
            <span className="font-serif text-sm font-bold text-white">
              {t.footer.freshNotice}
            </span>
            <div className="p-4 bg-[#315342] rounded-xl border border-[#436654]">
              <p className="text-xs text-[#ede1cb] leading-relaxed">
                {t.footer.freshNoticeText}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="font-serif text-sm font-medium text-[#c5ebd5]">
            {t.footer.teluguEnd}
          </p>
          <p className="text-xs text-[#d1c5b0]">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
