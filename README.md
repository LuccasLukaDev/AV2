# ✈️ AeroCode

Sistema web de gestão da produção de aeronaves — do cadastro inicial à entrega final.

---

## 📋 Sobre

AeroCode é uma aplicação desenvolvida em **React + TypeScript** para gerenciar o ciclo completo de produção de aeronaves, incluindo controle de etapas, peças, testes, funcionários e geração de relatórios.

---

## 🚀 Tecnologias

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- CSS Modules

---

## ⚙️ Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

---

## 🗂️ Estrutura de Rotas

| Rota | Descrição |
|------|-----------|
| `/aeronaves` | Listagem e detalhe de aeronaves |
| `/etapas` | Listagem e controle de etapas |
| `/pecas` | Listagem e edição de peças |
| `/funcionarios` | Listagem e edição de funcionários |
| `/testes` | Listagem e edição de testes |

---

## 🔐 Níveis de Acesso

| Nível | Acesso |
|-------|--------|
| **ADM** | Todas as rotas |
| **ENGENHEIRO** | Peças, Etapas e Testes |
| **OPERADOR** | Apenas Peças |

---

## 👨‍💻 Usuário Admin

Usuario admin já vem cadastrado para primeiro acesso:

Login: dean
Senha: 123

---
## 📦 Entidades

### ✈️ Aeronave
- ID único sequencial (`A001`, `A002`...)
- Associação de peças, etapas e testes
- Geração de relatório `.txt`

### 🔧 Peça
- ID único sequencial (`P001`, `P002`...)
- Status: `EM_PRODUCAO` · `EM_TRANSPORTE` · `PRONTA`
- Só pode pertencer a uma aeronave por vez

### 📅 Etapa
- Progressão de status controlada: `PENDENTE → ANDAMENTO → CONCLUÍDA`
- Não pode concluir se houver etapa anterior ainda em andamento
- Associação de funcionários responsáveis

### 🧪 Teste
- Tipos: `ELETRICO` · `HIDRAULICO` · `AERODINAMICO`
- Resultado: `APROVADO` · `REPROVADO`
- Vinculado a uma aeronave específica

### 👤 Funcionário
- Autenticação com username e senha
- Nível de permissão: `ADM` · `ENGENHEIRO` · `OPERADOR`
- Username único por sistema

---

## 📏 Regras de Negócio

- IDs gerados automaticamente em sequência crescente
- Usernames de funcionários não podem se repetir
- Peças, etapas e testes só podem estar associados a uma aeronave por vez
- Etapas seguem progressão linear sem possibilidade de regressão de status
- Senha de funcionário oculta por padrão com toggle de visualização

---

## 🖥️ Compatibilidade

- Windows 10 ou superior
- Linux Ubuntu 24.04.03 ou superior
- Distribuições Linux derivadas do Ubuntu

---

## 📄 Licença

Este projeto foi desenvolvido como parte de uma atividade acadêmica — AV2 · 2026.
