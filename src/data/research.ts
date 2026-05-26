// ─────────────────────────────────────────────────────────────
// src/data/research.ts
// Edit THIS file to add/update publications and research areas.
// status: "Published" | "Under Review" | "Preprint"
// ─────────────────────────────────────────────────────────────

export interface PubLink {
  label: string;
  href:  string;
}

export interface PubMetric {
  k: string;
  v: string;
}

export interface Publication {
  title:    string;
  authors:  string;
  venue:    string;
  year:     string;
  abstract: string;
  tags:     string[];
  status:   "Published" | "Under Review" | "Preprint";
  links:    PubLink[];
  metrics?: PubMetric[];
}

export const PUBLICATIONS: Publication[] = [
  {
    title:   "Vision Transformer-Based OFDM Channel Estimation with Sparse Pilots",
    authors: "Rahul Kumar Tiwari, [Co-author], [Advisor]",   // ← edit
    venue:   "IEEE Transactions on Wireless Communications",  // ← edit
    year:    "2024",
    abstract:"We propose a Vision Transformer (ViT) architecture adapted for pilot-based OFDM channel estimation. By treating the pilot-observed channel as a 2D image patch, the model learns long-range frequency-time correlations through multi-head self-attention. Extensive experiments on CDL-A/C channel models demonstrate 3.2 dB NMSE improvement over MMSE baselines at low SNR and strong generalization across Doppler spread conditions.",
    tags:    ["Transformer", "OFDM", "Channel Estimation", "Deep Learning"],
    status:  "Published",
    links:   [{ label: "Paper", href: "#" }, { label: "Code", href: "#" }],
    metrics: [
      { k: "NMSE ↓", v: "3.2 dB" },
      { k: "Channel",v: "CDL-C"  },
      { k: "SNR",    v: "−10–20 dB" },
    ],
  },
  {
    title:   "Deep Reinforcement Learning for Adaptive Beamforming in Massive MIMO",
    authors: "Rahul Kumar Tiwari, [Co-author]",              // ← edit
    venue:   "IEEE International Conference on Communications (ICC)",
    year:    "2024",
    abstract:"We formulate the beam management problem in massive MIMO as a Markov Decision Process and train a Deep Q-Network agent to select near-optimal beamforming vectors from a hierarchical codebook. The agent achieves 94% of exhaustive search spectral efficiency with 60% reduction in beam training overhead.",
    tags:    ["Reinforcement Learning", "MIMO", "Beamforming", "DQN"],
    status:  "Published",
    links:   [{ label: "Paper", href: "#" }, { label: "Slides", href: "#" }],
    metrics: [
      { k: "SE",          v: "94%" },
      { k: "Overhead ↓",  v: "60%" },
      { k: "Array",       v: "64×16" },
    ],
  },
  {
    title:   "Communication-Efficient Federated Learning over Wireless Networks",
    authors: "Rahul Kumar Tiwari, [Co-author], [Advisor]",   // ← edit
    venue:   "IEEE Wireless Communications Letters",
    year:    "2023",
    abstract:"This work addresses the uplink communication bottleneck in federated learning over bandwidth-constrained wireless networks. We propose a joint gradient sparsification and adaptive quantization scheme with error feedback that reduces uplink communication by 78% with less than 1% accuracy degradation.",
    tags:    ["Federated Learning", "Wireless", "Gradient Compression"],
    status:  "Published",
    links:   [{ label: "Paper", href: "#" }, { label: "Code", href: "#" }, { label: "Poster", href: "#" }],
    metrics: [
      { k: "Comm. ↓",  v: "78%" },
      { k: "Acc. Loss",v: "<1%" },
      { k: "Nodes",    v: "100" },
    ],
  },
  {
    title:   "Graph Neural Networks for Cooperative Spectrum Sensing in Cognitive Radio",
    authors: "Rahul Kumar Tiwari, [Co-author]",              // ← edit
    venue:   "IEEE Signal Processing Letters",
    year:    "2025",
    abstract:"We model the secondary user network as a dynamic graph and train a Graph Neural Network for cooperative spectrum sensing. The GNN achieves 98.5% detection probability at −15 dB SNR with false alarm rate below 2%, outperforming fusion-based approaches under impulsive noise conditions.",
    tags:    ["GNN", "Cognitive Radio", "Spectrum Sensing"],
    status:  "Under Review",
    links:   [{ label: "Preprint", href: "#" }],
    metrics: [
      { k: "Detection", v: "98.5%" },
      { k: "FA Rate",   v: "<2%"   },
      { k: "SNR",       v: "−15 dB"},
    ],
  },
  // ── Add a new publication below ──────────────────────────
  // {
  //   title:   "Your Paper Title",
  //   authors: "Rahul Kumar Tiwari, Co-author",
  //   venue:   "Conference / Journal Name",
  //   year:    "2025",
  //   abstract:"Full abstract text here.",
  //   tags:    ["Tag1", "Tag2"],
  //   status:  "Under Review",
  //   links:   [{ label: "Preprint", href: "https://arxiv.org/..." }],
  //   metrics: [{ k: "Metric", v: "Value" }],
  // },
];

export interface ResearchArea {
  icon:  string;
  title: string;
  desc:  string;
}

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    icon:  "⚡",
    title: "Deep Learning for Physical Layer",
    desc:  "Applying transformer architectures, CNNs, and generative models to channel estimation, equalization, and signal detection in OFDM/MIMO systems.",
  },
  {
    icon:  "🔁",
    title: "Reinforcement Learning for Resource Management",
    desc:  "Formulating beam management, power control, and spectrum allocation as MDPs and training DQN/PPO agents for real-time wireless resource optimization.",
  },
  {
    icon:  "🌐",
    title: "Federated & Distributed ML over Wireless",
    desc:  "Designing communication-efficient federated learning frameworks that are aware of bandwidth constraints, channel impairments, and privacy requirements.",
  },
  {
    icon:  "🕸️",
    title: "Graph Neural Networks for Networks",
    desc:  "Leveraging spatial graph structure of wireless networks for cooperative sensing, interference management, and topology-aware resource allocation.",
  },
  // ── Add more research areas below ──────────────────────
];