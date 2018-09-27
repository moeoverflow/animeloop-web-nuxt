const { join } = require('path');
const createResolver = require('postcss-import-resolver');
// const bemLinter = require('postcss-bem-linter');

module.exports = () => ({
  sourceMap: true,
  plugins: {
    'postcss-import': {
      resolve: createResolver({
        alias: {
          '~': join(__dirname),
          // '~~': join(__dirname),
          '@': join(__dirname),
          // '@@': join(__dirname),
        },
      }),
    },
    'postcss-url': {},
    // tailwindcss: './tailwind.js',
    // 'postcss-cssnext': {
    //   browserslist: [
    //     '> 1%',
    //   ],
    //   features: {
    //     customProperties: false,
    //   },
    // },
    'postcss-preset-env': {
      stage: 3,
      features: {
        'color-mod-function': {
          unresolved: 'warn',
        },
        'nesting-rules': true,
      },
    },
    // 'postcss-bem-linter': {
    //   preset: 'suit',
    //   // implicitComponents: 'src/components#<{(||)}>#*.vue',
    //   // presetOptions: { namesace: 'twt' },
    //   ignoreSelectors: [
    //     /^\[v-cloak\]$/,
    //   ],
    // },
    'postcss-reporter': {},
  },
});
