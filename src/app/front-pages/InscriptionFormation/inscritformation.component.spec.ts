import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritFormationComponent } from './inscritformation.component';

describe('InscritFormationComponent', () => {
  let component: InscritFormationComponent;
  let fixture: ComponentFixture<InscritFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscritFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscritFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});