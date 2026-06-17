import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const files = [
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/orbit/src/Options/Classes/OrbitRotation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/LifeDelay.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/LifeDuration.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/rotate/src/Options/Classes/Rotate.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/tilt/src/Options/Classes/Tilt.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/SplitFactor.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/SplitRate.ts",
];

for (const f of files) {
  let content = readFileSync(f, 'utf-8');
  const orig = content;
  const name = path.basename(f);

  // Remove orphaned /** Xxx constructor */ comments (non-greedy, only consume whitespace before \n)
  content = content.replace(/\n[ \t]*\/\*\*.*?constructor\s*\*\/[ \t]*\n/g, '\n');

  // Clean up remaining empty lines inside class body + trailing blank lines
  content = content.replace(/\n{3,}/g, '\n\n').replace(/^\s*\n/g, '').replace(/\n{2,}$/, '\n');

  // Fix double readonly
  content = content.replace(/override readonly readonly /g, 'override readonly ');

  if (orig !== content) {
    writeFileSync(f, content, 'utf-8');
    console.log(`✅ ${name}`);
  } else {
    console.log(`⏭️ ${name} (no change)`);
  }
}
