import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgParticlesModule } from 'ng-particles/dist/ng-particles';
// ng-particles import path for working with lerna (production use is just ng-particles)

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgParticlesModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
