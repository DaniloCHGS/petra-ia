# Petra IA

Petra IA é um assistente virtual especializado em Bíblia e Teologia, desenvolvido para ajudar pessoas a compreenderem melhor as Escrituras Sagradas.

<!-- ![Petra IA](https://via.placeholder.com/800x400?text=Petra+IA) -->

## 📋 Sobre o Projeto

Petra IA é uma aplicação web que utiliza a API Gemini da Google para fornecer respostas precisas e contextualizadas sobre temas bíblicos e teológicos. O assistente é capaz de:

- Responder perguntas sobre o conteúdo da Bíblia (Antigo e Novo Testamento)
- Explicar contextos históricos, geográficos e culturais dos textos bíblicos
- Abordar temas teológicos com profundidade e clareza
- Adaptar suas respostas para diferentes níveis de conhecimento
- Manter histórico de conversas usando armazenamento local

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Ferramenta de build rápida para desenvolvimento moderno
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Google Gemini API**: Modelo de linguagem avançado para geração de respostas
- **React Markdown**: Para renderização de conteúdo formatado
- **IndexedDB (idb)**: Para armazenamento local do histórico de conversas
- **React Hot Toast**: Para notificações na interface
- **Lucide React**: Biblioteca de ícones

## 🔧 Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn

### Instalação

1. Clone o repositório:

   ```bash
   git clone git@github.com:DaniloCHGS/petra-ia.git
   cd petra
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API da Google Gemini:
   ```
   VITE_GEMINI_API_KEY=sua-chave-da-api
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
5. Acesse a aplicação em `http://localhost:5173/`.

## 🏗️ Estrutura do Projeto

```bash
petra/
├── src/
│ ├── components/ # Componentes React
│ ├── services/ # Serviços e integrações
│ │ ├── db.ts # Gerenciamento de banco de dados local
│ │ ├── gemini.ts # Integração com a API Gemini
│ │ ├── modelPrompt.ts # Prompt do modelo
│ ├── App.tsx # Componente principal
│ ├── main.tsx # Ponto de entrada
│ └── global.css # Estilos globais
├── public/ # Arquivos estáticos
└── ... # Arquivos de configuração
```

## 💡 Funcionalidades

- Interface de Chat : Interface amigável para interação com o assistente
- Renderização Markdown : Suporte a formatação nas respostas do assistente
- Histórico de Conversas : Armazenamento local das conversas usando IndexedDB
- Contexto de Conversa : O assistente mantém o contexto da conversa atual
- Notificações : Feedback visual para ações do usuário

## 📦 Build para Produção

```bash
  npm run build
  # ou
  yarn build
```

Os arquivos otimizados serão gerados na pasta dist/ .
