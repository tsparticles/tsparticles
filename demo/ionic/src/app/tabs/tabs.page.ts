import { Component } from "@angular/core";
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { ellipse, square, triangle } from "ionicons/icons";

@Component({
  selector: "app-tabs",
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  constructor() {
    addIcons({ ellipse, square, triangle });
  }
}
