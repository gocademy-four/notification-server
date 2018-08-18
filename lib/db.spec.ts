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

  context("memberId: 2 has token: bba, bbb", () => {
    before(async () => {
      await dbHandler.insertToken(2, "bba")
      await dbHandler.insertToken(2, "bbb")
    })

    it("can get token bba", async () => {
      expect(await dbHandler.getTokens(2)).to.deep.equal(["bbb"])
    })

    it("can delete token bbb", async () => {
      await dbHandler.deleteToken(2, "bba")
    })
  })
})
