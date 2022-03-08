/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  clearMocks: true,

  coverageDirectory: "coverage",
  moduleDirectories: ["node_modules", "<rootDir>"],

  coverageProvider: "v8",
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.scss$": "jest-scss-transform",
    ".+\\.(png|jpg|svg)$": "jest-transform-stub",
  },

  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/src/setupTests.ts",
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // testMatch: [
  //   "<rootDir>/src/**/__tests__/**/*.{ts,js,jsx,mjs}",
  //   "<rootDir>/src/**/?(*.)(spec|test).{ts,js,jsx,mjs}",
  // ],
};
