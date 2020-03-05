(function () {
    let otherLoads;

    if (window.onload) {
        otherLoads = window.onload;
    }

    window.onload = function () {
        if (otherLoads) {
            otherLoads();
        }

        tsParticles.load('tsparticles', {
            fpsLimit: 60,
            interactivity: {
                detectsOn: "canvas",
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
                        mode: "repulse",
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
                        opacity: 0.8,
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
                    color: "#ffffff",
                    consent: false,
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    attract: {
                        enable: false,
                        rotate: {
                            x: 600,
                            y: 1200
                        }
                    },
                    bounce: false,
                    direction: "none",
                    enable: true,
                    outMode: "out",
                    random: false,
                    speed: 6,
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
                    value: 0.5
                },
                shape: {
                    character: {
                        fill: true,
                        font: "Verdana",
                        style: "",
                        value: "M",
                        weight: "400"
                    },
                    image: {
                        height: 100,
                        replaceColor: true,
                        src: "images/github.svg",
                        width: 100
                    },
                    polygon: {
                        sides: 5
                    },
                    stroke: {
                        color: "#000000",
                        width: 0
                    },
                    type: "circle"
                },
                size: {
                    animation: {
                        enable: false,
                        minimumValue: 0.10000000000000001,
                        speed: 40,
                        sync: false
                    },
                    random: true,
                    value: 5
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
            },
            detectRetina: true,
            config_demo: {
                hide_card: false,
                background_color: "#b61924",
                background_image: "",
                background_position: "50% 50%",
                background_repeat: "no-repeat",
                background_size: "cover"
            },
        });

        const element = document.getElementById('editor');
        const options = {
            mode: 'tree',
            modes: ['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
            onError: function (err) {
                alert(err.toString())
            },
            onModeChange: function (newMode, oldMode) {
            },
            onChange: function () {
            }
        };
        const editor = new JSONEditor(element, options);

        editor.set(tsParticles.domItem(0).options);
        editor.expandAll();

        const btnUpdate = document.getElementById('btnUpdate');
        btnUpdate.onclick = function () {
            const particles = tsParticles.domItem(0);

            particles.options = editor.get();
            particles.refresh();
        };
    };
})();