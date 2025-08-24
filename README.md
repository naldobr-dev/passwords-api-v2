# 🔐 Passwords API v2

API RESTful segura para gerenciamento de senhas, construída com **Node.js**, **Express**, **TypeScript** e **MongoDB**, com proteção via **API Key**.

---

## 🚀 Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [dotenv](https://github.com/motdotla/dotenv) para variáveis de ambiente

---

## 📁 Estrutura do projeto

```

src/
├── middleware/
│   └── apiKeyAuth.ts       # Middleware de autenticação por API Key
├── routes/
│   └── passwords.ts        # Rotas REST para senhas
├── db.ts                   # Conexão com o MongoDB
├── index.ts                # Ponto de entrada da aplicação
vercel.json                 # Configuração para deploy na Vercel
tsconfig.json               # Configuração do TypeScript

````

---

## 🔐 Segurança

- Todas as rotas da API são protegidas por uma **API Key** enviada via cabeçalho `x-api-key`.
- Os dados são **armazenados criptografados** no banco de dados (ex: AES-256-CBC).
- A descriptografia **não é feita na API**, garantindo segurança ponta-a-ponta.

---

## 📦 Endpoints disponíveis

### ➤ `GET /api/passwords`
Retorna todas as senhas armazenadas (criptografadas).

### ➤ `GET /api/passwords/:id`
Retorna uma senha específica por ID.

### ➤ `POST /api/passwords`
Cria uma nova senha.

**Corpo esperado:**
```json
{
  "title": "iv:titulo_criptografado",
  "username": "iv:usuario_criptografado",
  "password": "iv:senha_criptografada",
  "url": "iv:url_criptografada",
  "notes": "iv:nota_criptografada",
  "createdAt": "19/06/2025 08:12:15",
  "updatedAt": "20/08/2025 11:29:20"
}
````

### ➤ `PUT /api/passwords/:id`

Atualiza os campos de uma senha existente.

### ➤ `DELETE /api/passwords/:id`

Remove a senha do banco de dados.

### ➤ `GET /health`

Retorna status de saúde da API.

---

## 🔧 Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=mongodb+srv://<usuário>:<senha>@cluster.mongodb.net/
DATABASE_NAME=<nome do database>
API_KEY=suachavesecreta
PORT=3000
```

---

## 🛠 Scripts úteis

```bash
npm run dev       # Executa localmente com ts-node
npm run build     # Compila o TypeScript para JavaScript (pasta dist/)
npm start         # Inicia a versão compilada (dist/index.js)
```

---

## 🌐 Deploy na Vercel

A API está preparada para ser deployada na [Vercel](https://vercel.com/) com o arquivo `vercel.json`.

### vercel.json

```json
{
  "version": 2,
  "builds": [
    { "src": "dist/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "dist/index.js" }
  ]
}
```

---

## ⚠️ Observações

* Os campos devem ser enviado **já criptografado** pelo client.
* Esta API é ideal para ser consumida por um app cliente com suporte a **armazenamento seguro e biometria**, como apps feitos em **React Native**, **Flutter**, **.NET MAUI** ou **mobile nativo**.

---

## 📄 Licença

Este projeto é de uso pessoal e educacional. Sinta-se livre para adaptar, estudar e expandir.

