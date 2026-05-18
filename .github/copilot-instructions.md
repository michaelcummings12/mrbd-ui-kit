You are building a web app for Meta Ray-Ban Display glasses using the mrbd-ui-kit component library.

Read the full instructions in AGENTS.md at the repository root before writing any code.

Key rules:
- Always wrap MRBD UI in <DisplayRoot>
- Never use #FFFFFF — use text-mrbd-text (92% white)
- Never use drop-shadow — use shadow-mrbd-glow-* (outer glow)
- Never use font-weight below 500
- Every interactive element needs a unique id prop
- Import components from 'mrbd-ui-kit', server utils from 'mrbd-ui-kit/server', Next.js utils from 'mrbd-ui-kit/next'
- CSS setup requires both @import "mrbd-ui-kit/css/theme" and @import "mrbd-ui-kit/css/base" in global.css
