import onchfs from "./onchfs.js"
import express from "express"

const app = express()

// setup resolver
const resolver = onchfs.resolver.create([
  {
    blockchain: "tezos:ghostnet",
    rpcs: ["https://ghostnet.smartpy.io" /* ... */],
  },
  // ... more if desired
])

app.use(async (req, res, next) => {
  // resolve a URI
  const response = await resolver(req.path)
  // response can be used as is for http
  return res
    .header(response.headers)
    .status(response.status)
    .send(Buffer.from(response.content))
})

app.listen(4000)
