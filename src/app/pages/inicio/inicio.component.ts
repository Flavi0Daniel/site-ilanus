import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  private carousel: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Inicializar o carrossel após a view ser carregada
    setTimeout(() => {
      this.initializeCarousel();
    }, 100);
  }

  ngOnDestroy(): void {
    // Limpar o carrossel quando o componente for destruído
    if (this.carousel) {
      this.carousel.dispose();
    }
  }

  /**
   * Inicializa o carrossel de testemunhos com suporte a touch/swipe
   */
  private initializeCarousel(): void {
    const carouselElement = document.getElementById('testimonialsCarousel');
    
    if (carouselElement && bootstrap?.Carousel) {
      // Inicializar o carrossel do Bootstrap com touch habilitado
      this.carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // 5 segundos
        ride: 'carousel',
        pause: 'hover',
        wrap: true,
        touch: true // Habilita navegação por touch/swipe
      });

      // Adicionar eventos para pausar ao interagir
      carouselElement.addEventListener('mouseenter', () => {
        if (this.carousel) {
          this.carousel.pause();
        }
      });

      carouselElement.addEventListener('mouseleave', () => {
        if (this.carousel) {
          this.carousel.cycle();
        }
      });

      // Eventos de touch para mobile
      carouselElement.addEventListener('touchstart', () => {
        if (this.carousel) {
          this.carousel.pause();
        }
      });

      carouselElement.addEventListener('touchend', () => {
        setTimeout(() => {
          if (this.carousel) {
            this.carousel.cycle();
          }
        }, 3000); // Retoma após 3s do último touch
      });
    }
  }

  /**
   * Navega para a página de serviços
   */
  navigateToServices(): void {
    this.router.navigate(['/servicos']);
  }

  /**
   * Navega para a página de serviços de formaçao
   */
  navigateToServiceFormation(): void {
    this.router.navigate(['/servico-formacao']);
  }

  /**
   * Navega para a página de serviços de estagios
   */
  navigateToServiceEstagio(): void {
    this.router.navigate(['/servico-estagios']);
  }

}