import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAffQuestionComponent } from './modal-aff-question.component';

describe('ModalAffQuestionComponent', () => {
  let component: ModalAffQuestionComponent;
  let fixture: ComponentFixture<ModalAffQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAffQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAffQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
