import test from 'ava'
import supertest from 'supertest-as-promised'

import knex from '../../db'
import { create } from '../../db/users'
import app from '../../server'

const request = supertest(app.listen())

test('should generate api token', async (t) => {
  const email = 'foo@gmail.com'
  const password = '12345678'
  const user = await create({
    email,
    password
  })

  const { body } = await request
  .post('/v1/token')
  .send({ email, password })
  .expect(200)

  t.truthy(body.token)

  await knex('users').where('id', user.id).del()
})
