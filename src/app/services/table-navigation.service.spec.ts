import { TestBed, inject } from '@angular/core/testing';

import { TableNavigationService } from './table-navigation.service';

describe('TableNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableNavigationService]
    });
  });

  it('should ...', inject([TableNavigationService], (service: TableNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
