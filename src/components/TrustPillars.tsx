import React from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface TrustPillarsProps {
  language: Language;
}

export const TrustPillars: React.FC<TrustPillarsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="w-full bg-[#fef2e7] py-8 sm:py-10 border-y border-[#e8dcc6]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-xs border border-[#e8dcc6] hover:border-[#1a3c2c]/30 hover:-translate-y-0.5 transition-all">
            <div className="w-11 h-11 rounded-full bg-[#315342] text-[#ede1cb] flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">skillet</span>
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#201b14] mb-1">
                {t.pillars.regionalTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                {t.pillars.regionalDesc}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-xs border border-[#e8dcc6] hover:border-[#1a3c2c]/30 hover:-translate-y-0.5 transition-all">
            <div className="w-11 h-11 rounded-full bg-[#315342] text-[#ede1cb] flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">home_pin</span>
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#201b14] mb-1">
                {t.pillars.locationTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                {t.pillars.locationDesc}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-xs border border-[#e8dcc6] hover:border-[#1a3c2c]/30 hover:-translate-y-0.5 transition-all">
            <div className="w-11 h-11 rounded-full bg-[#315342] text-[#ede1cb] flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">chat</span>
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#201b14] mb-1">
                {t.pillars.preorderTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                {t.pillars.preorderDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
