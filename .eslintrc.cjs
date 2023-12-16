module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  plugins: [
    'simple-import-sort',
    'unused-imports',
    'import'
  ],
  parserOptions: {
    ecmaversion: 2021
  },
  rules: {
    'space-before-function-paren': 'off',
    'dot-notation': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\w'], ['^@\\w'], ['^', '^\\.'], ['^\\u0000']]
      }
    ],
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'key-spacing': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      env: {
        es2021: true,
        browser: true,
        node: true
      },
      extends: [
        'plugin:qwik/strict',
        'standard-with-typescript'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./packages/website/tsconfig.json', './packages/scripts/tsconfig.json'],
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      plugins: [
        '@typescript-eslint'
      ],
      rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/space-before-function-paren': ['error', 'always'],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/consistent-type-imports': ['error'],
        '@typescript-eslint/array-type': ['error', {
          default: 'generic',
          readonly: 'generic'
        }],
        '@typescript-eslint/key-spacing': 'off',
        '@typescript-eslint/restrict-plus-operands': 'error'
      }
    }
  ]
}
