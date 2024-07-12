import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeInscritComponent } from './liste-inscrit.component';

describe('ListeInscritComponent', () => {
  let component: ListeInscritComponent;
  let fixture: ComponentFixture<ListeInscritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeInscritComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeInscritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
