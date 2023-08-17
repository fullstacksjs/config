const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    test: true,
    typescript: {
      parserProject: './tsconfig.eslint.json',
    },
  },
});
