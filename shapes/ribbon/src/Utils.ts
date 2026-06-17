import {
  AlterType,
  type IShapeDrawData,
  Vector,
  alterHsl,
  getHslFromAnimation,
  getRandom,
  getRangeValue,
  getStyleFromHsl,
} from "@tsparticles/engine";
import type { RibbonParticle } from "./RibbonParticle.js";

interface IRibbonDrawData {
  a: Vector;
  b: Vector;
  c: Vector;
  d?: Vector;
  fill: boolean;
  stroke: boolean;
}

const defaultParticleDist = 8,
  defaultMass = 1,
  defaultDrag = 0.05,
  defaultVelocityInherit = 5,
  defaultOscillationSpeed = 3,
  defaultOscillationDistance = 40,
  defaultAngle = 45,
  defaultPointCount = 30,
  minPointCount = 4,
  noPoint = 0,
  firstPoint = 1,
  secondPoint = 2,
  lineWidth = 1,
  randomTimeFactor = 100,
  degrees = 180,
  fixedDurationFrames = 50,
  fixedDuration = firstPoint / fixedDurationFrames,
  millisecondsToSeconds = 1000,
  minDelta = 1e-6,
  maxVelocityInherit = 800,
  noDistance = 0,
  half = 0.5;

/**
 *
 * @param particle - The particle to process
 * @param width - The width
 * @param height - The height
 */
export function setRibbonBounds(particle: RibbonParticle, width: number, height: number): void {
  particle.ribbonBounds = Vector.create(width, height);
}

/**
 *
 * @param particle - The particle to process
 * @returns the mass
 */
function getMass(particle: RibbonParticle): number {
  return particle.ribbonMass ?? defaultMass;
}

/**
 *
 * @param particle - The particle to process
 * @returns the drag
 */
function getDrag(particle: RibbonParticle): number {
  return particle.ribbonDrag ?? defaultDrag;
}

/**
 *
 * @param particle - The particle to process
 * @returns the velocity inherit factor
 */
function getVelocityInherit(particle: RibbonParticle): number {
  return particle.ribbonVelocityInherit ?? defaultVelocityInherit;
}

/**
 *
 * @param particle - The particle to process
 * @returns the distance
 */
function getParticleDist(particle: RibbonParticle): number {
  return particle.ribbonParticleDist ?? defaultParticleDist;
}

/**
 *
 * @param particle - The particle to process
 * @returns the oscillation speed
 */
function getOscillationSpeed(particle: RibbonParticle): number {
  return particle.ribbonOscillationSpeed ?? defaultOscillationSpeed;
}

/**
 *
 * @param particle - The particle to process
 * @returns the oscillation distance
 */
function getOscillationDistance(particle: RibbonParticle): number {
  return particle.ribbonOscillationDistance ?? defaultOscillationDistance;
}

/**
 *
 * @param particle - The particle to process
 * @returns the ribbon head
 */
function getHead(particle: RibbonParticle): Vector {
  particle.ribbonHead ??= Vector.create(particle.position.x, particle.position.y);

  return particle.ribbonHead;
}

/**
 *
 * @param particle - The particle to process
 * @returns the previous ribbon head
 */
function getPreviousHead(particle: RibbonParticle): Vector {
  particle.ribbonPreviousHead ??= Vector.create(particle.position.x, particle.position.y);

  return particle.ribbonPreviousHead;
}

/**
 *
 * @param particle - The particle to process
 */
