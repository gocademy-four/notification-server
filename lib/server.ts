import * as Koa from "koa"
import * as KoaBody from "koa-body"
import * as KoaRouter from "koa-router"
import { DatabaseHandler } from "./db"
import { parseTokenEndpoint } from "./param"

export function buildServer(dbHandler: DatabaseHandler) {
  const server = new Koa()
  const api = new KoaRouter()

  api.post("/members/:id/expo-push-token", async ctx => {
    const params = parseTokenEndpoint(ctx)

    await dbHandler.insertToken(params.id, params.token)
    ctx.body = {}
  })

  api.del("/members/:id/expo-push-token", async ctx => {
    const params = parseTokenEndpoint(ctx)

    await dbHandler.deleteToken(params.id, params.token)
    ctx.body = {}
  })

  api.post("/members/:id/notify", ctx => {
    // TODO
  })

  server.use(KoaBody())
  server.use(api.middleware())

  return server
}
