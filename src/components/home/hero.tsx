"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NeuralCanvas from "@/components/home/neural-canvas";

const TYPING_TEXT =
  "Building intelligent systems at the intersection of wireless communications and machine learning.";

export default function Hero() {
  const [typed, setTyped]           = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [mounted, setMounted]       = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Typing animation
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= TYPING_TEXT.length) {
        setTyped(TYPING_TEXT.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 28);
    return () => clearInterval(timer);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const timer = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden">

      {/* Animated background */}
      <NeuralCanvas />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #f5efef 0%, #f8f3f3 0%, rgba(54, 53, 61, 0.31) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto w-full pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── Left: Text ── */}
          <div className="flex-1 space-y-6">

            {/* Status badge */}
            <div className="flex items-center gap-2 animate-fade-up">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ background: "#22c55e" }}
              />
              <span className="text-sm font-medium" style={{ color: "#22c55e" }}>
                Available for research collaborations
              </span>
            </div>

            {/* Name */}
            <div className="animate-fade-up delay-100">
              <h1
                className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
                style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
              >
                Rahul
              </h1>
              <h1
                className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  WebkitTextStroke: "2px var(--fg)",
                  color: "transparent",
                }}
              >
                Tiwari
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl font-medium animate-fade-up delay-200"
              style={{ color: "var(--muted)" }}
            >
              M.Tech · Communication Signal Processing & Machine Learning
            </p>

            {/* Typing text */}
            <p
              className="text-base md:text-lg leading-relaxed min-h-[3.5rem] animate-fade-up delay-300"
              style={{ color: "var(--fg-soft)" }}
            >
              {typed}
              <span
                className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                style={{
                  background: "var(--accent)",
                  opacity: showCursor ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              />
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2 animate-fade-up delay-400">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 hover:opacity-90"
                style={{ background: "var(--accent)", color: "#ffffff" }}
              >
                View Projects
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>

              <Link
                href="/research"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 border"
                style={{ border: "1px solid var(--border)", color: "var(--fg)", background: "var(--surface)" }}
              >
                Read Research
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 border"
                style={{ border: "1px solid var(--border)", color: "var(--fg)", background: "var(--surface)" }}
              >
                Contact Me
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4 animate-fade-up delay-500">
              {[
                { label: "Projects",      value: "5+" },
                { label: "Publications",  value: "3"  },
                { label: "Years Research",value: "2"  },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Photo ── */}
          {mounted && (
            <div className="shrink-0 animate-fade-up delay-200 flex flex-col items-center gap-4">
              <div className="relative">

                {/* Glow behind photo */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
                    transform: "scale(1.35)",
                    zIndex: 0,
                  }}
                />

                {/* Photo with gradient border */}
                <div
                  className="relative rounded-full overflow-hidden"
                  style={{
                    width: "240px",
                    height: "240px",
                    padding: "3px",
                    background: "linear-gradient(135deg, #4f46e5, #a78bfa, #22d3ee)",
                    zIndex: 2,
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden"
                    style={{ background: "var(--bg)" }}>
                    <Image
                      src="/rahul.jpg"
                      alt="Rahul Kumar Tiwari"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>

                {/* Badge — bottom right */}
                <div
                  className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-lg"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--accent-border)",
                    color: "var(--accent)",
                    zIndex: 10,
                  }}
                >
                  M.Tech 🎓
                </div>

                {/* Badge — top left */}
                <div
                  className="absolute -top-2 -left-2 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-lg"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--fg-soft)",
                    zIndex: 10,
                  }}
                >
                  🔬 ML Researcher
                </div>
              </div>

              {/* Name label */}
              <div className="text-center">
                <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  Rahul Kumar Tiwari
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                  Signal Processing · Machine Learning
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8" style={{ background: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--muted)" }}>scroll</span>
      </div>
    </section>
  );
}