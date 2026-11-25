import assert from "node:assert/strict";
import {renderSite} from "./render.mjs";
const sample=[
  {
    "title": "A first model & its limits",
    "slug": "preview-model",
    "date": "2026-11-23",
    "category": "world-models",
    "lang": "en",
    "description": "A synthetic test entry.",
    "html": "<p>Inline math $x_1$.</p><pre><code>print(42)</code></pre><table><tr><td>42</td></tr></table>"
  },
  {
    "title": "光与城市",
    "slug": "preview-photo",
    "date": "2026-11-24",
    "category": "low-level-vision",
    "lang": "zh",
    "description": "仅用于测试。",
    "cover": "/blog/media/test.jpg",
    "coverAlt": "Preview photo",
    "coverCaption": "A preview caption",
    "html": "<figure><img src='/blog/media/test.jpg' alt='Preview'><figcaption>测试图注</figcaption></figure>"
  }
];
const empty=renderSite([]), pages=renderSite(sample);
const home=empty["blog/index.html"], populated=pages["blog/index.html"];
assert.equal((home.match(/class="index-row"/g)||[]).length,5);
assert.equal((home.match(/class="filter"/g)||[]).length,6);
assert.ok(!home.includes("0 notes")&&!home.includes("eyebrow"));
assert.ok(populated.indexOf("光与城市")<populated.indexOf("A first model &amp; its limits"));
assert.ok(populated.includes('data-category="low-level-vision"')&&populated.includes('class="thumbnail"'));
assert.ok(pages["blog/posts/preview-photo/index.html"].includes('class="photo article-page"'));
assert.ok(pages["blog/posts/preview-photo/index.html"].includes('lang="zh"'));
assert.ok(pages["blog/posts/preview-model/index.html"].includes("katex.min.js"));
assert.ok(pages["blog/rss.xml"].includes("preview-model"));
assert.ok(!empty["blog/rss.xml"].includes("<item>"));
assert.equal(Object.keys(empty).length,8);
console.log("Editorial renderer checks passed.");
