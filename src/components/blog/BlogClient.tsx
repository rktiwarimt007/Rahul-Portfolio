"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/mdx";

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border"
      style={{ color:"var(--accent)", borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
      {label}
    </span>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  // Format date nicely
  const dateLabel = post.date
    ? new Date(post.date).toLocaleDateString("en-US", { year:"numeric", month:"long" })
    : "";

  return (
    <a href={`/blog/${post.slug}`}
      className="block rounded-2xl border overflow-hidden transition-all duration-300 group"
      style={{ borderColor:"var(--border)", background:"var(--surface)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "var(--accent)";
        el.style.transform   = "translateY(-4px)";
        el.style.boxShadow   = "0 20px 40px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "var(--border)";
        el.style.transform   = "none";
        el.style.boxShadow   = "none";
      }}
    >
      {/* Top gradient bar */}
      <div className="h-1 w-full" style={{
        background:"linear-gradient(to right, var(--accent), #a78bfa, #22d3ee)"
      }} />

      <div className="p-7">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono" style={{ color:"var(--muted)" }}>{dateLabel}</span>
          <span className="w-1 h-1 rounded-full" style={{ background:"var(--border)" }} />
          <span className="text-xs font-mono" style={{ color:"var(--muted)" }}>{post.readTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold leading-snug mb-3 transition-colors"
          style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed mb-5" style={{ color:"var(--muted)" }}>
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => <Tag key={t} label={t} />)}
          </div>
          <span className="text-sm font-semibold flex items-center gap-1 transition-transform group-hover:translate-x-1"
            style={{ color:"var(--accent)" }}>
            Read →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");
  const [tag,    setTag]    = useState("All");

  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];

  const filtered = posts.filter((p) => {
    const matchTag    = tag === "All" || p.tags.includes(tag);
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">

      {/* Header */}
      <div className="mb-14 space-y-4">
        <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border"
          style={{ color:"var(--accent)", borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
          Writing
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight"
          style={{ fontFamily:"var(--font-display)", color:"var(--fg)" }}>
          Blog
        </h1>
        <p className="text-lg max-w-2xl" style={{ color:"var(--muted)" }}>
          Technical deep-dives into ML, signal processing, and wireless communications.
          {posts.length > 0 && (
            <span className="ml-2 text-sm font-mono" style={{ color:"var(--accent)" }}>
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </span>
          )}
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center">
        <div className="flex gap-2 flex-wrap">
          {allTags.map((t) => (
            <button key={t} onClick={() => setTag(t)}
              className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
              style={{
                borderColor: tag===t ? "var(--accent)" : "var(--border)",
                background:  tag===t ? "var(--accent-bg)" : "transparent",
                color:       tag===t ? "var(--accent)" : "var(--muted)",
              }}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative md:ml-auto">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            style={{ color:"var(--muted)" }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="pl-9 pr-4 py-2 rounded-xl border text-sm bg-transparent outline-none w-48"
            style={{ borderColor:"var(--border)", color:"var(--fg)" }} />
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="text-center py-24" style={{ color:"var(--muted)" }}>
          <p className="text-5xl mb-4">📝</p>
          <p className="font-semibold text-lg">No posts found.</p>
          <p className="text-sm mt-1">Try a different search or tag filter.</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-20 rounded-3xl border p-10 text-center"
        style={{ borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
        <h2 className="text-2xl font-bold mb-2"
          style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>
          Want to discuss a topic?
        </h2>
        <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color:"var(--muted)" }}>
          I&apos;m always open to feedback, questions, or collaboration ideas on anything I&apos;ve written.
        </p>
        <a href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-80"
          style={{ background:"var(--accent)", color:"#fff" }}>
          Get in touch →
        </a>
      </div>
    </div>
  );
}