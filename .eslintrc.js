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
    // 'no-magic-numbers': ['error', 
    //   { 'ignore': [1, 200, 201, 400, 404, 500] } // Can be extended by other HTTP status codes
    // ],
    'camelcase': 'error',
    'max-len': ['error', { 'code': 120 }]

  }
};
