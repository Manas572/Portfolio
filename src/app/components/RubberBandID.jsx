"use client";

import React from "react";
import TiltedCard from "./TiltedCard";
import {
  SiCodechef,
  SiCodeforces,
  SiGithub,
  SiLeetcode,
} from "@icons-pack/react-simple-icons";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { Download, Sparkles, FileText, Infinity } from "lucide-react";

// ─── Card data ───────────────────────────────────────────────────────────────
const PROFILE = {
  fullName: "Manas Kumar",
  handle: "@manaskumar10",
  role: "Full Stack Web Developer",
  institute: "IIIT Bhopal",
  joinDate: "AUG 2024",
  idNumber: "24U022026",
  status: "student",
  email: "manaskumar20056@gmail.com",
  github: "github.com/Manas572",
  linkedin: "linkedin.com/in/manas-kumar-512523326",
  website: "github.com/Manas572",
};

// ─── Front face ───────────────────────────────────────────────────────────────
function CardFront() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-[15px] select-none">
      {/* Photo */}
      <img
        src="/id.png"
        alt="Manas Kumar"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(12,14,18,0.97) 0%, rgba(12,14,18,0.7) 60%, transparent 100%)",
        }}
      />

      {/* Clip hole at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10"
        style={{
          width: 56,
          height: 22,
          borderRadius: 8,
          background: "#181b20",
          border: "2px solid #FFA500",
        }}
      />

      {/* Outer border accent */}
      <div
        className="absolute inset-0 rounded-[15px] pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 2px #FFA500" }}
      />

      {/* Bottom name/role badge */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-2 flex flex-col items-center gap-0.5">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono font-bold" style={{ color: "#ff4d9d", fontSize: 13 }}>
            &gt;
          </span>
          <span
            className="font-mono font-bold tracking-widest uppercase"
            style={{ color: "#f8fafc", fontSize: 17 }}
          >
            {PROFILE.fullName}
          </span>
        </div>

        <div className="font-mono uppercase tracking-wide" style={{ color: "#cbd5e1", fontSize: 10 }}>
          {PROFILE.role}
        </div>

        <div className="w-24 mt-1" style={{ height: 1, background: "#ff4d9d66" }} />

        <div className="flex items-center justify-between w-full mt-1 px-1">
          <span className="font-mono text-[9px]" style={{ color: "#6272a4" }}>
            {PROFILE.institute}
          </span>
          <span className="font-mono text-[9px] font-bold" style={{ color: "#FFA500" }}>
            [ FLIP FOR INFO ]
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Back face ────────────────────────────────────────────────────────────────
function CardBack() {
  const infoRows = [
    { label: "email", val: PROFILE.email },
    { label: "github", val: PROFILE.github },
    { label: "linkedin", val: PROFILE.linkedin },
    { label: "website", val: PROFILE.website },
  ];

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden rounded-[15px] select-none"
      style={{ background: "#0c0e12" }}
    >
      {/* Border accent */}
      <div
        className="absolute inset-0 rounded-[15px] pointer-events-none z-10"
        style={{ boxShadow: "inset 0 0 0 2px #FFA500" }}
      />

      {/* Clip hole */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10"
        style={{
          width: 56,
          height: 22,
          borderRadius: 8,
          background: "#181b20",
          border: "2px solid #FFA500",
        }}
      />

      {/* Header monogram bar */}
      <div
        className="flex items-center justify-between px-4 pt-6 pb-3"
        style={{ borderBottom: "1px solid #6272a433" }}
      >
        <div
          className="flex items-center justify-center rounded-lg font-mono font-bold"
          style={{
            width: 38,
            height: 38,
            background: "#181b20",
            border: "1.5px solid #FFF2A7",
            color: "#FFF2A7",
            fontSize: 18,
          }}
        >
          &gt;
        </div>
        <span className="font-mono text-[11px]" style={{ color: "#BEDEFF" }}>
          ~/{PROFILE.handle}
        </span>
      </div>

      {/* Name */}
      <div className="px-4 pt-3 pb-1 flex flex-col items-center text-center gap-0.5">
        <div className="flex items-baseline gap-1">
          <span className="font-mono font-bold" style={{ color: "#ff4d9d", fontSize: 12 }}>
            &gt;
          </span>
          <span
            className="font-mono font-bold tracking-widest uppercase"
            style={{ color: "#f8fafc", fontSize: 14 }}
          >
            {PROFILE.fullName}
          </span>
        </div>
        <div className="font-mono uppercase text-[9px]" style={{ color: "#cbd5e1" }}>
          {PROFILE.role}
        </div>
        <div className="w-20 mt-1" style={{ height: 1, background: "#ff4d9d55" }} />
        <div className="font-mono text-[9px]" style={{ color: "#64748b" }}>
          [ SYSTEM // ONLINE ]
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 my-2" style={{ height: 1, background: "#6272a444" }} />

      {/* Meta: join date + status */}
      <div className="flex items-start justify-between px-4 pb-2">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] font-bold" style={{ color: "#6272a4" }}>
            // JOIN_DATE
          </span>
          <span className="font-mono font-bold text-[12px]" style={{ color: "#f8fafc" }}>
            {PROFILE.joinDate}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-[9px] font-bold" style={{ color: "#6272a4" }}>
            // status
          </span>
          <span className="font-mono font-bold text-[12px]" style={{ color: "yellow" }}>
            {PROFILE.status}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-2" style={{ height: 1, background: "#6272a444" }} />

      {/* Info section */}
      <div className="px-4 flex-1 overflow-hidden">
        <div className="font-mono font-bold text-[11px] mb-2" style={{ color: "#FFA500" }}>
          my info
        </div>
        <div className="flex flex-col gap-2">
          {infoRows.map((item) => (
            <div key={item.label} className="flex flex-col gap-0">
              <span className="font-mono font-bold text-[9px]" style={{ color: "#BEDEFF" }}>
                [{item.label}]
              </span>
              <span className="font-mono text-[9px] truncate" style={{ color: "#f8fafc" }}>
                {item.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ID number */}
      <div
        className="mx-4 mt-2 mb-4 rounded-lg flex items-center justify-between px-3 py-1.5"
        style={{ background: "#181b20", border: "1px solid #6272a444" }}
      >
        <span className="font-mono text-[9px]" style={{ color: "#6272a4" }}>ID#</span>
        <span className="font-mono font-bold text-[10px]" style={{ color: "#FFF2A7" }}>
          {PROFILE.idNumber}
        </span>
      </div>
    </div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export function IdCard() {
  return (
    <div className="w-full h-screen flex flex-col bg-[#050a08] relative overflow-hidden">


      {/* ── TOP: TiltedCard pinned ───────────────────────────────────────── */}
      <div className="flex items-center justify-center pt-6 pb-2 shrink-0" style={{ zIndex: 5 }}>
        <TiltedCard
          containerWidth="220px"
          containerHeight="330px"
          imageWidth="220px"
          imageHeight="330px"
          rotateAmplitude={14}
          scaleOnHover={1.04}
          glare={0.45}
          glareColor="#FFA500"
          shadow={0.6}
          floating={true}
          radius={15}
          perspective={900}
          smoothness={0.55}
          flipOnClick={true}
          captionText="Click to flip"
          showTooltip={true}
          backContent={<CardBack />}
        >
          <CardFront />
        </TiltedCard>
      </div>

      {/* ── MIDDLE: space reserved for future component ───────────────────── */}
      <div className="flex-1 min-h-0" />

      {/* ── BOTTOM: merged single nav bar ────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-center pb-4 px-4 relative z-10">
        <div className="border border-[#FFA500]/20 bg-slate-900/60 backdrop-blur-md rounded-xl flex flex-wrap items-center justify-center gap-0 p-1">
          {/* Social links */}
          <Link
            href="https://linkedin.com/in/manas-kumar-512523326"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="LinkedIn"
          >
            <FaLinkedin size={20} color="#ffffff" />
          </Link>
          <Link
            href="https://github.com/Manas572"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="GitHub"
          >
            <SiGithub size={20} color="#ffffff" />
          </Link>
          <Link
            href="https://leetcode.com/u/manaskumar24"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="LeetCode"
          >
            <SiLeetcode size={20} color="#ffffff" />
          </Link>
          <Link
            href="https://codechef.com/users/joyoy_20"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="CodeChef"
          >
            <SiCodechef size={20} color="#ffffff" />
          </Link>
          <Link
            href="https://codeforces.com/profile/manaskumar10"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="Codeforces"
          >
            <SiCodeforces size={20} color="#ffffff" />
          </Link>
          <a
            href="https://codolio.com/profile/manas2007"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-white/10 rounded-lg transition"
            title="Codolio"
          >
            <img
              src="https://codolio.com/codolio_assets/codolio.svg"
              alt="Codolio"
              width={20}
              height={20}
            />
          </a>

          {/* Divider */}
          <div className="w-px h-5 mx-1" style={{ background: "#FFA500", opacity: 0.25 }} />

          {/* Project shortcuts */}
          <a
            href="https://github.com/Manas572/VartaRaksha"
            className="p-2 hover:bg-white/10 rounded-lg transition text-white/70 hover:text-[#FFA500]"
            title="VartaRaksha : AI Voice Deepfake Detection"
            target="_blank"
          >
            <Infinity size={18} />
          </a>
          <a
            href="https://github.com/Manas572"
            className="p-2 hover:bg-white/10 rounded-lg transition text-white/70 hover:text-[#FFA500]"
            title="Next Hire : Resume Analyzer & AI Interview"
            target="_blank"
          >
            <Sparkles size={18} />
          </a>
          <a
            href="https://github.com/Manas572"
            className="p-2 hover:bg-white/10 rounded-lg transition text-white/70 hover:text-[#FFA500]"
            title="CodeLens : RAG Code Assistant"
            target="_blank"
          >
            <FileText size={18} />
          </a>
          <a
            href="https://github.com/Manas572"
            className="p-2 hover:bg-white/10 rounded-lg transition text-white/70 hover:text-[#FFA500]"
            title="Download Resume"
            target="_blank"
          >
            <Download size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
