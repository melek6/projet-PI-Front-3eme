import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalformationModalComponent } from './evalformation-modal.component';

describe('EvalformationModalComponent', () => {
  let component: EvalformationModalComponent;
  let fixture: ComponentFixture<EvalformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalformationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
