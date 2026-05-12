module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles.css");

  return {
    dir: {
      input: ".",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
  };
};
