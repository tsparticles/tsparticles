import { RecursivePartial } from "../../Types/RecursivePartial";
import { IOptions } from "../../Interfaces/Options/IOptions";
import { MoveDirection } from "../../Enums/MoveDirection";
import { OutMode } from "../../Enums/OutMode";
import { PresetType } from "../../Enums/PresetType";
import { ShapeType } from "../../Enums/ShapeType";
import { HoverMode } from "../../Enums/Modes/HoverMode";

export class Presets {
    public static getPreset(key: PresetType): RecursivePartial<IOptions> | undefined {
        return this.available[key.toString()];
    }

    private static get available(): { [key: string]: RecursivePartial<IOptions> } {
        return {
            [PresetType.basic]: this.basic,
            [PresetType.backgroundMask]: this.backgroundMask,
            [PresetType.fontAwesome]: this.fontAwesome,
            [PresetType.snow]: this.snow,
            [PresetType.bouncing]: this.bouncing,
            [PresetType.stars]: this.stars,
        }
    }

    private static get basic(): RecursivePartial<IOptions> {
        return {
            particles: {
                color: {
                    value: "#ffffff",
                },
                lineLinked: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outMode: OutMode.out,
                    speed: 2,
                },
            },
        };
    }

    private static get backgroundMask(): RecursivePartial<IOptions> {
        return {
            particles: {
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: ShapeType.circle,
                },
                opacity: {
                    value: 1,
                    random: false,
                },
                size: {
                    value: 30,
                    random: true,
                },
                lineLinked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 1,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: MoveDirection.none,
                    random: false,
                    straight: false,
                    outMode: OutMode.out,
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: HoverMode.bubble,
                    },
                },
                modes: {
                    bubble: {
                        distance: 400,
                        size: 100,
                        duration: 2,
                        opacity: 1,
                    },
                },
            },
            backgroundMask: {
                enable: true,
                cover: {
                    value: {
                        r: 255,
                        g: 255,
                        b: 255,
                    },
                },
            },
        };
    }

    private static get fontAwesome(): RecursivePartial<IOptions> {
        return {
            particles: {
                shape: {
                    character: {
                        fill: true,
                        font: "Font Awesome 5 Free",
                        style: "",
                        weight: "400",
                    },
                    type: ShapeType.character,
                },
                size: {
                    random: false,
                    value: 16,
                },
            },
        };
    }

    private static get snow(): RecursivePartial<IOptions> {
        return {
            particles: {
                color: {
                    value: "#fff",
                },
                move: {
                    bounce: false,
                    direction: MoveDirection.bottom,
                    enable: true,
                    out_mode: OutMode.out,
                    random: false,
                    speed: 2,
                    straight: false,
                },
                opacity: {
                    random: true,
                    value: 0.5,
                },
                shape: {
                    type: ShapeType.circle,
                },
                size: {
                    random: true,
                    value: 10,
                },
            },
        };
    }

    private static get bouncing(): RecursivePartial<IOptions> {
        return {
            particles: {
                move: {
                    outMode: OutMode.bounce,
                },
            },
        };
    }

    private static get stars(): RecursivePartial<IOptions> {
        return {
            particles: {
                color: { value: "#ffffff" },
                line_linked: {
                    enable: false,
                },
                move: {
                    bounce: false,
                    direction: MoveDirection.none,
                    enable: true,
                    outMode: OutMode.out,
                    random: true,
                    speed: 0.3,
                    straight: false,
                },
                opacity: {
                    anim: {
                        enable: true,
                        opacity_min: 0,
                        speed: 1,
                        sync: false
                    },
                    random: true,
                    value: 1,
                },
                shape: {
                    type: ShapeType.circle,
                },
                size: {
                    random: true,
                    value: 3,
                },
            },
        };
    }
}
