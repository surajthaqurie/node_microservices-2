/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
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

  moduleNameMapper: {
    "^src/(.*)": "<rootDir>/src/$1",
  },
};

export default config;
