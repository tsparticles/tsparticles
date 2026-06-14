import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  SimpleChanges,
} from "@angular/core";
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
export class NgxParticlesComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() options?: IParticlesProps;
  @Input() url?: string;
  @Input() id = "tsparticles";
  @Input() theme?: string;
  @Output() particlesLoaded: EventEmitter<Container | undefined> = new EventEmitter<Container | undefined>();

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

  public ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (!this.#container) {
      return;
    }

    if (changes["id"] || changes["options"] || changes["url"]) {
      void this.#loadParticles();
    }

    if (changes["theme"]) {
      (this.#container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(
        changes["theme"].currentValue,
      );
    }
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

    if (container && this.theme) {
      (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.theme);
    }

    this.particlesLoaded.emit(container);
  }
}
