import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarTableComponent } from './admin-car-table.component';

describe('AdminCarTableComponent', () => {
  let component: AdminCarTableComponent;
  let fixture: ComponentFixture<AdminCarTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCarTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
