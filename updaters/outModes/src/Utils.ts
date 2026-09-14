import { type IBounds, OutMode, OutModeDirection, getRangeValue, minVelocity } from "@tsparticles/engine";
import type { IBounceData } from "./IBounceData.js";

const boundsMin = 0;

interface BounceAxisConfig {
  axis: "x" | "y";
  bounce: "horizontal" | "vertical";
  canvas: "width" | "height";
  negative: boolean;
  negativeEdge: keyof IBounds;
  positiveEdge: keyof IBounds;
}

const bounceAxisConfigs: Record<OutModeDirection, BounceAxisConfig> = {
  [OutModeDirection.left]: {
    axis: "x" as const,
    canvas: "width" as const,
    bounce: "horizontal" as const,
    negativeEdge: "right",
    positiveEdge: "left",
    negative: true,
  },
  [OutModeDirection.right]: {
    axis: "x" as const,
    canvas: "width" as const,
    bounce: "horizontal" as const,
    negativeEdge: "right",
    positiveEdge: "left",
    negative: false,
  },
  [OutModeDirection.top]: {
    axis: "y" as const,
    canvas: "height" as const,
    bounce: "vertical" as const,
    negativeEdge: "bottom",
    positiveEdge: "top",
    negative: true,
  },
  [OutModeDirection.bottom]: {
    axis: "y" as const,
    canvas: "height" as const,
    bounce: "vertical" as const,
    negativeEdge: "bottom",
    positiveEdge: "top",
    negative: false,
  },
};

/**
 * @param data - The data to handle
 */
export function bounce(data: IBounceData): void {
  if ((data.outMode !== OutMode.bounce && data.outMode !== OutMode.split) || !(data.direction in bounceAxisConfigs)) {
    return;
  }

  const config = bounceAxisConfigs[data.direction],
    bounds = data.bounds,
    canvasDim = data.canvasSize[config.canvas],
    position = data.particle.position,
    velocity = data.particle.velocity[config.axis];

  if (config.negative && bounds[config.negativeEdge] < boundsMin) {
    position[config.axis] = data.size + data.offset[config.axis];
  } else if (!config.negative && bounds[config.positiveEdge] > canvasDim) {
    position[config.axis] = canvasDim - data.size - data.offset[config.axis];
  }

  if (
    data.outOfCanvas &&
    ((config.negative && velocity < minVelocity) || (!config.negative && velocity > minVelocity))
  ) {
    data.particle.velocity[config.axis] *= -getRangeValue(data.particle.options.bounce[config.bounce].value);
  } else {
    return;
  }

  const minPos = data.offset[config.axis] + data.size;

  position[config.axis] = config.negative ? minPos : canvasDim - minPos;

  if (data.outMode === OutMode.split) {
    data.particle.destroy();
  }
}
