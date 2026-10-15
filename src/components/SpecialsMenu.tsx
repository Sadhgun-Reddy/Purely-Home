import React, { useState } from 'react';
import type { Dish } from '../utils/cart';
import type { Language } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface SpecialsMenuProps {
  dishes: Dish[];
  language: Language;
  onAddToCart: (dish: Dish) => void;
  onOpenDishDetail?: (dish: Dish) => void;
}

export const SpecialsMenu: React.FC<SpecialsMenuProps> = ({
  dishes,
  language,
  onAddToCart,
  onOpenDishDetail
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

  return (
    <section id="specials-menu" className="w-full py-12 sm:py-16 bg-[#fef2e7] border-y border-[#e8dcc6]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
                <div className="aspect-[16/10] overflow-hidden relative cursor-pointer" onClick={() => onOpenDishDetail?.(dish)}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {dish.tag && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#1a3c2c] text-white text-[10px] font-bold rounded uppercase tracking-wider shadow">
                      {dish.tag}
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
                      <span className="font-serif text-base sm:text-lg font-bold text-[#1a3c2c]">
                        ₹{dish.price}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#414844] mb-4 leading-relaxed line-clamp-3">
                      {language === 'te' && dish.descriptionTe ? dish.descriptionTe : dish.description}
                    </p>

                    {dish.ingredients && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {dish.ingredients.slice(0, 3).map((ing, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-[#f8ece1] text-[#594e42] rounded">
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card bottom bar */}
                  <div className="pt-3 border-t border-[#f2e6db] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#594e42]">
                      {dish.mealTiming}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdd(dish)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 ${
                        isJustAdded
                          ? 'bg-[#1a3c2c] text-white'
                          : 'bg-[#9d4225] text-white hover:bg-[#83341b]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isJustAdded ? 'check' : 'add_shopping_cart'}
                      </span>
                      <span>{isJustAdded ? t.specials.addedToHandi : t.specials.addToHandi}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note & Daily Customisation */}
        <div className="mt-8 p-4 sm:p-5 bg-[#f8ece1] rounded-xl border border-[#e8dcc6] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#9d4225] text-[24px] shrink-0">sync</span>
            <p className="text-xs sm:text-sm text-[#414844]">
              {t.specials.rotationNote}
            </p>
          </div>
          <a
            href="https://wa.me/918790563262?text=Hello%20Purely%20Home,%20please%20add%20me%20to%20your%20Daily%20Menu%20broadcast%20list"
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
