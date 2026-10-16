import React from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';
import { handleImageError } from '../utils/imageFallback.ts';

interface AboutUsPageProps {
  language: Language;
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
  onNavigateGallery: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  language,
  onNavigateHome,
  onNavigateMenu,
  onNavigateGallery
}) => {
  const t = TRANSLATIONS[language];
  const a = t.aboutPage;

  const heroImageUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlWAJCXR1nUVrzjTRol0I4SALZnXrb5FiXAlRAXARlpzKvM2CIURLwpjKAoZs827ZH0YVA2SMOzIetwc8xsK6h59VObpXmUAleTwmW0rpkM9SDpezCDZlHR0VPGAqFqYg0gMQJ_ZlyRIHjnMVEJF6tf4Gp85H08QdyZrq9Rb34YC-aGc0QNywkhGBop3UT1qRsOEgSXCsraSjcimfCEVgdPB4MeDg_8Pyr_KdQFKH2nlsGZ_IDy95';

  return (
    <div className="w-full bg-[#fff8f4] text-[#302a23]">
      {/* SECTION 1: HEADER & BREADCRUMB STRIP */}
      <section className="bg-gradient-to-b from-[#fbf4eb] to-[#fff8f4] border-b border-[#e8dcc6]/80 pt-6 sm:pt-8 pb-8 sm:pb-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex items-center gap-2 text-xs text-[#62584c]">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#315342] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">home</span>
                  <span>{a.breadcrumbHome}</span>
                </button>
              </li>
              <li aria-hidden="true" className="text-[#c7baa7]">/</li>
              <li className="font-semibold text-[#315342] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">info</span>
                <span>{a.breadcrumbAbout}</span>
              </li>
            </ol>
          </nav>

          {/* Hero Story Header & Narrative Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & Editorial Narrative */}
            <div className="lg:col-span-7 space-y-4">
              {/* Terracotta Pill Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef2e7] border border-[#ecddcf] text-[#b95738] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#b95738]"></span>
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase font-sans">
                  {a.eyebrow}
                </span>
              </div>

              {/* Editorial Headlines */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.18] font-bold text-[#302a23] tracking-tight">
                  {a.title}
                </h1>
                <p className="font-serif italic text-base sm:text-lg text-[#b95738] font-medium leading-relaxed">
                  {a.subtitleTe}
                </p>
              </div>

              {/* Narrative Lead Paragraph */}
              <p className="text-sm sm:text-base leading-[1.7] text-[#62584c] font-normal">
                {a.leadParagraph}
              </p>

              {/* Quick Trust Highlights */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-[#315342]">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8dcc6] shadow-xs">
                  <span className="material-symbols-outlined text-[18px] text-[#b95738]">verified</span>
                  <span>Hafeezpet Cloud Kitchen</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8dcc6] shadow-xs">
                  <span className="material-symbols-outlined text-[18px] text-[#315342]">eco</span>
                  <span>Pure Ghee & Cold-Pressed</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8dcc6] shadow-xs">
                  <span className="material-symbols-outlined text-[18px] text-[#b95738]">lock_clock</span>
                  <span>Limited Small Batches</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentically Framed Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#e8dcc6]/90 bg-[#fef2e7] group">
                <img
                  src={heroImageUrl}
                  alt={
                    language === 'te'
                      ? 'సాంప్రదాయ ఇంటి భోజనం థాలీ అరటి ఆకుపై'
                      : 'Traditional South Indian homestyle lunch thali laid on banana leaf'
                  }
                  onError={handleImageError}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Sample Presentation Badge */}
                <div className="absolute bottom-3 left-3 bg-[#201b14]/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-[#fff8f4] text-[11px] font-semibold tracking-wide shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#fe8c69] animate-pulse"></span>
                  <span>{a.heroBadge}</span>
                </div>

                {/* Kitchen Location Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[#315342] text-[10px] font-bold tracking-wider uppercase shadow-xs border border-[#e8dcc6]">
                  SMR Vinay Fountainhead
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE KITCHEN PHILOSOPHY & PULL QUOTE */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#fef2e7] border border-[#ecddcf] space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-[11px] font-bold text-[#b95738] tracking-[0.16em] uppercase">
                {a.philosophyEyebrow}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#302a23] leading-snug">
                {a.philosophyHeadline}
              </h2>
            </div>
            <div className="shrink-0">
              <span className="material-symbols-outlined text-4xl sm:text-5xl text-[#b95738]/40">
                format_quote
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-[1.75] text-[#62584c] max-w-3xl">
            {a.philosophyText}
          </p>

          {/* Pull Quote Box */}
          <div className="p-5 sm:p-6 bg-white/80 backdrop-blur-xs rounded-2xl border-l-4 border-[#b95738] shadow-xs">
            <p className="font-serif italic text-base sm:text-lg text-[#302a23] leading-relaxed">
              {a.pullQuote}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUR GUIDING KITCHEN PRINCIPLES */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-[#e8dcc6]/70">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold text-[#b95738] tracking-widest uppercase">
            OUR PROMISES & STANDARDS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#302a23] mt-2">
            {a.pillarsHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#62584c] mt-2">
            {a.pillarsSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Principle 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dcc6] shadow-xs hover:border-[#315342]/40 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fef2e7] text-[#b95738] border border-[#ecddcf] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">palette</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#302a23] mb-2">
                {a.p1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {a.p1Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f8ece1] flex items-center gap-1.5 text-[11px] font-bold text-[#315342] uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>100% Wholesome Color & Flavor</span>
            </div>
          </div>

          {/* Principle 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dcc6] shadow-xs hover:border-[#315342]/40 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fef2e7] text-[#315342] border border-[#ecddcf] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">grain</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#302a23] mb-2">
                {a.p2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {a.p2Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f8ece1] flex items-center gap-1.5 text-[11px] font-bold text-[#315342] uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Daily Stone Mortar Roasting</span>
            </div>
          </div>

          {/* Principle 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dcc6] shadow-xs hover:border-[#315342]/40 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fef2e7] text-[#b95738] border border-[#ecddcf] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">local_dining</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#302a23] mb-2">
                {a.p3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {a.p3Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f8ece1] flex items-center gap-1.5 text-[11px] font-bold text-[#315342] uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Zero Reheated Frying Oils</span>
            </div>
          </div>

          {/* Principle 4 */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dcc6] shadow-xs hover:border-[#315342]/40 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fef2e7] text-[#315342] border border-[#ecddcf] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[26px]">timer</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#302a23] mb-2">
                {a.p4Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {a.p4Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#f8ece1] flex items-center gap-1.5 text-[11px] font-bold text-[#315342] uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Controlled Small-Pot Simmering</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE DAILY KITCHEN RHYTHM */}
      <section className="bg-gradient-to-b from-[#fbf4eb] to-[#fff8f4] py-12 sm:py-16 border-y border-[#e8dcc6]/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-[11px] font-bold text-[#b95738] tracking-widest uppercase">
              CULINARY TIMELINE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#302a23] mt-2">
              {a.rhythmHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#62584c] mt-2">
              {a.rhythmSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8dcc6] shadow-xs relative">
              <div className="inline-block px-3 py-1 rounded-full bg-[#f8ece1] text-[#b95738] font-bold text-xs mb-3">
                {a.r1Time}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#302a23] mb-2">
                {a.r1Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {a.r1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8dcc6] shadow-xs relative">
              <div className="inline-block px-3 py-1 rounded-full bg-[#f8ece1] text-[#315342] font-bold text-xs mb-3">
                {a.r2Time}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#302a23] mb-2">
                {a.r2Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {a.r2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e8dcc6] shadow-xs relative">
              <div className="inline-block px-3 py-1 rounded-full bg-[#f8ece1] text-[#b95738] font-bold text-xs mb-3">
                {a.r3Time}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#302a23] mb-2">
                {a.r3Title}
              </h3>
              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {a.r3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: KITCHEN LOCATION & NEIGHBORHOOD ROOTS */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-bold text-[#b95738] tracking-widest uppercase">
              LOCAL CONNECTION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#302a23]">
              {a.locationHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#62584c] leading-relaxed">
              {a.locationDesc}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onNavigateMenu}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#315342] hover:bg-[#203b2e] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                <span>{a.viewMenuBtn}</span>
              </button>

              <button
                type="button"
                onClick={onNavigateGallery}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#f8ece1] text-[#315342] border border-[#e8dcc6] text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">photo_library</span>
                <span>{a.viewGalleryBtn}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#e8dcc6] shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#315342] uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{a.kitchenCardTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                {a.kitchenAddress}
              </p>
              <div className="pt-3 border-t border-[#f0e6d6] flex flex-col sm:flex-row gap-3">
                <a
                  href={BUSINESS_CONFIG.phoneLink}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f8ece1] text-[#b95738] font-bold text-xs hover:bg-[#ede1cb] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>{a.kitchenPhone}</span>
                </a>
                <a
                  href={getWhatsAppUrl('Hello Purely Home! I read your story and want to enquire about meals.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#315342] text-white font-bold text-xs hover:bg-[#203b2e] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BOTTOM CALL TO ACTION STRIP */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="bg-gradient-to-r from-[#315342] to-[#203b2e] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] font-bold text-[#e8dcc6] tracking-widest uppercase block mb-2">
              AUTHENTIC HOME-STYLE CLOUD KITCHEN • HAFEEZPET
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              {a.ctaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#e8dcc6]/90 leading-relaxed mb-6 font-sans">
              {a.ctaDesc}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onNavigateMenu}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#fff8f4] text-[#315342] text-xs sm:text-sm font-bold shadow-md hover:bg-white transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                <span>{a.viewMenuBtn}</span>
              </button>

              <a
                href={BUSINESS_CONFIG.phoneLink}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>{a.callKitchenBtn}</span>
              </a>

              <a
                href={getWhatsAppUrl('Hello Purely Home! I would like to order homestyle food today.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>{a.whatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
