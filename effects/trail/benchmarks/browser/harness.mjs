/* global document, performance, window */

import { OutMode, OutModeDirection } from "@tsparticles/engine";

const canvasWidth = 320,
  canvasHeight = 240,
  pixelBackground = "#101820",
  particleColors = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#43aa8b", "#577590"],
  outModes = {
    out: OutMode.out,
    destroy: OutMode.destroy,
    bounce: OutMode.bounce,
    split: OutMode.split,
    wrap: OutMode.out,
  },
  directions = Object.values(OutModeDirection),
  contextStateKeys = ["a", "b", "c", "d", "e", "f", "globalAlpha", "lineWidth", "strokeStyle", "lineCap", "lineJoin"],
  currentModuleUrl = "/effects/trail/benchmarks/output/current/TrailDrawer.js",
  originalModuleUrl = "/effects/trail/benchmarks/output/original/TrailDrawer.js";

function createRandom(seed) {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;

    return state / 0x100000000;
  };
}

function canvasContext(canvas, dpr, width = canvasWidth, height = canvasHeight) {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Unable to create a 2D canvas context.");
  }

  return context;
}

function captureContextState(context) {
  const transform = context.getTransform();

  return {
    a: transform.a,
    b: transform.b,
    c: transform.c,
    d: transform.d,
    e: transform.e,
    f: transform.f,
    globalAlpha: context.globalAlpha,
    lineWidth: context.lineWidth,
    strokeStyle: context.strokeStyle,
    lineCap: context.lineCap,
    lineJoin: context.lineJoin,
  };
}

function setBaselineContextState(context) {
  context.setTransform(1.13, 0.07, -0.05, 0.91, 7, 11);
  context.globalAlpha = 0.73;
  context.lineWidth = 4.25;
  context.strokeStyle = "#123456";
  context.lineCap = "square";
  context.lineJoin = "bevel";
}

function instrumentCanvasContext(context, trace) {
  let path = [];

  return new Proxy(context, {
    get(target, property) {
      const value = Reflect.get(target, property, target);

      if (typeof value !== "function") {
        return value;
      }

      return (...args) => {
        if (property === "beginPath") {
          path = [];
        } else if (property === "moveTo" && trace.frame) {
          path.push(["moveTo", ...args]);
        } else if (property === "quadraticCurveTo" && trace.frame) {
          path.push(["quadraticCurveTo", ...args]);
        } else if (property === "stroke" && trace.frame) {
          const transform = target.getTransform();

          trace.strokes.push({
            path: path.map((command) => [...command]),
            transform: [transform.a, transform.b, transform.c, transform.d, transform.e, transform.f],
            globalAlpha: target.globalAlpha,
            lineWidth: target.lineWidth,
            strokeStyle: target.strokeStyle,
          });
        }

        return Reflect.apply(value, target, args);
      };
    },
    set(target, property, value) {
      return Reflect.set(target, property, value, target);
    },
  });
}

function createScene(implementation, config) {
  const CurrentDrawer = implementation === "current" ? window.drawerModules.current : window.drawerModules.original,
    canvas = document.getElementById(implementation),
    nativeContext = canvasContext(
      canvas,
      config.dpr,
      config.canvasWidth ?? canvasWidth,
      config.canvasHeight ?? canvasHeight,
    ),
    trace = { frame: 0, strokes: [] },
    context = config.recordGeometry ? instrumentCanvasContext(nativeContext, trace) : nativeContext,
    random = createRandom(config.seed ?? 0x5eed1234),
    container = {
      engine: { getRandomFn: () => random },
      retina: { pixelRatio: config.dpr },
    },
    drawer = new CurrentDrawer(container),
    particleCount = config.particleCount ?? 12,
    particles = [];

  for (let index = 0; index < particleCount; index++) {
    const baseX = random() * canvas.width,
      baseY = random() * canvas.height,
      particle = {
        baseX,
        baseY,
        vx: (random() - 0.5) * 5 * config.dpr,
        vy: (random() - 0.5) * 5 * config.dpr,
        index,
        justWarped: false,
        position: { x: baseX, y: baseY },
        getPosition() {
          return this.position;
        },
        effectData: {
          fade: config.fade,
          length: config.length,
          transform: config.transform,
          ...(config.minWidth !== undefined ? { minWidth: config.minWidth } : {}),
          ...(config.maxWidth !== undefined ? { maxWidth: config.maxWidth } : {}),
        },
      };

    drawer.particleInit(container, particle);
    particles.push(particle);
  }

  return { canvas, config, container, context, drawer, particles, trace };
}

