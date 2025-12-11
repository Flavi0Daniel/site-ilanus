import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

@Component({
  selector: 'app-servico-formacao',
  templateUrl: './servico-formacao.component.html',
  styleUrls: ['./servico-formacao.component.css']
})
export class ServicoFormacaoComponent {

  // URL do PHP
  //  private PHP_URL = 'http://localhost:8080/send_email.php'; // Desenvolvimento
  // Para produção: 
   private PHP_URL = 'https://prokcel.com/send_email.php';


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
        { nome: 'Análise Financeira e Avaliação de Projectos de Investimento', categoria: 'Finanças' },
        { nome: ' Análise e Planeamento Financeiro para Controllers', categoria: 'Finanças' },
        { nome: 'Orçamentação e Cash Flow', categoria: 'Finanças' },
        { nome: ' Planeamento e Gestão Orçamental - Preparação, Elaboração, Acompanhamento e Controlo do Orçamento', categoria: 'Finanças' },
        { nome: 'Orçamentos, Previsões e Gestão do Cash Flow', categoria: 'Finanças' },
        { nome: 'Planeamento, Gestão Orçamental e Controlo de Gestão', categoria: 'Finanças' },
        { nome: 'Controlo de Gestão e Reporting', categoria: 'Finanças' },
        { nome: 'Controlo de Gestão', categoria: 'Finanças' },
        { nome: 'Controlo de Gestão e Orçamentos', categoria: 'Finanças' },
        { nome: 'Concepção de Sistemas e Modelos de Controlo de Gestão', categoria: 'Finanças' },
        { nome: 'Avaliação de Sistema de Controlo', categoria: 'Finanças' },
        { nome: 'O Controlo de Gestão com o Microsoft Excel', categoria: 'Finanças' },
        { nome: 'Reporting Financeiro - Metodologias e Instrumentos', categoria: 'Finanças' },
        { nome: 'Tableau de Bord - Como Conceber e Manter um Quadro de Indicadores de Gestão', categoria: 'Finanças' },
        { nome: 'Custeio e Formação de Preços', categoria: 'Finanças' },
        { nome: 'ABC, ABM - Activity Based Costing: Analisar, Controlar e Reduzir Custos', categoria: 'Finanças' },
        { nome: 'Gestão Integrada de Preços de Transferência e Overheads', categoria: 'Finanças' },
        { nome: 'Elaboração de Relatórios dos Preços de Transferência', categoria: 'Finanças' },
        { nome: 'Tesouraria e Gestão Financeira Operacional', categoria: 'Finanças' },
        { nome: 'Gestão de Tesouraria', categoria: 'Finanças' },
        { nome: 'Cash Management - Previsão, Gestão e Controlo da Tesouraria', categoria: 'Finanças' },
        { nome: 'A Programação Financeira e a Tesouraria', categoria: 'Finanças' },
        { nome: 'Excel - Previsões de Tesouraria', categoria: 'Finanças' },
        { nome: 'Gestão de Crédito e Cobranças', categoria: 'Finanças' },
        { nome: 'Credit Management - Gestão e Controlo de Crédito e Cobranças', categoria: 'Finanças' },
        { nome: 'Avaliação do Risco de Crédito', categoria: 'Finanças' },
        { nome: 'Gestão da Dívida', categoria: 'Finanças' },
        { nome: 'Contas a Pagar e Receber', categoria: 'Finanças' },
        { nome: 'Contas a Pagar', categoria: 'Finanças' },
        { nome: 'Contas a Receber', categoria: 'Finanças' },
        { nome: 'Contas a Pagar e a Receber', categoria: 'Finanças' },
        { nome: 'Gestão Financeira Operacional', categoria: 'Finanças' },
        { nome: 'Gestão Administrativa e Financeira para Profissionais Não Financeiros', categoria: 'Finanças' },
        { nome: 'Trade Finance', categoria: 'Finanças' },
        { nome: 'Excel para Finanças', categoria: 'Finanças' },
        { nome: 'Excel Avançado para Finanças', categoria: 'Finanças' },
        { nome: 'Gestão Financeira com Microsoft Excel', categoria: 'Finanças' },
        { nome: 'Excel - Análise e Modelos Financeiros para Profissionais de Economia e Gestão', categoria: 'Finanças' },
        { nome: 'Reestruturações Financeiras - Princípios e Boas Práticas', categoria: 'Finanças' },
        { nome: 'Gestão Financeira (tópicos gerais de gestão financeira estratégica)', categoria: 'Finanças' },

