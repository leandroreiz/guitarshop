# Guitar Shop e-Commerce Application

<!-- Section for your links, references, etc. --->

[//]: # 'References'
[logo]: ./frontend/public/images/logo.jpg
[shields-badge]: https://img.shields.io/badge/GuitarShop-v1.0-red?style=for-the-badge
[sample link with url]: https://your-external-link.com
[sample link with reference to a headline]: #project-title
[sample link to your file in project]: ./your-folder/your-file.txt
[license]: #
[sphinx]: https://www.sphinx-doc.org/en/master/
[mkdocs]: https://www.mkdocs.org/
[gitbook]: https://www.gitbook.com/
[bibtex-wikipedia]: https://en.wikipedia.org/wiki/BibTeX

![GuitarShop's logo][logo]

<!-- Your badges --->

[![shields.io badge][shields-badge]](https://github.com/leandroreiz/guitarshop)

<!-- One liner about your project --->

Full-stack e-Commerce application made with the purpose of applying everything I've been learning for the past months.

## Table of Contents

- [Guitar Shop](#project-title)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Documentation](#documentation)
    - [User Stories](#user-stories)
    - [Backend](#installation)
    - [Frontend](#installation)
    - [Refactoring Application State](#refactoring-application-state)
  - [Contribution](#contribution)
  - [Acknowledgement](#acknowledgement)
  - [License](#license)
  - [Citation](#citation)
  - [Contact](#contact)

## Introduction

The Guitar Shop e-Commerce Application was developed as a study case for MERN stack using TypeScript. My main goals were to learn TypeScript and how it works in the back and frontend and how to properly use types and OOP.

## Getting Started

### Prerequisites

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Redux Toolkit](https://redux-toolkit.js.org/usage/usage-with-typescript)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [TS-node](https://www.npmjs.com/package/ts-node)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Axios](https://axios-http.com/docs/intro)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) and add also [@types/bcryptjs](https://www.npmjs.com/package/@types/bcryptjs)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Express-async-handler](https://www.npmjs.com/package/express-async-handler)
- [Font Awesome](https://fontawesome.com/v5/docs/web/use-with/react)

### Installation

1. To start a new Create React App project with TypeScript, you can run:

```markdown
npx create-react-app my-app --template typescript
```

2. Don't assume that your team members know what to do! So include every little step.

3. Provide instructions for Linux, OSX, and Windows if possible.

```
Don't forget to include code snippets for easier understanding!
```

## Documentation

### User Stories

As a `customer`, I want to be able to...

- [ ] create an account
- [ ] log in to my account
- [ ] log out of my account
- [ ] see account details
- [ ] update account details
- [ ] search for products
- [ ] see product details
- [ ] add items to my cart
- [ ] remove items from my cart
- [ ] write a review for a product I bought

As an `admin`, I want to be able to...

- [ ] add new products
- [ ] edit existing products

### Backend

Backend documentation (API use)

### Frontend

Frontend documentation (Components, redux store, types, etc)

### Refactoring Application State

The state as it was developed by _Brad Traversy_ seemed quite messy and sloppy. It creates numerous instances with the same information and spreads sensitive information everywhere, including the user `token` on `localStorage` which is far from secure as can be seen [here](https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf). That being said I've decided to refactor the state and use React Toolkit, as this is the more modern way to deal with Redux ands it is also the recomended method on Redux official documentation.

Follow bellow a starter idea on how I pretend to deal with the state:

```js
// User State
user: {
  details: {
    _id: string,
    name: string,
    email: string,
    password: string,
    token: string,
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  register: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  login: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  get: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
}
```

```js
// Product State
product: {
  list: [
    {
      _id: string,
      name: string,
      email: string
    },
  ],
  create: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  get: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
}
```

Either write your documentation here or [provide a link to your extensive documentation website][documentation-link].

If you have a big code base and lots of things to document you should consider using a documentation tool like [Sphinx][sphinx], [Mkdocs][mkdocs], [Gitbook][gitbook] or any other documentation tool to generate static HTML-files which you then can host on a server.

## Contribution

Describe how your team members and contributors can contribute to this project. If you have specific style guideline which should be obeyed be sure to mention it here as well. Also, include a link to your issues tracker if you have one e.g. [github.com/project/issues][issue-tracker]

## Acknowledgement

Now that you have included yourself, your contributors and/or team members above also make sure to list some further inspirational resources and references for your project:

- [Some nice article you have read](#)
- [An awesome GitHub repository that you have made use of](#)
- [A StackOverflow question that has helped you out](#)

## License

Feel free to do with the project whatever you want and if you find something useful, please make sure to share it with your friends, family, colleagues, pets, etc.

## Citation

If you want to cite this project:

```
@app{GuitarShop,
  author = {Reis, Leandro},
  title = {Guitar Shop e-Commerce Application},
  address = {Dublin},
  year = {2022},
}
```

## Contact

You can reach out to me under <leandro.reiz@gmail.com>.
