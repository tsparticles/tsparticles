import { Component } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import { loadFull } from "tsparticles";

@Component({
  selector: "app-root",
  standalone: false,
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
