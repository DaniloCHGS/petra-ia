# Petra IA

Petra IA é um assistente virtual especializado em Bíblia e Teologia, desenvolvido para ajudar pessoas a compreenderem melhor as Escrituras Sagradas.

<!-- ![Petra IA](https://via.placeholder.com/800x400?text=Petra+IA) -->

## 📋 Sobre o Projeto

Petra IA é uma aplicação web que utiliza a API Gemini da Google para fornecer respostas precisas e contextualizadas sobre temas bíblicos e teológicos. O assistente é capaz de:

- Responder perguntas sobre o conteúdo da Bíblia (Antigo e Novo Testamento)
- Explicar contextos históricos, geográficos e culturais dos textos bíblicos
- Abordar temas teológicos com profundidade e clareza
- Adaptar suas respostas para diferentes níveis de conhecimento

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Ferramenta de build rápida para desenvolvimento moderno
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Google Gemini API**: Modelo de linguagem avançado para geração de respostas
- **React Markdown**: Para renderização de conteúdo formatado

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
│ ├── App.tsx # Componente principal
│ ├── main.tsx # Ponto de entrada
│ └── global.css # Estilos globais
├── public/ # Arquivos estáticos
└── ... # Arquivos de configuração
```

## 📦 Build para Produção

```bash
  npm run build
  # ou
  yarn build
```
