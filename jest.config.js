module.exports = {
  testEnvironment: 'node',
  rootDir: 'smart-contracts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: []
};
