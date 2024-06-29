import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotMDPComponent } from './forgot-mdp.component';

describe('ForgotMDPComponent', () => {
  let component: ForgotMDPComponent;
  let fixture: ComponentFixture<ForgotMDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotMDPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotMDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