export function createRibbonState(particle: RibbonParticle): void {
  const shapeData = particle.shapeData,
    count = Math.max(minPointCount, Math.round(getRangeValue(shapeData?.count ?? defaultPointCount))),
    particleDist = getRangeValue(shapeData?.particleDist ?? defaultParticleDist),
    mass = getRangeValue(shapeData?.mass ?? defaultMass),
    drag = getRangeValue(shapeData?.drag ?? defaultDrag),
    velocityInherit = getRangeValue(shapeData?.velocityInherit ?? defaultVelocityInherit),
    oscillationSpeed = getRangeValue(shapeData?.oscillationSpeed ?? defaultOscillationSpeed),
    oscillationDistance = getRangeValue(shapeData?.oscillationDistance ?? defaultOscillationDistance),
    angle = getRangeValue(shapeData?.angle ?? defaultAngle),
    angleRad = (Math.PI / degrees) * angle,
    head = Vector.create(particle.position.x, particle.position.y),
    bounds = particle.ribbonBounds;

  if (!bounds) {
    return;
  }

  particle.ribbonParticleDist = particleDist;
  particle.ribbonMass = mass;
  particle.ribbonDrag = drag;
  particle.ribbonVelocityInherit = velocityInherit;
  particle.ribbonOscillationSpeed = oscillationSpeed;
  particle.ribbonOscillationDistance = oscillationDistance;
  particle.ribbonTime = getRandom() * randomTimeFactor;
  particle.ribbonOffsets = Vector.create(Math.cos(angleRad), Math.sin(angleRad));
  particle.ribbonHead = head;
  particle.ribbonPreviousHead = Vector.create(head.x, head.y);
  particle.ribbonPreviousPosition = Vector.create(particle.position.x, particle.position.y);

  const trailAngle = particle.velocity.angle + Math.PI,
    noiseScale = particleDist * half;

  particle.ribbonPoints = new Array(count);

  for (let i = noPoint; i < count; i++) {
    const offset = i * particleDist,
      perpNoise = (getRandom() - half) * noiseScale,
      perpAngle = trailAngle + Math.PI * half;

    particle.ribbonPoints[i] = {
      force: Vector.origin,
      position: Vector.create(
        head.x + Math.cos(trailAngle) * offset + Math.cos(perpAngle) * perpNoise,
        head.y + Math.sin(trailAngle) * offset + Math.sin(perpAngle) * perpNoise,
      ),
      velocity: Vector.origin,
    };
  }
}

/**
 *
 * @param particle - The particle to process
 */
function resetRibbonState(particle: RibbonParticle): void {
  const points = particle.ribbonPoints,
    bounds = particle.ribbonBounds,
    width = bounds?.x ?? noDistance,
    height = bounds?.y ?? noDistance,
    position = Vector.create(getRandom() * width, -getRandom() * height);

  if (!bounds) {
    return;
  }

  if (!points?.length) {
    createRibbonState(particle);

    return;
  }

  particle.position.x = position.x;
  particle.position.y = position.y;
  particle.ribbonHead = Vector.create(position.x, position.y);
  particle.ribbonPreviousHead = Vector.create(position.x, position.y);
  particle.ribbonPreviousPosition = Vector.create(position.x, position.y);
  particle.ribbonTime = getRandom() * randomTimeFactor;

  for (let i = noPoint; i < points.length; i++) {
    const point = points[i];

    if (!point) {
      continue;
    }

    point.position = Vector.create(position.x, position.y - i * getParticleDist(particle));
    point.force = Vector.origin;
    point.velocity = Vector.origin;
  }
}

/**
 *
 * @param particle - The particle to process
 * @param index - The index
 * @param force - The force
 */
function addPointForce(particle: RibbonParticle, index: number, force: Vector): void {
  const point = particle.ribbonPoints?.[index];

  if (!point) {
    return;
  }

  point.force.addTo(force);
}

/**
 *
 * @param particle - The particle to process
 * @param index - The index
 * @param dt - The dt
 */
function integratePoint(particle: RibbonParticle, index: number, dt: number): void {
  const point = particle.ribbonPoints?.[index];

  if (!point) {
    return;
  }

  const mass = getMass(particle),
    drag = getDrag(particle),
    totalForce = Vector.create(point.force.x, point.force.y),
    speed = point.velocity.length,
    dragVelocity = Vector.create(point.velocity.x, point.velocity.y);

  dragVelocity.multTo(drag * mass * speed);
  totalForce.subFrom(dragVelocity);

  const acceleration = totalForce.div(mass);

  point.position.addTo(point.velocity.mult(dt));
  point.velocity.addTo(acceleration.mult(dt));
  point.force = Vector.origin;
}

/**
 *
 * @param data - The data to handle
 */
