import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MifamiliaPage } from './mifamilia.page';

describe('MifamiliaPage', () => {
  let component: MifamiliaPage;
  let fixture: ComponentFixture<MifamiliaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MifamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
