import { buildServer } from "./server"
import { DatabaseHandler } from "./db"

const PORT = process.env.PORT || 3000

// Server objects
const dbHandler = new DatabaseHandler()
const server = buildServer(dbHandler)

console.log("Server is migrating schema")

dbHandler.migrate().then(() => {
  console.log(`Server is listening at ${PORT}`)
  server.listen(PORT)
})
