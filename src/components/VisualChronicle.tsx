import React, { useState } from 'react';
import type { Language } from '../data/translations';
import { TRANSLATIONS } from '../data/translations';

interface VisualChronicleProps {
  language: Language;
}

export const VisualChronicle: React.FC<VisualChronicleProps> = ({ language }) => {
  const [activeImage, setActiveImage] = useState<{ src: string; title: string; desc: string } | null>(null);
  const t = TRANSLATIONS[language];

  const galleryItems = [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlWAJCXR1nUVrzjTRol0I4SALZnXrb5FiXAlRAXARlpzKvM2CIURLwpjKAoZs827ZH0YVA2SMOzIetwc8xsK6h59VObpXmUAleTwmW0rpkM9SDpezCDZlHR0VPGAqFqYg0gMQJ_ZlyRIHjnMVEJF6tf4Gp85H08QdyZrq9Rb34YC-aGc0QNywkhGBop3UT1qRsOEgSXCsraSjcimfCEVgdPB4MeDg_8Pyr_KdQFKH2nlsGZ_IDy95',
      title: t.gallery.thaliTitle,
      desc: t.gallery.thaliDesc
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV5MtDj8Jr0VC_1Kub47SH5I7nIs1tERmevHyKIywJd6F9kgqigVcdP194hLH4nFT2Q6owMiwf1ZgmZZbVgaeXfkZL33iTRpnjFGsBiNY2QxPvnC84bLR62_NW4TuIRu1eW3EIaySyMZuuasTXoAKZ5lsDsiftNAScXrsKS3iaXIjcz7lTjAhtg8y7f4oQMvGva6wOrPrVXldPdviUP4JaPVYjHWNwOnIsJoOIQRM7QRRQX2f-W6XC',
      title: t.gallery.kurmaTitle,
      desc: t.gallery.kurmaDesc
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5nPZc0cFrVDQSKqtmYCadme4SK8JpX-GPwdUW19B8sA2V3XtUFtcwG8F1nQaw9f2NFxWvnruiSqCmbok7DzVYkHNL-heqFNHeKAobTiFHLcO1CqASAGS-dvCpIaA7AzXok0gU8BvhKcfKTFbPlXKrri_QbiHyfqQPkDJrKORqeKoqWNUlMoAg1CtWsPtFT0riA0YoKdsm_vlFoEAApYhLYF0mwkka6OXOkASl1UcBQIOy3mg-aENR',
      title: t.gallery.sambarTitle,
      desc: t.gallery.sambarDesc
    }
  ];

  return (
    <section id="gallery" className="w-full py-12 sm:py-16 bg-[#fff8f4]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-[#9d4225] tracking-widest uppercase">
            {t.gallery.eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#201b14] mt-1">
            {t.gallery.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#414844] mt-1.5 leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(item)}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-xs border border-[#e8dcc6] cursor-pointer group hover:-translate-y-1 hover:border-[#1a3c2c]/30 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <span className="material-symbols-outlined text-[16px] text-[#1a3c2c]">zoom_in</span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[11px] font-bold text-[#9d4225] uppercase tracking-wider block mb-1">
                  {item.title}
                </span>
                <p className="text-xs text-[#414844] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-[#fff8f4] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#e8dcc6]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-black">
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close photo preview"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-lg font-bold text-[#201b14] mb-1">
                {activeImage.title}
              </h3>
              <p className="text-sm text-[#414844] leading-relaxed">
                {activeImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
