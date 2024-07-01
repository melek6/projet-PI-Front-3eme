import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritModalComponent } from './inscrit-modal.component';

describe('InscritModalComponent', () => {
  let component: InscritModalComponent;
  let fixture: ComponentFixture<InscritModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscritModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscritModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