export function updateRibbon(data: IShapeDrawData<RibbonParticle>): void {
  const { particle, delta } = data,
    points = particle.ribbonPoints,
    offsets = particle.ribbonOffsets,
    bounds = particle.ribbonBounds;

  if (!points?.length || !offsets || !bounds) {
    return;
  }

  const dt = Math.min(fixedDuration, Math.max(delta.value / millisecondsToSeconds, minDelta)),
    head = getHead(particle),
    previousHead = getPreviousHead(particle),
    velocityInherit = getVelocityInherit(particle),
    followsParticleMotion = particle.options.move.enable;

  particle.ribbonTime = (particle.ribbonTime ?? noPoint) + dt * getOscillationSpeed(particle);

  if (followsParticleMotion) {
    head.x =
      particle.position.x +
      (Math.cos(particle.ribbonTime) * getOscillationDistance(particle)) / getOscillationSpeed(particle);
    head.y = particle.position.y;
  } else {
    head.x += Math.cos(particle.ribbonTime) * getOscillationDistance(particle) * dt;
  }

  if (particle.justWarped) {
    const trailAngle = particle.velocity.angle + Math.PI,
      dist = getParticleDist(particle),
      firstPointObj = points[noPoint];

    if (firstPointObj) {
      firstPointObj.position = Vector.create(head.x, head.y);
      firstPointObj.velocity = Vector.origin;
      firstPointObj.force = Vector.origin;
    }

    for (let i = firstPoint; i < points.length; i++) {
      const point = points[i];

      if (!point) {
        continue;
      }

      const offset = i * dist;

      point.position = Vector.create(head.x + Math.cos(trailAngle) * offset, head.y + Math.sin(trailAngle) * offset);
      point.velocity = Vector.origin;
      point.force = Vector.origin;
    }
  }

  const particleDist = getParticleDist(particle);

  if (!Number.isFinite(head.x) || !Number.isFinite(head.y)) {
    resetRibbonState(particle);

    return;
  }

  const first = points[noPoint];

  if (!first) {
    return;
  }

  first.position = Vector.create(head.x, head.y);

  const dX = previousHead.x - head.x,
    dY = previousHead.y - head.y,
    movement = Math.sqrt(dX * dX + dY * dY),
    velocityFactor = Math.min((movement / dt) * velocityInherit, maxVelocityInherit);

  particle.ribbonPreviousHead = Vector.create(head.x, head.y);
  particle.ribbonPreviousPosition = Vector.create(particle.position.x, particle.position.y);

  for (let i = firstPoint; i < points.length; i++) {
    const point = points[i],
      previousPoint = points[i - firstPoint];

    if (!point || !previousPoint) {
      continue;
    }

    const direction = previousPoint.position.sub(point.position).copy();

    direction.normalize();
    direction.multTo(velocityFactor);

    addPointForce(particle, i, direction);
  }

  for (let i = firstPoint; i < points.length; i++) {
    integratePoint(particle, i, dt);
  }

  for (let i = firstPoint; i < points.length; i++) {
    const point = points[i],
      previousPoint = points[i - firstPoint];

    if (!point || !previousPoint) {
      continue;
    }

    const normalized = point.position.sub(previousPoint.position).copy();

    normalized.normalize();
    normalized.multTo(particleDist);
    point.position = previousPoint.position.add(normalized);

    if (
      !Number.isFinite(point.position.x) ||
      !Number.isFinite(point.position.y) ||
      !Number.isFinite(point.velocity.x) ||
      !Number.isFinite(point.velocity.y)
    ) {
      resetRibbonState(particle);

      return;
    }
  }
}

/**
 *
 * @param x1 - The x1
 * @param y1 - The y1
 * @param x2 - The x2
 * @param y2 - The y2
 * @param x3 - The x3
 * @param y3 - The y3
 * @returns the segment side
 */
