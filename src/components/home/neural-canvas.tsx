"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/providers/theme-provider";

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const { theme } = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const DPR = window.devicePixelRatio || 1;
    // initialize to avoid "used before being assigned" error
    let W: number = 0, H: number = 0, frame = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth  * DPR;
      H = canvas.height = canvas.offsetHeight * DPR;
    };
    resize();

    // ── Palette ──────────────────────────────────────────────────
    const P = {
      indigo:  [99,  102, 241],
      violet:  [167,  93, 243],
      cyan:    [34,  211, 238],
      blue:    [59,  130, 246],
      rose:    [244, 114, 182],
      emerald: [52,  211, 153],
    } as const;
    const col = (rgb: readonly number[] | number[], a: number) =>
      `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

    // ── Aurora nebula glows ──────────────────────────────────────
    const auroras = [
      { xF:0.15, yF:0.35, rx:0.38, ry:0.28, color:P.indigo, phase:0,   speed:0.0055, alpha:0.35 },
      { xF:0.72, yF:0.55, rx:0.42, ry:0.32, color:P.violet, phase:2.1, speed:0.0042, alpha:0.32 },
      { xF:0.45, yF:0.80, rx:0.30, ry:0.20, color:P.cyan,   phase:4.2, speed:0.0068, alpha:0.28 },
      { xF:0.85, yF:0.20, rx:0.25, ry:0.18, color:P.blue,   phase:1.0, speed:0.0050, alpha:0.28 },
      { xF:0.30, yF:0.10, rx:0.20, ry:0.14, color:P.rose,   phase:3.3, speed:0.0060, alpha:0.22 },
    ];

    // ── Deep Neural Network 8-layer ──────────────────────────────
    const LAYER_SIZES = [4, 7, 10, 12, 12, 10, 7, 4];
    const NN_X0  = W * 0.03;
    const NN_X1  = W * 0.52;
    const NN_CY  = H * 0.52;
    const NN_GAP = (NN_X1 - NN_X0) / (LAYER_SIZES.length - 1);
    const NN_VS  = H * 0.062;
    const depthScale = (li: number) => 0.55 + (li / (LAYER_SIZES.length - 1)) * 0.55;

    const layerColors = [P.indigo, P.violet, P.cyan, P.blue] as const;
    const nnLayers = LAYER_SIZES.map((n, li) => {
      const ds = depthScale(li);
      return Array.from({ length: n }, (_, ni) => ({
        x:         NN_X0 + li * NN_GAP,
        y:         NN_CY + (ni - (n - 1) / 2) * NN_VS * ds,
        r:         (2.8 + ds * 2.2) * DPR,
        pulse:     Math.random() * Math.PI * 2,
        pSpeed:    0.016 + Math.random() * 0.014,
        fire:      Math.random() > 0.5,
        firePhase: Math.random() * Math.PI * 2,
        color:     layerColors[li % 4],
      }));
    });
    let forwardT = 0;

    // ── Holographic attention rings ──────────────────────────────
    const ATT_CX = W * 0.62;
    const ATT_CY = H * 0.48;
    const attRings = [
      { r: 55*DPR,  speed:  0.008, phase: 0,   color: P.indigo, dashes: 8,  alpha: 0.95 },
      { r: 82*DPR,  speed: -0.006, phase: 0.8, color: P.violet, dashes: 12, alpha: 0.85 },
      { r: 112*DPR, speed:  0.005, phase: 1.6, color: P.cyan,   dashes: 16, alpha: 0.75 },
      { r: 145*DPR, speed: -0.004, phase: 2.4, color: P.blue,   dashes: 20, alpha: 0.60 },
      { r: 180*DPR, speed:  0.003, phase: 3.2, color: P.indigo, dashes: 24, alpha: 0.45 },
    ];

    const HEADS = 8;
    const headColors = [P.indigo, P.violet, P.cyan, P.rose] as const;
    const headAngles = Array.from({ length: HEADS }, (_, i) => ({
      base:   (i / HEADS) * Math.PI * 2,
      speed:  0.009 + (i % 3) * 0.003,
      weight: 0.4 + Math.random() * 0.6,
      pulse:  Math.random() * Math.PI * 2,
      pSpeed: 0.02  + Math.random() * 0.01,
      color:  headColors[i % 4] as readonly number[],
    }));

    const particleColors = [P.indigo, P.violet, P.cyan, P.blue, P.rose] as const;
    const attParticles = Array.from({ length: 40 }, (_, i) => ({
      ring:  i % 5,
      angle: Math.random() * Math.PI * 2,
      speed: (0.015 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1),
      size:  (1.5 + Math.random() * 2.5) * DPR,
      color: particleColors[i % 5] as readonly number[],
      alpha: 0.5 + Math.random() * 0.5,
    }));

    // ── Token river ──────────────────────────────────────────────
    const TWORDS = [
      "<BOS>","Transformer","attention","is","all","you","need","→",
      "Q·Kᵀ","softmax","∇L","embedding","context","[MASK]",
      "residual","LayerNorm","FFN","GELU","<EOS>","⊕",
    ];
    const TOKEN_Y  = H * 0.88;
    const TOKEN_SP = 86 * DPR;
    const tokenColors = [P.cyan, P.indigo, P.violet, P.blue, P.rose, P.emerald] as const;
    const tokens = TWORDS.map((w, i) => ({
      word:   w,
      x:      i * TOKEN_SP,
      pulse:  Math.random() * Math.PI * 2,
      pSpeed: 0.018 + Math.random() * 0.01,
      color:  tokenColors[i % 6] as readonly number[],
      size:   (9 + Math.random() * 5) * DPR,
      emb:    Array.from({ length: 8 }, () => Math.random() * 2 - 1),
    }));
    let tokenScroll = 0;

    // ── Weight matrix rain ───────────────────────────────────────
    const RAIN_COLS   = 28;
    const RAIN_CHAR_H = 16 * DPR;
    const RAIN_X      = W * 0.78;
    const rainColors  = [P.indigo, P.violet, P.cyan, P.blue] as const;
    const rainStreams  = Array.from({ length: RAIN_COLS }, (_, i) => ({
      x:            RAIN_X + (i * (W - RAIN_X)) / RAIN_COLS,
      y:            Math.random() * H,
      speed:        (1.2 + Math.random() * 2.5) * DPR,
      len:          Math.floor(6 + Math.random() * 14),
      chars:        Array.from({ length: 20 }, () => (Math.random() * 2 - 1).toFixed(2)),
      color:        rainColors[i % 4] as readonly number[],
      alpha:        0.12 + Math.random() * 0.16,
      refreshTimer: 0,
      refreshRate:  8 + Math.floor(Math.random() * 12),
    }));

    // ── Floating math expressions ────────────────────────────────
    const exprColors = [P.indigo, P.violet, P.cyan, P.blue, P.rose] as const;
    const EXPRS = [
      "Q·Kᵀ/√dₖ","softmax(·)","∇θ L(θ)","LayerNorm","p(y|x;θ)",
      "W₁ReLU(W₀x)","KL(p‖q)","∂L/∂W","Adam(∇)","Σ αᵢvᵢ",
      "GELU(x)","σ(Wx+b)","argmax","z~𝒩(μ,σ²)",
    ].map((text) => ({
      text,
      x:      Math.random() * W * 0.9 + W * 0.05,
      y:      Math.random() * H * 0.85 + H * 0.08,
      vx:     (Math.random() - 0.5) * 0.3,
      vy:     (Math.random() - 0.5) * 0.2,
      alpha:  0.07 + Math.random() * 0.12,
      size:   (10 + Math.random() * 8) * DPR,
      pulse:  Math.random() * Math.PI * 2,
      pSpeed: 0.007 + Math.random() * 0.009,
      color:  exprColors[Math.floor(Math.random() * 5)] as readonly number[],
    }));

    // ── Supernova bursts ─────────────────────────────────────────
    type Nova = {
      x: number; y: number; r: number; maxR: number;
      alpha: number; color: readonly number[]; speed: number; rays: number;
    };
    const supernovas: Nova[] = [];
    const novaColors = [P.indigo, P.violet, P.cyan, P.rose, P.emerald] as const;
    let novaTimer = 0;

    // ── Volumetric light beams ───────────────────────────────────
    const lightBeams = [
        { x1F: 0.0,  y1F: 0.0, x2F: 0.6, y2F: 1.0, color: P.indigo, alpha: 0.18, w: 160*DPR },
        { x1F: 0.3,  y1F: 0.0, x2F: 0.9, y2F: 1.0, color: P.violet, alpha: 0.15, w: 120*DPR },
        { x1F: 0.75, y1F: 0.0, x2F: 0.2, y2F: 1.0, color: P.cyan,   alpha: 0.14, w: 100*DPR },
    ];
    // ── DRAW LOOP ────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;
      tokenScroll = (tokenScroll + 0.55) % TOKEN_SP;
      forwardT    = (forwardT   + 0.004) % 1;
      novaTimer++;

      // 1. Volumetric light beams
      lightBeams.forEach((b) => {
        const x1 = b.x1F*W, y1 = b.y1F*H, x2 = b.x2F*W, y2 = b.y2F*H;
        const angle   = Math.atan2(y2-y1, x2-x1);
        const perp    = angle + Math.PI / 2;
        const half    = b.w / 2;
        const breathe = 0.7 + Math.sin(frame * 0.007) * 0.3;
        const grd = ctx.createLinearGradient(x1, y1, x2, y2);
        grd.addColorStop(0,   col(b.color, 0));
        grd.addColorStop(0.3, col(b.color, b.alpha * breathe));
        grd.addColorStop(0.7, col(b.color, b.alpha * breathe * 0.6));
        grd.addColorStop(1,   col(b.color, 0));
        ctx.beginPath();
        ctx.moveTo(x1 + Math.cos(perp)*half,   y1 + Math.sin(perp)*half);
        ctx.lineTo(x2 + Math.cos(perp)*half*3, y2 + Math.sin(perp)*half*3);
        ctx.lineTo(x2 - Math.cos(perp)*half*3, y2 - Math.sin(perp)*half*3);
        ctx.lineTo(x1 - Math.cos(perp)*half,   y1 - Math.sin(perp)*half);
        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // 2. Aurora nebula
      auroras.forEach((a) => {
        a.phase += a.speed;
        const breathe = 0.6 + Math.sin(a.phase) * 0.4;
        const ax = a.xF*W, ay = a.yF*H;
        const rx = a.rx*W*breathe, ry = a.ry*H*breathe;
        const grd = ctx.createRadialGradient(ax, ay, 0, ax, ay, Math.max(rx, ry));
        grd.addColorStop(0,   col(a.color, a.alpha * breathe * 1.8));
        grd.addColorStop(0.4, col(a.color, a.alpha * breathe * 0.8));
        grd.addColorStop(1,   col(a.color, 0));
        ctx.save();
        ctx.scale(1, ry / rx);
        ctx.beginPath();
        ctx.arc(ax, ay * (rx / ry), rx, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();
      });

      // 3. NN edges with forward-pass wave
      for (let li = 0; li < nnLayers.length - 1; li++) {
        for (const src of nnLayers[li]) {
          for (const dst of nnLayers[li + 1]) {
            const edgeLiFrac = li / (nnLayers.length - 2);
            const waveDist   = Math.abs(edgeLiFrac - forwardT);
            const waveGlow   = Math.max(0, 1 - waveDist * 6);
            const baseAlpha  = 0.06 + waveGlow * 0.35;
            ctx.beginPath();
            ctx.moveTo(src.x, src.y);
            ctx.lineTo(dst.x, dst.y);
            ctx.strokeStyle = col(waveGlow > 0.3 ? src.color : P.indigo, baseAlpha);
            ctx.lineWidth   = (0.5 + waveGlow * 1.5) * DPR;
            ctx.stroke();
          }
        }
      }

      // 4. NN nodes
      const layerLabels = ["In","Emb","MHA","FFN","MHA","FFN","Out","Cls"];
      nnLayers.forEach((layer, li) => {
        const ds = depthScale(li);
        layer.forEach((n) => {
          n.pulse += n.pSpeed;
          const fired = n.fire && Math.sin(n.firePhase + frame * 0.04) > 0.6;
          const glow  = 0.45 + Math.sin(n.pulse) * 0.45;
          const nc    = fired ? P.cyan : n.color;
          const r     = n.r * (fired ? 1.5 : 1) * (0.7 + glow * 0.4);

          // aura
          const auraG = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.5);
          auraG.addColorStop(0, col(nc, fired ? 0.45 : 0.18 * glow));
          auraG.addColorStop(1, col(nc, 0));
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = auraG;
          ctx.fill();

          // core
          const coreG = ctx.createRadialGradient(n.x - r*0.3, n.y - r*0.3, 0, n.x, n.y, r);
          coreG.addColorStop(0, col(nc, fired ? 1.0 : 0.9 * glow));
          coreG.addColorStop(1, col(nc, fired ? 0.7 : 0.4 * glow));
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = coreG;
          ctx.fill();

          // ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 1.4, 0, Math.PI * 2);
          ctx.strokeStyle = col(nc, 0.3 * glow);
          ctx.lineWidth   = 0.8 * DPR;
          ctx.stroke();
        });

        // layer label
        if (layer.length > 0) {
          const topY = layer[0].y - layer[0].r * 2.5 - 12 * DPR * ds;
          ctx.font      = `bold ${7 * DPR * ds}px monospace`;
          ctx.fillStyle = col(layer[0].color, 0.45);
          ctx.textAlign = "center";
          ctx.fillText(layerLabels[li] ?? "", layer[0].x, topY);
          ctx.textAlign = "left";
        }
      });

      // 5. Attention ring halo
      const haloG = ctx.createRadialGradient(ATT_CX, ATT_CY, 60*DPR, ATT_CX, ATT_CY, 200*DPR);
      haloG.addColorStop(0, col(P.indigo, 0.12));
      haloG.addColorStop(1, col(P.indigo, 0));
      ctx.beginPath();
      ctx.arc(ATT_CX, ATT_CY, 200*DPR, 0, Math.PI * 2);
      ctx.fillStyle = haloG;
      ctx.fill();

      // Rings
      attRings.forEach((ring, ri) => {
        ring.phase += ring.speed;
        const breathe  = 0.85 + Math.sin(ring.phase * 2.3) * 0.15;
        const r        = ring.r * breathe;
        const segAngle = (Math.PI * 2) / ring.dashes;
        ctx.save();
        ctx.translate(ATT_CX, ATT_CY);
        ctx.rotate(ring.phase);
        for (let d = 0; d < ring.dashes; d++) {
          const glow = 0.6 + Math.sin(ring.phase * 3 + d) * 0.35;
          ctx.beginPath();
          ctx.arc(0, 0, r, d * segAngle, d * segAngle + segAngle * 0.62);
          ctx.strokeStyle = col(ring.color, ring.alpha * glow);
          ctx.lineWidth   = (1.8 + (5 - ri) * 0.5) * DPR;
          ctx.shadowColor = col(ring.color, 0.6);
          ctx.shadowBlur  = 10 * DPR;
          ctx.stroke();
          ctx.shadowBlur  = 0;
        }
        ctx.restore();
      });

      // Head spokes
      headAngles.forEach((h, i) => {
        h.pulse += h.pSpeed;
        h.base  += h.speed;
        const glow   = 0.5 + Math.sin(h.pulse) * 0.45;
        const spokeR = 165 * DPR * (0.85 + h.weight * 0.2);
        const ox = ATT_CX + Math.cos(h.base) * spokeR;
        const oy = ATT_CY + Math.sin(h.base) * spokeR;
        const ix = ATT_CX + Math.cos(h.base) * 52 * DPR;
        const iy = ATT_CY + Math.sin(h.base) * 52 * DPR;

        const spokeG = ctx.createLinearGradient(ix, iy, ox, oy);
        spokeG.addColorStop(0, col(h.color, 0.55 * glow));
        spokeG.addColorStop(1, col(h.color, 0.12 * glow));
        ctx.beginPath();
        ctx.moveTo(ix, iy);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = spokeG;
        ctx.lineWidth   = (1 + h.weight * 1.5) * DPR;
        ctx.stroke();

        // head dot glow
        const hdG = ctx.createRadialGradient(ox, oy, 0, ox, oy, 11*DPR);
        hdG.addColorStop(0, col(h.color, glow));
        hdG.addColorStop(1, col(h.color, 0));
        ctx.beginPath();
        ctx.arc(ox, oy, 11*DPR, 0, Math.PI * 2);
        ctx.fillStyle = hdG;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ox, oy, 4*DPR, 0, Math.PI * 2);
        ctx.fillStyle = col(h.color, glow);
        ctx.fill();

        ctx.font      = `bold ${7*DPR}px monospace`;
        ctx.fillStyle = col(h.color, 0.7);
        ctx.textAlign = "center";
        ctx.fillText(`H${i}`, ox, oy - 9*DPR);
        ctx.textAlign = "left";
      });

      // Center MHA core
      const ccG = ctx.createRadialGradient(ATT_CX, ATT_CY, 0, ATT_CX, ATT_CY, 52*DPR);
      ccG.addColorStop(0,   col(P.indigo, 0.95));
      ccG.addColorStop(0.4, col(P.violet, 0.6));
      ccG.addColorStop(1,   col(P.indigo, 0));
      ctx.beginPath();
      ctx.arc(ATT_CX, ATT_CY, 52*DPR, 0, Math.PI * 2);
      ctx.fillStyle = ccG;
      ctx.fill();
      ctx.font      = `bold ${9*DPR}px monospace`;
      ctx.fillStyle = col(P.cyan, 0.9);
      ctx.textAlign = "center";
      ctx.fillText("MHA", ATT_CX, ATT_CY + 3.5*DPR);
      ctx.textAlign = "left";

      // Ring particles
      attParticles.forEach((p) => {
        p.angle += p.speed;
        const ring    = attRings[p.ring];
        const breathe = 0.85 + Math.sin(ring.phase * 2.3) * 0.15;
        const px      = ATT_CX + Math.cos(p.angle) * ring.r * breathe;
        const py      = ATT_CY + Math.sin(p.angle) * ring.r * breathe;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = col(p.color, p.alpha * (0.5 + Math.sin(p.angle * 5) * 0.4));
        ctx.fill();
      });

      ctx.font      = `${7*DPR}px monospace`;
      ctx.fillStyle = col(P.indigo, 0.3);
      ctx.textAlign = "center";
      ctx.fillText("Multi-Head Self-Attention", ATT_CX, ATT_CY - 195*DPR);
      ctx.textAlign = "left";

      // 6. Weight matrix rain
      ctx.font = `${9*DPR}px monospace`;
      rainStreams.forEach((s) => {
        s.y += s.speed;
        s.refreshTimer++;
        if (s.refreshTimer >= s.refreshRate) {
          s.refreshTimer = 0;
          s.chars.shift();
          s.chars.push((Math.random() * 2 - 1).toFixed(2));
        }
        if (s.y > H + s.len * RAIN_CHAR_H) s.y = -s.len * RAIN_CHAR_H;
        for (let ci = 0; ci < s.len; ci++) {
          const charY = s.y + ci * RAIN_CHAR_H;
          if (charY < 0 || charY > H) continue;
          const frac  = ci / s.len;
          const isHead = ci === s.len - 1;
          const alpha = isHead ? s.alpha * 5 : s.alpha * (1 - frac * 0.7);
          ctx.fillStyle = col(isHead ? P.cyan : s.color, Math.min(1, alpha));
          ctx.fillText(s.chars[ci] ?? "0.00", s.x, charY);
        }
      });

      // Matrix bracket
      const mw = W - RAIN_X - 10*DPR;
      ctx.strokeStyle = col(P.indigo, 0.14);
      ctx.lineWidth   = 1.5 * DPR;
      ctx.beginPath(); ctx.moveTo(RAIN_X - 8*DPR, 18*DPR); ctx.lineTo(RAIN_X - 8*DPR, H - 18*DPR); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W - 5*DPR,      18*DPR); ctx.lineTo(W - 5*DPR,      H - 18*DPR); ctx.stroke();
      ctx.font      = `${7*DPR}px monospace`;
      ctx.fillStyle = col(P.violet, 0.28);
      ctx.textAlign = "center";
      ctx.fillText("W ∈ ℝ⁷⁶⁸ˣ⁷⁶⁸", RAIN_X + mw / 2, 13*DPR);
      ctx.textAlign = "left";

      // 7. Token river
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, TOKEN_Y - 28*DPR, W * 0.77, 62*DPR);
      ctx.clip();
      tokens.forEach((tok) => {
        tok.pulse += tok.pSpeed;
        const totalLen = TWORDS.length * TOKEN_SP;
        const drawX    = ((tok.x - tokenScroll) % totalLen + totalLen) % totalLen;
        if (drawX > W * 0.77 + TOKEN_SP || drawX < -TOKEN_SP) return;
        const glow = 0.55 + Math.sin(tok.pulse) * 0.4;
        const tw   = Math.max(tok.word.length * 7.2*DPR + 16*DPR, 40*DPR);

        ctx.strokeStyle = col(tok.color, 0.5 * glow);
        ctx.lineWidth   = 0.9 * DPR;
        ctx.shadowColor = col(tok.color, 0.5);
        ctx.shadowBlur  = 8 * DPR;
        ctx.beginPath();
        if ((ctx as any).roundRect) {
          (ctx as any).roundRect(drawX - tw/2, TOKEN_Y - 14*DPR, tw, 22*DPR, 5*DPR);
        } else {
          ctx.rect(drawX - tw/2, TOKEN_Y - 14*DPR, tw, 22*DPR);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.font      = `bold ${tok.size}px monospace`;
        ctx.fillStyle = col(tok.color, 0.8 * glow);
        ctx.textAlign = "center";
        ctx.fillText(tok.word, drawX, TOKEN_Y + 3*DPR);

        tok.emb.forEach((v, ei) => {
          const bx = drawX - 18*DPR + ei * 5*DPR;
          const bh = Math.abs(v) * 9*DPR;
          ctx.fillStyle = col(v > 0 ? P.cyan : P.rose, 0.4 * glow);
          ctx.fillRect(bx, TOKEN_Y + (v < 0 ? 10*DPR : 10*DPR - bh), 3.5*DPR, bh);
        });
      });
      ctx.textAlign = "left";
      ctx.restore();

      ctx.font      = `${7*DPR}px monospace`;
      ctx.fillStyle = col(P.cyan, 0.25);
      ctx.fillText("← token stream · embeddings · context window →", 8*DPR, TOKEN_Y - 32*DPR);

      // 8. Floating math
      EXPRS.forEach((expr) => {
        expr.pulse += expr.pSpeed;
        expr.x     += expr.vx;
        expr.y     += expr.vy;
        if (expr.x < 8*DPR || expr.x > W * 0.75) expr.vx *= -1;
        if (expr.y < 12*DPR || expr.y > H - 10*DPR) expr.vy *= -1;
        const alpha = expr.alpha * (0.8 + Math.sin(expr.pulse) * 0.2);
        ctx.font      = `${expr.size}px monospace`;
        ctx.fillStyle = col(expr.color, alpha);
        ctx.fillText(expr.text, expr.x, expr.y);
      });

      // 9. Supernova bursts
      if (novaTimer > 90 && Math.random() > 0.96 && supernovas.length < 5) {
        novaTimer = 0;
        supernovas.push({
          x:     Math.random() * W * 0.7 + W * 0.05,
          y:     Math.random() * H * 0.8 + H * 0.05,
          r:     0,
          maxR:  (40 + Math.random() * 80) * DPR,
          alpha: 0.8,
          color: novaColors[Math.floor(Math.random() * 5)],
          speed: (1.2 + Math.random() * 1.8) * DPR,
          rays:  Math.floor(8 + Math.random() * 8),
        });
      }
      for (let i = supernovas.length - 1; i >= 0; i--) {
        const s = supernovas[i];
        s.r     += s.speed;
        s.alpha -= 0.012;
        if (s.alpha <= 0 || s.r > s.maxR) { supernovas.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = col(s.color, s.alpha * 0.7);
        ctx.lineWidth   = (2.5 - (s.r / s.maxR) * 1.5) * DPR;
        ctx.shadowColor = col(s.color, 0.7);
        ctx.shadowBlur  = 16 * DPR;
        ctx.stroke();
        ctx.shadowBlur  = 0;
        for (let ri = 0; ri < s.rays; ri++) {
          const angle = (ri / s.rays) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(s.x + Math.cos(angle) * s.r * 0.5, s.y + Math.sin(angle) * s.r * 0.5);
          ctx.lineTo(s.x + Math.cos(angle) * s.r * 1.4, s.y + Math.sin(angle) * s.r * 1.4);
          ctx.strokeStyle = col(s.color, s.alpha * 0.5);
          ctx.lineWidth   = 0.8 * DPR;
          ctx.stroke();
        }
      }

      // 10. Vignette
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.9);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
