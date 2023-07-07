module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#306998",
          DEFAULT: "#3d7aab",
          //light: "#4a8bbe",
          light: "#ffd43b",
        },
        text: {
          dark: "#ffd43b",
          DEFAULT: "white",
          //light: "#4a8bbe",
          light: "#306998",
        },
        background: {
          DEFAULT: "#1c1b1b",
        },
      },
    },
  },
  plugins: [],
};
