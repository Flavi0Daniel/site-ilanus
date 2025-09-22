import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear: number;
  newsletterEmail: string = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    // Componente inicializado
  }

  /**
   * Submissão do formulário de newsletter
   */
  onNewsletterSubmit(): void {
    if (this.newsletterEmail && this.isValidEmail(this.newsletterEmail)) {
      // Aqui você pode implementar a lógica de envio do email
      // Por exemplo, chamar um serviço para registrar o email na newsletter
      console.log('Email subscrito na newsletter:', this.newsletterEmail);
      
      // Simulação de sucesso
      this.showSuccessMessage('Email subscrito com sucesso!');
      this.newsletterEmail = '';
    } else {
      this.showErrorMessage('Por favor, insira um email válido.');
    }
  }

  /**
   * Validação simples de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Scroll para uma seção específica de serviços
   */
  scrollToService(serviceId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Se não estiver na página de serviços, navegar primeiro
      if (this.router.url !== '/servicos') {
        this.router.navigate(['/servicos']).then(() => {
          this.scrollToElement(serviceId);
        });
      } else {
        this.scrollToElement(serviceId);
      }
    }
  }

  /**
   * Scroll suave para o topo da página
   */
  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Scroll para um elemento específico
   */
  private scrollToElement(elementId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500); // Aguarda a navegação completar
    }
  }

  /**
   * Abrir modal (implementar conforme sua estrutura de modals)
   */
  openModal(modalType: 'privacy' | 'terms'): void {
    // Implementar a lógica de abertura do modal
    // Exemplo: this.modalService.open(modalType);
    console.log(`Abrindo modal: ${modalType}`);
    
    // Por enquanto, pode navegar para páginas específicas
    if (modalType === 'privacy') {
      this.router.navigate(['/politica-privacidade']);
    } else if (modalType === 'terms') {
      this.router.navigate(['/termos-uso']);
    }
  }

  /**
   * Mostrar mensagem de sucesso usando Bootstrap Toast
   */
  private showSuccessMessage(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Criar toast do Bootstrap
      const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
      const toast = this.createToast(message, 'success');
      toastContainer.appendChild(toast);
      
      // Ativar toast do Bootstrap
      const bsToast = new (window as any).bootstrap.Toast(toast);
      bsToast.show();
      
      // Remover toast após ser escondido
      toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
      });
    }
  }

  /**
   * Mostrar mensagem de erro usando Bootstrap Toast
   */
  private showErrorMessage(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
      const toast = this.createToast(message, 'error');
      toastContainer.appendChild(toast);
      
      const bsToast = new (window as any).bootstrap.Toast(toast);
      bsToast.show();
      
      toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
      });
    }
  }

  /**
   * Criar container de toast se não existir
   */
  private createToastContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '1055';
    document.body.appendChild(container);
    return container;
  }

  /**
   * Criar elemento toast do Bootstrap
   */
  private createToast(message: string, type: 'success' | 'error'): HTMLElement {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    const iconClass = type === 'success' ? 'bi-check-circle-fill text-success' : 'bi-exclamation-circle-fill text-danger';
    const title = type === 'success' ? 'Sucesso' : 'Erro';
    
    toast.innerHTML = `
      <div class="toast-header">
        <i class="bi ${iconClass} me-2"></i>
        <strong class="me-auto">${title}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;
    
    return toast;
  }

  /**
   * Navegação para redes sociais (método auxiliar)
   */
  openSocialLink(platform: string): void {
    const socialLinks = {
      facebook: 'https://www.facebook.com/prokcel',
      instagram: 'https://www.instagram.com/prokcel',
      linkedin: 'https://www.linkedin.com/company/prokcel',
      whatsapp: 'https://wa.me/244949193887'
    };

    if (isPlatformBrowser(this.platformId) && socialLinks[platform as keyof typeof socialLinks]) {
      window.open(socialLinks[platform as keyof typeof socialLinks], '_blank');
    }
  }

  /**
   * Método para tracking de eventos (opcional - para analytics)
   */
  trackFooterEvent(eventName: string, eventData?: any): void {
    // Implementar tracking com Google Analytics, Facebook Pixel, etc.
    // Exemplo: gtag('event', eventName, eventData);
    console.log('Footer Event:', eventName, eventData);
  }

  /**
   * Método para lidar com erros de carregamento da imagem da logo
   */
  onLogoError(event: any): void {
    // Fallback caso a imagem não carregue
    event.target.style.display = 'none';
    console.warn('Erro ao carregar logo do footer');
  }

  /**
   * Verificar se está em ambiente de produção
   */
  private isProduction(): boolean {
    return !this.router.url.includes('localhost');
  }

}
