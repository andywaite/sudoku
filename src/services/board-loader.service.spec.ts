import { TestBed } from '@angular/core/testing';

import { BoardLoaderService } from './board-loader.service';

describe('BoardLoaderService', () => {
  let service: BoardLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
