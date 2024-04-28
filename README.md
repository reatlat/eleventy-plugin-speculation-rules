# eleventy-plugin-speculation-rules
[![npm](https://img.shields.io/npm/v/eleventy-plugin-speculation-rules.svg)](https://npmjs.com/package/eleventy-plugin-speculation-rules)
[![npm](https://img.shields.io/npm/dt/eleventy-plugin-speculation-rules.svg)](https://npmjs.com/package/eleventy-plugin-speculation-rules)
[![license](https://img.shields.io/npm/l/eleventy-plugin-speculation-rules.svg)](https://npmjs.com/package/eleventy-plugin-speculation-rules)

This plugin adds support for the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API), which allows defining rules by which certain URLs are dynamically prefetched or prerendered based on user interaction.

## Installation
Install the plugin from [npm](https://www.npmjs.com/package/eleventy-plugin-speculation-rules):

```
npm install eleventy-plugin-speculation-rules --save-dev
```


Add it to your [Eleventy Config](https://www.11ty.dev/docs/config/) file:

```js
const eleventyPluginSpeculationRules = require('eleventy-plugin-speculation-rules');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginSpeculationRules);
};
```

### Advanced usage:

You can override the default configuration by passing an object to the plugin:

```js
const eleventyPluginSpeculationRules = require('eleventy-plugin-speculation-rules');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginSpeculationRules, {
        mode: 'prerender', // prefetch | prerender
        eagerness: 'moderate', // conservative | moderate | eager
        noPrerenderSelector: '.no-prerender',
        include: [],
        exclude: []
    });
};
```

A filter can be used to exclude certain URL paths from being eligible for prefetching and prerendering. Alternatively, you can add the ‘no-prerender’ CSS class to any link (<a> tag) that should not be prerendered.

#### Speculation Mode
- `prefetch` - The browser will prefetch the URL when the user hovers over the link.
- `prerender` - The browser will prerender the URL when the user hovers over the link.

***Prerendering will lead to faster load times than prefetching. However, in case of interactive content, prefetching may be a safer choice.***

#### Speculation Eagerness
- `conservative` - The browser will only speculate on the URL when it is highly confident that the user will navigate to it.
- `moderate` - The browser will speculate on the URL when it is somewhat confident that the user will navigate to it.
- `eager` - The browser will speculate on the URL when it is somewhat confident that the user will navigate to it.

***The eagerness setting defines the heuristics based on which the loading is triggered. "Eager" will have the minimum delay to start speculative loads, "Conservative" increases the chance that only URLs the user actually navigates to are loaded.***

## Browser support

The Speculation Rules API is a new web API, and the functionality used by the plugin is supported in Chromium-based browsers such as Chrome, Edge, or Opera using version 121 or above. Other browsers such as Safari and Firefox will ignore the functionality with no ill effects but will not benefit from the speculative loading. Note that extensions may disable preloading by default (for example, uBlock Origin does this).

Other browsers will not see any adverse effects, however the feature will not work for those clients.

- [Browser support for the Speculation Rules API in general](https://caniuse.com/mdn-html_elements_script_type_speculationrules)
- [Information on document rules syntax support used by the plugin](https://developer.chrome.com/blog/chrome-121-beta#speculation_rules_api)

## Contributing
If you notice an issue, feel free to [open an issue](https://github.com/reatlat/eleventy-plugin-speculation-rules/issues).

1. Fork this repo
2. Clone `git clone git@github.com:reatlat/eleventy-plugin-speculation-rules.git`
3. Install dependencies `npm install`
4. Build `npm run build`
5. Serve locally `npm run dev`


## License
The code is available under the [MIT license](LICENSE).
