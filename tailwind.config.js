/** @type {import('tailwindcss').Config} */
const colors = ['blue', 'emerald', 'orange', 'purple', 'pink', 'red', 'teal', 'slate'];
const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

const safelist: string[] = [];
colors.forEach((color) => {
  shades.forEach((shade) => {
    safelist.push(`bg-${color}-${shade}`);
    safelist.push(`text-${color}-${shade}`);
    safelist.push(`border-${color}-${shade}`);
    safelist.push(`from-${color}-${shade}`);
    safelist.push(`to-${color}-${shade}`);
    safelist.push(`ring-${color}-${shade}`);
  });
  safelist.push(`bg-${color}-50`);
});

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist,
  theme: {
    extend: {},
  },
  plugins: [],
};
