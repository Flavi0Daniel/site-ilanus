import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var bootstrap: any;

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

@Component({
  selector: 'app-servico-estagios',
  templateUrl: './servico-estagios.component.html',
  styleUrls: ['./servico-estagios.component.css']
})
export class ServicoEstagiosComponent implements OnInit {

  // URL do PHP (ajuste conforme seu ambiente)
  // private PHP_URL = 'http://localhost:8080/send_email.php'; // Desenvolvimento local
  // Para produção na Hostgator, use: 
   private PHP_URL = 'https://prokcel.com/send_email.php';


  // Formulários para as modais
  formParticular: FormGroup;
  formEmpresa: FormGroup;

  // Estados de carregamento
  isLoadingWhatsApp = false;
  isLoadingEmail = false;

  // Lista de estágios disponíveis
  //estagiosDisponiveis = [
   // 'Gestão',
   // 'Contabilidade e Finanças',
   // 'Economia',
   // 'Marketing',
   // 'Arquitetura e Urbanismo',
   // 'Engenharia Informática',
  //  'Direito',
  //  'Gestão de Recursos Humanos',
   // 'Comunicação Social'
    
  //];

  estagiosDisponiveis = [
  { nome: 'Gestão', icone: 'bi-briefcase' },
  { nome: 'Contabilidade e Finanças', icone: 'bi-calculator' },
  { nome: 'Economia', icone: 'bi-graph-up-arrow' },
  { nome: 'Marketing', icone: 'bi-megaphone' },
  { nome: 'Arquitetura e Urbanismo', icone: 'bi bi-rulers' },
  { nome: 'Engenharia Informática', icone: 'bi-laptop' },
  { nome: 'Direito', icone: 'bi-bank' }, // ou  bi-balance-scale
  { nome: 'Gestão de Recursos Humanos', icone: 'bi-people' },
  { nome: 'Comunicação Social', icone: 'bi-chat-quote' }
];

