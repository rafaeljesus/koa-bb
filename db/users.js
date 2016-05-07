import { hash, compareSync } from 'bcrypt'

import knex from './'

const users = knex('users')

const hashAsync = (password) => {
  return new Promise((resolve, reject) => {
    hash(password, 8, (err, hash) => err
      ? reject(err)
      : resolve(hash))
  })
}

export const findByEmail = (email) =>
  users.where('email', email)

export const findById = (id) =>
  users.where('id', id).first()

export const create = async (data) => {
  data.created_at = new Date()
  data.password = await hashAsync(data.password)
  return users.insert(data)
}

export const tryPassword = (password, condidate) =>
  compareSync(candidate, password)

