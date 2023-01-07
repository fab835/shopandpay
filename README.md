## 1. Execute application with Docker

- On shell execute: 
```bash
$ docker-compose up -d
``` 

- If is the first start, you need to init database with first migration
```bash
$ docker-compose exec server npx prisma migrate dev --name init
```