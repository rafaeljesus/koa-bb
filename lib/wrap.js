import User from '../api/users/model'
import { signToken } from './auth'

export const token = (fn) => {
  return async (ctx, next) => {
    try {
      const user = await fn.apply(ctx, [ctx, next])
      if (!user) return ctx.throw(401)

      const passwordMatch = user.tryPassword(ctx.request.body.password)
      if (!passwordMatch) return ctx.throw(401)

      ctx.body = { token: signToken(user) }
    } catch (err) {
      console.log(err)
      ctx.throw(401)
    }
  }
}
