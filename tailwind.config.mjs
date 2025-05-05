/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // Define the Lao font family
        lao: ['var(--font-noto-sans-lao)', 'Noto Sans Lao', 'Phetsarath OT', 'Saysettha OT', 'sans-serif'],
        // Optional: Define a Latin font family for multilingual content
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
    },
  },
  plugins: [],
};
