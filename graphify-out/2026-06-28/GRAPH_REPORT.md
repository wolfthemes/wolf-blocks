# Graph Report - .  (2026-06-28)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 681 nodes · 701 edges · 44 communities (39 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `29cf7f75`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Pricing Table Attributes|Pricing Table Attributes]]
- [[_COMMUNITY_Comparison Table Block Config|Comparison Table Block Config]]
- [[_COMMUNITY_Marquee Block Config|Marquee Block Config]]
- [[_COMMUNITY_Graphify CLI Tools|Graphify CLI Tools]]
- [[_COMMUNITY_Feature Grid Item Block|Feature Grid Item Block]]
- [[_COMMUNITY_Countdown Block Config|Countdown Block Config]]
- [[_COMMUNITY_Wolf Blocks Plugin Registry|Wolf Blocks Plugin Registry]]
- [[_COMMUNITY_Stats Counter Attributes|Stats Counter Attributes]]
- [[_COMMUNITY_Subscription Form Attributes|Subscription Form Attributes]]
- [[_COMMUNITY_Subscription Form Attributes|Subscription Form Attributes]]
- [[_COMMUNITY_Feature Grid Block Config|Feature Grid Block Config]]
- [[_COMMUNITY_Package Build Dependencies|Package Build Dependencies]]
- [[_COMMUNITY_Error Message Block Config|Error Message Block Config]]
- [[_COMMUNITY_Typography Block Config|Typography Block Config]]
- [[_COMMUNITY_Composer PHP Config|Composer PHP Config]]
- [[_COMMUNITY_Services Block Config|Services Block Config]]
- [[_COMMUNITY_Block Loader and Subscription Classes|Block Loader and Subscription Classes]]
- [[_COMMUNITY_Subscription Provider Implementation|Subscription Provider Implementation]]
- [[_COMMUNITY_Block JSON Metadata|Block JSON Metadata]]
- [[_COMMUNITY_Plugin Bootstrap Constants|Plugin Bootstrap Constants]]
- [[_COMMUNITY_Block JSON Metadata|Block JSON Metadata]]
- [[_COMMUNITY_Typography Support Settings|Typography Support Settings]]
- [[_COMMUNITY_Stylelint Configuration|Stylelint Configuration]]
- [[_COMMUNITY_Newsletter Settings Admin|Newsletter Settings Admin]]
- [[_COMMUNITY_Typography Controls|Typography Controls]]
- [[_COMMUNITY_Star Rating Block|Star Rating Block]]
- [[_COMMUNITY_Testimonial Card Attributes|Testimonial Card Attributes]]
- [[_COMMUNITY_Subscription Block Renderer|Subscription Block Renderer]]
- [[_COMMUNITY_Counter Animation Utilities|Counter Animation Utilities]]
- [[_COMMUNITY_Webpack Copy Config|Webpack Copy Config]]
- [[_COMMUNITY_Subscription Form Init|Subscription Form Init]]
- [[_COMMUNITY_Countdown Block Renderer|Countdown Block Renderer]]
- [[_COMMUNITY_Image Position Attribute|Image Position Attribute]]
- [[_COMMUNITY_Text Align Attribute|Text Align Attribute]]
- [[_COMMUNITY_Author Title Attribute|Author Title Attribute]]
- [[_COMMUNITY_Avatar ID Attribute|Avatar ID Attribute]]
- [[_COMMUNITY_Name Attribute|Name Attribute]]

## God Nodes (most connected - your core abstractions)
1. `graphify Skill Document` - 18 edges
2. `attributes` - 16 edges
3. `Wolf Blocks Plugin` - 16 edges
4. `scripts` - 11 edges
5. `attributes` - 11 edges
6. `attributes` - 11 edges
7. `Plugin` - 10 edges
8. `attributes` - 10 edges
9. `Abstract_Subscription_Provider` - 9 edges
10. `Newsletter_Settings` - 9 edges

## Surprising Connections (you probably didn't know these)
- `CI Check Job (master)` --references--> `webpack.config.js`  [INFERRED]
  .github/workflows/deploy-master.yml → AGENTS.md
