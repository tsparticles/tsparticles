import { GUI } from "dat.gui";
import { Container } from "tsparticles/dist/Core/Container";
import { changeHandler } from "../utils";
import { MoveDirection, OutMode, RotateDirection } from "tsparticles";

export function addParticles(gui: GUI, container: Container) {
    const fParticles = gui.addFolder("particles");

    const fColor = fParticles.addFolder("color");

    fColor.addColor(container.options.particles.color, "value").onChange(async () => await changeHandler(container));

    const fColorAnimation = fColor.addFolder("animation");

    fColorAnimation.add(container.options.particles.color.animation, "enable").onChange(async () => await changeHandler(container));
    fColorAnimation.add(container.options.particles.color.animation, "speed").min(0).max(360).step(0.1).onChange(async () => await changeHandler(container));
    fColorAnimation.add(container.options.particles.color.animation, "sync").onChange(async () => await changeHandler(container));

    const fCollisions = fParticles.addFolder("collisions");

    fCollisions.add(container.options.particles.collisions, "enable").onChange(async () => await changeHandler(container));
    fCollisions.add(container.options.particles.collisions, "mode", [
        "absorb",
        "bounce",
        "destroy",
    ]).onChange(async () => await changeHandler(container));

    const fLinks = fParticles.addFolder("links");

    fLinks.add(container.options.particles.links, "blink").onChange(async () => await changeHandler(container));

    const fLinksColor = fLinks.addFolder("color");

    fLinksColor.addColor(container.options.particles.links.color, "value").onChange(async () => await changeHandler(container));

    fLinks.add(container.options.particles.links, "consent").onChange(async () => await changeHandler(container));
    fLinks.add(container.options.particles.links, "distance").min(0).max(500).onChange(async () => await changeHandler(container));
    fLinks.add(container.options.particles.links, "enable").onChange(async () => await changeHandler(container));

    if (container.options.particles.links.id !== undefined) {
        fLinks.add(container.options.particles.links, "id").onChange(async () => await changeHandler(container));
    }

    fLinks.add(container.options.particles.links, "opacity").min(0).max(1).step(0.01).onChange(async () => await changeHandler(container));

    const fLinksShadow = fLinks.addFolder("shadow");

    fLinksShadow.add(container.options.particles.links.shadow, "blur").min(0).max(10).step(0.5).onChange(async () => await changeHandler(container));

    const fLinksShadowColor = fLinksShadow.addFolder("color");

    fLinksShadowColor.addColor(container.options.particles.links.shadow.color, "value").onChange(async () => await changeHandler(container));

    fLinksShadow.add(container.options.particles.links.shadow, "enable").onChange(async () => await changeHandler(container));

    const fLinksTriangles = fLinks.addFolder("triangles");

    if (container.options.particles.links.triangles.color) {
        const fLinksTrianglesColor = fLinksTriangles.addFolder("color");

        fLinksTrianglesColor.addColor(container.options.particles.links.triangles.color, "value").onChange(async () => await changeHandler(container));
    }

    fLinksTriangles.add(container.options.particles.links.triangles, "enable").onChange(async () => await changeHandler(container));

    if (container.options.particles.links.triangles.opacity !== undefined) {
        fLinksTriangles.add(container.options.particles.links.triangles, "opacity").min(0).max(1).step(0.01).onChange(async () => await changeHandler(container));
    }

    fLinks.add(container.options.particles.links, "warp").onChange(async () => await changeHandler(container));
    fLinks.add(container.options.particles.links, "width").min(0).max(50).step(0.1).onChange(async () => await changeHandler(container));

    const fMove = fParticles.addFolder("move");

    fMove.add(container.options.particles.move, "angle").min(0).max(360).onChange(async () => await changeHandler(container));

    const fMoveAttract = fMove.addFolder("attract");

    fMoveAttract.add(container.options.particles.move.attract, "enable").onChange(async () => await changeHandler(container));

    const fMoveAttractRotate = fMoveAttract.addFolder("rotate");

    fMoveAttractRotate.add(container.options.particles.move.attract.rotate, "x").min(-360).max(360).onChange(async () => await changeHandler(container));
    fMoveAttractRotate.add(container.options.particles.move.attract.rotate, "y").min(-360).max(360).onChange(async () => await changeHandler(container));

    fMove.add(container.options.particles.move, "direction", [
        "none",
        "bottom",
        "bottomLeft",
        "bottomRight",
        "left",
        "right",
        "top",
        "topLeft",
        "topRight"
    ]).onChange(async () => await changeHandler(container));

    fMove.add(container.options.particles.move, "enable").onChange(async () => await changeHandler(container));

    const fMoveNoise = fMove.addFolder("noise");

    const fNoiseDelay = fMoveNoise.addFolder("delay");

    const fNoiseRandom = fMoveNoise.addFolder("random");

    fNoiseRandom.add(container.options.particles.move.noise.delay.random, "enable").onChange(async () => await changeHandler(container));
    fNoiseRandom.add(container.options.particles.move.noise.delay.random, "minimumValue").min(0).max(5).step(0.01).onChange(async () => await changeHandler(container));
    fNoiseDelay.add(container.options.particles.move.noise.delay, "value").min(0).max(5).step(0.01).onChange(async () => await changeHandler(container));
    fMoveNoise.add(container.options.particles.move.noise, "enable").onChange(async () => await changeHandler(container));

    fMove.add(container.options.particles.move, "outMode", [
        "out",
        "bounceVertical",
        "bounceHorizontal",
        "bounce",
        "destroy"
    ]).onChange(async () => await changeHandler(container));

    fMove.add(container.options.particles.move, "random").onChange(async () => await changeHandler(container));
    fMove.add(container.options.particles.move, "speed").min(0).max(100).onChange(async () => await changeHandler(container));
    fMove.add(container.options.particles.move, "straight").onChange(async () => await changeHandler(container));

    const fMoveTrail = fMove.addFolder("trail");

    fMoveTrail.add(container.options.particles.move.trail, "enable").onChange(async () => await changeHandler(container));

    const fTrailFillColor = fMoveTrail.addFolder("fillColor");

    fTrailFillColor.addColor(container.options.particles.move.trail.fillColor, "value").onChange(async () => await changeHandler(container));

    fMoveTrail.add(container.options.particles.move.trail, "length").onChange(async () => await changeHandler(container));

    fMove.add(container.options.particles.move, "vibrate").onChange(async () => await changeHandler(container));
    fMove.add(container.options.particles.move, "warp").onChange(async () => await changeHandler(container));

    const fNumber = fParticles.addFolder("number");

    const fNumberDensity = fNumber.addFolder("density");

    fNumberDensity.add(container.options.particles.number.density, "area").min(0).onChange(async () => await changeHandler(container));
    fNumberDensity.add(container.options.particles.number.density, "enable").onChange(async () => await changeHandler(container));
    fNumberDensity.add(container.options.particles.number.density, "factor").min(0).onChange(async () => await changeHandler(container));

    fNumber.add(container.options.particles.number, "limit").min(0).onChange(async () => await changeHandler(container));
    fNumber.add(container.options.particles.number, "value").min(0).onChange(async () => await changeHandler(container));

    const fOpacity = fParticles.addFolder("opacity");

    const fOpacityAnimation = fOpacity.addFolder("animation");

    fOpacityAnimation.add(container.options.particles.opacity.animation, "enable").onChange(async () => await changeHandler(container));
    fOpacityAnimation.add(container.options.particles.opacity.animation, "minimumValue").min(0).max(1).step(0.01).onChange(async () => await changeHandler(container));
    fOpacityAnimation.add(container.options.particles.opacity.animation, "speed").min(0).max(100).onChange(async () => await changeHandler(container));
    fOpacityAnimation.add(container.options.particles.opacity.animation, "sync").onChange(async () => await changeHandler(container));

    const fOpacityRandom = fOpacity.addFolder("random");

    fOpacityRandom.add(container.options.particles.opacity.random, "enable").onChange(async () => await changeHandler(container));
    fOpacityRandom.add(container.options.particles.opacity.random, "minimumValue").min(0).max(1).step(0.01).onChange(async () => await changeHandler(container));

    fOpacity.add(container.options.particles.opacity, "value").min(0).max(1).step(0.01).onChange(async () => await changeHandler(container));

    const fRotate = fParticles.addFolder("rotate");

    const fRotateAnimation = fRotate.addFolder("animation");

    fRotateAnimation.add(container.options.particles.rotate.animation, "enable").onChange(async () => await changeHandler(container));
    fRotateAnimation.add(container.options.particles.rotate.animation, "speed").min(0).max(100).onChange(async () => await changeHandler(container));
    fRotateAnimation.add(container.options.particles.rotate.animation, "sync").onChange(async () => await changeHandler(container));

    fRotate.add(container.options.particles.rotate, "direction", [
        "clockwise",
        "counterClockwise",
        "random"
    ]).onChange(async () => await changeHandler(container));
    fRotate.add(container.options.particles.rotate, "random").onChange(async () => await changeHandler(container));
    fRotate.add(container.options.particles.rotate, "value").min(0).max(360).onChange(async () => await changeHandler(container));

    const fShadow = fParticles.addFolder("shadow");

    fShadow.add(container.options.particles.shadow, "blur").min(0).max(20).step(0.05).onChange(async () => await changeHandler(container));

    const fShadowColor = fShadow.addFolder("color");

    fShadowColor.addColor(container.options.particles.shadow.color, "value").onChange(async () => await changeHandler(container));

    fShadow.add(container.options.particles.shadow, "enable").onChange(async () => await changeHandler(container));

    const fShadowOffset = fShadow.addFolder("offset");

    fShadowOffset.add(container.options.particles.shadow.offset, "x").min(-100).max(100).onChange(async () => await changeHandler(container));
    fShadowOffset.add(container.options.particles.shadow.offset, "y").min(-100).max(100).onChange(async () => await changeHandler(container));

    // TODO shape
    // TODO size
    // TODO stroke
    // TODO twinkle
}