import Koa from 'koa'
import cors from 'kcors'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

import tokenAPI from './api/token/routes'
import userAPI from './api/users/routes'

const app = new Koa()

app.use(logger())
app.use(cors())
app.use(bodyParser())
app.use(tokenAPI.routes())
app.use(userAPI.routes())

export default app
