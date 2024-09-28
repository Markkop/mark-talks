import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji'
				]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: '#0f0f0f',
				foreground: '#C6CEC5',
				primary: {
					DEFAULT: '#0FF0FC',
					foreground: '#0f0f0f'
				},
				secondary: {
					DEFAULT: '#C6CEC5',
					foreground: '#0f0f0f'
				},
				accent: {
					DEFAULT: '#0FF0FC',
					foreground: '#0f0f0f'
				},
				surface: '#1f1f1f',
				muted: {
					DEFAULT: '#1f1f1f',
					foreground: '#C6CEC5'
				},
				destructive: {
					DEFAULT: '#FF8A59',
					foreground: '#0f0f0f'
				},
				border: '#C6CEC5',
				input: '#1f1f1f',
				ring: '#0FF0FC',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
