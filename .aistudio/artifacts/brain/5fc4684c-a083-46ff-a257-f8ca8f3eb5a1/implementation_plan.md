# Implementation Plan: Purely Home Menu Screen

Implement the approved **Purely Home Menu Screen** based on the Stitch design references while retaining the established warm cream, forest-green, and terracotta brand aesthetic, bilingual Telugu & English localisation, and cloud kitchen contact-based ordering workflow.

---

## User Review & Alignment Highlights

Based on your clarifying choices:
1. **Routing:** Client-side URL routing (`/` for Homepage, `/menu` for the Menu screen) using HTML5 `history.pushState` and `popstate` event listeners so the browser back/forward buttons work seamlessly without a heavy router dependency.
2. **Pricing & Badges:** Sample indicative prices (₹180, ₹140, ₹130, ₹135, ₹95, ₹50) clearly badged as *"Sample Representation"* / *"నమూనా వంటకం"* with explicit disclaimers that daily menu & availability are confirmed live on WhatsApp.
3. **Dish CTA Actions:** Primary action button directly opens WhatsApp with a dish-specific pre-filled enquiry message, alongside an "Add to Handi" button for compiling multi-dish meal enquiries into the drawer.

---

## Proposed Changes

### 1. Central Menu Data Architecture
#### File: `src/data/menu.ts` & `src/utils/cart.ts`
- Enhance the `Dish` interface and menu dataset:
  - `id`: Unique stable slug (e.g. `homestyle-veg-thali`, `traditional-dal-sambar`, `phulkas-kurma`, `telangana-tomato-pappu`, `perugu-annam`, `filter-coffee`)
  - `name` & `nameTe`: Bilingual names
  - `description` & `descriptionTe`: Bilingual homestyle descriptions
  - `category`: Category identifiers (`all`, `thalis`, `curries`, `breads_rice`, `beverages`, `specials`)
  - `price`: Indicative number in INR (e.g. 180, 140, 130, 135, 95, 50)
  - `isSample`: Boolean flag ensuring "Sample Dish" warning badge is always visible
  - `tags` & `tagsTe`: Ingredient & preparation highlights (e.g., `['Sona Masoori Rice', 'Whole Wheat Atta', 'Toor Dal']`)
  - `image`: Authentic food imagery
  - `isVeg`: Boolean dietary indicator with standard green vegetarian badge
- Add category taxonomy definitions for filtering:
  - English: `All Items`, `Thalis`, `Curries & Dal`, `Breads & Rice`, `Beverages`
  - Telugu: `అన్నీ`, `తాళి భోజనం`, `కూరలు & పప్పు`, `పుల్కాలు & అన్నం`, `పానీయాలు`
- Add empty-state fallback helper if dishes in a category are unavailable.

---

### 2. Client-Side Page Routing Integration
#### File: `src/App.tsx`
- Add a lightweight, robust client-side route manager:
  - Track current pathname (`/` vs `/menu`) using `window.location.pathname` and `window.history.pushState`.
  - Handle browser back and forward navigation via `popstate` listener.
  - Smooth page transitions and auto-scroll to top on route navigation.
  - Maintain shared header, announcement ticker, language state (`en` / `te`), Handi enquiry drawer, and footer across all pages.
- Update page `<title>` and OpenGraph/Meta tags dynamically based on active route and selected language:
  - Menu EN: `Sample Daily Menu | Purely Home – The Cloud Kitchen, Hafeezpet`
  - Menu TE: `నమూనా మెనూ | ప్యూర్లీ హోమ్ – ది క్లౌడ్ కిచెన్, హఫీజ్‌పేట్`

---

### 3. Header & Navigation Updates
#### File: `src/components/Header.tsx`
- Highlight the active route indicator (`Home` vs `Sample Menu`).
- Support navigating directly between `/` (Home) and `/menu` (Menu).
- Ensure mobile navigation drawer links work across both routes and close properly when tapped.
- Preserve language toggle (`EN` / `తెలుగు`) state across page switches.

