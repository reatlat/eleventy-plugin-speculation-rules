import eleventyPluginSpeculationRules from '../.eleventy.js';

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginSpeculationRules, {
        mode: 'prefetch', // prefetch | prerender
        eagerness: 'moderate', // conservative | moderate | eager
        include: [],
        exclude: []
    });
};
