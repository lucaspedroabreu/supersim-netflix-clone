/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-hero': "url(https://www.nolanfans.com/wordpress/wp-content/uploads/2010/06/inception_new_banner_large.jpg)",
      }
    },
  },
  plugins: [],
}

