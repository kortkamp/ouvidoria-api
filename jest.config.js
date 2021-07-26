/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts'
  ],
  preset: 'ts-jest',
  //timers: "fake",
  testEnvironment: 'node',
  'roots': [
    '<rootDir>/src'
  ],
  'transform': {
      '^.+\\.tsx?$': 'ts-jest'
  },
  'moduleNameMapper': {
      '@modules/(.*)': '<rootDir>/src/modules/$1',
      '@shared/(.*)': '<rootDir>/src/shared/$1',
      '@config/(.*)': '<rootDir>/src/config/$1'
      
  }
};