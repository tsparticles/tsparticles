import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";
import { NgParticlesService, NgxParticlesModule } from "@tsparticles/angular";
import { NgxConfettiModule } from "angular-confetti";
import { NgxFireworksModule } from "angular-fireworks";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxParticlesModule,
    NgxConfettiModule,
    NgxFireworksModule,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular";
  id = "tsparticles";
  fire = 0;
  particlesVisible = true;
  fireworksVisible = false;
  confettiVisible = true;
  particlesOptions: ISourceOptions = configs.basic;
  confettiOptions = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  };
  fireworksOptions = {};
  configIndex = 0;
  configList: ISourceOptions[] = [configs.basic, configs.bubble, configs.snow];

  toggleParticlesClick(): void {
    console.log("particles clicked");

    this.particlesVisible = !this.particlesVisible;
  }

  toggleFireworksClick(): void {
    console.log("fireworks clicked");

    this.fireworksVisible = !this.fireworksVisible;
  }

  toggleConfettiClick(): void {
    console.log("confetti clicked");

    this.fire = Math.random() + 1;
  }

  switchConfig(): void {
    this.configIndex = (this.configIndex + 1) % this.configList.length;
    this.particlesOptions = this.configList[this.configIndex];
  }

  constructor(private ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      console.log("init", engine);

      await loadFull(engine);
    });
  }

  public particlesLoaded(container?: Container): void {
    console.log("loaded", container);
  }
}
