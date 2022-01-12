import { OutMode, OutModeDirection } from "../../Enums";
import type { IBounceData } from "./IBounceData";
import { getRangeValue } from "../../Utils";

export function bounceHorizontal(data: IBounceData): void {
    if (
        !(
            data.outMode === OutMode.bounce ||
            data.outMode === OutMode.bounceHorizontal ||
            data.outMode === "bounceHorizontal" ||
            data.outMode === OutMode.split
        )
    ) {
        return;
    }

    const velocity = data.particle.velocity.x;
    let bounced = false;

    if (
        (data.direction === OutModeDirection.right && data.bounds.right >= data.canvasSize.width && velocity > 0) ||
        (data.direction === OutModeDirection.left && data.bounds.left <= 0 && velocity < 0)
    ) {
        const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);

        data.particle.velocity.x *= -newVelocity;

        bounced = true;
    }

    if (!bounced) {
        return;
    }

    const minPos = data.offset.x + data.size;

    if (data.bounds.right >= data.canvasSize.width) {
        data.particle.position.x = data.canvasSize.width - minPos;
    } else if (data.bounds.left <= 0) {
        data.particle.position.x = minPos;
    }

    if (data.outMode === OutMode.split) {
        data.particle.destroy();
    }
}

export function bounceVertical(data: IBounceData): void {
    if (
        data.outMode === OutMode.bounce ||
        data.outMode === OutMode.bounceVertical ||
        data.outMode === "bounceVertical" ||
        data.outMode === OutMode.split
    ) {
        const velocity = data.particle.velocity.y;
        let bounced = false;

        if (
            (data.direction === OutModeDirection.bottom &&
                data.bounds.bottom >= data.canvasSize.height &&
                velocity > 0) ||
            (data.direction === OutModeDirection.top && data.bounds.top <= 0 && velocity < 0)
        ) {
            const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);

            data.particle.velocity.y *= -newVelocity;

            bounced = true;
        }

        if (!bounced) {
            return;
        }

        const minPos = data.offset.y + data.size;

        if (data.bounds.bottom >= data.canvasSize.height) {
            data.particle.position.y = data.canvasSize.height - minPos;
        } else if (data.bounds.top <= 0) {
            data.particle.position.y = minPos;
        }

        if (data.outMode === OutMode.split) {
            data.particle.destroy();
        }
    }
}
