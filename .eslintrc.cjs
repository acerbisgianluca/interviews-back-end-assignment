/* eslint-env node */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:drizzle/recommended'
    ],
    plugins: ['@typescript-eslint', 'drizzle'],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
};
