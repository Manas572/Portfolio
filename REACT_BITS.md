# React Bits Setup & Usage Guide

React Bits (`reactbits.dev`) has been configured for this project.

## How to Add Any React Bits Component

Run the following command in `TERMINAL_PORTFOLIO`:

```bash
# Using npm script:
npm run bit:add @react-bits/<ComponentName>-JS-TW

# Or directly with shadcn:
npx shadcn add @react-bits/<ComponentName>-JS-TW
```

> **Why `-JS-TW`?**
> This project uses **JavaScript** and **Tailwind CSS**, so `-JS-TW` downloads the `.jsx` component styled with Tailwind classes.

---

## What was Configured

1. **Registry & Aliases**: Configured in `components.json`:
   - Registry URL: `https://reactbits.dev/r/{name}.json`
   - Component target: `src/app/components/`
   - Class merger utility: `@/lib/utils` (`cn`)
2. **Core Dependencies Installed**:
   - `framer-motion` & `motion`
   - `clsx` & `tailwind-merge`
   - `shadcn` CLI (dev dependency)
3. **Helper Utility**:
   - `src/lib/utils.js` providing the standard `cn(...)` utility.

---

## Example: Adding & Using a Component

### 1. Add Decrypted Text
```bash
npm run bit:add @react-bits/DecryptedText-JS-TW
```
This downloads `DecryptedText.jsx` into `src/app/components/DecryptedText.jsx`.

### 2. Import and Use in any page/command:
```jsx
import DecryptedText from "@/app/components/DecryptedText";

export default function MyComponent() {
  return (
    <DecryptedText
      text="Welcome to my terminal portfolio!"
      animateOn="view"
      revealDirection="center"
    />
  );
}
```

---

## Popular React Bits Components for Terminal Portfolio

### Text Animations
- `DecryptedText-JS-TW` — Cyberpunk / matrix style character decryption (great for terminal boot sequence)
- `SplitText-JS-TW` — Character / word animation reveals
- `TrueFocus-JS-TW` — Focused text glow effect
- `BlurText-JS-TW` — Smooth blur-in animation
- `GlitchText-JS-TW` — Glitch effect for terminal errors or system alerts
- `ShinyText-JS-TW` — Shimmering text gradient

### Backgrounds
- `Particles-JS-TW` — Lightweight interactive particle background
- `Squares-JS-TW` — Grid square pattern with hover wave highlights
- `Hyperspeed-JS-TW` — Retro starfield / neon light speed streaks
- `Aurora-JS-TW` — Subtle aurora glow effect

### Interactive Elements & Cards
- `SpotlightCard-JS-TW` — Radial glow on mouse hover (great for project listings)
- `TiltedCard-JS-TW` — 3D tilt interaction for cards
- `ClickSpark-JS-TW` — Click sparks micro-animation
- `SplashCursor-JS-TW` — Fluid mouse trail
