// Entrance animations (headline, scroll reveals, app icon preview) play only on desktop.
// Tablets and phones (up to 1024px wide, or any touch-first device such as an iPad in landscape) show content at rest.
const touchLayout = window.matchMedia('(max-width: 1024px), (pointer: coarse)');

export const entranceMotionAllowed = () => !touchLayout.matches;
