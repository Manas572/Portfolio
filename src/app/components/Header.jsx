import React from "react";
import { RAINBOW } from "../functions/rainbow";
import NAVBAR_COMMANDS from '@/app/components/navbar_command.json'
import ANSI from '@/app/components/ANSI.json'
import { RefreshCw, Download } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import THEME from '@/app/components/theme.json'

export function Header({executeCommand, themename}) {
    const theme = THEME[themename]

    const handleResume = () => {
        const resumeUrl = '/resume%20(3).pdf';
        const newTab = window.open(resumeUrl, '_blank', 'noopener,noreferrer');
        if (newTab) {
            const link = document.createElement('a');
            link.href = resumeUrl;
            link.download = 'Manas_Kumar_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (<>
        <div className="w-full max-w-5xl mx-auto mb-4">
            <div className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b ${theme.border} rounded-md px-3 py-1.5`} style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}>
                <button className="p-1.5 hover:bg-white/10 rounded shrink-0" style={{ color: ANSI.gray }}>
                    <ChevronLeft size={16} />
                </button>

                {NAVBAR_COMMANDS.map((cmd, i) => {
                    const c = ANSI.gray;
                    return (
                        <button
                            key={cmd}
                            onClick={() => executeCommand(cmd)}
                            className="px-3 py-1 text-sm flex items-center gap-1 shrink-0 hover:cursor-pointer font-mono border"
                            style={{ borderColor: `${c}55`, color: ANSI.gray, background: `${c}0f` }}
                        >
                            {cmd}
                        </button>
                    );
                })}

                <button
                    onClick={handleResume}
                    className="px-3 py-1 text-sm flex items-center gap-1 shrink-0 hover:cursor-pointer font-mono border"
                    style={{ borderColor: `${ANSI.green}55`, color: ANSI.green, background: `${ANSI.green}0f` }}
                    title="Open & Download Resume"
                >
                    <Download size={12} />
                    resume
                </button>

                <button className="p-1.5 hover:bg-white/10 rounded shrink-0" style={{ color: ANSI.gray }}>
                    <ChevronRight size={16} />
                </button>

                <div className="ml-auto flex items-center gap-2 pl-2">
                    <button onClick={() => executeCommand('reboot')} className="p-1.5 hover:bg-white/10 rounded" title="Reboot" style={{ color: ANSI.orange }}>
                        <RefreshCw size={14} />
                    </button>
                </div>
            </div>
        </div>
    </>)
}