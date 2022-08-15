# Guitar Shop e-Commerce Application

[//]: # 'References'
[logo]: ./frontend/public/images/logo.jpg
[shields-badge]: https://img.shields.io/badge/GuitarShop-v1.0-red?style=for-the-badge
[backendfs]: ./frontend/public/images/backend_fs.png
[frontendfs]: ./frontend/public/images/frontend_fs.png

![GuitarShop's logo][logo]

[![shields.io badge][shields-badge]](https://github.com/leandroreiz/guitarshop)

Full-stack e-Commerce application made as the final project for [CS50's](https://www.edx.org/course/introduction-computer-science-harvardx-cs50x?g_acctid=724-505-4034&g_campaign=gs-b2c-nonbrand-tier1geo-partner-harvard-core&g_campaignid=15417765031&g_adgroupid=131210224478&g_adid=588991333656&g_keyword=cs50&g_keywordid=kwd-296840910&g_network=g&utm_source=google&utm_campaign=gs-b2c-nonbrand-tier1geo-partner-harvard-core&utm_medium=cpc&utm_term=cs50&hsa_acc=7245054034&hsa_cam=15417765031&hsa_grp=131210224478&hsa_ad=588991333656&hsa_src=g&hsa_tgt=kwd-296840910&hsa_kw=cs50&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gclid=Cj0KCQjwuuKXBhCRARIsAC-gM0hseeExH3SBKLKOAEpMztyWJYYiV6JBVH64R_Xq90-ZA9NO5IpcNNYaAhx2EALw_wcB) Harvard course.

## Video demo

As requested by the CS50's team, follow my short video presenting the project.

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
      - [API documentation](#api-documentation)
    - [Frontend](#installation)
    - [Bugs and Enhancements](#bugs-and-enhancements)
    - [Refactoring Application State](#refactoring-application-state)
  - [Contribution](#contribution)
  - [Acknowledgement](#acknowledgement)
  - [License](#license)
  - [Citation](#citation)
  - [Contact](#contact)

## Introduction

The Guitar Shop e-Commerce Application was developed as the final project for CS50's Harvard course. It was made using MongoDB, Express, React and Node (MERN stack) and the primary language used was TypeScript for solid typing. My main goal was to learn TypeScript and how it works in the back and frontend.

The website design was inspired by Brad Traversy's Pro Shop, an online shop for electronic gadgets.

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

## Documentation

### User Stories

As a `customer`, I want to be able to...

- [x] create an account
- [x] log in to my account
- [x] log out of my account
- [x] see account details
- [x] update account details
- [ ] search for products
- [x] see product details
- [x] add items to my cart
- [x] remove items from my cart
- [x] complete a payment
- [x] see details of my orders
- [ ] write a review for a product I bought

As an `admin`, I want to be able to...

- [ ] add new products
- [ ] edit existing products

### Backend

Backend folder's structure:

![Backend folder's structure][backendfs]

#### API documentation

[Complete Backend Documentation (API use)](https://documenter.getpostman.com/view/20490992/VUjSGjBd)

### Frontend

Frontend folder's structure:

![Frontend folder's structure][frontendfs]

`Will add more information regarding custom Components.`

### Bugs and Enhancements

You can find the issues tracker for this application clicking [here](https://github.com/leandroreiz/guitarshop/issues).

### Refactoring Application State

The state as it was developed by _Brad Traversy_ seemed quite messy and sloppy. It creates numerous instances with the same information and spreads sensitive information everywhere, including the user `token` on `localStorage` which is far from secure as can be seen [here](https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf). That being said I've decided to refactor the state and use React Toolkit, as this is the more modern way to deal with Redux ands it is also the recomended method on Redux official documentation.

Follow bellow a starter idea on how I pretend to deal with the state:

```js
// User State
user: {
  list: User[],
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
  create: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  update: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  orders: {
    list: Order[],
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  reviews: {
    list: Review[],
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  auth: {
    isAuthenticated: boolean,
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
}
```

```js
// Product State
product: {
  list: Product[],
  details: {
    _id: string,
    name: string,
    image: string,
    brand: string,
    category: string,
    description: string,
    rating: number,
    numReviews: number,
    price: number,
    countInStock: number,
    user: ObjectId(User),
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  create: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  update: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  reviews: {
    list: Review[],
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
}
```

```js
// Order State
order: {
  list: Order[],
  details: {
    _id: string,
    (etc...)
  },
  create: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },
  update: {
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
  },

}
```

## Contribution

I, Leandro Fernandes Reis, was the only person involved in the developement of this project.

## Acknowledgement

Follow below some further inspirational resources and references for this project:

- [MERN E-Commerce from scratch by Brad Traversy](https://www.udemy.com/course/mern-ecommerce/), this was the design inspiration and idea for the website. In this course Brad develops a e-Commerce application using JavaScript with MERN stack and Redux for state management. I used TypeScript and RTK for everything while also working the design of the pages with some personal touches.
- [TypeScript official documentation](https://www.typescriptlang.org/). As I am just starting with TypeScript their documentation was really good on checking the ins and outs of the language.
- [Redux official documentation](https://redux.js.org/), as previously mentioned Brad used Redux to manage the state, but I've decided to use RTK with TypeScript according to recommendations found in the Redux documentatio.
- [Redux Toolkit documentation](https://redux-toolkit.js.org/) was the most essential part of this project. Without this documentation I would go nowhere. I read every single line of this document and still coming back to it now and then.

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
