import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddevalComponent } from './addeval.component';

describe('AddevalComponent', () => {
  let component: AddevalComponent;
  let fixture: ComponentFixture<AddevalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddevalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddevalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
