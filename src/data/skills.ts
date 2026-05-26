// ─────────────────────────────────────────────────────────────
// Edit THIS file to update your skill categories and interests.
// ─────────────────────────────────────────────────────────────

export interface SkillGroup {
  category: string;
  items:    string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: "ML / Deep Learning / AI",
    items:    ["PyTorch", "TensorFlow", "Transformers", "Reinforcement Learning", "GNNs", "Diffusion Models"],
  },
  {
    category: "Signal Processing",
    items:    ["OFDM", "MIMO", "Beamforming", "Adaptive Filters", "Channel Estimation", "Spectral Analysis"],
  },
  {
    category: "Languages",
    items:    ["Python", "C++", "MATLAB", "Julia", "Bash", "TypeScript"],
  },
  {
    category: "Tools & Infra",
    items:    ["CUDA", "Docker", "Git", "Weights & Biases", "HuggingFace", "Linux"],
  },
  // ── Add more skill groups below ─────────────────────────
  // {
  //   category: "Cloud",
  //   items:    ["AWS", "GCP", "Azure"],
  // },
];

export const RESEARCH_INTERESTS: string[] = [
  "Next-generation wireless communications (5G/6G)",
  "Deep learning for physical layer design",
  "Reinforcement learning for resource management",
  "Graph neural networks for network optimization",
  "Federated & privacy-preserving machine learning",
  "Diffusion models for signal generation",
  // ── Add more interests below ────────────────────────────
];

export const ABOUT_STATS = [
  { value: "5+",   label: "Projects"      },
  { value: "3",    label: "Publications"  },
  { value: "2",    label: "Years Research"},
  { value: "100%", label: "Dedication"    },
];