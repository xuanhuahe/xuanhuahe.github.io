export function renderSite(posts){
  const base="/blog/", origin="https://xuanhuahe.github.io";
  const cats=[
    ["world-models","World Models","研究与技术","Generative intelligence, world models, and the systems behind them.","World","technical"],
    ["latent-space","Latent Space","思想与探索","Unfinished ideas, thought experiments, and open questions.","Latent","technical"],
    ["low-level-vision","Low-Level Vision","摄影与游记","Light, color, cities, and the world through a lens.","Vision","photo"],
    ["high-level-understanding","High-Level Understanding","文学与人文","Literature, philosophy, history, and the human condition.","Understanding","essay"],
    ["long-term-memory","Long-Term Memory","个人随笔","Fragments of life and moments worth remembering.","Memory","essay"]
  ];
  const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const items=[...posts].sort((a,b)=>b.date.localeCompare(a.date)||a.slug.localeCompare(b.slug));
  const catPath=c=>base+c[0]+"/", postPath=p=>base+"posts/"+p.slug+"/", category=p=>cats.find(c=>c[0]===p.category);
  const icon=(name,paths)=>`<svg class="${name}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
  const sun=icon("sun",'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>');
  const moon=icon("moon",'<path d="M20.7 14.4A8.8 8.8 0 0 1 9.6 3.3a9 9 0 1 0 11.1 11.1Z"/>');
  const external=icon("external",'<path d="M7 17 17 7M7 7h10v10"/>');
  const arrow=icon("row-arrow",'<path d="M5 12h13m-5-5 5 5-5 5"/>');
  const fonts=`<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400&amp;family=Newsreader:ital,wght@0,400;0,500;1,400&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&amp;family=Noto+Serif+SC:wght@400;500&amp;display=swap" rel="stylesheet">`;
  const math=`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"><script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js"></script><script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.min.js"></script><script defer src="/blog/article.js"></script>`;
  function page(title,description,path,content,{kind="",lang="en",article=false}={}){
    return `<!doctype html>
<html lang="${esc(lang)}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${esc(description)}"><meta name="color-scheme" content="light dark">
<title>${path?esc(title)+" — ":""}Xuanhua’s Notes</title><link rel="canonical" href="${origin+base+path}">
<link rel="alternate" type="application/rss+xml" title="Xuanhua’s Notes" href="${base}rss.xml">
<link rel="icon" type="image/svg+xml" href="${base}favicon.svg">
<script src="${base}theme.js"></script>${fonts}
<link rel="stylesheet" href="${base}style.css">${article?math:""}
</head><body class="${kind}${article?" article-page":""}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <a class="brand" href="${base}">Xuanhua’s Notes</a>
  <nav class="header-nav" aria-label="Main navigation">
    <a href="${base}#recent-notes">Writing</a><a class="academic" href="/">Academic ${external}</a>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle color theme" title="Toggle color theme">${sun}${moon}</button>
  </nav>
</header>
<main id="main">${content}</main>
<footer class="site-footer"><span>© ${new Date().getUTCFullYear()} Xuanhua He</span><div><a href="${base}rss.xml">RSS</a><a href="https://github.com/xuanhuahe">GitHub ${external}</a></div></footer>
</body></html>\n`;
  }
  function postRow(p,showCategory=true){
    const c=category(p);
    return `<li class="post-item" data-category="${c[0]}"><a class="post-row${p.cover?" has-cover":""}" href="${postPath(p)}"><div class="post-copy"><h3>${esc(p.title)}</h3>${p.description?`<p>${esc(p.description)}</p>`:""}</div><div class="post-meta"><time datetime="${esc(p.date)}">${esc(p.date)}</time>${showCategory?`<span class="post-category">${esc(c[4])}</span>`:""}</div>${p.cover?`<img class="thumbnail" src="${esc(p.cover)}" alt="" width="76" height="54" loading="lazy" decoding="async">`:""}</a></li>`;
  }
  function emptyState(inCollection=false,hidden=false){
    return `<div class="empty-state"${hidden?" hidden":""} data-empty-state><p>${inCollection?"Nothing filed here just yet.":"A little room for what comes next."}</p><span data-empty-message>${inCollection?"The first note will appear here when it is ready.":"The first notes will find their way here."}</span></div>`;
  }
  const files={};
  files["blog/index.html"]=page("Index","Notes on intelligence, perception, literature, and life.","",`
<section class="hero" aria-labelledby="intro-heading">
  <h1 id="intro-heading">To perceive the world, to understand it, and to remember it.</h1>
  <p class="zh-intro" lang="zh">感知世界，理解世界，记住世界。</p>
  <p class="intro">Notes on intelligence, perception, literature, and life.</p>
</section>
<section class="index-section" aria-labelledby="collections-heading">
  <h2 class="section-title" id="collections-heading">Collections</h2>
  <ol class="collection-list">
    ${cats.map((c,i)=>{const count=items.filter(p=>p.category===c[0]).length;return `<li><a class="index-row" href="${catPath(c)}"><span class="row-number">0${i+1}</span><div class="index-copy"><h3>${c[1]} <span lang="zh">${c[2]}</span></h3><p>${c[3]}</p></div><span class="row-count" aria-label="${count?count+" published notes":"No published notes yet"}">${count||"—"}</span>${arrow}</a></li>`}).join("\n    ")}
  </ol>
</section>
<section class="recent-section" id="recent-notes" aria-labelledby="recent-heading">
  <h2 class="section-title" id="recent-heading">Recent Notes</h2>
  <div class="filters" role="group" aria-label="Filter notes by collection" hidden>
    <button type="button" class="filter" data-filter="all" aria-pressed="true">All</button>${cats.map(c=>`<button type="button" class="filter" data-filter="${c[0]}" aria-pressed="false" title="${c[1]}">${c[4]}</button>`).join("")}
  </div>
  <p class="sr-only" role="status" aria-live="polite" data-filter-status></p>
  <ul class="post-list" data-post-list>${items.map(p=>postRow(p)).join("")}</ul>
  ${emptyState(false,items.length>0)}
</section>`);
  cats.forEach((c,i)=>{
    const ps=items.filter(p=>p.category===c[0]);
    files["blog/"+c[0]+"/index.html"]=page(c[1],c[3],c[0]+"/",`
<section class="collection-intro">
  <a class="back" href="${base}">← All collections</a>
  <h1>${c[1]}</h1><p class="zh-intro" lang="zh">${c[2]}</p><p class="intro">${c[3]}</p>
</section>
<section class="category-notes" aria-labelledby="notes-heading"><h2 class="section-title" id="notes-heading">Notes</h2><ul class="post-list">${ps.map(p=>postRow(p,false)).join("")}</ul>${ps.length?"":emptyState(true)}</section>`,{kind:c[5]});
  });
  items.forEach(p=>{
    const c=category(p);
    files["blog/posts/"+p.slug+"/index.html"]=page(p.title,p.description||p.title,"posts/"+p.slug+"/",`
<article class="article">
  <header class="article-header">
    <a class="back" href="${catPath(c)}">← ${c[1]}</a>
    <h1>${esc(p.title)}</h1>${p.description?`<p class="article-deck">${esc(p.description)}</p>`:""}
    <div class="article-meta"><time datetime="${esc(p.date)}">${esc(p.date)}</time><span>·</span><a href="${catPath(c)}">${c[1]}</a></div>
  </header>
  ${p.cover?`<figure class="hero-photo"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt||"")}" decoding="async">${p.coverCaption?`<figcaption>${esc(p.coverCaption)}</figcaption>`:""}</figure>`:""}
  <div class="prose">${p.html}</div>
  <div class="article-end"><a href="${catPath(c)}">← More in ${c[1]}</a><a href="${base}#recent-notes">All writing →</a></div>
</article>`,{kind:c[5],lang:p.lang||"en",article:true});
  });
  files["blog/rss.xml"]=`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Xuanhua's Notes</title><link>${origin+base}</link><description>Notes on intelligence, perception, literature, and life.</description><atom:link href="${origin+base}rss.xml" rel="self" type="application/rss+xml"/>${items.map(p=>`<item><title>${esc(p.title)}</title><link>${origin+postPath(p)}</link><guid>${origin+postPath(p)}</guid><pubDate>${new Date(p.date+"T00:00:00Z").toUTCString()}</pubDate><description>${esc(p.description||"")}</description><category>${category(p)[1]}</category></item>`).join("")}</channel></rss>\n`;
  files["blog/sitemap.xml"]=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[base,...cats.map(catPath),...items.map(postPath)].map(u=>`<url><loc>${origin+u}</loc></url>`).join("")}</urlset>\n`;
  return files;
}
