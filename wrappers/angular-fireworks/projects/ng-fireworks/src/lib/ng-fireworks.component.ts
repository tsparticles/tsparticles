import { isPlatformServer } from "@angular/common";
import { AfterViewInit, Component, Inject, Input, OnDestroy, PLATFORM_ID } from "@angular/core";
import { FireworkOptions, fireworks } from "@tsparticles/fireworks";

@Component({
  selector: "ngx-fireworks",
  standalone: false,
  template: ` <div [id]="id"></div>`,
  styles: [],
})
export class NgxFireworksComponent implements AfterViewInit, OnDestroy {
  @Input() options?: FireworkOptions;
  @Input() id = "tsparticles";

  private fireworksInstance?: Awaited<ReturnType<typeof fireworks>>;

  constructor(@Inject(PLATFORM_ID) protected platformId: string) {}

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    void fireworks(this.id, this.options).then(firework => {
      this.fireworksInstance = firework;
    });
  }

  public ngOnDestroy(): void {
    this.fireworksInstance?.stop();
    this.fireworksInstance = undefined;
  }
}
