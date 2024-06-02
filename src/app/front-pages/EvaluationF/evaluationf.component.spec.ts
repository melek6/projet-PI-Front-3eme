import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { EvaluationfComponent } from './evaluationf.component';

describe('EvaluationfComponent', () => {
  let component: EvaluationfComponent;
  let fixture: ComponentFixture<EvaluationfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationfComponent ],
      imports: [ FormsModule ]
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
      trainingProject: '',
      category: '',
      trainingTitle: '',
      dates: '',
      location: '',
      trainer: '',
      participant: '',
      courseContent: 3,
      theoryPractice: 3,
      duration: 3,
      pace: 3,
      materialSupport: 3,
      logistics: 3,
      courseClarity: 3,
      subjectMastery: 3,
      availability: 3,
      teachingMethod: 3,
      workUtility: 3,
      personalDevelopment: 3,
      overallRating: 3,
      comments: ''
    };
    expect(component.evaluation).toEqual(defaultEvaluation);
  });

  it('should update the evaluation object when form fields are changed', async () => {
    fixture.detectChanges();

    const trainingProjectInput = fixture.debugElement.query(By.css('#trainingProject')).nativeElement;
    trainingProjectInput.value = 'Projet Test';
    trainingProjectInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.evaluation.trainingProject).toEqual('Projet Test');
  });

  it('should log evaluation on submit', () => {
    spyOn(console, 'log');
    component.submitEvaluation();
    expect(console.log).toHaveBeenCalledWith(component.evaluation);
  });
});
