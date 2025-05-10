module.exports = {
  extends: ['eslint:recommended', 'plugin:astro/recommended'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {},
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {},
    },
    {
      files: ['*.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
};
