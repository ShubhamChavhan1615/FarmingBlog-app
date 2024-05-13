/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'AboutusImg': "url('https://media.istockphoto.com/id/1792119618/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.webp?b=1&s=170667a&w=0&k=20&c=KLTFsfeGdgajzSJKgenFz4_fm7BgUKoR9-xr3kBXo_4=')",
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}