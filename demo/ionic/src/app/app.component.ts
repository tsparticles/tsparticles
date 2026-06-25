import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgParticlesService, NgxParticlesModule } from "@tsparticles/angular";
import { loadFull } from "tsparticles";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [IonicModule, RouterModule, NgxParticlesModule],
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
