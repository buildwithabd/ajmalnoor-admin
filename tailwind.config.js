/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter_400Regular", "sans-serif"],
        bold: ["Inter_700Bold", "sans-serif"],
        mono: ["SpaceMono_400Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
