# Charles' and Shih-Hao's Part IV Project

![example workflow](https://github.com/cpat430/P4P-whooops/actions/workflows/ci.yml/badge.svg)

## Getting Started

Clone the repository

```sh
git clone https://github.com/cpat430/P4P-whooops.git
```

Install dependencies

```sh
yarn --cwd frontend
yarn --cwd backend
```

In one terminal, run the backend server. The server will be running on `localhost:4000`

```sh
cd backend && yarn dev
```

In a separate terminal, run the frontend application. The application will be running on `localhost:3000`

```sh
cd frontend && yarn start
```

## Environment

You will need the following variables for the application to run!

`frontend/.env`

```txt
REACT_APP_MAP_KEY=
```

`backend/.env`

```txt
MONGODB_USERNAME=
MONGODB_PASSWORD=
```
