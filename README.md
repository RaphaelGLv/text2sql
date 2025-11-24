# Text2SQL - Interface de Banco de Dados via Linguagem Natural

**Disciplina:** Banco de Dados 2  
**Alunos:** Raphael Gonçalves Leiva e Rennan Furlaneto Collado  
**Data:** 24/11/2025  

---

## 1. Introdução e Objetivo

O projeto Text2Sql consiste no desenvolvimento de uma aplicação web capaz de democratizar o acesso a bancos de dados relacionais. A aplicação atua como uma interface inteligente que traduz perguntas feitas em linguagem natural (Português/Inglês) para consultas SQL sintaticamente corretas e executáveis.

O objetivo principal é eliminar a barreira técnica da linguagem SQL para usuários finais (gestores, analistas), permitindo que eles interajam com seus próprios dados (arquivos .sqlite ou scripts .sql) através de uma interface de chat intuitiva. O sistema demonstra a integração avançada entre Frontend, Backend, SGBDs Relacionais e Modelos de Linguagem (LLMs).

---

## 2. Definição do Domínio e Problema

O domínio da aplicação é a Administração de Dados e Business Intelligence (BI).  
Em sistemas tradicionais, a extração de informações gerenciais exige conhecimento técnico em SQL para realizar JOINs, agrupações e filtros. O Text2Sql resolve o problema da acessibilidade aos dados, automatizando a construção da query baseada na estrutura (schema) do banco de dados fornecido pelo usuário.

---

## 3. Arquitetura da Solução

A aplicação foi desenvolvida utilizando uma arquitetura moderna e desacoplada.

### 3.1. Frontend (Next.js & React)

Responsável pela interação com o usuário, gerenciamento de estado local e processamento inicial de arquivos.

**Gerenciamento de Schemas:**  
Utiliza o localStorage e IndexedDB para persistir os schemas dos bancos de dados do usuário no navegador, evitando re-uploads constantes.

**Processamento Local:**  
Implementa lógica para ler arquivos .sql (via FileReader), extraindo apenas a estrutura DDL (CREATE TABLE) necessária.

---

### 3.2. Backend & Integração AI (Server Actions & LangChain)

Responsável pela orquestração entre a intenção do usuário e a geração de código.

- **Engenharia de Prompt:** Constrói instruções dinâmicas contendo o perfil do especialista SQL, o schema do banco selecionado e a pergunta do usuário.  
- **API de LLM:** Integração com modelos generativos (Groq/Llama) para realizar a tradução semântica.  
- **Validação:** Recebe a string SQL gerada e a entrega ao frontend para execução ou exibição.

---

## 4. Regras de Negócio e Implementação Técnica

Diferente de um sistema transacional comum, as regras de negócio deste projeto focam na integridade da interpretação dos dados e na otimização de contexto.

### 4.1. Regra de Extração e Limpeza de Schema (Data Parsing)

Para garantir que a IA compreenda o banco de dados sem exceder limites de processamento ou custo, foi implementado um algoritmo rigoroso de extração:

- **Entrada:** O sistema aceita dumps completos de banco de dados (incluindo grandes volumes de `INSERT INTO`).  
- **Processamento:** Um algoritmo de Regex filtra o conteúdo, descartando dados sensíveis e volumosos, mantendo estritamente os comandos `CREATE TABLE` e `ALTER TABLE`.  
- **Justificativa:** Garante que a IA receba apenas a estrutura relacional essencial para montar JOINs corretamente, sem expor dados reais.

---

### 4.2. Persistência e Versionamento de Contexto

O sistema implementa uma camada de armazenamento cliente (Zustand + IndexedDB) que permite ao usuário alternar entre diferentes contextos de banco de dados (ex: “Banco Financeiro” vs “Banco de Estoque”) instantaneamente.

A regra garante que uma pergunta feita no contexto do "Banco A" não sofra alucinações baseadas no schema do "Banco B".

### Cenários Executados

#### • Consultas Simples  
**Input:** “Liste todos os clientes que moram no Brasil.”  
**Output Esperado:**  
```sql
SELECT * FROM Customer WHERE Country = 'Brazil';
