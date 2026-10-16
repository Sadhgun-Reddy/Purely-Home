import React from 'react';
import type { Dish } from '../utils/cart.ts';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { getWhatsAppUrl } from '../config/business.ts';
import { handleImageError } from '../utils/imageFallback.ts';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish) => void;
  language: Language;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  language
}) => {
  if (!dish) return null;

  const t = TRANSLATIONS[language];

  const handleAdd = () => {
    onAddToCart(dish);
    onClose();
  };

  const directDishWhatsappUrl = getWhatsAppUrl(
    language === 'te'
      ? `నమస్తే ప్యూర్లీ హోమ్, నేడు "${dish.nameTe || dish.name}" లభ్యత మరియు ధర గురించి తెలుసుకోవాలనుకుంటున్నాను.`
      : `Hello Purely Home, I would like to enquire about the availability and price for "${dish.name}".`
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#fff8f4] max-w-lg w-full rounded-2xl shadow-2xl border border-[#e8dcc6] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] bg-[#f8ece1]">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            aria-label={language === 'te' ? 'మూసివేయండి' : 'Close modal'}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#1a3c2c] text-white text-[11px] font-bold rounded uppercase tracking-wider shadow">
            {language === 'te' && dish.tagTe ? dish.tagTe : (dish.tag || 'Sample Item')}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-white border border-[#e8dcc6] rounded-xs flex items-center justify-center p-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#1a7f37]"></span>
                </span>
                <h3 className="font-serif text-xl font-bold text-[#201b14]">
                  {language === 'te' && dish.nameTe ? dish.nameTe : dish.name}
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#594e42] block mt-1">
                {language === 'te' && dish.mealTimingTe ? dish.mealTimingTe : dish.mealTiming}
              </span>
            </div>
            <div className="flex flex-col items-end shrink-0">
              {dish.price ? (
                <div className="text-right">
                  <span className="font-serif text-lg font-bold text-[#1a3c2c]">₹{dish.price}</span>
                  <span className="text-[10px] text-[#727973] block leading-none font-medium">
                    {language === 'te' ? 'నమూనా ధర' : 'indicative'}
                  </span>
                </div>
              ) : (
                <span className="text-xs font-bold text-[#9d4225] bg-[#f8ece1] px-2.5 py-1 rounded-lg">
                  {t.dishModal.priceNotice}
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          {((language === 'te' && dish.tagsTe) || dish.tags) && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {((language === 'te' && dish.tagsTe) ? dish.tagsTe : dish.tags)!.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 bg-[#f8ece1] text-[#594e42] rounded-md border border-[#e8dcc6]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
            {language === 'te' && dish.descriptionTe ? dish.descriptionTe : dish.description}
          </p>

          <div className="p-3 bg-[#f8ece1] rounded-xl border border-[#e8dcc6] text-xs text-[#594e42] leading-relaxed">
            <span className="font-bold text-[#1a3c2c] block mb-0.5">
              {t.dishModal.kitchenInfoLabel}
            </span>
            {t.dishModal.kitchenInfoDesc}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full sm:flex-1 py-2.5 px-4 bg-[#f8ece1] text-[#1a3c2c] border border-[#e8dcc6] hover:bg-[#e8dcc6] rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
            >
              + {t.dishModal.addBtn}
            </button>

            <a
              href={directDishWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-2.5 px-4 bg-[#9d4225] hover:bg-[#83341b] text-white rounded-xl text-xs font-bold shadow-sm transition-colors text-center inline-flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>{t.dishModal.enquireBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
