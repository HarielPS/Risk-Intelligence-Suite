/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          hover: "hsl(var(--muted-hover))",
          foreground: "hsl(var(--muted-foreground))",
        },

        focus: {
          DEFAULT: "hsl(var(--focus))",
          hover: "hsl(var(--focus-hover))",
          hover2: "hsl(var(--focus-hover-2))",
        },

        success: {
          DEFAULT: "hsl(var(--success))",
          hover: "hsl(var(--success-hover))",
        },

        warning: {
          DEFAULT: "hsl(var(--warning))",
          hover: "hsl(var(--warning-hover))",
        },

        danger: {
          DEFAULT: "hsl(var(--danger))",
          hover: "hsl(var(--danger-hover))",
        },

        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [],
};
