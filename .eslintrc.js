const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: true,
    test: true,
    typescript: {
      parserProject: './tsconfig.eslint.json',
    },
  },
  rules: {
    '@typescript-eslint/restrict-template-expressions': 'off',
    'no-console': 'error',
  },
});
