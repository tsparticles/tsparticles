import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { provideIonicAngular } from "@ionic/angular/standalone";

import { Tab2Page } from "./tab2.page";

describe("Tab2Page", () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Tab2Page],
      providers: [provideIonicAngular()],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
