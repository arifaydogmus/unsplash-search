module.exports = {
  roots: ['<rootDir>'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.(test|spec).(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/demo/'],
  coveragePathIgnorePatterns: ['/dist/', '/node_modules/', '/demo/'],
};
