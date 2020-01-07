import { TestBed } from '@angular/core/testing';

import { LogUpdateService } from './log-update.service';
import { ServiceWorkerModule } from '@angular/service-worker';

describe('LogUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ServiceWorkerModule.register('', {enabled: false})]
  }));

  it('should be created', () => {
    const service: LogUpdateService = TestBed.get(LogUpdateService);
    expect(service).toBeTruthy();
  });
});
