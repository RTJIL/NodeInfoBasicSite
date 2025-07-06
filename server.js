import http from "node:http"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const PORT = 4444

// two ways to get access to the file dir
/**1.NOde v 20<
 * const __path = fileURLToPath(import.meta.url)
 * const __dirname = path.dirname(__pathanme)
 *
 * in common JS __dirname => global var
 */
//2.
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
  try {
    let filePath = ""
    const publicDir = path.join(__dirname, "public")

    if (req.method === "GET") {
      res.setHeader("Content-Type", "text/html")
      res.statusCode = 200
      switch (req.url) {
        case "/":
          filePath = path.join(publicDir, "index.html")
          break
        case "/about":
          filePath = path.join(publicDir, "about.html")
          break
        case "/contact-me":
          filePath = path.join(publicDir, "contact-me.html")
          break
        default:
          filePath = path.join(publicDir, "404.html")
          res.statusCode = 404
      }
    } else {
      res.statusCode = 405
      res.setHeader("Content-Type", "text/plain")
      res.end("Method Not Allowed!")
      return
    }

    const data = await fs.readFile(filePath)
    res.end(data)
  } catch (err) {
    if (err.code === "ENOENT") {
      res.statusCode = 404
      res.end("File Not Found")
    } else {
      res.statusCode = 500
      res.end(`Server Error: ${err.code}`)
    }
  }
})

server.listen(PORT, () => {
  console.log("Server are running on port: ", PORT)
})

/** To serve css, images etc.
 * const filePath = path.join(
    publicDir,
    req.url === '/' ? 'index.html' : req.url
  )
    
 *const ext = path.extname(filePath)

  const contentType = getContentType(ext)
 * 
 * export function getContentType(ext) {

  const types = {
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml"
  }
  
  return types[ext.toLowerCase()] || "text/html"
}
 */
