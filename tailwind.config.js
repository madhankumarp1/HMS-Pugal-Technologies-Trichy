/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB', // Blue 600
                    foreground: '#FFFFFF',
                },
                secondary: {
                    DEFAULT: '#FACC15', // Yellow 400
                    foreground: '#1F2937', // Gray 800
                },
                background: '#ffffff',
                foreground: '#1f2937', // Gray 800
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
