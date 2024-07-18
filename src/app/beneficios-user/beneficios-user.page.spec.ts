import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosUserPage } from './beneficios-user.page';

describe('BeneficiosUserPage', () => {
  let component: BeneficiosUserPage;
  let fixture: ComponentFixture<BeneficiosUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiosUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
