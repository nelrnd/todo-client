import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "dialog-content":
          "dialogContentShow 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "menu-content": "menuContentShow 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
}
