module.exports = {
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^@/components/(.*)$',
    '^@/hooks/(.*)$',
    '^@/store/(.*)$',
    '^@/styles/(.*)$',
    '^@/assets/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
