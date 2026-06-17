import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgxFireworksModule } from "angular-fireworks";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxFireworksModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
