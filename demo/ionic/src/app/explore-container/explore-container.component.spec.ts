import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { provideIonicAngular } from "@ionic/angular/standalone";

import { ExploreContainerComponent } from "./explore-container.component";

describe("ExploreContainerComponent", () => {
  let component: ExploreContainerComponent;
  let fixture: ComponentFixture<ExploreContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExploreContainerComponent],
      providers: [provideIonicAngular()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
