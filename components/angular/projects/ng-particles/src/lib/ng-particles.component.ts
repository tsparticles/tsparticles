import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { EMPTY, from, mergeMap, Subject, takeUntil } from 'rxjs';
import { tsParticles } from 'tsparticles-engine';
import type { Container, Engine } from 'tsparticles-engine';
import { IParticlesProps } from './ng-particles.module';

@Component({
    selector: 'ng-particles',
    template: '<div [id]="id"></div>',
})
export class NgParticlesComponent implements AfterViewInit, OnDestroy {
    @Input() options?: IParticlesProps;
    @Input() url?: string;
    @Input() id: string;
    @Input() particlesInit?: (engine: Engine) => Promise<void>;
    @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();

    private destroy$ = new Subject<void>();
    private container?: Container;

    constructor(@Inject(PLATFORM_ID) protected platformId: string) {
        this.id = 'tsparticles';
    }

    public ngAfterViewInit(): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        const cb = (container?: Container) => {
            this.container = container;
            this.particlesLoaded.emit(container);
        };

        from(this.particlesInit ? this.particlesInit(tsParticles) : Promise.resolve())
            .pipe(
                mergeMap(() => {
                    if (this.url) {
                        return tsParticles.loadJSON(this.id, this.url);
                    } else if (this.options) {
                        return tsParticles.load(this.id, this.options);
                    } else {
                        console.error('You must specify options or url to load tsParticles');
                        return EMPTY;
                    }
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(cb);
    }

    public ngOnDestroy(): void {
        this.container?.destroy();
        this.destroy$.next();
    }
}

@Component({
    selector: 'Particles',
    template: '<div [id]="id"></div>',
})
export class ParticlesComponent extends NgParticlesComponent {
    @Input() override options?: IParticlesProps;
    @Input() override url?: string;
    @Input() override id: string;
    @Input() override particlesInit?: (engine: Engine) => Promise<void>;
    @Output() override particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();

    constructor(@Inject(PLATFORM_ID) protected override platformId: string) {
        super(platformId);

        this.id = 'tsparticles';
    }
}
