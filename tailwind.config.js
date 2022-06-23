/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/*.js"],
  theme: {
    extend: {
      fontSize: {
        xs: ".70rem",
      },
      fontFamily: {
        body: ["Lato", "Helvetica", "sans"],
        highlight: ["Playfair Display", "Prata", "serif"],
      },
      colors: {
        Indiblue: "#5E6EFF",
        PotRed: "#F21F58",
        PaleYellow: "#FFFA80",
        DarkBg: "#111111",
        CardBg: "#1E1E1E",
      },
      gridTemplateRows: {
        cardGrid: "auto 1fr auto",
      },
    },
  },
  plugins: [],
};
