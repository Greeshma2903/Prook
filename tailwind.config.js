/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/*.js"],
  theme: {
    extend: {
      fontFamily:{
        body: ["Lato", "Helvetica", "sans"],
        highlight: ["Playfair Display", "serif"]
      }
    },
  },
  plugins: [],
}
