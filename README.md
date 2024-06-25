
# Client-side

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=EPS-DataMed_client-side&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=EPS-DataMed_client-side) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=EPS-DataMed_client-side&metric=coverage)](https://sonarcloud.io/summary/new_code?id=EPS-DataMed_client-side) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=EPS-DataMed_client-side&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=EPS-DataMed_client-side)

Repositório responsável pelo client-side do projeto Datamed.


## Tabela de Conteúdos

1. [Estrutura do Projeto](#estrutura-do-projeto)
2. [Instalação](#instalação)
3. [Uso](#uso)
4. [Testes](#testes)
5. [Licença](#licença)

## Estrutura do Projeto

```
src
├── @types
├── assets
├── components
├── contexts
├── hooks
├── interfaces
├── lib
├── pages
│   ├── ChangePassword
│   │   ├── assets
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── DependentConfirm
│   │   ├── assets
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── HomePage
│   │   ├── assets
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── Login
│   ├── ManagerUsers
│   ├── RecoverPassword
│   ├── Signup
│   ├── Submission
│   │   ├── components
│   │   ├── constants
│   │   ├── hooks
│   │   ├── interfaces
│   │   ├── repositories
│   │   ├── services
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── UserForm
├── styles
├── utils
├── App.tsx
├── main.tsx
├── vite-env.d.ts
├── .env
├── .eslintrc.json
├── .gitignore
├── index.html
├── jest.config.ts
├── package-lock.json
├── package.json
├── setupTests.ts
├── sonar-project.properties
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

## Instalação

Instruções sobre como instalar e configurar o projeto localmente.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Navegue até o diretório do projeto
cd seu-repositorio

# Instale as dependências
npm install
```

É recomendado usar o node na versão nvm use 18.16.0.

## Uso

Instruções sobre como usar o projeto após a instalação.

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

## Testes

Instruções sobre como usar rodar o coverage do projeto.

```bash
# Gera a pasta de coverage, acesse coverage/index.html para visualizar
# a cobertura total dos testes.
npm run test:coverage
```

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
