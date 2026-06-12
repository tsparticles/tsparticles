import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const files = [
  // === UPDATERS ===
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/Destroy.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/Explode.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/Split.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/SplitFactor.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/destroy/src/Options/Classes/SplitRate.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/gradient/src/Options/Classes/AnimatableGradient.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/gradient/src/Options/Classes/AnimatableGradientColor.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/gradient/src/Options/Classes/GradientAngle.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/gradient/src/Options/Classes/GradientAngleAnimation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/gradient/src/Options/Classes/GradientColorOpacity.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/gradient/src/Options/Classes/GradientColorOpacityAnimation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/Life.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/LifeDelay.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/life/src/Options/Classes/LifeDuration.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/opacity/src/Options/Classes/Opacity.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/opacity/src/Options/Classes/OpacityAnimation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/orbit/src/Options/Classes/Orbit.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/orbit/src/Options/Classes/OrbitRotation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/roll/src/Options/Classes/Roll.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/roll/src/Options/Classes/RollLight.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/rotate/src/Options/Classes/Rotate.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/rotate/src/Options/Classes/RotateAnimation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/size/src/Options/Classes/Size.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/size/src/Options/Classes/SizeAnimation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/tilt/src/Options/Classes/Tilt.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/tilt/src/Options/Classes/TiltAnimation.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/twinkle/src/Options/Classes/Twinkle.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/twinkle/src/Options/Classes/TwinkleLinksValues.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/twinkle/src/Options/Classes/TwinkleParticlesValues.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/wobble/src/Options/Classes/Wobble.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/updaters/wobble/src/Options/Classes/WobbleSpeed.ts",
  // === PLUGINS ===
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/absorbers/src/Options/Classes/AbsorberLife.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/absorbers/src/Options/Classes/AbsorberSize.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/absorbers/src/Options/Classes/AbsorberSizeLimit.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/backgroundMask/src/Options/Classes/BackgroundMask.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/backgroundMask/src/Options/Classes/BackgroundMaskCover.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/blend/src/Options/Classes/Blend.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/canvasMask/src/Options/Classes/CanvasMask.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/canvasMask/src/Options/Classes/CanvasMaskOverride.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/canvasMask/src/Options/Classes/CanvasMaskPixels.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/canvasMask/src/Options/Classes/FontTextMask.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/canvasMask/src/Options/Classes/ImageMask.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/canvasMask/src/Options/Classes/TextMask.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/canvasMask/src/Options/Classes/TextMaskLine.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emitters/src/Options/Classes/Emitter.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emitters/src/Options/Classes/EmitterLife.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emitters/src/Options/Classes/EmitterRate.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emitters/src/Options/Classes/EmitterShape.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emitters/src/Options/Classes/EmitterShapeReplace.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emitters/src/Options/Classes/EmitterSize.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emittersShapes/canvas/src/Options/Classes/EmittersCanvasShapeOptions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emittersShapes/canvas/src/Options/Classes/PixelsOptions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emittersShapes/canvas/src/Options/Classes/TextFontOptions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emittersShapes/canvas/src/Options/Classes/TextLinesOptions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emittersShapes/canvas/src/Options/Classes/TextOptions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emittersShapes/path/src/Options/Classes/EmittersPathShapeOptions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/emittersShapes/polygon/src/Options/Classes/EmittersPolygonShapeOptions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/infection/src/Options/Classes/Infection.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/infection/src/Options/Classes/InfectionStage.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/interactivity/src/Options/Classes/Interactivity.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/interactivity/src/Options/Classes/Events/ClickEvent.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/interactivity/src/Options/Classes/Events/DivEvent.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/interactivity/src/Options/Classes/Events/Events.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/interactivity/src/Options/Classes/Events/HoverEvent.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/interactivity/src/Options/Classes/Modes/Modes.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/motion/src/Options/Classes/Motion.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/motion/src/Options/Classes/MotionReduce.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/poisson/src/Options/Classes/Poisson.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMask.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMaskDraw.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMaskDrawStroke.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMaskInline.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMaskLocalSvg.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/polygonMask/src/Options/Classes/PolygonMaskMove.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/responsive/src/Options/Classes/Responsive.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/sounds/src/Options/Classes/Sounds.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/sounds/src/Options/Classes/SoundsAudio.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/sounds/src/Options/Classes/SoundsEvent.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/sounds/src/Options/Classes/SoundsIcon.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/sounds/src/Options/Classes/SoundsIcons.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/sounds/src/Options/Classes/SoundsMelody.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/sounds/src/Options/Classes/SoundsNote.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/sounds/src/Options/Classes/SoundsVolume.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/themes/src/Options/Classes/Theme.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/themes/src/Options/Classes/ThemeDefault.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/trail/src/Options/Classes/Trail.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/plugins/zoom/src/Options/Classes/Zoom.ts",
  // === INTERACTIONS ===
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/attract/src/Options/Classes/Attract.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/bounce/src/Options/Classes/Bounce.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/bubble/src/Options/Classes/BubbleBase.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/bubble/src/Options/Classes/BubbleDiv.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/cannon/src/Options/Classes/Cannon.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/connect/src/Options/Classes/Connect.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/connect/src/Options/Classes/ConnectLinks.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/destroy/src/Options/Classes/Destroy.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/drag/src/Options/Classes/Drag.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/grab/src/Options/Classes/Grab.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/grab/src/Options/Classes/GrabLinks.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/parallax/src/Options/Classes/Parallax.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/particle/src/Options/Classes/InteractivityParticleOptions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/push/src/Options/Classes/Push.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/remove/src/Options/Classes/Remove.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/repulse/src/Options/Classes/RepulseBase.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/repulse/src/Options/Classes/RepulseDiv.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/slow/src/Options/Classes/Slow.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/trail/src/Options/Classes/Trail.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/trail/src/Options/Classes/TrailColorComponent.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/trail/src/Options/Classes/TrailColorCoords.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/external/trail/src/Options/Classes/TrailColorWeight.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/light/src/Options/Classes/Light.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/light/src/Options/Classes/LightArea.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/light/src/Options/Classes/LightGradient.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/light/src/Options/Classes/LightShadow.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/attract/src/Options/Classes/Attract.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/collisions/src/Options/Classes/Collisions.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/collisions/src/Options/Classes/CollisionsAbsorb.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/collisions/src/Options/Classes/CollisionsOverlap.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/links/src/Options/Classes/Links.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/links/src/Options/Classes/LinksShadow.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/links/src/Options/Classes/LinksTriangle.ts",
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/interactions/particles/repulse/src/Options/Classes/ParticlesRepulse.ts",
  // === SHAPES ===
  "/Users/matteo/Projects/GitHub/tsparticles/tsparticles/shapes/image/src/Options/Classes/Preload.ts",
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Only process files where ALL constructor assignments are simple
 * single-line `this.x = y;` with NO extra code, NO params, NO multi-line.
 */
function isSimpleCase(content) {
  const re = /constructor\s*\(([^)]*)\)\s*\{/;
  const match = content.match(re);
  if (!match) return false;

  // Has params? Skip
  if (match[1].trim().length > 0) return false;

  // Find constructor body
  const bodyStart = match.index + match[0].length - 1;
  let depth = 1;
  let i = bodyStart + 1;
  while (depth > 0 && i < content.length) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') depth--;
    i++;
  }
  const bodyEnd = i - 1;
  const constructorBody = content.substring(bodyStart + 1, bodyEnd).trim();

  // Check: are ALL lines either empty, comment, or `this.x = simpleValue;`?
  // Also check that no value spans multiple lines
  const lines = constructorBody.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));
  if (lines.length === 0) return false;

  const assignRegex = /^this\.(\w+)\s*=\s*(.+?);$/;
  for (const line of lines) {
    if (!assignRegex.test(line)) return false;
  }

  return true;
}

