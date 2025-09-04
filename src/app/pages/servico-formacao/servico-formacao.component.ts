import { Component } from '@angular/core';
// import emailjs from '@emailjs/browser'; // quando configurar o EmailJS devo lembrar de vir descomentar esse import

interface Area {
  id: number;
  nome: string;
  descricao: string;
  totalCursos: number;
  imagem: string;
  cursos: Curso[];
}

interface Curso {
  nome: string;
  categoria?: string;
}

@Component({
  selector: 'app-servico-formacao',
  templateUrl: './servico-formacao.component.html',
  styleUrls: ['./servico-formacao.component.css']
})
export class ServicoFormacaoComponent {

  // Dados das áreas e cursos
  areas: Area[] = [

    {
      id: 1,
      nome: 'Marketing',
      descricao: 'Desenvolva suas competências em marketing estratégico e operacional com nossos cursos especializados.',
      totalCursos: 44,
      imagem: 'assets/marketing.jpg',
      cursos: [
        // Modelos, Técnicas & Ferramentas de Marketing (28)
        { nome: 'Marketing Estratégico e Operacional' },
        { nome: 'Marketing Estratégico e Planeamento' },
        { nome: 'Marketing Estratégico Avançado' },
        { nome: 'Alinhamento Estratégico entre Marketing e Vendas' },
        { nome: 'Marketing B2B - Business to Business' },
        { nome: 'Marketing Relacional - Técnicas e Tendências' },
        { nome: 'Plano de Marketing - Como Elaborar um Plano Objectivo e de Grande Impacto' },
        { nome: 'Identificação e Análise da Concorrência no Marketing' },
        { nome: 'Análise de Mercados e de Consumidores no Marketing' },
        { nome: 'Gestão de Canais e Redes de Distribuição - Retail Marketing' },
        { nome: 'Trade Marketing' },
        { nome: 'Marketing Research - Como obter e Tratar os Dados Certos para Tomar as Decisões Certas' },
        { nome: 'EndoMarketing - O Poder do Marketing Interno' },
        { nome: 'Gestão da Performance de Marketing' },
        { nome: 'Marketing Metrics - Os Principais Indicadores a Medir na Gestão do Marketing' },
        { nome: 'Psicologia do Consumo e Comportamento do Consumidor' },
        { nome: 'Customer Value Management - Conhecer a Importância e o Valor de Cada Cliente para o Negócio' },
        { nome: 'Desenvolvimento e Lançamento de Novos Produtos' },
        { nome: 'Gestão do Ciclo de Vida dos Produtos' },
        { nome: 'Gestão de Produtos (Product Management) - Modelos, Técnicas e Ferramentas' },
        { nome: 'Gestão de Marcas (Brand Management) - Criar, Manter e Gerir Marcas de Sucesso' },
        { nome: 'Técnicas de Fidelização à Marca - Como utilizar os Social Media para Envolver os Clientes com a Marca' },
        { nome: 'Planeamento e Gestão de Eventos' },
        { nome: 'Merchandising e Promoção de Produtos - Princípios, Metodologias e Técnicas' },
        { nome: 'CRM - Gestão do Relacionamento com os Clientes Chave' },
        { nome: 'Assistente de Marketing' },
        { nome: 'Auditoria de Marketing' },
        { nome: 'SPSS - Statistical Package for Social Sciences' },
        // Marketing-Mix: o Marketing Operacional (5)
        { nome: 'Marketing Operacional na Prática - Curso Completo', categoria: 'Marketing-Mix' },
        { nome: 'Marketing Mix: Estratégias de Produto', categoria: 'Marketing-Mix' },
        { nome: 'Marketing-Mix: Estratégias de Preço', categoria: 'Marketing-Mix' },
        { nome: 'Marketing-Mix: Estratégias de Distribuição', categoria: 'Marketing-Mix' },
        { nome: 'Marketing-Mix: Estratégias de Comunicação', categoria: 'Marketing-Mix' },
        // Comunicação em Marketing (11)
        { nome: 'Comunicação Institucional e o Poder das Relações Públicas', categoria: 'Comunicação' },
        { nome: 'Comunicação Integrada de Marketing', categoria: 'Comunicação' },
        { nome: 'Plano de Comunicação Digital', categoria: 'Comunicação' },
        { nome: 'Excelência na Comunicação - Como Usar Todos os Canais e Ferramentas para Chegar ao Consumidor', categoria: 'Comunicação' },
        { nome: 'Media Training - Gerir Eficazmente a Comunicação com os Media', categoria: 'Comunicação' },
        { nome: 'Comunicação e Imagem Empresarial', categoria: 'Comunicação' },
        { nome: 'A Estratégia Publicitária - Objectivos e Targeting', categoria: 'Comunicação' },
        { nome: 'Como Desenvolver o Plano Promocional da Empresa', categoria: 'Comunicação' },
        { nome: 'Gestão de Orçamentos Publicitários e Campanhas Promocionais', categoria: 'Comunicação' },
        { nome: 'Técnicas de Comunicação Publicitária', categoria: 'Comunicação' },
        { nome: 'Como Medir a Eficácia da Publicidade', categoria: 'Comunicação' }
      ]
    },
    {
      id: 2,
      nome: 'Petróleo & Gás',
      descricao: 'Especialize-se no setor petrolífero com cursos focados em exploração, produção e gestão de projetos.',
      totalCursos: 15,
      imagem: 'assets/petroleo-gas.jpg',
      cursos: [
        { nome: 'Análise e Avaliação Económica de Projectos de Investimento na Exploração e Produção de Petróleo e Gás' },
        { nome: 'Técnicas de Gestão de Projectos de Exploração e Produção - E&P' },
        { nome: 'Avaliação Integrada de Risco de Blocos Exploratórios' },
        { nome: 'Gestão do Risco em Projectos de Produção e Exploração Petrolífera' },
        { nome: 'Negociação nas Joint Ventures do Petróleo' },
        { nome: 'Comércio do Petróleo e seus Derivados - Trading' },
        { nome: 'Gestão da Logística de Suprimento de Petróleo e Derivados' },
        { nome: 'Planeamento da Procura de Abastecimento e Distribuição' },
        { nome: 'Contabilidade do Petróleo e Gás' },
        { nome: 'Fiscalidade Petrolífera Angolana' },
        { nome: 'Garantia de Escoamento para Poços de Óleo e Gás' },
        { nome: 'Trading de Refinados e Gás Natural' },
        { nome: 'Gestão de Resíduos em Laboratórios' },
        { nome: 'Controlo de Qualidade dos Derivados de Petróleo e Biocombustíveis' },
        { nome: 'Auditoria Interna em Laboratórios' }
      ]
    },
    {
      id: 3,
      nome: 'Gestão Industrial & Processos',
      descricao: 'Optimize processos industriais e melhore a produtividade com nossas formações especializadas.',
      totalCursos: 22,
      imagem: 'assets/gestao-industrial.jpg',
      cursos: [
        { nome: 'Gestão e Controlo da Manutenção Industrial' },
        { nome: 'Skills para Responsáveis de Unidades de Fabrico ou de Produção' },
        { nome: 'Gestão, Planeamento e Controlo da Produção' },
        { nome: 'Organização de Sistemas de Produção' },
        { nome: 'Sistemas de Planeamento e Controlo da Actividade' },
        { nome: 'Gestão, Planeamento e Controlo de Custos de Produção Industrial' },
        { nome: 'Qualidade Industrial e Custos da Não Qualidade' },
        { nome: 'Auditoria da Manutenção: Gestão, Métodos e Custos' },
        { nome: 'Manutenção Total - TPM (Total Productive Maintenance)' },
        { nome: 'A Metodologia dos 5 S - Instrumentos de Produtividade e Qualidade' },
        { nome: 'KAIZEN - A Melhoria Contínua na Prática' },
        { nome: 'Resolução sistemática de problemas' },
        { nome: 'Separação, Classificação e Gestão de Resíduos Industriais' },
        { nome: 'Gestão de Projectos Industriais' },
        { nome: 'Programa de Melhoria da Produtividade' },
        { nome: 'Custeio Industrial com Contabilidade Analítica' },
        { nome: 'Reengenharia de Processos' },
        { nome: 'Monitorização e Melhoria de Processos' },
        { nome: 'Gestores de Turno - Organização do Trabalho e Liderança em Equipa' },
        { nome: 'Six Sigma Management Method - A Qualidade como objectivo' },
        { nome: 'Instrumentação Industrial - Controlo de Processos Industriais' },
        { nome: 'Controlo Estatístico do Processo' }
      ]
    },
    {
      id: 4,
      nome: 'Finanças & Contabilidade',
      descricao: 'Domine as áreas financeiras e contabilísticas com nossa ampla gama de cursos especializados.',
      totalCursos: 100,
      imagem: 'assets/financas-contabilidade.jpg',
      cursos: [
        // Finanças (50 cursos)
        { nome: 'Planeamento, Organização e Análise Financeira', categoria: 'Finanças' },
        { nome: 'Alinhamento Estratégico da Função Financeira com a Estratégia Corporativa', categoria: 'Finanças' },
        { nome: 'Orientar a Empresa para a Criação de Valor: EVA, CVA e Outros Indicadores de Performance Financeira', categoria: 'Finanças' },
        { nome: 'Previsão e Modelação Financeira', categoria: 'Finanças' },
        { nome: 'Modelos Financeiros e de Previsão Avançados', categoria: 'Finanças' },
        { nome: 'Projecção de Demonstrações Financeiras em Excel', categoria: 'Finanças' },
        { nome: 'Análise, Modelos Financeiros e Projecção de Demonstrações Financeiras (Forecast) em Excel', categoria: 'Finanças' },
        { nome: 'Análise Financeira e Investimentos', categoria: 'Finanças' },
        { nome: 'Análise Financeira de Empresas', categoria: 'Finanças' },
        { nome: 'Análise de Viabilidade Económico-Financeira de Negócios', categoria: 'Finanças' },
        // ... (continuar com todos os cursos de finanças, auditoria, contabilidade e fiscalidade)
        // Por questões de espaço, incluindo apenas alguns exemplos
        { nome: 'Gestão de Riscos e Auditoria', categoria: 'Auditoria' },
        { nome: 'Contabilidade Geral e Analítica', categoria: 'Contabilidade' },
        { nome: 'Gestão Fiscal', categoria: 'Fiscalidade' }
      ]
    },
    {
      id: 5,
      nome: 'ISO / SHST',
      descricao: 'Implemente sistemas de gestão de qualidade e segurança no trabalho seguindo normas internacionais.',
      totalCursos: 37,
      imagem: 'assets/iso-shst.jpg',
      cursos: [
        { nome: 'A Gestão da Qualidade Total e o Processo de Melhoria Contínua' },
        { nome: 'Ferramentas e Documentação do Sistema de Gestão da Qualidade' },
        { nome: 'Integração do Sistema de Informação com o Sistema de Qualidade' },
        { nome: 'Técnicas de Elaboração de Normas e Procedimentos' },
        { nome: 'Acções correctivas e acções de melhoria para suprir Não Conformidades' },
        { nome: 'ISO 9001 - Sistemas de Gestão da Qualidade' },
        { nome: 'ISO 45001 - Implementação de Sistemas de Gestão de Segurança, Saúde no Trabalho (SHST)' },
        { nome: 'Auditorias de Qualidade' },
        { nome: 'Prevenção de Riscos e Segurança' },
        { nome: 'Segurança nos Riscos Elétricos' }
        // ... (incluir todos os 37 cursos)
      ]
    },
    {
      id: 6,
      nome: 'Secretariado & Assistentes',
      descricao: 'Desenvolva competências em secretariado executivo e apoio administrativo de excelência.',
      totalCursos: 37,
      imagem: 'assets/secretariado.jpg',
      cursos: [
        { nome: 'Programa de Gestão para Assistentes e Secretárias' },
        { nome: 'Secretariado do básico ao avançado' },
        { nome: 'Secretariado de Direcção - Nível III' },
        { nome: 'Secretariado Executivo' },
        { nome: 'Secretariado Executivo de Administração e Gestores de Topo' },
        { nome: 'Assistente Administrativo' },
        { nome: 'Assistente Comercial' },
        { nome: 'Assistente Financeiro' },
        { nome: 'Gestão do Tempo - Especial Secretariado' }
        // ... (incluir todos os 37 cursos)
      ]
    },
    {
      id: 7,
      nome: 'Gestão Comercial & Vendas',
      descricao: 'Maximize seus resultados comerciais com técnicas avançadas de vendas e gestão comercial.',
      totalCursos: 49,
      imagem: 'assets/vendas.jpg',
      cursos: [
        { nome: 'Planeamento Estratégico Comercial' },
        { nome: 'Direcção Comercial e Gestão da Força de Vendas' },
        { nome: 'Técnicas de Vendas Profissionais - Nível I' },
        { nome: 'Técnicas de Vendas Profissionais - Nível II' },
        { nome: 'Vendas Consultivas: Vender Soluções e não Apenas Produtos' },
        { nome: 'Key Account Management nos Mercados B2B' },
        { nome: 'A Excelência no Atendimento a Clientes' },
        { nome: 'Social Selling - Saber optimizar as vendas à distância' }
        // ... (incluir todos os 49 cursos)
      ]
    },
    {
      id: 8,
      nome: 'Sustentabilidade',
      descricao: 'Integre práticas sustentáveis e responsabilidade social na sua organização.',
      totalCursos: 8,
      imagem: 'assets/sustentabilidade.jpg',
      cursos: [
        { nome: 'Compras Sustentáveis' },
        { nome: 'Práticas de Gestão Responsável e Responsabilidade Social Corporativa (CSR)' },
        { nome: 'Inovação e Desenvolvimento Sustentável como Vantagem Competitiva' },
        { nome: 'Gestão Sustentável da Cadeia de Suprimentos e Produção Verde' },
        { nome: 'Marketing Verde: Integrar a Sustentabilidade no Branding' },
        { nome: 'Introdução à Economia Circular' },
        { nome: 'Economia Circular: Roteiro para Implementar a EC na Empresa' },
        { nome: 'CSRD - Corporate Sustainability Reporting Directive' }
      ]
    },
    {
      id: 9,
      nome: 'Compras & Logística',
      descricao: 'Optimize a gestão de compras, logística e supply chain da sua organização.',
      totalCursos: 52,
      imagem: 'assets/compras-logistica.jpg',
      cursos: [
        { nome: 'Gestão Estratégica de Fornecedores e Outsourcing', categoria: 'Compras' },
        { nome: 'Compradores Profissionais - Curso de Especialização', categoria: 'Compras' },
        { nome: 'Curso Global de Logística - Prático e Intensivo', categoria: 'Logística Geral' },
        { nome: 'Gestão da Logística Integrada', categoria: 'Logística Geral' },
        { nome: 'Supply Chain Management', categoria: 'Supply Chain' },
        { nome: 'Gestão de Armazéns', categoria: 'Armazéns e Stocks' },
        { nome: 'Import & Export - Procedimentos e Documentação', categoria: 'Comércio Internacional' }
        // ... (incluir todos os 52 cursos organizados por categoria)
      ]
    },
    {
      id: 10,
      nome: 'Recursos Humanos',
      descricao: 'Desenvolva estratégias eficazes de gestão de pessoas e recursos humanos.',
      totalCursos: 65,
      imagem: 'assets/recursos-humanos.jpg',
      cursos: [
        { nome: 'Gestão Estratégica de Recursos Humanos', categoria: 'RH Estratégico' },
        { nome: 'Técnicas de Recrutamento e Selecção', categoria: 'RH Estratégico' },
        { nome: 'Avaliação e Gestão de Desempenho', categoria: 'RH Estratégico' },
        { nome: 'Processamento Salarial e Segurança Social', categoria: 'Gestão Administrativa de RH' },
        { nome: 'Lei Geral do Trabalho - Curso Completo', categoria: 'Direito do Trabalho' },
        { nome: 'Gestão da Formação', categoria: 'Planeamento e Gestão da Formação' }
        // ... (incluir todos os 65 cursos organizados por categoria)
      ]
    },
    {
      id: 11,
      nome: 'Gestão Empresarial',
      descricao: 'Desenvolva competências de liderança e gestão estratégica para o sucesso empresarial.',
      totalCursos: 30,
      imagem: 'assets/gestao-empresarial.jpg',
      cursos: [
        { nome: 'Estratégia Empresarial E Planeamento Estratégico', categoria: 'Gestão Estratégica' },
        { nome: 'Balanced Scorecard', categoria: 'Gestão Estratégica' },
        { nome: '10 Dias MBA - Gestão em 10 dias', categoria: 'Gestão Empresarial' },
        { nome: '5 Dias MBA - Gestão em 5 dias', categoria: 'Gestão Empresarial' },
        { nome: 'Técnicas de Gestão, Comunicação e Liderança', categoria: 'Gestão Empresarial' }
        // ... (incluir todos os 30 cursos)
      ]
    },
    {
      id: 12,
      nome: 'Empreendedorismo',
      descricao: 'Transforme suas ideias em negócios de sucesso com nossos cursos de empreendedorismo.',
      totalCursos: 20,
      imagem: 'assets/empreendedorismo.jpg',
      cursos: [
        { nome: 'Criação e Gestão de Pequenos Negócios' },
        { nome: 'Plano de Negócios e Estudo de Viabilidade' },
        { nome: 'Gestão Financeira para Empreendedores' },
        { nome: 'Marketing Digital e Vendas Online' },
        { nome: 'Gestão de Redes Sociais para Negócios' },
        { nome: 'Atendimento ao Cliente e Técnicas de Vendas' },
        { nome: 'Inovação e Desenvolvimento de Produtos' },
        { nome: 'Gestão de Equipas e Liderança Empreendedora' },
        { nome: 'Empreendedorismo no Setor Alimentar' },
        { nome: 'Gestão de Startups e Negócios Inovadores' },
        { nome: 'Negociação e Fecho de Contratos Comerciais' },
        { nome: 'Gestão de Custos e Formação de Preços' },
        { nome: 'Captação de Investimento e Fontes de Financiamento' },
        { nome: 'Gestão de Projetos para Empreendedores' },
        { nome: 'Estratégias de Crescimento e Escalabilidade de Negócios' },
        { nome: 'Empreendedorismo Social e Sustentável' },
        { nome: 'E-commerce e Criação de Lojas Virtuais' },
        { nome: 'Gestão de Franquias e Expansão de Negócios' },
        { nome: 'Branding e Criação de Identidade de Marca' },
        { nome: 'Gestão de Riscos e Resolução de Problemas no Negócio' }
      ]
    }
    
  ];

