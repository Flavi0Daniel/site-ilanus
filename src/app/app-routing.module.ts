import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { ServicoEstagiosComponent } from './pages/servico-estagios/servico-estagios.component';
import { ServicoFormacaoComponent } from './pages/servico-formacao/servico-formacao.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'sobre-nos', component: SobreNosComponent},
  { path: 'servico-estagios', component: ServicoEstagiosComponent },
  { path: 'servico-formacao', component: ServicoFormacaoComponent},
  { path: '**', redirectTo: '' }  // rota coringa para redirecionar
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // Sempre volta ao topo
    anchorScrolling: 'enabled', // Habilita scroll para âncoras (#section)
    scrollOffset: [0, 64], // Offset para headers fixos (ajuste conforme seu header)
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
