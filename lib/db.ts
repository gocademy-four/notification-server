import { Client } from "pg"

export class DatabaseHandler {
  private client: Client

  constructor() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    })

    this.client.connect()
  }

  async migrate() {
    await this.client.query(
      "CREATE TABLE IF NOT EXISTS MemberToken (" +
        "id integer PRIMARY KEY," +
        "token varchar(255)" +
        ")"
    )
  }

  async getTokens(memberId: number) {
    const result = await this.client.query(
      "SELECT token FROM MemberToken WHERE id = $1",
      [memberId]
    )

    return result.rows.map(row => row["token"])
  }

  async insertToken(memberId: number, token: string) {
    await this.client.query(
      "INSERT INTO MemberToken(id, token) VALUES ($1, $2)",
      [memberId, token]
    )
  }

  async deleteToken(memberId: number, token: string) {
    await this.client.query(
      "DELETE FROM MemberToken WHERE id = $1 AND token = $2",
      [memberId, token]
    )
  }
}
