import { Component } from '@angular/core';
import type { Container } from 'ng-particles';
import type { Main } from "tsparticles-engine";
import { loadFull } from "tsparticles";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page {
  particlesId = "tsparticles";
  particlesOptions = {
    fullScreen: {
      enable: true
    },
    background: {
      color: {
        value: '#0d47a1'
      }
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'window',
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
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
          speed: 3
        },
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
          value_area: 800
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

  particlesLoaded(container: Container): void {
    // Credits to :  https://github.com/matteobruni
    setTimeout(async () => {
      container.refresh();
    }, 500);
  }

  particlesInit(main: Main): void {
    loadFull(main);
  }
}
