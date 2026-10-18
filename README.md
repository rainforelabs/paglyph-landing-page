# Paglyph landing page

A responsive implementation of the [Paglyph Figma design, node 1068:1424](https://www.figma.com/design/xRStLmjM5UB0oCZ5RTMdb9/Paglyph---Build-vocabulary?node-id=1068-1424).

## Stack

- **Astro 7** generates static HTML for the landing page, FAQ, privacy policy, download information, and 404 page, plus a legacy pricing redirect.
- **TypeScript 6** with Astro’s strict configuration.
- **Plain CSS** with shared design tokens, responsive layouts, and locally hosted variable Mona Sans.
- **npm** with a checked-in lockfile. Node 22.12+ (Node 24 recommended).

This is a content-focused site with native links and FAQ disclosures. Small client-side scripts manage mobile navigation, detect keyboard input, animate the hero with scrolling, reveal content on scroll, provide hover parallax on the landing-page illustrations, and cycle the closing app icons. No application server, database, React runtime, or animation library is required.

## Run

```sh
npm ci
npm run dev
```

Astro serves the site at `http://127.0.0.1:4321`. Astro 7 runs the development server in the background; use `npx astro dev stop` to stop it.

```sh
npm run check
npm run build
npm run preview
```

Deploy `dist/` to a static host such as Cloudflare Pages, Netlify, or Vercel. Enable gzip/Brotli compression on the host, especially for the original detailed SVG pattern. No deployment has been performed.

In a sandbox where Astro cannot write its telemetry preference, prefix commands with `ASTRO_TELEMETRY_DISABLED=1`.

## Download destination

Until the app is live, “Try for Free” shows a “Paglyph is almost here” toast in the bottom-right corner (full width on phones) instead of leaving the page. The toast is announced to screen readers, closes after four seconds unless hovered or focused, and can be dismissed with its close button or Escape. Without JavaScript, the button still falls back to `/download/`. Once the App Store URL is set, the button links straight to it and the toast is not rendered. Set the real destination at build time:

```sh
cp .env.example .env
# Set PUBLIC_DOWNLOAD_URL to the real App Store or TestFlight URL.
npm run build
```

Shared links and product metadata live in `src/config.ts`. Subscription wording and FAQ answers come from the existing `paglyph-website` project. No subscription prices or trial lengths have been invented. The existing privacy policy is reused unchanged. Terms links directly to Apple’s standard EULA because the previous terms page was template copy.

Pricing is shown in the app because it varies by country or region and currency. There is no pricing link or plan section on the website. The legacy `/pricing/` route redirects to `/#faq` and is excluded from the sitemap. The landing-page FAQ and standalone `/faq/` page share the same answers in `src/data/faq.ts`.

## Design assets and dithered backgrounds

All original images and SVGs are downloaded into `public/images/figma/`. The page serves WebP versions of the heavy assets, generated from those originals with the bundled `sharp`: the hero hand (2442px wide), the hero pattern (rasterized from its 4.9MB SVG at 2×), the Capture phone (pre-cropped to the window the card shows), the Tap/Retain phone frame and screens, and the 240px paper app-icon texture. The originals stay in place as sources and are not referenced by any page; regenerate the WebP files from them after a Figma change. `design-assets.json` records the Figma variable-to-file mapping. No temporary asset URLs are used. SVG source dimensions and aspect ratios are preserved. Mona Sans uses width 125 for display text: the main, FAQ, and closing headings use weight 800 with normal tracking; card titles use weight 900 with -4% tracking, matching the actual Figma variable-font settings. Navigation links use 15px Medium, and the desktop CTA uses 17px SemiBold. The compact mobile CTA remains 14px.

The feature backgrounds use PNG exports of the authored Figma background layers, including the original dither effect. These are individual background assets; the phones, captions, fades, and word preview remain separate HTML/image layers. The Capture, Tap, and Understand exports are cropped to the 344 × 475px design card. The full-width Retain card (Figma node `1068:1648`, 1080 × 344px) uses a 680 × 344px export behind its two phones only; its copy sits on the page color at the left. On phones it stacks above its caption and crops the artboard to the center 520px. It covers the card without distortion at responsive sizes, cropping from the top center when wrapped captions make a card taller.

The effect uses Bayer 16×16, three color levels, contrast `0.699999988079071`, brightness 100%, pixel size 1, and color mode. Figma renders it into `capture-background-dithered.png`, `tap-background-dithered.png`, `understand-background-dithered.png`, and `retain-background-dithered.png`. No client shader runtime or additional JavaScript is required. The original source images and supplied shader source in `src/lib/custom-effects/` are retained for reference.

To refresh the texture after a Figma change, export background nodes `1068:1650`, `1068:1661`, `1068:1682`, and `1123:249` with `download_assets`, using the exported node image rather than its raw source image. Save the exports to the corresponding local files and verify their dimensions. `design-assets.json` records their source nodes and dimensions.

The SwiftUI Code Connect buttons below the cropped word preview are not visible in the supplied landing-page frame and are not web components.

The latest frame includes a two-column FAQ and its exported rules and disclosure icons. The closing message now has a single-icon sequence of the four app icons from Figma node `1110:3767`: Primary, Grayscale, Mono, and Paper. All four tiles stay upright on translucent glass backgrounds with inner edge highlights, soft inset shading, and diffused outer shadows. The glass fill and shadow tokens are in `src/styles/global.css`; unsupported filters, reduced transparency, increased contrast, forced colors, and print have solid-surface fallbacks. The navigation contains Features and FAQ anchors plus the download action; the duplicate download button beside the headline is removed. The user confirmed retaining the consistent “nuanced” example because the Figma word preview changes its title to “deliberate” while retaining the pronunciation and definitions for “nuanced”. Existing motion, glass navigation, extra hero spacing, and the intentional footer crop are retained.

The navigation and mobile disclosure share the app icons' glass highlight gradient and inner-shadow token. The navbar retains its broader, softer ambient shadows, 24px backdrop blur, and a stronger white tint so links remain readable above scrolling content. On the homepage, it starts as the borderless 1080 × 84px header from Figma node `1068:1427`, then changes to the 640 × 64px glass pill after 8px of scrolling. Returning to the top restores the wide layout. The header reserves a constant height so the hero does not jump. At 640px and below, the controls retain their mobile geometry and only the glass surface fades in. Other pages keep the compact navbar.

## Files

- `src/pages/index.astro`: landing page composition.
- `src/styles/global.css`: design tokens, illustration geometry, and responsive styles.
- `src/scripts/feature-parallax.ts`: pointer-driven illustration depth, enabled only for fine pointers with hover and no reduced-motion preference.
- `src/scripts/scroll-reveal.ts`: one-time viewport entrances with keyboard, reduced-motion, and direct-anchor fallbacks.
- `src/components/AppIconSequence.astro` and `src/scripts/app-icon-sequence.ts`: original Figma icon artwork, a finite single-icon preview, and accessible replay.
- `src/scripts/hero-scroll.ts`: reversible scroll depth for the phone, wordmark, and patterned background, with a smaller range on mobile.
- `src/scripts/headline-scroll.ts`: a one-time, word-by-word frosted reveal that hands off to feature-card entrances while native scrolling continues.
- `src/scripts/navigation-scroll.ts`: reversible 320ms navbar morph, with independent transforms for surfaces and content, and no motion for keyboard or reduced-motion users.
- `src/components/FaqList.astro` and `src/data/faq.ts`: shared native FAQ disclosures and answers, including local in-app pricing guidance.
- `src/components/`: shared header, footer, download link, and word preview.
- `src/pages/privacy.md`: existing privacy copy, with static Markdown rendering.
- `public/og.png`: 1200 × 630 social preview, exported from Figma. `docs/social-preview.html` is the older HTML composition it replaced.
- `docs/verification.md`: implementation checks and known limits.

## Accessibility and motion

Semantic headings and landmarks, a skip link, descriptive illustration labels, visible keyboard focus, native keyboard-operable FAQ disclosures, and reduced-motion support. All content is present in the initial HTML. The hero and navigation remain static on page load; there are no automatic carousels.

Interaction motion uses shared CSS timing tokens: 150ms feedback and exits, 200ms entrances, and a custom ease-out curve. The mobile menu fades and scales from its trigger, navigation highlights and footer underlines respond to hover, and native FAQ answers fade with a small vertical shift. FAQ content motion progressively enhances browsers supporting [`::details-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content) and discrete transitions. Keyboard actions and reduced-motion preferences disable motion, including opacity fades. Closing menu links become inert immediately, without waiting for their visual exit.

Clicking or tapping Features or FAQ on the landing page uses native smooth scrolling with the sticky-header offset. Keyboard activation, direct page loads, and reduced-motion preferences retain an immediate jump. The native anchors preserve the URL fragment and browser history.

The homepage navbar uses the Web Animations API to interpolate transforms and opacity over 320ms with `cubic-bezier(.65, 0, .35, 1)`. Geometry is measured only when crossing between the top and scrolled states; the current rendered positions are used if the user reverses mid-animation. Text and button surfaces animate independently. Keyboard input, reduced-motion changes, resizing, page restoration, and printing cancel pending motion and release temporary layer promotion.

Below-the-fold headlines, feature cards, FAQ columns, and the closing app icon reveal once when entering the viewport: a 20px upward movement and opacity fade over 480ms with a gentle ease-out. Siblings entering together stagger by 70ms, while independently entering mobile cards start immediately. Content already in view or inside the initial anchor destination stays visible. A single IntersectionObserver triggers the entrances and releases each target afterward. Keyboard input, reduced motion, printing, and unavailable JavaScript or observer support keep content immediately visible. Hover parallax waits until a card finishes its entrance.

The main “Look up words faster, stay in the story” headline reveals each word as though it is approaching frosted glass: blur decreases from 14px to zero, opacity rises from 0 to 1, and scale settles from .92 to 1 with an 8px upward movement. Eight words start 90ms apart, each settling over 760ms with `cubic-bezier(.22, 1, .36, 1)`, for a 1.39-second sequence. Scrolling starts it once as the headline enters the reading area; native scrolling continues throughout, with no interception or position changes. The final word's completion releases the feature-card entrances: visible cards rise and fade in over 480ms, staggered by 70ms, while offscreen cards wait until entering view. Cards already passed during a fast scroll become visible immediately. The original text, two lines, and heading height remain unchanged. Keyboard input, navigation, resize, hidden pages, printing, and motion preference changes finish the headline and show the cards immediately. Direct anchors, restored scroll positions, reduced motion, and unavailable JavaScript or Web Animations support keep the headline fully visible. Temporary layers, animations, and input listeners are released afterward; scrolling back does not replay it.

The hero's layers follow scroll position directly and reverse when scrolling back. As the hero leaves the viewport, the phone gradually translates 90 design pixels downward, scales up to 1.06, and tilts by 1.5 degrees; the wordmark and pattern drift upward and soften at different rates. These are maximum values across the full scroll range, scaled with the Figma artboard. Mobile uses 55% of this range. The original composition is preserved at the top, and the bottom fade remains stationary. Frame updates and layer promotion pause offscreen; no idle loop, scroll interception, or animation dependency is used. Keyboard input and reduced motion restore the still composition, while wheel input resumes pointer behavior. Printing keeps all hero layers static and opaque.

Feature cards keep their frames and captions stationary while the illustration follows the pointer by up to 6px and its background moves up to 3px in the opposite direction. Subtle scaling keeps background edges covered. Transforms follow the existing 200ms interaction / 150ms return timings and update at most once per animation frame, with no idle animation loop. Pointer leave, cancellation, scrolling, resize, window blur, and keyboard input reset the effect. Touch input and reduced-motion preferences keep the cards static; changing device or motion preferences removes the pointer listeners immediately.

The closing icon sequence shows exactly one 96px icon in a stable 112px slot. Its four Figma variants play in order, starting with quick changes and slowing through 180/320/540ms intervals. Each swap scales from 1.04 to 1 over 420ms with `cubic-bezier(.22, 1, .36, 1)`; the final icon settles from 1.06 over 620ms. There is no rotation. Inspired by the single-icon treatment at [Anchor](https://tryanchor.app/), the sequence starts once on entering view after images decode. Clicking or tapping replays it; keyboard activation and reduced motion advance one icon instantly. Leaving the viewport, hiding the page, keyboard input, and printing cancel pending motion. Only transforms animate, and layer promotion is released afterward. Without JavaScript, only the Primary icon is shown. The original Paper texture and mask are preserved, with their latest Figma placement; inactive artwork is requested when the sequence enters view.
