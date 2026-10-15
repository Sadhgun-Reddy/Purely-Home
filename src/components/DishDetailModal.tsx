import React, { useState } from 'react';
import type { Dish } from '../utils/cart';
import type { Language } from '../data/translations';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, spice: 'mild' | 'medium' | 'andhra-spicy', quantity: number) => void;
  language: Language;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  language
}) => {
  const [spice, setSpice] = useState<'mild' | 'medium' | 'andhra-spicy'>('medium');
  const [qty, setQty] = useState<number>(1);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, spice, qty);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#fff8f4] max-w-lg w-full rounded-2xl shadow-2xl border border-[#e8dcc6] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] bg-black">
          <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          {dish.tag && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#1a3c2c] text-white text-[11px] font-bold rounded uppercase tracking-wider shadow">
              {dish.tag}
            </span>
          )}
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
                {dish.mealTiming} • {dish.servings || '1 Person'}
              </span>
            </div>
            <span className="font-serif text-2xl font-bold text-[#1a3c2c]">
              ₹{dish.price}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
            {language === 'te' && dish.descriptionTe ? dish.descriptionTe : dish.description}
          </p>

          {dish.ingredients && (
            <div className="p-3.5 bg-[#f8ece1] rounded-xl border border-[#e8dcc6]">
              <span className="text-xs font-bold text-[#1a3c2c] block mb-2">
                Pure Domestic Kitchen Ingredients:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-white text-[#414844] rounded-md border border-[#e8dcc6]">
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Spice Selection */}
          <div>
            <label className="text-xs font-bold text-[#201b14] block mb-1.5">
              Customise Spice Level:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mild', label: 'Mild (Child friendly)' },
                { id: 'medium', label: 'Medium (Balanced)' },
                { id: 'andhra-spicy', label: 'Andhra Spicy 🔥' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setSpice(lvl.id as any)}
                  className={`p-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                    spice === lvl.id
                      ? 'bg-[#1a3c2c] text-white border-[#1a3c2c]'
                      : 'bg-white text-[#414844] border-[#e8dcc6]'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add CTA */}
          <div className="pt-2 flex items-center gap-3">
            <div className="flex items-center border border-[#e8dcc6] rounded-lg bg-white p-1">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-7 h-7 flex items-center justify-center font-bold text-sm text-[#201b14] hover:bg-[#f8ece1] rounded"
              >
                -
              </button>
              <span className="px-3 font-bold text-sm text-[#201b14]">{qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="w-7 h-7 flex items-center justify-center font-bold text-sm text-[#201b14] hover:bg-[#f8ece1] rounded"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 bg-[#9d4225] hover:bg-[#83341b] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Add to Handi • ₹{dish.price * qty}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
