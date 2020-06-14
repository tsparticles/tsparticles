import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent {
    title = 'ng-particles-demo';
    options = {
        fpsLimit: 60,
        particles: {
            color: {
                value: '#000'
            },
            links: {
                enable: true,
                color: '#000'
            },
            move: {
                enable: true
            }
        }
    }
}
