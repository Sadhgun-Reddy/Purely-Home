import React from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';

interface LocationSpotlightProps {
  language: Language;
}

export const LocationSpotlight: React.FC<LocationSpotlightProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const { phoneLink, phoneDisplay, googleMapsUrl } = BUSINESS_CONFIG;

  const whatsappUrl = getWhatsAppUrl(
    language === 'te'
      ? 'నమస్తే ప్యూర్లీ హోమ్, కిచెన్ చిరునామా మరియు ఆర్డర్ పికప్ వివరాలు తెలుసుకోవాలనుకుంటున్నాను.'
      : 'Hello Purely Home, I would like to enquire about kitchen pickup and order arrangements.'
  );

  return (
    <section id="contact" className="w-full py-12 sm:py-16 bg-[#f8ece1]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="bg-[#1a3c2c] text-[#ede1cb] rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#315342] text-[#c5ebd5] rounded-full w-fit mb-3">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {t.contact.pill}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {t.contact.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#d1c5b0] mb-6 leading-relaxed">
                {t.contact.description}
              </p>

              {/* Physical Location Address */}
              <div className="p-4 bg-[#315342] rounded-xl mb-6 border border-[#436654]">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#c5ebd5] text-[22px] shrink-0 mt-0.5">
                    apartment
                  </span>
                  <div>
                    <span className="font-serif text-sm sm:text-base font-bold text-white block">
                      {t.contact.addressTitle}
                    </span>
                    <span className="text-xs sm:text-sm text-[#ede1cb] block mt-0.5 leading-relaxed">
                      {t.contact.addressText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={phoneLink}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#1a3c2c] rounded-lg text-xs sm:text-sm font-bold shadow-sm hover:bg-[#ede1cb] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>{phoneDisplay}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#9d4225] text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm hover:bg-[#83341b] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>{t.contact.whatsappBtn}</span>
                </a>
              </div>

              {/* Notice */}
              <p className="text-[11px] sm:text-xs text-[#d1c5b0] mt-5 italic leading-relaxed">
                {t.contact.notice}
              </p>
            </div>

            {/* Right Map Visual Tile */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-[#315342] p-2.5 rounded-2xl border border-[#436654]">
                <div
                  className="w-full h-64 lg:h-80 bg-cover bg-center rounded-xl relative overflow-hidden"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLGs6IxH-Yyo6Fj3pEhPhpd3jwQiVeZumU_AEbwDemSeQcjtyumgRBbT4HmvhwDiDfnErndk9SAZKHdSVB3NtB6IOMEKy4gpMMuR_jXWeps98BLfr4eW-cOd6WJrd5Cz3anqAyBLMKXUg6g2JuahMm5fGh7ybxFdu86l2N-hDLpbcQyC1Wy3aXWer_pdVHs5Qfr2f0rUdTc21fdrGxJz-zCbuph_bt4IP0Dz2NMbz-E6VD4V9xbZJd')`
                  }}
                >
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center p-4">
                    <div className="p-4 bg-[#fff8f4] text-[#201b14] rounded-xl shadow-xl max-w-xs text-center flex flex-col items-center border border-[#e8dcc6]">
                      <div className="w-9 h-9 rounded-full bg-[#9d4225] text-white flex items-center justify-center mb-2 shadow">
                        <span className="material-symbols-outlined text-[19px]">storefront</span>
                      </div>
                      <span className="font-serif text-sm sm:text-base font-bold block">
                        {t.contact.mapTitle}
                      </span>
                      <span className="text-xs text-[#594e42] block mt-1">
                        {t.contact.mapSubtitle}
                      </span>
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#1a3c2c] hover:text-[#9d4225] underline underline-offset-2"
                      >
                        <span>{t.contact.openMaps}</span>
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ambient decorative blur glow */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#c5ebd5]/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};
