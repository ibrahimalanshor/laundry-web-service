# Taks Api

Api for taks

# Todo

- [x] Init (Readme, Git)
- [x] Setup (Server, Deps)
- [ ] Development & Unit Test
- [ ] Testing
- [ ] Deployment
- [ ] Maintainance

# Instalation

Install Deps

```bash
npm install
```

Install Linters

```bash
npm run prepare

# if pre-commit hooks is not executable
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

Copy `.env`

```bash
cp .env.sample .env
```

Run

```bash
# Dev
NODE_ENV=development npm run dev

# Prod
npm start
```
