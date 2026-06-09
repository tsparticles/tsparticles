import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxConfettiModule } from "angular-confetti";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxConfettiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
