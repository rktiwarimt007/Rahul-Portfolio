"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { PERSONAL, TIMELINE, SKILLS, RESEARCH_INTERESTS, ABOUT_STATS } from "@/data";

function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border"
      style={{ color:"var(--accent)", borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
      {label}
    </span>
  );
}

function SkillBadge({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-xs px-3 py-1.5 rounded-full border font-medium cursor-default transition-all duration-200"
      style={{
        borderColor: hovered ? "var(--accent)" : "var(--border)",
        color:       hovered ? "var(--accent)" : "var(--fg)",
        background:  hovered ? "var(--accent-bg)" : "var(--bg)",
        transform:   hovered ? "translateY(-1px)" : "none",
      }}
    >
      {label}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-20 space-y-4">
          <SectionTag label="About Me" />
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none"
            style={{ fontFamily:"var(--font-display)", color:"var(--fg)" }}>
            Background &{" "}
            <span style={{ WebkitTextStroke:"2px var(--accent)", color:"transparent" }}>Skills</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color:"var(--muted)" }}>
            Researcher and engineer passionate about bridging the gap between
            communications theory and modern machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Left — Bio + Timeline */}
          <div className="lg:col-span-3 space-y-12">

            {/* Bio */}
            <div className="space-y-4">
              <SectionTag label="Bio" />
              <div className="space-y-4 text-base leading-relaxed" style={{ color:"var(--fg-soft)" }}>
                {PERSONAL.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <SectionTag label="Timeline" />
              <div className="mt-6 space-y-0">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    {/* Spine */}
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full mt-1 shrink-0"
                        style={{
                          background: item.type === "edu" ? "var(--accent)" : "#22d3ee",
                          boxShadow:  item.type === "edu"
                            ? "0 0 10px rgba(99,102,241,0.6)"
                            : "0 0 10px rgba(34,211,238,0.6)",
                        }}
                      />
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 my-1"
                          style={{ background:"linear-gradient(to bottom, var(--border), transparent)", minHeight:"48px" }}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-10">
                      <span className="text-xs font-mono font-medium" style={{ color:"var(--accent)" }}>
                        {item.year}
                      </span>
                      <h3 className="font-semibold text-base mt-0.5" style={{ color:"var(--fg)" }}>
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium" style={{ color:"var(--muted)" }}>{item.org}</p>
                      <p className="text-sm mt-2 leading-relaxed" style={{ color:"var(--fg-soft)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Skills + Interests + Stats */}
          <div className="lg:col-span-2 space-y-6">

            {/* Skills */}
            <div className="space-y-4">
              <SectionTag label="Skills" />
              <div className="space-y-4 mt-2">
                {SKILLS.map((group) => (
                  <div key={group.category} className="p-5 rounded-2xl border"
                    style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"var(--muted)" }}>
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => <SkillBadge key={skill} label={skill} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Interests */}
            <div className="p-5 rounded-2xl border"
              style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color:"var(--muted)" }}>
                Research Interests
              </h4>
              <ul className="space-y-2.5">
                {RESEARCH_INTERESTS.map((interest, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color:"var(--fg-soft)" }}>
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background:"var(--accent)" }} />
                    {interest}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick stats */}
            <div className="p-5 rounded-2xl border grid grid-cols-2 gap-4"
              style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
              {ABOUT_STATS.map((stat) => (
                <div key={stat.label} className="text-center p-2">
                  <div className="text-2xl font-black"
                    style={{ fontFamily:"var(--font-display)", color:"var(--accent)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color:"var(--muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}