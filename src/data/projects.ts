// ─────────────────────────────────────────────────────────────
// src/data/projects.ts
// Edit THIS file to add/remove/update projects.
// category must be one of: "ML" | "Signal Processing" | "Research"
// ─────────────────────────────────────────────────────────────

export interface ProjectMetric {
  k: string;   // label e.g. "NMSE Improvement"
  v: string;   // value e.g. "3.2 dB"
}

export interface Project {
  title:    string;
  category: "ML" | "Signal Processing" | "Research";
  tags:     string[];
  desc:     string;       // short description (shown on card)
  details:  string;       // long description (shown in modal)
  metrics:  ProjectMetric[];
  year:     string;
  github:   string;       // GitHub URL or "#" if private
  demo?:    string;       // optional live demo URL
  preview:  "transformer" | "beamforming" | "federated" | "gnn" | "diffusion";
  // preview controls which SVG thumbnail is shown
  // options: "transformer" | "beamforming" | "federated" | "gnn" | "diffusion"
}

export const PROJECTS: Project[] = [
  {
    title:   "Channel Estimation Using Vision Transformers",
    category:"ML",
    tags:    ["Transformer", "OFDM", "PyTorch", "Deep Learning"],
    desc:    "Applied Vision Transformer (ViT) architecture to pilot-based OFDM channel estimation, outperforming traditional MMSE estimators by 3.2 dB in NMSE at low SNR regimes.",
    details: "This project applies the Vision Transformer architecture to the problem of OFDM channel estimation. By treating the pilot-based channel matrix as a 2D image, we exploit spatial correlations in the time-frequency domain using multi-head self-attention. The model outperforms classical MMSE estimators by 3.2 dB in normalized mean square error across CDL-C channel models at low SNR conditions.",
    metrics: [
      { k: "NMSE Improvement", v: "3.2 dB" },
      { k: "Dataset",          v: "CDL-C"  },
      { k: "SNR Range",        v: "-10–20 dB" },
    ],
    year:    "2024",
    github:  "https://github.com",    // ← replace with real URL
    preview: "transformer",
  },
  {
    title:   "Adaptive Beamforming via Deep Q-Learning",
    category:"Signal Processing",
    tags:    ["Reinforcement Learning", "MIMO", "Beamforming"],
    desc:    "Designed a DQN-based agent for real-time beamforming vector selection in massive MIMO, achieving 94% of optimal spectral efficiency with 60% lower inference latency.",
    details: "A Deep Q-Network agent learns to select near-optimal beamforming vectors from a codebook in real time for massive MIMO systems. The agent is trained in a simulated mmWave environment and achieves 94% of exhaustive search spectral efficiency while reducing beam management overhead by 60%.",
    metrics: [
      { k: "Spectral Eff.", v: "94%"   },
      { k: "Latency ↓",    v: "60%"   },
      { k: "Array",        v: "64×16" },
    ],
    year:    "2024",
    github:  "https://github.com",    // ← replace with real URL
    preview: "beamforming",
  },
  {
    title:   "Federated Learning for Resource-Constrained IoT",
    category:"Research",
    tags:    ["Federated Learning", "Privacy", "Edge AI"],
    desc:    "Developed a communication-efficient federated learning framework with gradient sparsification, reducing uplink communication cost by 78% with less than 1% accuracy loss.",
    details: "This framework addresses the uplink communication bottleneck in federated learning over wireless networks. By combining top-k gradient sparsification with error feedback and adaptive quantization, we achieve 78% communication savings with negligible accuracy degradation across 100 simulated IoT devices.",
    metrics: [
      { k: "Comm. ↓",  v: "78%"      },
      { k: "Acc. Loss",v: "<1%"      },
      { k: "Devices",  v: "100 nodes"},
    ],
    year:    "2023",
    github:  "https://github.com",    // ← replace with real URL
    preview: "federated",
  },
  {
    title:   "Spectrum Sensing with Graph Neural Networks",
    category:"ML",
    tags:    ["GNN", "Cognitive Radio", "Spectrum"],
    desc:    "Modeled secondary user network as a graph and trained a GNN for cooperative spectrum sensing. Achieved 98.5% detection probability at -15 dB SNR.",
    details: "Secondary users in a cognitive radio network are modeled as graph nodes. A Graph Neural Network aggregates local energy measurements and inter-node correlations to make cooperative spectrum sensing decisions. The model achieves 98.5% detection probability at -15 dB SNR with false alarm rate below 2%.",
    metrics: [
      { k: "Detection",  v: "98.5%" },
      { k: "SNR",        v: "−15 dB"},
      { k: "False Alarm",v: "<2%"   },
    ],
    year:    "2023",
    github:  "https://github.com",    // ← replace with real URL
    preview: "gnn",
  },
  {
    title:   "Speech Denoising with Diffusion Models",
    category:"ML",
    tags:    ["Diffusion", "Audio", "Denoising"],
    desc:    "Applied score-based diffusion model for single-channel speech enhancement, achieving state-of-the-art PESQ scores on VoiceBank-DEMAND benchmark.",
    details: "A score-based diffusion model is applied to single-channel speech enhancement. The model learns the score function of clean speech distribution and uses Langevin dynamics to iteratively denoise corrupted speech signals. Achieves a PESQ score of 3.82 on VoiceBank-DEMAND with a compact 12M parameter model.",
    metrics: [
      { k: "PESQ Score", v: "3.82"     },
      { k: "Dataset",    v: "VoiceBank"},
      { k: "Params",     v: "12M"      },
    ],
    year:    "2024",
    github:  "https://github.com",    // ← replace with real URL
    preview: "diffusion",
  },
  // ── Add a new project below ──────────────────────────────
  // {
  //   title:   "Your Project Title",
  //   category:"ML",
  //   tags:    ["Tag1", "Tag2"],
  //   desc:    "Short description shown on card.",
  //   details: "Full description shown in modal popup.",
  //   metrics: [{ k: "Metric", v: "Value" }],
  //   year:    "2025",
  //   github:  "https://github.com/yourrepo",
  //   preview: "transformer",
  // },
];

export const PROJECT_CATEGORIES = ["All", "ML", "Signal Processing", "Research"] as const;