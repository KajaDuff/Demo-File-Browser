const { ignorePatterns } = require("./.eslintrc");

module.exports = [
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
    },
    ignorePatterns: [".env"],
  },
];
