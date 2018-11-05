/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
module.exports = {
  root: true,
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    'weex'
  ],
  rules: {
    'weex/vue/comment-directive': 'error',
    'weex/vue/jsx-uses-vars': 'error'
  }
}
