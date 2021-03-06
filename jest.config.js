module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  watchPathIgnorePatterns: ['results', 'coverage'],
  clearMocks: true,
  collectCoverageFrom: ['**/*.{ts,vue}', '!src/*.ts', '!tests/**', '!coverage/**', '!dist/**', '!**/node_modules/**'],
  coverageReporters: ['text', 'html', 'lcov', 'json-summary']
};
