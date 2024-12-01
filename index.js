const onchfs = require("onchfs").default
const express = require("express")

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
  console.log(req.path)
  const response = await resolver(req.path)
  console.log(response)
  // response can be used as is for http
  return res
    .header(response.headers)
    .status(response.status)
    .send(Buffer.from(response.content))
})

app.listen(4000)
