import React, { useState, useMemo } from 'react';
import type { Dish } from '../utils/cart.ts';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { MENU_CATEGORIES } from '../data/menu.ts';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business.ts';
import { getDishWhatsAppUrl } from '../utils/cart.ts';
import { handleImageError } from '../utils/imageFallback.ts';

interface MenuPageProps {
  dishes: Dish[];
  language: Language;
  onAddToCart: (dish: Dish) => void;
  onOpenDishDetail: (dish: Dish) => void;
  onNavigateHome: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  dishes,
  language,
  onAddToCart,
  onOpenDishDetail,
  onNavigateHome
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const t = TRANSLATIONS[language];
  const mp = t.menuPage;

  // Filter dishes by category and search query
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Category filter
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchNameEn = dish.name.toLowerCase().includes(query);
        const matchNameTe = dish.nameTe?.toLowerCase().includes(query) || false;
        const matchDescEn = dish.description.toLowerCase().includes(query);
        const matchDescTe = dish.descriptionTe?.toLowerCase().includes(query) || false;
        const matchTags = dish.tags?.some((t) => t.toLowerCase().includes(query)) || false;
        const matchTagsTe = dish.tagsTe?.some((t) => t.toLowerCase().includes(query)) || false;

        return matchNameEn || matchNameTe || matchDescEn || matchDescTe || matchTags || matchTagsTe;
      }

      return true;
    });
  }, [dishes, selectedCategory, searchQuery]);

  // Compute counts for categories
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: dishes.length };
    dishes.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, [dishes]);

  const handleAddDish = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(dish);
    setJustAddedId(dish.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  const handleDirectWhatsApp = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getDishWhatsAppUrl(dish, language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const generalWhatsAppUrl = getWhatsAppUrl(
    language === 'te'
      ? 'నమస్తే ప్యూర్లీ హోమ్, నేటి లంచ్ మరియు డిన్నర్ మెనూ లభ్యత గురించి తెలుసుకోవాలనుకుంటున్నాను.'
      : 'Hello Purely Home, I would like to enquire about today’s lunch & dinner menu availability in Hafeezpet.'
  );

  return (
    <div className="w-full bg-[#fff8f4] min-h-[calc(100vh-200px)] py-6 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-[#594e42] mb-6 font-medium">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#1a3c2c] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>{mp.breadcrumbHome}</span>
          </button>
          <span>/</span>
          <span className="text-[#1a3c2c] font-bold">{mp.breadcrumbMenu}</span>
        </nav>

        {/* 2. Menu Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e8dcc6]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a3c2c]/10 text-[#1a3c2c] rounded-full text-[11px] font-bold tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1a3c2c]"></span>
              <span>{mp.eyebrow}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a3c2c] tracking-tight leading-tight">
              {mp.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#414844] mt-2.5 leading-relaxed">
              {mp.subtitle}
            </p>
          </div>

          {/* Kitchen Availability Badge */}
          <div className="p-4 bg-[#f8ece1] rounded-2xl border border-[#e8dcc6] shrink-0 md:max-w-xs shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1a3c2c] mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1a7f37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1a7f37]"></span>
              </span>
              <span>{mp.liveStatus}</span>
            </div>
            <p className="text-[11px] text-[#594e42] mb-2 leading-normal">
              {language === 'te'
                ? 'SMR వినయ్ ఫౌంటైన్‌హెడ్, కల్వరి టెంపుల్ రోడ్, హఫీజ్‌పేట్'
                : 'SMR Vinay Fountainhead, Calvary Temple Rd, Hafeezpet'}
            </p>
            <a
              href={BUSINESS_CONFIG.phoneLink}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9d4225] hover:text-[#83341b] transition-colors underline"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* 3. Sample Indicative Notice Box */}
        <div className="my-6 p-4 bg-white rounded-xl border border-[#e8dcc6] flex items-start gap-3.5 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#f8ece1] text-[#9d4225] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">info</span>
          </div>
          <div className="flex-1 text-xs text-[#414844] leading-relaxed">
            <span className="font-bold text-[#1a3c2c] block text-xs sm:text-sm mb-0.5">
              {mp.indicativeNoticeTitle}
            </span>
            <span>{mp.indicativeNoticeText} </span>
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9d4225] hover:underline font-bold inline-flex items-center gap-1 ml-1"
            >
              <span>{language === 'te' ? 'నేటి మెనూ వాట్సాప్‌లో అడగండి →' : 'Ask for today’s active menu →'}</span>
            </a>
          </div>
        </div>

        {/* 4. Search and Filter Bar */}
        <div className="space-y-4 mb-8">
          {/* Search Box */}
          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#727973] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={mp.searchPlaceholder}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#e8dcc6] rounded-xl text-xs sm:text-sm text-[#201b14] placeholder-[#727973] focus:outline-none focus:border-[#1a3c2c] focus:ring-1 focus:ring-[#1a3c2c] shadow-xs transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727973] hover:text-[#201b14] p-1 cursor-pointer"
                title={mp.clearSearch}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-2">
              {MENU_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1a3c2c] text-white shadow-xs'
                        : 'bg-white text-[#414844] hover:text-[#1a3c2c] border border-[#e8dcc6] hover:bg-[#f8ece1]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {cat.icon}
                    </span>
                    <span>{language === 'te' ? cat.nameTe : cat.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#f8ece1] text-[#594e42]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#594e42] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#1a7f37]"></span>
              <span>100% Homestyle Veg</span>
            </div>
          </div>
        </div>

        {/* 5. Dishes Grid or Empty State */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const isJustAdded = justAddedId === dish.id;
              const title = language === 'te' && dish.nameTe ? dish.nameTe : dish.name;
              const altTitle = language === 'te' ? dish.name : dish.nameTe;
              const description =
                language === 'te' && dish.descriptionTe ? dish.descriptionTe : dish.description;
              const tags = language === 'te' && dish.tagsTe ? dish.tagsTe : dish.tags;

              return (
                <div
                  key={dish.id}
                  onClick={() => onOpenDishDetail(dish)}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#e8dcc6] flex flex-col group hover:-translate-y-1 hover:border-[#1a3c2c]/40 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Photo container */}
                  <div className="aspect-[16/10] overflow-hidden relative bg-[#f8ece1]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={handleImageError}
                    />

                    {/* Sample badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1a3c2c] text-[#c5ebd5] text-[10px] font-bold rounded-md uppercase tracking-wider shadow">
                      {language === 'te' && dish.tagTe ? dish.tagTe : dish.tag || mp.sampleBadge}
                    </span>

                    {/* Veg Indicator Badge */}
                    <div className="absolute top-3 right-3 w-5 h-5 bg-white rounded-xs flex items-center justify-center p-0.5 shadow-sm border border-[#e8dcc6]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1a7f37]"></span>
                    </div>

                    {/* Indicative Price pill overlay */}
                    {dish.price && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#201b14]/85 backdrop-blur-md text-white rounded-lg text-xs font-bold shadow flex items-baseline gap-1">
                        <span>₹{dish.price}</span>
                        <span className="text-[9px] font-normal text-[#ede1cb]">
                          {mp.indicativePriceSuffix}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      {/* Dish Titles */}
                      <div className="mb-2">
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1a3c2c] group-hover:text-[#9d4225] transition-colors leading-snug">
                          {title}
                        </h2>
                        {altTitle && (
                          <span className="text-xs text-[#727973] font-medium block mt-0.5">
                            {altTitle}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#414844] leading-relaxed line-clamp-3 mb-3">
                        {description}
                      </p>

                      {/* Ingredient/Feature Tags */}
                      {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium px-2 py-0.5 bg-[#f8ece1] text-[#594e42] rounded-md border border-[#e8dcc6]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="pt-3 border-t border-[#f2e6db] flex items-center gap-2">
                      {/* Primary WhatsApp Action */}
                      <button
                        type="button"
                        onClick={(e) => handleDirectWhatsApp(dish, e)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#9d4225] hover:bg-[#83341b] text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                        title="Enquire directly on WhatsApp about this dish"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        <span>{mp.enquireOnWhatsApp}</span>
                      </button>

                      {/* Secondary Add to Handi Button */}
                      <button
                        type="button"
                        onClick={(e) => handleAddDish(dish, e)}
                        className={`inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isJustAdded
                            ? 'bg-[#1a3c2c] text-white border-[#1a3c2c]'
                            : 'bg-[#f8ece1] hover:bg-[#e8dcc6] text-[#1a3c2c] border-[#e8dcc6]'
                        }`}
                        title="Add to multi-dish meal enquiry list"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isJustAdded ? 'check' : 'add'}
                        </span>
                        <span className="hidden sm:inline">
                          {isJustAdded ? mp.addedToHandi : mp.addToHandi}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-8 sm:p-12 bg-white rounded-2xl border border-[#e8dcc6] text-center max-w-lg mx-auto shadow-xs my-8">
            <div className="w-14 h-14 rounded-full bg-[#f8ece1] text-[#9d4225] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[30px]">soup_kitchen</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1a3c2c] mb-2">
              {mp.emptyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#414844] mb-6 leading-relaxed">
              {mp.emptyDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="w-full sm:w-auto px-4 py-2 bg-[#f8ece1] hover:bg-[#e8dcc6] text-[#1a3c2c] text-xs font-bold rounded-xl border border-[#e8dcc6] transition-colors cursor-pointer"
              >
                {mp.resetFilters}
              </button>
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 bg-[#9d4225] hover:bg-[#83341b] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>{mp.whatsappDirectCustom}</span>
              </a>
            </div>
          </div>
        )}

        {/* 6. Custom Gathering / Family Meal Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#1a3c2c] text-[#ede1cb] rounded-2xl border border-[#315342] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold tracking-widest text-[#c5ebd5] uppercase block mb-1">
              {language === 'te' ? 'ప్రత్యేక ఆర్డర్లు & కుటుంబ భోజనాలు' : 'HAFEEZPET RESIDENTIAL KITCHEN'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              {mp.cateringTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c5b0] leading-relaxed">
              {mp.cateringDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={BUSINESS_CONFIG.phoneLink}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#315342] hover:bg-[#3b634f] text-white rounded-xl text-xs font-bold text-center border border-[#436654] transition-all"
            >
              {mp.callUsBtn}
            </a>
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 bg-[#9d4225] hover:bg-[#83341b] text-white rounded-xl text-xs font-bold text-center shadow transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>{mp.whatsappUsBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
