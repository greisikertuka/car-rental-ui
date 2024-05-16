import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRatingDialogComponent } from './view-rating-dialog.component';

describe('AlertDialogComponent', () => {
  let component: ViewRatingDialogComponent;
  let fixture: ComponentFixture<ViewRatingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRatingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
