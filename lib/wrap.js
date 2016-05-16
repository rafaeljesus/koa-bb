import User from '../api/users/model'
import { signToken } from './auth'

export const reply = (fn, ...args) => {
  return async (ctx) => {
    const isPost = ctx.method === 'POST'

    try {
      ctx.body = await fn.apply(ctx, [ctx, ...args])
      ctx.status = isPost ? 201 : 200
    } catch (err) {
      const code = isPost ? 422 : 412
      ctx.throw(code, err)
    }
  }
}
export const token = (fn) => {
  return async (ctx, next) => {
    try {
      const user = await fn.apply(ctx, [ctx, next])
      if (!user) return ctx.throw(401)

      const passwordMatch = user.tryPassword(ctx.request.body.password)
      if (!passwordMatch) return ctx.throw(401)

      ctx.body = { token: signToken(user.toJSON()) }
    } catch (err) {
      ctx.throw(401)
    }
  }
}
