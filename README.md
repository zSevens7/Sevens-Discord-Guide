# Sevens Discord Guide

Bem-vindo ao repositório do **Sevens Discord Guide**, um projeto complementar aos meus sites **SevensNovels** e **SevensReview**.

Este projeto contém o bot e o guia para gerenciar cargos/roles no Discord de forma prática para a comunidade de webnovels.

---

## 🔗 Sites relacionados

- [SevensNovels](https://sevensnovels.com.br/)
- [SevensReview](https://sevensreview.com.br/)

Este bot foi criado para complementar esses sites, permitindo que usuários do Discord possam interagir, trocar roles e participar da comunidade focada em webnovels.

---

## ⚙️ Funcionalidades do projeto

- Permitir que usuários troquem de **Roles/Cargos** no Discord via comando `!bot`.
- Estrutura de bot organizada com comandos e eventos separados.
- Integrável com outros projetos frontend, como sites de geração de anúncios ou hubs de comunidade.

---

## 📝 Como usar

1. **Clone este repositório:**
```bash
git clone https://github.com/zSevens7/Sevens-Discord-Guide.git
cd Sevens-Discord-Guide
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Crie um arquivo .env na raiz com as variáveis necessárias para o bot:**

```bash
DISCORD_TOKEN=seu_token_aqui
PREFIX=!  # exemplo de prefixo para comandos
```
Atenção: o arquivo .env não está incluído no repositório e não deve ser compartilhado publicamente, pois contém tokens sensíveis.

4. **Inicie o bot:**

```bash
npm start
```

O bot deve conectar-se ao seu servidor Discord e começar a responder aos comandos configurados.

---

📂 **Estrutura do projeto**

- `index.js` – Código-fonte principal do bot
- `.env` – Variáveis de ambiente (não incluído no GitHub)
- `node_modules/` – Dependências (ignorado pelo Git)
- `package.json` – Informações do projeto e scripts de execução

🚀 **Observações**

O projeto é público, mas o .env e a pasta node_modules estão ignorados pelo .gitignore.

Pode ser usado como base para integrar com os outros sites frontend que você criou, como geração de anúncios e comunidade.

Para colaboração ou dúvidas, abra uma issue no repositório.

📜 Licença

MIT License


