/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TrustPillars } from './components/TrustPillars.tsx';
import { Manifesto } from './components/Manifesto.tsx';
import { SpecialsMenu } from './components/SpecialsMenu.tsx';
import { VisualChronicle } from './components/VisualChronicle.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { LocationSpotlight } from './components/LocationSpotlight.tsx';
import { Footer } from './components/Footer.tsx';
import { HandiDrawer } from './components/HandiDrawer.tsx';
import { ReserveModal } from './components/ReserveModal.tsx';
import { QuickOrderBar } from './components/QuickOrderBar.tsx';
import { DishDetailModal } from './components/DishDetailModal.tsx';
import { MenuPage } from './components/MenuPage.tsx';
import { GalleryPage } from './components/GalleryPage.tsx';
import { AboutUsPage } from './components/AboutUsPage.tsx';
import { ContactPage } from './components/ContactPage.tsx';
import { SAMPLE_DISHES } from './data/menu.ts';
import { GALLERY_IMAGES } from './data/gallery.ts';
import type { Dish, SelectionItem } from './utils/cart.ts';
import { countSelectedItems } from './utils/cart.ts';
import type { Language } from './data/translations.ts';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');

  // Client-side route: 'home' | 'menu' | 'gallery' | 'about' | 'contact'
  const [currentRoute, setCurrentRoute] = useState<'home' | 'menu' | 'gallery' | 'about' | 'contact'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/menu' || path.startsWith('/menu')) {
        return 'menu';
      }
      if (path === '/gallery' || path.startsWith('/gallery')) {
        return 'gallery';
      }
      if (path === '/about' || path.startsWith('/about')) {
        return 'about';
      }
      if (path === '/contact' || path.startsWith('/contact')) {
        return 'contact';
      }
    }
    return 'home';
  });

  const [selectedItems, setSelectedItems] = useState<SelectionItem[]>(() => {
    try {
      const saved = localStorage.getItem('purely_home_enquiry_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [detailDish, setDetailDish] = useState<Dish | null>(null);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/menu' || path.startsWith('/menu')) return 'menu';
      if (path === '/gallery' || path.startsWith('/gallery')) return 'gallery';
      if (path === '/about' || path.startsWith('/about')) return 'about';
      if (path === '/contact' || path.startsWith('/contact')) return 'contact';
    }
    return 'home';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync browser back/forward buttons with client-side route
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/menu' || path.startsWith('/menu')) {
        setCurrentRoute('menu');
        setActiveSection('menu');
      } else if (path === '/gallery' || path.startsWith('/gallery')) {
        setCurrentRoute('gallery');
        setActiveSection('gallery');
      } else if (path === '/about' || path.startsWith('/about')) {
        setCurrentRoute('about');
        setActiveSection('about');
      } else if (path === '/contact' || path.startsWith('/contact')) {
        setCurrentRoute('contact');
        setActiveSection('contact');
      } else {
        setCurrentRoute('home');
        setActiveSection('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title and html lang attribute dynamically
  useEffect(() => {
    document.documentElement.lang = language;
    if (currentRoute === 'menu') {
      document.title =
        language === 'te'
          ? 'రోజువారీ మెనూ | ప్యూర్లీ హోమ్ – ది క్లౌడ్ కిచెన్, హఫీజ్‌పేట్'
          : 'Daily Menu | Purely Home – The Cloud Kitchen, Hafeezpet';
    } else if (currentRoute === 'gallery') {
      document.title =
        language === 'te'
          ? 'కిచెన్ గ్యాలరీ | ప్యూర్లీ హోమ్ – ది క్లౌడ్ కిచెన్, హఫీజ్‌పేట్'
          : 'Kitchen Gallery | Purely Home – The Cloud Kitchen, Hafeezpet';
    } else if (currentRoute === 'about') {
      document.title =
        language === 'te'
          ? 'మా కథ & వంటశాల | ప్యూర్లీ హోమ్ – ది క్లౌడ్ కిచెన్, హఫీజ్‌పేట్'
          : 'About Us | Purely Home – Authentic Home-Style Cloud Kitchen, Hafeezpet';
    } else if (currentRoute === 'contact') {
      document.title =
        language === 'te'
          ? 'సంప్రదించండి & కిచెన్ హబ్ | ప్యూర్లీ హోమ్ – ది క్లౌడ్ కిచెన్, హఫీజ్‌పేట్'
          : 'Contact Us | Purely Home – Authentic Home-Style Cloud Kitchen, Hafeezpet';
    } else {
      document.title =
        language === 'te'
          ? 'ప్యూర్లీ హోమ్ – ది క్లౌడ్ కిచెన్ | హఫీజ్‌పేట్, హైదరాబాద్'
          : 'Purely Home – The Cloud Kitchen | Hafeezpet, Hyderabad';
    }
  }, [language, currentRoute]);

  // Persist selected enquiry items
  useEffect(() => {
    try {
      localStorage.setItem('purely_home_enquiry_items', JSON.stringify(selectedItems));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [selectedItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddToCart = (dish: Dish) => {
    setSelectedItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { dish, quantity: 1 }];
    });
    showToast(
      language === 'te'
        ? `${dish.nameTe || dish.name} విచారణ జాబితాకు చేర్చబడింది`
        : `${dish.name} added to enquiry list`
    );
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setSelectedItems((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as SelectionItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setSelectedItems([]);
  };

  const handleNavigate = (targetId: string) => {
    if (targetId === 'menu') {
      if (currentRoute !== 'menu') {
        window.history.pushState({}, '', '/menu');
        setCurrentRoute('menu');
      }
      setActiveSection('menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'gallery') {
      if (currentRoute !== 'gallery') {
        window.history.pushState({}, '', '/gallery');
        setCurrentRoute('gallery');
      }
      setActiveSection('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'about' || targetId === 'manifesto') {
      if (currentRoute !== 'about') {
        window.history.pushState({}, '', '/about');
        setCurrentRoute('about');
      }
      setActiveSection('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'contact') {
      if (currentRoute !== 'contact') {
        window.history.pushState({}, '', '/contact');
        setCurrentRoute('contact');
      }
      setActiveSection('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'home') {
      if (currentRoute !== 'home') {
        window.history.pushState({}, '', '/');
        setCurrentRoute('home');
      }
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'specials-menu') {
      // If user clicks specials-menu, on mobile or desktop:
      // Can scroll to specials-menu on homepage, or go to menu page
      if (currentRoute !== 'home') {
        window.history.pushState({}, '', '/');
        setCurrentRoute('home');
        setActiveSection('specials-menu');
        setTimeout(() => {
          const el = document.getElementById('specials-menu');
          if (el) {
            const yOffset = -140;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50);
      } else {
        setActiveSection('specials-menu');
        const el = document.getElementById('specials-menu');
        if (el) {
          const yOffset = -140;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
      return;
    }

    // In-page anchor on homepage (manifesto, reviews, contact)
    if (currentRoute !== 'home') {
      window.history.pushState({}, '', '/');
      setCurrentRoute('home');
      setActiveSection(targetId);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -140;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const totalSelectionCount = countSelectedItems(selectedItems);

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#201b14] flex flex-col font-sans antialiased selection:bg-[#c5ebd5] selection:text-[#1a3c2c]">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1a3c2c] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#c5ebd5]/30 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#c5ebd5]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartCount={totalSelectionCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReserve={() => setIsReserveOpen(true)}
        activeSection={
          currentRoute === 'menu'
            ? 'menu'
            : currentRoute === 'gallery'
            ? 'gallery'
            : activeSection
        }
        onNavigate={handleNavigate}
      />

      {/* Main Content (padded for fixed header and mobile quick order bar) */}
      <main className="w-full pt-36 sm:pt-40 pb-20 md:pb-0 flex-1">
        {currentRoute === 'menu' ? (
          /* Approved Dedicated Menu Page */
          <MenuPage
            dishes={SAMPLE_DISHES}
            language={language}
            onAddToCart={handleAddToCart}
            onOpenDishDetail={(dish) => setDetailDish(dish)}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : currentRoute === 'gallery' ? (
          /* Approved Dedicated Gallery Page */
          <GalleryPage
            images={GALLERY_IMAGES}
            language={language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateMenu={() => handleNavigate('menu')}
          />
        ) : currentRoute === 'about' ? (
          /* Approved Dedicated About Us Page */
          <AboutUsPage
            language={language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateMenu={() => handleNavigate('menu')}
            onNavigateGallery={() => handleNavigate('gallery')}
          />
        ) : currentRoute === 'contact' ? (
          /* Approved Dedicated Contact Page */
          <ContactPage
            language={language}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateMenu={() => handleNavigate('menu')}
            onNavigateAbout={() => handleNavigate('about')}
            onNavigateGallery={() => handleNavigate('gallery')}
          />
        ) : (
          /* Approved Homepage Experience */
          <>
            {/* Hero Section */}
            <Hero
              language={language}
              onExploreMenu={() => handleNavigate('menu')}
              onOpenReserve={() => setIsReserveOpen(true)}
            />

            {/* 3 Pillars Strip */}
            <TrustPillars language={language} />

            {/* Brand Philosophy Manifesto */}
            <Manifesto
              language={language}
              onReadFullStory={() => handleNavigate('about')}
            />

            {/* Featured Sample Specials Menu */}
            <SpecialsMenu
              dishes={SAMPLE_DISHES}
              language={language}
              onAddToCart={(dish) => handleAddToCart(dish)}
              onOpenDishDetail={(dish) => setDetailDish(dish)}
              onViewFullMenu={() => handleNavigate('menu')}
            />

            {/* Visual Chronicle Gallery */}
            <VisualChronicle
              language={language}
              onViewFullGallery={() => handleNavigate('gallery')}
            />

            {/* Google Maps Reputation Section */}
            <ReviewsSection language={language} />

            {/* Kitchen Location & Contact Hub */}
            <LocationSpotlight language={language} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer language={language} onNavigate={handleNavigate} />

      {/* Mobile Sticky Quick Order Bar */}
      <QuickOrderBar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalSelectionCount}
        language={language}
      />

      {/* Meal Enquiry List Slide-Over Drawer */}
      <HandiDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={selectedItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        language={language}
      />

      {/* Kitchen Enquiry Modal */}
      <ReserveModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        language={language}
      />

      {/* Dish Detailed Inspection Modal */}
      <DishDetailModal
        dish={detailDish}
        onClose={() => setDetailDish(null)}
        onAddToCart={handleAddToCart}
        language={language}
      />
    </div>
  );
}
