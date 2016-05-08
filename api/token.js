import Router from 'koa-router'

import { findByEmail, tryPassword } from '../db/users'
import { signToken } from '../lib/auth'

const router = Router()

export default router

router.post('/v1/token', wrap(async (ctx) => {
  const body = ctx.request.body

  if (!body.email || !body.password) {
    return ctx.throw(401)
  }

  return await findByEmail(body.email)
}))

.post('/v1/token/refresh', tryPassword(async (ctx) => {
  const token = ctx.request.body.token
  const payload = jwt.decode(token, API_SECRET)
  ctx.request.body = payload
  return await findById(payload.id)
}))

function wrap (fn) {
  return async (ctx, next) => {
    try {
      const user = await fn.apply(ctx, [ctx, next])
      if (!user) return ctx.throw(401)

      const passwordMatch = tryPassword(user.password, ctx.request.body.password)
      if (passwordMatch) {
        return ctx.body = {
          token: signToken(user)
        }
      }
      ctx.throw(401)
    } catch (err) {
      ctx.throw(401)
    }
  }
}

