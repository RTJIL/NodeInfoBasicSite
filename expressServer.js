import express from "express"
import path from "node:path"
import fs from "node:fs/promises"

const app = express()

const __dirname = import.meta.dirname
const publicDir = path.join(__dirname, "public")

app.get("/", async (req, res) => {
  const filePath = path.join(publicDir, "index.html")
  const data = await fs.readFile(filePath)
  res.status(200).send(data)
})

app.get("/about", async (req, res) => {
  const filePath = path.join(publicDir, "about.html")
  const data = await fs.readFile(filePath)
  res.status(200).send(data)
})

app.get("/contact-me", async (req, res) => {
  const filePath = path.join(publicDir, "contact-me.html")
  const data = await fs.readFile(filePath)
  res.status(200).send(data)
})

app.use(async (req, res, next) => {
  try {
    const filePath = path.join(publicDir, "404.html")
    const data = await fs.readFile(filePath)
    res.status(404).send(data)
  } catch (err) {
    res.status(404).send("404 Not Found (fallback)")
  }
})

const PORT = 1234
app.listen(PORT, () => {
  console.log(`My first ex app on port: ${PORT}`)
})
