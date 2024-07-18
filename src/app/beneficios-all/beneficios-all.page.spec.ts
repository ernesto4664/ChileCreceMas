import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficiosAllPage } from './beneficios-all.page';

describe('BeneficiosAllPage', () => {
  let component: BeneficiosAllPage;
  let fixture: ComponentFixture<BeneficiosAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiosAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
