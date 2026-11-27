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
import { FireworkOptions, createFireworks } from "@tsparticles/fireworks";
import type { Engine } from "@tsparticles/engine";
import { isPlatformServer } from "@angular/common";

@Component({
  selector: "ngx-fireworks",
  standalone: false,
  template: ` <div [id]="id"></div>`,
  styles: [],
})
export class NgxFireworksComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() engine!: Engine;
  @Input() options?: FireworkOptions;
  @Input() id = "tsparticles";

  #api?: ReturnType<typeof createFireworks>;
  #apiEngine?: Engine;

  #getApi(): ReturnType<typeof createFireworks> {
    if (!this.#api || this.#apiEngine !== this.engine) {
      this.#api = createFireworks(this.engine);
      this.#apiEngine = this.engine;
    }
    return this.#api;
  }

  #fireworksInstance?: Awaited<ReturnType<ReturnType<typeof createFireworks>>>;
  #destroyed = false;
  #viewReady = false;
  #loadId = 0;

  constructor(@Inject(PLATFORM_ID) protected platformId: string) {}

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.#viewReady = true;
    void this.#startFireworks();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (this.#destroyed || !this.#viewReady) {
      return;
    }

    if (changes["engine"] || changes["options"] || changes["id"]) {
      void this.#startFireworks();
    }
  }

  public ngOnDestroy(): void {
    this.#destroyed = true;
    ++this.#loadId;

    this.#fireworksInstance?.destroy();

    this.#fireworksInstance = undefined;
  }

  async #startFireworks(): Promise<void> {
    this.#fireworksInstance?.destroy();
    this.#fireworksInstance = undefined;

    const currentLoadId = ++this.#loadId;
    const instance = await this.#getApi()(this.id, this.options);

    if (currentLoadId !== this.#loadId) {
      instance?.destroy();
      return;
    }

    this.#fireworksInstance = instance;
    this.#fireworksInstance?.play();
  }
}
