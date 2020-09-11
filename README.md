<h1 align="center">
    <img alt="GoBarber" src="https://res.cloudinary.com/dgugs5dpz/image/upload/v1599830069/01063918-a04d-4c20-a02e-fba6f43968ff_ubsrui.jpg" width="250px" />
</h1>

<p align="center">🚀 Uma aplicação para realização de agendamentos em barbearias.</p>

<h1 align="center">

 ![align="center"](https://img.shields.io/github/issues/CampossCaio/GoMarketplace?color="ff9000")
 ![Badge](https://img.shields.io/github/forks/CampossCaio/GoMarketplace?color="ff9000")
 ![Badge](https://img.shields.io/github/stars/CampossCaio/GoMarketplace?color="ff9000") 
 
</h1>

<h4 align="center"> 
	🚧  GoBarber 🚀 Em construção  🚧
</h4>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar-o-projeto">Como executar o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-autor">Autor</a> 
</p>

## 💻 Sobre o projeto

:scissors::boy:  GoBarber - é uma aplicação divida em duas partes:

**Web**: Uma dashboard onde o prestador pode gerênciar seus agendamentos.

**Mobile**: Um apliativo onde o usuário pode encontrar os prestadores cadastrados na plataforma, verificar as disponibilidas de horarios e realizar agendamentos.

Projeto desenvolvido durante a jornada jornada GoStack 12, curso produzido pela [Rocketseat](https://blog.rocketseat.com.br).

O intuito de seu desenvolvimento é praticar os conhecimentos sobre [Node.JS](https://nodejs.org/en/), [React.JS](https://reactnative.dev/), [React Native](https://reactnative.dev/), entre outras tecnologias como o [Typescript](https://www.typescriptlang.org/),
e também praticar os diversos conceitos de paterns e boas práticas utilizando SOLID, DDD, TDD entre outros, adiquiridos durante a jornada.  

---

## 🎨 Layout


<a href="https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/Ecoleta?node-id=136%3A546">
  <img alt="GoBarber" src="https://res.cloudinary.com/dgugs5dpz/image/upload/v1599794038/gobarberweb_m3ncjd.gif">
</a>

## 🚀 Como executar o projeto

Este projeto é divido em três partes:
1. Backend (pasta backend) 
2. Frontend (pasta web)
3. mobile (pasta mobile)

💡 O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)
Ter um banco de dados sql, de preferência postgres.


#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/CampossCaio/GoBarber2.0.git

# Acesse a pasta do projeto no terminal/cmd
$ cd GoBarber

# Vá para a pasta server
$ cd backend

# Instale as dependências
$ npm install

# Execute o comando abaixo para executar as migrations
$ npx typeorm migration:run

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3333 - acesse http://localhost:3333 

```

---

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone https://github.com/CampossCaio/GoBarber2.0.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd GoBarber

# Vá para a pasta da aplicação Front End
$ cd web

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

#### 🧭 Rodando a aplicação mobile (Frontend)

```bash

# Clone este repositório
$ git clone https://github.com/CampossCaio/GoBarber2.0.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd GoBarber

# Vá para a pasta da aplicação Front End
$ cd mobile

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run android ou npm run ios


```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([React](https://reactjs.org/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
-   **[React Icons](https://react-icons.github.io/react-icons/)**
-   **[Axios](https://github.com/axios/axios)**

#### **Mobile**  ([React Native](https://reactnative.dev/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[React Navigation](https://reactnavigation.org/)**
-   **[React Icons](https://react-icons.github.io/react-icons/)**
-   **[Axios](https://github.com/axios/axios)**



#### **Server**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[Postgres](https://www.postgresql.org/)**
-   **[ts-node](https://github.com/TypeStrong/ts-node)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Multer](https://github.com/expressjs/multer)**
-   **[Celebrate](https://github.com/arb/celebrate)**
-   **[Joi](https://github.com/hapijs/joi)**



## 🦸 Autor

<a href="https://github.com/CampossCaio">
 <img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/52550525?s=400&u=c8dfc4e1c8ef1bf3ed5890ecc40ee98f086ca72b&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Caio Campos</b></sub></a> <a href="https://github.com/CampossCaio" title="Caio Campos">🚀</a>
 <br />

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com ❤️ por **Caio Campos** 👋🏻 [Get in touch!](https://github.com/CampossCaio)