- `@wordpress/scripts Dependency` --references--> `Wolf Blocks Plugin`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `Wolf Blocks README` --references--> `Wolf Blocks Plugin`  [EXTRACTED]
  README.md → AGENTS.md
- `--wolf-border-color CSS Var` --references--> `wolf-blank Parent Theme`  [INFERRED]
  BOUNDARIES.md → AGENTS.md
- `graphify Skill` --references--> `graphify Skill Document`  [EXTRACTED]
  CLAUDE.md → .claude/skills/graphify/SKILL.md

## Import Cycles
- 1-file cycle: `webpack.config.js -> webpack.config.js`

## Communities (44 total, 5 thin omitted)

### Community 0 - "Pricing Table Attributes"
Cohesion: 0.04
Nodes (45): attributes, buttonText, buttonUrl, currency, currencyPosition, featured, featuredText, htmlTag (+37 more)

### Community 1 - "Comparison Table Block Config"
Cohesion: 0.05
Nodes (35): apiVersion, attributes, competitorLabel, rows, title, usLabel, category, type (+27 more)

### Community 2 - "Marquee Block Config"
Cohesion: 0.06
Nodes (34): default, type, apiVersion, attributes, animationDuration, direction, link, text (+26 more)

### Community 3 - "Graphify CLI Tools"
Cohesion: 0.07
Nodes (35): graphify add URL Ingest, graphify --watch Folder Watcher, graphify Skill, graphify --falkordb Export, graphify --mcp MCP Server, graphify --neo4j Export, graphify --wiki Export, Confidence Score Rubric (+27 more)

### Community 4 - "Feature Grid Item Block"
Cohesion: 0.06
Nodes (30): apiVersion, attributes, description, icon, iconSize, title, category, description (+22 more)

### Community 5 - "Countdown Block Config"
Cohesion: 0.06
Nodes (29): apiVersion, attributes, expiredText, showDays, showSeconds, source, targetDate, category (+21 more)

### Community 6 - "Wolf Blocks Plugin Registry"
Cohesion: 0.08
Nodes (31): wolf-blocks/comparison-table Block, wolf-blocks/countdown Block, wolf-blocks/feature-grid Block, wolf-blocks/feature-grid-item Block, wolf-blocks/marquee Block, wolf-blocks/pricing-table Block, seijaku-fse Theme, wolf-blocks/stats-counter Block (+23 more)

### Community 7 - "Stats Counter Attributes"
Cohesion: 0.07
Nodes (30): default, type, attributes, animationDuration, endNumber, prefix, separatorStyle, startNumber (+22 more)

### Community 8 - "Subscription Form Attributes"
Cohesion: 0.07
Nodes (28): attributes, buttonLabel, emailPlaceholder, emptyEmailMessage, emptyNameMessage, invalidEmailMessage, listId, namePlaceholder (+20 more)

### Community 9 - "Subscription Form Attributes"
Cohesion: 0.07
Nodes (28): attributes, buttonLabel, emailPlaceholder, emptyEmailMessage, emptyNameMessage, invalidEmailMessage, listId, namePlaceholder (+20 more)

### Community 10 - "Feature Grid Block Config"
Cohesion: 0.09
Nodes (21): apiVersion, attributes, columns, category, default, type, description, editorScript (+13 more)

### Community 11 - "Package Build Dependencies"
Cohesion: 0.08
Nodes (24): author, description, devDependencies, copy-webpack-plugin, stylelint, @wordpress/eslint-plugin, @wordpress/icons, @wordpress/prettier-config (+16 more)

### Community 12 - "Error Message Block Config"
Cohesion: 0.09
Nodes (20): errorMessage, default, type, apiVersion, errorMessage, category, description, editorScript (+12 more)

### Community 13 - "Typography Block Config"
Cohesion: 0.09
Nodes (22): apiVersion, category, description, editorScript, fontSize, name, $schema, style (+14 more)

