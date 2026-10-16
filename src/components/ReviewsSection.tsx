import React from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { BUSINESS_CONFIG } from '../config/business.ts';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const { reputation, googleMapsUrl } = BUSINESS_CONFIG;

  return (
    <section id="reviews" className="w-full py-12 sm:py-16 bg-[#fef2e7] border-y border-[#e8dcc6]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-[#9d4225] tracking-widest uppercase">
            {t.reviews.eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#201b14] mt-1">
            {t.reviews.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#414844] mt-1.5 leading-relaxed">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Google Maps Reputation Showcase Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dcc6] shadow-sm flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-[#f8ece1] text-[#9d4225] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[30px]">rate_review</span>
          </div>

          <div className="flex items-center justify-center gap-0.5 text-[#9d4225] mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="material-symbols-outlined text-[22px]">star</span>
            ))}
          </div>

          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#201b14] mb-1">
            {reputation.rating.toFixed(1)} / 5.0
          </div>

          <div className="text-xs sm:text-sm font-semibold text-[#1a3c2c] mb-3">
            {t.reviews.ratingSubtext}
          </div>

          <p className="text-xs text-[#594e42] max-w-md mb-6 leading-relaxed bg-[#f8ece1] p-3 rounded-xl border border-[#e8dcc6]">
            {t.reviews.reverificationNote}
          </p>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a3c2c] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#315342] shadow-sm transition-all"
          >
            <span>{t.reviews.viewMapsBtn}</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  );
};
