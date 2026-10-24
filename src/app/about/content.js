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
  { name: "React",          icon: SiReact },
  { name: "Next.js",        icon: SiNextdotjs },
  { name: "JavaScript",     icon: SiJavascript },
  { name: "TypeScript",     icon: SiTypescript },
  { name: "HTML5",          icon: SiHtml5 },
  { name: "CSS3",           icon: SiCss },
  { name: "Tailwind CSS",   icon: SiTailwindcss },
  { name: "Node.js",        icon: SiNodedotjs },
  { name: "Express",        icon: SiExpress },
  { name: "Flutter",        icon: SiFlutter },
  { name: "Shopify Liquid", icon: SiShopify },
  { name: "Python",         icon: SiPython },
  { name: "Java",           icon: FaJava },
  { name: "C++",            icon: SiCplusplus },
  { name: "PHP",            icon: SiPhp },
  { name: "Go",             icon: SiGo },
  { name: "Rust",           icon: SiRust },
  { name: "Swift",          icon: SiSwift },
  { name: "Kotlin",         icon: SiKotlin },
  { name: "SQL",            icon: TbSql },
  { name: "MongoDB",        icon: SiMongodb },
  { name: "PostgreSQL",     icon: SiPostgresql },
  { name: "MySQL",          icon: SiMysql },
  { name: "Redis",          icon: SiRedis },
  { name: "Git",            icon: SiGit },
  { name: "Docker",         icon: SiDocker },
  { name: "Vercel",         icon: SiVercel },
  { name: "Netlify",        icon: SiNetlify },
  { name: "Postman",        icon: SiPostman },
];

export const CREATIVE = [
  { name: "After Effects",   icon: TbBrandAdobeAfterEffect },
  { name: "Premiere Pro",    icon: TbBrandAdobePremier },
  { name: "DaVinci Resolve", icon: SiDavinciresolve },
  { name: "CapCut",          icon: TbCut },
  { name: "Photoshop",       icon: TbBrandAdobePhotoshop },
  { name: "Lightroom",       icon: TbPhoto },
  { name: "Figma",           icon: SiFigma },
  { name: "Illustrator",     icon: TbBrandAdobeIllustrator },
];

export const EXPERIENCE = [
  { role: "Freelance Developer",                       period: "2024 – Present" },
  { role: "Freelance Video Editor",                    period: "2022 – Present" },
  { role: "Freelance Photo Editor & Graphic Designer", period: "2020 – Present" },
];
