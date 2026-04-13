import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, Output, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { tsParticles } from "@tsparticles/engine";
import type { Container, Engine } from "@tsparticles/engine";
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
  @Input() particlesInit?: (engine: Engine) => Promise<void> | void;
  @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();

  private container?: Container;
  private loadingPromise?: Promise<void>;

  constructor(
    @Inject(PLATFORM_ID) protected platformId: string,
    private readonly particlesService: NgParticlesService,
  ) {}

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.loadingPromise = this.loadParticles();
  }

  public ngOnDestroy(): void {
    this.container?.destroy();

    this.loadingPromise = undefined;
  }

  private async loadParticles(): Promise<void> {
    await this.particlesService.init(this.particlesInit);

    this.container?.destroy();

    const container = await tsParticles.load({ id: this.id, options: this.options, url: this.url });

    this.container = container;
    this.particlesLoaded.emit(container);
  }
}
