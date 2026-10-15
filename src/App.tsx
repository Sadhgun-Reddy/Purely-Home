/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustPillars } from './components/TrustPillars';
import { Manifesto } from './components/Manifesto';
import { SpecialsMenu } from './components/SpecialsMenu';
import { VisualChronicle } from './components/VisualChronicle';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSpotlight } from './components/LocationSpotlight';
import { Footer } from './components/Footer';
import { HandiDrawer } from './components/HandiDrawer';
import { ReserveModal } from './components/ReserveModal';
import { QuickOrderBar } from './components/QuickOrderBar';
import { DishDetailModal } from './components/DishDetailModal';
import { DISHES } from './data/menu';
import type { Dish, CartItem } from './utils/cart';
import type { Language } from './data/translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('purely_home_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [detailDish, setDetailDish] = useState<Dish | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('purely_home_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddToCart = (dish: Dish, spice: 'mild' | 'medium' | 'andhra-spicy' = 'medium', quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.dish.id === dish.id && item.spiceLevel === spice
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { dish, quantity, spiceLevel: spice }];
    });
    showToast(
      language === 'te'
        ? `${dish.nameTe || dish.name} హండీకి చేర్చబడింది!`
        : `${dish.name} added to your Handi!`
    );
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleUpdateSpice = (dishId: string, level: 'mild' | 'medium' | 'andhra-spicy') => {
    setCartItems((prev) =>
      prev.map((item) => (item.dish.id === dishId ? { ...item, spiceLevel: level } : item))
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -140; // compensate for fixed header + batch ticker
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#201b14] flex flex-col font-sans antialiased selection:bg-[#c5ebd5] selection:text-[#1a3c2c]">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1a3c2c] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#c5ebd5]/30 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#c5ebd5]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReserve={() => setIsReserveOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content (padded for fixed header and mobile quick order bar) */}
      <main className="w-full pt-36 sm:pt-40 pb-20 md:pb-0 flex-1">
        {/* Hero Section */}
        <Hero
          language={language}
          onExploreMenu={() => handleNavigate('specials-menu')}
          onOpenReserve={() => setIsReserveOpen(true)}
        />

        {/* 3 Pillars Strip */}
        <TrustPillars language={language} />

        {/* Brand Philosophy Manifesto */}
        <Manifesto language={language} />

        {/* Featured Specials Menu */}
        <SpecialsMenu
          dishes={DISHES}
          language={language}
          onAddToCart={(dish) => handleAddToCart(dish)}
          onOpenDishDetail={(dish) => setDetailDish(dish)}
        />

        {/* Visual Chronicle Gallery */}
        <VisualChronicle language={language} />

        {/* Verified Google Reviews */}
        <ReviewsSection language={language} />

        {/* Kitchen Location & Contact Hub */}
        <LocationSpotlight language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} onNavigate={handleNavigate} />

      {/* Mobile Sticky Quick Order Bar */}
      <QuickOrderBar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        language={language}
      />

      {/* Handi Cart Slide-Over Drawer */}
      <HandiDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateSpice={handleUpdateSpice}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        language={language}
      />

      {/* Reserve Portion Modal */}
      <ReserveModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        language={language}
      />

      {/* Dish Detailed Inspection & Customization Modal */}
      <DishDetailModal
        dish={detailDish}
        onClose={() => setDetailDish(null)}
        onAddToCart={handleAddToCart}
        language={language}
      />
    </div>
  );
}