        //Auditoria e Gestão de Riscos (16 CURSOS)
        { nome: 'Gestão de Riscos e Auditoria', categoria: 'Auditoria'},
        { nome: 'Gestão de Riscos', categoria: 'Auditoria' },
        { nome: 'Gestão do Risco Financeiro', categoria: 'Auditoria' },
        { nome: 'Gestão do Risco Corporativo', categoria: 'Auditoria' },
        { nome: 'Gestão do Risco para Auditores', categoria: 'Auditoria' },
        { nome: 'Gestão do Risco Fiscal', categoria: 'Auditoria' },
        { nome: 'Auditoria e Controlo Interno', categoria: 'Auditoria' },
        { nome: 'Auditoria Contabilística e Financeira', categoria: 'Auditoria' },
        { nome: 'Auditoria Operacional, Financeira e Controlo Interno', categoria: 'Auditoria' },
        { nome: 'Auditoria Interna Baseada no COSO', categoria: 'Auditoria' },
        { nome: 'Auditorias a Fornecedores - Técnicas, Princípios e Boas Práticas', categoria: 'Auditoria' },
        { nome: 'Auditorias a Serviços', categoria: 'Auditoria' },
        { nome: 'Relatórios de Auditoria - Princípios e Boas Práticas', categoria: 'Auditoria' },
        { nome: 'Elaboração de Plano Estratégico para Auditorias Internas - Alinhamento Organizacional', categoria: 'Auditoria' },
        { nome: 'Fraude e Sistemas de Controlo Internos de Contabilidade', categoria: 'Auditoria' },
        { nome: 'Fraude e Sistemas de Controlo Internos de Contabilidade e Auditoria e Controlo Interno', categoria: 'Auditoria' },

        // Contabilidade e Normas (24 CURSOS)
        { nome: 'Contabilidade Geral e Analítica', categoria: 'Contabilidade' },
        { nome: 'Ciclo Completo da Contabilidade Geral (Níveis 1,2 e 3)', categoria: 'Contabilidade' },
        { nome: 'Contabilidade Analítica e Orçamental', categoria: 'Contabilidade' },
        { nome: 'Contabilidade de Clientes', categoria: 'Contabilidade' },
        { nome: 'Contabilidade de Fornecedores', categoria: 'Contabilidade' },
        { nome: 'Contabilidade de Clientes', categoria: 'Contabilidade' },
        { nome: 'Contabilidade para Consolidação de Contas', categoria: 'Contabilidade' },
        { nome: 'Encerramento do Exercício e o Fecho Anual de Contas', categoria: 'Contabilidade' },
        { nome: 'Encerramento Anual de Contas - Peças contabilísticas e fiscais', categoria: 'Contabilidade' },
        { nome: 'Contabilidade, Fiscalidade e Encerramento de Contas', categoria: 'Contabilidade' },
        { nome: 'Contabilidade e Finanças para Profissionais da Função Administrativa', categoria: 'Contabilidade' },
        { nome: 'Normas Contabilísticas (SNC e IFRS)', categoria: 'Contabilidade' },
        { nome: 'Contabilidade e Fiscalidade com o SNC', categoria: 'Contabilidade' },
        { nome: 'Demonstrações Financeiras com o SNC', categoria: 'Contabilidade' },
        { nome: 'IFRS - Consolidação de Contas de acordo com as Normas IAS IFRS e directrizes do SNC', categoria: 'Contabilidade' },
        { nome: 'Actualizações das Normas IFRS', categoria: 'Contabilidade' },
        { nome: 'IFRS 9 - Instrumentos Financeiros', categoria: 'Contabilidade' },
        { nome: 'Gestão Patrimonial', categoria: 'Contabilidade' },
        { nome: 'Gestão do Activo Fixo e Amortizações', categoria: 'Contabilidade' },
        { nome: 'Gestão do Património, Amortizações e Revaloração', categoria: 'Contabilidade' },
        { nome: 'Investimentos Financeiros e Propriedades de Investimento', categoria: 'Contabilidade' },
        { nome: 'Elaboração das Demonstrações Financeiras', categoria: 'Contabilidade' },
        { nome: 'Análise de Demonstrações Financeiras', categoria: 'Contabilidade' },
        { nome: 'Microsoft Excel para Contabilistas', categoria: 'Contabilidade' },

