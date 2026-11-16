// Run after `pnpm nx run @tsparticles/effect-trail:build` with `node effects/trail/benchmarks/trail-drawer.benchmark.mjs`.
import { performance } from "node:perf_hooks";

import {
  OutMode,
  OutModeDirection,
  defaultAlpha,
  defaultTransform,
  double,
  half,
  originPoint,
} from "@tsparticles/engine";
import { TrailDrawer } from "../dist/esm/TrailDrawer.js";

const particleCount = 500,
  trailLength = 50,
  warmupFrames = 100,
  measuredFrames = 500,
  repetitions = 5,
  canvasSize = { width: 800, height: 600 },
  drawRadius = 3,
  drawScale = 1,
  seed = 0x5eed1234,
  transformData = defaultTransform;

function createRandom(initialSeed) {
  let state = initialSeed >>> 0;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;

    return state / 0x100000000;
  };
}

function createContext() {
  return {
    beginPath() {},
    fillStyle: "#ffffff",
    globalAlpha: 1,
    lineCap: "butt",
    lineJoin: "round",
    lineWidth: 1,
    moveTo() {},
    quadraticCurveTo() {},
    restore() {},
    save() {},
    setTransform() {},
    stroke() {},
    strokeStyle: "#ffffff",
  };
}

function drawOriginal(data, pixelRatio) {
  const { context, drawPosition, particle, transformData } = data,
    trail = particle.trail;

  if (!trail || !particle.trailLength) {
    return;
  }

  const diameter = drawRadius * double,
    pathLength = particle.trailLength * drawScale + drawRadius;

  trail.push({
    break: particle.justWarped,
    color: context.fillStyle || context.strokeStyle,
    position: { x: drawPosition.x, y: drawPosition.y },
    transformData,
  });

  if (trail.length < 3) {
    return;
  }

  const pathLengthFloor = Math.floor(pathLength);

  if (trail.length > pathLengthFloor) {
    trail.splice(0, trail.length - pathLengthFloor);
  }

  const activeLength = Math.min(trail.length, pathLength);

  context.save();
  context.lineCap = "butt";
  context.lineJoin = "round";

  for (let i = activeLength - 2; i > 0; i--) {
    const previousStep = trail[i + 1],
      step = trail[i],
      nextStep = trail[i - 1];

    if (!previousStep || !step || !nextStep) {
      continue;
    }

    const { position: previousPosition } = previousStep,
      { position } = step,
      { position: nextPosition } = nextStep,
      stepTransformData = particle.trailTransform ? (step.transformData ?? defaultTransform) : defaultTransform;

    if (step.break || previousStep.break || nextStep.break) {
      continue;
    }

    context.setTransform(
      stepTransformData.a,
      stepTransformData.b,
      stepTransformData.c,
      stepTransformData.d,
      position.x,
      position.y,
    );

    const startX = (previousPosition.x + position.x) * half - position.x,
      startY = (previousPosition.y + position.y) * half - position.y,
      endX = (position.x + nextPosition.x) * half - position.x,
      endY = (position.y + nextPosition.y) * half - position.y,
      width = Math.max((i / activeLength) * diameter, pixelRatio, (particle.trailMinWidth ?? -1) * drawScale),
      oldAlpha = context.globalAlpha;

    context.beginPath();
    context.moveTo(startX, startY);
    context.quadraticCurveTo(originPoint.x, originPoint.y, endX, endY);

    context.globalAlpha = particle.trailFade ? i / activeLength : defaultAlpha;
    context.lineWidth = particle.trailMaxWidth ? Math.min(width, particle.trailMaxWidth * drawScale) : width;
    context.strokeStyle = step.color;
    context.stroke();
    context.globalAlpha = oldAlpha;
  }

  context.restore();
}

