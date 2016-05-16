import Router from 'koa-router'
import jwt from 'jwt-simple'

import User from '../users/model'
import { token as wrap } from '../../lib/wrap'

const router = Router()
const API_SECRET = process.env.API_SECRET

export default router

router.post('/v1/token', wrap(async (ctx) => {
  const body = ctx.request.body
  const email = body.email
  const invalid = !email || !body.password

  if (invalid) return ctx.throw(401)

  return await User.findOne({ email })
}))

.post('/v1/token/refresh', wrap(async (ctx) => {
  const token = ctx.request.body.token
  const payload = jwt.decode(token, API_SECRET)
  ctx.request.body = payload

  return await User.findOne({ id: payload.id })
}))
