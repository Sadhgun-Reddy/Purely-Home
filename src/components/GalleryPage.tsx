import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';
import { handleImageError } from '../utils/imageFallback.ts';
import {
  filterGalleryImages,
  getAvailableCategories,
  getAdjacentImageIndex,
  getGalleryWhatsAppUrl,
  type GalleryImage,
  type GalleryCategory
} from '../utils/gallery.ts';
import { GALLERY_CATEGORIES } from '../data/gallery.ts';

interface GalleryPageProps {
  images: GalleryImage[];
  language: Language;
  onNavigateHome: () => void;
  onNavigateMenu: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  images,
  language,
  onNavigateHome,
  onNavigateMenu
}) => {
  const t = TRANSLATIONS[language];
  const g = t.galleryPage;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Compute available categories that actually have images
  const availableCategories = useMemo(() => {
    return getAvailableCategories(images, GALLERY_CATEGORIES);
  }, [images]);

  // If active filter is not in available categories, reset to 'all'
  useEffect(() => {
    if (
      selectedCategory !== 'all' &&
      !availableCategories.some((cat) => cat.id === selectedCategory)
    ) {
      setSelectedCategory('all');
    }
  }, [availableCategories, selectedCategory]);

  // Filtered images list
  const filteredImages = useMemo(() => {
    return filterGalleryImages(images, selectedCategory);
  }, [images, selectedCategory]);

  // Active image in lightbox
  const currentLightboxImage =
    activeLightboxIndex !== null && filteredImages[activeLightboxIndex]
      ? filteredImages[activeLightboxIndex]
      : null;

  // Handle lightbox navigation
  const handleNextPhoto = useCallback(() => {
    if (activeLightboxIndex === null || filteredImages.length === 0) return;
    const nextIdx = getAdjacentImageIndex(activeLightboxIndex, filteredImages.length, 'next');
    setActiveLightboxIndex(nextIdx);
  }, [activeLightboxIndex, filteredImages.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activeLightboxIndex === null || filteredImages.length === 0) return;
    const prevIdx = getAdjacentImageIndex(activeLightboxIndex, filteredImages.length, 'prev');
    setActiveLightboxIndex(prevIdx);
  }, [activeLightboxIndex, filteredImages.length]);

  const handleCloseLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  // Keyboard navigation & body scroll lock when lightbox is open
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxIndex, handleCloseLightbox, handleNextPhoto, handlePrevPhoto]);

  return (
    <div className="w-full">
      {/* Top Banner / Breadcrumb & Header Section */}
      <section className="bg-gradient-to-b from-[#fbf4eb] to-[#fff8f4] border-b border-[#e8dcc6] pt-6 sm:pt-10 pb-8 sm:pb-12">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex items-center gap-2 text-xs text-[#594e42]">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-[#1a3c2c] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">home</span>
                  <span>{g.breadcrumbHome}</span>
                </button>
              </li>
              <li aria-hidden="true" className="text-[#c7baa7]">/</li>
              <li className="font-semibold text-[#1a3c2c] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">photo_library</span>
                <span>{g.breadcrumbGallery}</span>
              </li>
            </ol>
          </nav>

          {/* Heading and Intro Details */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8ece1] border border-[#e8dcc6] text-[#9d4225] text-[11px] font-bold tracking-widest uppercase mb-3">
                <span className="material-symbols-outlined text-[14px]">local_dining</span>
                <span>{g.eyebrow}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#201b14] tracking-tight leading-tight">
                {g.title}
              </h1>
              <p className="text-sm sm:text-base text-[#414844] mt-3 sm:mt-4 leading-relaxed font-sans">
                {g.subtitle}
              </p>
            </div>

            {/* Quick Contact & Info Card */}
            <div className="shrink-0 bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-[#e8dcc6] shadow-xs flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1a3c2c]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{g.badge}</span>
              </div>
              <div className="text-xs text-[#594e42] leading-tight">
                <span className="font-bold text-[#201b14] block">SMR Vinay Fountainhead</span>
                <span>Calvary Temple Road, Hafeezpet</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-[#f0e6d6]">
                <a
                  href={BUSINESS_CONFIG.phoneLink}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#f8ece1] text-[#9d4225] text-xs font-bold hover:bg-[#ede1cb] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-[15px]">call</span>
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
                <a
                  href={getWhatsAppUrl('Hello Purely Home! I have an enquiry regarding today’s meal batches.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#1a3c2c] text-white text-xs font-bold hover:bg-[#142f22] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-[15px]">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Controls & Photo Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#e8dcc6]/80">
          {/* Category Tabs */}
          <div
            role="tablist"
            aria-label="Gallery categories"
            className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none"
          >
            {availableCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? images.length
                  : images.filter((img) => img.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1a3c2c] text-[#fff8f4] shadow-sm border border-[#1a3c2c]'
                      : 'bg-white text-[#414844] border border-[#e8dcc6] hover:bg-[#fbf4eb] hover:border-[#1a3c2c]/40'
                  }`}
                >
                  {cat.icon && (
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isActive ? 'text-[#c5ebd5]' : 'text-[#9d4225]'
                      }`}
                    >
                      {cat.icon}
                    </span>
                  )}
                  <span>{language === 'te' ? cat.nameTe : cat.name}</span>
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-[#2b5943] text-white'
                        : 'bg-[#f8ece1] text-[#7d351e]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Photos count indicator */}
          <div className="text-xs text-[#594e42] font-medium shrink-0 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d4225]"></span>
            <span>
              <strong className="text-[#201b14] font-bold">{filteredImages.length}</strong>{' '}
              {g.photosCount}
            </span>
          </div>
        </div>

        {/* Gallery Image Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
            {filteredImages.map((image, index) => {
              const displayTitle =
                language === 'te' ? image.titleTe || image.title : image.title;
              const displayCaption =
                language === 'te' ? image.captionTe || image.caption : image.caption;
              const displayAlt =
                language === 'te' ? image.altTe || image.alt || displayTitle : image.alt || displayTitle;

              return (
                <div
                  key={image.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e8dcc6] shadow-xs hover:shadow-md hover:border-[#1a3c2c]/30 transition-all duration-300 flex flex-col group"
                >
                  {/* Photo Container with zoom & trigger */}
                  <div
                    onClick={() => setActiveLightboxIndex(index)}
                    className="aspect-[4/3] sm:aspect-[4/3] overflow-hidden relative bg-[#f8ece1] cursor-pointer"
                  >
                    <img
                      src={image.src}
                      alt={displayAlt}
                      loading="lazy"
                      onError={handleImageError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 pointer-events-none">
                      <span className="text-white text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>{language === 'te' ? 'పెద్దదిగా చూడండి' : 'Click to enlarge'}</span>
                      </span>
                    </div>

                    {/* Hover Zoom Icon Badge */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveLightboxIndex(index);
                      }}
                      aria-label={`${language === 'te' ? 'విస్తరించు' : 'Enlarge'} ${displayTitle}`}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#1a3c2c] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow hover:bg-white hover:scale-110 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                    </button>

                    {/* Category Label Chip */}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#201b14]/75 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase border border-white/20">
                      {image.category === 'thalis' && (language === 'te' ? 'థాలీ భోజనం' : 'Thalis')}
                      {image.category === 'curries' && (language === 'te' ? 'సాంప్రదాయ కూర' : 'Curry & Dal')}
                      {image.category === 'breads' && (language === 'te' ? 'తాజా పుల్కాలు' : 'Breads & Rice')}
                      {image.category === 'kitchen' && (language === 'te' ? 'కిచెన్ తయారీ' : 'Kitchen')}
                    </div>
                  </div>

                  {/* Card Information & Action */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#201b14] leading-snug group-hover:text-[#1a3c2c] transition-colors">
                        {displayTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#414844] mt-2 leading-relaxed">
                        {displayCaption}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-4 pt-3 border-t border-[#f0e6d6] flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveLightboxIndex(index)}
                        className="text-xs font-semibold text-[#1a3c2c] hover:text-[#9d4225] transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                        <span>{language === 'te' ? 'వివరాలు' : 'View Full'}</span>
                      </button>

                      <a
                        href={getGalleryWhatsAppUrl(image, language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f8ece1] hover:bg-[#ede1cb] text-[#9d4225] hover:text-[#7d351e] text-xs font-bold transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px]">chat</span>
                        <span>{g.enquireThisPhoto}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Graceful Empty State */
          <div className="bg-white rounded-2xl border border-[#e8dcc6] p-8 sm:p-12 text-center max-w-xl mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#f8ece1] text-[#9d4225] flex items-center justify-center mx-auto mb-4 border border-[#e8dcc6]">
              <span className="material-symbols-outlined text-3xl">photo_camera_back</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#201b14] mb-2">
              {g.emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#414844] leading-relaxed mb-6">
              {g.emptyDesc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="px-5 py-2.5 rounded-xl bg-[#1a3c2c] text-white text-xs sm:text-sm font-semibold hover:bg-[#142f22] transition-colors cursor-pointer"
              >
                {g.resetFilters}
              </button>
              <a
                href={getWhatsAppUrl('Hello Purely Home! I’d like to enquire about your available food batches and photos.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#f8ece1] text-[#9d4225] text-xs sm:text-sm font-bold hover:bg-[#ede1cb] transition-colors inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>{language === 'te' ? 'కిచెన్‌ను వాట్సాప్‌లో అడగండి' : 'Ask Kitchen on WhatsApp'}</span>
              </a>
            </div>
          </div>
        )}

        {/* Disclaimer Note */}
        <div className="mt-8 pt-6 border-t border-[#e8dcc6]/60 text-center">
          <p className="text-xs text-[#594e42] max-w-2xl mx-auto leading-relaxed">
            ℹ️ {g.sampleDisclaimer}
          </p>
        </div>

        {/* Bottom Call to Action Section (Menu & Direct Contacts) */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#1a3c2c] to-[#254b38] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/5 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-[11px] font-bold text-[#c5ebd5] tracking-widest uppercase block mb-2">
              PURELY HOME • THE CLOUD KITCHEN HAFEEZPET
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              {g.ctaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#c5ebd5]/90 leading-relaxed mb-6 sm:mb-8 font-sans max-w-2xl">
              {g.ctaDesc}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onNavigateMenu}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#f8ece1] text-[#1a3c2c] text-xs sm:text-sm font-bold shadow-md hover:bg-white hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                <span>{g.viewMenuBtn}</span>
              </button>

              <a
                href={BUSINESS_CONFIG.phoneLink}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>{g.callKitchenBtn}</span>
              </a>

              <a
                href={getWhatsAppUrl('Hello Purely Home! I saw your gallery and want to order homestyle meals today.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>{g.whatsappKitchenBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentLightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            language === 'te'
              ? `${currentLightboxImage.titleTe || currentLightboxImage.title} ఫోటో ప్రివ్యూ`
              : `${currentLightboxImage.title} photo preview`
          }
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={handleCloseLightbox}
        >
          {/* Modal Container */}
          <div
            className="bg-[#fff8f4] max-w-4xl w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#e8dcc6] flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-white border-b border-[#e8dcc6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#9d4225] bg-[#f8ece1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {currentLightboxImage.category}
                </span>
                <span className="text-xs text-[#594e42]">
                  {activeLightboxIndex! + 1} {g.lightboxOf} {filteredImages.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseLightbox}
                aria-label={g.lightboxClose}
                className="w-8 h-8 rounded-full bg-[#f8ece1] text-[#201b14] hover:bg-[#ede1cb] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Image Area with Navigation Buttons */}
            <div className="relative flex-1 bg-black/95 flex items-center justify-center min-h-[260px] sm:min-h-[420px] max-h-[62vh] overflow-hidden select-none">
              <img
                src={currentLightboxImage.src}
                alt={
                  language === 'te'
                    ? currentLightboxImage.altTe || currentLightboxImage.titleTe || currentLightboxImage.title
                    : currentLightboxImage.alt || currentLightboxImage.title
                }
                onError={handleImageError}
                className="max-w-full max-h-[60vh] object-contain"
              />

              {/* Prev Button */}
              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  aria-label={g.lightboxPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-[#1a3c2c] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
              )}

              {/* Next Button */}
              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  aria-label={g.lightboxNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 hover:bg-white text-[#1a3c2c] flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>
              )}
            </div>

            {/* Modal Caption & Actions Footer */}
            <div className="p-4 sm:p-6 bg-white border-t border-[#e8dcc6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#201b14]">
                  {language === 'te'
                    ? currentLightboxImage.titleTe || currentLightboxImage.title
                    : currentLightboxImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#414844] mt-1 leading-relaxed">
                  {language === 'te'
                    ? currentLightboxImage.captionTe || currentLightboxImage.caption
                    : currentLightboxImage.caption}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={getGalleryWhatsAppUrl(currentLightboxImage, language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a3c2c] text-white text-xs sm:text-sm font-bold hover:bg-[#142f22] transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>{g.enquireThisPhoto}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