  // Lista de vantagens
  vantagens = [
    {
      icon: 'bi-book',
      titulo: 'Aplicação Prática dos Conhecimentos',
      descricao: 'Aplicação prática dos conhecimentos adquiridos na academia em ambiente empresarial real'
    },
    {
      icon: 'bi-building',
      titulo: 'Visão Clara da Rotina Empresarial',
      descricao: 'Visão mais clara da rotina de uma empresa e criação de networking profissional'
    },
    {
      icon: 'bi-briefcase',
      titulo: 'Clareza sobre a Profissão',
      descricao: 'Visão mais clara sobre a profissão escolhida e experiência profissional enriquecedora'
    },
    {
      icon: 'bi-buildings',
      titulo: 'Garantia de Estágio',
      descricao: 'Garantimos estágio em duas ou mais empresas para todos os assinantes'
    },
    {
      icon: 'bi-graph-up-arrow',
      titulo: 'Aperfeiçoamento de Competências',
      descricao: 'Aperfeiçoamento e/ou desenvolvimento das habilidades e competências profissionais'
    },
    {
      icon: 'bi-door-open',
      titulo: 'Novas Oportunidades',
      descricao: 'Inserção em novas realidades de trabalho e possibilidade de ser efetivado'
    },
    {
      icon: 'bi-file-earmark-text',
      titulo: 'Referência Profissional',
      descricao: 'Obtenção de referência no final do período de estágio e possibilidade de ser indicado a outras entidades'
    },
    {
      icon: 'bi-tag',
      titulo: 'Desconto Especial',
      descricao: 'Desconto de 5% em todos os nossos produtos, para clientes e parceiros.'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    // Inicialização dos formulários
    this.formParticular = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]{9,15}$/)]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]{9,15}$/)]],
      estagio: ['', Validators.required],
      mensagem: ['']
    });

    this.formEmpresa = this.formBuilder.group({
      nomeEmpresa: ['', [Validators.required, Validators.minLength(2)]],
      numeroFormandos: ['', [Validators.required, Validators.min(1)]],
      seuNome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]{9,15}$/)]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]{9,15}$/)]],
      estagio: ['', Validators.required],
      mensagem: ['']
    });
  }

  ngOnInit(): void {
    // Não é mais necessário inicializar EmailJS
  }

  /**
   * Abre a modal para inscrição de particular
   */
  abrirModalParticular(): void {
    const modalElement = document.getElementById('modalParticular');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  /**
   * Abre a modal para inscrição de empresa
   */
  abrirModalEmpresa(): void {
    const modalElement = document.getElementById('modalEmpresa');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  /**
   * Envia mensagem via WhatsApp para particular
   */
  enviarWhatsAppParticular(): void {
    if (this.formParticular.valid) {
      this.isLoadingWhatsApp = true;
      
      const dados = this.formParticular.value;
      const mensagem = this.criarMensagemWhatsAppParticular(dados);
      
      setTimeout(() => {
        const numeroWhatsApp = '+244949193887';
        const url = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(url, '_blank');
        this.isLoadingWhatsApp = false;
        
        this.fecharModal('modalParticular');
        this.mostrarSucesso('WhatsApp');
        this.limparFormulario('particular');
      }, 1000);
    } else {
      this.marcarCamposInvalidos(this.formParticular);
    }
  }

  /**
   * Envia mensagem via WhatsApp para empresa
   */
  enviarWhatsAppEmpresa(): void {
    if (this.formEmpresa.valid) {
      this.isLoadingWhatsApp = true;
      
      const dados = this.formEmpresa.value;
      const mensagem = this.criarMensagemWhatsAppEmpresa(dados);
      
      setTimeout(() => {
        const numeroWhatsApp = '+244949193887';
        const url = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(url, '_blank');
        this.isLoadingWhatsApp = false;
        
        this.fecharModal('modalEmpresa');
        this.mostrarSucesso('WhatsApp');
        this.limparFormulario('empresa');
      }, 1000);
    } else {
      this.marcarCamposInvalidos(this.formEmpresa);
    }
  }

  /**
   * Envia email via PHP para particular
   */
  enviarEmailParticular(): void {
    if (this.formParticular.valid) {
      this.isLoadingEmail = true;
      
      const dados = {
        ...this.formParticular.value,
        tipo: 'Particular'
      };

      this.enviarEmailPHP(dados).subscribe({
        next: (response) => {
          this.isLoadingEmail = false;
          if (response.success) {
            this.fecharModal('modalParticular');
            this.mostrarSucesso('Email');
            this.limparFormulario('particular');
          } else {
            this.mostrarErro(response.message);
          }
        },
        error: (error) => {
          this.isLoadingEmail = false;
          this.mostrarErro('Erro ao enviar email. Tente novamente.');
          console.error('Erro:', error);
        }
      });
    } else {
      this.marcarCamposInvalidos(this.formParticular);
    }
  }

  /**
   * Envia email via PHP para empresa
   */
  enviarEmailEmpresa(): void {
    if (this.formEmpresa.valid) {
      this.isLoadingEmail = true;
      
      const dados = {
        ...this.formEmpresa.value,
        tipo: 'Empresa'
      };

      this.enviarEmailPHP(dados).subscribe({
        next: (response) => {
          this.isLoadingEmail = false;
          if (response.success) {
            this.fecharModal('modalEmpresa');
            this.mostrarSucesso('Email');
            this.limparFormulario('empresa');
          } else {
            this.mostrarErro(response.message);
          }
        },
        error: (error) => {
          this.isLoadingEmail = false;
          this.mostrarErro('Erro ao enviar email. Tente novamente.');
          console.error('Erro:', error);
        }
      });
    } else {
      this.marcarCamposInvalidos(this.formEmpresa);
    }
  }

  /**
   * Envia dados para o PHP via HTTP POST
   */
  private enviarEmailPHP(dados: any): Observable<EmailResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<EmailResponse>(this.PHP_URL, dados, { headers });
  }

  /**
   * Envia para ambos (WhatsApp e Email) - Particular
   */
  enviarAmbosParticular(): void {
    if (this.formParticular.valid) {
      // Envia WhatsApp
      const dados = this.formParticular.value;
      const mensagem = this.criarMensagemWhatsAppParticular(dados);
      const numeroWhatsApp = '+244925102139';
      const url = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
      
      // Envia Email via PHP
      this.isLoadingEmail = true;
      const dadosEmail = {
        ...dados,
        tipo: 'Particular'
      };

      this.enviarEmailPHP(dadosEmail).subscribe({
        next: (response) => {
          this.isLoadingEmail = false;
          if (response.success) {
            this.fecharModal('modalParticular');
            this.mostrarSucesso('ambos');
            this.limparFormulario('particular');
          } else {
            this.mostrarErro('WhatsApp enviado, mas houve erro no email: ' + response.message);
          }
        },
        error: (error) => {
          this.isLoadingEmail = false;
          this.mostrarErro('WhatsApp enviado, mas houve erro no email.');
          console.error('Erro:', error);
        }
      });
    } else {
      this.marcarCamposInvalidos(this.formParticular);
    }
  }

  /**
   * Envia para ambos (WhatsApp e Email) - Empresa
   */
  enviarAmbosEmpresa(): void {
    if (this.formEmpresa.valid) {
      // Envia WhatsApp
      const dados = this.formEmpresa.value;
      const mensagem = this.criarMensagemWhatsAppEmpresa(dados);
      const numeroWhatsApp = '+244925102139';
      const url = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
      
      // Envia Email via PHP
      this.isLoadingEmail = true;
      const dadosEmail = {
        ...dados,
        tipo: 'Empresa'
      };

      this.enviarEmailPHP(dadosEmail).subscribe({
        next: (response) => {
          this.isLoadingEmail = false;
          if (response.success) {
            this.fecharModal('modalEmpresa');
            this.mostrarSucesso('ambos');
            this.limparFormulario('empresa');
          } else {
            this.mostrarErro('WhatsApp enviado, mas houve erro no email: ' + response.message);
          }
        },
        error: (error) => {
          this.isLoadingEmail = false;
          this.mostrarErro('WhatsApp enviado, mas houve erro no email.');
          console.error('Erro:', error);
        }
      });
    } else {
      this.marcarCamposInvalidos(this.formEmpresa);
    }
  }

  /**
   * Cria mensagem formatada para WhatsApp - Particular
   */
  private criarMensagemWhatsAppParticular(dados: any): string {
    return `🎓 *PROKCEL - INSCRIÇÃO ESTÁGIO PROFISSIONAL* 🎓

👤 *Dados Pessoais:*
• Nome: ${dados.nomeCompleto}
• Email: ${dados.email}
• Telefone: ${dados.telefone}
• WhatsApp: ${dados.whatsapp}

📚 *Estágio Escolhido:*
• ${dados.estagio}

${dados.mensagem ? `💬 *Mensagem:*\n${dados.mensagem}` : ''}

_Mensagem enviada através do site da Prokcel_`;
  }

  /**
   * Cria mensagem formatada para WhatsApp - Empresa
   */
  private criarMensagemWhatsAppEmpresa(dados: any): string {
    return `🏢 *PROKCEL - INSCRIÇÃO ESTÁGIO EMPRESARIAL* 🏢

🏢 *Dados da Empresa:*
• Empresa: ${dados.nomeEmpresa}
• Nº Formandos: ${dados.numeroFormandos}
• Responsável: ${dados.seuNome}

📞 *Contactos:*
• Email: ${dados.email}
• Telefone: ${dados.telefone}
• WhatsApp: ${dados.whatsapp}

📚 *Estágio Escolhido:*
• ${dados.estagio}

${dados.mensagem ? `💬 *Mensagem:*\n${dados.mensagem}` : ''}

_Mensagem enviada através do site da Prokcel_`;
  }

  /**
   * Fecha modal pelo ID
   */
  private fecharModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }

  /**
   * Limpa formulário
   */
  private limparFormulario(tipo: 'particular' | 'empresa'): void {
    if (tipo === 'particular') {
      this.formParticular.reset();
    } else {
      this.formEmpresa.reset();
    }
  }

  /**
   * Marca campos inválidos para exibir erros
   */
  private marcarCamposInvalidos(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.invalid) {
        control.markAsTouched();
      }
    });
  }

  /**
   * Mostra mensagem de sucesso
   */
  private mostrarSucesso(tipo: string): void {
    if (tipo === 'ambos') {
      alert('✅ Inscrição enviada com sucesso via WhatsApp e Email! Em breve entraremos em contacto.');
    } else {
      alert(`✅ Inscrição enviada com sucesso via ${tipo}! Em breve entraremos em contacto.`);
    }
  }

  /**
   * Mostra mensagem de erro
   */
  private mostrarErro(mensagem?: string): void {
    alert(`❌ ${mensagem || 'Erro ao enviar inscrição. Tente novamente.'}`);
  }

  /**
   * Verifica se campo é inválido e foi tocado
   */
  isCampoInvalido(form: FormGroup, campo: string): boolean {
    const control = form.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /**
   * Retorna mensagem de erro do campo
   */
  getMensagemErro(form: FormGroup, campo: string): string {
    const control = form.get(campo);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Campo obrigatório';
      }
      if (control.errors['email']) {
        return 'Email inválido';
      }
      if (control.errors['minlength']) {
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['pattern']) {
        return 'Formato inválido';
      }
      if (control.errors['min']) {
        return 'Valor deve ser maior que 0';
      }
    }
    return '';
  }

}
