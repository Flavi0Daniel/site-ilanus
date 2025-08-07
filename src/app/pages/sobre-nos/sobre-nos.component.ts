import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.css']
})
export class SobreNosComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  // Faz as animações dispararem quando os cards aparecem na tela
  ngAfterViewInit() {
    const cards: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.card-sobre');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18 });
      cards.forEach(card => observer.observe(card));
    } else {
      // fallback para browsers antigos
      cards.forEach(card => card.classList.add('visible'));
    }
  }

}
