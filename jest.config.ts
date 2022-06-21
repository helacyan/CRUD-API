import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  rootDir: "./tests/",
  testRegex: ".spec.ts$",
  setupFilesAfterEnv: ["./jest.setup.js"]
};

export default config;