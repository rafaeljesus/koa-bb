import { hash, compareSync } from 'bcrypt'

import bookshelf from '../../db/bookshelf'

export default bookshelf.model('User', {
  tableName: 'users',

  initialize () {
    this.on('creating', this.onCreating)
  },

  async onCreating (model, attrs, options) {
    const hashedPassword = await hashAsync(model.get('password'))
    model.set('password', hashedPassword)
  },

  tryPassword (candidate) {
    return compareSync(candidate, this.get('password'))
  }
})

function hashAsync (password) {
  return new Promise((resolve, reject) => {
    hash(password, 8, (err, hash) => err
      ? reject(err)
      : resolve(hash))
  })
}
