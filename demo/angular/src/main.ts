import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { environment } from './environments/environment';
import { NgxConfettiModule } from 'angular-confetti';
import { NgxFireworksModule } from 'angular-fireworks';
import { NgxParticlesModule } from '@tsparticles/angular';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      NgxParticlesModule,
      NgxConfettiModule,
      NgxFireworksModule,
    ),
  ],
}).catch(err => console.error(err));
