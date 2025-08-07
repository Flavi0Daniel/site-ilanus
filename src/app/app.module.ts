import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { HeroComponent } from './componente/hero/hero.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ServicosComponent,
    ContactosComponent,
    HeroComponent,
    SobreNosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
