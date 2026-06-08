import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Informatico } from './informatico';

describe('Informatico', () => {
  let component: Informatico;
  let fixture: ComponentFixture<Informatico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Informatico],
    }).compileComponents();

    fixture = TestBed.createComponent(Informatico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
