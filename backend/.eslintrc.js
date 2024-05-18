module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['standard-with-typescript', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {},
	ignorePatterns: ['.eslintrc.js'],
}