  // Modal de detalhes
  modalVisible = false;
  areaSelecionada: Area | null = null;

  // Formulários
  showParticularForm = false;
  showEmpresarialForm = false;

  // Form data
  formParticular = {
    nomeCompleto: '',
    email: '',
    telefone: '',
    whatsapp: '',
    areaSelecionada: '',
    cursoSelecionado: '',
    mensagem: ''
  };

  formEmpresarial = {
    nomeEmpresa: '',
    numeroFormandos: '',
    nomeResponsavel: '',
    email: '',
    telefone: '',
    whatsapp: '',
    areaSelecionada: '',
    cursoSelecionado: '',
    mensagem: ''
  };

  // Cursos filtrados para os selects
  cursosDisponiveis: Curso[] = [];

  constructor() {
    // Inicialização do EmailJS (comentado)
    // emailjs.init('YOUR_PUBLIC_KEY');
  }

  // Abrir modal de detalhes
  abrirModal(area: Area) {
    this.areaSelecionada = area;
    this.modalVisible = true;
  }

  // Fechar modal
  fecharModal() {
    this.modalVisible = false;
    this.areaSelecionada = null;
  }

  // Mostrar formulário particular
  mostrarFormParticular() {
    this.showParticularForm = true;
    this.showEmpresarialForm = false;
  }

