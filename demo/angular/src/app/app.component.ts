import { Component } from '@angular/core';
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { basic } from "tsparticles-demo-configs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'angular13';
  id = 'tsparticles';
  visible = true;
  options: ISourceOptions = basic;

  toggleClick(): void {
    console.log("clicked");

    this.visible = !this.visible;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log("init", engine);

    await loadFull(engine);
  }

  public particlesLoaded(container: Container): void {
    console.log("loaded", container);
  }
}
