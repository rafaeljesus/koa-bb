export default {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
      tableName: 'migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      directory: './migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      directory: './migrations'
    }
  }
}