  // Mostrar formulário empresarial
  mostrarFormEmpresarial() {
    this.showEmpresarialForm = true;
    this.showParticularForm = false;
  }

  // Fechar formulários
  fecharFormularios() {
    this.showParticularForm = false;
    this.showEmpresarialForm = false;
    this.resetForms();
  }

  // Reset forms
  resetForms() {
    this.formParticular = {
      nomeCompleto: '',
      email: '',
      telefone: '',
      whatsapp: '',
      areaSelecionada: '',
      cursoSelecionado: '',
      mensagem: ''
    };

    this.formEmpresarial = {
      nomeEmpresa: '',
      numeroFormandos: '',
      nomeResponsavel: '',
      email: '',
      telefone: '',
      whatsapp: '',
      areaSelecionada: '',
      cursoSelecionado: '',
      mensagem: ''
    };

    this.cursosDisponiveis = [];
  }

  // Filtrar cursos quando área é selecionada
  onAreaChange(areaId: string, isParticular: boolean = true) {
    const area = this.areas.find(a => a.id.toString() === areaId);
    this.cursosDisponiveis = area ? area.cursos : [];
    
    if (isParticular) {
      this.formParticular.cursoSelecionado = '';
    } else {
      this.formEmpresarial.cursoSelecionado = '';
    }
  }