function simpleTransform(content) {
  const re = /constructor\s*\(([^)]*)\)\s*\{/;
  const match = content.match(re);
  const bodyStart = match.index + match[0].length - 1;
  let depth = 1;
  let i = bodyStart + 1;
  while (depth > 0 && i < content.length) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') depth--;
    i++;
  }
  const bodyEnd = i - 1;
  const constructorBody = content.substring(bodyStart + 1, bodyEnd);

  // Extract assignments
  const assignRegex = /this\.(\w+)\s*=\s*(.*?);/g;
  const assignments = [];
  let m;
  while ((m = assignRegex.exec(constructorBody)) !== null) {
    assignments.push({ name: m[1], value: m[2].trim() });
  }

  // Build changes bottom-to-top
  const changes = [];

  // 1. Constructor removal (higher position, applied first)
  changes.push([match.index, bodyEnd, '']);

  // 2. Declaration changes (lower positions, applied second)
  for (const { name, value } of assignments) {
    const escName = escapeRegex(name);
    const isNewObject = /^new\s+\w+/.test(value);

    // Check if reassigned outside constructor
    const contentWithoutCtor = content.substring(0, match.index) + content.substring(bodyEnd + 1);
    const isReassigned = new RegExp(`this\\.${escName}\\s*=`).test(contentWithoutCtor);
    const readonly = isNewObject && !isReassigned ? 'readonly ' : '';

    // Find declaration line in content BEFORE constructor
    const beforeCtor = content.substring(0, match.index);
    const declPattern = new RegExp(
      `^([ \\t]*(?:override\\s+)?(?:readonly\\s+)?)${escName}((?:\\?\\s*)?(?:\\s*:\\s*[^;\\n]+)?)\\s*;\\s*$`,
      'm'
    );
    const declMatch = beforeCtor.match(declPattern);
    if (declMatch) {
      const origIdx = declMatch.index;
      const indent = declMatch[1];
      const typePart = declMatch[2] || '';
      const newDecl = `${indent}${readonly}${name}${typePart} = ${value};`;
      changes.push([origIdx, origIdx + declMatch[0].length - 1, newDecl]);
    }
  }

  // Apply bottom-to-top (sorted by position DESC)
  changes.sort((a, b) => b[0] - a[0]);
  for (const [start, end, replacement] of changes) {
    content = content.substring(0, start) + replacement + content.substring(end + 1);
  }

  return content.replace(/\n{3,}/g, '\n\n');
}

let processed = 0;
let removed = 0;
let skipped = 0;
let saved = 0;

for (const filePath of files) {
  if (!filePath.startsWith('/')) {
    console.log(`BAD PATH: ${filePath}`);
    skipped++;
    continue;
  }
  const content = readFileSync(filePath, 'utf-8');

  if (!isSimpleCase(content)) {
    console.log(`SKIP (complex): ${path.basename(filePath)}`);
    skipped++;
    continue;
  }

  const result = simpleTransform(content);
  if (content !== result) {
    writeFileSync(filePath, result, 'utf-8');
    const bytes = content.length - result.length;
    saved += bytes;
    removed++;
    console.log(`✅ ${path.basename(filePath)} (-${bytes}B)`);
  }
  processed++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Processed: ${processed}, Removed: ${removed}, Skipped: ${skipped}`);
console.log(`Total bytes saved: ${saved}`);
