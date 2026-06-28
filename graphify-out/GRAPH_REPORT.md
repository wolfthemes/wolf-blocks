# Graph Report - wolf-blocks  (2026-06-28)

## Corpus Check
- 71 files · ~22,744 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 721 nodes · 725 edges · 54 communities (45 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bd0a7b7e`
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
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]

## God Nodes (most connected - your core abstractions)
1. `attributes` - 16 edges
2. `Wolf Blocks Plugin` - 15 edges
3. `Wolf Blocks — Claude Code Context` - 13 edges
4. `What You Must Do When Invoked` - 12 edges
5. `scripts` - 11 edges
6. `attributes` - 11 edges
7. `attributes` - 11 edges
8. `/graphify` - 10 edges
9. `Plugin` - 10 edges
10. `attributes` - 10 edges

## Surprising Connections (you probably didn't know these)
- `CI Check Job (master)` --references--> `webpack.config.js`  [INFERRED]
  .github/workflows/deploy-master.yml → AGENTS.md
- `Wolf Blocks README` --references--> `Wolf Blocks Plugin`  [EXTRACTED]
  README.md → AGENTS.md
- `--wolf-border-color CSS Var` --references--> `wolf-blank Parent Theme`  [INFERRED]
  BOUNDARIES.md → AGENTS.md
- `Wolf Blocks Plugin` --references--> `Wolf Blocks Theme/Plugin Boundary`  [EXTRACTED]
  AGENTS.md → BOUNDARIES.md
- `seijaku-fse Theme` --references--> `Wolf Blocks Theme/Plugin Boundary`  [EXTRACTED]
  AGENTS.md → BOUNDARIES.md

## Import Cycles
- 1-file cycle: `webpack.config.js -> webpack.config.js`

## Communities (54 total, 9 thin omitted)

### Community 0 - "Pricing Table Attributes"
Cohesion: 0.04
Nodes (45): attributes, buttonText, buttonUrl, currency, currencyPosition, featured, featuredText, htmlTag (+37 more)

### Community 1 - "Comparison Table Block Config"
Cohesion: 0.05
Nodes (35): apiVersion, attributes, competitorLabel, rows, title, usLabel, category, type (+27 more)

### Community 2 - "Marquee Block Config"
Cohesion: 0.07
Nodes (29): apiVersion, category, background, text, description, editorScript, editorStyle, fontSize (+21 more)

### Community 3 - "Graphify CLI Tools"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 4 - "Feature Grid Item Block"
Cohesion: 0.06
Nodes (30): apiVersion, attributes, description, icon, iconSize, title, category, description (+22 more)

### Community 5 - "Countdown Block Config"
Cohesion: 0.05
Nodes (40): apiVersion, attributes, expiredText, showDays, showSeconds, source, targetDate, category (+32 more)

### Community 6 - "Wolf Blocks Plugin Registry"
Cohesion: 0.08
Nodes (30): wolf-blocks/comparison-table Block, wolf-blocks/countdown Block, wolf-blocks/feature-grid Block, wolf-blocks/feature-grid-item Block, wolf-blocks/marquee Block, wolf-blocks/pricing-table Block, seijaku-fse Theme, wolf-blocks/stats-counter Block (+22 more)

### Community 7 - "Stats Counter Attributes"
Cohesion: 0.07
Nodes (30): default, type, attributes, animationDuration, endNumber, prefix, separatorStyle, startNumber (+22 more)

### Community 8 - "Subscription Form Attributes"
Cohesion: 0.29
Nodes (7): attributes, invalidEmailMessage, showName, default, type, default, type

### Community 9 - "Subscription Form Attributes"
Cohesion: 0.07
Nodes (30): attributes, buttonLabel, emailPlaceholder, emptyEmailMessage, emptyNameMessage, errorMessage, invalidEmailMessage, listId (+22 more)

### Community 10 - "Feature Grid Block Config"
Cohesion: 0.09
Nodes (21): apiVersion, attributes, columns, category, default, type, description, editorScript (+13 more)

### Community 11 - "Package Build Dependencies"
Cohesion: 0.08
Nodes (24): author, description, devDependencies, copy-webpack-plugin, stylelint, @wordpress/eslint-plugin, @wordpress/icons, @wordpress/prettier-config (+16 more)

### Community 12 - "Error Message Block Config"
Cohesion: 0.14
Nodes (13): apiVersion, category, description, editorScript, name, $schema, style, supports (+5 more)

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
Cohesion: 0.05
Nodes (39): apiVersion, attributes, authorTitle, avatarId, avatarUrl, content, imagePosition, link (+31 more)

### Community 21 - "Typography Support Settings"
Cohesion: 0.14
Nodes (13): Adding a new block, Architecture reference, block.json style convention, Blocks inventory, Commands, CSS contract — CRITICAL, graphify, Knowledge base (+5 more)

### Community 22 - "Stylelint Configuration"
Cohesion: 0.18
Nodes (10): customSyntax, extends, rules, at-rule-no-unknown, font-family-no-missing-generic-family-keyword, no-descending-specificity, no-invalid-double-slash-comments, selector-class-pattern (+2 more)

### Community 24 - "Typography Controls"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 25 - "Star Rating Block"
Cohesion: 0.08
Nodes (19): default, type, attributes, animationDuration, direction, link, text, default (+11 more)

### Community 26 - "Testimonial Card Attributes"
Cohesion: 0.32
Nodes (5): errorMessage, default, type, default, registerSubscribeBlock()

### Community 29 - "Counter Animation Utilities"
Cohesion: 0.50
Nodes (3): animateCounter(), formatNumber(), SEPARATOR_CHARS

### Community 30 - "Webpack Copy Config"
Cohesion: 0.50
Nodes (3): CopyPlugin, defaultConfig, path

### Community 34 - "Image Position Attribute"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 35 - "Text Align Attribute"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 36 - "Author Title Attribute"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 37 - "Avatar ID Attribute"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 38 - "Name Attribute"
Cohesion: 0.67
Nodes (3): buttonLabel, default, type

### Community 44 - "Community 44"
Cohesion: 0.67
Nodes (3): emailPlaceholder, default, type

### Community 45 - "Community 45"
Cohesion: 0.67
Nodes (3): emptyEmailMessage, default, type

### Community 46 - "Community 46"
Cohesion: 0.67
Nodes (3): emptyNameMessage, default, type

### Community 47 - "Community 47"
Cohesion: 0.67
Nodes (3): listId, default, type

### Community 48 - "Community 48"
Cohesion: 0.67
Nodes (3): namePlaceholder, default, type

### Community 49 - "Community 49"
Cohesion: 0.67
Nodes (3): successMessage, default, type

## Knowledge Gaps
- **406 isolated node(s):** `graphify`, `Usage`, `What graphify is for`, `Step 0 - GitHub repos and multi-path merge (only if a URL or several paths)`, `Step 1 - Ensure graphify is installed` (+401 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `attributes` connect `Pricing Table Attributes` to `Services Block Config`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `attributes` connect `Block JSON Metadata` to `Star Rating Block`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `attributes` connect `Stats Counter Attributes` to `Typography Block Config`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `graphify`, `Usage`, `What graphify is for` to the rest of the system?**
  _406 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Pricing Table Attributes` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `Comparison Table Block Config` be split into smaller, more focused modules?**
  _Cohesion score 0.052564102564102565 - nodes in this community are weakly interconnected._
- **Should `Marquee Block Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._