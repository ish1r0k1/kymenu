import { TestBed } from '@angular/core/testing';

import { RecipeRepositoryService } from './recipe-repository.service';

describe('RecipeRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeRepositoryService = TestBed.get(RecipeRepositoryService);
    expect(service).toBeTruthy();
  });
});
