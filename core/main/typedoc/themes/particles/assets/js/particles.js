let noiseZ;
let size;
let columns;
let rows;
let w;
let h;
let field;

function setup(container) {
    size = 20;
    noiseZ = 0;
    reset(container);
}

function initField() {
    field = new Array(columns);
    for (let x = 0; x < columns; x++) {
        field[x] = new Array(columns);
        for (let y = 0; y < rows; y++) {
            field[x][y] = [ 0, 0 ];
        }
    }
}

function calculateField() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let angle = noise.perlin3(x / 50, y / 50, noiseZ) * Math.PI * 2;
            let length = noise.perlin3(x / 100 + 40000, y / 100 + 40000, noiseZ);
            field[x][y][0] = angle;
            field[x][y][1] = length;
        }
    }
}

function reset(container) {
    w = container.canvas.size.width;
    h = container.canvas.size.height;
    noise.seed(Math.random());
    columns = Math.floor(w / size) + 1;
    rows = Math.floor(h / size) + 1;
    initField();
}

var bigBubbles = {
    fpsLimit: 60,
    particles: {
        number: {
            value: 50,
        },
        color: {
            value: [ "#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF" ],
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: 400,
            random: {
                enable: true,
                minimumValue: 200,
            },
        },
        move: {
            enable: true,
            speed: 10,
            direction: "top",
            outMode: "destroy",
        },
    },
    interactivity: {
        detectsOn: "window",
        events: {
            resize: true,
        },
    },
    detectRetina: true,
    background: {
        color: "#fff",
    },
    emitters: {
        direction: "top",
        position: {
            x: 50,
            y: 120,
        },
        rate: {
            delay: 0.2,
            quantity: 2,
        },
        size: {
            width: 100,
            height: 0,
        },
    },
};
var slack = {
    fpsLimit: 60,
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                area: 800
            }
        },
        color: {
            value: [ "#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0" ]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 8,
            random: true
        },
        links: {
            enable: true,
            distance: 150,
            color: "#808080",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 5,
            direction: "none",
            random: false,
            straight: false,
            outMode: "out",
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onHover: {
                enable: true,
                mode: "grab"
            },
            onClick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                links: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                quantity: 4
            },
            remove: {
                quantity: 2
            }
        }
    },
    detectRetina: true
};
var mouseTrail = {
    fpsLimit: 60,
    particles: {
        number: {
            value: 0,
            density: {
                enable: true,
                area: 800
            }
        },
        color: {
            value: "#ff0000",
            animation: {
                enable: true,
                speed: 180,
                sync: true
            }
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: "https://cdn.matteobruni.it/images/particles/github.svg",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 3,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 15,
            random: {
                enable: true,
                minimumValue: 5
            },
            animation: {
                enable: true,
                speed: 5,
                minimumValue: 5,
                sync: true,
                startValue: "min",
                destroy: "max"
            }
        },
        links: {
            enable: false
        },
        move: {
            enable: true,
            speed: 15,
            direction: "none",
            random: false,
            straight: false,
            outMode: "destroy",
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detectsOn: "window",
        events: {
            onhover: {
                enable: true,
                mode: "trail"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
                speed: 3
            },
            repulse: {
                distance: 200
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            },
            trail: {
                delay: 0.005,
                quantity: 5
            }
        }
    },
    retina_detect: true,
    background: {
        color: "#ffffff",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
    }
};
var fruits = {
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
        detectsOn: "window",
        events: {
            onClick: {
                enable: true,
                mode: "push"
            },
            onDiv: {
                elementId: "repulse-div",
                enable: false,
                mode: "repulse"
            },
            onHover: {
                enable: true,
                mode: "bubble",
                parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10
                }
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 1,
                size: 40,
                speed: 3
            },
            connect: {
                distance: 80,
                lineLinked: {
                    opacity: 0.5
                },
                radius: 60
            },
            grab: {
                distance: 400,
                lineLinked: {
                    opacity: 1
                }
            },
            push: {
                quantity: 4
            },
            remove: {
                quantity: 2
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: "#ffffff"
        },
        lineLinked: {
            blink: false,
            color: "#000",
            consent: false,
            distance: 150,
            enable: false,
            opacity: 0,
            width: 0
        },
        rotate: {
            value: 0,
            random: true,
            direction: "clockwise",
            animation: {
                enable: true,
                speed: 5,
                sync: false
            }
        },
        move: {
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            },
            bounce: false,
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 2,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            limit: 0,
            value: 80
        },
        opacity: {
            animation: {
                enable: false,
                minimumValue: 0.1,
                speed: 1,
                sync: false
            },
            random: false,
            value: 0.8
        },
        shape: {
            character: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400"
            },
            image: [
                {
                    src: "https://particles.matteobruni.it/images/fruits/apple.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/avocado.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/banana.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/berries.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/cherry.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/grapes.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/lemon.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/orange.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/peach.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/pear.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/pepper.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/plum.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/star.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/strawberry.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/watermelon.png",
                    width: 32,
                    height: 32
                },
                {
                    src: "https://particles.matteobruni.it/images/fruits/watermelon_slice.png",
                    width: 32,
                    height: 32
                }
            ],
            polygon: {
                nb_sides: 5
            },
            stroke: {
                color: "#000000",
                width: 0
            },
            type: "image"
        },
        size: {
            animation: {
                enable: false,
                minimumValue: 0.1,
                speed: 40,
                sync: false
            },
            random: false,
            value: 16
        }
    },
    polygon: {
        draw: {
            enable: false,
            lineColor: "#ffffff",
            lineWidth: 0.5
        },
        move: {
            radius: 10
        },
        scale: 1,
        type: "none",
        url: ""
    }
};
var disappearing = {
    background: {
        color: {
            value: "#fff"
        }
    },
    fpsLimit: 60,
    emitters: {
        direction: "random",
        size: {
            width: 100,
            height: 100
        },
        position: {
            x: 50,
            y: 50
        },
        rate: {
            delay: 0.1,
            quantity: 3
        }
    },
    particles: {
        number: {
            value: 0
        },
        color: {
            value: [ "#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF" ]
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.8,
            random: {
                enable: true,
                minimumValue: 0.3
            }
        },
        size: {
            value: 200,
            anim: {
                enable: true,
                speed: 100,
                size_min: 1,
                sync: true,
                startValue: "max",
                destroy: "min"
            }
        },
        move: {
            enable: true,
            speed: 0,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "destroy",
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: false,
                mode: "repulse"
            },
            onclick: {
                enable: false,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            repulse: {
                distance: 100
            },
            push: {
                quantity: 4
            }
        }
    },
    detectRetina: true
};
var bgMask = {
    fpsLimit: 60,
    particles: {
        number: {
            value: 200,
            limit: 300,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: "images/github.svg",
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.5,
                sync: false
            }
        },
        size: {
            value: 30,
            random: true,
            anim: {
                enable: true,
                speed: 10,
                size_min: 10,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 100,
            color: "#ffffff",
            opacity: 1,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
                parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10
                }
            },
            onClick: {
                enable: false,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                lineLinked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 100,
                duration: 2,
                opacity: 1,
                speed: 2
            },
            repulse: {
                distance: 200
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    backgroundMask: {
        enable: true,
        cover: {
            color: "#ffffff"
        }
    },
    background: {
        image: "url('https://cdn.matteobruni.it/images/particles/background3.jpg')"
    },
    retina_detect: true,
    fps_limit: 30
};
var basic = {
    "fpsLimit": 60,
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "area": 800
            }
        },
        "color": {
            "value": "#ff0000",
            "animation": {
                "enable": true,
                "speed": 20,
                "sync": true
            }
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 3,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 20,
                "size_min": 0.1,
                "sync": false
            }
        },
        "links": {
            "enable": true,
            "distance": 100,
            "color": "#000000",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 0.8
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
    "retina_detect": true,
    "background": {
        "color": "#ffffff"
    }
};
var planes = {
    "fpsLimit": 60,
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "onhover": {
                "enable": false,
                "mode": "repulse",
                "parallax": {
                    "enable": false,
                    "force": 60,
                    "smooth": 10
                }
            },
            "resize": true
        },
        "modes": {
            "bubble": {
                "distance": 400,
                "duration": 2,
                "opacity": 0.8,
                "size": 40,
                "speed": 3
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
                "distance": 200,
                "duration": 0.4
            }
        }
    },
    "particles": {
        "color": {
            "value": "#ffffff"
        },
        "move": {
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            },
            "noise": {
                "enable": true
            },
            "bounce": false,
            "direction": "none",
            "enable": true,
            "out_mode": "out",
            "random": false,
            "speed": 6,
            "straight": false
        },
        "number": {
            "density": {
                "enable": true,
                "value_area": 800
            },
            "value": 80
        },
        "rotate": {
            "value": 45,
            "path": true
        },
        "opacity": {
            "anim": {
                "enable": false,
                "opacity_min": 0.1,
                "speed": 1,
                "sync": false
            },
            "random": false,
            "value": 1
        },
        "shape": {
            "image": {
                "height": 128,
                "src": "https://cdn.matteobruni.it/images/particles/plane_alt.png",
                "width": 128
            },
            "type": "image"
        },
        "size": {
            "anim": {
                "enable": false,
                "size_min": 0.1,
                "speed": 40,
                "sync": false
            },
            "random": {
                "enable": true,
                "minimumValue": 16
            },
            "value": 32
        }
    },
    "polygon": {
        "draw": {
            "enable": false,
            "lineColor": "#ffffff",
            "lineWidth": 0.5
        },
        "move": {
            "radius": 10
        },
        "scale": 1,
        "type": "none",
        "url": ""
    },
    "retina_detect": true
};
var emitterNoiseTrails = {
    fps_limit: 999,
    emitters: [
        {
            life: {
                count: 1,
                duration: 10
            },
            position: {
                x: 50,
                y: 50
            },
            rate: {
                delay: 0.1,
                quantity: 10
            },
            size: {
                width: 10,
                height: 10
            },
            particles: {
                color: {
                    value: "#00f"
                }
            }
        },
        {
            direction: "bottom-right",
            life: {
                count: 1,
                duration: 10
            },
            position: {
                x: 5,
                y: 5
            },
            rate: {
                delay: 0.1,
                quantity: 10
            },
            size: {
                width: 10,
                height: 10
            },
            particles: {
                color: {
                    value: "#f00"
                }
            }
        },
        {
            direction: "top-right",
            life: {
                count: 1,
                duration: 10
            },
            position: {
                x: 5,
                y: 95
            },
            rate: {
                delay: 0.1,
                quantity: 10
            },
            size: {
                width: 10,
                height: 10
            },
            particles: {
                color: {
                    value: "#f0f"
                }
            }
        },
        {
            direction: "bottom-left",
            life: {
                count: 1,
                duration: 10
            },
            position: {
                x: 95,
                y: 5
            },
            rate: {
                delay: 0.1,
                quantity: 10
            },
            size: {
                width: 10,
                height: 10
            },
            particles: {
                color: {
                    value: "#ff0"
                }
            }
        },
        {
            direction: "top-left",
            life: {
                count: 1,
                duration: 10
            },
            position: {
                x: 95,
                y: 95
            },
            rate: {
                delay: 0.1,
                quantity: 10
            },
            size: {
                width: 10,
                height: 10
            },
            particles: {
                color: {
                    value: "#0f0"
                }
            }
        }
    ],
    particles: {
        color: {
            value: "#f00",
            animation: {
                enable: true,
                speed: 10,
                sync: true
            }
        },
        move: {
            trail: {
                enable: true,
                fillColor: "#ffffff",
                length: 100
            },
            bounce: false,
            direction: "none",
            enable: true,
            out_mode: "out",
            random: false,
            speed: 1,
            straight: false,
            warp: true,
            noise: {
                enable: true,
                delay: {
                    value: 0.001
                }
            }
        },
        number: { density: { enable: true, value_area: 800 }, value: 0 },
        opacity: {
            anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
            random: true,
            value: 0.5
        },
        shape: {
            character: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400"
            },
            image: {
                height: 100,
                replace_color: true,
                src: "images/github.svg",
                width: 500
            },
            polygon: { nb_sides: 5 },
            stroke: { color: "random", width: 0 },
            type: "circle"
        },
        size: {
            value: 1
        }
    },
    retina_detect: true
};
var snow = {
    fps_limit: 60,
    interactivity: {
        detect_on: "window",
        events: {
            onclick: { enable: true, mode: "repulse" },
            onhover: {
                enable: true,
                mode: "bubble",
                parallax: { enable: false, force: 2, smooth: 10 }
            },
            resize: true
        },
        modes: {
            bubble: { distance: 400, duration: 0.3, opacity: 1, size: 4, speed: 3 },
            grab: { distance: 400, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
            repulse: { distance: 200, duration: 0.4 }
        }
    },
    particles: {
        color: { value: "#000" },
        move: {
            bounce: false,
            direction: "bottom",
            enable: true,
            out_mode: "out",
            random: false,
            speed: 2,
            straight: false
        },
        number: { density: { enable: true, value_area: 800 }, value: 400 },
        opacity: {
            anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
            random: true,
            value: 0.5
        },
        shape: {
            character: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400"
            },
            image: {
                height: 100,
                replace_color: true,
                src: "images/github.svg",
                width: 100
            },
            polygon: { nb_sides: 5 },
            stroke: { color: "#000000", width: 0 },
            type: "circle"
        },
        size: {
            anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
            random: true,
            value: 10
        }
    },
    retina_detect: true
};

tsParticles
    .loadFromArray('tsparticles', [
        bigBubbles,
        slack,
        mouseTrail,
        fruits,
        disappearing,
        bgMask,
        basic,
        planes,
        emitterNoiseTrails,
        snow
    ])
    .then(particles => {
        if (particles.options.particles.move.noise.enable) {
            particles.setNoise({
                init: function () {
                    setup(particles);
                },
                update: function () {
                    calculateField();

                    const mousePos = particles.interactivity.mouse.position;

                    let sumZ;

                    if (mousePos) {
                        sumZ =
                            (mousePos.x * mousePos.y) /
                            (25 * particles.canvas.size.width * particles.canvas.size.height);
                    } else {
                        sumZ = 0.004;
                    }

                    noiseZ += sumZ;
                },
                generate: function (p) {
                    const pos = p.getPosition();

                    const px = Math.max(Math.floor(pos.x / size), 0);
                    const py = Math.max(Math.floor(pos.y / size), 0);

                    if (!field || !field[px] || !field[px][py]) {
                        return { angle: 0, length: 0 };
                    }

                    return {
                        angle: field[px][py][0],
                        length: field[px][py][1]
                    };
                }
            });

            particles.refresh();
        }
    });
