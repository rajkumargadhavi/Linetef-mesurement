module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser', // Updated from babel-eslint
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env']
    }
  },
  env: {
    browser: true,
    webextensions: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  plugins: ['vue'],
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js'
      }
    }
  },
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
        'acc',
        'e'
      ]
    }],
    'import/prefer-default-export': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "max-len": ["error", 120, 2],
    "vue/multi-word-component-names": "off" // Add this to avoid Vue 2.x component name warnings
  }
}