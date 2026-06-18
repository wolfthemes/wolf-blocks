# Wolf Blocks

Reusable Gutenberg blocks for WolfThemes projects. All visual tokens (colors, fonts, spacing) are consumed from the active theme via CSS custom properties — the plugin never hardcodes values.

## Blocks

| Block | Notes |
|---|---|
| Marquee | scrolling text band |
| Stats Counter | animated counter, IntersectionObserver |
| Testimonial Card | quote + avatar + author |
| Pricing Table | pricing tiers, services list, offer price |
| Countdown | dynamic block (PHP render_callback), manual date or wolf-store offer |
| Comparison Table | us vs competitor feature table, repeatable rows with reorder |
| Feature Grid | InnerBlocks grid, 2–4 columns |
| Feature Grid Item | child of feature-grid, icon picker, RichText title+desc |

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
