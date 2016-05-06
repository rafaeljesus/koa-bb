import jwt from 'jwt-simple'

import User from '../db/users'

const API_SECRET = process.env.API_SECRET

export function signToken (id) {
  jwt.encode({ id }, API_SECRET)
}

export async function authenticate (ctx, next) {
  try {
    const token = ctx.request.body && ctx.request.body.access_token ||
      ctx.request.query && ctx.request.query.access_token ||
      ctx.request.get('x-access-token')

    const payload = jwt.decode(token, API_SECRET)
    ctx.user = await User.findById(payload.id)
    if (!ctx.user) return ctx.throw(401)
    await next()
  } catch (err) {
    ctx.throw(401)
  }
}
