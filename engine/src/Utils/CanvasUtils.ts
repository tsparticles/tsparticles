import type { IShadow } from "../Options/Interfaces/Particles/IShadow";
import type { Container } from "../Core/Container";
import { colorMix, getStyleFromHsl, getStyleFromRgb } from "./ColorUtils";
import type {
    IContainerPlugin,
    ICoordinates,
    IDelta,
    IDimension,
    IHsl,
    IParticle,
    IParticleGradientAnimation,
    IRgb,
} from "../Core/Interfaces";
import type { Particle } from "../Core/Particle";
import { AlterType, GradientType, RollMode } from "../Enums";

export function drawLine(context: CanvasRenderingContext2D, begin: ICoordinates, end: ICoordinates): void {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
}

export function drawTriangle(
    context: CanvasRenderingContext2D,
    p1: ICoordinates,
    p2: ICoordinates,
    p3: ICoordinates
): void {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}

export function paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void {
    context.save();
    context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
}

export function clear(context: CanvasRenderingContext2D, dimension: IDimension): void {
    context.clearRect(0, 0, dimension.width, dimension.height);
}

export function drawConnectLine(
    context: CanvasRenderingContext2D,
    width: number,
    lineStyle: CanvasGradient,
    begin: ICoordinates,
    end: ICoordinates
): void {
    context.save();

    drawLine(context, begin, end);

    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
    context.restore();
}

export function gradient(
    context: CanvasRenderingContext2D,
    p1: IParticle,
    p2: IParticle,
    opacity: number
): CanvasGradient | undefined {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius());
    const color1 = p1.getFillColor();
    const color2 = p2.getFillColor();

    if (!color1 || !color2) {
        return;
    }

    const sourcePos = p1.getPosition();
    const destPos = p2.getPosition();
    const midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius());
    const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);

    grad.addColorStop(0, getStyleFromHsl(color1, opacity));
    grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
    grad.addColorStop(1, getStyleFromHsl(color2, opacity));

    return grad;
}

export function drawGrabLine(
    context: CanvasRenderingContext2D,
    width: number,
    begin: ICoordinates,
    end: ICoordinates,
    colorLine: IRgb,
    opacity: number
): void {
    context.save();

    drawLine(context, begin, end);

    context.strokeStyle = getStyleFromRgb(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
    context.restore();
}

export function drawParticle(
    container: Container,
    context: CanvasRenderingContext2D,
    particle: IParticle,
    delta: IDelta,
    fillColorValue: string | undefined,
    strokeColorValue: string | undefined,
    backgroundMask: boolean,
    composite: string,
    radius: number,
    opacity: number,
    shadow: IShadow,
    gradient?: IParticleGradientAnimation
): void {
    const pos = particle.getPosition();
    const tiltOptions = particle.options.tilt;
    const rollOptions = particle.options.roll;

    context.save();

    if (tiltOptions.enable || rollOptions.enable) {
        const roll = rollOptions.enable && particle.roll;
        const tilt = tiltOptions.enable && particle.tilt;
        const rollHorizontal = roll && (rollOptions.mode === RollMode.horizontal || rollOptions.mode === RollMode.both);
        const rollVertical = roll && (rollOptions.mode === RollMode.vertical || rollOptions.mode === RollMode.both);

        context.setTransform(
            rollHorizontal ? Math.cos(particle.roll.angle) : 1,
            tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0,
            tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0,
            rollVertical ? Math.sin(particle.roll.angle) : 1,
            pos.x,
            pos.y
        );
    } else {
        context.translate(pos.x, pos.y);
    }

    context.beginPath();

    const angle = (particle.rotate?.value ?? 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);

    if (angle !== 0) {
        context.rotate(angle);
    }

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    const shadowColor = particle.shadowColor;

    if (shadow.enable && shadowColor) {
        context.shadowBlur = shadow.blur;
        context.shadowColor = getStyleFromRgb(shadowColor);
        context.shadowOffsetX = shadow.offset.x;
        context.shadowOffsetY = shadow.offset.y;
    }

    if (gradient) {
        const gradientAngle = gradient.angle.value;
        const fillGradient =
            gradient.type === GradientType.radial
                ? context.createRadialGradient(0, 0, 0, 0, 0, radius)
                : context.createLinearGradient(
                      Math.cos(gradientAngle) * -radius,
                      Math.sin(gradientAngle) * -radius,
                      Math.cos(gradientAngle) * radius,
                      Math.sin(gradientAngle) * radius
                  );

        for (const color of gradient.colors) {
            fillGradient.addColorStop(
                color.stop,
                getStyleFromHsl(
                    {
                        h: color.value.h.value,
                        s: color.value.s.value,
                        l: color.value.l.value,
                    },
                    color.opacity?.value ?? opacity
                )
            );
        }

        context.fillStyle = fillGradient;
    } else {
        if (fillColorValue) {
            context.fillStyle = fillColorValue;
        }
    }

    const stroke = particle.stroke;

    context.lineWidth = particle.strokeWidth ?? 0;

    if (strokeColorValue) {
        context.strokeStyle = strokeColorValue;
    }

    drawShape(container, context, particle, radius, opacity, delta);

    if ((stroke?.width ?? 0) > 0) {
        context.stroke();
    }

    if (particle.close) {
        context.closePath();
    }

    if (particle.fill) {
        context.fill();
    }

    context.restore();

    context.save();
    if (tiltOptions.enable && particle.tilt) {
        context.setTransform(
            1,
            Math.cos(particle.tilt.value) * particle.tilt.cosDirection,
            Math.sin(particle.tilt.value) * particle.tilt.sinDirection,
            1,
            pos.x,
            pos.y
        );
    } else {
        context.translate(pos.x, pos.y);
    }

    if (angle !== 0) {
        context.rotate(angle);
    }

    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }

    drawShapeAfterEffect(container, context, particle, radius, opacity, delta);

    context.restore();
}

