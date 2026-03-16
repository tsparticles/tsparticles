---
phase: 01-developer-experience
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/phases/01-developer-experience/02-PLAN.md
  - markdown/Getting-Started.md
  - demo/vanilla/index.html
autonomous: true
requirements: [DOC-01, DOC-02]
user_setup: []
must_haves:
  truths:
    - "API docs can be generated via `pnpm run build:docs` without errors"
    - "Demo examples reference the public engine API and include at least two usage examples"
  artifacts:
    - path: "markdown/Getting-Started.md"
      provides: "Higher-level quickstart guide linking to demo and API docs"
    - path: "demo/vanilla/index.html"
      provides: "Simple demo page showcasing engine + plugin usage"
  key_links:
    - from: "markdown/Getting-Started.md"
      to: "demo/vanilla/index.html"
      via: "Relative links"
---

<objective>
Improve documentation surface: add a concise Getting Started guide and at least one simple demo page that showcases the engine's public API and a plugin.

Purpose: give new users both a docs-first and demo-first path to try tsParticles.
Output: `markdown/Getting-Started.md`, `demo/vanilla/index.html` example, minor linking updates.
</objective>

<context>
Builds on roadmap DOC-01 / DOC-02. Assumes typedoc config works; if `pnpm run build:docs` fails, create a follow-up plan to fix typedoc config.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add Getting Started doc</name>
  <files>markdown/Getting-Started.md</files>
  <action>
    Create `markdown/Getting-Started.md` with a step-by-step guide: install, run demo, link to API docs, and examples showing how to initialize the engine and load a plugin. Keep examples copy-paste ready.
  </action>
  <verify>
    <automated>node -e "process.exit(require('fs').existsSync('markdown/Getting-Started.md')?0:1)"</automated>
  </verify>
  <done>Getting-Started.md exists and includes links to demo and API docs</done>
</task>

<task type="auto">
  <name>Task 2: Add a minimal demo page</name>
  <files>demo/vanilla/index.html</files>
  <action>
    Add `demo/vanilla/index.html` with a minimal HTML page that includes a bundle script reference (relative path) and demonstrates engine initialization and plugin registration. Keep it static HTML for quick preview.
  </action>
  <verify>
    <automated>node -e "process.exit(require('fs').existsSync('demo/vanilla/index.html')?0:1)"</automated>
  </verify>
  <done>index.html exists and contains 'tsParticles' or example init code snippet</done>
</task>

</tasks>

<verification>
Run `node -e` checks to confirm files exist. Optionally run `pnpm run build:docs` in separate plan if typedoc needs fixing.
</verification>

<success_criteria>

- Getting-Started doc exists and links to demo.
- Demo page exists and contains at least one code snippet showing engine usage.
  </success_criteria>

<output>
After completion, create `.planning/phases/01-developer-experience/02-PLAN-SUMMARY.md`
</output>
