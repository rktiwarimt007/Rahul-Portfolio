// src/lib/mdx.ts
// This file reads all .mdx files from src/content/blog/
// and returns them as structured blog post objects.
// ─────────────────────────────────────────────────────────────
// HOW TO ADD A NEW BLOG POST:
//   1. Create a new file: src/content/blog/your-post-slug.mdx
//   2. Add frontmatter at the top (see example below)
//   3. Write your content in Markdown below the frontmatter
//   4. It automatically appears on /blog 🎉
//
// FRONTMATTER FORMAT:
// ---
// title: "Your Post Title"
// date: "2025-03-15"
// readTime: "8 min read"
// tags: ["ML", "Deep Learning"]
// excerpt: "Short description shown on the blog listing card."
// ---
// ─────────────────────────────────────────────────────────────

import fs   from "fs";
import path from "path";

export interface BlogPost {
  slug:     string;
  title:    string;
  date:     string;
  readTime: string;
  tags:     string[];
  excerpt:  string;
  content:  string;
}

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, any> = {};
  match[1].split("\n").forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val   = line.slice(colonIdx + 1).trim();

    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    // Parse arrays like: ["Tag1", "Tag2"]
    if (val.startsWith("[")) {
      try {
        data[key] = JSON.parse(val);
      } catch {
        data[key] = val;
      }
    } else {
      data[key] = val;
    }
  });

  return { data, content: match[2].trim() };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "");
      const raw  = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = parseFrontmatter(raw);

      return {
        slug,
        title:    data.title    ?? slug,
        date:     data.date     ?? "",
        readTime: data.readTime ?? "5 min read",
        tags:     data.tags     ?? [],
        excerpt:  data.excerpt  ?? "",
        content,
      } as BlogPost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getPostBySlug(slug: string): BlogPost | null {
  const all = getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}