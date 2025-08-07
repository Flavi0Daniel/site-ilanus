import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private router: Router) { }

  /**
   * Navega para a página de serviços
   */
  navigateToServices(): void {
    this.router.navigate(['/servicos']);
  }

}
