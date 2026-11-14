import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
import { Component } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import { engine } from "../../particlesEngine";
import { loadFull } from "tsparticles";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(engine, async engine => {
      console.log("init", engine);

      await loadFull(engine);
    });
  }
}
