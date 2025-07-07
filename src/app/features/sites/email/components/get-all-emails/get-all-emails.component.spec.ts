import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllEmailsComponent } from './get-all-emails.component';

describe('GetAllEmailsComponent', () => {
  let component: GetAllEmailsComponent;
  let fixture: ComponentFixture<GetAllEmailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllEmailsComponent]
    });
    fixture = TestBed.createComponent(GetAllEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
