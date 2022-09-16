import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListFlightComponent } from './search-list-flight.component';

describe('SearchListFlightComponent', () => {
  let component: SearchListFlightComponent;
  let fixture: ComponentFixture<SearchListFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
