# Wolf Blocks — Claude Code Context


## Knowledge base

The persistent multi-project KB is at `C:\Users\Constantin\dev\wolf-claude-memory` (WSL: `/mnt/c/Users/Constantin/dev/wolf-claude-memory/`). Read its `CLAUDE.md` for schema. The wolf-store product page is at `wiki/products/wolf-store/README.md`. Update the KB when architecture or significant features change.

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
| wolf-blocks/stats-counter | ✅ implemented | animated counter, IntersectionObserver view.js |
| wolf-blocks/testimonial-card | ✅ implemented | quote + avatar + author |
| wolf-blocks/pricing-table | ✅ implemented | pricing tiers, services list, offer price |
| wolf-blocks/countdown | ✅ implemented | dynamic block (PHP render_callback), manual date or wolf-store offer, view.js ticker |
| wolf-blocks/comparison-table | ✅ implemented | us vs competitor feature table, repeatable rows with reorder |
| wolf-blocks/feature-grid | ✅ implemented | InnerBlocks grid, 2–4 columns, providesContext for columns |
| wolf-blocks/feature-grid-item | ✅ implemented | child of feature-grid, @wordpress/icons picker, RichText title+desc |

## Adding a new block
1. Create src/blocks/{name}/ with block.json, index.js, save.js, style.scss
2. Add only a JS entry to webpack.config.js (no separate SCSS entry)
3. Import `./style.scss` inside index.js — wp-scripts splitChunks extracts it to `style-index.css`
4. If a view.js is needed (frontend interactivity), add a separate entry: `'blocks/{name}/view'`
5. Add slug to Block_Loader::register_blocks() array in Functions/Core/Block_Loader.php
6. Update this inventory table

## block.json style convention
- `"style": "file:./style-index.css"` — compiled from style.scss imported in index.js (wp-scripts splitChunks)
- `"editorStyle": "file:./index.css"` — compiled from editor.scss imported in index.js
- `"editorScript": "file:./index.js"` — compiled JS bundle
- `"viewScript": "file:./view.js"` — frontend-only script (separate webpack entry required)

Never use bare SCSS webpack entries — they produce non-standard `style-style.css` filenames.

## Commands
```
npm run start    ← dev watch
npm run build    ← production build
npm run lint:js  ← JS linting
npm run lint:css ← SCSS linting
npm run lint:php ← PHP linting
```

## Toolchain versions (pinned for compatibility)
- `@wordpress/scripts@^31.8.0` — React 18 support, ESLint v8 (still supports `.eslintrc.js` legacy config)
- Do NOT upgrade to `@wordpress/scripts@32+` — ESLint v10 drops `.eslintrc.js` support and requires flat config migration
- wolf-store uses `@wordpress/scripts@24` (React 17 only) — wolf-blocks intentionally diverges here

## Knowledge base
Main KB (cross-project decisions, architecture, product pages): `/mnt/c/Users/Constantin/wolfthemes-dev/wolf-claude-memory/`
wolf-blocks product page: `/mnt/c/Users/Constantin/wolfthemes-dev/wolf-claude-memory/wiki/products/wolf-blocks/README.md`

## Related projects
- Theme: ../seijaku-fse/ (reads BOUNDARIES.md)
- Store plugin: /mnt/c/Users/Constantin/wolfthemes-dev/wolf-store-docker/plugins/wolf-store/ (architecture reference)
- Parent theme: ../wolf-blank/ (defines --wolf-* vars)

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
