import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreCandidatComponent } from './offre-candidat.component';

describe('OffreCandidatComponent', () => {
  let component: OffreCandidatComponent;
  let fixture: ComponentFixture<OffreCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
