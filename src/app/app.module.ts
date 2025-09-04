import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { HeroComponent } from './componente/hero/hero.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { ServicoEstagiosComponent } from './pages/servico-estagios/servico-estagios.component';
import { ServicoFormacaoComponent } from './pages/servico-formacao/servico-formacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ServicosComponent,
    ContactosComponent,
    HeroComponent,
    SobreNosComponent,
    ServicoEstagiosComponent,
    ServicoFormacaoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
