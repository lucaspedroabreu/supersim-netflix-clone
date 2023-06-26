/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-hero': "url('https://www.nolanfans.com/wordpress/wp-content/uploads/2010/06/inception_new_banner_large.jpg')",
        'login-image': "url('https://cdn.wallpapersafari.com/24/74/zgeTuV.jpg')",
        'login-bg-fade': "url('https://assets.nflxext.com/ffe/siteui/vlv3/757ab38f-5d08-40bc-b3eb-eaba63edB203/93c34f94-56c8-40a7-8b2e-b4aac6427977/GB-en-20210125-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
      },
      colors: {
        netflix: '#e50914'
      }
    },
  },
  plugins: [],
}

