# Kale Kaayaka

Kale Kaayaka is a student prototype for **DevHost 2026, problem statement PS 4.2 — Digital Market Access for Local Artisans**.

It is a voice-assisted marketplace for handmade work. An artisan can list a piece in Kannada or English, show how the price is built, and receive a demo order. A buyer can search the shelf, read the price breakdown, open a Craft Passport, and place a simulated order. Offers that meet the maker’s rule are accepted or rejected automatically.

The name pairs *kale* (art) with *kāyaka* (work as a vocation).

## Design brief

- **People:** a Karnataka artisan listing from a phone, a buyer comparing crafts, and a judge watching a short demo.
- **Problem:** handmade listings hide labour, and an artisan should not have to answer every ordinary offer by hand.
- **Tone:** a warm printed catalogue. Ivory paper, forest green, one terracotta accent, and a small turmeric detail. The craft is the focus.
- **Reference:** a museum-shop booklet and a maker’s invoice, not a generic admin dashboard.

## What works in this prototype

- Discover storefront with search and category filters.
- Product page with story, materials, availability, optional making video, price drawer, and passport link.
- Deterministic price engine. Maker earnings, materials, packaging, and the platform fee add up to the listed price. Labour and the craft premium sit inside maker earnings and are not counted twice.
- Craft Passport at `/passport/:productId`, with a QR code of that page’s public URL.
- Artisan flow: details, price review, preview, explicit confirm, then publish. New listings appear on Discover and survive a refresh.
- Edit, publish, and unpublish.
- Browser Web Speech API for Kannada (`kn-IN`) and English (`en-IN`), with typing always available.
- Automatic offers against a saved minimum. The minimum cannot be below labour + materials + packaging + platform fee.
- Simulated checkout, stock checks, and orders that keep a price snapshot.
- English and Kannada interface copy for navigation, forms, and the main buyer actions. Product names and stories stay as the maker wrote them.
- Reset demo data, with a confirmation step.

## What is simulated or browser-dependent

- **No real payment, shipping, or login.** “Place demo order” only writes an order in this browser.
- **Speech recognition** uses the browser’s Web Speech API when it exists. In Chrome, that API may send audio to the browser vendor. Kale Kaayaka does not upload audio to its own server. If the browser has no speech support, or permission is denied, the form stays typeable and shows the reason. This environment was not treated as a successful microphone test.
- **QR codes on localhost** point at `http://localhost:...`. A phone on another network cannot open that address. After deployment, the QR uses the deployed origin.
- **Offers do not reserve stock.** Availability is checked again at checkout.
- **Kannada** covers the interface chrome listed above. It is not a complete translation of every helper sentence, and it does not translate maker-written text.
- **One shared demo role.** Whoever has the browser can open My Crafts. This is not a secure multi-user system.

## Sample data

The four listings created on first launch are **fictional demonstration data**. The makers, prices, stock, and stories are not verified sellers and not partnerships.

Photographs are reference images, not photos of those fictional pieces:

- Kasuti textile: [Kasuti embroidery.jpg](https://commons.wikimedia.org/wiki/File:Kasuti_embroidery.jpg) by Priya, CC0, via Wikimedia Commons.
- Cane basket: [A Naga traditional basket.jpg](https://commons.wikimedia.org/wiki/File:A_Naga_traditional_basket.jpg) by Joli, via Wikimedia Commons. It is a cane basket from Kiphire, Nagaland, used here only as a visual reference for the fictional coastal listing.
- Coconut-shell bowl: [Pexels photo 16629476](https://www.pexels.com/photo/coconut-shape-bowl-16629476/) by Betül Üstün.
- Wood toys: [Wooden toys (cropped).JPG](https://commons.wikimedia.org/wiki/File:Wooden_toys_(cropped).JPG) by Pratheep P S, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

## Price rule

The platform fee is a **fixed rupee amount** the maker confirms. The form suggests **8% of the subtotal before the fee**, rounded to the nearest rupee. The subtotal is labour (hours × hourly wage, rounded to a rupee) + materials + packaging + craft premium.

```
listed price = maker earnings + materials + packaging + platform fee
maker earnings = labour cost + craft premium
offer floor = labour cost + materials + packaging + platform fee
```

The suggested price is not a certified fairness guarantee. The interface says so.

## Stack

- React 19, Vite, TypeScript
- Tailwind CSS 4
- React Router
- Lucide icons
- `qrcode.react`
- Browser `localStorage` for products, orders, offer outcomes, and language
- Vitest for the price and offer rules

No API keys are required.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints, usually `http://localhost:5173`.

```bash
npm test
npm run build
npm run preview
```

`npm test` runs the price, offer, and sample-data checks. `npm run build` typechecks and writes `dist/`.

## Architecture

- `src/pages/` — Discover, product, passport, crafts, listing form, checkout, orders
- `src/components/` — layout, product cards, price breakdown, voice field, orders
- `src/services/pricing.ts` — the only price calculation
- `src/services/offers.ts` — accept or reject an offer
- `src/services/store.ts` — demo state and `localStorage`
- `src/services/speech.ts` — Web Speech API wrapper, so a transcription service can replace it later
- `src/data/i18n.ts` — English and Kannada interface copy
- `src/data/seed.ts` — the four sample listings

Uploaded photos are resized in the browser before they are stored. Very large images are refused.

## A short demo path

1. On Discover, search “Kasuti”, then filter to Basketry.
2. Open the coastal cane basket. The listed price is ₹1,134. Open **Why this price?** and the Craft Passport.
3. Make an offer of ₹900 (rejected) and then ₹1,100 (accepted). Continue to demo checkout.
4. Place the demo order and refresh. It remains under Orders and My Crafts.
5. Add a craft, confirm the price, and publish. It shows on Discover.
6. Switch the header between EN and ಕನ್ನಡ.
7. Use **Reset demo data** on My Crafts to restore the samples.

The coconut-shell set is listed at ₹562 and accepts offers from ₹530. The Kasuti runner and the wood toys do not take offers.

## Later work

A real deployment would need accounts, a server-side stock check, a payment provider, and a speech service with a disclosed privacy policy. Those are intentionally outside this prototype.
