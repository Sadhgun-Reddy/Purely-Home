import React, { useState } from 'react';
import type { Language } from '../data/translations';

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
  const [mealBatch, setMealBatch] = useState<string>('Lunch Batch (12:30 PM & 1:15 PM)');
  const [portionCount, setPortionCount] = useState<number>(2);
  const [mealType, setMealType] = useState<string>('Special Homestyle Veg Thali (₹180)');
  const [notes, setNotes] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  if (!isOpen) return null;

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🌿 *PURELY HOME – BATCH PRE-ORDER RESERVATION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Meal:* ${mealType}\n` +
      `*Batch:* ${mealBatch}\n` +
      `*Portions:* ${portionCount} Thalis\n` +
      (name ? `*Name:* ${name}\n` : '') +
      (phone ? `*Phone:* ${phone}\n` : '') +
      (notes ? `*Customisation:* ${notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Please reserve my portion before today's batch cutoff!_`;

    const url = `https://wa.me/918790563262?text=${encodeURIComponent(msg)}`;
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
              soup_kitchen
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold">
              {language === 'te' ? 'భోజన భాగాన్ని రిజర్వ్ చేసుకోండి' : 'Reserve Today’s Fresh Portion'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleReserve} className="p-5 space-y-4">
          <p className="text-xs text-[#594e42] leading-relaxed">
            {language === 'te'
              ? 'మేము పరిమిత మోతాదులోనే తాజాగా వండుతాము కాబట్టి కటాఫ్ సమయానికి ముందే మీ తాళిని రిజర్వ్ చేసుకోండి.'
              : 'Because we cook exclusively in small domestic batches to preserve purity, reserving early ensures your meal is simmered fresh for your slot.'}
          </p>

          <div>
            <label className="text-xs font-bold text-[#201b14] block mb-1">
              Select Meal & Meal Batch:
            </label>
            <select
              value={mealBatch}
              onChange={(e) => setMealBatch(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
            >
              <option value="Today's Lunch (Slot 1: 12:30 PM)">Today's Lunch (Slot 1: 12:30 PM)</option>
              <option value="Today's Lunch (Slot 2: 1:15 PM)">Today's Lunch (Slot 2: 1:15 PM)</option>
              <option value="Tonight's Dinner (Slot 1: 7:30 PM)">Tonight's Dinner (Slot 1: 7:30 PM)</option>
              <option value="Tonight's Dinner (Slot 2: 8:15 PM)">Tonight's Dinner (Slot 2: 8:15 PM)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#201b14] block mb-1">
              Preferred Meal Type:
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
            >
              <option value="Special Homestyle Veg Thali (₹180)">Special Homestyle Veg Thali (₹180)</option>
              <option value="Slow-Simmered Traditional Dal & Sambar Handi (₹140)">Traditional Dal & Sambar Handi (₹140)</option>
              <option value="Soft Phulkas with Earthen Pot Kurma (₹130)">Soft Phulkas with Kurma Pot (₹130)</option>
              <option value="Curd Rice & Phulkas Combo">Curd Rice & Phulkas Combo (₹160)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#201b14] block mb-1">
              Number of Portions:
            </label>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPortionCount(num)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                    portionCount === num
                      ? 'bg-[#1a3c2c] text-white border-[#1a3c2c]'
                      : 'bg-white text-[#414844] border-[#e8dcc6]'
                  }`}
                >
                  {num} {num === 1 ? 'Portion' : 'Portions'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-[#201b14] block mb-1">
                Your Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#201b14] block mb-1">
                Phone:
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#201b14] block mb-1">
              Dietary or Spice Notes:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Mild spice, Jain food, extra ghee"
              className="w-full text-xs p-2 rounded-lg bg-white border border-[#e8dcc6] text-[#201b14] focus:outline-none focus:border-[#1a3c2c]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#9d4225] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-[#83341b] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Reserve via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
