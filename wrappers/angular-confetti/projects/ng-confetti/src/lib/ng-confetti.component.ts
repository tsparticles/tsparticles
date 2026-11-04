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

const containerOwners = new WeakMap<Container, number>();

function retainContainer(container: Container): void {
  containerOwners.set(container, (containerOwners.get(container) ?? 0) + 1);
}

function releaseContainer(container: Container): void {
  const owners = containerOwners.get(container);

  if (owners === undefined) {
    return;
  }

  if (owners === 1) {
    containerOwners.delete(container);
    container.destroy();
  } else {
    containerOwners.set(container, owners - 1);
  }
}

@Component({
  selector: "ngx-confetti",
  standalone: false,
  template: '<div [id]="id"></div>',
})
export class NgxConfettiComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() options?: ConfettiOptions;
  @Input() id = "tsparticles";
  @Input() fire: boolean | number = true;

  #container?: Container;
  #renderId = 0;

  constructor(@Inject(PLATFORM_ID) protected platformId: string) {}

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    void this.#tryFire();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const fireChanges = changes["fire"];

    if (this.fire && fireChanges && fireChanges.previousValue !== fireChanges.currentValue) {
      void this.#tryFire();
    }
  }

  public ngOnDestroy(): void {
    this.#renderId++;

    const container = this.#container;
    this.#container = undefined;

    if (container) {
      releaseContainer(container);
    }
  }

  async #tryFire(): Promise<void> {
    const currentRenderId = ++this.#renderId;
    const container = await confetti(this.id, this.options);

    if (currentRenderId !== this.#renderId) {
      return;
    }

    const previousContainer = this.#container;

    if (container !== previousContainer) {
      if (container) {
        retainContainer(container);
      }

      this.#container = container;

      if (previousContainer) {
        releaseContainer(previousContainer);
      }
    }
  }
}
