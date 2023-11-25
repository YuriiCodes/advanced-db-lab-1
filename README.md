# advanced-db-lab-2
A lab for the advanced database course where we measure the performance of an SQL and NoSQL database.

For measuring performance, 1000 records are created, read, updated and deleted from the database.


## How to Use
Install dependencies:
```zsh
npm install
```

Spin up the PostgreSQL database:
```zsh
docker-compose up -d
```
Initialize DB schema:

```zsh
npx prisma migrate dev --name init
```


Then go to the [MongoDB atlas](https://www.mongodb.com/cloud/atlas), set up the cluster there and paste the mongo connection string to the .env file. You can see the example at the `.env.example` file.

## Benchmarking the DBs
### PostgreSQL

```zsh
ts-node ./prisma/benchmarks/create.ts
```

```zsh
ts-node ./prisma/benchmarks/read.ts
```

```zsh
ts-node ./prisma/benchmarks/update.ts
```

```zsh
ts-node ./prisma/benchmarks/delete.ts
```


### MongoDB (You have to create ATLAS cluster and add the connection string to the .env file)
```zsh
node mongo/create.js
```

```zsh
node mongo/read.js
```

```zsh
node mongo/update.js
```

```zsh
node mongo/delete.js
```

