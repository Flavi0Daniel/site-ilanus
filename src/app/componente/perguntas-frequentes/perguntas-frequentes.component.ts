import { Component, Input, OnInit } from '@angular/core';

interface FAQItem {
  id: number;
  pergunta: string;
  resposta: string;
  categoria: 'prokcel' | 'estagios';
  aberta: boolean;
}

@Component({
  selector: 'app-perguntas-frequentes',
  templateUrl: './perguntas-frequentes.component.html',
  styleUrls: ['./perguntas-frequentes.component.css']
})
export class PerguntasFrequentesComponent implements OnInit {

  // 'tudo' = Página /faq | 'home' = Seção Curta Home | 'estagio' = Seção Curta Estágios
  @Input() exibicao: 'tudo' | 'home' | 'estagio' = 'tudo';

  faqsProkcel: FAQItem[] = [];
  faqsEstagios: FAQItem[] = [];

  private allFaqs: FAQItem[] = [
    {
      id: 1,
      categoria: 'prokcel',
      pergunta: '1. O que é a PROKCEL?',
      resposta: 'Prokcel é Produtividade, Know-How e Excelência em forma de programas de estágios e treinamentos profissionais.',
      aberta: false
    },
    {
      id: 2,
      categoria: 'prokcel',
      pergunta: '2. Por que devo escolher a PROKCEL para impulsionar a minha carreira ou empresa?',
      resposta: 'Combinamos teoria académica e prática profissional, somos a perfeita harmonia entre academia e mercado de trabalho, para estágios e treinamentos profissionais, em Angola, somos sua melhor opção.',
      aberta: false
    },
    {
      id: 3,
      categoria: 'prokcel',
      pergunta: '3. Como a PROKCEL ajuda na inserção profissional?',
      resposta: 'Através de mentorias, formações práticas, desenvolvimento de competências, criação de networking e integração dos participantes em ambientes reais de trabalho.',
      aberta: false
    },
    {
      id: 4,
      categoria: 'prokcel',
      pergunta: '4. A PROKCEL trabalha com padrões internacionais?',
      resposta: 'Sim. A Prokcel pesquisa continuamente as melhores práticas e modelos operacionais internacionais, adaptando-os às necessidades do mercado nacional de forma responsável.',
      aberta: false
    },
    {
      id: 5,
      categoria: 'prokcel',
      pergunta: '5. Como a empresa mede a satisfação dos participantes?',
      resposta: 'A satisfação é avaliada por meio de feedback dos participantes, acompanhamento de desempenho durante os programas e análise dos resultados alcançados após a conclusão das atividades.',
      aberta: false
    },
    {
      id: 6,
      categoria: 'prokcel',
      pergunta: '6. Quais oportunidades podem surgir após a formação ou estágio?',
      resposta: 'Os participantes podem conquistar: Oportunidades de emprego; Parcerias profissionais; Desenvolvimento de negócios e empreendedorismo; Possíveis oportunidades de financiamento e crescimento profissional.',
      aberta: false
    },
    {
      id: 7,
      categoria: 'prokcel',
      pergunta: '7. Como a PROKCEL ajuda jovens sem experiência?',
      resposta: 'A PROKCEL insere jovens em ambientes reais de trabalho, permitindo que adquiram experiência prática sob orientação de profissionais experientes.',
      aberta: false
    },
    {
      id: 8,
      categoria: 'prokcel',
      pergunta: '8. O treinamento é alinhado às exigências do mercado angolano?',
      resposta: 'Sim. Os programas são desenvolvidos de acordo com as exigências do mercado angolano e também preparam os participantes para desafios profissionais internacionais.',
      aberta: false
    },
    {
      id: 9,
      categoria: 'prokcel',
      pergunta: '9. A empresa oferece mentoria?',
      resposta: 'Sim, a Prokcel oferece mentoria durante e após o programa de estágio, promovendo acompanhamento contínuo do desenvolvimento profissional dos participantes.',
      aberta: false
    },
    {
      id: 10,
      categoria: 'prokcel',
      pergunta: '10. Existe acompanhamento após a conclusão do programa?',
      resposta: 'Sim. A PROKCEL mantém acompanhamento e mentoria aos participantes mesmo após a conclusão do programa de estágio.',
      aberta: false
    },
    {
      id: 11,
      categoria: 'prokcel',
      pergunta: '11. Onde posso acompanhar novidades e oportunidades da PROKCEL?',
      resposta: 'Você pode acompanhar as novidades através da newsletter oficial da PROKCEL e das suas páginas nas redes sociais.',
      aberta: false
    },
    {
      id: 12,
      categoria: 'estagios',
      pergunta: '12. Quem pode participar dos programas de estágio?',
      resposta: 'Os programas são destinados a estudantes, recém-formados, profissionais e outros interessados em desenvolvimento profissional.',
      aberta: false
    },
    {
      id: 13,
      categoria: 'estagios',
      pergunta: '13. É possível pagar em prestações para participar do programa de estágio?',
      resposta: 'Sim, existem critérios para que estagiários sejam elegíveis para que paguem em prestações.',
      aberta: false
    },
    {
      id: 14,
      categoria: 'estagios',
      pergunta: '14. Como funciona o processo de inscrição para estágio ou formação?',
      resposta: 'O candidato deve entrar em contato com a área comercial da Prokcel e seguir as orientações fornecidas para formalização da inscrição.',
      aberta: false
    },
    {
      id: 15,
      categoria: 'estagios',
      pergunta: '15. Quais documentos são normalmente exigidos?',
      resposta: 'Normalmente são solicitados os seguintes documentos: formulário de inscrição disponibilizado pela Prokcel, bilhete de identidade e carta de motivação.',
      aberta: false
    },
    {
      id: 16,
      categoria: 'estagios',
      pergunta: '16. Qual é a duração do programa de estágio profissional?',
      resposta: 'O programa de estágio profissional possui duração de 3 meses.',
      aberta: false
    },
    {
      id: 17,
      categoria: 'estagios',
      pergunta: '17. A Prokcel garante emprego após o estágio?',
      resposta: 'A contratação após o estágio depende das necessidades e decisões das empresas parceiras. Embora não haja garantia de efectivação, existem possibilidades reais de integração profissional.',
      aberta: false
    },
    {
      id: 18,
      categoria: 'estagios',
      pergunta: '18. Os participantes recebem certificado?',
      resposta: 'Sim. Os participantes recebem os seguintes documentos: certificados das formações realizadas, certificado de participação no estágio e carta de recomendação para participantes com desempenho acima da média.',
      aberta: false
    },
    {
      id: 19,
      categoria: 'estagios',
      pergunta: '19. Há processo seletivo?',
      resposta: 'Sim. Após a recepção do dossiê de inscrição, a candidatura passa por um processo de análise e selecção.',
      aberta: false
    },
    {
      id: 20,
      categoria: 'estagios',
      pergunta: '20. As inscrições podem ser feitas online?',
      resposta: 'Sim. As inscrições podem ser realizadas presencialmente ou online.',
      aberta: false
    },
    {
      id: 21,
      categoria: 'estagios',
      pergunta: '21. Como saber quais vagas ou formações estão disponíveis?',
      resposta: 'As vagas e formações disponíveis podem ser consultadas através dos canais oficiais de comunicação da PROKCEL e junto à área comercial.',
      aberta: false
    },
    {
      id: 22,
      categoria: 'estagios',
      pergunta: '22. Existe limite de vagas por programa?',
      resposta: 'Sim. Cada programa pode acolher até 60 estagiários.',
      aberta: false
    },
    {
      id: 23,
      categoria: 'estagios',
      pergunta: '23. Posso participar de mais de um programa?',
      resposta: 'Sim. Os participantes podem inscrever-se em mais de um programa, desde que cumpram os requisitos definidos.',
      aberta: false
    }
  ];

  ngOnInit(): void {
    this.filtrarFaqs();
  }

  filtrarFaqs(): void {
    if (this.exibicao === 'home') {
      // Apenas as 3 primeiras institucionais
      this.faqsProkcel = this.allFaqs.filter(f => [1, 2, 3].includes(f.id));
      this.faqsEstagios = [];
    } else if (this.exibicao === 'estagio') {
      // As 4 chaves sobre estágio
      this.faqsProkcel = [];
      this.faqsEstagios = this.allFaqs.filter(f => [12, 16, 17, 18].includes(f.id));
    } else {
      // Exibe todas divididas por categoria
      this.faqsProkcel = this.allFaqs.filter(f => f.categoria === 'prokcel');
      this.faqsEstagios = this.allFaqs.filter(f => f.categoria === 'estagios');
    }
  }

  toggleFaq(item: FAQItem): void {
    item.aberta = !item.aberta;
  }

}
