import { TestBed } from '@angular/core/testing';
import { ChatheadTopService } from './chathead-top.service';

describe('ChatheadTopService', () => {
  let service: ChatheadTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatheadTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
