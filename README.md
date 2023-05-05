# Full-stack skeleton

TypeScript, React, Node.js and Sequelize skeleton for full-stack projects. Implements user authorization with jsonwebtoken, example database, example tests, dockerization and CI/CD with GitHub Actions.

## Run Locally

Clone the project

```bash
  git clone https://github.com/tommiri/full-stack-skeleton.git
```

Go to the project directory

```bash
  cd full-stack-skeleton
```

Install backend dependencies

```bash
  cd backend && npm install
```

Install frontend dependencies

```bash
  cd ../frontend && npm install
```

Start up the database container

```bash
  cd ../ && docker compose up -d
```

Start developing your app!
