import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          "500": "#24AE7C",
          "600": "#0D2A1F",
        },
        blue: {
          "500": "#79B5EC",
          "600": "#152432",
        },
        red: {
          "500": "#F37877",
          "600": "#3E1716",
          "700": "#F24E43",
        },
        light: {
          "200": "#E8E9E9",
        },
        dark: {
          "200": "#0D0F10",
          "300": "#131619",
          "400": "#1A1D21",
          "500": "#363A3D",
          "600": "#76828D",
          "700": "#ABB8C4",
        },

        // background: 'hsl(var(--background))',
        // foreground: 'hsl(var(--foreground))',
        // card: {
        // 	DEFAULT: 'hsl(var(--card))',
        // 	foreground: 'hsl(var(--card-foreground))'
        // },
        // popover: {
        // 	DEFAULT: 'hsl(var(--popover))',
        // 	foreground: 'hsl(var(--popover-foreground))'
        // },
        // primary: {
        // 	DEFAULT: 'hsl(var(--primary))',
        // 	foreground: 'hsl(var(--primary-foreground))'
        // },
        // secondary: {
        // 	DEFAULT: 'hsl(var(--secondary))',
        // 	foreground: 'hsl(var(--secondary-foreground))'
        // },
        // muted: {
        // 	DEFAULT: 'hsl(var(--muted))',
        // 	foreground: 'hsl(var(--muted-foreground))'
        // },
        // accent: {
        // 	DEFAULT: 'hsl(var(--accent))',
        // 	foreground: 'hsl(var(--accent-foreground))'
        // },
        // destructive: {
        // 	DEFAULT: 'hsl(var(--destructive))',
        // 	foreground: 'hsl(var(--destructive-foreground))'
        // },
        // border: 'hsl(var(--border))',
        // input: 'hsl(var(--input))',
        // ring: 'hsl(var(--ring))',
        // chart: {
        // 	'1': 'hsl(var(--chart-1))',
        // 	'2': 'hsl(var(--chart-2))',
        // 	'3': 'hsl(var(--chart-3))',
        // 	'4': 'hsl(var(--chart-4))',
        // 	'5': 'hsl(var(--chart-5))'
        // }
      },

      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
      },
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
      "caret-blink": {
        "0%,70%,100%": { opacity: "1" },
        "20%,50%": { opacity: "0" },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
