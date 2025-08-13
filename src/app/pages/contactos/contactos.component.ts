import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitMessageType: 'success' | 'error' | '' = '';

  // Configurações do EmailJS - substitua pelos seus valores quando se registrar
  private emailjsConfig = {
    serviceId: 'YOUR_SERVICE_ID', // Substitua pelo seu Service ID
    templateId: 'YOUR_TEMPLATE_ID', // Substitua pelo seu Template ID
    publicKey: 'YOUR_PUBLIC_KEY' // Substitua pela sua Public Key
  };

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Inicializa o EmailJS com a public key
    if (this.emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(this.emailjsConfig.publicKey);
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';
      
      // Verifica se as configurações do EmailJS foram definidas
      if (this.emailjsConfig.serviceId === 'YOUR_SERVICE_ID' || 
          this.emailjsConfig.templateId === 'YOUR_TEMPLATE_ID' ||
          this.emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY') {
        
        // Simula envio (remova esta parte quando configurar o EmailJS)
        this.simulateSubmit();
      } else {
        // Envia via EmailJS
        this.sendEmail();
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private simulateSubmit(): void {
    // Simula o envio do email para demonstração
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitMessage = 'Formulário preenchido com sucesso! Configure o EmailJS para habilitar o envio real.';
      this.submitMessageType = 'success';
      this.contactForm.reset();
      
      // Limpa a mensagem após 5 segundos
      setTimeout(() => {
        this.submitMessage = '';
        this.submitMessageType = '';
      }, 5000);
    }, 1500);
  }

  private sendEmail(): void {
    const templateParams = {
      from_name: this.contactForm.get('nome')?.value,
      from_email: this.contactForm.get('email')?.value,
      subject: this.contactForm.get('assunto')?.value,
      message: this.contactForm.get('mensagem')?.value,
      to_name: 'ILANUS'
    };

    emailjs.send(
      this.emailjsConfig.serviceId,
      this.emailjsConfig.templateId,
      templateParams
    ).then(
      (response) => {
        this.isSubmitting = false;
        this.submitMessage = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        this.submitMessageType = 'success';
        this.contactForm.reset();
        
        // Limpa a mensagem após 5 segundos
        setTimeout(() => {
          this.submitMessage = '';
          this.submitMessageType = '';
        }, 5000);
      },
      (error) => {
        this.isSubmitting = false;
        this.submitMessage = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
        this.submitMessageType = 'error';
        console.error('EmailJS Error:', error);
        
        // Limpa a mensagem após 5 segundos
        setTimeout(() => {
          this.submitMessage = '';
          this.submitMessageType = '';
        }, 5000);
      }
    );
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para facilitar a validação no template
  get nome() { return this.contactForm.get('nome'); }
  get email() { return this.contactForm.get('email'); }
  get assunto() { return this.contactForm.get('assunto'); }
  get mensagem() { return this.contactForm.get('mensagem'); }

}
