import Router from 'koa-router'

import { findByEmail, tryPassword } from '../db/users'
import { signToken } from '../lib/auth'

const router = Router()

export default router

router.post('/v1/token', async (ctx) => {
  const body = ctx.request.body

  if (!body.email || !body.password) {
    return ctx.throw(401)
  }

  try {
    const user = await findByEmail(body.email)

    if (!user) return ctx.throw(401)

    const match = tryPassword(user.password, body.password)
    if (match) {
      return ctx.body = {
        token: signToken(user)
      }
    }

    ctx.throw(401)
  }
  catch (err) {
    ctx.throw(401)
  }
})

.post('/v1/token/refresh', async (ctx) => {
  const token = ctx.request.body.token

  try {
    const payload = jwt.decode(token, API_SECRET)
    const user = await findById(payload.id)

    if (!user) return ctx.throw(401)

    const match = tryPassword(user.password, payload.password)
    if (match) {
      return ctx.body = {
        token: signToken(user)
      }
    }

  } catch (err) {
    ctx.throw(401)
  }
})
