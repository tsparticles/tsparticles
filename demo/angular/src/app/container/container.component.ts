import { Component, OnInit } from '@angular/core';
import type { Container, ISourceOptions } from "tsparticles";

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: [ './container.component.css' ]
})
export class ContainerComponent implements OnInit {
    id = 'tsparticles';
    options: ISourceOptions = {
        background: {
            color: {
                value: '#0d47a1'
            }
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: 'push'
                },
                onHover: {
                    enable: true,
                    mode: 'repulse'
                },
                resize: true
            },
            modes: {
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: '#ffffff'
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 6,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: 'circle'
            },
            size: {
                random: true,
                value: 5
            }
        },
        detectRetina: true
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    public particlesLoaded(container: Container): void {
        console.log(container);
    }
}
