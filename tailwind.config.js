module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            animation: {
                fadeIn: 'fadeIn 0.2s ease-in forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                '3/1': '3fr 1fr',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
