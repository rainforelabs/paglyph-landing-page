# Verification — 16 October 2026

- `npm run check`: no errors, warnings, or hints.
- `npm run build`: six static pages and a sitemap generated successfully.
- Browser checks in the Codex in-app browser at 320, 390, 640, 768, 1024, and 1440 CSS pixels: no horizontal page overflow and no broken images.
- Initial desktop composition compared with the supplied Figma render. Hero, title, feature grid, closing statement, SVG dimensions, and original image crops verified. The later navbar refinement intentionally reduces header height, moving the page content upward.
- All 27 original design assets and the three dithered background exports are non-empty local files. Every visible image was checked for successful decoding and rendered dimensions; the screen mask is applied to the Tap screenshot. The archive icon belongs to controls clipped outside the visible feature illustration and is intentionally not rendered.
- Features anchor, Pricing, FAQ, and download navigation exercised in the browser. FAQ expands with Enter. All other local page and image references were checked against the static output.
- Console inspection returned no warning or error logs during the checks.
- Production pages contain a small navigation-disclosure script and no temporary Figma asset URLs.
- Social image verified at 1200 × 630. Favicon, canonical URLs, descriptions, robots.txt, and sitemap included.

## Known limits

1. No real App Store or TestFlight URL was supplied or found in the existing website. Download buttons use `/download/`; configure `PUBLIC_DOWNLOAD_URL` when available.
2. Independent Chromium and WebKit test runs were not completed because the matching Playwright browser executables were unavailable. Responsive and interaction verification used the available Codex in-app browser.
3. Source assets are preserved unchanged. Enable HTTP compression on the chosen static host. No deployment, real-device performance audit, or assistive-technology audit has been performed.

Screenshots: [desktop](preview-desktop.jpg) and [mobile](preview-mobile.jpg).

## Feature-card refinement

Compared against Figma node `1068:1648` on 16 October 2026.

- Desktop cards measure 344 × 475px with 24px gaps, a 1px border, 344px illustration regions, and 342 × 129px copy panels.
- Restored the Capture image fade and removed whole-card background fades absent from this frame. Tap and Understand retain the image fades and layer order authored in Figma.
- Phone artwork, background crops, and the Understand word preview scale proportionally with each card. The word preview uses the original 32px illustration inset at the design width.
- Refreshed the meaning icon from the current Figma export.
- Checked 320, 390, 640, 768, 1024, and 1440px browser widths: no horizontal overflow or clipped feature headings. All visible images decoded successfully.
- `npm run check` and `npm run build` passed after these changes. The background dithering was subsequently completed with original Figma layer exports, detailed below.

Latest feature screenshots: [desktop](feature-refinement-desktop.jpg) and [mobile](feature-refinement-mobile.jpg).

## Sticky glass navbar refinement

- Desktop navigation is 720 × 64px at its maximum width; mobile navigation is 60px tall when collapsed. Controls retain at least 44 × 44px touch targets.
- Verified 320, 360, 390, 640, 641, 768, 1024, and 1440px widths: no page overflow or overlapping controls.
- Sticky navigation remains 12px from the viewport top on desktop and 8px on mobile. Safe-area insets are included for supported devices. The Features anchor clears the bar on both layouts.
- Mobile disclosure verified with click, Tab, Escape, outside click, link selection, and navigation between Pricing and Features. Escape restores focus to the menu button. Opening the menu leaves the main content in the same position. Hidden links are absent from the accessibility tree.
- Desktop tab order follows the visual order. The active Pricing link exposes `aria-current="page"`.
- Liquid Glass styling uses CSS backdrop blur, saturation, translucent tint, edge highlights, and layered shadows. Opaque fallbacks are implemented for unsupported blur, reduced transparency, increased contrast, and forced colors; device preference emulation was not available for browser verification.
- `npm run check` and `npm run build` passed after the final implementation.

Navbar screenshots: [desktop while scrolling](navbar-desktop.jpg), [mobile while scrolling](navbar-mobile.jpg), and [expanded mobile menu](navbar-mobile-menu.jpg).

## UI polish pass

- Preserved the Figma composition and softened glass navbar. Corrected “Look up” and the Capture caption, with cleaner caption wrapping.
- Navigation initializes with a classic inline script directly after its markup, before main content, so the mobile page does not wait for a deferred module to collapse the menu.
- Neutral focus rings and text selection, consistent 150ms interaction transitions, and 0.96 button press feedback. Hover effects are limited to devices with a fine pointer and hover support. Existing reduced-motion support remains.
- Skip links now focus the main landmark, verified with keyboard navigation. Menu Tab order and Escape focus restoration were rechecked after the initialization change.
- Footer links all measure at least 44 × 44px. Shared page gutters and document widths include safe-area insets; standard footers also allow for the bottom inset.
- Every landing-page image now declares its dimensions. Font weights and stacking levels use shared tokens. Caption contrast uses the shared muted text color.
- FAQ indicators use aligned CSS strokes with a reduced-motion path and system-color treatment in forced colors. Native keyboard expansion was verified; focus rings have rounded corners.
- Landing page checked at 320, 390, 640, 641, 768, 1024, and 1440px: no horizontal overflow or clipped headings. Desktop feature cards retain their 344 × 475px dimensions.
- Pricing, FAQ, download, privacy, and 404 pages checked at 320px: no horizontal overflow, clipped headings, or undersized footer targets. Browser console returned no warnings or errors.
- `npm run check` and `npm run build` passed. Real-device safe-area and OS accessibility preference checks remain outside this browser verification.