  // Enviar por WhatsApp
  enviarWhatsApp(isParticular: boolean = true) {
    const whatsappNumber = '+244949193887';

    // Tratamento separado para formulário Particular
    if (isParticular) {
      const form = this.formParticular;
      let message = `*Inscrição para Formação - Particular*\n\n`;
      message += `📋 *Dados Pessoais:*\n`;
      message += `• Nome: ${form.nomeCompleto}\n`;
      message += `• Email: ${form.email}\n`;
      message += `• Telefone: ${form.telefone}\n`;
      if (form.whatsapp) message += `• WhatsApp: ${form.whatsapp}\n`;

      const area = this.areas.find(a => a.id.toString() === form.areaSelecionada);
      const curso = this.cursosDisponiveis.find(c => c.nome === form.cursoSelecionado);

      message += `\n📚 *Formação de Interesse:*\n`;
      message += `• Área: ${area?.nome || 'Não especificada'}\n`;
      message += `• Curso: ${curso?.nome || 'Não especificado'}\n`;

      if (form.mensagem) {
        message += `\n💬 *Mensagem:*\n${form.mensagem}`;
      }

      const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

    // Tratamento separado para formulário Empresarial
    } else {
      const form = this.formEmpresarial;
      let message = `*Inscrição para Formação - Empresarial*\n\n`;
      message += `🏢 *Dados da Empresa:*\n`;
      message += `• Empresa: ${form.nomeEmpresa}\n`;
      message += `• Responsável: ${form.nomeResponsavel}\n`;
      message += `• Nº Formandos: ${form.numeroFormandos}\n`;
      message += `• Email: ${form.email}\n`;
      message += `• Telefone: ${form.telefone}\n`;
      if (form.whatsapp) message += `• WhatsApp: ${form.whatsapp}\n`;

      const area = this.areas.find(a => a.id.toString() === form.areaSelecionada);
      const curso = this.cursosDisponiveis.find(c => c.nome === form.cursoSelecionado);

      message += `\n📚 *Formação de Interesse:*\n`;
      message += `• Área: ${area?.nome || 'Não especificada'}\n`;
      message += `• Curso: ${curso?.nome || 'Não especificado'}\n`;

      if (form.mensagem) {
        message += `\n💬 *Mensagem:*\n${form.mensagem}`;
      }

      const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  // Enviar por Email (simulação)
  async enviarEmail(isParticular: boolean = true) {
    // Simulação de envio (remover quando configurar EmailJS)
    console.log('Simulando envio de email...');
    alert('Email enviado com sucesso! (Esta é uma simulação)');
    this.fecharFormularios();
    
    /*
    // Código real para EmailJS (descomente quando configurar)
    try {
      const form = isParticular ? this.formParticular : this.formEmpresarial;
      
      const templateParams = {
        to_email: 'seuemail@prokcel.com', // Substitua pelo email da empresa
        from_name: isParticular ? form.nomeCompleto : (form as any).nomeResponsavel,
        from_email: form.email,
        phone: form.telefone,
        whatsapp: form.whatsapp || 'Não informado',
        area: this.areas.find(a => a.id.toString() === form.areaSelecionada)?.nome || 'Não especificada',
        curso: this.cursosDisponiveis.find(c => c.nome === form.cursoSelecionado)?.nome || 'Não especificado',
        message: form.mensagem || 'Sem mensagem adicional',
        tipo_inscricao: isParticular ? 'Particular' : 'Empresarial',
        // Campos específicos para empresarial
        ...(isParticular ? {} : {
          nome_empresa: (form as any).nomeEmpresa,
          numero_formandos: (form as any).numeroFormandos
        })
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // Configure no EmailJS
        'YOUR_TEMPLATE_ID', // Configure no EmailJS
        templateParams
      );

      alert('Email enviado com sucesso!');
      this.fecharFormularios();
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      alert('Erro ao enviar email. Tente novamente.');
    }
    */
  }

  // Enviar para ambos (WhatsApp + Email)
  enviarParaAmbos(isParticular: boolean = true) {
    this.enviarWhatsApp(isParticular);
    this.enviarEmail(isParticular);
  }
}
