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

  if (!body.body) {
    ctx.throw(400, { error: "Body is required" })
  }

  if (!body.data) {
    ctx.throw(400, { error: "Data is required" })
  }

  return {
    id: params.id,
    body: body.body,
    data: body.data
  }
}
