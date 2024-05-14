import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: false,
  silent: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.styles.ts',
    '!src/**/assets/**',
    '!src/**/icons/**',
  ],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: ['/node_modules/'],
}

export default config
