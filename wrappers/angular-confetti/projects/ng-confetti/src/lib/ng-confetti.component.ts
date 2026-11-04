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
const pendingContainerRequests = new Map<string, number>();
const pendingContainerDestructions = new Map<string, Set<Container>>();

/**
 * Adds an owner reference for a shared container.
 * @param container - The container being retained
 */
function retainContainer(container: Container): void {
  containerOwners.set(container, (containerOwners.get(container) ?? 0) + 1);
}

/**
 * Records an in-flight request for a container identifier.
 * @param id - The requested container identifier
 */
function retainPendingContainerRequest(id: string): void {
  pendingContainerRequests.set(id, (pendingContainerRequests.get(id) ?? 0) + 1);
}

/**
 * Releases an in-flight request and destroys any unowned deferred containers.
 * @param id - The completed container identifier
 */
function releasePendingContainerRequest(id: string): void {
  const pending = pendingContainerRequests.get(id);

  if (pending === 1) {
    pendingContainerRequests.delete(id);

    const containers = pendingContainerDestructions.get(id);

    if (containers) {
      for (const container of containers) {
        if (!containerOwners.has(container) && !container.destroyed) {
          container.destroy();
        }
      }

      pendingContainerDestructions.delete(id);
    }
  } else if (pending !== undefined) {
    pendingContainerRequests.set(id, pending - 1);
  }
}

/**
 * Defers destruction while requests for the identifier are still pending.
 * @param id - The container identifier associated with the request
 * @param container - The container to destroy or defer
 */
function deferContainerDestruction(id: string, container: Container): void {
  if (containerOwners.has(container)) {
    return;
  }

  if (pendingContainerRequests.has(id)) {
    let containers = pendingContainerDestructions.get(id);

    if (!containers) {
      pendingContainerDestructions.set(id, (containers = new Set()));
    }

    containers.add(container);
  } else if (!container.destroyed) {
    container.destroy();
  }
}

/**
 * Releases an owner reference and destroys the container when it is no longer shared.
 * @param container - The container being released
 * @param id - The container identifier
 */
function releaseContainer(container: Container, id: string): void {
  const owners = containerOwners.get(container);

  if (owners === undefined) {
    return;
  }

  if (owners === 1) {
    containerOwners.delete(container);
    deferContainerDestruction(id, container);
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
  #containerId?: string;
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

    const container = this.#container,
      id = this.#containerId;

    this.#container = undefined;
    this.#containerId = undefined;

    if (container && id !== undefined) {
      releaseContainer(container, id);
    }
  }

  async #tryFire(): Promise<void> {
    const currentRenderId = ++this.#renderId,
      id = this.id;

    retainPendingContainerRequest(id);

    try {
      const container = await confetti(id, this.options);

      if (currentRenderId !== this.#renderId) {
        if (container) {
          deferContainerDestruction(id, container);
        }

        return;
      }

      const previousContainer = this.#container,
        previousId = this.#containerId;

      if (container !== previousContainer) {
        if (container) {
          retainContainer(container);
        }

        this.#container = container;
        this.#containerId = container ? id : undefined;

        if (previousContainer && previousId !== undefined) {
          releaseContainer(previousContainer, previousId);
        }
      }
    } finally {
      releasePendingContainerRequest(id);
    }
  }
}
