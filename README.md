# Todo List - React + Node.js + MySQL

Projeto Todo List completo, com **frontend em React + Vite** e **backend em Node.js + Express + MySQL**, incluindo CRUD completo.

---

## Pré-requisitos

- Node.js >= 18
- npm
- MySQL >= 8.0
- Navegador moderno

---

## Configuração do banco de dados

1. Abra o MySQL e execute:

```sql
CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE tasks (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);
```

No arquivo backend/db.js, configure seu usuário e senha:

```
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        // seu usuário MySQL
  password: 'SUA_SENHA_AQUI', // sua senha MySQL
  database: 'todo_app',
  waitForConnections: true,
  connectionLimit: 10
})
```

## Instalação

Clone o projeto:
```
git clone <URL_DO_REPOSITORIO>
cd todolist
```
Instale dependências do backend:
```
cd backend
npm install
```

Instale dependências do frontend:
```
cd ../frontend
npm install
```

Instale concurrently no diretório raiz (para rodar frontend e backend juntos):
```
cd ..
npm install -D concurrently
```

## Rodando o projeto

No diretório raiz (todolist/), rode:
```
npm run dev
```

Isso vai iniciar:
```
Backend: http://localhost:3333

Frontend: http://localhost:5173
```
Abra http://localhost:5173 no navegador e veja o Todo List funcionando.
