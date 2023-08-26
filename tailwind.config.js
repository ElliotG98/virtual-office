import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
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
    plugins: [nextui()],
    darkMode: 'class',
};
