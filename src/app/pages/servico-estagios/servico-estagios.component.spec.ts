import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoEstagiosComponent } from './servico-estagios.component';

describe('ServicoEstagiosComponent', () => {
  let component: ServicoEstagiosComponent;
  let fixture: ComponentFixture<ServicoEstagiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoEstagiosComponent]
    });
    fixture = TestBed.createComponent(ServicoEstagiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
