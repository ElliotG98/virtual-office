/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'brown-600': '#8b4513',
                'brown-700': '#5e290e',
                'brown-800': '#2e1407',
            },
        },
    },
    plugins: [],
};
