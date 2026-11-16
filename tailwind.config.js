/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins_400Regular'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
        'jakarta': ['PlusJakartaSans_400Regular'],
        'jakarta-semibold': ['PlusJakartaSans_500Medium'],
        'jakarta-bold': ['PlusJakartaSans_700Bold'],
        'jakarta-thin': ['PlusJakartaSans_300Light'],
      },
    },
  },
  plugins: [],
};

