module.exports = function(config) {
  config.set({
      frameworks: ["jasmine", "karma-typescript"],
      files: [
          "test/**/*.ts",
          "test/**/*.tsx",
      ],
      preprocessors: {
          "**/*.ts": "karma-typescript",
          "**/*.tsx": "karma-typescript"
      },
      reporters: ["progress", "karma-typescript"],
      browsers: ["Chrome"]
  });
};