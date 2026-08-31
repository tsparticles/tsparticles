import { Component } from "@angular/core";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { ExploreContainerComponent } from "../explore-container/explore-container.component";

@Component({
  selector: "app-tab2",
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, ExploreContainerComponent],
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  constructor() {}
}
