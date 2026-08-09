import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { provideIonicAngular } from "@ionic/angular/standalone";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideIonicAngular()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // TODO: add more tests!
});
