/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eef7ff',
                    100: '#d9ecff',
                    200: '#bbdcff',
                    300: '#8cc4ff',
                    400: '#56a2ff',
                    500: '#2e80ff',
                    600: '#1a62ed',
                    700: '#164dc6',
                    800: '#1640a1',
                    900: '#163a80',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
            },
            boxShadow: {
                card: '0 6px 24px -8px rgba(15,23,42,0.12)',
            },
        },
    },
    plugins: [],
};
