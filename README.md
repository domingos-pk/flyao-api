# ✈️ FlyAO API

Backend da aplicação **FlyAO** — plataforma para acompanhamento de voos e bagagens em Angola.

---

## 🚀 Tecnologias

- **Node.js** com ES Modules
- **Express 5**
- **PostgreSQL**
- **Prisma ORM 7** com Driver Adapter (`@prisma/adapter-pg`)
- **dotenv**

---

## 📁 Estrutura do Projeto

```
flyao-api/
├── generated/
│   └── prisma/
│       └── client/          # Client gerado pelo Prisma
├── prisma/
│   └── schema.prisma        # Schema do banco de dados
├── src/
│   ├── config/
│   │   └── prisma.js        # Instância do PrismaClient
│   ├── modules/
│   │   ├── users/           # Módulo de utilizadores
│   │   └── flights/         # Módulo de voos
│   └── server.js            # Entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU_USER/flyao-api.git
cd flyao-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Cria um ficheiro `.env` na raiz:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/flyao_db"
NODE_ENV="development"
PORT=5001
```

### 4. Gerar o Prisma Client

```bash
npm run prisma:generate
```

### 5. Executar as migrações

```bash
npm run prisma:migrate
```

### 6. Iniciar o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

---

## 📜 Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia com nodemon (hot reload) |
| `npm start` | Inicia em produção |
| `npm run prisma:generate` | Gera o Prisma Client |
| `npm run prisma:migrate` | Executa migrações |
| `npm run prisma:studio` | Abre o Prisma Studio |

---

## 🗺️ Roadmap MVP

- [x] Configuração do repositório
- [x] Configuração do PostgreSQL + Prisma
- [ ] Módulo de utilizadores (User)
- [ ] Autenticação (JWT)
- [ ] Módulo de voos (Flight)
- [ ] CRUD de voos
- [ ] Deploy

---

## 📄 Licença

ISC