function regularPosition(scene, particle, frame) {
  const { config } = scene,
    width = scene.canvas.width,
    height = scene.canvas.height,
    rawX = particle.baseX + particle.vx * frame,
    rawY = particle.baseY + particle.vy * frame,
    previousX = particle.baseX + particle.vx * (frame - 1),
    previousY = particle.baseY + particle.vy * (frame - 1),
    crossedX = Math.floor(rawX / width) !== Math.floor(previousX / width),
    crossedY = Math.floor(rawY / height) !== Math.floor(previousY / height),
    wrapX = config.wrapAround,
    wrapY = config.wrapAround,
    x = wrapX ? ((rawX % width) + width) % width : rawX,
    y = wrapY ? ((rawY % height) + height) % height : rawY;

  return { x, y, justWarped: config.wrapAround && (crossedX || crossedY) };
}

function animatedTransform(index, frame) {
  const angle = (index * 0.37 + frame * 0.025) % (Math.PI * 2),
    cosine = Math.cos(angle),
    sine = Math.sin(angle);

  return { a: cosine, b: sine, c: -sine, d: cosine };
}

function drawSceneFrame(scene, frame, getPosition = regularPosition) {
  const { config, context, drawer, particles } = scene,
    width = scene.canvas.width,
    height = scene.canvas.height,
    tracing = config.recordGeometry && config.traceFrame === frame;

  if (tracing) {
    scene.trace.frame = frame;
    scene.trace.strokes = [];
  }

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);
  context.globalAlpha = 1;
  context.fillStyle = pixelBackground;
  context.fillRect(0, 0, width, height);
  setBaselineContextState(context);

  let restoredState;

  for (const particle of particles) {
    const { x, y, justWarped } = getPosition(scene, particle, frame),
      position = { x, y },
      drawRadius =
        config.baseRadius * config.dpr * (config.animateSize ? 0.8 + 0.4 * Math.sin(frame * 0.09 + particle.index) : 1),
      direction = config.direction ?? directions[particle.index % directions.length],
      transformData = animatedTransform(particle.index, frame);

    particle.position = position;
    particle.justWarped = justWarped;
    context.fillStyle = particleColors[particle.index % particleColors.length];

    const before = frame === 3 && particle.index === 0 ? captureContextState(context) : undefined;

    drawer.drawAfter({
      context,
      drawPosition: position,
      drawRadius,
      drawScale: 1,
      particle,
      transformData,
    });

    if (before) {
      const after = captureContextState(context);

      restoredState = {
        after,
        before,
        restored: contextStateKeys.every((key) => before[key] === after[key]),
      };
    }

    drawer.isInsideCanvas({
      canvasSize: { width, height },
      direction,
      outMode: config.outMode,
      particle,
      radius: drawRadius,
    });
  }

  if (tracing) {
    scene.trace.frame = 0;
  }

  return restoredState;
}

function bruteForceInsideCanvas(scene, particle, direction, outMode, radius) {
  const { width, height } = scene.canvas,
    position = particle.position;
  let minX = position.x - radius,
    maxX = position.x + radius,
    minY = position.y - radius,
    maxY = position.y + radius;

  if (outMode !== OutMode.bounce && outMode !== OutMode.split) {
    const widthPadding = Math.max(radius, particle.trailMaxWidth ?? 0, particle.trailMinWidth ?? 0);

    for (const step of particle.trail) {
      minX = Math.min(minX, step.position.x - widthPadding);
      maxX = Math.max(maxX, step.position.x + widthPadding);
      minY = Math.min(minY, step.position.y - widthPadding);
      maxY = Math.max(maxY, step.position.y + widthPadding);
    }
  }

  const isBounce = outMode === OutMode.bounce || outMode === OutMode.split,
    bouncePosition = isBounce ? particle.getPosition() : position;

  switch (direction) {
    case OutModeDirection.bottom:
      return isBounce ? bouncePosition.y + radius < height : minY <= height;
    case OutModeDirection.left:
      return isBounce ? bouncePosition.x - radius > 0 : maxX >= 0;
    case OutModeDirection.right:
      return isBounce ? bouncePosition.x + radius < width : minX <= width;
    case OutModeDirection.top:
      return isBounce ? bouncePosition.y - radius > 0 : maxY >= 0;
    default:
      throw new Error(`Unknown out-of-bounds direction: ${direction}`);
  }
}

function consistencyPosition(scene, particle, frame) {
  const width = scene.canvas.width,
    height = scene.canvas.height;

  if (frame % 31 === 0) {
    const outside = Math.floor(frame / 31) % 2 === 0 ? -48 : width + 48;

    return { x: outside, y: outside, justWarped: true };
  }

  return {
    x: width / 2 + Math.sin(frame * 0.071) * width * 0.82,
    y: height / 2 + Math.cos(frame * 0.053) * height * 0.83,
    justWarped: false,
  };
}

