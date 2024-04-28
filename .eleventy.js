module.exports = (eleventyConfig, attributes = {}) => {

    const defaultAttributes = {
        mode: 'prerender', // prefetch | prerender
        eagerness: 'moderate', // conservative | moderate | eager
        noPrerenderSelector: '.no-prerender',
        include: [],
        exclude: []
    }

    const globalAttributes = {...defaultAttributes, ...attributes};

    let speculationRules = {
        "source": "document",
        "where": {
            "and": [
                {
                    "href_matches": ["\/*"]
                },
                {
                    "not": {
                        "selector_matches": "a[rel=nofollow]"
                    }
                }
            ]
        },
        "eagerness": globalAttributes.eagerness
    };

    if (globalAttributes.include.length > 0) {
        if (!Array.isArray(globalAttributes.include)) {
            throw new Error(
                "[eleventy-plugin-speculation-rules] the `include` attribute must be an array"
            );
        }
        speculationRules.where.and[0].href_matches = [...speculationRules.where.and[0].href_matches, ...globalAttributes.include];
    }

    if (globalAttributes.exclude.length > 0) {
        if (!Array.isArray(globalAttributes.exclude)) {
            throw new Error(
                "[eleventy-plugin-speculation-rules] the `exclude` attribute must be an array"
            );
        }
        speculationRules.where.and.push({
            "not": {
                "href_matches": globalAttributes.exclude
            }
        });
    }

    if (globalAttributes.mode === 'prefetch') {
        speculationRules = {
            "prefetch": [speculationRules]
        }
    } else {
        speculationRules.where.and.push({
            "not": { "selector_matches": globalAttributes.noPrerenderSelector }
        });
        speculationRules = {
            "prerender": [speculationRules]
        }
    }

    const jsonString = JSON.stringify(speculationRules);

    eleventyConfig.addTransform("speculation-rules", function (content, outputPath) {
        if (outputPath.endsWith(".html")) {
            content = content.replace(/<\/body>/, `<script type="speculationrules">${jsonString}</script></body>`);
        }
        return content;
    });

};
