import { TestBed } from '@angular/core/testing';

import { NgParticlesService } from './ng-particles.service';

describe('NgParticlesService', () => {
  let service: NgParticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgParticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
