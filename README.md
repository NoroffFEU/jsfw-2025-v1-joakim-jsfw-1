# jsfw-2025-v1-joakim-jsfw-1

jsfw-2025-v1-joakim-jsfw-1 created by GitHub Classroom

In this assignment, we are tasked with creating a fully functional online shop using React and Next.js.

## AI Use Case:

I used AI to help me with the styling of the application, as well as help me understand how to implement the shopping cart and checkout functionality when I was stuck a bit with that but I have fully understand how the work and I have implemented it myself.

## AI Assistance Log

AI tool used: GitHub Copilot (Claude Sonnet 4.6) via VS Code

### What I used AI for:

- Fixing TypeScript errors (missing `vite-env.d.ts`, null guards, unused parameters)
- Understanding why `if (!product)` must come before computed variables (type narrowing)
- Explaining the layout fix for the product page (image left, details right using flexbox)
- Showing examples of how the checkout card payment section and success page could look (chat only — I implemented these myself)
- Answering questions to verify my own understanding of the codebase

### What I did not use AI for:

- Writing the core logic of the shopping cart, checkout validation, or API fetching
- The autocomplete search bar implementation
- Final implementation decisions and code integration

## AI Chat Log — GitHub Copilot (Claude Sonnet 4.6)

---

**Fix: Missing `vite-env.d.ts`**

- Problem: `Cannot find module './index.css'` in `main.tsx`
- Cause: `vite-env.d.ts` was missing from `src/`
- Fix: Created `src/vite-env.d.ts` with `/// <reference types="vite/client" />`

---

**Fix: Unused parameter in `ContactPage.tsx`**

- Problem: `'_data' is defined but never used`
- Fix: Removed the unused parameter from `onSubmit` entirely since React Hook Form doesn't require it

---

**Q: Why didn't the border show on the Iconify icon?**

- Answer: Iconify CSS mask icons render as background-image covering the full element, so borders are hidden. Solution is to wrap the icon in a container div and apply the border there.

---

**Q: Why did the animation on the icon disappear?**

- Answer: The `icon-[]` Tailwind utility renders icons as CSS masks, stripping SVG animations. To preserve animations, you need `@iconify/react` component or an `<img>` with the Iconify CDN URL.

---

**ProductPage — styling and add to cart fix (shown in chat only)**

- Problem: `addToCart`, `id`, `title`, `image`, `salePrice` were referenced but never defined
- Fix shown: Pull `addToCart` from the Zustand store, compute `salePrice` from `product.discountedPrice ?? product.price`, pass correct values to `addToCart`
- Layout suggestion: Two-column flex layout with image left, details right using `flex-col md:flex-row`

---

**Fix: `'product' is possibly 'null'`**

- Problem: `salePrice` and `hasDiscount` were computed before the `if (!product)` null guard
- Fix: Moved `if (!product)` guard before the computed variables so TypeScript narrows the type

---

**Fix: `Cannot find name 'rating'`**

- Problem: `rating` used as bare variable instead of `product.rating`
- Fix: Changed to `product.rating`

---

**Layout: Details card positioned to the right (shown in chat only)**

- Problem: Details `<div>` was outside the flex container, so it rendered below the image
- Fix shown: Move details `<div>` inside the same flex container as the image, add `flex-1` to fill remaining width

---

**Fix: `mt-auto` pushing Add to Cart button to bottom**

- Fix: Removed `mt-auto` from button className

---

**Checkout: Card payment section (shown in chat only)**

- Showed how to add debit/credit toggle with card number, name, expiry, CVV fields
- Used local `cardType` state for the toggle

---

**Checkout: Success page navigation (shown in chat only)**

- Showed creating `CheckoutSuccessPage.tsx` with confirmation message
- Registering `/checkout/success` route in `App.tsx`
- Changing `navigate("/", { replace: true })` to `navigate("/checkout/success", { replace: true })`

---

All AI-suggested code was reviewed and understood before use. See conversation questions and answers as evidence of understanding.
