
# Caju Front End Teste
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

## Dicas e sugestões

- Faça bom uso da componentização
- Garanta que a aplicação é performática
- Faça bom uso do HTML e WAI-ARIA
- Garanta uma experiência fluida e acessível
- Utilize conceitos (SOLID, DRY, KISS, Clean code) e design patterns
- Crie testes coesos e que garantam o bom funcionamento da aplicação

### Sua performance será avaliada com base nos seguintes pontos:

- A aplicação funciona conforme o esperado seguindo todas as especificações
- O código é claro e de fácil entendimento
- Conhecimento em HTML, CSS, JavaScript / TypeScript e React
- Experiência do usuário
- Arquitetura (conceitos, patterns, algoritmos, forma como os problemas foram solucionados)
- Boas práticas de desenvolvimento
- Proeficiência com automação de testes. Não exigimos 100% de cobertura
- Senso crítico e analítico

