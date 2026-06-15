# Wolf Blocks — Claude Code Context

## What this is
WordPress Gutenberg blocks plugin for WolfThemes.
Registers reusable UI blocks that consume CSS vars from the active theme.
Author: Constantin Saguin (WolfThemes, Power Elite ThemeForest).

## Architecture reference
Mirrors wolf-store OOP structure (../wolf-store/).
When adding a block, follow the same pattern as existing blocks.

## CSS contract — CRITICAL
This plugin NEVER hardcodes colors, font names, or spacing values.
Every visual property consumes a CSS custom property:
- Colors: var(--wp--preset--color--*)
- Fonts: var(--wp--preset--font-family--*)
- Spacing: var(--wp--preset--spacing--*)
- Wolf tokens: var(--wolf-radius-*), var(--wolf-border-color), etc.

Full contract: see BOUNDARIES.md and ../seijaku-fse/BOUNDARIES.md

## Blocks inventory
| Block | Status | Notes |
|---|---|---|
| wolf-blocks/marquee | ✅ implemented | scrolling text band |
| wolf-blocks/stats-counter | 🔲 scaffold | animated number counter |
| wolf-blocks/testimonial-card | 🔲 scaffold | quote + author |
| wolf-blocks/pricing-table | 🔲 scaffold | pricing tiers |

## Adding a new block
1. Create src/blocks/{name}/ with block.json, index.js, save.js, style.scss
2. Add JS entry and SCSS entry to webpack.config.js
3. Add slug to Block_Loader::register_blocks() array in Functions/Core/Block_Loader.php
4. Update this inventory table

## block.json style convention
- `"style": "file:./style.css"` — compiled from style.scss via webpack SCSS entry
- `"editorStyle": "file:./index.css"` — extracted from editor.scss imported in index.js
- `"editorScript": "file:./index.js"` — compiled JS bundle

## Commands
```
npm run start    ← dev watch
npm run build    ← production build
npm run lint:js  ← JS linting
npm run lint:css ← SCSS linting
npm run lint:php ← PHP linting
```

## Related projects
- Theme: ../seijaku-fse/ (reads BOUNDARIES.md)
- Store plugin: ../wolf-store/ (architecture reference)
- Parent theme: ../wolf-blank/ (defines --wolf-* vars)
