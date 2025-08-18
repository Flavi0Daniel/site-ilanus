import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

interface CompanyInfo {
  description: string;
  vision: string;
  mission: string;
  differentials: string;
}

interface CompanyStat {
  number: string;
  label: string;
  targetValue: number;
}



@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.css']
})
export class SobreNosComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren('statElement') statElements!: QueryList<ElementRef>;

  private subscriptions: Subscription[] = [];
  private animatedNumbers: { [key: string]: number } = {};

  companyValues: CompanyValue[] = [
    {
      title: 'Integridade',
      description: 'Compromisso com a ética e transparência em todas as nossas ações.',
      icon: 'bi bi-check2-square'
    },
    {
      title: 'Excelência',
      description: 'Busca contínua pela qualidade superior em serviços e resultados.',
      icon: 'bi bi-award'
    },
    {
      title: 'Inovação',
      description: 'Fomentar a criatividade e a inovação para superar as expectativas dos clientes.',
      icon: 'bi bi-lightbulb'
    },
    {
      title: 'Desenvolvimento',
      description: 'Promover o crescimento pessoal e profissional dos nossos clientes e colaboradores.',
      icon: 'bi bi-graph-up-arrow'
    },
    {
      title: 'Colaboração',
      description: 'Trabalhar em conjunto com os parceiros para alcançar objetivos comuns.',
      icon: 'bi bi-people'
    }
  ];

  companyStats: CompanyStat[] = [
    {
      number: '24',
      label: 'Módulos profissionais online',
      targetValue: 24
    },
    {
      number: '16',
      label: 'Mentores líderes do setor',
      targetValue: 16
    },
    {
      number: '4.000',
      label: 'Graduados qualificados',
      targetValue: 4000
    },
    {
      number: '99%',
      label: 'De satisfação pelos estudantes',
      targetValue: 99
    }
  ];

  companyInfo: CompanyInfo = {
    description: 'Prokcel é uma empresa especialista em programas de estágios e treinamentos profissionais. Oferecemos a melhor experiência para organizações e indivíduos motivados em desenvolver competências profissionais e aumentar sua produtividade.',
    vision: 'Ser reconhecida como a empresa mais qualificada na área de estágios e formação profissional em Angola.',
    mission: 'Empoderar indivíduos e organizações através do desenvolvimento de competências transmitidas pelas formações e programas de estágios.',
    differentials: 'Career Lab & Prokcel Lab'
  };

  definingQualities: string[] = [
    'Visão',
    'Foco', 
    'Assertividade',
    'Inovação',
    'Eficiência',
    'Valor Acrescentado',
    'Dinamismo',
    'Qualidade',
    'Paixão pelo trabalho'
  ];

  constructor() {
    // Initialize animated numbers
    this.companyStats.forEach(stat => {
      this.animatedNumbers[stat.number] = 0;
    });
  }

  ngOnInit(): void {
    this.initializeComponent();
    this.setupScrollAnimations();
  }

  ngAfterViewInit(): void {
    this.initializeCounterAnimations();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private initializeComponent(): void {
    // Add any component initialization logic here
    console.log('Sobre Nós component initialized');
  }

  private setupScrollAnimations(): void {
    // Setup intersection observer for scroll-based animations
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, { threshold: 0.1 });

      // Observe elements that need scroll animations
      setTimeout(() => {
        const animateElements = document.querySelectorAll('.value-card, .stat-item');
        animateElements.forEach(el => observer.observe(el));
      }, 100);
    }
  }

  private initializeCounterAnimations(): void {
    // Animate counters when they come into view
    if (typeof IntersectionObserver !== 'undefined') {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const statNumber = target.getAttribute('data-target');
            if (statNumber) {
              this.animateCounter(statNumber);
            }
          }
        });
      }, { threshold: 0.5 });

      setTimeout(() => {
        const counterElements = document.querySelectorAll('[data-target]');
        counterElements.forEach(el => counterObserver.observe(el));
      }, 100);
    }
  }

  private animateCounter(statNumber: string): void {
    const stat = this.companyStats.find(s => s.number === statNumber);
    if (!stat || this.animatedNumbers[statNumber] > 0) return;

    const targetValue = stat.targetValue;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = targetValue / steps;
    const stepDuration = duration / steps;

    const counterSubscription = interval(stepDuration).pipe(
      take(steps)
    ).subscribe((step) => {
      const currentValue = Math.min(stepValue * (step + 1), targetValue);
      
      if (statNumber.includes('%')) {
        this.animatedNumbers[statNumber] = Math.round(currentValue);
      } else if (statNumber.includes('.')) {
        this.animatedNumbers[statNumber] = Math.round(currentValue);
      } else {
        this.animatedNumbers[statNumber] = Math.round(currentValue);
      }
    });

    this.subscriptions.push(counterSubscription);
  }

  getAnimatedNumber(statNumber: string): string {
    const animatedValue = this.animatedNumbers[statNumber];
    
    if (statNumber === '99%') {
      return animatedValue + '%';
    } else if (statNumber === '4.000') {
      return animatedValue >= 1000 ? (animatedValue / 1000).toFixed(1) + 'K' : animatedValue.toString();
    } else {
      return animatedValue.toString();
    }
  }

  // Track by functions for ngFor optimization
  trackByValueTitle(index: number, item: CompanyValue): string {
    return item.title;
  }

  trackByQuality(index: number, item: string): string {
    return item;
  }

  // Event handlers for value cards
  onValueCardHover(value: CompanyValue): void {
    // Add hover effect logic here if needed
    console.log(`Hovered on value: ${value.title}`);
  }

  onValueCardLeave(value: CompanyValue): void {
    // Add leave effect logic here if needed
    console.log(`Left value card: ${value.title}`);
  }

  // Scroll event handler
  onScroll(): void {
    // Handle scroll-based animations or effects
    const scrollPosition = window.pageYOffset;
    
    // Add parallax effect or other scroll-based animations here
    this.updateParallaxEffects(scrollPosition);
  }

  private updateParallaxEffects(scrollPosition: number): void {
    // Implement parallax effects based on scroll position
    const parallaxElements = document.querySelectorAll('.mission-bg-overlay');
    parallaxElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      const speed = 0.5;
      const yPos = -(scrollPosition * speed);
      htmlElement.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Method to get company stats for external use
  getCompanyStats(): CompanyStat[] {
    return this.companyStats;
  }

  // Method to get company values for external use
  getCompanyValues(): CompanyValue[] {
    return this.companyValues;
  }

  // Method to get defining qualities for external use
  getDefiningQualities(): string[] {
    return this.definingQualities;
  }

  // Method to check if component is fully loaded
  isComponentReady(): boolean {
    return this.companyValues.length > 0 && 
           this.companyStats.length > 0 && 
           this.definingQualities.length > 0;
  }

}
