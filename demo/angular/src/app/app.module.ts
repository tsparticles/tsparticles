import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxParticlesModule } from '@tsparticles/angular';
import { NgxConfettiModule } from 'angular-confetti';
import { NgxFireworksModule } from 'angular-fireworks';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxParticlesModule,
    NgxConfettiModule,
    NgxFireworksModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
