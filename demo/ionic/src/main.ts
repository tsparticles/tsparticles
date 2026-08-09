import { enableProdMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouteReuseStrategy, provideRouter } from "@angular/router";
import { IonicRouteStrategy, provideIonicAngular } from "@ionic/angular/standalone";

import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
  ],
}).catch(err => console.error(err));
