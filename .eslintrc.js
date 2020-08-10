module.exports = {
  'env': {
    'commonjs': true,
    'es2020': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 11
  },
  'rules': {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-eval': 'error',
    'no-multi-spaces': 'error',
    'capitalized-comments': 'error',
    'eol-last': ['error', 'always'],
    'no-dupe-keys': 'error',
    'no-irregular-whitespace': 'error',
    'camelcase': 'error',
    'max-len': ['error', { 'code': 120 }],
    'no-tabs': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'prefer-const': 'error'
  }
};
