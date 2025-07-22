# 💻 CodeHabits Web

Este repositório contém o código-fonte do **CodeHabits Dashboard**, uma aplicação Web desenvolvida como parte de um Trabalho de Conclusão de Curso (TCC), cujo objetivo é **promover saúde, bem-estar e produtividade entre desenvolvedores de software**.

A plataforma foi construída com tecnologias modernas como **React**, **TypeScript** e **Tailwind CSS**, integrando serviços externos como **Clerk** (autenticação) e **Supabase** (backend), com suporte a **webhooks personalizados** para manter os dados de usuário sempre sincronizados.

---

## 🚀 Visão Geral do Projeto

O **CodeHabits Dashboard** é uma solução pensada exclusivamente para o nicho de desenvolvedores, buscando mitigar os efeitos do sedentarismo, estresse, esgotamento mental (burnout) e falta de foco — fatores comuns no cotidiano de profissionais da área de tecnologia.

Diferentemente de ferramentas genéricas de produtividade ou saúde, esta aplicação foca em **integrar funcionalidades relevantes e específicas para a realidade do desenvolvedor**, oferecendo um ambiente único e personalizado que centraliza:

- **Timers de foco (Pomodoro e personalizado)**
- **Monitoramento de hábitos de bem-estar (hidratação, pausas mentais, saúde visual/postural)**
- **Registro de humor e estresse**
- **Sistema de gamificação (badges, XP, desafios)**
- **Dashboard visual e motivacional**
- **Player de ruído marrom e sons ambientes para foco**

Além disso, o projeto demonstra **boas práticas de engenharia de software**, adotando uma arquitetura modular e escalável, com separação de responsabilidades entre camadas (UI, lógica, autenticação, persistência), uso de **hooks reutilizáveis**, **componentização**, e um design orientado à experiência do usuário (UX).

---

## 🛠️ Tecnologias Utilizadas

### ⚙️ Front-end
- **React** — Biblioteca para criação de interfaces declarativas.
- **TypeScript** — Superset do JavaScript com tipagem estática.
- **Vite** — Build tool para front-end moderno.
- **Tailwind CSS** — Framework utilitário para estilização responsiva.

### 🔐 Autenticação
- **Clerk** — Serviço de autenticação com fluxos de login/registro seguros e pré-construídos.

### 🗄️ Backend & Banco de Dados
- **Supabase** — Backend-as-a-Service com PostgreSQL, APIs geradas automaticamente e Row Level Security (RLS).
- **Docker** — Utilizado para rodar o Supabase localmente.

### 🔁 Integração
- **Webhooks via Node.js/Express** — Sincronização de eventos do Clerk com o banco de dados Supabase (repositório separado `supabase-webhook-server`).

---

## ⚙️ Como Executar Localmente

### ✅ Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS)
* npm ou Yarn
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* CLI do [Supabase](https://supabase.com/docs/guides/cli)

---

### 🐘 Etapa 1: Iniciar Supabase Local

```
supabase start
```

* Acesse o Studio em `http://localhost:54323`.
* Crie as tabelas: `profiles`, `mood_logs`, `dev_health_metrics`, etc.
* Ative **Row Level Security (RLS)** e defina regras.
* Copie os valores: `anon key`, `service role`, `project URL`.

---

### 🔁 Etapa 2: Webhook Server (Projeto Separado)

Siga o `README.md` do repositório [`supabase-webhook-server`](https://github.com/seu-usuario/supabase-webhook-server). É necessário expor esse servidor com `loca.lt` para que o Clerk envie os eventos de autenticação.

---

### 📦 Etapa 3: Variáveis de Ambiente

Crie o arquivo `.env` na raiz do front-end (`code-habits-web/.env`):

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_SUA_PUBLIC_KEY
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY
```

---

### 📥 Etapa 4: Instalar Dependências

```
npm install
# ou
yarn install
```

---

### 🧪 Etapa 5: Rodar a Aplicação

```
npm run dev
# ou
yarn dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## 🧩 Funcionalidades Principais (Em Desenvolvimento)

* ✅ Autenticação com Clerk (Login, Registro, Perfil)
* 📊 Dashboard de hábitos e métricas de saúde
* 🧠 Registro e acompanhamento de hábitos
* ❤️ Métricas de bem-estar (humor, sono, produtividade, etc.)
* 🔔 Lembretes e notificações (planejado)
* 📈 Visualizações e gráficos (planejado)

---

## 🗂️ Organização do Projeto

```
code-habits-web/
├── public/                      # Arquivos públicos (favicon, manifest, etc.)
├── src/
│   ├── app/
│   │   ├── components/          # Componentes específicos de cada rota (isolados por página)
│   │   └── routes/              # Definição de rotas (caso use React Router ou similar)
│   │
│   ├── assets/
│   │   ├── images/              # Imagens estáticas da aplicação
│   │   └── styles/              # Estilos globais ou específicos
│   │
│   ├── contexts/                # Contextos globais (Auth, Theme, etc.)
│   │
│   ├── features/                # Feature-based architecture (modular)
│   │   ├── auth/                # Funcionalidades relacionadas à autenticação
│   │   ├── gamification/        # Recompensas, níveis, badges, etc.
│   │   ├── habits/              # Lógica de criação e monitoramento de hábitos
│   │   └── theme/               # Sistema de tema (claro/escuro, configs visuais)
│   │
│   ├── hooks/                   # Hooks reutilizáveis e globais
│   │
│   ├── pages/                   # Páginas principais
│   │   ├── dashboard/           # Painel com métricas e hábitos
│   │   ├── home/                # Landing page ou tela inicial
│   │   └── statusCode/          # Páginas de erro (404, 500, etc.)
│   │
│   ├── providers/               # Providers de contexto (Clerk, Supabase, Theme, etc.)
│   │
│   ├── services/                # Serviços de API, autenticação, integração externa
│   │
│   └── shared/                  # Recursos reutilizáveis em toda a aplicação
│       ├── components/          # Componentes reutilizáveis (botões, modais, inputs)
│       ├── constants/           # Constantes globais
│       ├── data/                # Dados mockados, dados estáticos ou de configuração
│       ├── hooks/               # Hooks reutilizáveis por todo o projeto
│       ├── types/               # Tipagens TypeScript centralizadas
│       └── utils/               # Funções utilitárias e helpers
│
├── supabase/
│   ├── .branches/               # Dados internos do Supabase CLI
│   └── .temp/                   # Arquivos temporários do ambiente local
│
├── .env                         # Variáveis de ambiente
├── .gitignore                   # Arquivos/pastas ignorados pelo Git
├── package.json                 # Dependências e scripts do projeto
├── tsconfig.json                # Configuração do TypeScript
└── vite.config.ts               # Configuração do Vite

```

---

## 🤝 Contribuindo

Este é um projeto acadêmico individual para fins de TCC. Contribuições externas não estão sendo aceitas no momento, mas feedbacks são bem-vindos!

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👩‍🎓 Sobre o Projeto

Este projeto foi desenvolvido como parte do Trabalho de Conclusão de Curso (TCC), com foco em aplicações modernas, integrações reais com serviços de autenticação e gerenciamento de dados em tempo real, visando explorar o ecossistema **React + Serverless**.

---

## Prints da Aplicação

**Inserir os prints das telas aqui**

---
