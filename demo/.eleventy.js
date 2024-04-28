const eleventyPluginSpeculationRules = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginSpeculationRules, {
        mode: 'prefetch', // prefetch | prerender
        eagerness: 'moderate', // conservative | moderate | eager
        include: [],
        exclude: []
    });
};

