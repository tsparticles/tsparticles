import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const files = [
  // Files with missing value default (extends ValueWithRandom parent)
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/SplitFactor.ts", add: "value = 3;" },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/SplitRate.ts", add: "value = { min: 4, max: 9 };" },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/opacity/src/Options/Classes/Opacity.ts", add: "value = 1;" },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/orbit/src/Options/Classes/OrbitRotation.ts", add: "value = 45;" },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/size/src/Options/Classes/Size.ts", add: "value = 3;" },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/absorbers/src/Options/Classes/AbsorberSize.ts", add: "value = 50;" },
  // Cleanup only (no missing value)
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/LifeDelay.ts", add: null },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/LifeDuration.ts", add: null },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/opacity/src/Options/Classes/OpacityAnimation.ts", add: null },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/rotate/src/Options/Classes/Rotate.ts", add: null },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/size/src/Options/Classes/SizeAnimation.ts", add: null },
  { f: "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/tilt/src/Options/Classes/Tilt.ts", add: null },
];

for (const { f, add } of files) {
  let content = readFileSync(f, 'utf-8');
  const orig = content;
  const name = path.basename(f);

  // 1. Clean up orphaned /** ... constructor */ comments and blank lines
  content = content
    .replace(/\n\s*\/\*\*.*?constructor\s*\*\/\s*/g, '\n')  // Remove /** Xxx constructor */ lines  
    .replace(/\n{3,}/g, '\n\n')                              // Collapse triple+ blank lines
    .replace(/^\s*\n{2,}/gm, '\n')                           // Remove leading blank lines
    .replace(/\n{2,}$/g, '\n');                              // Remove trailing blank lines

  // 2. Fix double readonly
  content = content.replace(/override readonly readonly /g, 'override readonly ');

  // 3. Add missing value default - insert after class opening brace
  if (add) {
    // Find the opening brace of the class
    const classMatch = content.match(/export class \w+ extends[\s\S]*?\{/);
    if (classMatch) {
      const insertPos = classMatch.index + classMatch[0].length;
      // Don't insert if value already has initializer
      const afterClassHead = content.substring(insertPos);
      const valueInitRegex = /^\s*value\s*=\s*/m;
      if (!valueInitRegex.test(afterClassHead)) {
        content = content.substring(0, insertPos) + `\n  ${add}\n` + content.substring(insertPos);
      }
    }
  }

  if (orig !== content) {
    writeFileSync(f, content, 'utf-8');
    const bytes = orig.length - content.length;
    console.log(`✅ ${name} (-${bytes}B)`);
  } else {
    console.log(`⏭️ ${name} (no change)`);
  }
}
