# eleventy-plugin-speculation-rules
[![npm](https://img.shields.io/npm/v/eleventy-plugin-speculation-rules.svg)](https://npmjs.com/package/eleventy-plugin-speculation-rules)
[![npm](https://img.shields.io/npm/dt/eleventy-plugin-speculation-rules.svg)](https://npmjs.com/package/eleventy-plugin-speculation-rules)
[![license](https://img.shields.io/npm/l/eleventy-plugin-speculation-rules.svg)](https://npmjs.com/package/eleventy-plugin-speculation-rules)

This plugin adds support for the [Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API), which allows defining rules by which certain URLs are dynamically prefetched or prerendered based on user interaction.

Demo: [https://eleventy-plugin-speculation-rules.netlify.app/](https://eleventy-plugin-speculation-rules.netlify.app/)

## Requirements

- Eleventy 2.0 or higher (CJS) / Eleventy 3.0 or higher (ESM)

## Installation

Install the plugin from [npm](https://www.npmjs.com/package/eleventy-plugin-speculation-rules):

```
npm install eleventy-plugin-speculation-rules --save-dev
```

## Configuration

- `mode` - The speculation mode. Default: `prerender`, options: `prefetch`, `prerender`
- `eagerness` - The eagerness level for speculation. Default: `moderate`, options: `conservative`, `moderate`, `eager`
- `noPrerenderSelector` - CSS selector for links that should not be prerendered. Default: `.no-prerender`
- `include` - Array of URL patterns to include. Default: `[]`
- `exclude` - Array of URL patterns to exclude. Default: `[]`

By default, the plugin excludes `.zip` and `.pdf` files, as well as links with `rel="nofollow"`.

## Usage

Add it to your [Eleventy Config](https://www.11ty.dev/docs/config/) file:

**ESM (Eleventy 3.x):**

```js
import eleventyPluginSpeculationRules from 'eleventy-plugin-speculation-rules';

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginSpeculationRules);
};
```

**CommonJS (Eleventy 2.x):**

```js
const eleventyPluginSpeculationRules = require('eleventy-plugin-speculation-rules');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginSpeculationRules);
};
```

### Advanced usage:

```js
import eleventyPluginSpeculationRules from 'eleventy-plugin-speculation-rules';

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginSpeculationRules, {
        mode: 'prerender',
        eagerness: 'moderate',
        noPrerenderSelector: '.no-prerender',
        include: [],
        exclude: ['/admin/*']
    });
};
```

## What does it do?

The plugin injects a `<script type="speculationrules">` tag into the `<head>` of your HTML pages with rules that tell the browser which links to prefetch or prerender.

A filter can be used to exclude certain URL paths from being eligible for prefetching and prerendering. Alternatively, you can add the `.no-prerender` CSS class to any link (`<a>` tag) that should not be prerendered.

### Speculation Mode

- `prefetch` - The browser will prefetch the URL when the user hovers over the link.
- `prerender` - The browser will prerender the URL when the user hovers over the link.

Prerendering will lead to faster load times than prefetching. However, in case of interactive content, prefetching may be a safer choice.

### Speculation Eagerness

- `conservative` - Speculates only on click
- `moderate` - Speculates on hover
- `eager` - Speculates on slightest indication

The eagerness setting defines the heuristics based on which the loading is triggered. "Eager" will have the minimum delay to start speculative loads, "Conservative" increases the chance that only URLs the user actually navigates to are loaded.

## Browser support

The Speculation Rules API is a new web API, and the functionality used by the plugin is supported in Chromium-based browsers such as Chrome, Edge, or Opera using version 121 or above. Other browsers such as Safari and Firefox will ignore the functionality with no ill effects but will not benefit from the speculative loading. Note that extensions may disable preloading by default (for example, uBlock Origin does this).

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
