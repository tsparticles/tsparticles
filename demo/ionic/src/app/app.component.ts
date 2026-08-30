import { Component } from "@angular/core";
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
import { NgParticlesService } from "@tsparticles/angular";
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
    void this.ngParticlesService.init(async engine => {
      console.log("init", engine);

      await loadFull(engine);
    });
  }
}
