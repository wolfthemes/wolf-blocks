# Wolf Blocks

Reusable Gutenberg blocks for WolfThemes projects. All visual tokens (colors, fonts, spacing) are consumed from the active theme via CSS custom properties — the plugin never hardcodes values.

## Blocks

| Block | Status |
|---|---|
| Marquee | ✅ implemented |
| Stats Counter | 🔲 scaffold |
| Testimonial Card | 🔲 scaffold |
| Pricing Table | 🔲 scaffold |

## Development

```bash
npm install
npm run build      # production build
npm run start      # dev watch
npm run lint:js    # JS lint
npm run lint:css   # SCSS lint
npm run lint:php   # PHP lint (requires composer install)
```

## Requirements

- WordPress 6.0+
- PHP 7.4+
- Node 18+
- Active theme that defines `--wolf-*` CSS custom properties (see BOUNDARIES.md)
