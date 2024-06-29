import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCondidatComponent } from './liste-condidat.component';

describe('ListeCondidatComponent', () => {
  let component: ListeCondidatComponent;
  let fixture: ComponentFixture<ListeCondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCondidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
