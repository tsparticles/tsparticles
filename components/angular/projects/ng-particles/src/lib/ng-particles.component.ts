import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID,
} from '@angular/core';
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
  @Input() id?: string;
  @Input() particlesInit?: (engine: Engine) => Promise<void>;
  @Output() particlesLoaded: EventEmitter<Container> =
    new EventEmitter<Container>();

  private destroy$ = new Subject<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const cb = (container?: Container) => {
      this.particlesLoaded.emit(container);
    };

    from(
      this.particlesInit ? this.particlesInit(tsParticles) : Promise.resolve()
    )
      .pipe(
        mergeMap(() => {
          if (this.url) {
            if (this.id) {
              return tsParticles.loadJSON(this.id, this.url);
            } else {
              return tsParticles.loadJSON(this.url);
            }
          } else if (this.options) {
            if (this.id) {
              return tsParticles.load(this.id, this.options);
            } else {
              return tsParticles.load(this.options);
            }
          } else {
            console.error(
              'You must specify options or url to load tsParticles'
            );
            return EMPTY;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(cb);
  }

  public ngOnDestroy(): void {
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
  @Input() override id?: string;
  @Input() override particlesInit?: (engine: Engine) => Promise<void>;
  @Output() override particlesLoaded: EventEmitter<Container> =
    new EventEmitter<Container>();
}
