import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // Set the site URL for production
  site: 'https://studio-elan.netlify.app',
  // Configure base directory if needed
  base: '/',
  // Enable server-side rendering for specific pages if needed
  output: 'static',
});