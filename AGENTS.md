# AGENTS.md

## Project type

Static HTML/CSS course exercises for "高级网页设计" (Advanced Web Design). No build step, no framework, no package manager, no tests. Open any `.html` file directly in a browser.

## Key files

- `index.html` — hub/landing page linking to every exercise page. When adding a new exercise, add a card here.
- `css.css` — the only external stylesheet; referenced by `5-1-cascade.html` to demonstrate cascade/specificity.
- `img/` — image assets used across pages (jpg/png). Reference with relative paths.

## Conventions

- Each exercise is a standalone `.html` file with inline `<style>` in `<head>` (except the one that uses the external `css.css`).
- File naming: `{chapter}-{variant}.html` (e.g., `5-1-cascade.html`). Some filenames contain spaces and Chinese characters — quote them in commands.
- All pages are `lang="zh-CN"`, UTF-8, and must not use CDN resources (course requirement).
- CSS custom properties (`:root` variables) define the shared color palette; reuse them instead of hardcoding new colors.

## Naming rules

- All CSS class names, id names, and JS variables must start with `xie_` (e.g., `.xie-card`, `#xie-grid`, `let xieCount`).

## Prompt logging

- Before executing any task, append the prompt to `xie_prompt.md` (create if missing). Do not overwrite existing content.
- Each entry must include: timestamp (`yyyy-mm-dd-hh-mm`), model used, and the full prompt text.
