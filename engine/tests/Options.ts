import { describe, it } from "mocha";
import { Options } from "../src/Options/Classes/Options";
import { expect } from "chai";
import {
    ClickMode,
    CollisionMode,
    HoverMode,
    InteractivityDetect,
    MoveDirection,
    OutMode,
    RotateDirection,
} from "../src";
import { ParticlesOptions } from "../src/Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../src";
import { IParticles } from "../src/Options/Interfaces/Particles/IParticles";
import { OptionsColor } from "../src/Options/Classes/OptionsColor";

describe("Options tests", () => {
    it("checking default options", () => {
        const options = new Options();

        /* background */
        expect(options.background.color).to.include({ value: "" });
        expect(options.background.image).to.be.equal("");
        expect(options.background.position).to.be.equal("");
        expect(options.background.repeat).to.be.equal("");
        expect(options.background.size).to.be.equal("");
        expect(options.background.opacity).to.be.equal(1);

        /* background mask */
        expect(options.backgroundMask.cover)
            .to.be.an("object")
            .to.have.property("color")
            .to.be.an("object")
            .to.have.property("value")
            .to.equal("#fff");
        expect(options.backgroundMask.cover).to.be.an("object").to.have.property("opacity").to.equal(1);
        expect(options.backgroundMask.enable).to.be.false;

        /* detect retina */
        expect(options.detectRetina).to.be.true;

        /* fps limit */
        expect(options.fpsLimit).to.equal(60);

        /* interactivity */
        expect(options.interactivity.detectsOn).to.equal(InteractivityDetect.window);

        /* interactivity events */
        expect(options.interactivity.events.onClick.enable).to.be.false;
        expect(options.interactivity.events.onClick.mode).to.be.empty;
        expect(options.interactivity.events.onHover.enable).to.be.false;
        expect(options.interactivity.events.onHover.mode).to.be.empty;
        expect(options.interactivity.events.onHover.parallax.enable).to.be.false;
        expect(options.interactivity.events.onHover.parallax.force).to.equal(2);
        expect(options.interactivity.events.onHover.parallax.smooth).to.equal(10);
        expect(options.interactivity.events.resize).to.be.true;

        /* interactivity modes */
        expect(options.interactivity.modes.bubble.color).to.be.undefined;
        expect(options.interactivity.modes.bubble.distance).to.equal(200);
        expect(options.interactivity.modes.bubble.duration).to.equal(0.4);
        expect(options.interactivity.modes.bubble.opacity).to.be.undefined;
        expect(options.interactivity.modes.bubble.size).to.be.undefined;
        expect(options.interactivity.modes.connect.distance).to.equal(80);
        expect(options.interactivity.modes.connect.links.opacity).to.equal(0.5);
        expect(options.interactivity.modes.connect.radius).to.equal(60);
        expect(options.interactivity.modes.grab.distance).to.equal(100);
        expect(options.interactivity.modes.grab.links.opacity).to.equal(1);
        expect(options.interactivity.modes.push.quantity).to.equal(4);
        expect(options.interactivity.modes.remove.quantity).to.equal(2);
        expect(options.interactivity.modes.repulse.distance).to.equal(200);
        expect(options.interactivity.modes.repulse.duration).to.equal(0.4);
        expect(options.interactivity.modes.slow.factor).to.equal(3);
        expect(options.interactivity.modes.slow.radius).to.equal(200);

        /* particles */
        /* particles collisions */
        expect(options.particles.collisions.enable).to.be.false;
        expect(options.particles.collisions.mode).to.equal(CollisionMode.bounce);

        /* particles color */
        expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#fff");

        /* particles line linked */
        expect(options.particles.links.blink).to.be.false;
        expect(options.particles.links.color).to.be.an("object").to.have.property("value").to.equal("#fff");
        expect(options.particles.links.consent).to.be.false;
        expect(options.particles.links.distance).to.equal(100);
        expect(options.particles.links.enable).to.be.false;
        expect(options.particles.links.opacity).to.equal(1);
        expect(options.particles.links.shadow.blur).to.equal(5);
        expect(options.particles.links.shadow.color).to.be.an("object").to.have.property("value").to.equal("#fff");
        expect(options.particles.links.shadow.enable).to.be.false;
        expect(options.particles.links.width).to.equal(1);

        /* particles move */
        expect(options.particles.move.attract.enable).to.be.false;
        expect(options.particles.move.attract.rotate.x).to.equal(3000);
        expect(options.particles.move.attract.rotate.y).to.equal(3000);
        expect(options.particles.move.direction).to.equal(MoveDirection.none);
        expect(options.particles.move.enable).to.be.false;
        expect(options.particles.move.outModes.default).to.equal(OutMode.out);
        expect(options.particles.move.random).to.be.false;
        expect(options.particles.move.speed).to.equal(2);
        expect(options.particles.move.straight).to.be.false;
        expect(options.particles.move.trail.fillColor).to.be.an("object").to.have.property("value").to.equal("#000000");
        expect(options.particles.move.trail.enable).to.be.false;
        expect(options.particles.move.trail.length).to.equal(10);

        /* particles number */
        expect(options.particles.number.density.area).to.equal(800);
        expect(options.particles.number.density.enable).to.be.false;
        expect(options.particles.number.limit).to.equal(0);
        expect(options.particles.number.value).to.equal(100);

        /* particles opacity */
        expect(options.particles.opacity.animation.enable).to.be.false;
        expect(options.particles.opacity.animation.speed).to.equal(2);
        expect(options.particles.opacity.animation.sync).to.be.false;
        expect(options.particles.opacity.value).to.equal(1);

        /* particles rotate */
        expect(options.particles.rotate.animation.enable).to.be.false;
        expect(options.particles.rotate.animation.speed).to.equal(0);
        expect(options.particles.rotate.animation.sync).to.be.false;
        expect(options.particles.rotate.direction).to.equal(RotateDirection.clockwise);
        expect(options.particles.rotate.value).to.be.equal(0);

        /* particles shadow */
        expect(options.particles.shadow.blur).to.equal(0);
        expect(options.particles.shadow.color).to.be.an("object").to.have.property("value").to.equal("#000000");
        expect(options.particles.shadow.enable).to.be.false;
        expect(options.particles.shadow.offset.x).to.equal(0);
        expect(options.particles.shadow.offset.y).to.equal(0);

        /* particles shape */
        expect(options.particles.shape.type).to.equal("circle");

        /* particles size */
        expect(options.particles.size.animation.enable).to.be.false;
        expect(options.particles.size.animation.speed).to.equal(5);
        expect(options.particles.size.animation.sync).to.be.false;
        expect(options.particles.size.value).to.equal(3);

        /* particles stroke */
        expect(options.particles.stroke).to.be.an("object").to.have.property("width").to.equal(0);

        /* pause on blur */
        expect(options.pauseOnBlur).to.be.true;

        /** pause on Element Outside Viewport*/
        expect(options.pauseOnOutsideViewport).to.be.true;
    });

    it("check default preset options", () => {
        const options = new Options();
        const preset = {
            background: {
                color: "#0d47a1",
            },
            interactivity: {
                detectsOn: InteractivityDetect.canvas,
                events: {
                    onClick: {
                        enable: true,
                        mode: ClickMode.push,
                    },
                    onHover: {
                        enable: true,
                        mode: HoverMode.repulse,
                    },
                    resize: true,
                },
                modes: {
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 0.8,
                    },
                    grab: {
                        distance: 400,
                        links: {
                            opacity: 1,
                        },
                    },
                    push: {
                        quantity: 4,
                    },
                    remove: {
                        quantity: 2,
                    },
                    repulse: {
                        distance: 200,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: MoveDirection.none,
                    random: false,
                    straight: false,
                    outModes: OutMode.out,
                    attract: {
                        enable: false,
                        rotate: {
                            x: 600,
                            y: 1200,
                        },
                    },
                },
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        area: 800,
                    },
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                    animation: {
                        enable: true,
                        speed: 3,
                        sync: false,
                    },
                },
                size: {
                    value: { min: 0.1, max: 5 },
                    random: true,
                    animation: {
                        enable: true,
                        speed: 20,
                        sync: false,
                    },
                },
            },
            detectRetina: true,
        };

        options.load(preset);

        /* background */
        expect(options.background.color).to.be.an("object").to.have.property("value").to.equal("#0d47a1");

        /* detect retina */
        expect(options.detectRetina).to.be.true;

        /* interactivity */
        expect(options.interactivity.detectsOn).to.equal(InteractivityDetect.canvas);

        /* interactivity events */
        expect(options.interactivity.events.onClick.enable).to.be.true;
        expect(options.interactivity.events.onClick.mode).to.equal(ClickMode.push);
        expect(options.interactivity.events.onHover.enable).to.be.true;
        expect(options.interactivity.events.onHover.mode).to.equal(HoverMode.repulse);
        expect(options.interactivity.events.resize).to.be.true;

        /* interactivity modes */
        expect(options.interactivity.modes.bubble.distance).to.equal(400);
        expect(options.interactivity.modes.bubble.duration).to.equal(2);
        expect(options.interactivity.modes.bubble.opacity).to.equal(0.8);
        expect(options.interactivity.modes.bubble.size).to.equal(40);
        expect(options.interactivity.modes.grab.distance).to.equal(400);
        expect(options.interactivity.modes.grab.links.opacity).to.equal(1);
        expect(options.interactivity.modes.push.quantity).to.equal(4);
        expect(options.interactivity.modes.remove.quantity).to.equal(2);
        expect(options.interactivity.modes.repulse.distance).to.equal(200);

        /* particles */
        /* particles color */
        expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#ffffff");

        /* particles line linked */
        expect(options.particles.links.color).to.be.an("object").to.have.property("value").to.equal("#ffffff");
        expect(options.particles.links.distance).to.equal(150);
        expect(options.particles.links.enable).to.be.true;
        expect(options.particles.links.opacity).to.equal(0.4);
        expect(options.particles.links.width).to.equal(1);

        /* particles move */
        expect(options.particles.move.attract.enable).to.be.false;
        expect(options.particles.move.attract.rotate.x).to.equal(600);
        expect(options.particles.move.attract.rotate.y).to.equal(1200);
        expect(options.particles.move.direction).to.equal(MoveDirection.none);
        expect(options.particles.move.enable).to.be.true;
        expect(options.particles.move.outModes.default).to.equal(OutMode.out);
        expect(options.particles.move.random).to.be.false;
        expect(options.particles.move.speed).to.equal(2);
        expect(options.particles.move.straight).to.be.false;

        /* particles number */
        expect(options.particles.number.density.area).to.equal(800);
        expect(options.particles.number.density.enable).to.be.true;
        expect(options.particles.number.value).to.equal(80);

        /* particles opacity */
        expect(options.particles.opacity.animation.enable).to.be.true;
        expect(options.particles.opacity.animation.speed).to.equal(3);
        expect(options.particles.opacity.animation.sync).to.be.false;
        expect(options.particles.opacity.value).to.be.an("object").to.have.property("max").to.be.equal(0.5);
        expect(options.particles.opacity.value).to.be.an("object").and.to.have.property("min").to.be.equal(0.1);

        /* particles shape */
        expect(options.particles.shape.type).to.equal("circle");

        /* particles size */
        expect(options.particles.size.animation.enable).to.be.true;
        expect(options.particles.size.animation.speed).to.equal(20);
        expect(options.particles.size.animation.sync).to.be.false;
        expect(options.particles.size.value).to.be.an("object").to.have.property("max").to.be.equal(5);
        expect(options.particles.size.value).to.be.an("object").and.to.have.property("min").to.be.equal(0.1);
    });

    it("check test preset options", () => {
        const options = new Options();
        const preset = {
            background: {
                color: "#0d47a1",
            },
            interactivity: {
                detectsOn: InteractivityDetect.canvas,
                events: {
                    onClick: {
                        enable: true,
                        mode: ClickMode.repulse,
                    },
                    onHover: {
                        enable: false,
                        mode: HoverMode.grab,
                    },
                    resize: true,
                },
                modes: {
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                    },
                    grab: {
                        distance: 200,
                        links: {
                            opacity: 1,
                        },
                    },
                    repulse: {
                        distance: 200,
                    },
                    push: {
                        quantity: 4,
                    },
                    remove: {
                        quantity: 2,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    enable: false,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: MoveDirection.none,
                    random: false,
                    straight: false,
                    outModes: OutMode.bounce,
                    bounce: false,
                    attract: {
                        enable: false,
                        rotate: {
                            x: 600,
                            y: 1200,
                        },
                    },
                },
                number: {
                    value: 100,
                    density: {
                        enable: false,
                        area: 800,
                    },
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    animation: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: { min: 1, max: 4 },
                    animation: {
                        enable: false,
                        speed: 40,
                        sync: false,
                    },
                },
            },
            detectRetina: true,
        };

        options.load(preset);

        /* background */
        expect(options.background.color).to.be.an("object").to.have.property("value").to.equal("#0d47a1");

        /* detect retina */
        expect(options.detectRetina).to.be.true;

        /* interactivity */
        expect(options.interactivity.detectsOn).to.equal(InteractivityDetect.canvas);

        /* interactivity events */
        expect(options.interactivity.events.onClick.enable).to.be.true;
        expect(options.interactivity.events.onClick.mode).to.equal(ClickMode.repulse);
        expect(options.interactivity.events.onHover.enable).to.be.false;
        expect(options.interactivity.events.onHover.mode).to.equal(HoverMode.grab);
        expect(options.interactivity.events.resize).to.be.true;

        /* interactivity modes */
        expect(options.interactivity.modes.bubble.distance).to.equal(400);
        expect(options.interactivity.modes.bubble.duration).to.equal(2);
        expect(options.interactivity.modes.bubble.opacity).to.equal(8);
        expect(options.interactivity.modes.bubble.size).to.equal(40);
        expect(options.interactivity.modes.grab.distance).to.equal(200);
        expect(options.interactivity.modes.grab.links.opacity).to.equal(1);
        expect(options.interactivity.modes.push.quantity).to.equal(4);
        expect(options.interactivity.modes.remove.quantity).to.equal(2);
        expect(options.interactivity.modes.repulse.distance).to.equal(200);

        /* particles */
        /* particles collisions */
        expect(options.particles.collisions.enable).to.be.false;
        expect(options.particles.collisions.mode).to.equal(CollisionMode.bounce);

        /* particles color */
        expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#ffffff");

        /* particles line linked */
        expect(options.particles.links.color).to.be.an("object").to.have.property("value").to.equal("#ffffff");
        expect(options.particles.links.distance).to.equal(150);
        expect(options.particles.links.enable).to.be.false;
        expect(options.particles.links.opacity).to.equal(0.4);
        expect(options.particles.links.width).to.equal(1);

        /* particles move */
        expect(options.particles.move.attract.enable).to.be.false;
        expect(options.particles.move.attract.rotate.x).to.equal(600);
        expect(options.particles.move.attract.rotate.y).to.equal(1200);
        expect(options.particles.move.direction).to.equal(MoveDirection.none);
        expect(options.particles.move.enable).to.be.true;
        expect(options.particles.move.outModes.default).to.equal(OutMode.bounce);
        expect(options.particles.move.random).to.be.false;
        expect(options.particles.move.speed).to.equal(2);
        expect(options.particles.move.straight).to.be.false;
        expect(options.particles.move.trail.fillColor).to.be.an("object").to.have.property("value").to.equal("#000000");
        expect(options.particles.move.trail.enable).to.be.false;
        expect(options.particles.move.trail.length).to.equal(10);

        /* particles number */
        expect(options.particles.number.density.area).to.equal(800);
        expect(options.particles.number.density.enable).to.be.false;
        expect(options.particles.number.value).to.equal(100);

        /* particles opacity */
        expect(options.particles.opacity.animation.enable).to.be.false;
        expect(options.particles.opacity.animation.speed).to.equal(1);
        expect(options.particles.opacity.animation.sync).to.be.false;
        expect(options.particles.opacity.value).to.equal(0.5);

        /* particles shape */
        expect(options.particles.shape.type).to.equal("circle");

        /* particles size */
        expect(options.particles.size.animation.enable).to.be.false;
        expect(options.particles.size.animation.speed).to.equal(40);
        expect(options.particles.size.animation.sync).to.be.false;
        expect(options.particles.size.value).to.be.an("object").to.have.property("max").to.be.equal(4);
        expect(options.particles.size.value).to.be.an("object").and.to.have.property("min").to.be.equal(1);

        /* particles stroke */
        /*expect(options.particles.stroke)
            .to.be.an("object")
            .to.have.property("color")
            .to.be.an("object")
            .to.have.property("value")
            .to.equal("#000000");*/
        expect(options.particles.stroke).to.be.an("object").to.have.property("width").to.equal(0);
    });

    it("check particlesOptions override", () => {
        const particlesOptions = new ParticlesOptions();

        const generalOptions: RecursivePartial<IParticles> = {
            number: {
                value: 100,
                density: {
                    enable: false,
                    area: 800,
                },
            },
            color: {
                value: "#000",
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: 0.5,
                animation: {
                    enable: false,
                    speed: 1,
                    sync: false,
                },
            },
            size: {
                value: { min: 0.1, max: 5 },
                animation: {
                    enable: false,
                    speed: 40,
                    sync: false,
                },
            },
            links: {
                enable: true,
                distance: 150,
                color: "#000",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
                direction: MoveDirection.none,
                random: false,
                straight: false,
                outModes: OutMode.out,
                attract: {
                    enable: false,
                    rotate: {
                        x: 600,
                        y: 1200,
                    },
                },
            },
        };

        particlesOptions.load(generalOptions);

        const emitterOptions: RecursivePartial<IParticles> = {
            color: { value: "#f0f" },
            links: { enable: false },
            move: { speed: 20, random: false, outModes: OutMode.destroy },
            opacity: { value: 1 },
            rotate: {
                value: { min: 0, max: 360 },
                direction: RotateDirection.clockwise,
                animation: { enable: true, speed: 15, sync: false },
            },
            shape: { type: "star", options: { star: { sides: 7 } } },
            size: { value: 15 },
        };

        particlesOptions.load(emitterOptions);

        expect(particlesOptions).to.not.include(generalOptions).and.include(emitterOptions);
    });

    it("check color options override", () => {
        const colorOptions = new OptionsColor();

        colorOptions.load({
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
        });

        const otherOptions = new OptionsColor();

        const copyOptions = OptionsColor.create(otherOptions, colorOptions);

        const copyOptions2 = OptionsColor.create(otherOptions, copyOptions);

        expect(colorOptions.value).to.be.an("array");
        expect(copyOptions.value).to.be.an("array");
        expect(copyOptions2.value).to.be.an("array");
    });
});
