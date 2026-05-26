"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { PROJECTS, PROJECT_CATEGORIES, type Project } from "@/data";

// ── SVG Previews ─────────────────────────────────────────────
function PreviewTransformer() {
  const rows = 7, cols = 12, accent = "#818cf8";
  const vals = Array.from({ length: rows * cols }, (_, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    return Math.max(0, 1 - Math.abs(r - c * rows / cols) / 3 + (Math.sin(i) * 0.3));
  });
  return (
    <svg viewBox="0 0 240 110" width="100%" height="100%">
      {vals.map((v, i) => {
        const r = Math.floor(i / cols), c = i % cols;
        return <rect key={i} x={c*20+1} y={r*15+1} width={18} height={13} rx={2}
          opacity={v*0.85+0.08} fill={v>0.65?accent:v>0.35?"#6366f1":"#1e1e2a"} />;
      })}
      {Array.from({length:7},(_,i)=>(
        <rect key={i} x={i*20*(12/7)+1} y={i*15+1} width={18} height={13} rx={2} fill={accent} opacity={0.9}/>
      ))}
      <text x={4} y={108} fontSize={7} fill={accent} opacity={0.6} fontFamily="monospace">Attention Weight Matrix</text>
    </svg>
  );
}

function PreviewBeamforming() {
  const accent="#818cf8", R=44, cx=60, cy=55;
  const beamPath=(a:number,w=18,l=1)=>{
    const rad=(a-90)*Math.PI/180, hw=(w/2)*Math.PI/180;
    const x1=cx+Math.cos(rad-hw)*R*l, y1=cy+Math.sin(rad-hw)*R*l;
    const x2=cx+Math.cos(rad+hw)*R*l, y2=cy+Math.sin(rad+hw)*R*l;
    return `M${cx},${cy} L${x1},${y1} A${R*l},${R*l} 0 0,1 ${x2},${y2} Z`;
  };
  return (
    <svg viewBox="0 0 240 110" width="100%" height="100%">
      <defs><radialGradient id="bg2"><stop offset="0%" stopColor={accent} stopOpacity="0.7"/><stop offset="100%" stopColor={accent} stopOpacity="0"/></radialGradient></defs>
      {[0.25,0.5,0.75,1].map((r,i)=><circle key={i} cx={cx} cy={cy} r={R*r} fill="none" stroke="#1e1e2a" strokeWidth={0.7}/>)}
      <path d={beamPath(0,22,1)} fill="url(#bg2)" opacity={0.9}/>
      {[-35,30,160,-150].map((b,i)=><path key={i} d={beamPath(b,12,0.45)} fill={accent} opacity={0.18}/>)}
      <circle cx={cx} cy={cy} r={3} fill={accent}/>
      {Array.from({length:8},(_,i)=><rect key={i} x={105+i*16} y={48} width={4} height={14} rx={1} fill={accent} opacity={0.7-i*0.05}/>)}
      <text x={4} y={108} fontSize={7} fill={accent} opacity={0.6} fontFamily="monospace">DQN Beam Pattern — 64×16 MIMO</text>
    </svg>
  );
}

function PreviewFederated() {
  const accent="#818cf8";
  const server={x:120,y:28};
  const clients=[{x:28,y:85},{x:72,y:90},{x:120,y:88},{x:168,y:90},{x:212,y:85}];
  return (
    <svg viewBox="0 0 240 110" width="100%" height="100%">
      {clients.map((cl,i)=><line key={i} x1={cl.x} y1={cl.y-8} x2={server.x} y2={server.y+8} stroke={accent} strokeWidth={1.2} opacity={0.5}/>)}
      <circle cx={server.x} cy={server.y} r={11} fill="#1e1e35" stroke={accent} strokeWidth={1.5}/>
      <text x={server.x} y={server.y+3.5} textAnchor="middle" fontSize={8} fill={accent} fontFamily="monospace" fontWeight="bold">AGG</text>
      {clients.map((cl,i)=>(
        <g key={i}>
          <circle cx={cl.x} cy={cl.y} r={8} fill="#0f0f14" stroke={accent} strokeWidth={1} opacity={0.85}/>
          <text x={cl.x} y={cl.y+3} textAnchor="middle" fontSize={6} fill={accent} fontFamily="monospace">IoT</text>
        </g>
      ))}
      <rect x={75} y={100} width={90} height={5} rx={2} fill="#1e1e2a"/>
      <rect x={75} y={100} width={20} height={5} rx={2} fill={accent} opacity={0.9}/>
      <text x={4} y={108} fontSize={7} fill={accent} opacity={0.6} fontFamily="monospace">Gradient Sparsity: 78% pruned</text>
    </svg>
  );
}

