import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/pages/offre/offre.component.spec.ts
import { OffreComponent } from './offre.component';

describe('OffreComponent', () => {
  let component: OffreComponent;
  let fixture: ComponentFixture<OffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreComponent);
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
