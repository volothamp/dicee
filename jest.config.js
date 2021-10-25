module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}', '!<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['jest-chain'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
}
