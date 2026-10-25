import React from "react";
import THEMES from "@/app/components/theme.json";
import { RAINBOW } from "../functions/rainbow";
import ANSI from "@/app/components/ANSI.json";

export function NEOFETCH({ themeName = "matrix" }) {
  const theme = THEMES[themeName];

  return (
    <div
      className="w-full font-mono text-sm sm:text-md leading-relaxed rounded-lg px-4 py-3"
      style={{
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
      }}
    >
        {/* Username */}
        <div
          className="font-bold text-sm sm:text-base mb-1"
          style={{ color: ANSI.orange }}
        >
          manas@portfolio
        </div>

        <div className="mb-3" style={{ color: ANSI.orange }}>
          ────────────────
        </div>

        {/* Info */}
        <div className="space-y-1">
          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              Name:
            </span>{" "}
            <span style={{ color: ANSI.white }}>Manas Kumar</span>
          </p>

          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              Role:
            </span>{" "}
            <span style={{ color: ANSI.white }}>
              Full Stack Web Developer
            </span>
          </p>

          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              Institution:
            </span>{" "}
            <span style={{ color: ANSI.white }}>IIIT Bhopal (B.Tech CSE, 2028)</span>
          </p>

          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              Experience:
            </span>{" "}
            <span style={{ color: ANSI.white }}>Web Dev Lead @ Spark (2026 – Present)</span>
          </p>

          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              Skills:
            </span>{" "}
            <span style={{ color: ANSI.white }}>
              C++, Python, JavaScript, React.js, Django, FastAPI, PostgreSQL, Qdrant, LangChain, PyTorch
            </span>
          </p>

          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              Projects:
            </span>{" "}
            <span style={{ color: ANSI.white }}>
              Next Hire, CodeLens, VartaRaksha
            </span>
          </p>

          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              OS [system]:
            </span>{" "}
            <span style={{ color: ANSI.white }}>{navigator.platform}</span>
          </p>

          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              Resolution [system] :
            </span>{" "}
            <span style={{ color: ANSI.white }}>
              {screen.width}x{screen.height}
            </span>
          </p>

          <p>
            <span className="font-bold" style={{ color: ANSI.orange }}>
              Theme:
            </span>{" "}
            <span style={{ color: ANSI.green }}>{themeName}</span>
          </p>
        </div>

        {/* Color palette */}
        <div className="flex gap-1 mt-3">
          {["#000000", ...RAINBOW].map((c, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
  );
}