function getSegmentSide(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number {
  return (x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2);
}

/**
 *
 * @param a - The alpha component
 * @param b - The blue component
 * @returns the midpoint
 */
function getMidpoint(a: Vector, b: Vector): Vector {
  return Vector.create((a.x + b.x) * half, (a.y + b.y) * half);
}

/**
 *
 * @param context - The rendering context
 * @param drawData - The drawData
 */
function drawPolygonSegment(context: OffscreenCanvasRenderingContext2D, drawData: IRibbonDrawData): void {
  context.beginPath();
  context.moveTo(drawData.a.x, drawData.a.y);
  context.lineTo(drawData.b.x, drawData.b.y);
  context.lineTo(drawData.c.x, drawData.c.y);

  if (drawData.d) {
    context.lineTo(drawData.d.x, drawData.d.y);
  }

  context.closePath();

  if (drawData.stroke) {
    context.stroke();
  }

  if (drawData.fill) {
    context.fill();
  }
}

/**
 *
 * @param data - The data to handle
 * @param hdr - The hdr
 */
export function drawRibbon(data: IShapeDrawData<RibbonParticle>, hdr: boolean): void {
  const { context, particle, radius } = data,
    points = particle.ribbonPoints,
    offsets = particle.ribbonOffsets,
    bounds = particle.ribbonBounds,
    hasFill = data.fill,
    hasStroke = data.stroke;

  if (!points || !offsets || !bounds || points.length < minPointCount || (!hasFill && !hasStroke)) {
    return;
  }

  const drawOffsets = offsets.mult(radius),
    center = particle.position,
    frontFill = typeof context.fillStyle === "string" ? context.fillStyle : "",
    frontStroke = typeof context.strokeStyle === "string" ? context.strokeStyle : "",
    shapeData = particle.shapeData;
  let backFill = hasStroke ? frontStroke : frontFill;

  if (shapeData?.backColor) {
    backFill = shapeData.backColor;
  } else if (shapeData?.darken?.enable) {
    const frontHsl = getHslFromAnimation(particle.fillColor);

    if (frontHsl) {
      const altered = alterHsl(frontHsl, AlterType.darken, getRangeValue(shapeData.darken.value));

      backFill = getStyleFromHsl(altered, hdr);
    }
  } else if (shapeData?.enlighten?.enable) {
    const frontHsl = getHslFromAnimation(particle.fillColor);

    if (frontHsl) {
      const altered = alterHsl(frontHsl, AlterType.enlighten, getRangeValue(shapeData.enlighten.value));

      backFill = getStyleFromHsl(altered, hdr);
    }
  }

  context.lineWidth = lineWidth;
  context.lineJoin = "round";
  context.lineCap = "round";

  for (let i = noPoint; i < points.length - firstPoint; i++) {
    const current = points[i],
      next = points[i + firstPoint];

    if (!current || !next) {
      continue;
    }

    const currentOffset = current.position.add(drawOffsets),
      nextOffset = next.position.add(drawOffsets),
      currentBase = current.position.sub(center),
      nextBase = next.position.sub(center),
      currentSide = currentOffset.sub(center),
      nextSide = nextOffset.sub(center),
      minY = Math.min(current.position.y, next.position.y, currentOffset.y, nextOffset.y),
      maxY = Math.max(current.position.y, next.position.y, currentOffset.y, nextOffset.y),
      isFront =
        getSegmentSide(
          current.position.x,
          current.position.y,
          next.position.x,
          next.position.y,
          nextOffset.x,
          nextOffset.y,
        ) < noDistance,
      segmentStyle = isFront ? frontFill : backFill;

    if (minY > bounds.y + drawOffsets.length || maxY < -drawOffsets.length) {
      continue;
    }

    context.fillStyle = segmentStyle;

    if (hasStroke) {
      context.strokeStyle = segmentStyle;
    }

    if (i === noPoint) {
      drawPolygonSegment(context, {
        a: currentBase,
        b: nextBase,
        c: getMidpoint(nextBase, nextSide),
        fill: hasFill,
        stroke: hasStroke,
      });
      drawPolygonSegment(context, {
        a: nextSide,
        b: currentSide,
        c: getMidpoint(nextBase, nextSide),
        fill: hasFill,
        stroke: hasStroke,
      });
    } else if (i === points.length - secondPoint) {
      drawPolygonSegment(context, {
        a: currentBase,
        b: nextBase,
        c: getMidpoint(currentBase, currentSide),
        fill: hasFill,
        stroke: hasStroke,
      });
      drawPolygonSegment(context, {
        a: nextSide,
        b: currentSide,
        c: getMidpoint(currentBase, currentSide),
        fill: hasFill,
        stroke: hasStroke,
      });
    } else {
      drawPolygonSegment(context, {
        a: currentBase,
        b: nextBase,
        c: nextSide,
        d: currentSide,
        fill: hasFill,
        stroke: hasStroke,
      });
    }
  }

  context.fillStyle = frontFill;

  if (hasStroke) {
    context.strokeStyle = frontStroke;
  }

  context.beginPath();
}
