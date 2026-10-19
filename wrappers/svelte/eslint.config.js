import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';

export default [
	{
		ignores: [
			'.DS_Store',
			'node_modules/**',
			'build/**',
			'.svelte-kit/**',
			'package/**',
			'dist/**',
			'static/**',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		]
	},
	{ ...js.configs.recommended, files: ['**/*.{js,mjs,cjs}'] },
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tsParser
			},
			globals: {
				browser: true,
				node: true
			}
		}
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,tsx,svelte}'],
		languageOptions: {
			sourceType: 'module',
			globals: {
				browser: true,
				node: true
			}
		},
		plugins: {
			'@typescript-eslint': tsPlugin
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			]
		}
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 'latest'
		}
	}
];
