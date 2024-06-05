import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EvaluationfComponent } from './evaluationf.component';

describe('EvaluationfComponent', () => {
  let component: EvaluationfComponent;
  let fixture: ComponentFixture<EvaluationfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationfComponent ],
      imports: [ FormsModule, HttpClientTestingModule ] // Import HttpClientTestingModule for testing HTTP requests
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const defaultEvaluation = {
      id: 0,
      trainingTitle: '',
      date: Date(),
      location: '',
      trainer: '',
      participant: '',
      comments: '',
      score: 0
    };
    expect(component.evaluation).toEqual(defaultEvaluation);
  });

  it('should update the evaluation object when form fields are changed', async () => {
    fixture.detectChanges();

    const trainingTitleInput = fixture.debugElement.query(By.css('#trainingTitle')).nativeElement;
    trainingTitleInput.value = 'Projet Test';
    trainingTitleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.evaluation.trainingTitle).toEqual('Projet Test');
  });

  it('should log evaluation on submit', () => {
    spyOn(console, 'log');
    component.submitEvaluation();
    expect(console.log).toHaveBeenCalledWith(component.evaluation);
  });
});
