import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        nav: "1080px",
      },
      colors: {
        blush: {
          DEFAULT: "#FDF0F4",
          50: "#FFF5F7",
          100: "#FDF0F4",
          200: "#FCE7ED",
          300: "#F9D0DC",
        },
        ink: {
          DEFAULT: "#241221",
          light: "#3A2236",
          dark: "#1A0C18",
          muted: "#5C475A",
        },
        "ink-muted": "#5C475A",
        magenta: {
          DEFAULT: "#E6127E",
          hover: "#C90E6D",
          light: "#F53597",
          dark: "#B80C64",
          blush: "#FCE8F3",
          deep: "#B80C64",
        },
        "magenta-blush": "#FCE8F3",
        "magenta-deep": "#B80C64",
        gold: {
          DEFAULT: "#F59E0B",
          light: "#FDE68A",
          dark: "#D97706",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "pill-3d": "0 4px 14px 0 rgba(230, 18, 126, 0.39), inset 0 1px 0 0 rgba(255, 255, 255, 0.35)",
        "pill-ink": "0 4px 14px 0 rgba(36, 18, 33, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
        "card": "0 20px 45px -15px rgba(36, 18, 33, 0.08), 0 4px 16px -2px rgba(36, 18, 33, 0.04)",
        "card-hover": "0 25px 50px -12px rgba(36, 18, 33, 0.15), 0 8px 24px -4px rgba(36, 18, 33, 0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

