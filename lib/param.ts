import { Context } from "koa"

export function parseTokenEndpoint(ctx: Context) {
  // Params
  const params = ctx.params

  if (!params.id) {
    ctx.throw(400, { error: "ID parameter is required" })
  }

  // Request body
  const body = ctx.request.body

  if (!body) {
    ctx.throw(400, { error: "Request body is required" })
  }

  if (!body.token) {
    ctx.throw(400, { error: "Token is required" })
  }

  return {
    id: params.id,
    token: body.token
  }
}

export function parseNotifyEndpoint(ctx: Context) {
  // Params
  const params = ctx.params

  if (!params.id) {
    ctx.throw(400, { error: "ID parameter is required" })
  }

  // Request body
  const body = ctx.request.body

  if (!body) {
    ctx.throw(400, { error: "Request body is required" })
  }

  if (!body.message) {
    ctx.throw(400, { error: "Message is required" })
  }

  return {
    id: params.id,
    token: body.message
  }
}