Polish screenshots: [desktop](polish-desktop.jpg), [mobile](polish-mobile.jpg), and [FAQ keyboard focus](polish-faq.jpg).

## Footer wordmark sizing

Replaced the fixed-size, transformed footer artboard with an image sized to the shared content container. The wordmark preserves its aspect ratio and stays inside the page gutters. Its bottom crop is intentional: the container retains the design’s visible 178px of the 237.558px-high image, scaled proportionally. There is no padding below the cropped artwork. Verified at 320, 390, 640, 768, 1024, and 1440px with no horizontal clipping or page overflow; the production build passes. [Mobile footer screenshot](footer-wordmark-mobile.jpg).

## Interaction animation pass

| Before | After |
| --- | --- |
| Mobile links appeared immediately inside an expanded bar. | A separate panel fades and scales from the menu button in 200ms, exiting in 150ms; the bar stays 60px tall. |
| Navigation and footer link emphasis appeared immediately. | Navigation highlights fade and scale; footer underlines grow from the left in 150ms. |
| FAQ answer content appeared immediately. | Native details content fades and shifts 4px in 200ms, exiting in 150ms where supported. |
| Fixed interaction timing also applied to keyboard input. | Keyboard and assistive-technology activation use zero-duration transitions. Reduced motion also removes button press transforms. |

