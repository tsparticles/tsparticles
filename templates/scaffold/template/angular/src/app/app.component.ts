import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: "#1a1a2e" } },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: ["#6c5ce7", "#a29bfe", "#fd79a8"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: { min: 1, max: 4 }, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
      },
    },
    detectRetina: true,
  };

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine) => {
      await loadSlim(engine);
    });
  }
}
