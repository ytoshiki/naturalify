import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginTS from '@typescript-eslint/eslint-plugin'
import eslintParserTS from '@typescript-eslint/parser'

export default [
  {
    ignores: ['node_modules/', 'dist/'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: eslintParserTS,
    },
    plugins: {
      '@typescript-eslint': eslintPluginTS,
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  eslintConfigPrettier,
]
