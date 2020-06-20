<template>
    <div
            :id="id"
            :clickEffect="clickEffect"
            :clickMode="clickMode"
            :color="color"
            :hoverEffect="hoverEffect"
            :hoverMode="hoverMode"
            :lineLinked="lineLinked"
            :linesColor="linesColor"
            :linesDistance="linesDistance"
            :linesOpacity="linesOpacity"
            :linesWidth="linesWidth"
            :moveSpeed="moveSpeed"
            :particleOpacity="particleOpacity"
            :particleSize="particleSize"
            :particlesNumber="particlesNumber"
            :shapeType="shapeType"
    ></div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "vue-property-decorator";
    import {
        ClickMode,
        HoverMode,
        InteractivityDetect,
        MoveDirection,
        OutMode,
        ShapeType
    } from "tsparticles/dist/Enums";
    import { tsParticles } from "tsparticles/dist/index";
    import { Container } from "tsparticles/dist/Core/Container";

    @Component
    export default class Particles extends Vue {
        @Prop({ required: true }) private id!: string;
        @Prop() private clickEffect!: boolean;
        @Prop() private clickMode!: ClickMode;
        @Prop() private color!: string;
        @Prop() private hoverEffect!: boolean;
        @Prop() private hoverMode!: HoverMode;
        @Prop() private lineLinked!: boolean;
        @Prop() private linesColor!: string;
        @Prop() private linesDistance!: number;
        @Prop() private linesOpacity!: number;
        @Prop() private linesWidth!: number;
        @Prop() private moveSpeed!: number;
        @Prop() private particleOpacity!: number;
        @Prop() private particleSize!: number;
        @Prop() private particlesNumber!: number;
        @Prop() private shapeType!: ShapeType;
        private particlesContainer?: Container;

        private mounted(): void {
            this.$nextTick(() => {
                this.initTsParticles(
                    this.color,
                    this.particleOpacity,
                    this.particlesNumber,
                    this.shapeType,
                    this.particleSize,
                    this.linesColor,
                    this.linesWidth,
                    this.lineLinked,
                    this.linesOpacity,
                    this.linesDistance,
                    this.moveSpeed,
                    this.hoverEffect,
                    this.hoverMode,
                    this.clickEffect,
                    this.clickMode
                );
            });
        }

        private beforeDestroy(): void {
            this.particlesContainer?.destroy();
        }

        private initTsParticles(
            color: string,
            particleOpacity: number,
            particlesNumber: number,
            shapeType: ShapeType,
            particleSize: number,
            linesColor: string,
            linesWidth: number,
            lineLinked: boolean,
            linesOpacity: number,
            linesDistance: number,
            moveSpeed: number,
            hoverEffect: boolean,
            hoverMode: HoverMode,
            clickEffect: boolean,
            clickMode: ClickMode
        ): void {
            if (!this.id) {
                throw new Error("Prop 'id' is required!")
            }

            tsParticles.load(this.id, {
                fps_limit: 60,
                interactivity: {
                    detect_on: InteractivityDetect.window,
                    events: {
                        onclick: {
                            enable: clickEffect,
                            mode: clickMode
                        },
                        onhover: {
                            enable: hoverEffect,
                            mode: hoverMode,
                            parallax: {
                                enable: false,
                                force: 2,
                                smooth: 10
                            }
                        },
                        resize: true
                    },
                    modes: {
                        bubble: {
                            distance: 200,
                            duration: 0.4,
                            opacity: 1,
                            size: 80
                        },
                        grab: {
                            distance: 100,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        }
                    }
                },
                particles: {
                    color: {
                        value: color
                    },
                    line_linked: {
                        enable: lineLinked,
                        distance: linesDistance,
                        color: linesColor,
                        opacity: linesOpacity,
                        width: linesWidth
                    },
                    move: {
                        attract: {
                            enable: false,
                            rotateX: 3000,
                            rotateY: 3000
                        },
                        bounce: false,
                        direction: MoveDirection.none,
                        enable: true,
                        out_mode: OutMode.out,
                        random: false,
                        speed: moveSpeed,
                        straight: false
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 800
                        },
                        value: particlesNumber
                    },
                    opacity: {
                        anim: {
                            enable: false,
                            opacity_min: 0.1,
                            speed: 1,
                            sync: false
                        },
                        random: false,
                        value: particleOpacity
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
                            src: "",
                            width: 100
                        },
                        polygon: {
                            nb_sides: 5
                        },
                        stroke: {
                            color: "#ff0000",
                            width: 0
                        },
                        type: shapeType
                    },
                    size: {
                        anim: {
                            enable: false,
                            size_min: 0.1,
                            speed: 40,
                            sync: false
                        },
                        random: true,
                        value: particleSize
                    }
                },
                retina_detect: false
            }).then(container => this.particlesContainer = container);
        }
    }
</script>