---

### 4. Dedicated Menu Page Component
#### File: `src/components/MenuPage.tsx` (New)
- **Menu Hero Header:**
  - Category breadcrumbs (`Home / Daily Menu`)
  - Section title: *"Homestyle Culinary Offerings"* / *"ఇంటి భోజన వంటకాలు"*
  - Subtitle explaining that dishes are prepared fresh daily in limited home batches at SMR Vinay Fountainhead, Hafeezpet.
  - Live status indicator with kitchen operating hours & WhatsApp cutoff.
- **Interactive Category Filter Bar:**
  - Sticky / prominent category tab pills with active highlight.
  - Count badges for each category (e.g., `All (6)`, `Thalis (1)`, `Curries (2)`).
  - Search / quick dish filter input for immediate keyword lookups.
- **Dish Grid:**
  - Responsive multi-column layout (1 col mobile, 2 col tablet, 3 col desktop).
  - High-res dish card with dietary veg badge, sample badge, indicative price (`₹180`), ingredients tags, and description in English/Telugu.
  - Dual action buttons on each card:
    - **Enquire on WhatsApp** (primary terracotta button, opens prefilled chat: *"Hello Purely Home, I would like to enquire about [Dish Name]..."*).
    - **Add to Handi** (secondary button, adds to enquiry drawer for multi-dish booking).
- **Empty State & Custom Enquiries:**
  - If a filter matches no dishes, render an artisanal empty state with direct WhatsApp link: *"Looking for a regional custom dish? Message us on WhatsApp"*.
- **Kitchen Ordering Notice Banner:**
  - Transparent notification banner reiterating: *"All dishes and prices shown are representative sample offerings. Daily availability, specials, and confirmation are provided directly via WhatsApp."*

---

### 5. Translations & Localisation
#### File: `src/data/translations.ts`
- Add comprehensive translations for all menu screen elements:
  - Category labels (`All`, `Thalis`, `Curries & Dal`, `Breads & Rice`, `Beverages`)
  - Filter labels, search placeholder (`Search homestyle dishes...` / `వంటకాలను వెతకండి...`)
  - Action buttons (`Enquire on WhatsApp`, `Add to Handi`, `Direct Call`)
  - Sample disclaimer badge texts
  - Route titles and meta descriptions

---

## Verification Plan

### Automated Checks
1. **Type Checking & Lint:**
   - Run `npm run lint` / `tsc --noEmit` to verify type safety and clean imports across all updated components.
2. **Applet Compilation:**
   - Execute `compile_applet` to confirm successful Vite production bundle compilation.
3. **Cart & Menu Unit Tests:**
   - Run `node --test src/utils/cart.test.ts` to ensure selection counting and WhatsApp message URL encoding remain 100% sound.

### Manual Verification Matrix
1. **Route Switching & History:**
   - Click "Menu" from Header -> URL changes to `/menu` and Menu screen renders.
   - Click "Home" or the Logo -> URL returns to `/` and Homepage renders.
   - Click browser back/forward buttons -> route synchronizes without full page reload.
2. **Category Filtering & Search:**
   - Select "Thalis", "Curries", "Breads & Rice", "Beverages" -> dishes filter accurately.
   - Type in the search box -> dishes update in real time.
3. **Bilingual Switcher:**
   - Toggle English / Telugu -> all dish titles, descriptions, categories, badges, and CTAs translate instantly.
4. **WhatsApp & Phone Integrations:**
   - Click "Enquire on WhatsApp" -> opens `https://wa.me/918790563262?text=...` with proper URL-encoded dish name.
   - Click "Add to Handi" -> increments drawer badge and records item into the enquiry drawer.
5. **Responsiveness:**
   - Test viewport widths: Mobile (390px), Tablet (768px), Desktop (1440px).
