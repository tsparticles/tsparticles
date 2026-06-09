import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";
import configs from "@tsparticles/configs";
import type { ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  options!: ISourceOptions;

  navItems = ["Home", "About", "Projects", "Skills", "Contact"];
  skills = [
    { name: "TypeScript", pct: 90 },
    { name: "React", pct: 85 },
    { name: "Node.js", pct: 80 },
    { name: "CSS", pct: 88 },
  ];
  projects = [
    { title: "Project One", desc: "A web application built with React and TypeScript." },
    { title: "Project Two", desc: "Real-time dashboard with data visualization." },
    { title: "Project Three", desc: "Mobile-first e-commerce platform." },
  ];

  ngOnInit(): void {
    const keys = Object.keys(configs);
    const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;
    this.options = {
      ...(configs[randomKey] as ISourceOptions),
      fullScreen: { enable: true, zIndex: -1 },
    };

    void this.ngParticlesService.init(async (engine) => {
      await loadSlim(engine);
    });
  }

  onSubmit(form: HTMLFormElement): void {
    alert("Message sent! (demo)");
    form.reset();
  }
}
