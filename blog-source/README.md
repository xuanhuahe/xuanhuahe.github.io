# Xuanhua's Notes

Static journal at https://xuanhuahe.github.io/blog/ with five collections:
- world-models — World Models (technical)
- latent-space — Latent Space (technical)
- low-level-vision — Low-Level Vision (photography)
- high-level-understanding — High-Level Understanding (literary essay)
- long-term-memory — Long-Term Memory (personal essay)

## Publishing
Place each article in `blog-source/posts/` as a Markdown file with YAML front matter. Example:

```yaml
---
title: "A note about perception"
date: "2026-11-25"
category: low-level-vision
lang: zh
description: "A brief summary."
draft: true
# optional: slug: a-note-about-perception
# optional: cover: /blog/media/photo.jpg
# optional: coverAlt: "Description of the photo"
---
```

Use `lang: en` or `lang: zh`. Add Markdown text after the front matter. Put images and videos in `blog/media/`; Markdown supports tables, fenced code, and author-controlled HTML (for example, figures and video). Article pages use KaTeX from jsDelivr for dollar-delimited math. Use only trusted HTML. Private or unpublished material should stay outside this public repository; draft flags hide generated pages, not source files.

When ready, set draft to false, then run:

```sh
cd blog-source
npm install
npm run build
cd ..
python3 -m http.server 8000
```

Preview at http://localhost:8000/blog/. Commit both the Markdown source and generated blog pages. The existing GitHub Pages branch serves the generated files directly. Build regenerates article pages, collection indexes, RSS and sitemap; it replaces the generated blog/posts/ directory, so store media separately. No initial articles or photos have been fabricated.

## Editorial theme

The layout is shared by all pages in `render.mjs` and `blog/style.css`. The reading measure is 760px, with photo article media up to 920px. The theme supports system colors and a stored reader override. Home collection counts, filters, article rows, RSS and sitemap are generated from published Markdown. Optional `coverCaption` provides a cover figure caption. Run `npm test` (or `node test.mjs`) to check the empty and populated renderer using non-published fixture entries. Webfonts and KaTeX have graceful fallback if external resources are unavailable.