function PreviewGNN() {
  const accent="#818cf8";
  const nodes=[{x:50,y:55,a:true},{x:85,y:30,a:false},{x:120,y:50,a:true},{x:155,y:28,a:false},{x:190,y:55,a:true},{x:70,y:82,a:false},{x:140,y:80,a:true},{x:210,y:80,a:false}];
  const edges=[[0,1],[0,2],[1,2],[2,3],[2,4],[3,4],[0,5],[2,6],[4,7],[5,6],[6,7]];
  const bars=Array.from({length:30},(_,i)=>({h:6+Math.abs(Math.sin(i)*18),occ:[3,4,5,12,13,19,20,21].includes(i)}));
  return (
    <svg viewBox="0 0 240 110" width="100%" height="100%">
      {edges.map(([a,b],i)=><line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={accent} strokeWidth={0.8} opacity={0.2}/>)}
      {nodes.map((n,i)=>(
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.a?7:5} fill={n.a?accent:"#1e1e2a"} stroke={accent} strokeWidth={n.a?1.5:0.8} opacity={n.a?1:0.45}/>
          {n.a&&<circle cx={n.x} cy={n.y} r={11} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.25}/>}
        </g>
      ))}
      {bars.map((b,i)=><rect key={i} x={4+i*7.8} y={108-b.h} width={6} height={b.h} rx={1} fill={b.occ?accent:"#1e1e2a"} opacity={b.occ?0.9:0.35}/>)}
    </svg>
  );
}

