## GraphQL api (simpliest ever)

### As a main framework: [ExpressJS](https://www.npmjs.com/package/express/)

### As a db managing package: [Nano](https://www.npmjs.com/package/nano)

#### Also using [bitnami docker image](https://github.com/bitnami/bitnami-docker-couchdb) to run db

<hr>

### First of all you need to clone the repo

by https:

```
git clone https://github.com/ajiways/testgraphqlapi.git
```

or ssh:

```
git clone git@github.com:ajiways/testgraphqlapi.git
```

### Then you have to run db:

```
docker-compose up
```

### When it's loaded, run this command to run the application :

```
npm ci && npx tsc && node dist/main.js
```

<hr>

### P.S:

#### You can cnahge env variables in .env file if needs.

#### To change db password you need to change it in docker-compose.yml and then change it in .env file (they should be the same)