        //Fiscalidade e Tributação (10 CURSOS)
        { nome: 'Gestão Fiscal', categoria: 'Fiscalidade' },
        { nome: 'Fiscalidade e Auditoria Fiscal', categoria: 'Fiscalidade' },
        { nome: 'Gestão do Risco Fiscal', categoria: 'Fiscalidade' },
        { nome: 'Optimização Fiscal das Remunerações', categoria: 'Fiscalidade' },
        { nome: 'Aspectos Fiscais das Operações Aduaneiras', categoria: 'Fiscalidade' },
        { nome: 'Cálculo e Elaboração da Declaração do IVA', categoria: 'Fiscalidade' },
        { nome: 'Auditoria e Contencioso Fiscal', categoria: 'Fiscalidade' },
        { nome: 'Auditoria Tributária', categoria: 'Fiscalidade' },
        { nome: 'Contencioso Tributário', categoria: 'Fiscalidade' },
        { nome: 'Responsabilidade Tributária Subsidiária', categoria: 'Fiscalidade' }

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
        { nome:'Métodos Taguchi' },
        { nome: 'Six-Sigma Management Method - A Qualidade Como Objectivo' },
        { nome: 'FMEA - Análise dos Modos de Falha, dos seus Efeitos e Criticidade' },
        { nome: 'Validação dos Métodos no Controle e Garantia de Qualidade' },
        { nome: 'Processo de Tratamento de Reclamações de Clientes' },
        { nome: 'Auditorias de Qualidade' },
        { nome: 'Auditorias Interna aos Sistemas de Gestão Integrada' },
        { nome: 'Componente Comportamental da Auditoria' },
        { nome: 'Avaliação Risco âmbito da Qualidade' },
        { nome: 'ISO 9001 - Sistemas de Gestão da Qualidade' },
        { nome: 'ISO 9001 - Auditor Líder' },
        { nome: 'Sistemas Integrados ISO 9001 (Qualidade) e ISO 14001 (Ambiente)' },
        { nome: 'ISO 19011 - Auditoria de Sistemas de Gestão' },
        { nome: 'ISO 19011 - Formação de Auditores Internos de Qualidade' },
        { nome: 'Estatística Aplicada & Qualidade de Serviço' },
        { nome: 'Avaliação e Gestão de Riscos no Âmbito dos Sistemas de Gestão da Qualidade' },
        { nome: 'Avaliação Riscos âmbito Segurança Trabalho' },
        { nome: 'Avaliação de Riscos e Actualização da Legislação de SHST' },
        { nome: 'Identificação dos Perigos e Avaliação dos Riscos' },
        { nome: 'Higiene, Saúde, Segurança e Meio Ambiente' },
        { nome: 'iDSH Managing Safely - Segurança e Saúde Ocupacional' },
        { nome: 'Auditorias de Saúde e Segurança no Trabalho' },
        { nome: 'ISO 45001 - Implementação de Sistemas de Gestão de Segurança, Saúde no Trabalho (SHST)' },
        { nome: 'Ambiente e Saúde Ocupacional'},
        { nome: 'Prevenção de Riscos e Segurança' },
        { nome: 'Riscos Psicossociais - Causas e Prevenção' },
        { nome: 'Prevenção de Acidentes'},
        { nome: 'Segurança nos Riscos Elétricos' },
        { nome: 'Utilização e Armazenamento de Substâncias Perigosas' },
        { nome: 'Directiva Máquinas - Directiva para Segurança com Máquinas' },
        { nome: 'ISO 13857 - Segurança de Máquinas' },
        { nome: 'ISO 31000 - Gestão do Risco' }

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
        { nome: 'Secretariado Executivo e Regras de Protocolo' },
        { nome: 'Secretariado de Assessoria e Suporte Administrativo' },
        { nome: 'Secretariado de Direcção Comercial' },
        { nome: 'Secretariado Jurídico' },
        { nome: 'Técnicas de Secretariado, Protocolo Empresarial e Comunicação' },
        { nome: 'Assistente da Função Pessoal e de Recursos Humanos' },
        { nome:'Competências de Gestão para Secretárias e Assistentes de Gestão' },
        { nome: 'Assistente Administrativo' },
        { nome: 'Assistente Comercial' },
        { nome: 'Assistente Financeiro' },
        { nome: 'Assistente de Marketing' },
        { nome: 'Competências de Escrita para Secretárias e Assistentes de Gestão' },
        { nome: 'Redacção de Actas - Como redigir actas de forma profissional' },
        { nome: 'Planeamento, Organização e Gestão de Reuniões' },
        { nome: 'Organização e Gestão do Tempo - Especial Secretariado' },
        { nome: 'Técnicas de Atendimento ao Público e Relações com o Exterior' },
        { nome: 'Gestão do Stress com técnicas MINDFULNESS' },
        { nome: 'O Telefone e a Imagem da Empresa - Especial Secretariado' },
        { nome: 'Treinar intensivamente a Comunicação Escrita - Especial Secretariado' },
        { nome: 'Gerir e Tratar Documentos e Informação' },
        { nome: 'Técnicas de classificação de documentos e gestão de arquivos' },
        { nome: 'Arquivo e Gestão Documental - Técnicas e Boas Prática' },
        { nome: 'Gestão e Tratamento de Documentos e Arquivo Digital' },
        { nome: 'Gestão Documental e Comunicação Visual' },
        { nome: 'Microsoft Office para o Secretariado' },
        { nome: 'Técnicas e Práticas Administrativas - Curso Completo' },
        { nome: 'Técnicos Administrativos de Apoio à Gestão' },
        { nome: 'Gestão Administrativa de Escritório' },
        { nome: 'Fundamentos de Finanças e Contabilidade para Profissionais Administrativos' },
        { nome: 'Gestão Eficaz do Economato' },
        { nome: 'Modelo de Gestão de Economato com Microsoft Excel' },
        { nome: 'Processos de Gestão dos Serviços Gerais' }

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
        { nome: 'Alinhamento Estratégico entre Marketing e Vendas'},
        { nome: 'Direcção Comercial e Gestão da Força de Vendas' },
        { nome: 'Gestão de Vendas II - Planeamento, Organização e Gestão de Vendas' },
        { nome: 'Formação de Chefes de Vendas e Coordenadores de Equipa' },
        { nome: 'Medição e Avaliação do Desempenho Comercial' },
        { nome: 'Forecast - Orçamento e Técnicas de Previsão de Vendas' },
        { nome: 'Estratégias de Remunerações & Benefícios para Profissionais de Vendas' },
        { nome: 'Indicadores de Desempenho em Vendas - Como Melhorar a Performance do Departamento Comercial' },
        { nome: 'Team Building - Liderar, Motivar e Animar Equipas Comerciais Técnicas De Vendas' },
        { nome: 'Técnicas de Vendas Profissionais - Nível I (Preparar Novos Profissionais)' },
        { nome: 'Técnicas de Vendas Profissionais - Nível II (Especial Seniores da Área Comercial)' },
        { nome: 'Técnicas de Vendas Profissionais - Nível III (A Mudança Permanente e a Psicologia da Compra)' },
        { nome: 'Vendas Consultivas: Vender Soluções e não Apenas Produtos' },
        { nome: 'NeuroSelling - Conhecer profundamente o processo de tomada de decisão da venda' },
        { nome: 'Técnicos-Comerciais : A Venda de Produtos Industriais e Serviços' },
        { nome: 'Venda Complexa e Venda Técnica' },
        { nome: 'Vender para a Revenda e à Distribuição' },
        { nome: 'Key Account Management nos Mercados B2B' },
        { nome: 'Métodos e Técnicas de Prospecção de Vendas - Como Conquistar Novos Clientes Processo Comercial' },
        { nome: 'Do Lead ao Prospect - como transformar um contacto num potencial cliente' },
        { nome: ' Gestão do Tempo e do Território para Profissionais de Vendas' },
        { nome: 'Marcação e Condução Eficaz de Reuniões Comerciais' },
        { nome: 'Visita ao Cliente - Preparação, Postura e Imagem' },
        { nome: 'Como Apresentar com Êxito as suas Propostas Comerciais' },
        { nome: 'Objecções na Venda - Como Contorná-las com Argumentos Competitivos' },
        { nome: 'Fecho da Venda - Métodos e Técnicas' },
        { nome: 'Follow-Up Comercial - Gerir Eficazmente o Contacto com Cliente' },
        { nome: 'Recuperação de Clientes - Técnicas e Boas Práticas para Reconquistar Clientes Perdidos' },
        { nome: 'Técnicas de Cross-Selling' },
        { nome: 'Criatividade e Inovação na Venda' },
        { nome: 'Técnicas de Vendas por Telefone' },
        { nome: 'Retenção e Recuperação de Clientes - Técnicas & Boas Práticas Vendas Remotas E Digitais' },
        { nome: 'Vendas Remotas - Técnicas e ferramentas para vender à distância' },
        { nome: 'Prospecção Remota - Como contactar os Clientes à Distância' },
        { nome: 'Reuniões Comerciais remotas - Preparação e condução eficaz de reuniões à distância' },
        { nome: 'Social Selling - Saber optimizar as vendas à distância' },
        { nome: 'Estratégias de Vídeo Sales e Social Sales' }, 
        { nome: 'Negociação Comercial à Distância - Especificidades e Boas Práticas' },
        { nome: 'CRM - Gestão do Relacionamento com os Clientes Chave' },
        { nome: 'Microsoft PowerPoint - Princípios, Regras e Boas Práticas para Criar Apresentações com Impacto' },

