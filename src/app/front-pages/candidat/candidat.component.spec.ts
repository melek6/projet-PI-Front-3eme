import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/front-pages/candidat/candidat.component.spec.ts
import { CandidatComponent } from './candidat.component';

describe('CandidatComponent', () => {
  let component: CandidatComponent;
  let fixture: ComponentFixture<CandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatComponent);
========
import { ReactFormComponent } from './react-form.component';

describe('ReactFormComponent', () => {
  let component: ReactFormComponent;
  let fixture: ComponentFixture<ReactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactFormComponent);
>>>>>>>> 9b7cfcd (feat: Création  Evaluation de la formation):src/app/front-pages/react-form/react-form.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
