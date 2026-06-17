import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Files with super() + simple assignments (can remove constructor entirely)
const files = [
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/SplitFactor.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/SplitRate.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/LifeDelay.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/LifeDuration.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/opacity/src/Options/Classes/Opacity.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/opacity/src/Options/Classes/OpacityAnimation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/orbit/src/Options/Classes/OrbitRotation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/rotate/src/Options/Classes/Rotate.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/size/src/Options/Classes/Size.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/size/src/Options/Classes/SizeAnimation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/tilt/src/Options/Classes/Tilt.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/absorbers/src/Options/Classes/AbsorberSize.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/bubble/src/Options/Classes/BubbleDiv.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/repulse/src/Options/Classes/RepulseDiv.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/repulse/src/Options/Classes/ParticlesRepulse.ts",
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let done = 0;
let saved = 0;

for (const f of files) {
  let content = readFileSync(f, 'utf-8');
  const orig = content;

  const re = /constructor\s*\(([^)]*)\)\s*\{/;
  const m = content.match(re);
  if (!m) { console.log(`SKIP (no ctor): ${path.basename(f)}`); continue; }

  // Find constructor body
  const bodyStart = m.index + m[0].length - 1;
  let d = 1, i = bodyStart + 1;
  while (d > 0 && i < content.length) {
    if (content[i] === '{') d++; else if (content[i] === '}') d--;
    i++;
  }
  const bodyEnd = i - 1;
  const body = content.substring(bodyStart + 1, bodyEnd);

  // Extract simple assignments
  const assigns = [...body.matchAll(/this\.(\w+)\s*=\s*(.*?);/g)];

  // Build changes bottom-to-top
  const changes = [];

  // 1. Remove constructor (higher position, applied first)
  changes.push([m.index, bodyEnd, '']);

  // 2. Declaration changes (lower positions)
  for (const [, name, val] of assigns) {
    const en = escapeRegex(name);
    const isNew = /^new\s+\w+/.test(val);
    const noReassign = !new RegExp(`this\\.${en}\\s*=`).test(content.substring(0, m.index) + content.substring(bodyEnd + 1));
    const readonly = isNew && noReassign ? 'readonly ' : '';

    const beforeCtor = content.substring(0, m.index);
    const dp = new RegExp(`^([ \\t]*(?:override\\s+)?(?:readonly\\s+)?)${en}((?:\\?\\s*)?(?:\\s*:\\s*[^;\\n]+)?)\\s*;\\s*$`, 'm');
    const dm = beforeCtor.match(dp);
    if (dm) {
      const hasReadonly = /\breadonly\s/.test(dm[1]);
      changes.push([dm.index, dm.index + dm[0].length - 1, `${dm[1]}${hasReadonly ? '' : readonly}${name}${dm[2] || ''} = ${val};`]);
    }
  }

  // Apply bottom-to-top
  changes.sort((a, b) => b[0] - a[0]);
  for (const [s, e, r] of changes) {
    content = content.substring(0, s) + r + content.substring(e + 1);
  }

  content = content.replace(/\n{3,}/g, '\n\n');

  if (orig !== content) {
    writeFileSync(f, content, 'utf-8');
    const b = orig.length - content.length;
    saved += b;
    done++;
    console.log(`✅ ${path.basename(f)} (-${b}B)`);
  } else {
    console.log(`❌ NO CHANGE: ${path.basename(f)}`);
  }
}

console.log(`\nGroup A: ${done} files, ${saved} bytes saved`);
