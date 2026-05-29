import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, Output, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { tsParticles } from "@tsparticles/engine";
import type { Container } from "@tsparticles/engine";
import { IParticlesProps } from "./ng-particles.module";
import { NgParticlesService } from "./ng-particles.service";

@Component({
  selector: "ngx-particles",
  standalone: false,
  template: '<div [id]="id"></div>',
})
export class NgxParticlesComponent implements AfterViewInit, OnDestroy {
  @Input() options?: IParticlesProps;
  @Input() url?: string;
  @Input() id = "tsparticles";
  @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();

  #container?: Container;
  #loadingPromise?: Promise<void>;
  readonly #particlesService: NgParticlesService;

  constructor(
    @Inject(PLATFORM_ID) protected platformId: string,
    particlesService: NgParticlesService,
  ) {
    this.#particlesService = particlesService;
  }

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.#loadingPromise = this.#loadParticles();
  }

  public ngOnDestroy(): void {
    this.#container?.destroy();

    this.#loadingPromise = undefined;
  }

  async #loadParticles(): Promise<void> {
    await this.#particlesService.waitForInitialization();
    this.#particlesService.assertInitialized();

    this.#container?.destroy();

    const container = await tsParticles.load({ id: this.id, options: this.options, url: this.url });

    this.#container = container;
    this.particlesLoaded.emit(container);
  }
}
