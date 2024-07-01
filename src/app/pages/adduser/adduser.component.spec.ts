import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/pages/adduser/adduser.component.spec.ts
import { AdduserComponent } from './adduser.component';

describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdduserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdduserComponent);
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
