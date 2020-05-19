import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgParticlesComponent } from './ng-particles.component';

describe('NgParticlesComponent', () => {
  let component: NgParticlesComponent;
  let fixture: ComponentFixture<NgParticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgParticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
