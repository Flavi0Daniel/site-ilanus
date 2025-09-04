import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;
  isHomePage = false;
  isDropdownOpen = false;
  
  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar se estamos na página inicial
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.url === '/' || event.url === '';
    });
    
    // Verificar página inicial no carregamento
    this.isHomePage = this.router.url === '/' || this.router.url === '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const navbar = document.getElementById('navbarNav');
    const toggler = document.querySelector('.navbar-toggler');
    const dropdown = target.closest('.dropdown');
   
    // Fechar menu se clicar fora dele
    if (navbar && toggler && this.isMenuOpen) {
      if (!navbar.contains(target) && !toggler.contains(target)) {
        this.closeMenu();
      }
    }

    // Fechar dropdown se clicar fora dele
    if (!dropdown && this.isDropdownOpen) {
      this.hideDropdown();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
   
    // Forçar o Bootstrap a reconhecer o estado
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
      if (this.isMenuOpen) {
        navbarCollapse.classList.add('show');
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isDropdownOpen = false;
   
    // Garantir que o Bootstrap remova a classe 'show'
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }

  navigateAndClose(route: string) {
    this.router.navigate([route]);
    this.closeMenu();
  }

  // Métodos para controlar o dropdown
  private hideTimeout: any;

  showDropdown() {
    // Só mostrar dropdown no desktop
    if (window.innerWidth > 991) {
      // Cancelar qualquer timeout de esconder pendente
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      this.isDropdownOpen = true;
    }
  }

  hideDropdown() {
    // Só esconder dropdown no desktop se não estiver no mobile
    if (window.innerWidth > 991) {
      // Delay para permitir movimento do mouse para o submenu
      this.hideTimeout = setTimeout(() => {
        this.isDropdownOpen = false;
      }, 200);
    }
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    
    // No mobile, toggle o dropdown
    if (window.innerWidth <= 991) {
      this.isDropdownOpen = !this.isDropdownOpen;
    } else {
      // No desktop, mostrar dropdown
      this.isDropdownOpen = true;
    }
  }

  // Verificar se alguma rota de serviços está ativa
  isServicosActive(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/servico-estagios') || currentRoute.includes('/servico-formacao');
  }
}