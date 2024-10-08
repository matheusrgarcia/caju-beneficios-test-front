# Caju Front End Teste

Esse é um desafio técnico para você demonstrar suas habilidades como frontend, sua missão será dar continuidade ao desenvolvimento da plataforma de admissão que consiste em duas telas, a tela de `Dashboard` e uma tela de `Cadastro`.

## Sobre a arquitetura do projeto.

Este projeto utiliza uma arquitetura de modules, onde cada module é responsável por sí mesmo e isolado de outros modulos.

O modulo responsável pelo `Dashboard` é o modulo `dashboard`
O modulo responsável pelo `Cadastro` é o modulo `register`

O modulo `shared` contêm componentes e utilitários que vão ser utilizados por ambos modulos, ou quaisquer modulos que venham a ser criados.

## Iniciando o desenvolvimento

Realize o clone do repositório e instale as dependências

```shell
git clone https://github.com/matheusrgarcia/caju-beneficios-test-front.git
```

```shell
yarn install
```

Inicie o servidor do Json Web Server para consumir a API

```shell
yarn init:db
```

Execute a aplicação

```shell
yarn dev
```

Para executar os testes unitários e de integração com Vitest

```shell
yarn test
```

Para executar o teste e2e com Cypress

```shell
yarn test:e2e
```

Caso não queira rodar o frontend da aplicação localmente, acesse o link abaixo. Ainda é necessário rodar o banco de dados localmente.

[Caju Benefícios Frontend](https://caju-beneficios-test-front.vercel.app/dashboard)


## Especificações

### Tela Dashboard Checklist

- [x] Implementar `GET` ao carregar a pagina e ao fazer pequisa por `CPF`
- [x] Filtrar os cards por coluna, usando o status.
- [x] Implementar `PUT` ao clicar em Reprovar e alterar o status para `REPROVED`
- [x] Implementar `PUT` ao clicar em Aprovar e alterar o status para `APPROVED`
- [x] Implementar `PUT` ao clicar em Revisar novamente e alterar o status para `REVIEW`
- [x] Implementar `DELETE` ao clicar no lixeira no card.
- [x] O botão de `Reprovar` e `Aprovar` só deve aparecer em admissões com o status `REVIEW`
- [x] O botão `Revisar novamente` só deve aparecer em admissões com o status `REPROVED` ou `APPROVED`
- [x] Implementar um loading na tela ao realizar requisições.
- [x] Todas as ações devem ter modal de confirmação e uma notificação de sucesso ou erro
- [x] Na pesquisa por CPF realizar a requisição automaticamente ao preencher um CPF válido
- [x] Adicionar máscara de CPF no campo de pesquisa.
- [x] Atualizar os dados (refetch) ao clicar no ícone de atualizar

### Tela Cadastro

- [x] Implementar validação no campo de `email` para que aceite apenas emails válidos
- [x] Implementar validação no campo `nome completo` para que aceite pelo menos um espaço, no mínimo duas letras, e que a primeira letra não seja um número.
- [x] Implementar validação no campo CPF para aceitar apenas CPFs válidos e adicionar uma máscara de CPF ao campo.
- [x] Implementar `POST` ao preencher todos os campos corretamentes.
- [x] Redirecionar ao `/dashboard` ao criar uma nova admissão.

## Extras (obrigatório)

- [x] Testes Unitários e de Integração `(Obrigátorio para Senior e Tech Lead)`
- [x] End-to-End (E2E)
- [x] Configuração de CI/CD com deploy automatizado


