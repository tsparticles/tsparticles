import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { provideIonicAngular } from "@ionic/angular/standalone";

import { Tab1Page } from "./tab1.page";

describe("Tab1Page", () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Tab1Page],
      providers: [provideIonicAngular()],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
