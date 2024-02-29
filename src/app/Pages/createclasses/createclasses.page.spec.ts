import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateclassesPage } from './createclasses.page';

describe('CreateclassesPage', () => {
  let component: CreateclassesPage;
  let fixture: ComponentFixture<CreateclassesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateclassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
