import { Component } from '@angular/core';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { basic } from 'tsparticles-demo-configs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page {
  particlesId = 'tsparticles';
  particlesOptions = basic;

  constructor() {
  }

  particlesLoaded(container: Container): void {
    // Credits to :  https://github.com/matteobruni
    setTimeout(async () => {
      container.refresh();
    }, 500);
  }

  async particlesInit(main: Engine): Promise<void> {
    await loadFull(main);
  }
}
