# Money Tracker

## Backend API Server

Inorder to start the backer server perform the following steps after goind to `./api` directory in cli :

- Install all the node dependencies by running `npm install`
- Create `.env` file in `/api` directory and add the following :

```
PORT = 3000 // (or which ever port is free on you sys)
DB_SYNC = true
JWT_KEY = string_for_jwt_generation
```

- Inorder to setup the database:
  - Create `.config.json` file in `/api/src/config` directory and add the following :
  ```
  {
    "development": {
    "username": "<YOUR_DB_USERNAME>",
    "password": "<YOUR_DB_PASSWORD>",
    "database": "MONEY_TRACKER_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
    },
  }
  ```
  - Using CLI goto `/api/src/` directory and run : `npx sequelize db:create` to create the Database for the project
  - In the same directory `/api/src/` run : `npx sequelize db:migrate` to have the latest migration for DB schema.
- Finally in `/api/` i.e. root directory run `npm run start` to start the api server.

## Frontend Server

Not much need to setup, except goto `/frontend` directory of the repository and do following :

- Install all dependencies by running `npm install`
- Start the frontend server by running `npm run start`
