/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
            red: {
              light: "#F5B9B0",
              default: "#E55039",
              dark: "#B7402E",
            },
            blue: {
              light: "#92A5D7",
              default: "#4A69BD",
              dark: "#25355F",
            },
            yellow: {
              light: "#FAD589",
              default: "#F6B93B",
              dark: "#7B5D1E",
            },
            green: {
              light: "#AEECBC",
              default: "#78E08F",
              dark: "#3C7048",
            },
            sky: {
              light: "#A0C8D7",
              default: "#60A3BC",
              dark: "#30525E",
            },
      },
      animationDelay: {
        100: "3s",
        200: "6s",
        300: "9s",
        400: "12s",
        500: "15s",
        600: "18s",
        700: "21s",
   
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        'move':{
          "0%":{
            transform:"translateY(-100px) rotate(-90deg)"
          },
          "100%":{     transform:"translateY(2500px) rotate(-90deg)"}
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        move:"move infinite 14s ease "
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-animation-delay"),],
}