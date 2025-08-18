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
    
    // Fechar menu se clicar fora dele
    if (navbar && toggler && this.isMenuOpen) {
      if (!navbar.contains(target) && !toggler.contains(target)) {
        this.closeMenu();
      }
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
}