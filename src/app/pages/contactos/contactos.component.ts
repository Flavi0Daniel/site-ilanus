import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  // URL do PHP
 // private PHP_URL = 'http://localhost:8080/send_email.php'; // Desenvolvimento
  // Para produção: 
  private PHP_URL = 'https://prokcel.com/send_email.php';

  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitMessageType: 'success' | 'error' | '' = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';
      
      const dados = {
        tipoFormulario: 'contacto',
        nome: this.contactForm.get('nome')?.value,
        email: this.contactForm.get('email')?.value,
        assunto: this.contactForm.get('assunto')?.value,
        mensagem: this.contactForm.get('mensagem')?.value
      };

      this.enviarEmailPHP(dados).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.submitMessage = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            this.submitMessageType = 'success';
            this.contactForm.reset();
          } else {
            this.submitMessage = 'Erro ao enviar mensagem: ' + response.message;
            this.submitMessageType = 'error';
          }
          
          // Limpa a mensagem após 5 segundos
          setTimeout(() => {
            this.submitMessage = '';
            this.submitMessageType = '';
          }, 5000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.submitMessage = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
          this.submitMessageType = 'error';
          console.error('Erro ao enviar email:', error);
          
          // Limpa a mensagem após 5 segundos
          setTimeout(() => {
            this.submitMessage = '';
            this.submitMessageType = '';
          }, 5000);
        }
      });
    } else {
      this.markFormGroupTouched();
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
