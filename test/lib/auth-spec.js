import test from 'ava'

import { signToken } from '../../lib/auth'

test('should encode token', (t) => {
  const token = signToken({
    id: 1,
    email: 'foo@gmail.com',
    password: '12345678'
  })
  t.not(token, undefined)
  t.not(token, null)
})
