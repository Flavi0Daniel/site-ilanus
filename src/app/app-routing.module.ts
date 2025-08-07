import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'sobre-nos', component: SobreNosComponent},
  { path: '**', redirectTo: '' }  // rota coringa para redirecionar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
