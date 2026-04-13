import { isPlatformServer } from "@angular/common";
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
} from "@angular/core";
import { confetti, ConfettiOptions } from "@tsparticles/confetti";
import type { Container } from "@tsparticles/engine";

@Component({
  selector: "ngx-confetti",
  standalone: false,
  template: '<div [id]="id"></div>',
})
export class NgxConfettiComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() options?: ConfettiOptions;
  @Input() id = "tsparticles";
  @Input() fire: boolean | number = true;

  private container?: Container;
  private renderId = 0;

  constructor(@Inject(PLATFORM_ID) protected platformId: string) {}

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    void this.tryFire();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const fireChanges = changes["fire"];

    if (this.fire && fireChanges && fireChanges.previousValue !== fireChanges.currentValue) {
      void this.tryFire();
    }
  }

  public ngOnDestroy(): void {
    this.renderId++;
    this.container?.destroy();

    this.container = undefined;
  }

  private async tryFire(): Promise<void> {
    const currentRenderId = ++this.renderId;
    const container = await confetti(this.id, this.options);

    if (currentRenderId !== this.renderId) {
      container?.destroy();

      return;
    }

    this.container?.destroy();
    this.container = container;
  }
}
