# 📋 Task Manager - Projeto de Gerenciamento de Tarefas

Este projeto é uma aplicação web completa para gerenciamento de tarefas, desenvolvido com as seguintes tecnologias:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🚀 Funcionalidades

### ✅ CRUD de Tarefas
- Criação, listagem, edição e exclusão de tarefas.
- Cada tarefa possui:
  - Título
  - Descrição (opcional)
  - Status: **A Fazer**, **Em Andamento**, **Concluída**
  - Prioridade: **Alta**, **Média**, **Baixa**
  - Favorito: pode ser marcada como favorita

### 📊 Dashboard de Analytics
- Exibe estatísticas:
  - Total de tarefas
  - Tarefas concluídas
  - Tarefas pendentes
  - Gráfico de tarefas

### ⭐ Favoritar Tarefas
- Marque/desmarque tarefas como favoritas usando um botão de estrela.

## 🛠️ Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/allanvinicius/task-manager.git
cd task-manager
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados

Crie um arquivo `.env` e adicione sua URL de conexão com o banco:
```
DATABASE_URL=""
```

Em seguida, rode as migrações:

```bash
npx prisma migrate dev --name init
```

### 4. Inicie o servidor
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📦 Deploy na Vercel

1. Faça um fork deste repositório.
2. Vá até [vercel.com](https://vercel.com), crie uma conta e importe seu projeto.
3. Defina a variável de ambiente `DATABASE_URL` no painel da Vercel.
4. Clique em **Deploy**.

## ✨ Melhorias Futuras
- Filtros por status, prioridade ou favoritos
- Autenticação com NextAuth
- Testes automatizados

## 👨‍💻 Desenvolvido por
Allan Vinícius de Moura
Linkedin: [https://www.linkedin.com/in/allanviniciusdemoura/](https://www.linkedin.com/in/allanviniciusdemoura/)
