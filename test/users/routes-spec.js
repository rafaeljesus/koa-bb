import test from 'ava'
import supertest from 'supertest-as-promised'

import User from '../../api/users/model'
import app from '../../server'

const request = supertest(app.listen())

test('should create user', async (t) => {
  const email = 'a@mail.com'
  const password = '12345678'

  const { body } = await request
  .post('/v1/users')
  .send({ email, password })
  .expect(201)

  await User.destroy({ id: body.id })
})

test('should not create user with empty password', async (t) => {
  const email = 'b@mail.com'
  const { error } = await request
  .post('/v1/users')
  .send({ email })
  .expect(422)
})

test('should not create user with empty email', async (t) => {
  const password = '12345678'
  const { error } = await request
  .post('/v1/users')
  .send({ password })
  .expect(422)
})