function isInsideOriginal(data) {
  const { canvasSize: size, direction, outMode, particle, radius } = data,
    position = particle.position;

  let minX = position.x - radius,
    maxX = position.x + radius,
    minY = position.y - radius,
    maxY = position.y + radius;

  const useTrailBounds = outMode !== OutMode.bounce && outMode !== OutMode.split;

  if (particle.trail?.length && useTrailBounds) {
    const widthPadding = Math.max(radius, particle.trailMaxWidth ?? 0, particle.trailMinWidth ?? 0);

    for (const step of particle.trail) {
      minX = Math.min(minX, step.position.x - widthPadding);
      maxX = Math.max(maxX, step.position.x + widthPadding);
      minY = Math.min(minY, step.position.y - widthPadding);
      maxY = Math.max(maxY, step.position.y + widthPadding);
    }
  }

  const strictBounds = outMode === OutMode.destroy,
    isBounce = outMode === OutMode.bounce || outMode === OutMode.split,
    bouncePosition = isBounce ? particle.getPosition() : position;
  let directionalResult;

  switch (direction) {
    case OutModeDirection.bottom:
      directionalResult = isBounce ? bouncePosition.y + radius < size.height : minY <= size.height;
      break;
    case OutModeDirection.left:
      directionalResult = isBounce ? bouncePosition.x - radius > 0 : maxX >= 0;
      break;
    case OutModeDirection.right:
      directionalResult = isBounce ? bouncePosition.x + radius < size.width : minX <= size.width;
      break;
    case OutModeDirection.top:
      directionalResult = isBounce ? bouncePosition.y - radius > 0 : maxY >= 0;
      break;
  }

  if (directionalResult !== undefined) {
    return directionalResult;
  }

  if (!strictBounds) {
    return (
      bouncePosition.x + radius >= 0 &&
      bouncePosition.y + radius >= 0 &&
      bouncePosition.x - radius <= size.width &&
      bouncePosition.y - radius <= size.height
    );
  }

  return maxX >= 0 && maxY >= 0 && minX <= size.width && minY <= size.height;
}

function runBenchmark(implementation) {
  const random = createRandom(seed),
    particles = Array.from({ length: particleCount }, () => ({
      justWarped: false,
      position: { x: 0, y: 0 },
      trail: [],
      trailFade: true,
      trailLength,
      trailMaxWidth: undefined,
      trailMinWidth: undefined,
      trailTransform: false,
    })),
    container = { retina: { pixelRatio: 1 } },
    drawer = implementation === "optimized" ? new TrailDrawer(container) : undefined,
    context = createContext();

  const drawFrame = () => {
    for (const particle of particles) {
      const drawPosition = {
        x: random() * canvasSize.width,
        y: random() * canvasSize.height,
      };

      particle.position = drawPosition;

      const data = {
        context,
        drawPosition,
        drawRadius,
        drawScale,
        particle,
        transformData,
      };

      if (drawer) {
        drawer.drawAfter(data);
        drawer.isInsideCanvas({
          canvasSize,
          direction: OutModeDirection.right,
          outMode: OutMode.out,
          particle,
          radius: drawRadius,
        });
      } else {
        drawOriginal(data, container.retina.pixelRatio);
        isInsideOriginal({
          canvasSize,
          direction: OutModeDirection.right,
          outMode: OutMode.out,
          particle,
          radius: drawRadius,
        });
      }
    }
  };

  for (let i = 0; i < warmupFrames; i++) {
    drawFrame();
  }

  const start = performance.now();

  for (let i = 0; i < measuredFrames; i++) {
    drawFrame();
  }

  return (performance.now() - start) / measuredFrames;
}

const results = { original: [], optimized: [] };

for (let i = 0; i < repetitions; i++) {
  const implementations = i % 2 ? ["optimized", "original"] : ["original", "optimized"];

  for (const implementation of implementations) {
    results[implementation].push(runBenchmark(implementation));
  }
}

for (const [implementation, timings] of Object.entries(results)) {
  const average = timings.reduce((sum, timing) => sum + timing, 0) / timings.length;

  console.log(
    `${implementation}: ${average.toFixed(3)} ms/frame (${particleCount} particles, ${trailLength}-step trail)`,
  );
}
