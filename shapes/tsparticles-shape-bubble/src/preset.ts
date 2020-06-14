import { tsParticles } from "tsparticles";
import { IParticle } from "tsparticles/dist/Core/Interfaces/IParticle";

tsParticles.addShape(
    "bubble",
    function (context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    },
    undefined,
    function (context: CanvasRenderingContext2D, particle: IParticle, radius: number) {
        context.save();
        context.beginPath();
        context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
        context.restore();
    }
);