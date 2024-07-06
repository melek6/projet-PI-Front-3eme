import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionManagementComponent } from './proposition-management.component';

describe('PropositionManagementComponent', () => {
  let component: PropositionManagementComponent;
  let fixture: ComponentFixture<PropositionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropositionManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropositionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
