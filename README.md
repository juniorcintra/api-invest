<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



## Descrição

Este projeto foi desenvolvido utilizando NestJS, Prisma, TypeScript e JWT para criar uma API robusta e segura. O banco de dados utilizado é PostgreSQL, hospedado em um serviço online gratuito, o [Neon](https://neon.tech/).

## Instalar as dependencias

```bash
$ npm install
```

## Compilar e rodar o projeto

Como o banco ta online, não é uma preocupação rodar o banco local, sem precisar de docker etc.. O projeto será rodado automaticamente na porta 3000.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Pra ter uma visão do banco, basta rodar o comando do prisma studio

```bash
$ npx prisma studio
```
