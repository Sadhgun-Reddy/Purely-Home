import React from 'react';
import type { Language } from '../data/translations';

interface QuickOrderBarProps {
  onOpenCart: () => void;
  cartCount: number;
  language: Language;
}

export const QuickOrderBar: React.FC<QuickOrderBarProps> = ({
  onOpenCart,
  cartCount,
  language
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#fff8f4]/95 backdrop-blur-md border-t border-[#e8dcc6] p-3 shadow-lg md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-[#201b14] truncate">
            {language === 'te' ? 'వేడి వేడి ఇంటి భోజనం కావాలా?' : 'Craving warm ghar ka khana?'}
          </div>
          <div className="text-[10px] text-[#594e42] truncate">
            {language === 'te' ? 'హఫీజ్‌పేట్ & మియాపూర్ డెలివరీ' : 'Direct delivery & pick-up in Miyapur'}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {cartCount > 0 && (
            <button
              onClick={onOpenCart}
              className="px-3 py-2 bg-[#1a3c2c] text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span>{cartCount}</span>
            </button>
          )}

          <a
            href="https://wa.me/918790563262?text=Hello%20Purely%20Home,%20I%20would%20like%20to%20order%20food%20now."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#9d4225] hover:bg-[#83341b] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>{language === 'te' ? 'ఆర్డర్ చేయండి' : 'Quick Order'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
