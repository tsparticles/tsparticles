import { isPlatformServer } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FireworkOptions, fireworks, FireworksInstance } from '@tsparticles/fireworks';

@Component({
    selector: 'ngx-fireworks',
    template: ` <div [id]="id"></div>`,
    styles: [],
})
export class NgxFireworksComponent {
    @Input() options?: FireworkOptions;
    @Input() id: string;

    fireworks_instance: FireworksInstance | undefined = undefined;

    constructor(@Inject(PLATFORM_ID) protected platformId: string) {
        this.id = 'tsparticles';
    }

    public ngAfterViewInit(): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        fireworks(this.id, this.options).then((firework: FireworksInstance | undefined) => {
            this.fireworks_instance = firework;
        });
    }

    public ngOnDestroy(): void {
        if (this.fireworks_instance) {
            this.fireworks_instance.stop();
        }
    }
}
