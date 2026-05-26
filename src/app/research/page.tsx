"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { PUBLICATIONS, RESEARCH_AREAS, type Publication } from "@/data";

function StatusBadge({ status }: { status: Publication["status"] }) {
  const styles = {
    "Published":    { bg:"rgba(52,211,153,0.12)",  color:"#34d399", border:"rgba(52,211,153,0.3)"  },
    "Under Review": { bg:"rgba(251,191,36,0.12)",  color:"#fbbf24", border:"rgba(251,191,36,0.3)"  },
    "Preprint":     { bg:"rgba(167,93,243,0.12)",  color:"#a855f7", border:"rgba(167,93,243,0.3)"  },
  };
  const s = styles[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
      style={{ background:s.bg, color:s.color, borderColor:s.border }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background:s.color }} />
      {status}
    </span>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border"
      style={{ color:"var(--accent)", borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
      {label}
    </span>
  );
}

function PubCard({ pub }: { pub: Publication }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border transition-all duration-300"
      style={{
        borderColor: open ? "var(--accent)" : "var(--border)",
        background:  "var(--surface)",
        boxShadow:   open ? "0 0 30px rgba(99,102,241,0.1)" : "none",
      }}>
      <div className="p-7">
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <StatusBadge status={pub.status} />
          <span className="text-xs font-mono" style={{ color:"var(--muted)" }}>{pub.year}</span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full border"
            style={{ color:"var(--muted)", borderColor:"var(--border)" }}>{pub.venue}</span>
        </div>

        <h3 className="text-lg font-bold leading-snug mb-2"
          style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>{pub.title}</h3>
        <p className="text-sm mb-4" style={{ color:"var(--muted)" }}>{pub.authors}</p>

        {/* Metrics */}
        {pub.metrics && (
          <div className="flex gap-5 mb-4 p-3.5 rounded-xl" style={{ background:"var(--bg)" }}>
            {pub.metrics.map((m) => (
              <div key={m.k}>
                <div className="text-lg font-bold" style={{ color:"var(--accent)", fontFamily:"var(--font-display)" }}>{m.v}</div>
                <div className="text-xs" style={{ color:"var(--muted)" }}>{m.k}</div>
              </div>
            ))}
          </div>
        )}

        {/* Abstract toggle */}
        <button onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm font-medium mb-4 transition-opacity hover:opacity-70"
          style={{ color:"var(--accent)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform:open?"rotate(180deg)":"none", transition:"transform 0.2s" }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          {open ? "Hide" : "Show"} Abstract
        </button>

        {open && (
          <p className="text-sm leading-relaxed mb-5 p-4 rounded-xl border-l-2"
            style={{ color:"var(--fg-soft)", borderLeftColor:"var(--accent)", background:"var(--bg)" }}>
            {pub.abstract}
          </p>
        )}

        {/* Tags + Links */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {pub.tags.map((t) => <Tag key={t} label={t} />)}
          </div>
          <div className="flex gap-2">
            {pub.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all hover:opacity-70"
                style={{ borderColor:"var(--border)", color:"var(--fg)", background:"var(--bg)" }}>
                {l.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  const published   = PUBLICATIONS.filter((p) => p.status === "Published");
  const underReview = PUBLICATIONS.filter((p) => p.status !== "Published");

  return (
    <main style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-20">

        {/* Header */}
        <div className="space-y-4">
          <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border"
            style={{ color:"var(--accent)", borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
            Research
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight"
            style={{ fontFamily:"var(--font-display)", color:"var(--fg)" }}>
            Publications &{" "}
            <span style={{ WebkitTextStroke:"2px var(--accent)", color:"transparent" }}>Work</span>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color:"var(--muted)" }}>
            Peer-reviewed research at the intersection of machine learning and wireless communications.
          </p>
        </div>

        {/* Research Areas */}
        <div>
          <h2 className="text-xl font-bold mb-6" style={{ color:"var(--fg)" }}>Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESEARCH_AREAS.map((area) => (
              <div key={area.title}
                className="flex gap-4 p-5 rounded-2xl border transition-all duration-200"
                style={{ borderColor:"var(--border)", background:"var(--surface)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor="var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor="var(--border)")}>
                <span className="text-2xl mt-0.5">{area.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color:"var(--fg)" }}>{area.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color:"var(--muted)" }}>{area.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Published */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold" style={{ color:"var(--fg)" }}>Published</h2>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{ background:"rgba(52,211,153,0.12)", color:"#34d399" }}>
              {published.length} papers
            </span>
          </div>
          <div className="space-y-5">
            {published.map((p, i) => <PubCard key={i} pub={p} />)}
          </div>
        </div>

        {/* Under Review */}
        {underReview.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold" style={{ color:"var(--fg)" }}>Under Review</h2>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{ background:"rgba(251,191,36,0.12)", color:"#fbbf24" }}>
                {underReview.length} papers
              </span>
            </div>
            <div className="space-y-5">
              {underReview.map((p, i) => <PubCard key={i} pub={p} />)}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-3xl border p-10 text-center"
          style={{ borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
          <h2 className="text-2xl font-bold mb-2"
            style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>
            Interested in collaborating?
          </h2>
          <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color:"var(--muted)" }}>
            Always open to research collaborations, joint publications, and discussing ideas
            in ML, signal processing, or wireless communications.
          </p>
          <a href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-80"
            style={{ background:"var(--accent)", color:"#fff" }}>
            Get in touch →
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}