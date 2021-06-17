import { TestBed } from '@angular/core/testing';
import { ChatNamesService } from './chat-names.service';

describe('ChatNamesService', () => {
  let service: ChatNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
