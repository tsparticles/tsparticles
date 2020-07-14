import { Container } from "tsparticles/dist/Core/Container";
import { changeHandler } from "../utils";

interface IHsl {
    h: number;
    s: number;
    l: number;
}

interface IHsv {
    h: number;
    s: number;
    v: number;
}

const hsl2hsv = (hsl: IHsl): IHsv => {
    const v = hsl.l + hsl.s * Math.min(hsl.l, 1 - hsl.l);
    return {
        h: hsl.h,
        s: v ? 2 * (1 - hsl.l / v) : 0,
        v: v,
    };
};

const addParticles = (container: Container): void => {
    /*const fParticles = addFolder("particles");

    const fColor = fParticles.addFolder("color");

    const hsl = container.options.particles.color.value as IHsl;
    if (hsl.h !== undefined && hsl.s !== undefined && hsl.l !== undefined) {
        const hsv = hsl2hsv(hsl);

        fColor.addColor(hsv, "value").onChange(async () => changeHandler(container));
    } else {
        fColor.addColor(container.options.particles.color, "value").onChange(async () => changeHandler(container));
    }

    const fColorAnimation = fColor.addFolder("animation");

    fColorAnimation
        .add(container.options.particles.color.animation, "enable")
        .onChange(async () => changeHandler(container));
    fColorAnimation
        .add(container.options.particles.color.animation, "speed")
        .min(0)
        .max(360)
        .step(0.1)
        .onChange(async () => changeHandler(container));
    fColorAnimation
        .add(container.options.particles.color.animation, "sync")
        .onChange(async () => changeHandler(container));

    const fCollisions = fParticles.addFolder("collisions");

    fCollisions.add(container.options.particles.collisions, "enable").onChange(async () => changeHandler(container));
    fCollisions
        .add(container.options.particles.collisions, "mode", [ "absorb", "bounce", "destroy" ])
        .onChange(async () => changeHandler(container));

    const fLinks = fParticles.addFolder("links");

    fLinks.add(container.options.particles.links, "blink").onChange(async () => changeHandler(container));

    const fLinksColor = fLinks.addFolder("color");

    fLinksColor
        .addColor(container.options.particles.links.color, "value")
        .onChange(async () => changeHandler(container));

    fLinks.add(container.options.particles.links, "consent").onChange(async () => changeHandler(container));
    fLinks
        .add(container.options.particles.links, "distance")
        .min(0)
        .max(500)
        .onChange(async () => changeHandler(container));
    fLinks.add(container.options.particles.links, "enable").onChange(async () => changeHandler(container));

    if (container.options.particles.links.id !== undefined) {
        fLinks.add(container.options.particles.links, "id").onChange(async () => changeHandler(container));
    }

    fLinks
        .add(container.options.particles.links, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));

    const fLinksShadow = fLinks.addFolder("shadow");

    fLinksShadow
        .add(container.options.particles.links.shadow, "blur")
        .min(0)
        .max(10)
        .step(0.5)
        .onChange(async () => changeHandler(container));

    const fLinksShadowColor = fLinksShadow.addFolder("color");

    fLinksShadowColor
        .addColor(container.options.particles.links.shadow.color, "value")
        .onChange(async () => changeHandler(container));

    fLinksShadow.add(container.options.particles.links.shadow, "enable").onChange(async () => changeHandler(container));

    const fLinksTriangles = fLinks.addFolder("triangles");

    if (container.options.particles.links.triangles.color) {
        const fLinksTrianglesColor = fLinksTriangles.addFolder("color");

        fLinksTrianglesColor
            .addColor(container.options.particles.links.triangles.color, "value")
            .onChange(async () => changeHandler(container));
    }

    fLinksTriangles
        .add(container.options.particles.links.triangles, "enable")
        .onChange(async () => changeHandler(container));

    if (container.options.particles.links.triangles.opacity !== undefined) {
        fLinksTriangles
            .add(container.options.particles.links.triangles, "opacity")
            .min(0)
            .max(1)
            .step(0.01)
            .onChange(async () => changeHandler(container));
    }

    fLinks.add(container.options.particles.links, "warp").onChange(async () => changeHandler(container));
    fLinks
        .add(container.options.particles.links, "width")
        .min(0)
        .max(50)
        .step(0.1)
        .onChange(async () => changeHandler(container));

    const fMove = fParticles.addFolder("move");

    fMove
        .add(container.options.particles.move, "angle")
        .min(0)
        .max(360)
        .onChange(async () => changeHandler(container));

    const fMoveAttract = fMove.addFolder("attract");

    fMoveAttract.add(container.options.particles.move.attract, "enable").onChange(async () => changeHandler(container));

    const fMoveAttractRotate = fMoveAttract.addFolder("rotate");

    fMoveAttractRotate
        .add(container.options.particles.move.attract.rotate, "x")
        .min(-360)
        .max(360)
        .onChange(async () => changeHandler(container));
    fMoveAttractRotate
        .add(container.options.particles.move.attract.rotate, "y")
        .min(-360)
        .max(360)
        .onChange(async () => changeHandler(container));

    fMove
        .add(container.options.particles.move, "direction", [
            "none",
            "bottom",
            "bottomLeft",
            "bottomRight",
            "left",
            "right",
            "top",
            "topLeft",
            "topRight",
        ])
        .onChange(async () => changeHandler(container));

    fMove.add(container.options.particles.move, "enable").onChange(async () => changeHandler(container));

    const fMoveNoise = fMove.addFolder("noise");

    const fNoiseDelay = fMoveNoise.addFolder("delay");

    const fNoiseRandom = fMoveNoise.addFolder("random");

    fNoiseRandom
        .add(container.options.particles.move.noise.delay.random, "enable")
        .onChange(async () => changeHandler(container));
    fNoiseRandom
        .add(container.options.particles.move.noise.delay.random, "minimumValue")
        .min(0)
        .max(5)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fNoiseDelay
        .add(container.options.particles.move.noise.delay, "value")
        .min(0)
        .max(5)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fMoveNoise.add(container.options.particles.move.noise, "enable").onChange(async () => changeHandler(container));

    fMove
        .add(container.options.particles.move, "outMode", [
            "out",
            "bounceVertical",
            "bounceHorizontal",
            "bounce",
            "destroy",
        ])
        .onChange(async () => changeHandler(container));

    fMove.add(container.options.particles.move, "random").onChange(async () => changeHandler(container));
    fMove
        .add(container.options.particles.move, "speed")
        .min(0)
        .max(100)
        .onChange(async () => changeHandler(container));
    fMove.add(container.options.particles.move, "straight").onChange(async () => changeHandler(container));

    const fMoveTrail = fMove.addFolder("trail");

    fMoveTrail.add(container.options.particles.move.trail, "enable").onChange(async () => changeHandler(container));

    const fTrailFillColor = fMoveTrail.addFolder("fillColor");

    fTrailFillColor
        .addColor(container.options.particles.move.trail.fillColor, "value")
        .onChange(async () => changeHandler(container));

    fMoveTrail.add(container.options.particles.move.trail, "length").onChange(async () => changeHandler(container));

    fMove.add(container.options.particles.move, "vibrate").onChange(async () => changeHandler(container));
    fMove.add(container.options.particles.move, "warp").onChange(async () => changeHandler(container));

    const fNumber = fParticles.addFolder("number");

    const fNumberDensity = fNumber.addFolder("density");

    fNumberDensity
        .add(container.options.particles.number.density, "area")
        .min(0)
        .onChange(async () => changeHandler(container));
    fNumberDensity
        .add(container.options.particles.number.density, "enable")
        .onChange(async () => changeHandler(container));
    fNumberDensity
        .add(container.options.particles.number.density, "factor")
        .min(0)
        .onChange(async () => changeHandler(container));

    fNumber
        .add(container.options.particles.number, "limit")
        .min(0)
        .onChange(async () => changeHandler(container));
    fNumber
        .add(container.options.particles.number, "value")
        .min(0)
        .onChange(async () => changeHandler(container));

    const fOpacity = fParticles.addFolder("opacity");

    const fOpacityAnimation = fOpacity.addFolder("animation");

    fOpacityAnimation
        .add(container.options.particles.opacity.animation, "enable")
        .onChange(async () => changeHandler(container));
    fOpacityAnimation
        .add(container.options.particles.opacity.animation, "minimumValue")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fOpacityAnimation
        .add(container.options.particles.opacity.animation, "speed")
        .min(0)
        .max(100)
        .onChange(async () => changeHandler(container));
    fOpacityAnimation
        .add(container.options.particles.opacity.animation, "sync")
        .onChange(async () => changeHandler(container));

    const fOpacityRandom = fOpacity.addFolder("random");

    fOpacityRandom
        .add(container.options.particles.opacity.random, "enable")
        .onChange(async () => changeHandler(container));
    fOpacityRandom
        .add(container.options.particles.opacity.random, "minimumValue")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));

    fOpacity
        .add(container.options.particles.opacity, "value")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));

    const fRotate = fParticles.addFolder("rotate");

    const fRotateAnimation = fRotate.addFolder("animation");

    fRotateAnimation
        .add(container.options.particles.rotate.animation, "enable")
        .onChange(async () => changeHandler(container));
    fRotateAnimation
        .add(container.options.particles.rotate.animation, "speed")
        .min(0)
        .max(100)
        .onChange(async () => changeHandler(container));
    fRotateAnimation
        .add(container.options.particles.rotate.animation, "sync")
        .onChange(async () => changeHandler(container));

    fRotate
        .add(container.options.particles.rotate, "direction", [ "clockwise", "counterClockwise", "random" ])
        .onChange(async () => changeHandler(container));
    fRotate.add(container.options.particles.rotate, "path").onChange(async () => changeHandler(container));
    fRotate.add(container.options.particles.rotate, "random").onChange(async () => changeHandler(container));
    fRotate
        .add(container.options.particles.rotate, "value")
        .min(0)
        .max(360)
        .onChange(async () => changeHandler(container));

    const fShadow = fParticles.addFolder("shadow");

    fShadow
        .add(container.options.particles.shadow, "blur")
        .min(0)
        .max(20)
        .step(0.05)
        .onChange(async () => changeHandler(container));

    const fShadowColor = fShadow.addFolder("color");

    fShadowColor
        .addColor(container.options.particles.shadow.color, "value")
        .onChange(async () => changeHandler(container));

    fShadow.add(container.options.particles.shadow, "enable").onChange(async () => changeHandler(container));

    const fShadowOffset = fShadow.addFolder("offset");

    fShadowOffset
        .add(container.options.particles.shadow.offset, "x")
        .min(-100)
        .max(100)
        .onChange(async () => changeHandler(container));
    fShadowOffset
        .add(container.options.particles.shadow.offset, "y")
        .min(-100)
        .max(100)
        .onChange(async () => changeHandler(container));

    const fShape = fParticles.addFolder("shape");

    fShape
        .add(container.options.particles.shape, "type", Array.from(container.drawers.keys()))
        .onChange(async () => changeHandler(container));

    const fShapeOptions = fShape.addFolder("options");

    for (const shape in container.options.particles.shape.options) {
        const fOptionsShape = fShapeOptions.addFolder(shape);

        for (const value in container.options.particles.shape.options[shape]) {
            fOptionsShape
                .add(container.options.particles.shape.options[shape], value)
                .onChange(async () => changeHandler(container));
        }
    }

    const fSize = fParticles.addFolder("size");

    const fSizeAnimation = fSize.addFolder("animation");

    fSizeAnimation
        .add(container.options.particles.size.animation, "destroy", [ "max", "min", "none" ])
        .onChange(async () => changeHandler(container));
    fSizeAnimation
        .add(container.options.particles.size.animation, "enable")
        .onChange(async () => changeHandler(container));
    fSizeAnimation
        .add(container.options.particles.size.animation, "minimumValue")
        .min(0)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fSizeAnimation
        .add(container.options.particles.size.animation, "speed")
        .min(0)
        .max(100)
        .onChange(async () => changeHandler(container));
    fSizeAnimation
        .add(container.options.particles.size.animation, "startValue", [ "max", "min" ])
        .onChange(async () => changeHandler(container));
    fSizeAnimation
        .add(container.options.particles.size.animation, "sync")
        .onChange(async () => changeHandler(container));

    const fSizeRandom = fSize.addFolder("random");

    fSizeRandom.add(container.options.particles.size.random, "enable").onChange(async () => changeHandler(container));
    fSizeRandom
        .add(container.options.particles.size.random, "minimumValue")
        .min(0)
        .onChange(async () => changeHandler(container));

    fSize
        .add(container.options.particles.size, "value")
        .min(0)
        .onChange(async () => changeHandler(container));

    const fStroke = fParticles.addFolder("stroke");

    if (container.options.particles.stroke instanceof Array) {
        container.options.particles.stroke.forEach((value, index) => {
            const fStrokeItem = fStroke.addFolder(index.toString(10));

            const fStrokeColor = fStrokeItem.addFolder("color");

            fStrokeColor.addColor(value.color, "value").onChange(async () => changeHandler(container));

            fStrokeItem
                .add(value, "opacity")
                .min(0)
                .max(1)
                .step(0.01)
                .onChange(async () => changeHandler(container));
            fStrokeItem
                .add(value, "width")
                .min(0)
                .max(50)
                .onChange(async () => changeHandler(container));
        });
    } else {
        const fStrokeColor = fStroke.addFolder("color");

        fStrokeColor
            .addColor(container.options.particles.stroke.color, "value")
            .onChange(async () => changeHandler(container));

        fStroke
            .add(container.options.particles.stroke, "opacity")
            .min(0)
            .max(1)
            .step(0.01)
            .onChange(async () => changeHandler(container));
        fStroke
            .add(container.options.particles.stroke, "width")
            .min(0)
            .max(50)
            .onChange(async () => changeHandler(container));
    }

    const fTwinkle = fParticles.addFolder("twinkle");

    const fTwinkleLines = fTwinkle.addFolder("lines");

    if (container.options.particles.twinkle.lines.color) {
        const fTwinkleLinesColor = fTwinkleLines.addFolder("color");

        fTwinkleLinesColor
            .addColor(container.options.particles.twinkle.lines.color, "value")
            .onChange(async () => changeHandler(container));
    }

    fTwinkleLines
        .add(container.options.particles.twinkle.lines, "enable")
        .onChange(async () => changeHandler(container));
    fTwinkleLines
        .add(container.options.particles.twinkle.lines, "frequency")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fTwinkleLines
        .add(container.options.particles.twinkle.lines, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));

    const fTwinkleParticles = fTwinkle.addFolder("particles");

    if (container.options.particles.twinkle.particles.color) {
        const fTwinkleParticlesColor = fTwinkleParticles.addFolder("color");

        fTwinkleParticlesColor
            .addColor(container.options.particles.twinkle.particles.color, "value")
            .onChange(async () => changeHandler(container));
    }

    fTwinkleParticles
        .add(container.options.particles.twinkle.particles, "enable")
        .onChange(async () => changeHandler(container));
    fTwinkleParticles
        .add(container.options.particles.twinkle.particles, "frequency")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));
    fTwinkleParticles
        .add(container.options.particles.twinkle.particles, "opacity")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange(async () => changeHandler(container));
     */
};

export { addParticles };
