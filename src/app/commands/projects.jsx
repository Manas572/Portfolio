import React from "react";
import ANSI from "@/app/components/ANSI.json";

const projects = [
  {
    name: "Next Hire",
    tag: "Resume Analyzer & AI Interview",
    desc: "Recruitment platform that analyzes resumes, matches them to jobs, generates interview questions and creates resume PDFs. Built REST APIs in DRF with JWT login and separate recruiter access; compared resume and job description embeddings to tailor interview questions; used LangChain with Gemini API for resume analysis; stored questions in PostgreSQL.",
    stack: ["Django", "DRF", "React", "PostgreSQL", "LangChain", "Gemini API", "JWT"],
    href: "https://github.com/Manas572",
  },

  {
    name: "CodeLens",
    tag: "RAG Code Assistant",
    desc: "RAG code assistant that answers questions about a GitHub repo and cites each answer as file and line range; four pinned demo repos plus guarded indexing of public repos. Features hybrid retrieval in Qdrant (Gemini dense embeddings + BM25 sparse vectors) over line-mapped chunks, prompt chain verification, and guarded ingestion with LRU pruning.",
    stack: ["FastAPI", "React", "Qdrant", "PostgreSQL", "LangChain", "Gemini API", "Vercel", "Render"],
    href: "https://github.com/Manas572",
  },

  {
    name: "VartaRaksha",
    tag: "AI Voice Deepfake Detection SDK",
    desc: "A Python SDK for real-time AI voice detection, speech context analysis, speaker recognition, and risk pattern detection. Identifies synthetic voices, analyzes speech for suspicious scam indicators like OTP requests or urgency, and performs speaker recognition via voice similarity matching.",
    stack: ["Python", "Machine Learning", "PyPI", "FastAPI", "React"],
    href: "https://github.com/Manas572/VartaRaksha",
  },
];

export function Projects() {
  return (
    <div className="my-3 font-mono">
      {/* Terminal prompt */}
      <div className="text-sm sm:text-base" style={{ color: ANSI.gray }}>
        <span style={{ color: ANSI.gray }}>~/projects</span>
      </div>

      {/* Projects */}
      <div className="mt-6 space-y-8">
        {projects.map((project) => (
          <div
            key={project.name}
            className="group border-0 pl-5 sm:pl-6 transition-all duration-200 hover:border-[#FFA500]"
            style={{ borderColor: ANSI.gray }}
          >
            {/* Title + tag + button */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-lg sm:text-xl font-bold tracking-wide transition-colors duration-200"
                style={{ color: ANSI.yellow }}
              >
                {project.name}
              </span>

              <span
                className="text-xs sm:text-sm"
                style={{ color: ANSI.magenta }}
              >
                [ {project.tag} ]
              </span>

              {/* Project button */}
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    ml-auto
                    text-xs
                    px-2.5
                    py-1
                    border
                    rounded
                    transition-all
                    duration-200
                    hover:bg-green-400/10
                    hover:translate-x-0.5
                  "
                  style={{
                    color: ANSI.cyan,
                    borderColor: ANSI.gray,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ANSI.green;
                    e.currentTarget.style.color = ANSI.green;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = ANSI.gray;
                    e.currentTarget.style.color = ANSI.cyan;
                  }}
                >
                  View github
                </a>
              )}
            </div>

            {/* Description */}
            <p
              className="
                mt-2
                text-sm
                sm:text-base
                leading-7
                tracking-wide
                max-w-5xl 
              "
              style={{ color: ANSI.gray }}
            >
              {project.desc}
            </p>

            {/* Stack */}
            <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs sm:text-sm"
                  style={{ color: ANSI.orange }}
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
