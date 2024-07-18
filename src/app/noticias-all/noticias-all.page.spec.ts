import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasAllPage } from './noticias-all.page';

describe('NoticiasAllPage', () => {
  let component: NoticiasAllPage;
  let fixture: ComponentFixture<NoticiasAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
