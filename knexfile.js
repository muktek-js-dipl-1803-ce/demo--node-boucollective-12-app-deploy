// DATA ACCESS - knex configuration //
const devConfig = {
  client: 'pg',
  connection : {
    host: '127.0.0.1',
    port: '5432',
    user: 'dba_boucollective',
    password: 'passpass',
    database : 'boucollective'
  },

  migrations: {
    directory: './src/database/migrations'
  },

  seeds : {
    directory: './src/database/seeds'
  }

}

const productionConfig = Object.assign(
  {},
  devConfig,
  { connection: process.env.DATABASE_URL }
)



module.exports = process.env.NODE_ENV === 'production' ?
  productionConfig :
  devConfig

// module.exports = {
//   development: devConfig,
//   production: {}
// }
