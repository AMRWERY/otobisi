import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
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
  safelist: [
    { pattern: /^icon-/ },
    { pattern: /^animate-icon-/ },
    { pattern: /^group-hover:icon-/ },
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
      transitionProperty: {
        icon: "transform, color, background-color, fill, stroke, opacity",
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
        "icon-wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-12deg)" },
          "75%": { transform: "rotate(12deg)" },
        },
        "icon-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        "icon-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "icon-pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.1)" },
        },
        "icon-spin-smooth": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-out": "fade-out 150ms cubic-bezier(0.4, 0, 0.2, 1)",
        "seat-select": "seat-select 120ms cubic-bezier(0.4, 0, 0.2, 1)",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        "icon-wiggle": "icon-wiggle 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        "icon-pop": "icon-pop 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        "icon-bounce": "icon-bounce 350ms cubic-bezier(0.4, 0, 0.2, 1)",
        "icon-pulse": "icon-pulse-glow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "icon-spin": "icon-spin-smooth 1s linear infinite",
        "icon-spin-slow": "icon-spin-smooth 3s linear infinite",
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
    plugin(function ({ addBase, addComponents, addUtilities }) {
      // 1. Global base rules for all icons across the site
      addBase({
        "svg, .iconify, [data-icon]": {
          display: "inline-block",
          verticalAlign: "middle",
          transformOrigin: "center",
          transitionProperty: "transform, color, background-color, fill, stroke, opacity",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        },
      });

      // 2. Interactive hover transitions when parent is hovered
      addComponents({
        "a:hover .iconify, button:hover .iconify, [role='button']:hover .iconify, .group:hover .iconify": {
          transitionProperty: "transform, color, background-color, fill, stroke, opacity",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
      });

      // 3. Reusable utility classes for any icon
      addUtilities({
        ".icon-interactive": {
          cursor: "pointer",
          display: "inline-block",
          verticalAlign: "middle",
          transformOrigin: "center",
          transitionProperty: "transform, color, background-color, opacity",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
          "&:hover": {
            transform: "scale(1.15)",
          },
          "&:active": {
            transform: "scale(0.92)",
          },
        },
        ".icon-hover-lift": {
          display: "inline-block",
          verticalAlign: "middle",
          transitionProperty: "transform, color, opacity",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-3px)",
          },
        },
        ".icon-hover-rotate": {
          display: "inline-block",
          verticalAlign: "middle",
          transformOrigin: "center",
          transitionProperty: "transform, color, opacity",
          transitionDuration: "250ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "rotate(90deg)",
          },
        },
        ".icon-hover-spin": {
          display: "inline-block",
          verticalAlign: "middle",
          transformOrigin: "center",
          transitionProperty: "transform, color, opacity",
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "rotate(360deg)",
          },
        },
        ".icon-hover-wiggle": {
          display: "inline-block",
          verticalAlign: "middle",
          transformOrigin: "center",
          "&:hover": {
            animation: "icon-wiggle 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
        ".icon-hover-pop": {
          display: "inline-block",
          verticalAlign: "middle",
          transformOrigin: "center",
          "&:hover": {
            animation: "icon-pop 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
        ".icon-hover-bounce": {
          display: "inline-block",
          verticalAlign: "middle",
          transformOrigin: "center",
          "&:hover": {
            animation: "icon-bounce 350ms cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
        // Group-hover variants when placed directly on the icon inside a .group
        ".group:hover .group-hover\\:icon-scale": {
          transform: "scale(1.15)",
        },
        ".group:hover .group-hover\\:icon-lift": {
          transform: "translateY(-3px)",
        },
        ".group:hover .group-hover\\:icon-rotate": {
          transform: "rotate(90deg)",
        },
        ".group:hover .group-hover\\:icon-spin": {
          transform: "rotate(360deg)",
        },
        ".group:hover .group-hover\\:icon-wiggle": {
          animation: "icon-wiggle 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
        ".group:hover .group-hover\\:icon-pop": {
          animation: "icon-pop 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        },
        ".group:hover .group-hover\\:icon-slide-right": {
          transform: "translateX(4px)",
        },
        ".group:hover .group-hover\\:icon-slide-left": {
          transform: "translateX(-4px)",
        },
      });
    }),
  ],
} satisfies Partial<Config>;