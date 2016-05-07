module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/koabb_development',
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: 'migrations'
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    }
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/koabb_test',
    migrations: {
      directory: `${__dirname}/migrations`,
      tableName: 'migrations'
    }
  },
  staging: {
    client: 'pg',
    connection: 'postgres://localhost/koabb_staging',
    ssl: true,
    migrations: {
      directory: `${__dirname}/migrations`
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      directory: `${__dirname}/migrations`
    }
  }
}
