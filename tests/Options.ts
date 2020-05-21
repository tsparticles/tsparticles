import { Options } from '../src/Options/Classes/Options';
import { expect } from 'chai';
import { InteractivityDetect } from "../src/Enums/InteractivityDetect";
import { MoveDirection } from "../src/Enums/MoveDirection";
import { OutMode } from "../src/Enums/OutMode";
import { HoverMode } from "../src/Enums/Modes/HoverMode";
import { ClickMode } from "../src/Enums/Modes/ClickMode";
import { RotateDirection } from "../src/Enums/RotateDirection";
import { ShapeType } from "../src/Enums/ShapeType";
import { PolygonMaskInlineArrangement } from "../src/Enums/PolygonMaskInlineArrangement";
import { PolygonMaskMoveType } from "../src/Enums/PolygonMaskMoveType";
import { PolygonMaskType } from "../src/Enums/PolygonMaskType";
import { CollisionMode } from "../src/Enums/CollisionMode";
import { Particles } from "../src/Options/Classes/Particles/Particles";
import { RecursivePartial } from "../src/Types/RecursivePartial";
import { IParticles } from "../src/Options/Interfaces/Particles/IParticles";

describe('Options tests', () => {
    it('checking default options', () => {
        const options = new Options();

        /* background */
        expect(options.background.color).to.be.undefined;
        expect(options.background.image).to.be.undefined;
        expect(options.background.position).to.be.undefined;
        expect(options.background.repeat).to.be.undefined;
        expect(options.background.size).to.be.undefined;
        expect(options.background.opacity).to.be.undefined;

        /* background mask */
        expect(options.backgroundMask.cover).to.be.an("object").to.have.property("color").to.be.an("object").to.have.property("value").to.equal("#fff");
        expect(options.backgroundMask.cover).to.be.an("object").to.have.property("opacity").to.equal(1);
        expect(options.backgroundMask.enable).to.be.false;

        /* detect retina */
        expect(options.detectRetina).to.be.false;

        /* fps limit */
        expect(options.fpsLimit).to.equal(30);

        /* interactivity */
        expect(options.interactivity.detectsOn).to.equal(InteractivityDetect.canvas);

        /* interactivity events */
        expect(options.interactivity.events.onClick.enable).to.be.false;
        expect(options.interactivity.events.onClick.mode).to.be.empty;
        expect(options.interactivity.events.onDiv.elementId).to.be.empty;
        expect(options.interactivity.events.onDiv.enable).to.be.false;
        expect(options.interactivity.events.onDiv.mode).to.be.empty;
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
        expect(options.interactivity.modes.connect.lineLinked.opacity).to.equal(0.5);
        expect(options.interactivity.modes.connect.radius).to.equal(60);
        expect(options.interactivity.modes.emitters).to.be.empty;
        expect(options.interactivity.modes.grab.distance).to.equal(100);
        expect(options.interactivity.modes.grab.lineLinked.opacity).to.equal(1);
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
        expect(options.particles.lineLinked.blink).to.be.false;
        expect(options.particles.lineLinked.color).to.be.an("object").to.have.property("value").to.equal("#fff");
        expect(options.particles.lineLinked.consent).to.be.false;
        expect(options.particles.lineLinked.distance).to.equal(100);
        expect(options.particles.lineLinked.enable).to.be.false;
        expect(options.particles.lineLinked.opacity).to.equal(1);
        expect(options.particles.lineLinked.shadow.blur).to.equal(5);
        expect(options.particles.lineLinked.shadow.color).to.be.an("object").to.have.property("value").to.equal("lime");
        expect(options.particles.lineLinked.shadow.enable).to.be.false;
        expect(options.particles.lineLinked.width).to.equal(1);

        /* particles move */
        expect(options.particles.move.attract.enable).to.be.false;
        expect(options.particles.move.attract.rotate.x).to.equal(3000);
        expect(options.particles.move.attract.rotate.y).to.equal(3000);
        expect(options.particles.move.direction).to.equal(MoveDirection.none);
        expect(options.particles.move.enable).to.be.false;
        expect(options.particles.move.outMode).to.equal(OutMode.out);
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
        expect(options.particles.opacity.animation.minimumValue).to.equal(0);
        expect(options.particles.opacity.animation.speed).to.equal(2);
        expect(options.particles.opacity.animation.sync).to.be.false;
        expect(options.particles.opacity.random).to.be.an("object").to.have.property("enable").to.be.false;
        expect(options.particles.opacity.random).to.be.an("object").to.have.property("minimumValue").to.equal(1);
        expect(options.particles.opacity.value).to.equal(1);

        /* particles rotate */
        expect(options.particles.rotate.animation.enable).to.be.false;
        expect(options.particles.rotate.animation.speed).to.equal(0);
        expect(options.particles.rotate.animation.sync).to.be.false;
        expect(options.particles.rotate.direction).to.equal(RotateDirection.clockwise);
        expect(options.particles.rotate.random).to.be.false;
        expect(options.particles.rotate.value).to.equal(0);

        /* particles shadow */
        expect(options.particles.shadow.blur).to.equal(0);
        expect(options.particles.shadow.color).to.be.an("object").to.have.property("value").to.equal("#000000");
        expect(options.particles.shadow.enable).to.be.false;
        expect(options.particles.shadow.offset.x).to.equal(0);
        expect(options.particles.shadow.offset.y).to.equal(0);

        /* particles shape */
        expect(options.particles.shape.options).to.be.an("object").to.include.all.keys(ShapeType.character, ShapeType.char, ShapeType.polygon, ShapeType.star);
        expect(options.particles.shape.type).to.equal(ShapeType.circle);

        /* particles size */
        expect(options.particles.size.animation.enable).to.be.false;
        expect(options.particles.size.animation.minimumValue).to.equal(0);
        expect(options.particles.size.animation.speed).to.equal(5);
        expect(options.particles.size.animation.sync).to.be.false;
        expect(options.particles.size.random).to.be.an("object").to.have.property("enable").to.be.false;
        expect(options.particles.size.random).to.be.an("object").to.have.property("minimumValue").to.equal(1);
        expect(options.particles.size.value).to.equal(3);

        /* particles stroke */
        expect(options.particles.stroke).to.be.an("object").to.have.property("color").to.be.an("object").to.have.property("value").to.equal("#ff0000");
        expect(options.particles.stroke).to.be.an("object").to.have.property("opacity").to.equal(1);
        expect(options.particles.stroke).to.be.an("object").to.have.property("width").to.equal(0);

        /* pause on blur */
        expect(options.pauseOnBlur).to.be.true;

        /* polygon */
        expect(options.polygon.draw.enable).to.be.false;
        expect(options.polygon.draw.stroke.color).to.have.property("value").to.equal("#fff");
        expect(options.polygon.draw.stroke.width).to.equal(0.5);
        expect(options.polygon.draw.stroke.opacity).to.equal(1);
        expect(options.polygon.enable).to.be.false;
        expect(options.polygon.inline.arrangement).to.equal(PolygonMaskInlineArrangement.onePerPoint);
        expect(options.polygon.move.radius).to.equal(10);
        expect(options.polygon.move.type).to.equal(PolygonMaskMoveType.path);
        expect(options.polygon.scale).to.equal(1);
        expect(options.polygon.type).to.equal(PolygonMaskType.none);
        expect(options.polygon.url).to.be.empty;
    });

    it('check default preset options', () => {
        const options = new Options();
        const preset = {
            "background": {
                "color": "#0d47a1"
            },
            "interactivity": {
                "detect_on": InteractivityDetect.canvas,
                "events": {
                    "onclick": {
                        "enable": true,
                        "mode": ClickMode.push
                    },
                    "onhover": {
                        "enable": true,
                        "mode": HoverMode.repulse
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 0.8
                    },
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    },
                    "repulse": {
                        "distance": 200
                    },
                }
            },
            "particles": {
                "color": {
                    "value": "#ffffff"
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": MoveDirection.none,
                    "random": false,
                    "straight": false,
                    "out_mode": OutMode.out,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                },
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 3,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 20,
                        "size_min": 0.1,
                        "sync": false
                    }
                }
            },
            "retina_detect": true,
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
        expect(options.interactivity.modes.grab.lineLinked.opacity).to.equal(1);
        expect(options.interactivity.modes.push.quantity).to.equal(4);
        expect(options.interactivity.modes.remove.quantity).to.equal(2);
        expect(options.interactivity.modes.repulse.distance).to.equal(200);

        /* particles */
        /* particles color */
        expect(options.particles.color).to.be.an("object").to.have.property("value").to.equal("#ffffff");

        /* particles line linked */
        expect(options.particles.lineLinked.color).to.be.an("object").to.have.property("value").to.equal("#ffffff");
        expect(options.particles.lineLinked.distance).to.equal(150);
        expect(options.particles.lineLinked.enable).to.be.true;
        expect(options.particles.lineLinked.opacity).to.equal(0.4);
        expect(options.particles.lineLinked.width).to.equal(1);

        /* particles move */
        expect(options.particles.move.attract.enable).to.be.false;
        expect(options.particles.move.attract.rotate.x).to.equal(600);
        expect(options.particles.move.attract.rotate.y).to.equal(1200);
        expect(options.particles.move.direction).to.equal(MoveDirection.none);
        expect(options.particles.move.enable).to.be.true;
        expect(options.particles.move.outMode).to.equal(OutMode.out);
        expect(options.particles.move.random).to.be.false;
        expect(options.particles.move.speed).to.equal(2);
        expect(options.particles.move.straight).to.be.false;

        /* particles number */
        expect(options.particles.number.density.area).to.equal(800);
        expect(options.particles.number.density.enable).to.be.true;
        expect(options.particles.number.value).to.equal(80);

        /* particles opacity */
        expect(options.particles.opacity.animation.enable).to.be.true;
        expect(options.particles.opacity.animation.minimumValue).to.equal(0.1);
        expect(options.particles.opacity.animation.speed).to.equal(3);
        expect(options.particles.opacity.animation.sync).to.be.false;
        expect(options.particles.opacity.random).to.be.an("object").to.have.property("enable").to.be.true;
        expect(options.particles.opacity.value).to.equal(0.5);

        /* particles shape */
        expect(options.particles.shape.image).to.be.an("object").to.have.property("height").to.equal(100);
        expect(options.particles.shape.image).to.be.an("object").to.have.property("src").to.equal("https://cdn.matteobruni.it/images/particles/github.svg");
        expect(options.particles.shape.image).to.be.an("object").to.have.property("width").to.equal(100);
        expect(options.particles.shape.options).to.be.an("object").to.include.all.keys(ShapeType.character, ShapeType.char, ShapeType.polygon, ShapeType.star);
        expect(options.particles.shape.type).to.equal(ShapeType.circle);

        /* particles size */
        expect(options.particles.size.animation.enable).to.be.true;
        expect(options.particles.size.animation.minimumValue).to.equal(0.1);
        expect(options.particles.size.animation.speed).to.equal(20);
        expect(options.particles.size.animation.sync).to.be.false;
        expect(options.particles.size.random).to.be.an("object").to.have.property("enable").to.be.true;
        expect(options.particles.size.value).to.equal(5);
    });

    it('check test preset options', () => {
        const options = new Options();
        const preset = {
            "background": {
                "color": "#0d47a1"
            },
            "interactivity": {
                "detect_on": InteractivityDetect.canvas,
                "events": {
                    "onclick": {
                        "enable": true,
                        "mode": ClickMode.repulse
                    },
                    "onhover": {
                        "enable": false,
                        "mode": HoverMode.grab
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8
                    },
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "particles": {
                "color": {
                    "value": "#ffffff"
                },
                "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": MoveDirection.none,
                    "random": false,
                    "straight": false,
                    "out_mode": OutMode.bounce,
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                },
                "number": {
                    "value": 100,
                    "density": {
                        "enable": false,
                        "value_area": 800
                    }
                },
                "shape": {
                    "type": ShapeType.circle,
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                }
            },
            "retina_detect": true,
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
        expect(options.interactivity.modes.grab.lineLinked.opacity).to.equal(1);
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
        expect(options.particles.lineLinked.color).to.be.an("object").to.have.property("value").to.equal("#ffffff");
        expect(options.particles.lineLinked.distance).to.equal(150);
        expect(options.particles.lineLinked.enable).to.be.false;
        expect(options.particles.lineLinked.opacity).to.equal(0.4);
        expect(options.particles.lineLinked.width).to.equal(1);

        /* particles move */
        expect(options.particles.move.attract.enable).to.be.false;
        expect(options.particles.move.attract.rotate.x).to.equal(600);
        expect(options.particles.move.attract.rotate.y).to.equal(1200);
        expect(options.particles.move.direction).to.equal(MoveDirection.none);
        expect(options.particles.move.enable).to.be.true;
        expect(options.particles.move.outMode).to.equal(OutMode.bounce);
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
        expect(options.particles.opacity.animation.minimumValue).to.equal(0.1);
        expect(options.particles.opacity.animation.speed).to.equal(1);
        expect(options.particles.opacity.animation.sync).to.be.false;
        expect(options.particles.opacity.random).to.be.an("object").to.have.property("enable").to.be.false;
        expect(options.particles.opacity.value).to.equal(0.5);

        /* particles shape */
        expect(options.particles.shape.image).to.be.an("object").to.have.property("height").to.equal(100);
        expect(options.particles.shape.image).to.be.an("object").to.have.property("src").to.equal("https://cdn.matteobruni.it/images/particles/github.svg");
        expect(options.particles.shape.image).to.be.an("object").to.have.property("width").to.equal(100);
        expect(options.particles.shape.options).to.be.an("object").to.include.all.keys(ShapeType.character, ShapeType.char, ShapeType.polygon, ShapeType.star);
        expect(options.particles.shape.type).to.equal(ShapeType.circle);

        /* particles size */
        expect(options.particles.size.animation.enable).to.be.false;
        expect(options.particles.size.animation.minimumValue).to.equal(0.1);
        expect(options.particles.size.animation.speed).to.equal(40);
        expect(options.particles.size.animation.sync).to.be.false;
        expect(options.particles.size.random).to.be.an("object").to.have.property("enable").to.be.true;
        expect(options.particles.size.value).to.equal(4);

        /* particles stroke */
        expect(options.particles.stroke).to.be.an("object").to.have.property("color").to.be.an("object").to.have.property("value").to.equal("#000000");
        expect(options.particles.stroke).to.be.an("object").to.have.property("width").to.equal(0);
    });

    it('check particlesOptions override', () => {
        const particlesOptions = new Particles();

        const generalOptions: RecursivePartial<IParticles> = {
            "number": {
                "value": 100,
                "density": {
                    "enable": false,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#000"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "https://cdn.matteobruni.it/images/particles/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#000",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": MoveDirection.none,
                "random": false,
                "straight": false,
                "out_mode": OutMode.out,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        };

        particlesOptions.load(generalOptions);

        const emitterOptions: RecursivePartial<IParticles> = {
            color: { value: "#f0f" },
            lineLinked: { enable: false },
            move: { speed: 20, random: false, outMode: OutMode.destroy },
            opacity: { value: 1 },
            rotate: {
                value: 0,
                random: true,
                direction: RotateDirection.clockwise,
                animation: { enable: true, speed: 15, sync: false },
            },
            shape: { type: "star", polygon: { sides: 7 } },
            size: { value: 15, random: false }

        };

        particlesOptions.load(emitterOptions);

        expect(particlesOptions).to.not.include(generalOptions).and.include(emitterOptions);
    });
});
