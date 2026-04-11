import { isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { confetti, ConfettiOptions } from '@tsparticles/confetti';
import type { Container } from '@tsparticles/engine';

@Component({
    selector: 'ngx-confetti',
    template: '<div [id]="id"></div>',
})
export class NgxConfettiComponent implements AfterViewInit, OnChanges {
    @Input() options?: ConfettiOptions;
    @Input() id: string;
    @Input() fire: boolean | number;

    private container?: Container;
    private destroy$ = new Subject<void>();

    constructor(@Inject(PLATFORM_ID) protected platformId: string) {
        this.id = 'tsparticles';
        this.fire = true;
    }

    public ngAfterViewInit(): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        (async () => {
            if (this.fire) {
                this.container = await confetti(this.id, this.options);
            }
        })();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        const fireChanges = changes['fire'];

        if (this.fire && fireChanges && fireChanges.previousValue !== fireChanges.currentValue) {
            (async () => {
                this.container = await confetti(this.id, this.options);
            })();
        }
    }

    public ngOnDestroy(): void {
        this.container?.destroy();
        this.destroy$.next();
    }
}
