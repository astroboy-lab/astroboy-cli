const { join } = require('path');
const { existsSync } = require('fs-extra');
const Util = require('../../lib/util');
const ROOT = Util.getProjectRoot()


const DEFAULT_CONFIG = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // setupFiles: ['<rootDir>/test/jest.init.js'],
  transform: {
    '\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  // testMatch: ['<rootDir>/app/__tests__/**/*.test.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__mock__/',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.{js,jsx,ts,tsx}', '!app/__tests__/**'],
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: join(ROOT, './test/coverage'),
};

function readRootConfig() {
  const ROOT_CONFIG_PATH = join(ROOT, 'jest.config.js');

  if (existsSync(ROOT_CONFIG_PATH)) {
    return require(ROOT_CONFIG_PATH);
  }

  return {};
}

module.exports = {
  ...DEFAULT_CONFIG,
  ...readRootConfig(),
};
