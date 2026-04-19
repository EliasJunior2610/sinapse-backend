# 📚 API de Gestão de Cursos e Disciplinas

API REST desenvolvida com **NestJS** para gerenciamento de cursos, disciplinas, quizzes e usuários, incluindo sistema de ranking baseado em desempenho.

---

## 🚀 Tecnologias utilizadas

- ⚙️ Node.js
- 🧠 NestJS
- 🍃 MongoDB + Mongoose
- 🔐 JWT (autenticação)
- 📄 Swagger (documentação da API)
- 🧩 TypeScript

---

## 📂 Estrutura do projeto

```
src/
├── controllers/   # Rotas da aplicação
├── services/      # Regras de negócio
├── repositories/  # Acesso ao banco de dados
├── DTOs/          # Tipagem e validação de dados
├── schemas/       # Schemas do Mongoose
├── config/        # Configurações (ex: MongoDB)
```

---

## 🔑 Funcionalidades

- 👤 Cadastro e autenticação de usuários
- 📚 Criação e gerenciamento de cursos
- 📝 Gerenciamento de disciplinas
- ❓ Associação de quizzes às disciplinas
- 🏆 Sistema de ranking por desempenho
- 🔗 Inscrição de usuários via código de convite

---

## 📊 Sistema de Ranking

O ranking dos usuários em uma disciplina é baseado na seguinte lógica:

- Cálculo de desempenho:

```id="b7p3ny"
média = correct_answers / answered_questions
```

- Ordenação:
  - Ordem decrescente (melhores primeiro)

- Tratamento especial:
  - Usuários com `answered_questions = 0` recebem média `0`

---

## 🔧 Instalação e execução

```bash
# Clonar repositório
git clone <url-do-repo>

# Entrar na pasta
cd nome-do-projeto

# Instalar dependências
npm install

# Rodar o projeto
npm run start:dev
```

---

## 🌐 Documentação da API

A documentação interativa está disponível via Swagger:

```
http://localhost:3001/api
```

---

## 🔐 Autenticação

A API utiliza **JWT (Bearer Token)**.

Inclua o token no header das requisições:

```
Authorization: Bearer <seu_token>
```

---

## 📌 Exemplos de endpoints

### Criar curso

```
POST /courses
```

### Listar cursos

```
GET /courses
```

### Atualizar curso

```
PATCH /courses/:course_id
```

### Deletar curso

```
DELETE /courses/:course_id
```

---

## ⚠️ Validações importantes

- IDs são validados antes de consultas no banco
- Código de convite é gerado automaticamente
- Não é permitido alterar o código de convite manualmente

---

## 💡 Melhorias futuras

- 📈 Ranking com peso por quantidade de respostas
- 🧪 Testes automatizados (Jest)
- 🧑‍🤝‍🧑 Sistema de permissões (roles)
- 📊 Dashboard de desempenho
