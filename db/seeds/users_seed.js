const hash = require('bcrypt').hash

const hashAsync = (password) => {
  return new Promise((resolve, reject) => {
    hash(password, 8, (err, hash) => err
      ? reject(err)
      : resolve(hash))
  })
}

exports.seed = function (knex, Promise) {
  return hashAsync('12345678')
  .then((password) => {
    return Promise.join(
      knex('users').del(),
      knex('users').insert({ id: 1, email: 'foo@mail.com', password })
    )
  })
}
