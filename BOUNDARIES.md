# Wolf Blocks — Theme/Plugin Boundary

## What wolf-blocks OWNS
- Block registration (block.json)
- Block JS/React components (edit + save)
- Block structural CSS (display, overflow, animation mechanics)
- Block editor styles

## What wolf-blocks NEVER does
- Define color values
- Define font family names
- Define spacing scale values
- Register custom post types
- Handle WooCommerce logic (that's wolf-store)

## CSS vars wolf-blocks expects from the theme
Every active theme MUST define these for blocks to render correctly:
- --wolf-border-color
- --wolf-radius-md
- --wolf-radius-lg
- --wolf-transition-speed
- --wolf-transition-ease
- --wolf-shadow-card
- --wp--preset--color--primary
- --wp--preset--color--contrast
- --wp--preset--color--base
- --wp--preset--font-family--heading
- --wp--preset--font-family--body
- --wp--preset--font-size--sm through --wp--preset--font-size--2-xl

## Block-specific vars (optional, theme can override)
- --wolf-marquee-speed  (default: 30s)
- --wolf-counter-ease   (default: cubic-bezier(0.16, 1, 0.3, 1))
