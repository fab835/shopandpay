## 1. About project
### 1.1 Objective
The objective with this project is demonstrate tecnical abilities with coding write, project structure and TDD. The project structure is based in clean architeture and SOLID design, with layers to segregate use cases to external and other services communications, and each class with one function.

### 1.2 Resume
It's an API to transfer values between user and store, the transfer can be refunded.


## 2. Execute application with Docker

- On shell execute: 
```bash
$ docker-compose up -d
``` 

- If is the first start, you need to init database with first migration
Obs: this command automatic run seed database, if you don't want it, use --skip-seed flag
```bash
$ docker-compose exec server npm run db_migrate:dev
```
or
```bash
$ docker-compose exec server npx run db_migrate:dev --skip-seed
```

- manually seed:
```bash
$ docker-compose exec server db_seed:dev
```
