import { Component, OnInit } from '@angular/core';
import { tsParticles } from 'tsparticles';

@Component({
  selector: 'lib-ng-particles',
  template: ` <div id="tsparticles"></div>`,
  styles: [],
})
export class NgParticlesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    tsParticles.load('tsparticles', {
      background: {
        color: '#000000',
      },
    });
  }
}
