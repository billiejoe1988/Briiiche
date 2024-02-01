import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundModuleComponent } from './not-found-module.component';

describe('NotFoundModuleComponent', () => {
  let component: NotFoundModuleComponent;
  let fixture: ComponentFixture<NotFoundModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotFoundModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
