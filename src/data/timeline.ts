// ─────────────────────────────────────────────────────────────
// type: "edu" = indigo dot, "work" = cyan dot
// ─────────────────────────────────────────────────────────────

export interface TimelineItem {
  year:  string;
  role:  string;
  org:   string;
  desc:  string;
  type:  "edu" | "work";
}

export const TIMELINE: TimelineItem[] = [
  {
    year: "2024 – 2026",
    role: "M.Tech — Communication Signal Processing & Machine Learning",
    org:  "Indian Institute of Technology DharwadS",           
    desc: "Persuing a Master of Technology (M.Tech) degree in Communication Signal Processing & Machine Learning at the Indian Institute of Technology Dharwad, with a focus on machine learning algorithms, deep learning architectures, statistical signal processing techniques, and project work in areas such as continual learning in large language models, parameter efficient fine-tuning, retrieval augmented generation, and multimodal learning.",
    type: "edu",
  },
  {
    year: "2023-2024",
    role: "Postgraduate Diploma in Computer Applications",
    org:  "Rabindranath Tagore University, Bhopal",           
    desc: "Completed a comprehensive curriculum covering programming languages (C, C++, Python), data structures, algorithms, database management systems, software engineering principles, and web development technologies.",
    type: "edu",
  },
  {
    year: "2017 – 2021",
    role: "B.Tech — Electronics & Electronics Engineering",
    org:  "Motihari College of Engineering, AKU Patna",           
    desc: "Studied core subjects like electrical circuits, electrical machines, control systems, signal systems, analog and digital electronics, power electronics, power systems, microprocessors and microcontrollers, and communication systems.",
    type: "edu",
  },
{
    year: "2015 – 2017",
    role: "Intermediate (Science)",
    org:  "Bihar School Examination Board , Patna",           
    desc: "Completed intermediate education with a focus on maths, physics, chemistry, english and hindi.",
    type: "edu",
  },
{
    year: "2014 – 2015",
    role: "Secondary School Examination",
    org:  "Bihar School Examination Board , Patna",           
    desc: "Completed secondary education with a focus on science, maths, social science, hindi and sanskrit.",
    type: "edu",
  },

];