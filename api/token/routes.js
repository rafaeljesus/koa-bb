import Router from 'koa-router'

import User from '../../db/users'
import { signToken } from '../../lib/auth'

const router = Router()

export default router

router.post('/v1/token', async (ctx) => {
  const body = ctx.request.body
  const valid = body.email && body.password

  if (!valid) return ctx.throw(401)

  try {
    const user = await User.findByEmail(body.email)
    if (!user) return ctx.throw(401)

    ctx.body = { token: signToken(user._id) }
  } catch (err) {
    ctx.throw(401)
  }
})
