import test from 'ava'
import supertest from 'supertest-as-promised'

import knex from '../../db'
import { create } from '../../db/users'
import app from '../../server'

const request = supertest(app.listen())

test.beforeEach(async () => {
  await knex.migrate.rollback()
  await knex.migrate.latest()
  await knex.seed.run()
})

test.afterEach(async () => {
  await knex.migrate.rollback()
})

test.serial('should generate api token', async (t) => {
  const email = 'foo@mail.com'
  const password = '12345678'

  const { body } = await request
  .post('/v1/token')
  .send({ email, password })
  .expect(200)

  t.truthy(body.token)
})
