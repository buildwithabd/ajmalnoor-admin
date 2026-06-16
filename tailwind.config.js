/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        DMSans: ["DMSans-Regular"],
        "DMSans-Medium": ["DMSans-Medium"],
        "DMSans-SemiBold": ["DMSans-SemiBold"],
        "DMSans-Bold": ["DMSans-Bold"],
      },
    },
  },
  plugins: [],
};
