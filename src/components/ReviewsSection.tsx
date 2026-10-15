import React from 'react';
import { REVIEWS } from '../data/menu';
import type { Language } from '../data/translations';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  return (
    <section id="reviews" className="w-full py-12 sm:py-16 bg-[#fef2e7] border-y border-[#e8dcc6]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold text-[#9d4225] tracking-widest uppercase">
              {language === 'te' ? 'స్థానిక ప్రజల ప్రేమ' : 'VERIFIED LOCAL REPUTATION'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#201b14] mt-1">
              {language === 'te' ? 'హఫీజ్‌పేట్ నివాసితుల అనుభవాలు' : 'Loved by Hafeezpet & Miyapur Homes'}
            </h2>
            <p className="text-xs sm:text-sm text-[#414844] mt-1 max-w-xl">
              {language === 'te'
                ? 'SMR వినయ్ ఫౌంటైన్‌హెడ్ మరియు పరిసర నివాసితుల నుండి నిజమైన సమీక్షలు.'
                : 'Unbiased reviews from residential neighbours, tech professionals, and families.'}
            </p>
          </div>

          {/* Rating Summary Badge */}
          <div className="inline-flex items-center gap-3 p-3 bg-white rounded-xl border border-[#e8dcc6] shadow-xs">
            <div className="text-center px-2 border-r border-[#e8dcc6]">
              <span className="font-serif text-2xl font-bold text-[#201b14] block leading-none">5.0</span>
              <span className="text-[10px] text-[#727973] uppercase tracking-wide">Out of 5</span>
            </div>
            <div>
              <div className="flex text-[#9d4225] text-sm">
                ★★★★★
              </div>
              <span className="text-[11px] font-semibold text-[#1a3c2c]">
                16 Verified Google Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-5 sm:p-6 bg-white rounded-xl shadow-xs border border-[#e8dcc6] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-[#9d4225] text-xs">
                    {'★'.repeat(review.rating)}
                  </div>
                  <span className="text-[10px] text-[#727973] font-medium">{review.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#414844] leading-relaxed italic mb-4">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#f2e6db] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#201b14] block">{review.name}</span>
                  <span className="text-[11px] text-[#727973] block">{review.locality}</span>
                </div>
                {review.verified && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#1a3c2c] bg-[#c5ebd5] px-1.5 py-0.5 rounded">
                    <span className="material-symbols-outlined text-[12px]">check_circle</span>
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
