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
import { FireworkOptions, fireworks } from "@tsparticles/fireworks";

@Component({
  selector: "ngx-fireworks",
  standalone: false,
  template: ` <div [id]="id"></div>`,
  styles: [],
})
export class NgxFireworksComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() options?: FireworkOptions;
  @Input() id = "tsparticles";

  #fireworksInstance?: Awaited<ReturnType<typeof fireworks>>;
  #destroyed = false;

  constructor(@Inject(PLATFORM_ID) protected platformId: string) {}

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    void this.#startFireworks();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (this.#destroyed) {
      return;
    }

    if (changes["options"] || changes["id"]) {
      void this.#startFireworks();
    }
  }

  public ngOnDestroy(): void {
    this.#destroyed = true;

    this.#fireworksInstance?.destroy();

    this.#fireworksInstance = undefined;
  }

  async #startFireworks(): Promise<void> {
    this.#fireworksInstance?.destroy();

    this.#fireworksInstance = undefined;

    this.#fireworksInstance = await fireworks(this.id, this.options);

    this.#fireworksInstance?.play();
  }
}