- CSS transitions remain reversible; no animation dependency or scroll observer was added. Press feedback stays at 0.96 scale and hover effects remain limited to fine pointers that support hover.
- Verified pointer opening and closing, 200ms/150ms computed timings, and the menu panel's 8px gap below the bar. Closed links become inert and disappear from the accessibility tree immediately. Escape closes the panel and returns focus to its button; Enter opens it with zero-duration transitions.
- Verified native FAQ pointer expansion and keyboard expansion/collapse. Keyboard input sets content transition durations to zero; collapsed content has hidden content visibility.
- Menu geometry checked at 320, 390, and 640px. Crossing to 641px closes the mobile disclosure and shows desktop navigation. No horizontal overflow was observed at those widths.
- Reduced-motion rules are implemented for controls, pseudo-elements, and details content; OS preference emulation is unavailable in this browser. Unsupported details-content transitions retain the native disclosure behavior. See [MDN's native details-content transition guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content).
- Footer sizing and its intentional bottom crop are unchanged. No page-load or scroll-triggered effects were introduced.
- `npm run check` and `npm run build` passed. Browser console inspection returned no warnings or errors.

Screenshots: [expanded mobile menu](animations-mobile-menu.jpg) and [FAQ with keyboard focus](animations-faq.jpg).

## Features smooth scrolling

| Before | After |
| --- | --- |
| Clicking or tapping Features jumped immediately. | Native smooth scrolling moves to the section, preserving the sticky-header offset and native fragment navigation. |

- Uses the existing pointer-input state and `#features:target`; keyboard activation and direct page loads stay immediate. Existing reduced-motion rules override smooth scrolling.
- Desktop pointer activation observed at multiple scroll positions before settling with the section 100px below the viewport top. Keyboard Enter used `scroll-behavior: auto` and reached the section immediately.
- Mobile activation at 390px closes the disclosure and starts smooth scrolling. The existing 88px mobile header offset is retained.
- Production build passed. Reduced-motion behavior is covered by the existing CSS override; OS preference emulation is unavailable in the browser.

## Figma background dithering

- Rechecked feature frame `1068:1648` and its authored effect settings: Bayer 16×16, three color levels, contrast 0.699999988079071, brightness 100%, pixel size 1, color mode.
- Exported only background nodes `1068:1650`, `1068:1661`, and `1068:1682` directly from Figma with the dither effect rendered. Each PNG is 344 × 475px and includes the background's original card crop. The separate phones, text, icons, and fades remain unchanged.
- Replaced the unprocessed background images with these local exports. Removed the obsolete offsets that cropped the raw images, since the exported layers already contain those crops. Original source images and the supplied shader source are retained.
- Confirmed in the browser at 1440px that each background and card share the same 344 × 475px bounds. At 390px, each background scales proportionally to 350 × 483.28125px; all feature images decode and the page has no horizontal overflow.
- The exported backgrounds total 333,915 bytes and add no JavaScript, animation, or browser GPU dependency. The earlier missing shader-runtime resource no longer prevents displaying the authored effect; this is a static Figma rendering, not a live shader implementation.
- `npm run check` returned no errors, warnings, or hints; `npm run build` passed.

Screenshots: [desktop](dither-cards-desktop.jpg) and [mobile](dither-cards-mobile.jpg).

## Feature-card hover parallax

| Before | After |
| --- | --- |
| Illustrations and backgrounds stayed still on hover. | Illustrations follow the pointer up to 6px while the background travels up to 3px in the opposite direction. |
| No depth interaction. | Artwork scales to 1.02 and backgrounds to 1.04, using 200ms transitions and a 150ms return. Frames, captions, and hit areas stay fixed. |
| Width-scaled background exports could leave a gap below taller cards at intermediate widths. | Backgrounds cover the full card with their aspect ratio preserved, retaining the original crop at 344 × 475px. |

- Added a landing-page-only TypeScript module. Pointer updates are coalesced into one animation-frame callback and write transforms directly on two layers. No animation dependency, continuous loop, or per-frame component rendering was added.
- Listeners are installed only for fine pointers with hover and no reduced-motion preference. Touch pointer events are ignored. Changes to the media query abort the listeners and reset the layers; reduced-motion CSS also explicitly removes transforms.
- Verified opposite-corner movement, independent activation of all three cards, 200ms active / 150ms exit timing, and return to an empty inline transform on pointer leave. Only the hovered card moves, and captions retain `transform: none`.
- Verified keyboard input clears all active transforms immediately with zero-duration transitions. Resize resets the interaction. Scroll, pointer cancellation, and window blur also have reset handlers.
- Browser checks at 320, 907, and 1440px found no horizontal overflow. At 320px, backgrounds cover the full 433px/411px card heights; at 1440px all cards remain 344 × 475px. The footer crop is unchanged.
- `npm run check` passed with no errors, warnings, or hints. Production build passed, and the browser console had no warnings or errors. OS reduced-motion and coarse-pointer emulation are unavailable in this browser; those paths were checked in code.

Screenshot: [hovered word-preview card](feature-parallax-hover.jpg).

## Scroll entrance animations

| Before | After |
| --- | --- |
| Below-the-fold content appeared without an entrance. | Headlines, the download button, and feature cards rise 20px and fade in over 480ms with a custom ease-out. |
| Feature cards arrived together. | Cards entering together stagger by 70ms; stacked mobile cards reveal independently without a delayed start. |
| Hover parallax could start whenever the pointer entered a card. | Parallax waits for the card's entrance to finish, keeping its pointer coordinates stable. |

- One IntersectionObserver handles the six possible targets. Each enters once, is unobserved immediately, and clears its animation after completion. There is no scroll handler, animation library, continuous animation loop, or layout-property animation for these entrances.
- Content already sufficiently visible on initial load, content above the viewport, and the initial anchor destination skip their entrance. The hero, navigation, footer, and intentional footer wordmark crop are unchanged.
- At 907px, observed all three cards mid-entrance with 480ms duration and 0/70/140ms delays. The closing headline entered separately, then retained `opacity: 1`, no translation, and no animation when scrolled out and back into view.
- At 390px, the first card was initially visible and remained static; the second card entered on scroll with zero delay. Keyboard Tab immediately completed both active and pending entrances, leaving all content visible with no animation. No horizontal overflow was present.
- At 1440px, all six targets started below the reveal threshold. Features pointer activation retained native smooth scrolling and the 100px section offset; all triggered targets settled visibly. Reloading `/#features` showed the cards immediately without animation. No horizontal overflow was present.
- Verified the existing foreground parallax still reaches its 1.02 scale and pointer translation after a card is visible. Parallax is suppressed during pending/entering states.
- Reduced-motion, missing-observer, and no-JavaScript paths leave the initial HTML visible. Printing explicitly removes hiding and motion. OS reduced-motion emulation is unavailable in this browser; that path was checked in code.
- `npm run check` passed with zero errors, warnings, or hints. Production build passed for all six pages, and the browser console returned no warnings or errors.

Screenshot: [feature section after entrances](scroll-entrances.jpg).

## Hero scroll depth

| Before | After |
| --- | --- |
| Hero artwork stayed flat as the document scrolled. | The phone moves forward with a small zoom and tilt; the wordmark and pattern drift upward at separate rates. |
| All hero layers moved together. | Scroll position controls three independent transform/opacity layers; scrolling back exactly reverses the composition. |
| Keyboard mode persisted when returning to wheel scrolling. | Wheel input now restores pointer mode, allowing the hero motion to resume. |

- Added wrappers inside the existing scaled artboard, preserving image dimensions, mobile wordmark centering, and initial composition. The foreground reaches at most 90 design pixels of translation, 1.06 scale, and a -1.5-degree rotation; mobile strength is 55% of desktop. The static bottom fade is retained, with a 2px mask transition at the crop edge to prevent a fractional-pixel compositing seam.
- Scroll progress maps directly to the visible hero's exit range without timed easing, a pinned section, or scroll interception. Transforms and opacity are the only animated properties. Scroll events coalesce into one requestAnimationFrame callback; geometry is measured on resize instead of every scroll event. Identical progress values do not rewrite styles.
- IntersectionObserver enables updates and `will-change` only while the hero intersects the viewport. Verified the active marker disappears and `will-change` returns to `auto` after the hero exits.
- At 907px, scrolling to 170px produced a phone translation of 25.93 design pixels with approximately 1.0173 scale. Returning to the top restored identity transforms and full opacity; scrolling to the same position reproduced the exact transform.
- Verified keyboard input clears all three layers to `transform: none` and `opacity: 1`. Wheel input restores pointer mode and resumes the effect. Reduced-motion changes abort listeners, disconnect the observer, and clear inline styles; the CSS also enforces static, opaque layers for reduced motion and printing. OS preference emulation is unavailable in this browser, so those paths were checked in code.
- Checked 320, 390, 907, and 1440px widths without horizontal overflow. At 390px and scrollY 108, the phone translated 12.62 design pixels and scaled to approximately 1.0084, confirming the reduced mobile range. The independently scaled mobile wordmark remains centered. The mobile crop edge was visually verified after removing the seam.
- Existing section entrances continue to run as the hero leaves the viewport. Feature-card hover behavior, native anchor navigation, and the intentional footer wordmark crop are unchanged.
- `npm run check` passed for 19 files with zero errors, warnings, or hints. The final production build passed for all six pages, and the browser console contained no warnings or errors. The preview was returned to its normal viewport at the top of the home page.

Screenshots: [hero while scrolling](hero-scroll.jpg) and [mobile](hero-scroll-mobile.jpg).

## Latest landing-page design alignment

Rechecked Figma frame `1068:1424` on 16 October 2026, including the new FAQ frame `1103:3724` and closing section `1103:3519`.

- Removed Pricing from both navigation layouts and removed the duplicate Download button beside the headline. The compact glass navbar now has a 640px maximum width for its two section links. FAQ points to the on-page section, including from secondary pages.
- Added the two-column FAQ with ten native disclosures, the support contact, exported divider lines, and exported plus icons. At 1440px, verified a 1080px section with 329px/631px columns, a 120px gap, ten 56px closed rows, and eleven 631 × 1px dividers, matching the Figma geometry.
- Reused the existing FAQ answers through `src/data/faq.ts` and `FaqList.astro`. The subscription answer explicitly directs visitors to the app for prices based on country or region and currency. There are no displayed prices or pricing links. The old `/pricing/` route redirects to `/#faq`; its generated static document is marked `noindex`, and pricing is excluded from the sitemap.
- Added the 96px app-icon tile with the original 57.8117 × 57.0089px gradient mark and -2-degree rotation above the closing message. Updated the Capture caption to mention an existing photo while retaining correct grammar. The desktop cards remain 344 × 475px.
- Compared all 30 asset exports against the existing local files. Reused 24 byte-identical assets, refreshed the hero pattern, meaning mark, and footer wordmark, and downloaded the three new FAQ/app-icon assets. All 33 mapped assets, including the three existing dithered background exports, are non-empty. Browser inspection confirmed all rendered images decoded and their effective slots retain the intended geometry. The background source images and effect parameters remain unchanged.
- The user explicitly chose to keep the consistent “nuanced” example, rather than copy the Figma preview's mismatched “deliberate” title. Retained the earlier corrected “Look up” wording, glass navbar treatment, requested hero spacing, responsive layout, scroll/hover motion, and intentional bottom crop of the footer wordmark.
- Added the FAQ columns and closing icon to the existing one-time entrance observer. FAQ anchors use the same native smooth-scroll and reduced-motion behavior as Features. Direct `/#faq` loads show both FAQ columns immediately.
- Verified desktop pointer expansion, keyboard Enter collapse, mobile expansion/collapse, mobile menu dismissal after selecting FAQ, and sticky-header offsets of 100px desktop / 88px mobile. The retired pricing route reached the visible FAQ in the browser. The standalone FAQ continues to use the same shared answers.
- Checked 320, 390, 768, 907, and 1440px widths: no horizontal overflow or clipped question text. The FAQ stacks at 800px and below, and long mobile questions wrap naturally. Footer artwork stays inside the shared gutters with its bottom crop retained.
- `npm run check` passed for 21 files with zero errors, warnings, or hints; the production build passed. The browser console had no warnings or errors. OS preference emulation is unavailable; existing reduced-motion overrides were checked in code.

Screenshots: [full desktop page](design-sync-desktop.jpg), [FAQ](design-sync-faq.jpg), and [mobile FAQ](design-sync-mobile-faq.jpg).

## Typography alignment

Read the actual text-node settings from Figma frame `1068:1424` on 16 October 2026. Although the main headings have a “Black” style name, their explicit variable-font weight is 800; the card titles use 900.

`src/styles/global.css`

- Main, FAQ, and closing headings were uniformly 900 with -4% tracking. Set them to `font-weight: var(--font-weight-heavy)` (800) and `letter-spacing: normal`, matching their Figma roles. Retained 48px/57.6px main and FAQ headings, and 34px/41px closing text at the desktop design width.
- Width used a raw variation tag. Replaced it with `font-stretch: 125%` for display text, using the high-level CSS property supported by the existing font. Verified the local WOFF2 is byte-identical to Fontsource's standard Mona Sans variable font, which declares both 200–900 weight and 75–125% width ranges. No new font download was needed.
- Navigation links were 14px/600; they now use 15px/500 with 20px leading. The desktop CTA now uses 17px/600 with 22px leading. The 14px compact mobile CTA and 44px touch targets are retained; the navbar stays 64px tall on desktop and 60px on mobile.
- Card captions and footer/navigation labels used generic grays. Applied the Figma caption color `rgb(46 46 46 / .7)` and label color `#7e7e7e`. Card titles retain 28px/900, 41px leading, and -1.12px tracking; captions retain 17px/500 and 22px leading at the design width.
- The contextual “nuanced” emphasis inherited browser-default bold. Set it explicitly to 600, matching Figma's semibold emphasis. The consistent example and existing system rounded-font fallback remain.
- Normal heading tracking required a 24px minimum at 320px so the main headline still fits its two intended lines. Larger responsive sizes retain the existing scale.

`README.md`

- Corrected the typography documentation to distinguish the 800-weight section headings from 900-weight card titles and record the desktop/mobile navigation sizing.

Verified computed desktop font settings against Figma, including 100% body width and 125% display width. All three desktop feature cards remain 344 × 475px; closed FAQ rows remain 56px tall. Mobile headings and questions wrap without clipping, and the mobile menu closes after selecting FAQ.

Checked 320, 390, 768, 907, and 1440px widths with no horizontal overflow. `npm run check` passed for 21 files with zero errors, warnings, or hints; the production build passed for all six pages. The browser console contained no warnings or errors. Restored the normal preview viewport at the top of the landing page.

Screenshot: [desktop typography](typography-desktop.jpg).

## Animated app-icon stack

Implemented from the high-fidelity Figma context for node `1110:3767` using the emil-animations and emil-get-creative skills. The supplied icon variants define the visual direction, so this was built directly without a separate generator.

| Before | After |
| --- | --- |
| One static icon above the closing headline. | A tilted deck containing Primary, Grayscale, Glass, Mono, and Paper. |
| No interaction with the icon. | A finite automatic preview on entering view; clicking or tapping advances one icon. |
| No animation lifecycle for the illustration. | Viewport, visibility, keyboard, reduced-motion, and print cancellation, with temporary layer promotion. |

- Added `AppIconStack.astro` and `app-icon-stack.ts`. The stack occupies a stable 200 × 148px area; all five source tiles retain their 96 × 96px size and 24px corner radius. Source logo dimensions, brand offsets, glass gradients, paper texture, and mask placement are preserved. Tile fills are composited against the page color so logos behind a tile do not bleed through it.
- Downloaded six source assets and recorded their mapping in `design-assets.json`. Every file is non-empty and every visible image decoded in the browser. The Paper image is the original 4096px, 8.4MB Figma texture; it is loaded lazily, and playback waits for image decoding. It has not been recompressed or substituted.
- The front card lifts aside over 260ms with an ease-in-out curve, changes depth while away from the stack, and returns behind the deck over 340ms with an ease-out curve. Other cards move forward with matching return timing. Only transforms interpolate; stacking order changes once at the handoff.
- The automatic preview starts after a 660ms entrance delay and performs five moves with 160ms rests, ending after approximately 4.3 seconds. Observed the first switch to Grayscale at 851ms, Paper at 3219ms, and the return to Primary at 3962ms, before the final settling animation completes. Verified the resting state has no active animation, no shuffle marker, and `will-change: auto` on every tile.
- Verified pointer activation, immediate keyboard activation, and cancellation during a pointer-triggered animation by pressing a key. Keyboard cancellation clears all moving states and sets all transition durations to zero. Offscreen inspection found no active animation or layer promotion. OS reduced-motion and hidden-tab emulation were unavailable; their cancellation paths and CSS overrides were checked in code.
- Checked 320, 390, 907, and 1440px widths without horizontal overflow, including a moving icon at 320px. Visually inspected the Glass and Paper variants and confirmed the original mask renders correctly. The footer's intentional bottom crop remains intact.
- `npm run check` passed for 23 files with zero errors, warnings, or hints. The production build passed for all six pages. The browser console had no warnings or errors. The preview is restored to its normal viewport with the closing stack visible.

Screenshots: [resting stack](app-icon-stack.jpg), [during a shuffle](app-icon-stack-motion.jpg), and [mobile keyboard focus](app-icon-stack-mobile.jpg).

## Simplified sequential icon animation

Replaced the deck with the single-icon treatment requested by the user. Inspected [Anchor](https://tryanchor.app/) in the browser: its icon switcher hides inactive variants, gives each new icon a quick scale pop, and finishes with a longer settling animation.

| Before | After |
| --- | --- |
| Five visible, offset tiles with a lift-and-return movement. | Exactly one visible 96px tile in a centered 112px slot. |
| Uniform shuffle cadence. | Sequential changes slow through 140/210/320/500ms intervals. |
| A tap moves one card behind the deck. | A tap replays the short sequence; keyboard activation advances instantly. |

- Renamed the component and controller to `AppIconSequence.astro` and `app-icon-sequence.ts`, removing the old stack files, depth assignments, and shuffle keyframes. All five original Figma variants are preserved.
- Each incoming icon pops from 1.07 scale with a small alternating 3-degree tilt, settling over 360ms with `cubic-bezier(.16, 1, .3, 1)`. The final icon lands from 1.1 scale over 560ms. Only transforms animate; inactive variants use `visibility: hidden`, so the sequence never displays two icons together.
- Browser observations confirmed Grayscale → Glass → Mono → Paper → Primary in that order, with exactly one visible icon at every sampled stage. Observed 360ms pop animations and the 560ms final landing, followed by cleared playback markers.
- The finite automatic preview still waits for image decoding and viewport entry. Inactive artwork is requested when the sequence enters view. Offscreen, visibility, keyboard, reduced-motion, and print cancellation paths remain; without JavaScript, Primary remains visible.
- Verified pointer replay, immediate keyboard advancement, and keyboard cancellation of an active sequence. Cancellation leaves one visible icon with no active animation and `will-change: auto`. Reduced-motion behavior was reviewed in code because preference emulation is unavailable.
- Checked 320, 907, and 1440px widths without horizontal overflow. Verified mobile replay and stable 96px artwork dimensions. Restored the default viewport with the single icon visible and closed the temporary reference tab.
- `npm run check` passed for 23 files with no errors, warnings, or hints. Production build passed for all six pages; the browser console had no warnings or errors.

Screenshots: [single icon](app-icon-sequence.jpg) and [mobile](app-icon-sequence-mobile.jpg).

## Updated icon artwork and easing

Refreshed Figma node `1110:3767` on 16 October 2026. The latest design contains four upright variants: Primary, Grayscale, Mono, and Paper.

| Before | After |
| --- | --- |
| Five variants, including Glass; gray Paper tile. | Four current Figma variants with white tile backgrounds and updated Paper mask placement. |
| Alternating 3-degree rotation and 7–10% scale pops. | No rotation; restrained 4% pops and a 6% final settle. |
| 140/210/320/500ms cadence and a 560ms landing. | 180/320/540ms cadence, 420ms pops, and a 620ms landing with `cubic-bezier(.22, 1, .36, 1)`. |

- Downloaded the five current source assets, retained their SVG intrinsic dimensions, updated the manifest, and removed the retired Glass asset and styles. The original Paper texture is JPEG data despite its Figma download URL ending in `.png`; saved it with the correct `.jpg` extension without modifying its bytes. All mapped assets are non-empty and the 4096 × 4096px Paper image decodes in the browser.
- Matched the Paper mask to the latest 12.906px/13.467px offset and 57.607 × 56.447px size. All four tiles remain 96 × 96px with 24px corners inside the stable 112px slot.
- Observed Grayscale → Mono → Paper → Primary during the automatic preview, with exactly one visible icon at every stage. Every sampled animation matrix has zero rotation terms. Verified the 420ms/620ms timings and updated ease-out curve in computed styles.
- Verified pointer replay, immediate keyboard advancement, and keyboard cancellation during playback. At rest, playback markers are removed, all transforms are `none`, and `will-change` returns to `auto`. Existing reduced-motion and print overrides remain intact; OS preference emulation is unavailable, so those paths were reviewed in code.
- Checked 320, 907, and 1440px widths without horizontal overflow. Visually compared the refreshed Paper artwork with Figma and restored the default viewport. The browser console contains no warnings or errors.
- `npm run check` passed for 23 files with zero errors, warnings, or hints. The production build passed for all six pages.

Screenshots: [updated icon](app-icon-refresh.jpg) and [Paper on mobile](app-icon-refresh-mobile.jpg).

## Glass icon surfaces

- Replaced the flat white tile fill with a translucent gradient and 16px backdrop blur, inspired by [Apple's Liquid Glass materials](https://developer.apple.com/design/human-interface-guidelines/materials). Added bright inner edge highlights, a soft lower inset shadow, and layered ambient shadows. Fill and shadow values live in the shared CSS tokens.
- Preserved all four source marks, their mask geometry, 96px tile size, upright orientation, and existing scale-only sequence. No new animation or runtime dependency was added.
- Added opaque fallbacks for unsupported backdrop filters, reduced transparency, increased contrast, forced colors, and print. These preference paths were reviewed in code because browser preference emulation is unavailable.
- Verified the computed glass fill, inset shadows, and backdrop filter during pointer replay, with exactly one icon visible. Checked keyboard advancement and the pale Paper artwork at 320px. Both 320px and the default 907px viewport have no horizontal overflow.
- `npm run check` passed for 23 files with no errors, warnings, or hints; production build passed for all six pages. The browser console is clear. Restored the default viewport.

Screenshot: [glass icon surface](app-icon-glass-surface.jpg).

## Matching navigation glass depth

- Extracted the icon highlight gradient and inset-shadow layers into shared glass tokens. Applied them to the navbar and mobile disclosure while preserving the navbar's soft ambient shadow falloff and stronger white tint for text readability. The app icons retain the same rendered finish.
- Verified the desktop navbar remains 640 × 64px and 12px from the viewport top while scrolling over the hero. At 390px, the mobile navbar remains 366 × 60px and 8px from the top, without horizontal overflow.
- Visually checked the expanded mobile menu's matching highlights and inner shading; Escape closes it. Existing sticky behavior, 44px controls, backdrop blur, and reduced-transparency/contrast fallbacks are retained.
- `npm run check` passed for 23 files with no errors, warnings, or hints. The production build passed for all six pages. Restored the default desktop viewport at the top of the page.

Screenshots: [navbar glass depth](navbar-glass-depth.jpg) and [mobile menu](navbar-glass-depth-mobile.jpg).

## Scroll-triggered navigation morph

Implemented the initial header from Figma node `1068:1427` and its transition to the existing compact glass navigation.

| Before | After |
| --- | --- |
| Compact glass navbar at every scroll position. | Borderless 1080 × 84px header at the top; 640 × 64px glass pill after scrolling 8px. |
| No connection between the initial and scrolled layouts. | Independent 320ms transform/opacity tracks for the controls, artwork, and glass surfaces, using `cubic-bezier(.65, 0, .35, 1)`. |
| A resized header could shift the hero. | A constant header slot keeps the hero's document position fixed through both directions. |

- At a 1440px viewport, verified the initial header is x=180, y=24, width=1080, height=84; its CTA is 170 × 52px. Original logo dimensions and offsets match the Figma context. Verified all three source SVGs are non-empty, locally served, and decoded; reused two byte-identical exports and refreshed the brand symbol.
- The compact state remains x=400, y=12, width=640, height=64. The hero remains at document y=160 before, during, and after the morph. Returning to scrollY=0 restores the wide state. A 1px return threshold prevents jitter near the top.
- State changes measure the current rendered geometry before retargeting, so reversing an active animation is continuous. Link containers translate with their visual contents; artwork and button surfaces scale independently while text only translates. No width, height, padding, or blur interpolation, no animation dependency, and no idle animation loop.
- Verified a quick scroll-down/scroll-up reversal, keyboard activation of Features, direct `/#features` reload, and keyboard cancellation. Keyboard actions leave no active transforms or promoted layers. Animation completion releases every temporary `will-change` declaration. Resize, page restoration, hidden-page, reduced-motion, and print paths cancel pending motion; reduced-motion was reviewed in code because preference emulation is unavailable.
- At 320px, the initial mobile navbar is borderless and 60px high; scrolling fades in the same glass surface without resizing its controls. The mobile menu opens, closes on Features selection, and preserves the 8px sticky inset. Checked 320, 641, 907, and 1440px layouts without horizontal overflow.
- Verified the download link reaches `/download/`, whose navbar retains its compact 640 × 64px layout. Existing section offsets and navigation behavior remain intact.
- `npm run check` passed for 24 files with zero errors, warnings, or hints. The production build passed for all six pages, and the browser console is clear. Restored the default viewport at the top of the homepage.

Screenshots: [initial state](navbar-scroll-initial.jpg), [compact state](navbar-scroll-compact.jpg), [mobile](navbar-scroll-mobile.jpg), and the final [before](navbar-morph-before.jpg) / [after](navbar-morph-after.jpg) comparison.

## Initial navigation edge alignment

- Removed horizontal padding from the wide initial navbar and its brand link. At 907px, the brand starts at x=32 and the download button ends at x=875, matching the main section edges exactly. The 84px header height is retained.
- Verified the scroll transition still reaches the 640px compact bar with its existing 10px padding, and reverses correctly. The production build passed.

Screenshot: [aligned initial navbar](navbar-aligned.jpg).

## Main headline scroll animation

Applied the emil-animations skill to the main headline and removed it from the general section-reveal observer to avoid competing motion.

| Before | After |
| --- | --- |
| One wrapper entrance, often skipped because the headline was already visible. | Two lines respond directly to scroll, with the second following 14% later. |
| Whole heading fades in from hidden. | Readable .58 opacity increases to 1 while the lines rise by at most 14px and 18px. |
| One-time entrance. | Reversible cubic ease-out progress, with no animation on load or idle timer. |

- Preserved one semantic h1, its exact text, font settings, responsive line breaks, and reserved height. Only transform and opacity are updated, at most once per animation frame while visible. Layer promotion is released at the start/end of the range and offscreen.
- At the default 908px viewport, scrollY=68 produced line opacities .875/.759 and translations 4.17px/10.32px. At scrollY=272, both lines reached opacity 1 and zero translation. Scrolling to the top restored the initial .58 opacity. The heading stayed at document y=662.578px and retained its 96px height throughout.
- At 320px, the heading retains two lines and a 57.594px height with no horizontal overflow. The 180px minimum scroll range keeps the stagger visible even when the headline starts well inside a tall phone viewport.
- Verified keyboard input immediately restores full opacity, no transforms, and `will-change: auto`. Reduced-motion and print CSS force the same static state; no JavaScript or missing IntersectionObserver support leaves the original readable heading. OS preference emulation is unavailable, so reduced-motion behavior was reviewed in code.
- `npm run check` passed for 25 files with zero errors, warnings, or hints. Production build passed for all six pages.

Screenshots: [headline during scroll](headline-scroll-progress.jpg) and [mobile](headline-scroll-mobile.jpg).

## Word-by-word frosted headline reveal

Applied emil-animations and the direct-build route from emil-get-creative to the user's specified frosted-glass approach.

| Before | After |
| --- | --- |
| Two lines track scroll progress with a small lift and opacity change. | Eight words emerge in reading order from 14px blur, .14 opacity, and .92 scale to crisp, full-size text. |
| Reverses with every scroll pass. | Plays once per visit, with 90ms word spacing and a 760ms ease-out per word. |
| Scrolling continues throughout. | Holds the page at the headline for the 1.39-second sequence, then releases automatically. |

- At 908px, verified the hold at scrollY=170. A second wheel gesture during playback leaves scrollY unchanged. Sampled progressively increasing blur across the words (1.65px, 3.70px, 7.73px, then 14px), confirming the reading-order stagger.
- After completion, all eight words have opacity 1, no filter or transform, and `will-change: auto`; the root hold attribute is removed. A subsequent wheel gesture advances the page normally. The semantic h1 text, two lines, and 96px heading height remain unchanged.
- At 320px, verified the hold at scrollY=8, automatic release, subsequent scroll to y=252, a 57.59px two-line heading, and no horizontal overflow. At 1440px, the headline pauses at viewport y=522 with its original 1080px width and no horizontal overflow. Mobile verification uses a narrow viewport and wheel input; native touch cancellation was reviewed in code.
- Verified keyboard cancellation, Features navigation both before and during playback, and a direct `/#features` reload. All release or bypass the hold and leave the full headline readable. The timer fallback releases the hold after 1.59 seconds even if animation completion is interrupted. Hidden-page, pagehide, resize, print, and motion-preference cancellation paths are present; reduced-motion preference emulation is unavailable, so that path was reviewed in code.
- No animation dependency was added. The Web Animations API animates only the word spans, and all animation objects, timers, listeners, and temporary layers are released at completion. Unavailable JavaScript or Web Animations leaves the original fully visible text. A stable scrollbar gutter avoids width changes while holding the page.
- `npm run check` passed for 25 files with zero errors, warnings, or hints. Production build passed for all six pages. Browser warnings/errors are empty. Restored the default viewport.

Screenshots: [during reveal](headline-frost-reveal.jpg), [complete](headline-frost-complete.jpg), and [mobile reveal](headline-frost-mobile.jpg).

## Uninterrupted headline-to-card sequence

| Before | After |
| --- | --- |
| Page scrolling pauses while the words appear. | Native scrolling continues throughout; removed overflow locking, scroll repositioning, wheel/touch interception, and the release timer. |
| Words start at .14 opacity. | Every word starts at opacity 0, retaining the frosted blur, scale, and stagger. |
| Cards reveal independently. | Visible cards wait for the final word, then enter over 480ms with 0/70/140ms delays. Offscreen mobile cards wait for their own viewport entry. |

- At 908px, sampled scrolling from y=127 to y=255 while the headline remained `playing`; all three cards stayed pending at opacity 0. After the words completed, the cards became `entering` with 0/70/140ms delays, then all reached `visible`.
- The headline starts earlier, when its top reaches 78% of the viewport, to give the sequence room while scrolling continues. Its completion promise coordinates the existing card reveal observer; no duplicate animation system or new dependency was added.
- At 320px, the first card followed the completed headline while the second and third remained pending below the viewport. Scrolling farther triggered the second card alone. Document width remained 320px without overflow.
- Verified keyboard input and Features navigation bypass the sequence and immediately show the words and all feature cards at opacity 1. Reduced-motion and print fallbacks remain intact; preference emulation is unavailable, so those paths were reviewed in code.
- `npm run check` passed for 25 files with zero errors, warnings, or hints. Production build passed for all six pages. The browser console has no warnings or errors. Restored the default viewport and left the homepage at the top, ready to preview.

Screenshot: [headline complete as the cards begin](headline-card-sequence.jpg).
