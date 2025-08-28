import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailJSResponseStatus } from '@emailjs/browser';
import * as emailjs from '@emailjs/browser';

declare var bootstrap: any;


@Component({
  selector: 'app-servico-estagios',
  templateUrl: './servico-estagios.component.html',
  styleUrls: ['./servico-estagios.component.css']
})
export class ServicoEstagiosComponent implements OnInit {

  // Formulários para as modais
  formParticular: FormGroup;
  formEmpresa: FormGroup;

  // Estados de carregamento
  isLoadingWhatsApp = false;
  isLoadingEmail = false;

  // Lista de estágios disponíveis
  estagiosDisponiveis = [
    'Gestão',
    'Finanças',
    'Economia',
    'Marketing',
    'Arquitetura e Urbanismo',
    'Engenharia Informática',
    'Direito',
    'Gestão de Recursos Humanos',
    'Comunicação Social',
    'Contabilidade'
  ];

  // Lista de vantagens
  vantagens = [
    {
      icon: 'bi-award',
      titulo: 'Certificados Reconhecidos',
      descricao: 'Certificados com informações relevantes para candidaturas e promoções'
    },
    {
      icon: 'bi-file-earmark-text',
      titulo: 'Carta de Recomendação',
      descricao: 'Carta de recomendação aos estagiários com desempenho acima da média'
    },
    {
      icon: 'bi-mortarboard',
      titulo: 'Cursos Personalizados',
      descricao: 'Cursos personalizados e formação ministrada em ambiente empresarial'
    },
    {
      icon: 'bi-person-check',
      titulo: 'Professores Capacitados',
      descricao: 'Professores qualificados e com experiência no mercado'
    },
    {
      icon: 'bi-building',
      titulo: 'Ambiente Empresarial',
      descricao: 'Escritórios com acesso à internet e computadores'
    },
    {
      icon: 'bi-credit-card',
      titulo: 'Pagamento Facilitado',
      descricao: 'Pagamentos em 2 prestações (60% e 40%)'
    }
  ];

  constructor(private formBuilder: FormBuilder) {
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
    // Inicialização do EmailJS (substitua pelos seus IDs)
    emailjs.init("YOUR_PUBLIC_KEY");
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
      
      // Simula delay de envio
      setTimeout(() => {
        const numeroWhatsApp = '+244949193887';
        const url = `https://wa.me/${numeroWhatsApp.replace('+', '')}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(url, '_blank');
        this.isLoadingWhatsApp = false;
        
        // Fecha a modal após envio
        this.fecharModal('modalParticular');
        this.mostrarSucesso();
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
        this.mostrarSucesso();
        this.limparFormulario('empresa');
      }, 1000);
    } else {
      this.marcarCamposInvalidos(this.formEmpresa);
    }
  }

  /**
   * Envia email para particular (simulação - substitua pela minha outra implementação)
   */
  enviarEmailParticular(): void {
    if (this.formParticular.valid) {
      this.isLoadingEmail = true;
      
      // Simulação de envio de email
      setTimeout(() => {
        console.log('Email enviado para particular:', this.formParticular.value);
        this.isLoadingEmail = false;
        this.fecharModal('modalParticular');
        this.mostrarSucesso();
        this.limparFormulario('particular');
      }, 2000);

      // Implementação real do EmailJS (descomentar quando configurar)
      /*
      const templateParams = {
        to_email: 'joelcbongue.aca@outlook.com',
        from_name: this.formParticular.value.nomeCompleto,
        from_email: this.formParticular.value.email,
        telefone: this.formParticular.value.telefone,
        whatsapp: this.formParticular.value.whatsapp,
        estagio: this.formParticular.value.estagio,
        message: this.formParticular.value.mensagem || 'Sem mensagem adicional',
        tipo: 'Inscrição Particular'
      };

      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then((response: EmailJSResponseStatus) => {
          this.isLoadingEmail = false;
          this.fecharModal('modalParticular');
          this.mostrarSucesso();
          this.limparFormulario('particular');
        }, (error) => {
          this.isLoadingEmail = false;
          this.mostrarErro();
        });
      */
    } else {
      this.marcarCamposInvalidos(this.formParticular);
    }
  }

  /**
   * Envia email para empresa (simulação)
   */
  enviarEmailEmpresa(): void {
    if (this.formEmpresa.valid) {
      this.isLoadingEmail = true;
      
      setTimeout(() => {
        console.log('Email enviado para empresa:', this.formEmpresa.value);
        this.isLoadingEmail = false;
        this.fecharModal('modalEmpresa');
        this.mostrarSucesso();
        this.limparFormulario('empresa');
      }, 2000);
    } else {
      this.marcarCamposInvalidos(this.formEmpresa);
    }
  }

  /**
   * Envia para ambos (WhatsApp e Email) - Particular
   */
  enviarAmbosParticular(): void {
    if (this.formParticular.valid) {
      // Primeiro envia WhatsApp
      this.enviarWhatsAppParticular();
      
      // Depois simula envio de email
      setTimeout(() => {
        this.enviarEmailParticular();
      }, 1500);
    } else {
      this.marcarCamposInvalidos(this.formParticular);
    }
  }

  /**
   * Envia para ambos (WhatsApp e Email) - Empresa
   */
  enviarAmbosEmpresa(): void {
    if (this.formEmpresa.valid) {
      this.enviarWhatsAppEmpresa();
      
      setTimeout(() => {
        this.enviarEmailEmpresa();
      }, 1500);
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
  private mostrarSucesso(): void {
    alert('✅ Inscrição enviada com sucesso! Em breve entraremos em contacto.');
  }

  /**
   * Mostra mensagem de erro
   */
  private mostrarErro(): void {
    alert('❌ Erro ao enviar inscrição. Tente novamente.');
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
