module.exports = {
  root: true,
  ignorePatterns: ["projects/*/"],
  overrides: [
      {
          files: [".ts"],
          parserOptions: {
              project: ["tsconfig.json"],
              createDefaultProgram: true,
              tsconfigRootDir: __dirname,
          },
          extends: [
              "plugin:@angular-eslint/recommended",
              "plugin:@angular-eslint/template/process-inline-templates",
          ],
          rules: {
              "@angular-eslint/directive-selector": [
                  "error",
                  {
                      type: "attribute",
                      prefix: "app",
                      style: "camelCase",
                  },
              ],
              "@angular-eslint/component-selector": [
                  "error",
                  {
                      type: "element",
                      prefix: "app",
                      style: "kebab-case",
                  },
              ],
              "@typescript-eslint/no-floating-promises": "warn",
              "@typescript-eslint/no-unused-vars": "warn",
              "@typescript-eslint/no-inferrable-types": "warn",
          },
      },
      {
          files: [".html"],
          extends: ["plugin:@angular-eslint/template/recommended"],
          rules: {},
      },
  ],
};