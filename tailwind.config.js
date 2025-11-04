/** @type {import('@tailwindcss/postcss7-compat').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Silence the PurgeCSS warning
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false, // Disable PurgeCSS for now to silence the warning
}