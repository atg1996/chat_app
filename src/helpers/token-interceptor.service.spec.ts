import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
