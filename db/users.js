import knex from './'

const users = knex('users')

export function findByEmail (email) {
  return users.where('email', email)
}