        //Atendimento E Formação Complementar
        { nome: 'Formação Comercial para Profissionais não Comerciais' },
        { nome: 'A Excelência no Atendimento a Clientes' },
        { nome: 'Atendimento Telefónico - Como Conquistar o Cliente' },
        { nome: 'Gestão das Reclamações' },
        { nome: 'Controlo de Crédito e Cobrança a Clientes pela Área Comercial' },
        { nome: 'Atendimento e Vendas ao Balcão - Especial Lojas' },
        { nome: 'Atendimento e Vendas - Especial Agências de Viagens' },
        { nome: 'Assistente Comercial' }

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
        { nome: 'ISO 20400 - Compras Sustentáveis', categoria: 'Compras' },
        { nome: 'Gestão Estratégica de Fornecedores e Outsourcing', categoria: 'Compras' },
        { nome: 'Aspetos Jurídicos das Compras', categoria: 'Compras' },
        { nome: 'Avaliação Técnico-Económica de Fornecedores - Seleção e Qualificação', categoria: 'Compras' },
        { nome: 'Gestão de Procurement - Compras e Fornecedores', categoria: 'Compras' },
        { nome: 'Compradores Profissionais - Curso de Especialização', categoria: 'Compras' },
        { nome: 'Procurement Internacional com Análise de Casos Práticos', categoria: 'Compras' },
        { nome: 'Aprovisionamento e Logística', categoria: 'Compras' },
        { nome: 'Créditos Documentários', categoria: 'Compras' },
        { nome: 'Carta de Crédito ou Documentário', categoria: 'Compras' },
        { nome: 'Marketing de Compras - Estratégias e Táticas', categoria: 'Compras' },
        { nome: 'Assistente de Compras', categoria: 'Compras' },
        { nome: 'Microsoft Excel Aplicado às Compras', categoria: 'Compras' },

