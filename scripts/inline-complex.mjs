import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const files = [
  // These work fine (no params referenced in simple values)
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/canvasMask/src/Options/Classes/CanvasMask.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMaskLocalSvg.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/infection/src/Options/Classes/InfectionStage.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/attract/src/Options/Classes/Attract.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/repulse/src/Options/Classes/RepulseBase.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/light/src/Options/Classes/LightGradient.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/light/src/Options/Classes/LightShadow.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/attract/src/Options/Classes/Attract.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/links/src/Options/Classes/Links.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/links/src/Options/Classes/LinksShadow.ts",
  // Params present - need careful handling
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMask.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMaskDraw.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMaskDrawStroke.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/interactivity/src/Options/Classes/Interactivity.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/interactivity/src/Options/Classes/Modes/Modes.ts",
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isSimpleValue(val) {
  return !val.includes('\n') && !val.includes('{') && !val.trim().startsWith('(');
}

let totalBytes = 0;
let totalFiles = 0;

for (const f of [...new Set(files)]) {
  let content = readFileSync(f, 'utf-8');
  const orig = content;

  // Step 1: Find constructor
  const ctorRe = /constructor\s*\(/;
  const ctorMatch = content.match(ctorRe);
  if (!ctorMatch) { console.log(`SKIP (no ctor): ${path.basename(f)}`); continue; }

  // Step 2: Extract constructor params
  const paramsStart = ctorMatch.index + ctorMatch[0].length; // char after '('
  let paramsEnd = paramsStart;
  let depth = 0;
  while (paramsEnd < content.length) {
    if (content[paramsEnd] === '(') depth++;
    else if (content[paramsEnd] === ')') { depth--; if (depth < 0) break; }
    paramsEnd++;
  }
  const paramsStr = content.substring(paramsStart, paramsEnd).trim();
  // Extract param names (simple identifiers or destructured)
  const paramNames = [...paramsStr.matchAll(/(\w+)(?:\s*[?:]\s*\w+(?:\.\w+)*)*/g)].map(m => m[1]);
  // Also check for destructured params
  const destructuredParams = paramsStr.match(/\{([^}]+)\}/g) || [];
  for (const dp of destructuredParams) {
    const names = [...dp.matchAll(/(\w+)/g)].map(m => m[1]);
    paramNames.push(...names);
  }

  // Step 3: Find constructor body bounds
  let bracePos = paramsEnd;
  while (bracePos < content.length && content[bracePos] !== '{') bracePos++;
  if (bracePos >= content.length) { console.log(`SKIP (no brace): ${path.basename(f)}`); continue; }

  const bodyStart = bracePos;
  let d = 1, i = bracePos + 1;
  while (d > 0 && i < content.length) {
    if (content[i] === '{') d++;
    else if (content[i] === '}') d--;
    i++;
  }
  const bodyEnd = i - 1;
  const body = content.substring(bodyStart + 1, bodyEnd);

  // Step 4: Extract simple assignments
  const bodyLines = body.split('\n');
  const simpleAssigns = [];

  for (let li = 0; li < bodyLines.length; li++) {
    const trimmed = bodyLines[li].trim();
    const m = trimmed.match(/^this\.(\w+)\s*=\s*(.+?);$/);
    if (!m || !isSimpleValue(m[2])) continue;

    const val = m[2];

    // Check if value references any constructor param
    const usesParam = paramNames.some(pn => {
      const re = new RegExp(`\\b${escapeRegex(pn)}\\b`);
      return re.test(val);
    });
    if (usesParam) {
      console.log(`  ⚠️  ${path.basename(f)}: skipping '${m[1]}' (uses param in value '${val}')`);
      continue;
    }

    // Find declaration in class head
    const declRegex = new RegExp(`^( *)(override\\s+)?(readonly\\s+)?(?:readonly\\s+)?${escapeRegex(m[1])}(\\??)\\s*(:\\s*[^;\\n]+?)?\\s*;(?=[ \\t]*\\n|$)`, 'm');
    const beforeCtor = content.substring(0, ctorMatch.index);
    const declMatch = beforeCtor.match(declRegex);
    if (!declMatch) {
      console.log(`  ⚠️  ${path.basename(f)}: no declaration found for '${m[1]}'`);
      continue;
    }

    simpleAssigns.push({
      name: m[1],
      val: m[2],
      declStart: declMatch.index,
      declEnd: declMatch.index + declMatch[0].length - 1,
      assignLineIndex: li,
    });
  }

  if (simpleAssigns.length === 0) {
    console.log(`SKIP (no simple inlines): ${path.basename(f)}`);
    continue;
  }

  // Step 5: Build changes bottom-to-top
  const changes = [];

  for (const sa of simpleAssigns) {
    // Replace declaration with value
    const oldDecl = content.substring(sa.declStart, sa.declEnd + 1);
    const newDecl = oldDecl.replace(/;\s*$/, ` = ${sa.val};`);
    changes.push({ pos: sa.declStart, end: sa.declEnd, text: newDecl });

    // Remove the ENTIRE line from constructor body (including indentation, including \n)
    // Find line boundaries
    const bodyLine = bodyLines[sa.assignLineIndex];
    const bodyLinePos = bodyLines.slice(0, sa.assignLineIndex).join('\n').length + (sa.assignLineIndex > 0 ? 1 : 0);
    const absLineStart = bodyStart + 1 + bodyLinePos;

    // Find the full line start (go back to \n before this line)
    let lineStart = absLineStart;
    while (lineStart > bodyStart + 1 && content[lineStart - 1] !== '\n') lineStart--;

    // Find the full line end (go to \n after this line)
    let lineEnd = absLineStart + bodyLine.length - 1;
    if (lineEnd + 1 < content.length && content[lineEnd + 1] === '\n') lineEnd++;

    // Replace the line (including its leading indentation and trailing \n) with just \n
    changes.push({ pos: lineStart, end: lineEnd, text: '\n' });
  }

  // Sort bottom-to-top
  changes.sort((a, b) => b.pos - a.pos);

  for (const c of changes) {
    content = content.substring(0, c.pos) + c.text + content.substring(c.end + 1);
  }

  // Step 6: Clean up blank lines
  content = content.replace(/\n{3,}/g, '\n\n').replace(/ +$/gm, '').replace(/\n{2,}(\s*\})/g, '\n$1').replace(/\{\n{2,}/g, '{\n');

  // Step 7: If constructor body is now empty, remove the constructor
  // Find constructor again (positions shifted)
  const ctorRe2 = /constructor\s*\(([^)]*)\)\s*\{/;
  const ctorMatch2 = content.match(ctorRe2);
  if (ctorMatch2) {
    const bracePos2 = content.indexOf('{', ctorMatch2.index);
    let d2 = 1, j = bracePos2 + 1;
    while (d2 > 0 && j < content.length) {
      if (content[j] === '{') d2++;
      else if (content[j] === '}') d2--;
      j++;
    }
    const bodyEnd2 = j - 1;
    const remainingBody = content.substring(bracePos2 + 1, bodyEnd2).trim();

    if (!remainingBody && !ctorMatch2[1].trim()) {
      // No params and empty body: remove constructor entirely
      const ctorLineStart = content.lastIndexOf('\n', ctorMatch2.index);
      const from = ctorLineStart >= 0 ? ctorLineStart : 0;
      content = content.substring(0, from) + '\n' + content.substring(bodyEnd2 + 1);
    } else if (!remainingBody && ctorMatch2[1].trim()) {
      // Has params but empty body: keep constructor with just the param signature
      // Content is already correct: constructor(params) { }\n
    }
  }

  content = content.replace(/\n{3,}/g, '\n\n').replace(/ +$/gm, '').replace(/^\s*\n/g, '').replace(/\n{2,}$/, '\n');

  if (orig !== content) {
    writeFileSync(f, content, 'utf-8');
    const saved = orig.length - content.length;
    totalBytes += saved;
    totalFiles++;
    const names = simpleAssigns.map(sa => sa.name).join(', ');
    console.log(`✅ ${path.basename(f)} (-${saved}B) [${names}]`);
  } else {
    console.log(`❌ NO CHANGE: ${path.basename(f)}`);
  }
}

console.log(`\nTotal: ${totalFiles} files, ${totalBytes} bytes saved`);
