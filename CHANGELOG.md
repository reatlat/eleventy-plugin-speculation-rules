# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-12-24

### Changed
- Migrated to ES modules (ESM) as primary format
- Script injection moved from `</body>` to `</head>` for better performance
- Moved `@11ty/eleventy` from dependencies to peerDependencies (requires `>=2.0.0`)
- Updated all documentation examples to ESM

### Added
- Dual package support (ESM + CJS) via exports field
- CommonJS wrapper (`.eleventy.cjs`) for backwards compatibility
- Default exclusions for `.zip` and `.pdf` files
- `linkedom` for reliable HTML parsing

## [1.1.0] - 2024-01-15

### Changed
- Ensure correct script placement in HTML

## [1.0.2] - 2024-01-10

### Fixed
- Bug fix: `outputPath.endsWith is not a function`

## [1.0.0] - 2024-01-01

### Added
- Initial release
- Support for Speculation Rules API
- Configurable modes: `prerender` and `prefetch`
- Configurable eagerness: `conservative`, `moderate`, `eager`
- Include/exclude URL patterns
- `noPrerenderSelector` option for excluding links via CSS selector
