import React, { useState } from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReserve: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenReserve,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const whatsappGeneralUrl = getWhatsAppUrl(
    language === 'te'
      ? 'నమస్తే ప్యూర్లీ హోమ్, నేటి భోజన లభ్యత గురించి తెలుసుకోవాలనుకుంటున్నాను.'
      : 'Hello Purely Home, I would like to enquire about today’s meal availability.'
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#315342] text-[#ede1cb] py-1 px-3 sm:px-4 lg:px-12 text-xs font-medium border-b border-[#3b3525]/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-2 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1 truncate">
            <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-[#c5ebd5] shrink-0">location_on</span>
            <span className="tracking-wide truncate">
              <span className="sm:hidden">Hafeezpet, Hyderabad • Cloud Kitchen</span>
              <span className="hidden sm:inline">{t.topAnnouncement}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-[#c5ebd5]">call</span>
            <a
              href={BUSINESS_CONFIG.phoneLink}
              className="hover:text-white transition-colors underline font-semibold"
            >
              <span>{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="h-16 sm:h-20 bg-[#fff8f4]/95 backdrop-blur-xl border-b border-[#e8dcc6]/80 shadow-[0_1px_8px_rgba(48,42,35,0.06)]">
        <div className="max-w-[1200px] mx-auto h-full px-3 sm:px-4 lg:px-12 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <button
            onClick={(e) => handleNavClick('home', e)}
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group shrink-0"
            aria-label="Purely Home Home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a3c2c] text-[#c5ebd5] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px]">soup_kitchen</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold text-[#1a3c2c] tracking-tight leading-none">
                Purely Home
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold text-[#9d4225] tracking-widest uppercase mt-0.5">
                The Cloud Kitchen
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {[
              { id: 'home', label: t.nav.home },
              { id: 'menu', label: t.nav.menu },
              { id: 'about', label: t.nav.about },
              { id: 'gallery', label: t.nav.gallery },
              { id: 'reviews', label: t.nav.reviews },
              { id: 'contact', label: t.nav.contact }
            ].map((link) => {
              const isActive =
                activeSection === link.id ||
                (link.id === 'menu' && activeSection === 'specials-menu') ||
                (link.id === 'about' && activeSection === 'manifesto');
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1a3c2c] text-white shadow-xs'
                      : 'text-[#414844] hover:text-[#1a3c2c] hover:bg-[#f8ece1]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Controls: Language, WhatsApp CTA, Handi Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Pill */}
            <div className="inline-flex p-0.5 bg-[#f8ece1] rounded-full items-center border border-[#e8dcc6]">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-[#1a3c2c] shadow-[0_1px_4px_rgba(48,42,35,0.08)]'
                    : 'text-[#414844] hover:text-[#201b14]'
                }`}
              >
                <span className="sm:hidden">EN</span>
                <span className="hidden sm:inline">English</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('te')}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                  language === 'te'
                    ? 'bg-white text-[#1a3c2c] shadow-[0_1px_4px_rgba(48,42,35,0.08)]'
                    : 'text-[#414844] hover:text-[#201b14]'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Handi Cart / Selection Button with Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-[#f8ece1] text-[#1a3c2c] hover:bg-[#e8dcc6] transition-colors border border-[#e8dcc6] flex items-center justify-center cursor-pointer"
              aria-label={`Open Enquiry List with ${cartCount} items`}
              title="View your selected enquiry items"
            >
              <span className="material-symbols-outlined text-[20px]">assignment</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#9d4225] text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop WhatsApp CTA */}
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#9d4225] text-white rounded-lg text-xs font-bold hover:bg-[#83341b] transition-all shadow-[0_1px_6px_rgba(48,42,35,0.12)] active:scale-95"
            >
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span>{t.whatsappEnquiryBtn}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1a3c2c] hover:bg-[#f8ece1] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fff8f4] border-b border-[#e8dcc6] px-4 py-3 shadow-xl flex flex-col gap-2">
            {[
              { id: 'home', label: t.nav.home },
              { id: 'menu', label: t.nav.menu },
              { id: 'about', label: t.nav.about },
              { id: 'gallery', label: t.nav.gallery },
              { id: 'reviews', label: t.nav.reviews },
              { id: 'contact', label: t.nav.contact }
            ].map((link) => {
              const isActive =
                activeSection === link.id ||
                (link.id === 'menu' && activeSection === 'specials-menu') ||
                (link.id === 'about' && activeSection === 'manifesto');
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#1a3c2c] text-white'
                      : 'text-[#201b14] hover:bg-[#f8ece1]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-[#e8dcc6] flex items-center gap-2">
              <a
                href={BUSINESS_CONFIG.phoneLink}
                className="flex-1 py-2 text-center bg-[#f8ece1] text-[#1a3c2c] font-semibold text-xs rounded-lg border border-[#e8dcc6]"
              >
                {t.callKitchenBtn}
              </a>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center bg-[#9d4225] text-white font-semibold text-xs rounded-lg shadow-sm"
              >
                {t.whatsappBtnShort}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 3. Status Ticker */}
      <div className="w-full bg-[#f8ece1] border-b border-[#e3d8cd]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-12 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[#414844] text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-[#1a3c2c] shrink-0"></span>
            <span className="font-bold tracking-wide text-[#201b14] uppercase">{t.ticker.liveStatus}</span>
            <span className="hidden md:inline text-[#727973]">•</span>
            <span className="hidden md:inline text-[#414844] font-medium">{t.ticker.dispatchSlots}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-auto">
            <span className="text-[#9d4225] font-semibold hidden sm:inline">{t.ticker.preorderCutoff}</span>
            <span className="text-[#c1c8c2] hidden sm:inline">|</span>
            <button
              onClick={onOpenReserve}
              className="text-[#1a3c2c] hover:text-[#9d4225] font-bold underline underline-offset-2 transition-colors cursor-pointer"
            >
              {t.ticker.reservePortion}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
