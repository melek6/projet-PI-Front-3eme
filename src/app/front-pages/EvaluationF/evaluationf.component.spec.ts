import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationfComponent } from './evaluationf.component';

describe('EvaluationfComponent', () => {
  let component: EvaluationfComponent;
  let fixture: ComponentFixture<EvaluationfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});