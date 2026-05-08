import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNavbar } from './menu-navbar';

describe('MenuNavbar', () => {
  let component: MenuNavbar;
  let fixture: ComponentFixture<MenuNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
