
# Deploy instructions

1) Create Heroku Account
  - https://signup.heroku.com/dc

2) Install Heroku CLI
  - https://devcenter.heroku.com/articles/heroku-cli#download-and-install

3) Create Heroku App in Terminal
 ```
 heroku create «your app name»
 check `heroku -v`
 ```

4) Create Postgres database for app on Heroku (and Database URL)

 ```sh
 heroku addons:create heroku-postgresql:hobby-dev
 ```

5) Deploy Heroku App

  ```sh
  git push heroku master
  ```

6) Additional Steps

  - in `knexfile.js` (create production db connection object)
  ```js
  // ...
  const productionConfig = Object.assign(
    {},
    devConfig,
    { connection: process.env.DATABASE_URL }
  )

  module.exports = process.env.NODE_ENV === 'production' ? productionConfig : devConfig
  ```

  - in `server.js`
  ```js
  const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000
  //....
  const appDb = knex( dbConfigObj )
  ```

7) Migrations + Seeds
  ```    
  heroku run knex migrate:latest
  heroku run knex seed:run
  ```

8) Configure deploy script to minify the react / es6 code
  ```
  "scripts" : {
    ...
    "deploy:build": "NODE_ENV=production ./node_modules/.bin/webpack",
    "deploy:commit-production": "git add . && git commit -m 'production build'",
    "deploy:push-remote": "git push heroku master",
    "deploy": "npm-run-all deploy:build dep loy:commit-production deploy:push-remote",
    ...
  }
  ```
