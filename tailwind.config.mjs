/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      spacing: {
        'y-rhythm-1': 'var(--y-rhythm-1)',
        'y-rhythm-2': 'var(--y-rhythm-2)',
        'y-rhythm-3': 'var(--y-rhythm-3)',
        'y-rhythm-4': 'var(--y-rhythm-4)',
        'y-rhythm-5': 'var(--y-rhythm-5)',
      },
      colors: {
        'y-white-base': 'var(--y-white-base)',
        'y-black-base': 'var(--y-black-base)',
        'y-white-medium': 'var(--y-white-medium)',
        'y-arcticle-border-color': 'var(--y-arcticle-border-color)',
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
};
