/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        dm: ["DMSans-Regular"],
        dmMedium: ["DMSans-Medium"],
        dmSemi: ["DMSans-SemiBold"],
        dmBold: ["DMSans-Bold"],
        mono: ["CourierNew"],
      },
    },
  },
  plugins: [],
};
