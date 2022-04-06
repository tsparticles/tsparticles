import react from "../public/assets/react.svg";
import k8s from "../public/assets/k8s.svg";
import code from "../public/assets/code.png";
import smallDeer from "../public/assets/small-deer.svg";
import { MoveDirection, OutMode, HoverMode, ClickMode } from "tsparticles-engine";
import {
    PolygonMaskType,
    PolygonMaskInlineArrangement
} from "tsparticles-plugin-polygon-mask";
import type { ISourceOptions } from "tsparticles-engine";

export type TFrame = {
    backgroundColor: string;
    name: string;
    options?: ISourceOptions;
    slug: string;
};

export const frames: TFrame[] = [
    {
        backgroundColor: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
        name: 'Simple',
        options: {
            fpsLimit: 120,
            particles: {
                number: {
                    value: 50
                },
                size: {
                    value: 3
                },
                move: {
                    enable: true
                },
                links: {
                    enable: true
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: HoverMode.repulse
                    }
                }
            }
        },
        slug: 'simple',
    },
    {
        backgroundColor: '#232741',
        name: 'Bubbles',
        options: {
            fpsLimit: 120,
            particles: {
                number: {
                    value: 160,
                    density: {
                        enable: false
                    }
                },
                size: {
                    value: { min: .3, max: 3 },
                    animation: {
                        speed: 4,
                    }
                },
                links: {
                    enable: false
                },
                move: {
                    enable: true,
                    random: true,
                    speed: 1,
                    direction: MoveDirection.top,
                    outModes: OutMode.out
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: HoverMode.bubble
                    },
                    onClick: {
                        enable: true,
                        mode: ClickMode.repulse
                    },
                },
                modes: {
                    bubble: {
                        distance: 250,
                        duration: 2,
                        size: 0,
                        opacity: 0
                    },
                    repulse: {
                        distance: 400,
                        duration: 4
                    }
                }
            }
        },
        slug: 'bubbles'
    },
    {
        backgroundColor: 'linear-gradient(to bottom, #a90329 0%,#8f0222 44%,#6d0019 100%)',
        name: 'Snow',
        options: {
            fpsLimit: 120,
            particles: {
                number: {
                    value: 160,
                    density: {
                        enable: false
                    }
                },
                size: {
                    value: { min: 1, max: 10 }
                },
                move: {
                    enable: true,
                    direction: MoveDirection.bottom,
                    outModes: OutMode.out
                },
                links: {
                    enable: false
                }
            },
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: ClickMode.remove
                    }
                },
                modes: {
                    remove: {
                        quantity: 10
                    }
                }
            }
        },
        slug: 'snow',
    },
    {
        backgroundColor: 'linear-gradient(45deg, #2d364c 0%,#252d3f 100%)',
        name: 'Night Sky',
        options: {
            fpsLimit: 120,
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        area: 1500
                    }
                },
                links: {
                    enable: true,
                    opacity: .02
                },
                move: {
                    enable: true,
                    direction: MoveDirection.right,
                    speed: .05
                },
                size: {
                    value: 1
                },
                opacity: {
                    value: { min: .05, max: 1 },
                    animation: {
                        enable: true,
                        speed: 1
                    }
                }
            },
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: ClickMode.push
                    }
                },
                modes: {
                    push: {
                        quantity: 1
                    }
                }
            },
            retina_detect: true
        },
        slug: 'night-sky',
    },
    {
        backgroundColor: 'linear-gradient(45deg, #7d7e7d 0%,#0e0e0e 100%)',
        name: 'Multiple images',
        options: {
            fpsLimit: 120,
            particles: {
                number: {
                    value: 8,
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                links: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1,
                    outModes: OutMode.out
                },
                shape: {
                    type: [ "image", "circle" ],
                    options: {
                        image: [
                            {
                                src: react,
                                height: 20,
                                width: 23
                            },
                            {
                                src: k8s,
                                height: 20,
                                width: 20
                            },
                            {
                                src: code,
                                height: 20,
                                width: 20
                            }
                        ]
                    }
                },
                color: {
                    value: '#CCC'
                },
                size: {
                    value: { min: 10, max: 30 },
                    animation: {
                        enable: true,
                        speed: 4,
                        sync: false
                    }
                }
            },
            retina_detect: false
        },
        slug: 'images'
    },
    {
        backgroundColor: 'linear-gradient(45deg, #45484d 0%,#000000 100%)',
        name: 'Polygon mask',
        options: {
            fps_limit: 60,
            particles: {
                number: {
                    value: 200,
                    density: {
                        enable: false
                    }
                },
                links: {
                    enable: true,
                    distance: 30,
                    opacity: .4
                },
                move: {
                    enable: true,
                    speed: 1,
                    outModes: OutMode.bounce
                },
                opacity: {
                    animation: {
                        enable: true,
                        speed: 2,
                        sync: false,
                    },
                    value: { min: .05, max: .4 }
                },
                size: {
                    value: 1
                }
            },
            polygon: {
                enable: true,
                scale: .5,
                type: PolygonMaskType.inline,
                move: {
                    radius: 10,
                },
                url: smallDeer,
                inline: {
                    arrangement: PolygonMaskInlineArrangement.equidistant
                },
                draw: {
                    enable: true,
                    stroke: {
                        color: 'rgba(255, 255, 255, .2)'
                    }
                }
            },
            retina_detect: false,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: HoverMode.bubble
                    }
                },
                modes: {
                    bubble: {
                        size: 6,
                        distance: 40
                    }
                }
            }
        },
        slug: 'mask',
    }, {
        backgroundColor: "black",
        name: "No particles",
        options: undefined,
        slug: "no-particles"
    }
];
