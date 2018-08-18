import { expect } from "chai"

import { DatabaseHandler } from "./db"

describe("DatabaseHandler", () => {
  let dbHandler: DatabaseHandler

  before(() => {
    dbHandler = new DatabaseHandler()
  })

  after(async () => {
    await dbHandler.close()
  })

  it("can migrate tables", async () => {
    await dbHandler.migrate()
  })

  it("can insert tokens", async () => {
    await dbHandler.insertToken(1, "aaa")
    await dbHandler.insertToken(1, "aab")
    await dbHandler.insertToken(1, "aac")
  })

  context("memberId: 2 has token: bba", () => {
    before(async () => {
      await dbHandler.insertToken(2, "bba")
    })

    it("can get token", async () => {
      expect(await dbHandler.getTokens(2)).to.deep.equal(["bba"])
    })
  })

  context("memberId: 3 has token: cca", () => {
    before(async () => {
      await dbHandler.insertToken(3, "cca")
    })

    it("can delete token", async () => {
      await dbHandler.deleteToken(3, "cca")
    })
  })
})
