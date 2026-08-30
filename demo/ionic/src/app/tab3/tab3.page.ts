import { Component } from "@angular/core";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { ExploreContainerComponent } from "../explore-container/explore-container.component";

@Component({
  selector: "app-tab3",
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, ExploreContainerComponent],
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  constructor() {}
}
