module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  globals: {
    uni: true,
    plus: true,
  },
  rules: {
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/no-unresolved': ['off'], // 以上三项用于import '@'等问题
    'import/prefer-default-export': ['off'], // 若仅有一项，则需要用export default而不是仅仅export
    'no-underscore-dangle': ['off'], // 下划线命名规则
    'no-restricted-syntax': ['off'], // 禁用for...in，推荐map等
  },
};