function PreviewDiffusion() {
  const accent="#818cf8", mid=55;
  const pts=(noise:boolean)=>Array.from({length:80},(_,i)=>{
    const x=(i/79)*220+10;
    const s=Math.sin(i*0.35)*16+Math.sin(i*0.9)*8;
    return `${x},${mid+s+(noise?(Math.sin(i*7)*12):0)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 240 110" width="100%" height="100%">
      <polyline points={pts(true)}  fill="none" stroke="#6b6b80" strokeWidth={1} opacity={0.4}/>
      <polyline points={pts(false)} fill="none" stroke={accent}  strokeWidth={2} opacity={0.9}/>
      <line x1={120} y1={10} x2={120} y2={100} stroke="#1e1e2a" strokeWidth={1} strokeDasharray="4,3"/>
      <text x={20}  y={18} fontSize={7} fill="#6b6b80" fontFamily="monospace">Noisy Input</text>
      <text x={130} y={18} fontSize={7} fill={accent}  fontFamily="monospace">Denoised</text>
      <text x={4}   y={108} fontSize={7} fill={accent} opacity={0.6} fontFamily="monospace">Score-Based Diffusion · PESQ 3.82</text>
    </svg>
  );
}

const PREVIEW_MAP = {
  transformer: PreviewTransformer,
  beamforming: PreviewBeamforming,
  federated:   PreviewFederated,
  gnn:         PreviewGNN,
  diffusion:   PreviewDiffusion,
} as const;

// ── Tag ──────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border"
      style={{ color:"var(--accent)", borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
      {label}
    </span>
  );
}

// ── Modal ────────────────────────────────────────────────────
function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Preview = PREVIEW_MAP[project.preview];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-3xl border overflow-hidden shadow-2xl"
        style={{ background:"var(--surface)", borderColor:"var(--border)", maxHeight:"90vh", overflowY:"auto" }}
        onClick={(e) => e.stopPropagation()}>

        {/* Preview */}
        <div className="w-full h-56 relative"
          style={{ background:"linear-gradient(135deg,var(--bg) 0%,#12121e 100%)", borderBottom:"1px solid var(--border)" }}>
          <Preview />
          <button onClick={onClose} title="Close modal"
            className="absolute top-4 right-4 p-2 rounded-xl border transition-opacity hover:opacity-70"
            style={{ background:"var(--surface)", borderColor:"var(--border)", color:"var(--fg)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-5">
          <div className="flex items-center justify-between">
            <Tag label={project.category} />
            <span className="text-xs font-mono" style={{ color:"var(--muted)" }}>{project.year}</span>
          </div>
          <h2 className="text-2xl font-bold leading-snug"
            style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>{project.title}</h2>
          <p className="text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{project.details}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl" style={{ background:"var(--bg)" }}>
            {project.metrics.map((m) => (
              <div key={m.k} className="text-center">
                <div className="text-xl font-bold" style={{ color:"var(--accent)", fontFamily:"var(--font-display)" }}>{m.v}</div>
                <div className="text-xs mt-0.5" style={{ color:"var(--muted)" }}>{m.k}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => <Tag key={t} label={t} />)}
          </div>

          <div className="flex gap-3 pt-1">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={{ background:"var(--accent)", color:"#fff" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              GitHub
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:opacity-70"
                style={{ borderColor:"var(--border)", color:"var(--fg)" }}>
                Live Demo →
              </a>
            )}
            <button onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm border transition-all hover:opacity-70"
              style={{ borderColor:"var(--border)", color:"var(--fg)" }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [filter,   setFilter]   = useState("All");
  const [search,   setSearch]   = useState("");
  const [view,     setView]     = useState<"grid"|"list">("grid");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = PROJECTS.filter((p) => {
    const matchCat    = filter === "All" || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const hover = (el: HTMLDivElement, on: boolean) => {
    el.style.borderColor = on ? "var(--accent)" : "var(--border)";
    el.style.transform   = on ? "translateY(-4px)" : "none";
    el.style.boxShadow   = on ? "0 20px 40px rgba(0,0,0,0.25)" : "none";
  };

  return (
    <main style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <Navbar />
      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-14 space-y-4">
          <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border"
            style={{ color:"var(--accent)", borderColor:"var(--accent-border)", background:"var(--accent-bg)" }}>
            Work
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight"
            style={{ fontFamily:"var(--font-display)", color:"var(--fg)" }}>
            Projects
          </h1>
          <p className="text-lg max-w-2xl" style={{ color:"var(--muted)" }}>
            Research projects spanning ML, signal processing, and systems design.
            Click any card to explore details.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center">
          <div className="flex gap-2 flex-wrap">
            {PROJECT_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200"
                style={{
                  borderColor: filter===cat ? "var(--accent)" : "var(--border)",
                  background:  filter===cat ? "var(--accent-bg)" : "transparent",
                  color:       filter===cat ? "var(--accent)" : "var(--muted)",
                }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 md:ml-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ color:"var(--muted)" }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..." className="pl-9 pr-4 py-2 rounded-xl border text-sm bg-transparent outline-none w-44"
                style={{ borderColor:"var(--border)", color:"var(--fg)" }} />
            </div>
            <div className="flex border rounded-xl overflow-hidden" style={{ borderColor:"var(--border)" }}>
              {(["grid","list"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className="px-3 py-2 text-xs font-medium transition-colors"
                  style={{ background:view===v?"var(--accent-bg)":"transparent", color:view===v?"var(--accent)":"var(--muted)" }}>
                  {v==="grid" ? "⊞" : "☰"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {view === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p, i) => {
              const Preview = PREVIEW_MAP[p.preview];
              return (
                <div key={i}
                  onClick={() => setSelected(p)}
                  onMouseEnter={(e) => hover(e.currentTarget as HTMLDivElement, true)}
                  onMouseLeave={(e) => hover(e.currentTarget as HTMLDivElement, false)}
                  className="rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 group"
                  style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
                  <div className="relative h-44 overflow-hidden"
                    style={{ background:"linear-gradient(135deg,var(--bg) 0%,#12121e 100%)", borderBottom:"1px solid var(--border)" }}>
                    <Preview />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background:"rgba(0,0,0,0.5)", backdropFilter:"blur(2px)" }}>
                      <span className="text-sm font-semibold px-5 py-2.5 rounded-xl"
                        style={{ background:"var(--accent)", color:"#fff" }}>View Details →</span>
                    </div>
                    <div className="absolute top-3 left-3"><Tag label={p.category} /></div>
                    <span className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded-lg"
                      style={{ background:"rgba(0,0,0,0.55)", color:"#fff" }}>{p.year}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold mb-1.5 leading-snug"
                      style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>{p.title}</h3>
                    <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color:"var(--muted)" }}>{p.desc}</p>
                    <div className="grid grid-cols-3 gap-1.5 mb-4 p-2.5 rounded-xl" style={{ background:"var(--bg)" }}>
                      {p.metrics.map((m) => (
                        <div key={m.k} className="text-center">
                          <div className="font-bold text-sm" style={{ color:"var(--accent)" }}>{m.v}</div>
                          <div className="text-xs" style={{ color:"var(--muted)" }}>{m.k}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.slice(0,2).map((t) => <Tag key={t} label={t} />)}
                      {p.tags.length > 2 && <span className="text-xs self-center" style={{ color:"var(--muted)" }}>+{p.tags.length-2}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List */}
        {view === "list" && (
          <div className="space-y-3">
            {filtered.map((p, i) => {
              const Preview = PREVIEW_MAP[p.preview];
              return (
                <div key={i}
                  onClick={() => setSelected(p)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor="var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor="var(--border)"; }}
                  className="flex items-stretch rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200"
                  style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
                  <div className="shrink-0 w-40"
                    style={{ background:"linear-gradient(135deg,var(--bg) 0%,#12121e 100%)", borderRight:"1px solid var(--border)" }}>
                    <Preview />
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Tag label={p.category} />
                        <span className="text-xs font-mono" style={{ color:"var(--muted)" }}>{p.year}</span>
                      </div>
                      <h3 className="font-bold text-base leading-snug mb-1"
                        style={{ color:"var(--fg)", fontFamily:"var(--font-display)" }}>{p.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color:"var(--muted)" }}>{p.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.tags.slice(0,3).map((t) => <Tag key={t} label={t} />)}
                      </div>
                      <span className="text-sm font-bold" style={{ color:"var(--accent)" }}>
                        {p.metrics[0].v} {p.metrics[0].k}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24" style={{ color:"var(--muted)" }}>
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-semibold text-lg">No projects found.</p>
            <p className="text-sm mt-1">Try a different keyword or category.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}