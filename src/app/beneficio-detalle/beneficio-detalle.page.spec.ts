import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficioDetallePage } from './beneficio-detalle.page';

describe('BeneficioDetallePage', () => {
  let component: BeneficioDetallePage;
  let fixture: ComponentFixture<BeneficioDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficioDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
