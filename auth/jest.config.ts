/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },

  // collectCoverage: true,
  // coveragePathIgnorePatterns: ["/node_modules/"],
  // coverageDirectory: "./coverage",

  resetMocks: true,
  clearMocks: true,
};
