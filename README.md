## 1. About project
### 1.1 Objective
The objective with this project is demonstrate tecnical abilities with coding write, project structure and TDD. The project structure is based in clean architeture and SOLID design, with layers to segregate use cases to external and other services communications, and each class with one function.

### 1.2 Resume
It's an API to transfer values between user and store, the transfer can be refunded.

### 1.3 Stack
Node.js with Prisma ORM, PostgreSql

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
$ docker-compose exec server npm run db_migrate:dev --skip-seed
```

- manually seed:
```bash
$ docker-compose exec server npm run db_seed:dev
```


## 3. Routes workflow
| Routes        | Function      | status        |
| ------------- | ------------- | ------------- |
| /users/new [POST]    | register user  |  done    |
| /users/login [POST]  | login user  | in_work  |
| /users/edit [PUT]    | edit user  | in_work  |
| /users/show [GET]    | details of logged user  | in_work  |
| /transfers/new [POST]  | Create trasnsfer  | done  |
| /transfers/ [GET]  | list transfers  | in_work  |
| /transfers/[:transfer_id] [GET]  | get transfer details  | in_work  |
| /store/new [POST]  | create store  | in_work  |
| /store/show/[:store_id] [GET]  | create store  | in_work  |
| /store/edit/[:store_id] [PUT]  | create store  | in_work  |
| /store/edit/[:store_id]/transfers [GET]  | List store received transfers | in_work  |
| /transfers/[:store_id]/transfers/[:transfer_id]/refund [PUT]  | refund transfer  | in_work  |


