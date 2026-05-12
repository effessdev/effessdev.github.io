module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles.css");

  return {
    dir: {
      input: "./src",
      output: ".",
      includes: "_includes",
      data: "_data",
    },
  };
};
