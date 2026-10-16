import React from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface ManifestoProps {
  language: Language;
  onReadFullStory?: () => void;
}

export const Manifesto: React.FC<ManifestoProps> = ({ language, onReadFullStory }) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="manifesto" className="w-full py-12 sm:py-16 bg-[#fff8f4]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Philosophy Narrative */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[11px] font-bold text-[#9d4225] tracking-widest uppercase mb-2">
              {t.manifesto.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#201b14] mb-4 leading-tight">
              {t.manifesto.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#414844] mb-6 leading-relaxed">
              {t.manifesto.paragraph}
            </p>

            {/* Residential Kitchen Box */}
            <div className="p-5 bg-[#f8ece1] rounded-xl border border-[#e8dcc6]">
              <div className="flex items-center gap-2 text-[#1a3c2c] mb-1.5">
                <span className="material-symbols-outlined text-[22px]">apartment</span>
                <span className="text-sm font-bold">{t.manifesto.transparentTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                {t.manifesto.transparentDesc}
              </p>
            </div>

            {onReadFullStory && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={onReadFullStory}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#9d4225] hover:text-[#7d351e] transition-colors cursor-pointer"
                >
                  <span>{language === 'te' ? 'మా పూర్తి కథ & వంటశాల వివరాలు చదవండి →' : 'Read Our Full Story & Philosophy →'}</span>
                </button>
              </div>
            )}
          </div>

          {/* 3 Pillars Grid */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Pillar 1 */}
            <div className="p-5 sm:p-6 bg-white rounded-xl shadow-xs border border-[#e8dcc6] flex flex-col sm:flex-row gap-4 items-start hover:border-[#1a3c2c]/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#1a3c2c] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#201b14] mb-1">
                  {t.manifesto.pillar1Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                  {t.manifesto.pillar1Desc}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 sm:p-6 bg-white rounded-xl shadow-xs border border-[#e8dcc6] flex flex-col sm:flex-row gap-4 items-start hover:border-[#1a3c2c]/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#9d4225] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">schedule</span>
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#201b14] mb-1">
                  {t.manifesto.pillar2Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                  {t.manifesto.pillar2Desc}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 sm:p-6 bg-white rounded-xl shadow-xs border border-[#e8dcc6] flex flex-col sm:flex-row gap-4 items-start hover:border-[#1a3c2c]/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#3b3525] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#201b14] mb-1">
                  {t.manifesto.pillar3Title}
                </h3>
                <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                  {t.manifesto.pillar3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
