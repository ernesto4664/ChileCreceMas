import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficioDetalleUserPage } from './beneficio-detalle-user.page';

describe('BeneficioDetalleUserPage', () => {
  let component: BeneficioDetalleUserPage;
  let fixture: ComponentFixture<BeneficioDetalleUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficioDetalleUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
