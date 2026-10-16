import React, { useState } from 'react';
import type { Language } from '../data/translations.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { getWhatsAppUrl } from '../config/business.ts';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [mealType, setMealType] = useState<string>('Lunch');
  const [personCount, setPersonCount] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleEnquire = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `Namaste Purely Home,\n\n`;
    msg += `I am enquiring about meal availability at your Hafeezpet kitchen:\n`;
    msg += `• Meal: ${mealType}\n`;
    msg += `• Estimated Servings: ${personCount} person(s)\n`;
    if (name.trim()) msg += `• Name: ${name.trim()}\n`;
    if (phone.trim()) msg += `• Phone: ${phone.trim()}\n`;
    if (notes.trim()) msg += `• Message/Question: ${notes.trim()}\n`;
    msg += `\nPlease let me know today's available items, timings, and confirmation. Thank you!`;

    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-[#fff8f4] max-w-md w-full rounded-2xl shadow-2xl border border-[#e8dcc6] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#1a3c2c] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c5ebd5] text-[22px]">
              chat
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold">
              {t.reserve.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleEnquire} className="p-5 space-y-4">
          <p className="text-xs text-[#594e42] leading-relaxed">
            {t.reserve.desc}
          </p>

          <div>
            <label className="text-xs font-bold text-[#201b14] block mb-1">
              {t.reserve.mealLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Lunch', label: t.reserve.lunch },
                { id: 'Dinner', label: t.reserve.dinner }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMealType(id)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    mealType === id
                      ? 'bg-[#1a3c2c] text-white border-[#1a3c2c]'
                      : 'bg-white text-[#414844] border-[#e8dcc6]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#201b14] block mb-1">
              {t.reserve.portionsLabel}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPersonCount(num)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    personCount === num
                      ? 'bg-[#1a3c2c] text-white border-[#1a3c2c]'
                      : 'bg-white text-[#414844] border-[#e8dcc6]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-[#201b14] block mb-1">
                {t.reserve.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.reserve.namePlaceholder}
                className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#201b14] block mb-1">
                {t.reserve.phoneLabel}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.reserve.phonePlaceholder}
                className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#201b14] block mb-1">
              {t.reserve.notesLabel}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.reserve.notesPlaceholder}
              className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#9d4225] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-[#83341b] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>{t.reserve.submit}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
