/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|woff2?)$': '<rootDir>/test/styleMock.js',
  },
  // next-intl/use-intl ship ESM-only builds in node_modules — the default
  // "don't transform node_modules" behavior leaves their `export`/`import`
  // syntax unparsed by Jest. Let @swc/jest transform just these two.
  transformIgnorePatterns: ['node_modules/(?!(next-intl|use-intl)/)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
};
