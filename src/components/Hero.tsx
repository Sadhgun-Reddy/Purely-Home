import React from 'react';
import type { Language } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  language: Language;
  onExploreMenu: () => void;
  onOpenReserve: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onExploreMenu }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="w-full pt-6 pb-10 sm:py-12 lg:py-16 bg-[#fff8f4]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Location Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f2e6db] rounded-full mb-4 border border-[#e8dcc6]">
              <span className="w-2 h-2 rounded-full bg-[#1a3c2c]"></span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#201b14]">
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#201b14] tracking-tight leading-[1.15] mb-3">
              A taste of home,<br className="hidden sm:block" /> made for your table.
            </h1>

            {/* Telugu Cultural Touchstone */}
            <p className="font-serif italic text-lg sm:text-xl text-[#9d4225] mb-3 font-medium">
              {t.hero.teluguMotto}
            </p>

            {/* Editorial Paragraph */}
            <p className="text-sm sm:text-base text-[#414844] max-w-xl mb-6 leading-relaxed">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
              <a
                href="https://wa.me/918790563262?text=Hello%20Purely%20Home,%20please%20share%20today's%20menu%20and%20order%20details"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#9d4225] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#85341c] transition-all active:scale-98 text-center"
              >
                <span className="material-symbols-outlined text-[19px]">chat</span>
                <span>{t.hero.whatsappOrder}</span>
              </a>

              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#f8ece1] text-[#1a3c2c] rounded-lg text-sm font-bold border border-[#e8dcc6] hover:bg-[#f2e6db] transition-colors cursor-pointer text-center"
              >
                <span className="material-symbols-outlined text-[19px]">restaurant_menu</span>
                <span>{t.hero.exploreMenu}</span>
              </button>
            </div>

            {/* Compact Verification & Trust Strip */}
            <div className="w-full pt-4 border-t border-[#e8dcc6] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#9d4225] text-[22px] font-fill">star</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#201b14]">{t.hero.rating}</span>
                  <span className="text-[11px] text-[#414844]">{t.hero.reviewsCount}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#1a3c2c] text-[22px]">soup_kitchen</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#201b14]">{t.hero.zeroPreservatives}</span>
                  <span className="text-[11px] text-[#414844]">{t.hero.coldPressed}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#1a3c2c] text-[22px]">moped</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#201b14]">{t.hero.localDelivery}</span>
                  <span className="text-[11px] text-[#414844]">{t.hero.quickDelivery}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Spread */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative bg-white p-2.5 rounded-2xl shadow-md border border-[#e8dcc6]">
              <div className="overflow-hidden rounded-xl aspect-[4/3] relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpH_wywcGCIShsAKxwrhzos3VMh4a4-JO_L3rwm478c1_eouEq6w9xk5s4oZ2Xj6p15mTXR0mTHgFahKEtoyWo48a1u1dCZCtVOfXruMI1CxDbHbM1ohixF48q-VYGFKXGtfRrk410ouzLV3mZoIPrY2qFZ-zEFcmFUInLg7oN2spt-EPLah9QTrqGRVgYDBxzeFLoE0BTTsws8tZYp8ZUfcQAKTkJbagLgypMiXBC2joOUZQd5pdy"
                  alt="Purely Home Authentic Indian homestyle brass thali spread"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Floating Bottom Pill Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#fff8f4]/95 backdrop-blur-md rounded-lg flex items-center justify-between shadow-sm border border-[#e8dcc6]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9d4225] animate-pulse"></span>
                    <span className="text-xs font-bold text-[#201b14]">
                      {t.hero.slowCookedBadge}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-[#1a3c2c] bg-[#c5ebd5] px-2 py-0.5 rounded uppercase tracking-wider">
                    {t.hero.limitedBatches}
                  </span>
                </div>
              </div>
            </div>
            {/* Tactile decorative backdrop square */}
            <div className="absolute -bottom-2 -right-2 -z-10 w-full h-full bg-[#f2e6db] rounded-2xl border border-[#e8dcc6]/60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
