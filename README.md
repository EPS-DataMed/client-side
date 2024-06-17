
# Client-side

Reposiório responsável pelo client-side do projeto Datamed.

## Tabela de Conteúdos

1. [Estrutura do Projeto](#estrutura-do-projeto)
2. [Instalação](#instalação)
3. [Uso](#uso)
4. [Testes](#testes)
5. [Contribuição](#contribuição)
6. [Licença](#licença)

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

## Contribuição

Para contribuir com este projeto open source, siga as etapas abaixo:

1. Faça um fork do repositório.
2. Crie um branch para sua feature (`git checkout -b feature/AmazingFeature`).
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`).
4. Faça um push para o branch (`git push origin feature/AmazingFeature`).
5. Abra um Pull Request.

Todos são bem-vindos para contribuir, seja através do desenvolvimento de novas funcionalidades, correção de bugs, ou melhoria da documentação. Agradecemos antecipadamente pela sua colaboração!

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
