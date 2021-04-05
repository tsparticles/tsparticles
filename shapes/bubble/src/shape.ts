import type { Main } from "tsparticles";

export function loadBubbleShape(tsParticles: Main): void {
    tsParticles.addShape(
        "bubble",
        (context, particle, radius) => {
            context.arc(0, 0, radius, 0, Math.PI * 2, false);
        },
        undefined,
        (context, particle, radius) => {
            context.save();
            context.beginPath();
            context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
            context.closePath();
            context.fillStyle = "#fff9";
            context.fill();
            context.restore();
        }
    );
}
