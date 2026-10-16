import React, { useState } from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';
import type { ContactEnquiryType } from '../utils/contact.ts';
import { getContactWhatsAppUrl } from '../utils/contact.ts';

interface ContactPageProps {
  language: Language;
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
  onNavigateAbout: () => void;
  onNavigateGallery: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  language,
  onNavigateHome,
  onNavigateMenu
}) => {
  const t = TRANSLATIONS[language];
  const c = t.contactPage;

  // Form mock state
  const [mockName, setMockName] = useState('');
  const [mockPhone, setMockPhone] = useState('');
  const [mockEnquiryType, setMockEnquiryType] = useState<ContactEnquiryType>('today');
  const [mockMessage, setMockMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 6000);
  };

  const directWhatsAppWithFormData = getContactWhatsAppUrl(
    {
      name: mockName || undefined,
      phone: mockPhone || undefined,
      enquiryType: mockEnquiryType,
      message: mockMessage || undefined
    },
    language
  );

  return (
    <div className="w-full bg-[#fff8f4] text-[#302a23]">
      {/* 1. EDITORIAL TOP CANVAS HEADER & BREADCRUMB */}
      <section className="bg-gradient-to-b from-[#fbf4eb] to-[#fff8f4] border-b border-[#e8dcc6]/80 pt-6 sm:pt-8 pb-8 sm:pb-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Live Kitchen Status Marquee */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-[#62584c]">
                <li>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="hover:text-[#1a3c2c] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">home</span>
                    <span>{c.breadcrumbHome}</span>
                  </button>
                </li>
                <li aria-hidden="true" className="text-[#c7baa7]">/</li>
                <li className="font-semibold text-[#1a3c2c] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">contact_support</span>
                  <span>{c.breadcrumbCurrent}</span>
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8ece1] border border-[#e8dcc6] text-[#1a3c2c] text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#9d4225] animate-pulse"></span>
              <span>{c.kitchenStatus}</span>
            </div>
          </div>

          {/* Compact Page Header Card */}
          <div className="relative bg-[#fef2e7] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#ecddcf] overflow-hidden shadow-xs">
            {/* Subtle Decorative Warm Blob */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#fe8c69]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-3xl relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9d4225] text-white text-[11px] font-bold tracking-wider uppercase font-sans shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  {c.heroEyebrow}
                </span>
                <span className="text-xs font-bold text-[#62584c] tracking-wide px-2 py-0.5 rounded-md bg-white/70 border border-[#e8dcc6]">
                  {c.heroEyebrowLocation}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a3c2c] tracking-tight leading-[1.18]">
                {c.heroTitle}
              </h1>

              <p className="font-serif italic text-base sm:text-lg text-[#9d4225] font-medium">
                {c.heroMottoTe}
              </p>

              <p className="text-sm sm:text-base text-[#62584c] leading-relaxed pt-1 max-w-2xl font-normal">
                {c.heroLead}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE PRIMARY ACTION CARDS */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Call Us Directly */}
          <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#e8dcc6] shadow-xs flex flex-col justify-between hover:border-[#1a3c2c]/40 hover:-translate-y-1 transition-all duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#f8ece1] border border-[#e8dcc6] flex items-center justify-center text-[#1a3c2c]">
                <span className="material-symbols-outlined text-[26px]">call</span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#62584c] block mb-1">
                  {c.callCard.eyebrow}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1a3c2c] tracking-tight">
                  {c.callCard.title}
                </h2>
                <p className="font-sans text-lg sm:text-xl font-bold text-[#9d4225] mt-1">
                  {c.callCard.phone}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {c.callCard.desc}
              </p>
            </div>

            <div className="pt-6">
              <a
                href={BUSINESS_CONFIG.phoneLink}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f8ece1] hover:bg-[#1a3c2c] hover:text-white text-[#1a3c2c] text-xs sm:text-sm font-bold border border-[#e8dcc6] transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                <span>{c.callCard.btn}</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Enquiry (Featured Highlight) */}
          <div className="relative bg-[#1a3c2c] text-white rounded-2xl p-6 lg:p-7 border border-[#2c4d3d] shadow-lg flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#315342]/40 rounded-full blur-xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#9d4225] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">chat</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#c5ebd5] text-[#002114] text-[10.5px] font-bold uppercase tracking-wider shadow-xs">
                  {c.whatsappCard.badge}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a9cfb9] block mb-1">
                  {c.whatsappCard.eyebrow}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {c.whatsappCard.title}
                </h2>
                <p className="font-sans text-lg sm:text-xl font-bold text-[#ffb59f] mt-1">
                  {c.whatsappCard.phone}
                </p>
                <span className="text-[11px] text-[#c6bba6] block mt-0.5 opacity-90">
                  {language === 'te'
                    ? BUSINESS_CONFIG.candidateVerificationNoticeTe
                    : BUSINESS_CONFIG.candidateVerificationNotice}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#f2e6db] leading-relaxed">
                {c.whatsappCard.desc}
              </p>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href={getWhatsAppUrl('Hello Purely Home! I would like to enquire about today’s kitchen menu and order availability.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#9d4225] hover:bg-[#85341c] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>{c.whatsappCard.btn}</span>
              </a>
            </div>
          </div>

          {/* Card 3: Visit / Direct Pickup */}
          <div className="bg-white rounded-2xl p-6 lg:p-7 border border-[#e8dcc6] shadow-xs flex flex-col justify-between hover:border-[#1a3c2c]/40 hover:-translate-y-1 transition-all duration-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#f8ece1] border border-[#e8dcc6] flex items-center justify-center text-[#9d4225]">
                <span className="material-symbols-outlined text-[26px]">pin_drop</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#62584c]">
                    {c.pickupCard.eyebrow}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#fef2e7] text-[#9d4225] text-[9.5px] font-bold uppercase border border-[#ecddcf]">
                    {c.pickupCard.tag}
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1a3c2c] tracking-tight">
                  {c.pickupCard.title}
                </h2>
                <p className="font-sans text-sm font-bold text-[#9d4225] mt-1">
                  {c.pickupCard.corridor}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
                {c.pickupCard.desc}
              </p>
            </div>

            <div className="pt-6">
              <a
                href={BUSINESS_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f8ece1] hover:bg-[#1a3c2c] hover:text-white text-[#1a3c2c] text-xs sm:text-sm font-bold border border-[#e8dcc6] transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">navigation</span>
                <span>{c.pickupCard.btn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION & CLOUD KITCHEN HUB SECTION */}
      <section className="bg-gradient-to-b from-[#fbf4eb] to-[#fff8f4] py-12 sm:py-16 border-y border-[#e8dcc6]/80">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-[11px] font-bold text-[#9d4225] uppercase tracking-wider font-semibold">
              {c.locationSection.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a3c2c] mt-1">
              {c.locationSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Full Address & Pickup Guidance */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white p-6 sm:p-8 rounded-2xl border border-[#e8dcc6] shadow-xs space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#1a3c2c]">
                  <span className="material-symbols-outlined text-[24px]">apartment</span>
                  <span className="font-serif text-lg sm:text-xl font-bold">
                    {c.locationSection.complexName}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-[#414844] space-y-0.5 leading-relaxed pl-8">
                  <p>{c.locationSection.addressLine1}</p>
                  <p>{c.locationSection.addressLine2}</p>
                  <p>{c.locationSection.addressLine3}</p>
                </div>

                {/* Landmark Notes */}
                <div className="bg-[#f8ece1] p-4 rounded-xl border border-[#e8dcc6] mt-2">
                  <div className="flex items-start gap-2.5 text-[#1a3c2c]">
                    <span className="material-symbols-outlined text-[20px] text-[#9d4225] shrink-0 mt-0.5">
                      explore
                    </span>
                    <div>
                      <span className="font-bold text-xs sm:text-sm block">
                        {c.locationSection.landmarkTitle}
                      </span>
                      <p className="text-xs text-[#62584c] mt-1 leading-relaxed">
                        {c.locationSection.landmarkDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verified Google Listing Note */}
                <div className="flex items-center gap-3 bg-[#fff8f4] p-3.5 rounded-xl border border-[#e8dcc6]">
                  <div className="w-10 h-10 rounded-full bg-[#f8ece1] flex items-center justify-center shrink-0 text-[#9d4225]">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#1a3c2c]">5.0</span>
                      <span className="text-[#9d4225] text-xs">★★★★★</span>
                      <span className="text-xs text-[#62584c] font-medium">(16 Reviews)</span>
                    </div>
                    <span className="text-[11px] text-[#727973] leading-tight">
                      {c.locationSection.googleRatingText}
                    </span>
                  </div>
                </div>

                {/* Freshness Kitchen Note */}
                <div className="p-3.5 bg-[#1a3c2c]/5 rounded-xl flex items-start gap-2 border border-[#1a3c2c]/10">
                  <span className="material-symbols-outlined text-[#1a3c2c] text-[18px] shrink-0 mt-0.5">
                    soup_kitchen
                  </span>
                  <p className="text-xs text-[#414844] leading-relaxed">
                    <strong className="text-[#1a3c2c] font-semibold">{c.locationSection.kitchenNoteLabel} </strong>
                    {c.locationSection.kitchenNoteText}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#1a3c2c] hover:bg-[#203b2e] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                >
                  <span>{c.locationSection.openMapsBtn}</span>
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Right Side: Rich Visual Map Card */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl overflow-hidden shadow-md border border-[#e8dcc6] min-h-[420px] bg-[#f8ece1] relative">
              <div
                className="w-full h-full min-h-[420px] bg-cover bg-center relative flex flex-col justify-between p-4 sm:p-6"
                style={{ backgroundImage: `url('${BUSINESS_CONFIG.mapStaticImageUrl}')` }}
              >
                {/* Visual Route Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#1a3c2c] text-xs font-bold shadow-sm border border-[#e8dcc6]">
                    <span className="w-2 h-2 rounded-full bg-[#9d4225]"></span>
                    <span>{c.locationSection.mapRadiusBadge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#62584c] text-xs font-semibold shadow-sm border border-[#e8dcc6]">
                    <span className="material-symbols-outlined text-[15px] text-[#1a3c2c]">local_shipping</span>
                    <span>{c.locationSection.mapCorridorBadge}</span>
                  </span>
                </div>

                {/* Floating Map Overlay Inset Card */}
                <div className="relative z-10 max-w-sm bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-[#e8dcc6] space-y-2">
                  <div className="flex items-center gap-1.5 text-[#9d4225]">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      location_on
                    </span>
                    <span className="font-serif text-base font-bold text-[#1a3c2c]">
                      {c.locationSection.mapCardTitle}
                    </span>
                  </div>
                  <p className="text-xs text-[#62584c] leading-relaxed">
                    {c.locationSection.mapCardSub}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#f0e6d6]">
                    <span className="text-[11px] font-bold text-[#1a3c2c]">
                      {c.locationSection.mapPickupBadge}
                    </span>
                    <a
                      href={BUSINESS_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9d4225] hover:text-[#7d351e] text-xs font-bold inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{c.locationSection.viewMapLink}</span>
                      <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Commuter Tip Bar */}
              <div className="p-4 bg-white border-t border-[#e8dcc6] flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1a3c2c] text-[20px] shrink-0">
                  directions_car
                </span>
                <p className="text-xs text-[#62584c]">
                  <strong className="text-[#1a3c2c] font-semibold">{c.locationSection.commuterTipLabel} </strong>
                  {c.locationSection.commuterTipDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CUSTOM CATERING & ENQUIRY GUIDANCE */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Guidance Highlight Banner */}
        <div className="bg-[#fef2e7] rounded-2xl p-5 sm:p-7 border border-[#ecddcf] mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3.5 max-w-3xl">
            <div className="w-10 h-10 rounded-xl bg-[#fe8c69]/20 text-[#9d4225] flex items-center justify-center shrink-0 mt-0.5 border border-[#fe8c69]/40">
              <span className="material-symbols-outlined text-[20px]">skillet</span>
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg font-bold text-[#1a3c2c] block">
                {c.guidance.bannerTitle}
              </span>
              <p className="text-xs sm:text-sm text-[#62584c] mt-1 leading-relaxed">
                {c.guidance.bannerDesc}
              </p>
            </div>
          </div>
          <a
            href={getWhatsAppUrl('Hello Purely Home! I would like to ask about custom cooking / special dietary adjustments.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#1a3c2c] hover:text-white text-[#9d4225] border border-[#e8dcc6] text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">chat</span>
            <span>{c.guidance.bannerBtn}</span>
          </a>
        </div>

        {/* Narrative & Visual Form Placeholder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f8ece1] rounded-full w-fit border border-[#e8dcc6]">
              <span className="material-symbols-outlined text-[16px] text-[#9d4225]">rate_review</span>
              <span className="text-[11px] font-bold text-[#1a3c2c] uppercase tracking-wide">
                {c.guidance.channelBadge}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a3c2c] tracking-tight leading-snug">
              {c.guidance.channelTitle}
            </h2>

            <p className="text-xs sm:text-sm text-[#62584c] leading-relaxed">
              {c.guidance.channelDesc}
            </p>

            <div className="p-5 bg-white rounded-2xl border border-[#e8dcc6] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#1a3c2c]">
                <span className="material-symbols-outlined text-[20px] text-emerald-600">verified</span>
                <span className="font-serif text-sm font-bold">{c.guidance.directAccessTitle}</span>
              </div>
              <p className="text-xs text-[#62584c] leading-relaxed">
                {c.guidance.directAccessDesc}
              </p>
            </div>
          </div>

          {/* Form Placeholder Mockup Card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#e8dcc6] shadow-sm space-y-4 relative">
            {/* Visual Design Placeholder Notice */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-[#f8ece1] px-3.5 py-2 rounded-xl border border-[#e8dcc6]">
              <div className="flex items-center gap-1.5 text-[#9d4225]">
                <span className="material-symbols-outlined text-[16px]">draw</span>
                <span className="text-xs font-bold tracking-wide">{c.guidance.placeholderBadge}</span>
              </div>
              <span className="text-[11px] text-[#62584c] font-medium">
                {c.guidance.placeholderSubtext}
              </span>
            </div>

            <form onSubmit={handleMockSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-xs font-bold text-[#1a3c2c]">
                    {c.guidance.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={mockName}
                    onChange={(e) => setMockName(e.target.value)}
                    placeholder={c.guidance.namePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff8f4] text-xs sm:text-sm text-[#201b14] border border-[#e8dcc6] focus:outline-none focus:border-[#1a3c2c]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-phone" className="text-xs font-bold text-[#1a3c2c]">
                    {c.guidance.phoneLabel}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={mockPhone}
                    onChange={(e) => setMockPhone(e.target.value)}
                    placeholder={c.guidance.phonePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff8f4] text-xs sm:text-sm text-[#201b14] border border-[#e8dcc6] focus:outline-none focus:border-[#1a3c2c]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-enquiry-type" className="text-xs font-bold text-[#1a3c2c]">
                  {c.guidance.enquiryTypeLabel}
                </label>
                <select
                  id="contact-enquiry-type"
                  value={mockEnquiryType}
                  onChange={(e) => setMockEnquiryType(e.target.value as ContactEnquiryType)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff8f4] text-xs sm:text-sm text-[#201b14] border border-[#e8dcc6] focus:outline-none focus:border-[#1a3c2c]"
                >
                  <option value="today">{c.guidance.typeToday}</option>
                  <option value="pickup">{c.guidance.typePickup}</option>
                  <option value="dietary">{c.guidance.typeDietary}</option>
                  <option value="bulk">{c.guidance.typeBulk}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-xs font-bold text-[#1a3c2c]">
                  {c.guidance.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={mockMessage}
                  onChange={(e) => setMockMessage(e.target.value)}
                  placeholder={c.guidance.messagePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#fff8f4] text-xs sm:text-sm text-[#201b14] border border-[#e8dcc6] focus:outline-none focus:border-[#1a3c2c] resize-none"
                />
              </div>

              {/* Informative Toast / Status Feedback */}
              {showToast && (
                <div className="p-3 bg-[#f8ece1] rounded-xl border border-[#9d4225]/40 text-[#1a3c2c] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#9d4225]">
                    <span className="material-symbols-outlined text-[17px]">check_circle</span>
                    <span>{c.guidance.toastSuccess}</span>
                  </div>
                  <p className="text-[#62584c] text-[11px] leading-relaxed">
                    {c.guidance.toastDetails}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#1a3c2c] hover:bg-[#203b2e] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {c.guidance.submitBtn}
                </button>

                <a
                  href={directWhatsAppWithFormData}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-[#9d4225] hover:bg-[#85341c] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>{language === 'te' ? 'నేరుగా వాట్సాప్‌లో పంపండి' : 'Send via WhatsApp'}</span>
                </a>
              </div>

              <p className="text-[11px] text-[#727973] text-center sm:text-left leading-relaxed">
                {c.guidance.disclaimer}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CONVERSION STRIP (DEEP FOREST GREEN) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="bg-gradient-to-r from-[#1a3c2c] to-[#203b2e] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none flex items-center justify-end pr-8">
            <span className="material-symbols-outlined text-[160px]">local_dining</span>
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="font-serif text-lg sm:text-xl italic text-[#ffb59f] block">
              {c.bottomCta.teluguMotto}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              {c.bottomCta.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#f2e6db] leading-relaxed">
              {c.bottomCta.desc}
            </p>

            <p className="text-[11px] text-[#c5ebd5] pt-1">
              {c.bottomCta.batchTimes}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onNavigateMenu}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#fff8f4] hover:bg-white text-[#1a3c2c] text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                <span>{c.bottomCta.menuBtn}</span>
              </button>

              <a
                href={getWhatsAppUrl('Hello Purely Home! I would like to place an order from your Hafeezpet kitchen.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9d4225] hover:bg-[#85341c] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>{c.bottomCta.whatsappBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
