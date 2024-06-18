import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEvalformationComponent } from './gestion-evalformation.component';

describe('GestionEvalformationComponent', () => {
  let component: GestionEvalformationComponent;
  let fixture: ComponentFixture<GestionEvalformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEvalformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEvalformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
