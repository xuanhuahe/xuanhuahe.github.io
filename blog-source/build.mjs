import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
function renderSite(posts){
 const base="/blog/",origin="https://xuanhuahe.github.io";
 const cats=[
 ["world-models","World Models","研究与技术","Generative intelligence, world models, and the systems behind them.","Research · Models · Engineering","technical"],
 ["latent-space","Latent Space","思想与探索","Unfinished ideas, thought experiments, and questions worth keeping open.","Ideas · Experiments · Questions","technical"],
 ["low-level-vision","Low-Level Vision","摄影与游记","Light, color, cities, and the world as seen through a lens.","Photography · Travel · Observation","photo"],
 ["high-level-understanding","High-Level Understanding","文学与人文","Literature, philosophy, history, and the ways we make sense of being human.","Literature · Philosophy · Culture","essay"],
 ["long-term-memory","Long-Term Memory","个人随笔","Fragments of life and moments worth remembering.","Life · Reflection · Memory","essay"]];
 const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
 const items=[...posts].sort((a,b)=>b.date.localeCompare(a.date)||a.slug.localeCompare(b.slug));
 const catPath=c=>base+c[0]+"/",postPath=p=>base+"posts/"+p.slug+"/";
 const category=p=>cats.find(c=>c[0]===p.category);
 const math=`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"><script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.js"></script><script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/contrib/auto-render.min.js"></script><script defer src="/blog/article.js"></script>`;
 function page(title,description,path,active,content,kind="",lang="en",article=false){
 return `<!doctype html>
<html lang="${esc(lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(description)}"><meta name="color-scheme" content="light dark"><title>${path?esc(title)+" — ":""}Xuanhua's Notes</title><link rel="canonical" href="${origin+base+path}"><link rel="alternate" type="application/rss+xml" title="Xuanhua's Notes" href="${base}rss.xml"><link rel="icon" type="image/svg+xml" href="${base}favicon.svg"><script src="${base}theme.js"></script><link rel="stylesheet" href="${base}style.css">${article?math:""}</head>
<body class="${kind}"><a class="skip" href="#main">Skip to content</a><header class="header"><div class="top"><a class="brand" href="${base}">Xuanhua’s Notes<span>.</span></a><div class="actions"><a href="/">Academic home ↗</a><button id="theme-toggle" type="button" aria-label="Toggle color theme">◐</button></div></div><nav aria-label="Collections"><a href="${base}"${!active?' aria-current="page"':""}>Index</a>${cats.map(c=>`<a href="${catPath(c)}"${c[0]===active?' aria-current="page"':""}>${c[1]}</a>`).join("")}</nav></header>
<main id="main">${content}</main><footer><div>Xuanhua’s Notes · To perceive, to understand, to remember.</div><div><a href="${base}rss.xml">RSS</a><a href="https://github.com/xuanhuahe">GitHub ↗</a></div></footer></body></html>`;
 }
 function list(ps,empty){
 if(!ps.length)return `<div class="empty"><span aria-hidden="true">· · ·</span><p>${esc(empty)}</p><small>More notes to come.</small></div>`;
 return `<div class="post-list">${ps.map(p=>`<article class="post-row">${p.cover?`<a href="${postPath(p)}" class="thumbnail"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt||"")}" loading="lazy"></a>`:""}<div><p class="meta"><time datetime="${esc(p.date)}">${esc(p.date)}</time> · ${category(p)[1]}${p.lang==="zh"?" · 中文":""}</p><h3><a href="${postPath(p)}">${esc(p.title)}</a></h3><p>${esc(p.description||"")}</p></div><a class="arrow" href="${postPath(p)}" aria-label="${esc("Read "+p.title)}">↗</a></article>`).join("")}</div>`;
 }
 const files={};
 files["blog/index.html"]=page("Index","Notes on intelligence, perception, literature, and life.","","",`<section class="hero"><p class="eyebrow"><span class="dot"></span> PERSONAL JOURNAL / 个人札记</p><h1>To perceive the world,<br>to understand it,<br><em>and to remember it.</em></h1><p class="zh-intro">感知世界，理解世界，记住世界。</p><p class="intro">A collection of notes on intelligence, perception, literature, and life.</p></section><section class="section"><div class="section-heading"><h2>Explore</h2><span>05 / Collections</span></div><div class="collections">${cats.map((c,i)=>`<a class="collection" href="${catPath(c)}"><div class="collection-top"><span>0${i+1}</span><span class="arrow">↗</span></div><div><h3>${c[1]}</h3><p class="zh">${c[2]}</p><p>${c[3]}</p></div><div class="collection-bottom"><span>${c[4]}</span><span>${items.filter(p=>p.category===c[0]).length} notes</span></div></a>`).join("")}</div></section><section class="section"><div class="section-heading"><h2>Recent notes</h2><span>Chronological</span></div>${list(items.slice(0,8),"The journal is open. No notes have been published yet.")}</section>`);
 cats.forEach((c,i)=>{const ps=items.filter(p=>p.category===c[0]);files["blog/"+c[0]+"/index.html"]=page(c[1],c[3],c[0]+"/",c[0],`<section class="category-hero"><a class="back" href="${base}">← All collections</a><p class="eyebrow">COLLECTION / 0${i+1}</p><h1>${c[1]}<span class="accent">.</span></h1><p class="zh-intro">${c[2]}</p><p class="intro">${c[3]}</p><p class="tags">${c[4]}</p></section><section class="section"><div class="section-heading"><h2>Notes</h2><span>${ps.length} published</span></div>${list(ps,"This collection is ready for its first note.")}</section>`,c[5])});
 items.forEach(p=>{const c=category(p);files["blog/posts/"+p.slug+"/index.html"]=page(p.title,p.description||p.title,"posts/"+p.slug+"/",c[0],`<article class="article"><header class="article-header"><a class="back" href="${catPath(c)}">← ${c[1]}</a><p class="meta"><time datetime="${esc(p.date)}">${esc(p.date)}</time> · ${c[1]}</p><h1>${esc(p.title)}</h1><p class="intro">${esc(p.description||"")}</p></header>${p.cover?`<figure class="hero-photo"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt||"")}"></figure>`:""}<div class="prose">${p.html}</div><div class="article-end"><a href="${catPath(c)}">← Back to ${c[1]}</a></div></article>`,c[5],p.lang||"en",c[5]==="technical")});
 files["blog/rss.xml"]=`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Xuanhua's Notes</title><link>${origin+base}</link><description>Notes on intelligence, perception, literature, and life.</description><atom:link href="${origin+base}rss.xml" rel="self" type="application/rss+xml"/>${items.map(p=>`<item><title>${esc(p.title)}</title><link>${origin+postPath(p)}</link><guid>${origin+postPath(p)}</guid><pubDate>${new Date(p.date+"T00:00:00Z").toUTCString()}</pubDate><description>${esc(p.description||"")}</description><category>${category(p)[1]}</category></item>`).join("")}</channel></rss>`;
 files["blog/sitemap.xml"]=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[base,...cats.map(catPath),...items.map(postPath)].map(u=>`<url><loc>${origin+u}</loc></url>`).join("")}</urlset>`;
 return files;
}
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,"..");
const md=new MarkdownIt({html:true,linkify:true});
const allowed=new Set(["world-models","latent-space","low-level-vision","high-level-understanding","long-term-memory"]);
const posts=[],slugs=new Set();
for(const name of (await fs.readdir(path.join(here,"posts"))).sort()){
 if(!name.endsWith(".md"))continue;
 const {data,content}=matter(await fs.readFile(path.join(here,"posts",name),"utf8"));
 if(data.draft===true)continue;
 const slug=data.slug||name.slice(0,-3),date=data.date instanceof Date?data.date.toISOString().slice(0,10):String(data.date||"");
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||slugs.has(slug)||!allowed.has(data.category)||typeof data.title!=="string"||!data.title.trim()||!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date||!["en","zh",undefined].includes(data.lang))throw new Error("Invalid metadata in "+name);
 slugs.add(slug);posts.push({...data,slug,date,html:md.render(content)});
}
const files=renderSite(posts);
await fs.rm(path.join(root,"blog","posts"),{recursive:true,force:true});
for(const [name,content] of Object.entries(files)){const target=path.join(root,name);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,content);}
console.log("Generated "+Object.keys(files).length+" pages/feed files for "+posts.length+" published notes.");
