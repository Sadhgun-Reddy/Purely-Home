import React, { useState } from 'react';
import type { Dish } from '../utils/cart.ts';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { getWhatsAppUrl } from '../config/business.ts';
import { handleImageError } from '../utils/imageFallback.ts';

interface SpecialsMenuProps {
  dishes: Dish[];
  language: Language;
  onAddToCart: (dish: Dish) => void;
  onOpenDishDetail?: (dish: Dish) => void;
  onViewFullMenu?: () => void;
}

export const SpecialsMenu: React.FC<SpecialsMenuProps> = ({
  dishes,
  language,
  onAddToCart,
  onOpenDishDetail,
  onViewFullMenu
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedDishId, setAddedDishId] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  const filteredDishes = dishes.filter((dish) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'thalis') return dish.category === 'thalis';
    if (selectedCategory === 'curries') return dish.category === 'curries';
    if (selectedCategory === 'breads_rice') return dish.category === 'breads_rice';
    if (selectedCategory === 'beverages') return dish.category === 'beverages';
    return true;
  });

  const handleAdd = (dish: Dish) => {
    onAddToCart(dish);
    setAddedDishId(dish.id);
    setTimeout(() => {
      setAddedDishId(null);
    }, 1500);
  };

  const whatsappMenuUrl = getWhatsAppUrl(
    language === 'te'
      ? 'నమస్తే ప్యూర్లీ హోమ్, నేటి తాజా మెనూ మరియు ధరల వివరాలు పంపగలరా?'
      : 'Hello Purely Home, could you please share today’s active menu and pricing?'
  );

  return (
    <section id="specials-menu" className="w-full py-12 sm:py-16 bg-[#fef2e7] border-y border-[#e8dcc6]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[11px] font-bold text-[#9d4225] tracking-widest uppercase">
              {t.specials.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#201b14] mt-1">
              {t.specials.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#414844] mt-1 max-w-xl">
              {t.specials.subtitle}
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: t.specials.tabs.all },
              { id: 'thalis', label: t.specials.tabs.thalis },
              { id: 'curries', label: t.specials.tabs.curries },
              { id: 'breads_rice', label: t.specials.tabs.breads_rice },
              { id: 'beverages', label: t.specials.tabs.beverages }
            ].map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a3c2c] text-white shadow-xs'
                      : 'bg-white text-[#414844] hover:text-[#201b14] border border-[#e8dcc6]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Development State Notice */}
        <div className="mb-8 p-3.5 sm:p-4 bg-white rounded-xl border border-[#e8dcc6] flex items-start gap-3 shadow-xs">
          <span className="material-symbols-outlined text-[#9d4225] text-[20px] shrink-0 mt-0.5">info</span>
          <div className="flex-1 text-xs text-[#414844] leading-relaxed">
            <span className="font-bold text-[#201b14] block mb-0.5">
              {language === 'te' ? 'నమూనా మెనూ గమనిక:' : 'Sample Menu Notice:'}
            </span>
            {t.specials.disclaimer}{' '}
            <a
              href={whatsappMenuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9d4225] hover:underline font-bold"
            >
              {language === 'te' ? 'వాట్సాప్‌లో సంప్రదించండి →' : 'Message on WhatsApp →'}
            </a>
          </div>
        </div>

        {/* Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => {
            const isJustAdded = addedDishId === dish.id;
            return (
              <div
                key={dish.id}
                className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#e8dcc6] flex flex-col group hover:-translate-y-1 hover:border-[#1a3c2c]/30 transition-all duration-300"
              >
                {/* Photo container */}
                <div
                  className="aspect-[16/10] overflow-hidden relative cursor-pointer bg-[#f8ece1]"
                  onClick={() => onOpenDishDetail?.(dish)}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  {dish.tag && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1a3c2c] text-white text-[10px] font-bold rounded uppercase tracking-wider shadow">
                      {language === 'te' && dish.tagTe ? dish.tagTe : dish.tag}
                    </span>
                  )}
                  {/* Veg Indicator Badge */}
                  <div className="absolute top-3 right-3 w-5 h-5 bg-white rounded-xs flex items-center justify-center p-0.5 shadow-sm border border-[#e8dcc6]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1a7f37]"></span>
                  </div>
                </div>

                {/* Dish info & details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1.5">
                      <h3
                        onClick={() => onOpenDishDetail?.(dish)}
                        className="font-serif text-base sm:text-lg font-bold text-[#201b14] group-hover:text-[#1a3c2c] transition-colors cursor-pointer"
                      >
                        {language === 'te' && dish.nameTe ? dish.nameTe : dish.name}
                      </h3>
                      {dish.price ? (
                        <span className="text-[11px] font-bold text-[#1a3c2c] shrink-0 bg-[#f8ece1] px-2 py-0.5 rounded border border-[#e8dcc6]">
                          ₹{dish.price} <span className="text-[9px] font-normal text-[#727973]">{language === 'te' ? 'నమూనా' : 'indicative'}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-[#9d4225] shrink-0 bg-[#f8ece1] px-2 py-0.5 rounded">
                          {t.specials.priceNotice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#414844] mb-4 leading-relaxed line-clamp-3">
                      {language === 'te' && dish.descriptionTe ? dish.descriptionTe : dish.description}
                    </p>
                  </div>

                  {/* Card bottom bar */}
                  <div className="pt-3 border-t border-[#f2e6db] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#594e42]">
                      {language === 'te' && dish.mealTimingTe ? dish.mealTimingTe : dish.mealTiming}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdd(dish)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer ${
                        isJustAdded
                          ? 'bg-[#1a3c2c] text-white'
                          : 'bg-[#9d4225] text-white hover:bg-[#83341b]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isJustAdded ? 'check' : 'add'}
                      </span>
                      <span>{isJustAdded ? t.specials.addedToHandi : t.specials.addToHandi}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Menu Banner */}
        {onViewFullMenu && (
          <div className="mt-8 text-center">
            <button
              onClick={onViewFullMenu}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a3c2c] hover:bg-[#254f3b] text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>{language === 'te' ? 'పూర్తి రోజువారీ మెనూ స్క్రీన్ చూడండి' : 'Explore Full Daily Menu Screen'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 p-4 sm:p-5 bg-[#f8ece1] rounded-xl border border-[#e8dcc6] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#9d4225] text-[24px] shrink-0">restaurant</span>
            <p className="text-xs sm:text-sm text-[#414844]">
              {t.specials.rotationNote}
            </p>
          </div>
          <a
            href={whatsappMenuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#1a3c2c] hover:text-[#9d4225] underline underline-offset-4 shrink-0 transition-colors"
          >
            {t.specials.joinBroadcast}
          </a>
        </div>
      </div>
    </section>
  );
};
