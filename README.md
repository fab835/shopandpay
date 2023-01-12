## 1. About project
### 1.1 Objective
The objective with this project is demonstrate tecnical abilities with coding write, project structure and TDD. The project structure is based in clean architeture and SOLID design, with layers to segregate use cases to external and other services communications, and each class with one function.

### 1.2 Resume
It's an API to transfer values between user and store, the transfer can be refunded.

### 1.3 Stack
Node.js with Prisma ORM, PostgreSql

### 1.4 Features
We can signup and login as user, create store, transfer values to store and refund transfer if necessary. Before create transfer, a call is made to an external service and After that email and sms will be sent using external service too. The external services is just a mock.

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
| Routes        | Function      | Status        | Need authentication |
| ------------- | ------------- | ------------- | ------------- |
| /users/new [POST]    | register user  |  done    | no |
| /users/login [POST]  | login user  | done  | no |
| /users/edit [PUT]    | edit user  | in_work  | yes |
| /users/show [GET]    | details of logged user  | in_work  | yes |
| /transfers/new [POST]  | Create trasnsfer  | done  | yes |
| /transfers/ [GET]  | list transfers  | in_work  | yes |
| /transfers/[:transfer_id] [GET]  | get transfer details  | in_work  | yes |
| /store/new [POST]  | create store  | in_work  | yes |
| /store/show/[:store_id] [GET]  | create store  | in_work  | yes |
| /store/edit/[:store_id] [PUT]  | create store  | in_work  | yes |
| /store/edit/[:store_id]/transfers [GET]  | List store received transfers | in_work  | yes |
| /transfers/[:store_id]/transfers/[:transfer_id]/refund [PUT]  | refund transfer  | in_work  | yes |


## 4. Authentication
After sign_up and sign_in, the response headers will contain token, client and uid for the session. Save these three parameters and send them in the header of all authenticated requests. For every login, one diferente client and token will be generated.