async function loadDrawers() {
  const [current, original] = await Promise.all([import(currentModuleUrl), import(originalModuleUrl)]);

  window.drawerModules = { current: current.TrailDrawer, original: original.TrailDrawer };
}

async function runPixelScenario(config) {
  const current = createScene("current", config),
    original = createScene("original", config),
    checkpoints = new Set(config.traceFrame ? [config.traceFrame] : [1, 10, 60, 200]),
    captures = [],
    contextStates = {};
  let currentState, originalState;

  for (let frame = 1; frame <= 200; frame++) {
    currentState = drawSceneFrame(current, frame) ?? currentState;
    originalState = drawSceneFrame(original, frame) ?? originalState;

    if (checkpoints.has(frame)) {
      captures.push({
        frame,
        current: current.canvas.toDataURL("image/png"),
        original: original.canvas.toDataURL("image/png"),
      });
    }
  }

  contextStates.current = currentState;
  contextStates.original = originalState;

  return {
    captures,
    contextStates,
    dpr: window.devicePixelRatio,
    canvasSize: { width: current.canvas.width, height: current.canvas.height },
    geometry: config.recordGeometry ? { current: current.trace.strokes, original: original.trace.strokes } : undefined,
  };
}

function runConsistency() {
  const dpr = 1,
    consistencyLength = 24,
    frames = 1000,
    results = [];

  for (const outMode of Object.values(OutMode)) {
    for (const direction of directions) {
      const config = {
          animateSize: true,
          baseRadius: 3,
          dpr,
          fade: true,
          length: consistencyLength,
          maxWidth: 7,
          minWidth: 1,
          outMode,
          particleCount: 1,
          seed: 0x6a09e667,
          transform: false,
          canvasWidth,
          canvasHeight,
          direction,
        },
        scene = createScene("current", config),
        particle = scene.particles[0];
      let checkedBreakSteps = 0;

      for (let frame = 1; frame <= frames; frame++) {
        if (frame === 501 && particle) {
          scene.drawer.particleInit(scene.container, particle);

          if (particle.trail.length !== 0) {
            throw new Error(`particleInit did not clear the recycled trail (${outMode}/${direction}).`);
          }
        }

        const state = drawSceneFrame(scene, frame, (currentScene, currentParticle, currentFrame) =>
          consistencyPosition(currentScene, currentParticle, currentFrame),
        );

        if (state && !state.restored) {
          throw new Error(`Context state was not restored in bounds test (${outMode}/${direction}, frame ${frame}).`);
        }

        if (!particle) {
          throw new Error("The consistency scene did not create its particle.");
        }

        const radius = config.baseRadius * (0.8 + 0.4 * Math.sin(frame * 0.09 + particle.index)),
          expected = bruteForceInsideCanvas(scene, particle, direction, outMode, radius),
          actual = scene.drawer.isInsideCanvas({
            canvasSize: { width: scene.canvas.width, height: scene.canvas.height },
            direction,
            outMode,
            particle,
            radius,
          }),
          pathLengthFloor = Math.floor(particle.trailLength + radius);

        if (actual !== expected) {
          throw new Error(
            `Bounds mismatch at frame ${frame} (${outMode}/${direction}): expected ${expected}, got ${actual}.`,
          );
        }

        if (particle.trail.length > pathLengthFloor) {
          throw new Error(
            `Trail history exceeded its configured path length at frame ${frame} (${outMode}/${direction}).`,
          );
        }

        checkedBreakSteps += particle.trail.filter((step) => step.break).length;
      }

      if (checkedBreakSteps === 0) {
        throw new Error(`No active break steps were checked for ${outMode}/${direction}.`);
      }

      results.push({ outMode, direction, checkedBreakSteps, recycledAtFrame: 501, frames });
    }
  }

  return results;
}

function benchmarkIteration(implementation, config) {
  const scene = createScene(implementation, config),
    totalFrames = config.warmupFrames + config.measuredFrames;
  let startTime = 0;

  for (let frame = 1; frame <= totalFrames; frame++) {
    if (frame === config.warmupFrames + 1) {
      startTime = performance.now();
    }

    drawSceneFrame(scene, frame);
  }

  return (performance.now() - startTime) / config.measuredFrames;
}

window.trailHarnessReady = loadDrawers();
window.trailHarness = {
  benchmarkIteration,
  outModes,
  runConsistency,
  runPixelScenario,
};
