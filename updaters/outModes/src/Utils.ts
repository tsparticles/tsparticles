import { OutMode, OutModeDirection, getRangeValue, minVelocity } from "@tsparticles/engine";
import type { IBounceData } from "./IBounceData.js";

const boundsMin = 0;

/**
 * @param data - The data to handle
 */
export function bounceHorizontal(data: IBounceData): void {
  if (
    (data.outMode !== OutMode.bounce && data.outMode !== OutMode.split) ||
    (data.direction !== OutModeDirection.left && data.direction !== OutModeDirection.right)
  ) {
    return;
  }

  if (data.bounds.right < boundsMin && data.direction === OutModeDirection.left) {
    data.particle.position.x = data.size + data.offset.x;
  } else if (data.bounds.left > data.canvasSize.width && data.direction === OutModeDirection.right) {
    data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
  }

  const velocity = data.particle.velocity.x;
  let bounced = false;

  if (
    data.outOfCanvas &&
    ((data.direction === OutModeDirection.right && velocity > minVelocity) ||
      (data.direction === OutModeDirection.left && velocity < minVelocity))
  ) {
    const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);

    data.particle.velocity.x *= -newVelocity;

    bounced = true;
  }

  if (!bounced) {
    return;
  }

  const minPos = data.offset.x + data.size;

  if (data.outOfCanvas && data.direction === OutModeDirection.right) {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.outOfCanvas && data.direction === OutModeDirection.left) {
    data.particle.position.x = minPos;
  }

  if (data.outMode === OutMode.split) {
    data.particle.destroy();
  }
}

/**
 * @param data - The data to handle
 */
export function bounceVertical(data: IBounceData): void {
  if (
    (data.outMode !== OutMode.bounce && data.outMode !== OutMode.split) ||
    (data.direction !== OutModeDirection.bottom && data.direction !== OutModeDirection.top)
  ) {
    return;
  }

  if (data.bounds.bottom < boundsMin && data.direction === OutModeDirection.top) {
    data.particle.position.y = data.size + data.offset.y;
  } else if (data.bounds.top > data.canvasSize.height && data.direction === OutModeDirection.bottom) {
    data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
  }

  const velocity = data.particle.velocity.y;
  let bounced = false;

  if (
    data.outOfCanvas &&
    ((data.direction === OutModeDirection.bottom && velocity > minVelocity) ||
      (data.direction === OutModeDirection.top && velocity < minVelocity))
  ) {
    const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);

    data.particle.velocity.y *= -newVelocity;

    bounced = true;
  }

  if (!bounced) {
    return;
  }

  const minPos = data.offset.y + data.size;

  if (data.outOfCanvas && data.direction === OutModeDirection.bottom) {
    data.particle.position.y = data.canvasSize.height - minPos;
  } else if (data.outOfCanvas && data.direction === OutModeDirection.top) {
    data.particle.position.y = minPos;
  }

  if (data.outMode === OutMode.split) {
    data.particle.destroy();
  }
}
