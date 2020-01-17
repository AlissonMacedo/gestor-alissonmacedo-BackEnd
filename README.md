[Dev. Back-End]

- Link da pagina: https://www.notion.so/Dev-Back-End-04cfd92927a045f6914ab1e2c9002c02

Sua tarefa é construir uma API e banco de dados para a aplicação VUTTR (Very Useful Tools to Remember). A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags. Utilize um repositório Git (público, de preferência) para versionamento e disponibilização do código.

A aplicação pode ser construída utilizando qualquer linguagem, banco de dados, frameworks, libraries e ferramentas de sua preferência (Ex: Node + Express + Mongoose + MongoDB, PHP + Lumen + RedBean + PostgreSQL, etc). Apesar disso, a stack mais comum para squads aqui na BossaBox é **Node.js,** seguida por **PHP. Ruby** é incomum, mas aparece em raros casos.

A API deverá ser documentada utilizando o formato [API Blueprint](https://apiblueprint.org/) ou [Swagger](https://swagger.io/docs/specification/basic-structure/).

## O que será avaliado

Queremos avaliar sua capacidade de desenvolver e documentar um back-end para uma aplicação. Serão avaliados:

- Código bem escrito e limpo;
- Quais ferramentas foram usadas, como e porquê, além do seu conhecimento das mesmas;
- Seu conhecimento em banco de dados, requisições HTTP, APIs REST, etc;
- Sua capacidade de se comprometer com o que foi fornecido;
- Sua capacidade de documentação da sua parte da aplicação.

## O mínimo necessário

- Uma aplicação contendo uma API real simples, sem autenticação, que atenda os requisitos descritos abaixo, fazendo requisições à um banco de dados para persistência;
- README.md contendo informações básicas do projeto e como executá-lo;
- [API Blueprint](https://apiblueprint.org/) ou [Swagger](https://swagger.io/docs/specification/basic-structure/) da aplicação.

## Bônus

Os seguintes itens não são obrigatórios, mas darão mais valor ao seu trabalho (os em negrito são mais significativos para nós, se destacando como características para se tornar **Tech Lead** em squads)

- Uso de ferramentas externas que facilitem o seu trabalho;
- Cuidados especiais com otimização, padrões, entre outros;
- Migrations ou script para configuração do banco de dados utilizado;
- **Testes**;
- **Conteinerização da aplicação**;
- **Autenticação e autorização** (**OAuth, JWT**);
- **Pipelines de CI/CD (GitLab, CircleCI, TravisCI, etc);**
- **Deploy em ambientes reais, utilizando serviços de cloud externos (AWS, Heroku, GCP, etc);**
- Sugestões sobre o challenge embasadas em alguma argumentação.

# Desafio Bossa Box. Conceitos do NodeJS

Criada uma aplicação em NODE com express, para armazenar ferramentas.

## Testes.

- Por que testar?

  - Garantir que tudo vai continuar funcionando.
  - Projeto pequeno se torna um projeto grande.

- Tipos de Testes

  - Teste unitarios

    - Testam uma função minima, não realiza efeitos colaterais.

  - Teste de integração

    - Os pricipais testes do back-end, testam functionabilidades complestas como acesso
      às rotas até o retorno do controller.

  - Teste E2E
    - teste de interface que simulam o acesso do usuário.

## Rotas

# Usuário

- [x] - `POST /projects`: A rota deve receber `id` e `title` dentro corpo de cadastrar um novo projeto dentro de um array no seguinte formato: `{ id: "1", title: 'Novo projeto', tasks: [] }`; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com àspas duplas.
    ![Desafio 01.]

- [x] - `GET /projects`: Rota que lista todos projetos e suas tarefas;
    ![Desafio 01.]

- [x] - `PUT /projects/:id`: A rota deve alterar apenas o título do projeto com o `id` presente nos parâmetros da rota;
    ![Desafio 01.]

- [x] - `DELETE /projects/:id`: A rota deve deletar o projeto com o `id` presente nos parâmetros da rota;
    ![Desafio 01.]

- [x] - `POST /projects/:id/tasks`: A rota deve receber um campo `title` e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do `id` presente nos parâmetros da rota;

## Middlewares

- [x] - Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;

* [x] - Crie um middleware global chamado em todas requisições que imprime (`console.log`) uma contagem de quantas requisições foram feitas na aplicação até então;

“Sua única limitação é você mesmo”!

## Para usar

Instalar dependências

```sh
yarn
```

Rodar o projeto

```sh
yarn dev
```

URL

```sh
http://localhost:3000/
```