### Community 14 - "Composer PHP Config"
Cohesion: 0.09
Nodes (21): dealerdirect/phpcodesniffer-composer-installer, authors, autoload, psr-4, config, allow-plugins, description, homepage (+13 more)

### Community 15 - "Services Block Config"
Cohesion: 0.10
Nodes (18): apiVersion, services, category, description, editorScript, type, name, $schema (+10 more)

### Community 16 - "Block Loader and Subscription Classes"
Cohesion: 0.12
Nodes (6): Block_Loader, Subscription_Providers, Subscription_Rest, Subscription_Provider, WP_REST_Request, WP_REST_Response

### Community 17 - "Subscription Provider Implementation"
Cohesion: 0.12
Nodes (4): Abstract_Subscription_Provider, Brevo_Provider, Mailchimp_Provider, Subscription_Provider

### Community 18 - "Block JSON Metadata"
Cohesion: 0.14
Nodes (13): apiVersion, category, description, editorScript, name, $schema, style, supports (+5 more)

### Community 20 - "Block JSON Metadata"
Cohesion: 0.15
Nodes (12): apiVersion, category, description, editorScript, name, $schema, style, supports (+4 more)

### Community 21 - "Typography Support Settings"
Cohesion: 0.18
Nodes (11): fontSize, supports, html, typography, __experimentalDefaultControls, fontFamily, fontSize, fontStyle (+3 more)

### Community 22 - "Stylelint Configuration"
Cohesion: 0.18
Nodes (10): customSyntax, extends, rules, at-rule-no-unknown, font-family-no-missing-generic-family-keyword, no-descending-specificity, no-invalid-double-slash-comments, selector-class-pattern (+2 more)

### Community 24 - "Typography Controls"
Cohesion: 0.20
Nodes (10): fontSize, typography, __experimentalDefaultControls, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing (+2 more)

### Community 25 - "Star Rating Block"
Cohesion: 0.22
Nodes (4): rating, default, type, save()

### Community 26 - "Testimonial Card Attributes"
Cohesion: 0.20
Nodes (10): attributes, avatarUrl, content, link, default, type, default, type (+2 more)

### Community 29 - "Counter Animation Utilities"
Cohesion: 0.50
Nodes (3): animateCounter(), formatNumber(), SEPARATOR_CHARS

### Community 30 - "Webpack Copy Config"
Cohesion: 0.50
Nodes (3): CopyPlugin, defaultConfig, path

### Community 34 - "Image Position Attribute"
Cohesion: 0.50
Nodes (4): imagePosition, default, enum, type

### Community 35 - "Text Align Attribute"
Cohesion: 0.50
Nodes (4): textAlign, default, enum, type

### Community 36 - "Author Title Attribute"
Cohesion: 0.67
Nodes (3): authorTitle, default, type

### Community 37 - "Avatar ID Attribute"
Cohesion: 0.67
Nodes (3): avatarId, default, type

### Community 38 - "Name Attribute"
Cohesion: 0.67
Nodes (3): name, default, type

## Knowledge Gaps
- **374 isolated node(s):** `extends`, `customSyntax`, `font-family-no-missing-generic-family-keyword`, `no-descending-specificity`, `selector-class-pattern` (+369 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `attributes` connect `Pricing Table Attributes` to `Services Block Config`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `attributes` connect `Testimonial Card Attributes` to `Image Position Attribute`, `Text Align Attribute`, `Author Title Attribute`, `Avatar ID Attribute`, `Name Attribute`, `Block JSON Metadata`, `Star Rating Block`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `attributes` connect `Stats Counter Attributes` to `Typography Block Config`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `extends`, `customSyntax`, `font-family-no-missing-generic-family-keyword` to the rest of the system?**
  _374 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pricing Table Attributes` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `Comparison Table Block Config` be split into smaller, more focused modules?**
  _Cohesion score 0.052564102564102565 - nodes in this community are weakly interconnected._
- **Should `Marquee Block Config` be split into smaller, more focused modules?**
  _Cohesion score 0.05547652916073969 - nodes in this community are weakly interconnected._