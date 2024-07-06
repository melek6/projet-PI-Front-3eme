import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseModalComponent } from './ReponseModalComponent';

describe('ReponseModalComponent', () => {
  let component: ReponseModalComponent;
  let fixture: ComponentFixture<ReponseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
