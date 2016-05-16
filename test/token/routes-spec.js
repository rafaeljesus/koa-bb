import test from 'ava'
import supertest from 'supertest-as-promised'

import User from '../../api/users/model'
import app from '../../server'

const request = supertest(app.listen())

test('should generate api token', async (t) => {
  const email = 'foo@mail.com'
  const password = '12345678'
  const user = await User.create({ email, password })

  const { body } = await request
  .post('/v1/token')
  .send({ email, password })
  .expect(200)

  t.truthy(body.token)

  await User.destroy({ id: user.id })
})
