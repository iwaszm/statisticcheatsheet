# Repository Guidelines

## Project Structure & Module Organization
This is a static frontend project (no build pipeline). Main entry is `index.html`.

- `index.html`: page structure and some inline UI styles.
- `assets/css/styles.css`: shared styles, animations, and component visuals.
- `assets/js/app.js`: UI behavior, rendering, filtering, and clipboard interactions.
- `assets/js/data/statsData.js` and `assets/js/data/descriptiveData.js`: catalog data used by the UI.

Keep behavior in `assets/js/`, reusable styling in `assets/css/`, and data-only changes in `assets/js/data/`.

## Build, Test, and Development Commands
No package manager scripts are configured. Use a local static server from repo root:

```bash
cd /home/zm/workspace/statisticcheatsheet
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Quick checks:

```bash
git status
git diff
```

## Coding Style & Naming Conventions
- JavaScript: ES modules, `const`/`let`, semicolons, single quotes.
- Use camelCase for variables/functions (`generateCardHTML`, `renderResults`).
- Keep data object keys consistent with existing schema (`method`, `objective`, `code`, `level`).
- CSS classes use kebab-case (`aws-card`, `hero-title`); group related rules together.
- Preserve current indentation style (2 spaces in JS/CSS, 4 spaces commonly used in `index.html`).

## Testing Guidelines
There is currently no automated test framework. Validate changes manually in browser:

1. Start local server and load both main flows/views.
2. Verify filters, card rendering, and empty-state behavior.
3. Verify copy-to-clipboard buttons and responsive layout at mobile and desktop widths.
4. Check browser console for errors before submitting.

## Commit & Pull Request Guidelines
Recent history favors concise, imperative commit subjects, often Conventional Commit style:
- `feat: ...`
- `feat(ui): ...`
- `refactor: ...`

Use one logical change per commit. PRs should include:
- what changed and why,
- affected files/modules,
- manual test steps performed,
- screenshots/GIFs for UI changes.