        //Logística Geral         
        { nome: 'Curso Global de Logística - Prático e Intensivo', categoria: 'Logística Geral' },
        { nome: 'Gestão da Logística Integrada', categoria: 'Logística Geral' },
        { nome: 'Gestão Logística e Gestão de Plataformas Logísticas - Elementos Estratégicos de Desenvolvimento Regional', categoria: 'Logística Geral' },
        { nome: 'Planeamento e Gestão Logística', categoria: 'Logística Geral' },
        { nome: 'Logística e Gestão Orçamental', categoria: 'Logística Geral' },
        { nome: 'Logística Inversa', categoria: 'Logística Geral' },
        { nome: 'Sistemas Colaborativos em Logística', categoria: 'Logística Geral' },
        { nome: 'Procurement e Sistemas Colaborativos em Logística', categoria: 'Logística Geral' },
        { nome: 'Desenho de Sistemas e Fluxos Logísticos', categoria: 'Logística Geral' },
        { nome: 'Cadeia de Aprovisionamento - Gestão e Optimização', categoria: 'Logística Geral' },
        { nome: 'Logística dos Serviços', categoria: 'Logística Geral' },
        { nome: 'Logística Internacional', categoria: 'Logística Geral' },
        { nome: 'Microsoft Excel Aplicado à Logística', categoria: 'Logística Geral' },
        { nome: 'Atendimento ao Cliente - Vertente Logística', categoria: 'Logística Geral' },
        { nome: 'Outsourcing de Actividades Logísticas', categoria: 'Logística Geral' },
        { nome: 'Planeamento, Organização e Gestão de Plataformas Logísticas', categoria: 'Logística Geral' },
        { nome: 'Assistente de Logística', categoria: 'Logística Geral' },

        //Comércio Internacional E Aduaneiro, Gestão De Instalações E Portos
        { nome: 'Import & Export - Procedimentos e Documentação em Importação e Exportação', categoria: 'Comércio Internacional' },
        { nome: 'As Práticas Aduaneiras e o Comércio Internacional', categoria: 'Comércio Internacional' },
        { nome: 'Fiscalidade Aduaneira', categoria: 'Comércio Internacional' },
        { nome: 'Facility Management', categoria: 'Comércio Internacional' },
        { nome: 'Planeamento e Gestão de Terminais - Armazenagem e Transporte', categoria: 'Comércio Internacional' },
        { nome: 'Gestão Portuária', categoria: 'Comércio Internacional' },
        { nome: 'Gestão e Segurança Portuária', categoria: 'Comércio Internacional' },

        //Supply Chain Management (Gestão Da Cadeia De Suprimentos)
        { nome: 'Supply Chain Management', categoria: 'Supply Chain' },
        { nome: 'Gestão de Operações Logísticas da Supply Chain', categoria: 'Supply Chain' },
        { nome: 'Supply Chain Management - Princípios e Práticas', categoria: 'Supply Chain' },
        { nome: 'Transformação Digital na Supply Chain', categoria: 'Supply Chain' },
        { nome: 'Gestão da Cadeia de Abastecimento Global: As Melhores Práticas nas Operações de Importação e Exportação', categoria: 'Supply Chain' },
        { nome: 'As Tecnologias de Informação (TI) no Suporte ao Supply Chain Management', categoria: 'Supply Chain' },

        //Gestão de Armazéns e Stocks
        { nome: 'Gestão de Armazéns', categoria: 'Armazéns e Stocks' },
        { nome: 'O Chefe de Armazém', categoria: 'Armazéns e Stocks' },
        { nome: 'Aperfeiçoamento do Pessoal de Armazéns e Expedições', categoria: 'Armazéns e Stocks' },
        { nome: 'Gestão de Stocks - Métodos e Boas Práticas', categoria: 'Armazéns e Stocks' },
        { nome: 'Optimização dos Stocks de Sobressalentes e Peças de Reserva', categoria: 'Armazéns e Stocks' },
        { nome: 'Microsoft Excel Aplicado à Logística e Gestão de Stocks', categoria: 'Armazéns e Stocks' },

