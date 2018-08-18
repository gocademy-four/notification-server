import * as Koa from "koa"
import * as KoaBody from "koa-body"
import * as KoaRouter from "koa-router"
import { Expo, ExpoPushMessage } from "expo-server-sdk"

import { DatabaseHandler } from "./db"
import { parseTokenEndpoint, parseNotifyEndpoint } from "./param"

export function buildServer(dbHandler: DatabaseHandler) {
  const server = new Koa()
  const api = new KoaRouter()
  const expo = new Expo()

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

  api.post("/members/:id/notify", async ctx => {
    const params = parseNotifyEndpoint(ctx)
    const messages: ExpoPushMessage[] = []

    for (const token of await dbHandler.getTokens(params.id)) {
      if (!Expo.isExpoPushToken(token)) {
        messages.push({
          to: token,
          sound: "default",
          body: params.body,
          data: params.data
        })
      }
    }

    for (const chunk of expo.chunkPushNotifications(messages)) {
      await expo.sendPushNotificationsAsync(chunk)
    }

    ctx.body = {}
  })

  server.use(KoaBody())
  server.use(api.middleware())

  return server
}
