import test from 'ava'
import jwt from 'jwt-simple'
import supertest from 'supertest-as-promised'

import User from '../../api/users/model'
import { signToken } from '../../lib/auth'
import app from '../../server'

const request = supertest(app.listen())
const assign = Object.assign

test('should generate api token', async (t) => {
  const email = 'e@mail.com'
  const password = '12345678'
  const user = await User.create({ email, password })

  const { body } = await request
  .post('/v1/token')
  .send({ email, password })
  .expect(200)

  t.truthy(body.token)

  await User.destroy({ id: user.id })
})

test('should refresh api token', async (t) => {
  const email = 'd@mail.com'
  const password = '12345678'
  const user = await User.create({ email, password })
  const token = signToken(assign(user.toJSON(), { password }))

  const { body } = await request
  .post('/v1/token/refresh')
  .send({ token })
  .expect(200)

  t.falsy(body.token === token)

  await User.destroy({ id: user.id })
})