export function drawShape(
    container: Container,
    context: CanvasRenderingContext2D,
    particle: IParticle,
    radius: number,
    opacity: number,
    delta: IDelta
): void {
    if (!particle.shape) {
        return;
    }

    const drawer = container.drawers.get(particle.shape);

    if (!drawer) {
        return;
    }

    drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}

export function drawShapeAfterEffect(
    container: Container,
    context: CanvasRenderingContext2D,
    particle: IParticle,
    radius: number,
    opacity: number,
    delta: IDelta
): void {
    if (!particle.shape) {
        return;
    }

    const drawer = container.drawers.get(particle.shape);

    if (!drawer?.afterEffect) {
        return;
    }

    drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}

export function drawPlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, delta: IDelta): void {
    if (!plugin.draw) {
        return;
    }

    context.save();
    plugin.draw(context, delta);
    context.restore();
}

export function drawParticlePlugin(
    context: CanvasRenderingContext2D,
    plugin: IContainerPlugin,
    particle: Particle,
    delta: IDelta
): void {
    if (plugin.drawParticle !== undefined) {
        context.save();
        plugin.drawParticle(context, particle, delta);
        context.restore();
    }
}

export function drawEllipse(
    context: CanvasRenderingContext2D,
    particle: IParticle,
    fillColorValue: IHsl | undefined,
    radius: number,
    opacity: number,
    width: number,
    rotation: number,
    start: number,
    end: number
): void {
    const pos = particle.getPosition();

    if (fillColorValue) {
        context.strokeStyle = getStyleFromHsl(fillColorValue, opacity);
    }

    if (width === 0) {
        return;
    }

    context.lineWidth = width;

    const rotationRadian = (rotation * Math.PI) / 180;

    context.beginPath();
    context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
    context.stroke();
}

export function alterHsl(color: IHsl, type: AlterType, value: number): IHsl {
    return {
        h: color.h,
        s: color.s,
        l: color.l + (type === AlterType.darken ? -1 : 1) * value,
    };
}
