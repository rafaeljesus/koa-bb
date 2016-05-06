import knex from 'knex'

import file from './knexfile'

const env = process.env.NODE_ENV || 'development'

export default knex(file[env])
