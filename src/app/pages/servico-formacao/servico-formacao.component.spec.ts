import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoFormacaoComponent } from './servico-formacao.component';

describe('ServicoFormacaoComponent', () => {
  let component: ServicoFormacaoComponent;
  let fixture: ComponentFixture<ServicoFormacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoFormacaoComponent]
    });
    fixture = TestBed.createComponent(ServicoFormacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
