# twidev-backend
API do projeto Twidev desenvolvida com NodeJS.

## Instalar dependências

```
## instalar dependências do projeto
yarn install
```

## :rocket: Dependências utilizadas

- express
- axios
- socket.io
- mongoose
- ...

## Variáveis de ambiente

Renomeie o arquivo `.env.example` para `.env.dev` e coloque suas configurações do mongodb local e credenciais de seu aplicativo Oauth do Github.

## Executar em desenvolvimento

```
## executar o servidor na porta 3000
npm run dev
```

## :rocket: Endpoints

| METHOD   | endpoint   | Descrição                                 |
|----------|------------|-------------------------------------------|
|```GET``` |```/```     | Redirecionamento para versão atual da API.|
|```POST```|```/users```| Criar um novo recurso de usuário.         |
|```POST```|```/users/token/validate``` | Validar token de acesso    |
|```GET``` |```/users/signin/callback``` | Obter um token de acesso utilizando código Oauth Github. |
|```GET``` |```/users/github/oauth``` | Criar uma URL de redirecionamento Oauth. |
|```POST```|```/tweets``` | Criar um novo recurso de tweet. |
|```GET``` |```/tweets``` | Selecionar todos os tweets em ordem decrescente de data. |
|```PUT``` |```/tweets/{id}/like``` | Atualizar um tweet inserindo um novo like. |
|```PUT``` |```/tweets/{id}/dislike``` | Atualizar um tweet removendo um like existente. |

## Veja mais sobre cada endpoint testando com Insomnia.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Twidev&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fthalysonalexr%2Ftwidev-backend%2Fmaster%2Fdocs%2Finsomnia_2020_01_29.json)

Made with ♥ by [Thalyson Rodrigues](https://www.linkedin.com/in/thalysonrodrigues/)
