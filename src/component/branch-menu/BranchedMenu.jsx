'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import FILE_SYSTEM from '@/app/components/filesystem.json';
import '../../../@components/BranchedMenu.css';

const rootContents = FILE_SYSTEM['~'].contents;
const projectContents = rootContents.projects.contents;
const items = [
  {
    label: '~/',
    children: Object.entries(rootContents)
      .filter(([, entry]) => entry.type === 'file')
      .map(([name]) => ({ value: `~/${name}`, label: name })),
  },
  {
    label: 'projects/',
    children: Object.entries(projectContents)
      .filter(([, entry]) => entry.type === 'file')
      .map(([name]) => ({ value: `~/projects/${name}`, label: name })),
  },
];

const PAD = 6;
const MARK = 16;
const toSet = (open) => new Set(Array.isArray(open) ? open : open >= 0 ? [open] : []);

export default function BranchedMenu() {
  const defaultOpen = 0;
  const [open, setOpen] = useState(() => toSet(defaultOpen));
  const [active, setActive] = useState('');
  const [terminalPath, setTerminalPath] = useState(['~']);
  const navRef = useRef(null);
  const heads = useRef([]);
  const markerRef = useRef(null);
  const activeSection = items.findIndex((item) => item.children.some((child) => child.value === active));
  const markerShown = activeSection >= 0 && open.has(activeSection);
  const rowHeight = 27;
  const indent = 30;
  const trunk = 10;
  const radius = 7;

  useEffect(() => {
    const syncFromTerminal = (event) => {
      const path = event.detail?.currentPath ?? ['~'];
      const selectedFile = event.detail?.selectedFile;
      const activeDirectory = path.includes('projects') ? 1 : 0;

      setTerminalPath(path);
      setOpen(new Set([activeDirectory]));
      setActive(items.some((item) => item.children.some((child) => child.value === selectedFile))
        ? selectedFile
        : '');
    };

    window.addEventListener('portfolio:terminal-navigation', syncFromTerminal);
    return () => window.removeEventListener('portfolio:terminal-navigation', syncFromTerminal);
  }, []);

  useLayoutEffect(() => {
    const place = () => {
      const marker = markerRef.current;
      const heading = heads.current[activeSection];
      if (!marker) return;
      const visible = markerShown && heading;
      if (visible) marker.style.top = `${heading.offsetTop + (heading.offsetHeight - MARK) / 2}px`;
      marker.toggleAttribute('data-on', Boolean(visible));
    };
    place();
    const observer = new ResizeObserver(place);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [activeSection, markerShown]);

  const select = (value) => {
    setActive(value);
    window.dispatchEvent(new CustomEvent('portfolio:open-file', { detail: { path: value } }));
  };

  const toggle = (index) => {
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const rowY = (index) => PAD + index * rowHeight + rowHeight / 2;
  const endX = indent - 8;
  const branch = (index) => `M ${trunk} ${rowY(index) - radius} A ${radius} ${radius} 0 0 0 ${trunk + radius} ${rowY(index)} H ${endX}`;
  const reach = (index) => `M ${trunk} 0 V ${rowY(index) - radius} A ${radius} ${radius} 0 0 0 ${trunk + radius} ${rowY(index)} H ${endX}`;
  const pathLength = (index) => rowY(index) - radius + (Math.PI * radius) / 2 + (endX - trunk - radius);

  return (
    <section className="portfolio-filesystem" aria-label="Portfolio file system">
      <div className="portfolio-filesystem__heading">
        <span className="portfolio-filesystem__prompt">$</span>
        <span>FILE SYSTEM</span>
        <span className="portfolio-filesystem__path">
          /home/manas{terminalPath.length > 1 ? `/${terminalPath.slice(1).join('/')}` : ''}
        </span>
      </div>
      <nav
        ref={navRef}
        className="branched-menu portfolio-filesystem__menu"
        aria-label="Portfolio files"
        style={{
          '--bm-w': '340px',
          '--bm-ink': '#BEDEFF',
          '--bm-accent': '#FFA500',
          '--bm-line': 'rgba(190, 222, 255, 0.22)',
          '--bm-font': '12px',
          '--bm-row': `${rowHeight}px`,
          '--bm-indent': `${indent}px`,
          '--bm-line-w': 1.25,
          '--bm-draw': '280ms',
          '--bm-fold': '240ms',
        }}
      >
        <span ref={markerRef} className="branched-menu__marker" aria-hidden="true" />
        {items.map((item, index) => {
          const isOpen = open.has(index);
          const bodyHeight = PAD * 2 + item.children.length * rowHeight;
          return (
            <div key={item.label} className="branched-menu__section" data-open={isOpen ? '' : undefined}>
              <button
                ref={(element) => { heads.current[index] = element; }}
                type="button"
                className="branched-menu__head"
                aria-expanded={isOpen}
                onClick={() => toggle(index)}
              >
                {item.label}
              </button>
              <div className="branched-menu__body">
                <div className="branched-menu__fold">
                  <div className="branched-menu__tree" style={{ height: bodyHeight }}>
                    <svg className="branched-menu__lines" width={indent} height={bodyHeight} aria-hidden="true">
                      <path className="branched-menu__base" d={`M ${trunk} 0 V ${rowY(item.children.length - 1) - radius}`} />
                      {item.children.map((child, childIndex) => (
                        <path key={`${child.value}-base`} className="branched-menu__base" d={branch(childIndex)} />
                      ))}
                      {item.children.map((child, childIndex) => (
                        <path
                          key={`${child.value}-reach`}
                          className="branched-menu__reach"
                          d={reach(childIndex)}
                          style={{
                            strokeDasharray: pathLength(childIndex),
                            strokeDashoffset: child.value === active ? 0 : pathLength(childIndex),
                          }}
                        />
                      ))}
                    </svg>
                    {item.children.map((child) => (
                      <button
                        key={child.value}
                        type="button"
                        className="branched-menu__item"
                        aria-current={child.value === active ? 'true' : undefined}
                        data-active={child.value === active ? '' : undefined}
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => select(child.value)}
                      >
                        <span className="branched-menu__label">{child.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>
      <p className="portfolio-filesystem__hint">select a file to open it in terminal</p>
      <style jsx>{`
        .portfolio-filesystem {
          width: min(100%, 340px);
          min-height: 0;
          padding: 0 8px;
          color: #bedeff;
          font-family: var(--font-geist-mono), monospace;
        }
        .portfolio-filesystem__heading {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 10px;
          border: 1px solid rgba(255, 165, 0, 0.2);
          border-bottom-color: rgba(255, 165, 0, 0.38);
          border-radius: 8px 8px 0 0;
          background: rgba(12, 14, 18, 0.72);
          color: #ffa500;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
        }
        .portfolio-filesystem__prompt { color: #fff2a7; font-size: 12px; }
        .portfolio-filesystem__path {
          margin-left: auto;
          color: rgba(190, 222, 255, 0.58);
          font-weight: 400;
          letter-spacing: 0;
        }
        .portfolio-filesystem__hint {
          margin: 4px 0 0;
          padding: 0 10px;
          color: rgba(190, 222, 255, 0.48);
          font-size: 9px;
        }
      `}</style>
    </section>
  );
}
