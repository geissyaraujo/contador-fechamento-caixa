# Contador Fechamento de Caixa

Frontend do sistema de **fechamento de caixa** da Doces e Mimos. Interface web em HTML, CSS e JavaScript que consome a [Cash Closure API](../cash-closure-api/README.md) para autenticação, saldo, sangria e fechamento de caixa.

### Estrutura de pastas

- **contador-fechamento-caixa/**
  - `package.json` — dependências e metadados do projeto
  - `server.js` — servidor Express que entrega os arquivos estáticos
  - **src/** — telas e scripts do frontend
    - `config.js` — URL base da API (`API_BASE_URL`)
    - `login.html` / `script-login.js` — autenticação
    - `dashboard.html` — painel principal
    - `caixa.html` / `script-caixa.js` — contagem de notas e moedas
    - `sangria.html` / `confirmar_sangria.html` — registro de sangria
    - `revisao.html` — revisão e envio do fechamento
    - `relatorio_caixa.html` — relatório detalhado
    - `cadastro.html`, `perfil.html`, `configuracoes.html` — cadastro e perfil
    - `recuperar_senha.html`, `trocar_senha.html` — recuperação de senha
  - **assets/** — imagens, ícones e logos
  - **models/** — modelos legados (não utilizados pelo frontend atual)

### Pré-requisitos

- Node.js 18+ (recomendado)
- [Cash Closure API](../cash-closure-api/README.md) em execução (PostgreSQL configurado)

### Configuração da API

O frontend se comunica com o backend por meio da constante `API_BASE_URL` em `src/config.js`:

```js
const API_BASE_URL = window.API_BASE_URL || 'http://localhost:5001';
```

Por padrão, aponta para `http://localhost:5001`. Ajuste esse valor se a API estiver em outra porta ou ambiente (homologação, produção).

Também é possível sobrescrever em tempo de execução antes de carregar os scripts:

```html
<script>window.API_BASE_URL = 'https://api.seudominio.com';</script>
<script src="config.js"></script>
```

### Instalação e execução

```bash
cd contador-fechamento-caixa
npm install
node server.js
```

O frontend ficará disponível em:

- App: `http://localhost:3000`

Para usar outra porta:

```bash
PORT=8080 node server.js
```

### Fluxo principal

1. **Login** — o usuário informa credenciais; o token JWT é salvo em `localStorage`.
2. **Dashboard** — exibe saldo atual consultando `GET /api/cash/balance`.
3. **Controle de caixa** — contagem guiada de cédulas e moedas (12 etapas), com dados persistidos em `localStorage`.
4. **Sangria** — registro de retirada via `POST /api/cash/sangria`.
5. **Revisão e fechamento** — confirmação dos valores e envio para `POST /api/cash/closures`.
6. **Relatório** — visualização do fechamento concluído.

### Integração com o backend

Endpoints consumidos pelo frontend:

| Tela / script | Endpoint | Método |
|---|---|---|
| `script-login.js` | `/api/auth/login` | POST |
| `dashboard.html` | `/api/cash/balance` | GET |
| `confirmar_sangria.html` | `/api/cash/sangria` | POST |
| `revisao.html` | `/api/cash/closures` | POST |

O token de autenticação é enviado no header `Authorization: Bearer <token>` nas requisições autenticadas.

### Executar backend e frontend juntos

Em terminais separados:

```bash
# Terminal 1 — API
cd cash-closure-api
npm install
npm run dev

# Terminal 2 — Frontend
cd contador-fechamento-caixa
npm install
node server.js
```

Certifique-se de que a porta configurada em `src/config.js` corresponde à porta definida no `.env` da API (`PORT`).

### Desenvolvimento

- As telas são arquivos HTML estáticos com CSS e JavaScript inline ou em arquivos separados (`script-login.js`, `script-caixa.js`).
- Dados temporários da contagem ficam em `localStorage` (`dadosContagem`, `totalUltimaSangria`, `token`, `usuarioLogado`).
- Para testar o login, utilize um usuário criado na API (ex.: `admin`, conforme `sql_init.sql` do backend).
