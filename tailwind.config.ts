import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                refresh: {
                    "0%": { transform: "rotate(45deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
            animation: {
                refresh: "refresh 1s ease-in-out infinite",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    darkMode: "selector",
    plugins: [],
};
export default config;
