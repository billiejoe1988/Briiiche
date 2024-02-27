import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersComponent } from './buyers.component';

describe('BuyersComponent', () => {
  let component: BuyersComponent;
  let fixture: ComponentFixture<BuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
