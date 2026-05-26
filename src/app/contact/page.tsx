"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { PERSONAL } from "@/data";

const CONTACT_REASONS = [
  { icon: "🔬", title: "Research Collaboration",  desc: "Joint papers, datasets, or ideas" },
  { icon: "💼", title: "Internship / Job",         desc: "Full-time or internship opportunities" },
  { icon: "🎓", title: "Academic Discussion",       desc: "Questions about my work or papers" },
  { icon: "✍️", title: "Speaking / Writing",        desc: "Talks, workshops, or guest posts" },
];

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [form, setForm]   = useState({ name:"", email:"", subject:"", message:"" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    // Simulate sending — wire up to Formspree/EmailJS/API route later
    await new Promise((r) => setTimeout(r, 1400));
    setState("success");
    setForm({ name:"", email:"", subject:"", message:"" });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--fg)",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <main style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-16 space-y-4">
          <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border"
            style={{ color:"var(--accent)", borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
            Contact
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight"
            style={{ fontFamily:"var(--font-display)", color:"var(--fg)" }}>
            Let&apos;s{" "}
            <span style={{ WebkitTextStroke:"2px var(--accent)", color:"transparent" }}>Talk</span>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color:"var(--muted)" }}>
            Whether it&apos;s research, opportunities, or just a technical discussion —
            I&apos;m always happy to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* Left — reasons + links */}
          <div className="lg:col-span-2 space-y-8">

            {/* Contact reasons */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color:"var(--muted)" }}>
                Good reasons to reach out
              </h2>
              {CONTACT_REASONS.map((r) => (
                <div key={r.title}
                  className="flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200"
                  style={{ borderColor:"var(--border)", background:"var(--surface)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor="var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor="var(--border)")}>
                  <span className="text-xl mt-0.5">{r.icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color:"var(--fg)" }}>{r.title}</p>
                    <p className="text-xs mt-0.5" style={{ color:"var(--muted)" }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color:"var(--muted)" }}>
                Find me online
              </h2>

              {[
                {
                  label: "GitHub",
                  value: PERSONAL.github,
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
                },
                {
                  label: "LinkedIn",
                  value: PERSONAL.linkedin,
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                },
                {
                  label: "Email",
                  value: `mailto:${PERSONAL.email}`,
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                },
              ].filter((s) => s.value).map((social) => (
                <a key={social.label} href={social.value} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 hover:opacity-80"
                  style={{ borderColor:"var(--border)", background:"var(--surface)", color:"var(--fg)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor="var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor="var(--border)")}>
                  <span style={{ color:"var(--accent)" }}>{social.icon}</span>
                  <div>
                    <p className="text-xs font-bold" style={{ color:"var(--muted)" }}>{social.label}</p>
                    <p className="text-sm font-medium" style={{ color:"var(--fg)" }}>
                      {social.value.replace("mailto:", "").replace("https://", "")}
                    </p>
                  </div>
                  <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color:"var(--muted)" }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border p-8"
              style={{ borderColor:"var(--border)", background:"var(--surface)" }}>

              {state === "success" ? (
                <div className="text-center py-16 space-y-4">
                  <div className="text-6xl">🎉</div>
                  <h3 className="text-2xl font-bold" style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color:"var(--muted)" }}>Thanks for reaching out — I&apos;ll get back to you soon.</p>
                  <button onClick={() => setState("idle")}
                    className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                    style={{ background:"var(--accent)", color:"#fff" }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold mb-6" style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>
                    Send a message
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold" style={{ color:"var(--muted)" }}>Name *</label>
                      <input required name="name" value={form.name} onChange={handleChange}
                        placeholder="Your full name" style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor="var(--accent)")}
                        onBlur={(e)  => (e.target.style.borderColor="var(--border)")} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold" style={{ color:"var(--muted)" }}>Email *</label>
                      <input required type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com" style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor="var(--accent)")}
                        onBlur={(e)  => (e.target.style.borderColor="var(--border)")} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold" style={{ color:"var(--muted)" }}>Subject *</label>
                    <input required name="subject" value={form.subject} onChange={handleChange}
                      placeholder="Research Collaboration / Job Opportunity / etc." style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor="var(--accent)")}
                      onBlur={(e)  => (e.target.style.borderColor="var(--border)")} />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold" style={{ color:"var(--muted)" }}>Message *</label>
                    <textarea required name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell me about what you'd like to discuss..."
                      rows={6} style={{ ...inputStyle, resize:"vertical" }}
                      onFocus={(e) => (e.target.style.borderColor="var(--accent)")}
                      onBlur={(e)  => (e.target.style.borderColor="var(--border)")} />
                  </div>

                  {state === "error" && (
                    <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
                  )}

                  <button type="submit" disabled={state==="sending"}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-80 disabled:opacity-50"
                    style={{ background:"var(--accent)", color:"#fff" }}>
                    {state === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Sending...
                      </span>
                    ) : "Send Message →"}
                  </button>

                  <p className="text-xs text-center" style={{ color:"var(--muted)" }}>
                    I typically respond within 1–2 business days.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}