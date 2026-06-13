/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        DMSans: ["DMSans-Regular"],
        "DMSans-medium": ["DMSans-Medium"],
        "DMSans-semibold": ["DMSans-SemiBold"],
        "DMSans-bold": ["DMSans-Bold"],
      },
    },
  },
  plugins: [],
};
