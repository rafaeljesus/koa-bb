import Router from 'koa-router'

import User from './model'
import { authenticate } from '../../lib/auth'
import { reply as wrap } from '../../lib/wrap'

const router = Router()

export default router

router.post('/v1/users', wrap(async ({ request: { body } }) =>
  await User.create(body)
))

.all('/v1/users', authenticate)

.get('/v1/users', wrap(async ({ user: { id } }) =>
  await User.findOne({ id })
))

.del('/v1/users/:id', wrap(async ({ params: { id } }) =>
  await User.delete({ id })
))
