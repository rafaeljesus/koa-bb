import jwt from 'jwt-simple'

import User from '../api/users/model'

const API_SECRET = process.env.API_SECRET || 'api-key-dev'

const getToken = (request) =>
  request.body && request.body.access_token ||
  request.query && request.query.access_token ||
  request.get('x-access-token')

export const signToken = (user) =>
  jwt.encode({
    id: user.id,
    email: user.email,
    password: user.password
  }, API_SECRET)

export const authenticate = async (ctx, next) => {
  try {
    const token = getToken(ctx.request)
    const payload = jwt.decode(token, API_SECRET)
    ctx.user = await User.findById(payload.id)
    if (!ctx.user) return ctx.throw(401)
    await next()
  } catch (err) {
    ctx.throw(401)
  }
}
