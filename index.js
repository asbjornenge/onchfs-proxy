import onchfs from "./onchfs.js"
import express from "express"
import {
  RPCS,
  BLOCKCHAIN
} from './config.js'

const app = express()

const resolver = onchfs.resolver.create([
  {
    blockchain: BLOCKCHAIN, 
    rpcs: RPCS 
  },
])

app.use(async (req, res, next) => {
  console.log(req.path)
  const response = await resolver(req.path)
  return res
    .header(response.headers)
    .status(response.status)
    .send(Buffer.from(response.content))
})

app.listen(4000)
