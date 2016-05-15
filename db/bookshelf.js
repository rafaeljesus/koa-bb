import bookshelf from 'bookshelf'
import ModelBase from 'bookshelf-modelbase'

import knex from './'

const db = bookshelf(knex)

db.plugin('registry')
db.plugin('visibility')
db.plugin('virtuals')

db.Model = ModelBase(db).extend()

export default db
