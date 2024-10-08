module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:react-hooks/recommended",
    'plugin:cypress/recommended',
  ],
  plugins: ['react', 'cypress'],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: {
        map: [["~", "./src"]],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/no-named-as-default': 'error',
    'import/no-unresolved': 'error',
    'react/display-name': 'warn',
    '@typescript-eslint/ban-types': 'error',
    'import/named': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'eqeqeq': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'consistent-return': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    'react/prop-types': 'off',
  },
};
