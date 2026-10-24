// ─────────────────────────────────────────────
//  ABOUT SECTION — edit everything here
// ─────────────────────────────────────────────

import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss,
  SiFlutter, SiShopify, SiPython, SiCplusplus,
  SiDavinciresolve, SiFigma,
  SiHtml5, SiCss, SiTypescript, SiPhp, SiGo, SiRust, SiSwift, SiKotlin,
  SiGit, SiDocker, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiRedis,
  SiVercel, SiNetlify, SiPostman,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  TbCut, TbSql, TbPhoto,
  TbBrandAdobeAfterEffect, TbBrandAdobePremier,
  TbBrandAdobePhotoshop, TbBrandAdobeIllustrator,
} from "react-icons/tb";

export const SECTION = {
  label: "About Me",
};

export const HEADING = {
  line1: "Building",
  line2: "ideas into",
  line3: "reality.",
};

// *word* = highlighted/bold in BlurText
export const BIO = [
  "I am a *student*, *developer*, and *content creator* passionate about technology, gaming, and building digital experiences. I enjoy turning ideas into real projects while learning, experimenting, and improving my skills.",
  "I authored *FAUG: The Untold Story*, a book exploring the journey of FAU-G. Writing this book has been an important milestone in my journey as a young creator.",
  "I am also involved in projects around *web development*, *AI*, and *gaming*. My work includes the VedAI Vedic knowledge app, which is nearing completion, and projects connected to the *Ascent Esport* esports team.",
  "Through my creator journey, I explore new technologies, develop digital projects, create content, and share what I learn. My goal is to keep building meaningful things, one project at a time."
];

export const RESUME_URL = "/resume.pdf";


export const TECH = [
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss },
  { name: "Firebase", icon: SiReact },
  { name: "AI Tools", icon: SiJavascript },
  { name: "Website Development", icon: SiNextdotjs },
  { name: "Discord Bot Development", icon: SiNodedotjs },
];

export const CREATIVE = [
  { name: "Video Editing", icon: TbCut },
  { name: "Graphic Design", icon: TbPhoto },
  { name: "AI-Assisted Creation", icon: SiFigma },
];

export const EXPERIENCE = [
  {
    role: "Student & Aspiring Developer",
    period: "Present",
  },
  {
    role: "Website Development & Personal Projects",
    period: "Ongoing",
  },
  {
    role: "Content Creation & Video Editing",
    period: "Ongoing",
  },
  {
    role: "Discord Bot Development",
    period: "Ongoing",
  },
];
