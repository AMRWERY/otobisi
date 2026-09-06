import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cairo", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        accent: {
          50: "#e6f8f5",
          100: "#c1ede6",
          200: "#98e1d6",
          300: "#6dd5c6",
          400: "#45c9b7",
          500: "#22a693", // primary buttons, links, active states
          600: "#188577",
          700: "#11655c",
          800: "#0b4640",
          900: "#062824",
        },
        success: {
          light: "#e7f6ec",
          DEFAULT: "#1f9d55",
          dark: "#0f5c31",
        },
        warning: {
          light: "#fdf3e3",
          DEFAULT: "#d97706",
          dark: "#7c3f05",
        },
        danger: {
          light: "#fcebeb",
          DEFAULT: "#dc2626",
          dark: "#7f1d1d",
        },
        info: {
          light: "#e6f1fb",
          DEFAULT: "#2563eb",
          dark: "#1e3a8a",
        },
        surface: {
          0: "var(--surface-0)", // page background
          1: "var(--surface-1)", // cards
          2: "var(--surface-2)", // raised elements (modals, sheets)
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
      transitionTimingFunction: {
        app: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "300ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "seat-select": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-out": "fade-out 150ms cubic-bezier(0.4, 0, 0.2, 1)",
        "seat-select": "seat-select 120ms cubic-bezier(0.4, 0, 0.2, 1)",
        shimmer: "shimmer 1.6s ease-in-out infinite",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-rtl"),
  ],
};