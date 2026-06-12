import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxFireworksModule } from "angular-fireworks";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxFireworksModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
