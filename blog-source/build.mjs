import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { renderSite } from "./render.mjs";

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
