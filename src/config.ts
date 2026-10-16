export const site = {
  name: 'Paglyph',
  description: 'Look up words faster, stay in the story. Capture a page, tap a word, and understand what it means in the sentence you’re reading.',
  supportEmail: 'adityarohman@paglyph.app',
  // Set PUBLIC_DOWNLOAD_URL to the App Store or TestFlight URL when available.
  // Until then, the download button shows a coming-soon toast and falls back to /download/ without JavaScript.
  appStoreUrl: import.meta.env.PUBLIC_DOWNLOAD_URL as string | undefined,
  downloadUrl: import.meta.env.PUBLIC_DOWNLOAD_URL || '/download/',
  termsUrl: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
};
