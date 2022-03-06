// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@pages(.*)$': './pages$1',
    '^@lib(.*)$': './lib$1',
  },
  moduleDirectories: ['node_modules', './'],
};
