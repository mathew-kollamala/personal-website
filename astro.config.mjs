import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-personal-website.com',
  // Use src directory for source files
  srcDir: './src',
  // Output to dist directory
  outDir: './dist',
  // Static site generation
  output: 'static',
  // Enable build optimization
  build: {
    // Inline small CSS files
    inlineStylesheets: 'auto',
  },
  // Development server configuration
  server: {
    port: 4321,
    host: true, // Expose to all network interfaces
  },
  // Enable image optimization
  image: {
    // Enable image service
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  // Improve performance with prefetching
  prefetch: true,
  // Add integrations
  integrations: [react()],
});
