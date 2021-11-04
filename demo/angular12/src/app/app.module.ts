import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgParticlesModule } from 'ng-particles-old';
import { ContainerComponent } from './container/container.component';

@NgModule({
    declarations: [
        AppComponent,
        ContainerComponent
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
