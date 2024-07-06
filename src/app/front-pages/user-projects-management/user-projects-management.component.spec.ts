import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectsManagementComponent } from './user-projects-management.component';

describe('UserProjectsManagementComponent', () => {
  let component: UserProjectsManagementComponent;
  let fixture: ComponentFixture<UserProjectsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProjectsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProjectsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