        // Gestão de Contratos
        { nome: 'Gestão de Contratos de Fornecimentos', categoria: 'Gestão de Contratos' },
        { nome: 'Contratos de Compras e Aprovisionamentos', categoria: 'Gestão de Contratos' },
        { nome: 'Contratos de Transportes Terrestres', categoria: 'Gestão de Contratos' }

      ]
    },
    {
      id: 10,
      nome: 'Recursos Humanos',
      descricao: 'Desenvolva estratégias eficazes de gestão de pessoas e recursos humanos.',
      totalCursos: 65,
      imagem: 'assets/recursos-humanos.jpg',
      cursos: [

        //RH Estratégico (31 Cursos)
        { nome: 'Alinhamento Estratégico de RH com a Estratégia Corporativa', categoria: 'RH Estratégico' },
        { nome: 'Gestão Estratégica de Recursos Humanos', categoria: 'RH Estratégico' },
        { nome: 'Gestão Integrada e Desenvolvimento de Recursos Humanos', categoria: 'RH Estratégico' },
        { nome: 'ISO 4512 - Sistemas de Gestão de Pessoas', categoria: 'RH Estratégico' },
        { nome: 'Onboarding nas Organizações - Como desenhar, implementar e gerir eficazmente um processo de Onboarding', categoria: 'RH Estratégico' },
        { nome: 'Atracção e Retenção de Talento nas Organizações', categoria: 'RH Estratégico' },
        { nome: 'Técnicas de Recrutamento e Selecção', categoria: 'RH Estratégico' },
        { nome: 'A Aplicação de Testes Psicológicos em RH - Testes Inteligência, Aptidão e de Personalidade', categoria: 'RH Estratégico' },
        { nome: 'Metodologias de Recrutamento baseados em Competências', categoria: 'RH Estratégico' },
        { nome: 'Recrutar através das Redes Sociais', categoria: 'RH Estratégico' },
        { nome: 'Assessment Center - Criação e Implementação', categoria: 'RH Estratégico' },
        { nome: 'Análise e Descrição de Funções - Abordagens, Técnicas e Metodologias', categoria: 'RH Estratégico' },
        { nome: 'Gestão de Competências - Curso completo', categoria: 'RH Estratégico' },
        { nome: 'Gestão de Carreiras e Mobilidade', categoria: 'RH Estratégico' },
        { nome: 'Avaliação e Gestão de Desempenho', categoria: 'RH Estratégico' },
        { nome: 'Avaliação de Desempenho e Sistemas Retributivos', categoria: 'RH Estratégico' },
        { nome: 'Modelos de Remuneração pelas Competências', categoria: 'RH Estratégico' },
        { nome: 'Salário Emocional e Felicidade nas Organizações', categoria: 'RH Estratégico' },
        { nome: 'Gestão da Performance & Engagement para um desempenho de excelência', categoria: 'RH Estratégico' },
        { nome: 'Conceber e Gerir o Plano de Comunicação Interna', categoria: 'RH Estratégico' },
        { nome: 'Personal Branding', categoria: 'RH Estratégico' },
        { nome: 'Employer Branding e Employee Experience', categoria: 'RH Estratégico' },
        { nome: 'Agile 5 Smart Working - um novo método de trabalho flexível', categoria: 'RH Estratégico' },
        { nome: 'HR Metrics & People Analytics - Avaliação e Métricas Aplicadas aos Recursos Humanos', categoria: 'RH Estratégico' },
        { nome: 'Cultura, Clima e Ambiente Organizacional - Análise e Alinhamento com a Estratégia de Negócio', categoria: 'RH Estratégico' },
        { nome: 'ISO 4427- Norma aplicada aos Sistemas de Recursos Humanos', categoria: 'RH Estratégico' },
        { nome: 'ISO 21001 - Sistema de Gestão para Organizações Educativas/Formativas', categoria: 'RH Estratégico' },
        { nome: 'ISO 10667 - Avaliação de Pessoas em contextos de Trabalho e Organizacionais', categoria: 'RH Estratégico' },
        { nome: 'ISSO 8000 - Responsabilidade Social', categoria: 'RH Estratégico' },
        { nome: 'ISO 26000 e normas 5A 8000 e NP 4469 - Responsabilidade Social', categoria: 'RH Estratégico' },
        { nome: 'ISO 37002 - Sistemas de Gestão de Denúncias', categoria: 'RH Estratégico' },

        //Gestão Administrativa de RH (7 Cursos) 
        { nome: 'Balanced Scorecard aplicado à Função Recursos Humanos', categoria: 'Gestão Administrativa de RH' },
        { nome: 'Planeamento e Orçamentação de Recursos Humanos', categoria: 'Gestão Administrativa de RH' },
        { nome: 'Processamento Salarial e Segurança Social - Impostos e contribuições', categoria: 'Gestão Administrativa de RH' },
        { nome: 'Gestão de Salários - Benefícios e Compensações', categoria: 'Gestão Administrativa de RH' },
        { nome: 'Aposentação e Reformas - Caixa Geral Aposentação', categoria: 'Gestão Administrativa de RH' },
        { nome: 'Como Elaborar Escalas de Trabalho e Horários', categoria: 'Gestão Administrativa de RH' },
        { nome: 'Gestão de Pessoas e Noções de Direito Laboral', categoria: 'Gestão Administrativa de RH' },

        //Direito do Trabalho e Relações Laborais (12 Cursos)
        { nome: 'Lei Geral do Trabalho - Curso Completo', categoria: 'Direito do Trabalho' },
        { nome: 'Gestão de Contratos de Trabalho', categoria: 'Direito do Trabalho' },
        { nome: 'Gestão de Contratos de Trabalho e Contratos de Prestação de Serviços', categoria: 'Direito do Trabalho' },
        { nome: 'A Duração do Trabalho, Férias, Atrasos e Faltas', categoria: 'Direito do Trabalho' },
        { nome: 'A Cessação do Contrato de Trabalho', categoria: 'Direito do Trabalho' },
        { nome: 'Contencioso Laboral - Prevenção e Gestão', categoria: 'Direito do Trabalho' },
        { nome: 'O Procedimento Disciplinar no Código Trabalho', categoria: 'Direito do Trabalho' },
        { nome: 'Gestão de Processos de Despedimento - Aspectos Legais e Comportamentais', categoria: 'Direito do Trabalho' },
        { nome: 'Acidentes de Trabalho - Regime Jurídico no Trabalho', categoria: 'Direito do Trabalho' },
        { nome: 'Regime Jurídico dos Acidentes em Serviço e das Doenças Profissionais', categoria: 'Direito do Trabalho' },
        { nome: 'Segurança e Saúde no Trabalho', categoria: 'Direito do Trabalho' },
        { nome: 'Contratos de Outsourcing', categoria: 'Direito do Trabalho' },

        //Planeamento e Gestão da Formação (15 Cursos)
        { nome: 'Alinhamento Estratégico da função Formação com os objectivos de negócio da organização', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Diagnóstico e Levantamento das Necessidades de Formação', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Metodologias e Técnicas para Diagnosticar Necessidades de Formação', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Gestão da Formação: Diagnosticar, Conceber, Organizar, Desenvolver e Avaliar a Formação Profissional', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Organização e Planeamento da Formação usando técnicas de MIND MAP', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Plano de Formação Profissional - Gestão e Controlo', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Design Thinking na Gestão da Formação', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Planeamento e Gestão Orçamental da Formação', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Como optimizar o Orçamento da Formação', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Avaliação da Formação - Técnicas, Métodos e Instrumentos para Aferir os Resultados, o ROI e a Eficácia da Formação', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'ROI da Formação - Como medir o impacto e o retorno do investimento das acções de formação', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'O Regime Jurídico e as Obrigações Legais da Formação Profissional', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'O Sistema de Acreditação de Entidades Formadoras pelo OGERT', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Auditoria da Formação', categoria: 'Planeamento e Gestão da Formação' },
        { nome: 'Gestão da Formação com Base Requisitos da Norma ISO 9001', categoria: 'Planeamento e Gestão da Formação' }

      ]
    },
    {
      id: 11,
      nome: 'Gestão Empresarial',
      descricao: 'Desenvolva competências de liderança e gestão estratégica para o sucesso empresarial.',
      totalCursos: 30,
      imagem: 'assets/gestao-empresarial.jpg',
      cursos: [

        //Gestão Estratégica de empresas (16 Cursos)
        { nome: 'Estratégia Empresarial E Planeamento Estratégico', categoria: 'Gestão Estratégica' },
        { nome: 'Execução do Plano Estratégico - da Estratégia à Acção', categoria: 'Gestão Estratégica' },
        { nome: 'Planeamento por Cenários', categoria: 'Gestão Estratégica' },
        { nome: 'Competitive Intelligence', categoria: 'Gestão Estratégica' },
        { nome: 'Balanced Scorecard - Quadro de Indicadores de Gestão com Métricas de Performance, da Estratégia à Acção', categoria: 'Gestão Estratégica' },
        { nome: 'Gestão das Alianças e Parcerias Estratégicas', categoria: 'Gestão Estratégica' },
        { nome: 'Resolução de Problemas e Tomada de Decisão - Analytical Thinking', categoria: 'Gestão Estratégica' },
        { nome: 'MINDMAPS - Como sistematizar um conjunto de ideias atavés de um Mapa Mental', categoria: 'Gestão Estratégica' },
        { nome: 'Aglidade Organizacional: Como criar uma Organização Agile', categoria: 'Gestão Estratégica' },
        { nome: 'Lobby Empresarial - Princípios e Práticas', categoria: 'Gestão Estratégica' },
        { nome: 'Gestão da Mudança Organizacional - Liderança, Pessoas e Processos', categoria: 'Gestão Estratégica' },
        { nome: 'Gestão da Performance Corporativa - Métricas e Criação de Valor', categoria: 'Gestão Estratégica' },
        { nome: 'Economia Verde e Sustentabilidade', categoria: 'Gestão Estratégica' },
        { nome: 'Economia Circular', categoria: 'Gestão Estratégica' },
        { nome: 'Ética e Deontologia Profissional', categoria: 'Gestão Estratégica' },
        { nome: 'Ética, Responsabilidade Social e Desenvolvimento Sustentável', categoria: 'Gestão Estratégica' },

        // Gestão Empresarial - Modelos, Técnicas e Boas Práticas (14 Cursos)
        { nome: '10 Dias MBA - Gestão em 10 dias', categoria: 'Gestão Empresarial' },
        { nome: '5 Dias MBA - Gestão em 5 dias', categoria: 'Gestão Empresarial' },
        { nome: 'Economia para Gestores', categoria: 'Gestão Empresarial' },
        { nome: 'Introdução aos Princípios Básicos de Gestão', categoria: 'Gestão Empresarial' },
        { nome: 'Técnicas de Gestão, Comunicação e Liderança', categoria: 'Gestão Empresarial' },
        { nome: 'Construção e Apresentação Eficaz de um Business Plan', categoria: 'Gestão Empresarial' },
        { nome: 'Gestão por Objectivos - Princípios e Práticas', categoria: 'Gestão Empresarial' },
        { nome: 'Competências de Gestão para Novos Gestores e Supervisores - Como Fazer a Transição para Cargos de Gestão', categoria: 'Gestão Empresarial' },
        { nome: 'Gestão Financeira para Quadros Dirigentes', categoria: 'Gestão Empresarial' },
        { nome: 'Gestão de Recursos Humanos para Profissionais não Especialistas de RH', categoria: 'Gestão Empresarial' },
        { nome: 'Gestão de Outsourcing de Serviços', categoria: 'Gestão Empresarial' },
        { nome: 'Gestão de Crises - Abordagens e Boas Práticas', categoria: 'Gestão Empresarial' },
        { nome: 'Planos de Sucessão - Preparar e Desenvolver os Futuros Líderes', categoria: 'Gestão Empresarial' },
        { nome: 'Social Media para Gestores - Potenciar as Novas Ferramentas de Comunicação, Inovação e Colaboração', categoria: 'Gestão Empresarial' }

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

  // Estados de loading
  isLoadingEmail = false;
  isLoadingWhatsApp = false;

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

  constructor(private http: HttpClient) {}

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
    this.isLoadingWhatsApp = true;
    const whatsappNumber = '+244949193887';

    setTimeout(() => {
      if (isParticular) {
        const form = this.formParticular;
        const area = this.areas.find(a => a.id.toString() === form.areaSelecionada);
        const curso = this.cursosDisponiveis.find(c => c.nome === form.cursoSelecionado);

        let message = `*Inscrição para Formação - Particular*\n\n`;
        message += `📋 *Dados Pessoais:*\n`;
        message += `• Nome: ${form.nomeCompleto}\n`;
        message += `• Email: ${form.email}\n`;
        message += `• Telefone: ${form.telefone}\n`;
        if (form.whatsapp) message += `• WhatsApp: ${form.whatsapp}\n`;
        message += `\n📚 *Formação de Interesse:*\n`;
        message += `• Área: ${area?.nome || 'Não especificada'}\n`;
        message += `• Curso: ${curso?.nome || 'Não especificado'}\n`;
        if (form.mensagem) message += `\n💬 *Mensagem:*\n${form.mensagem}`;

        const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        const form = this.formEmpresarial;
        const area = this.areas.find(a => a.id.toString() === form.areaSelecionada);
        const curso = this.cursosDisponiveis.find(c => c.nome === form.cursoSelecionado);

        let message = `*Inscrição para Formação - Empresarial*\n\n`;
        message += `🏢 *Dados da Empresa:*\n`;
        message += `• Empresa: ${form.nomeEmpresa}\n`;
        message += `• Responsável: ${form.nomeResponsavel}\n`;
        message += `• Nº Formandos: ${form.numeroFormandos}\n`;
        message += `• Email: ${form.email}\n`;
        message += `• Telefone: ${form.telefone}\n`;
        if (form.whatsapp) message += `• WhatsApp: ${form.whatsapp}\n`;
        message += `\n📚 *Formação de Interesse:*\n`;
        message += `• Área: ${area?.nome || 'Não especificada'}\n`;
        message += `• Curso: ${curso?.nome || 'Não especificado'}\n`;
        if (form.mensagem) message += `\n💬 *Mensagem:*\n${form.mensagem}`;

        const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      }

      this.isLoadingWhatsApp = false;
      alert('✅ WhatsApp aberto com sucesso!');
      this.fecharFormularios();
    }, 1000);
  }

  // Enviar por Email via PHP
  enviarEmail(isParticular: boolean = true) {
    this.isLoadingEmail = true;

    const area = this.areas.find(a => a.id.toString() === 
      (isParticular ? this.formParticular.areaSelecionada : this.formEmpresarial.areaSelecionada));

    let dados: any = {
      tipoFormulario: isParticular ? 'formacaoParticular' : 'formacaoEmpresa',
      email: isParticular ? this.formParticular.email : this.formEmpresarial.email,
      telefone: isParticular ? this.formParticular.telefone : this.formEmpresarial.telefone,
      whatsapp: isParticular ? this.formParticular.whatsapp : this.formEmpresarial.whatsapp,
      areaNome: area?.nome || 'Não especificada',
      cursoSelecionado: isParticular ? this.formParticular.cursoSelecionado : this.formEmpresarial.cursoSelecionado,
      mensagem: isParticular ? this.formParticular.mensagem : this.formEmpresarial.mensagem
    };

    if (isParticular) {
      dados.nomeCompleto = this.formParticular.nomeCompleto;
    } else {
      dados.nomeEmpresa = this.formEmpresarial.nomeEmpresa;
      dados.nomeResponsavel = this.formEmpresarial.nomeResponsavel;
      dados.numeroFormandos = this.formEmpresarial.numeroFormandos;
    }

    this.enviarEmailPHP(dados).subscribe({
      next: (response) => {
        this.isLoadingEmail = false;
        if (response.success) {
          alert('✅ Email enviado com sucesso!');
          this.fecharFormularios();
        } else {
          alert('❌ ' + response.message);
        }
      },
      error: (error) => {
        this.isLoadingEmail = false;
        alert('❌ Erro ao enviar email. Tente novamente.');
        console.error('Erro:', error);
      }
    });
  }

  // Função HTTP para enviar ao PHP
  private enviarEmailPHP(dados: any): Observable<EmailResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<EmailResponse>(this.PHP_URL, dados, { headers });
  }

  // Enviar para ambos (WhatsApp + Email)
  enviarParaAmbos(isParticular: boolean = true) {
    // Envia WhatsApp
    this.enviarWhatsApp(isParticular);
    
    // Aguarda 1.5s e envia Email
    setTimeout(() => {
      this.enviarEmail(isParticular);
    }, 1500);
  }

  

}
