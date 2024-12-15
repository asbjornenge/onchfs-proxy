import express from 'express'
import { promises as dns } from 'dns'
import {
  RPCS,
  HTTP_PORT,
  BLOCKCHAIN
} from './config.js'
import onchfs from './onchfs.js'

const app = express()
const resolver = onchfs.resolver.create([
  {
    blockchain: BLOCKCHAIN, 
    rpcs: RPCS 
  },
])
dns.setServers(['8.8.8.8'])

app.use(async (req, res, next) => {
  console.log(req.path)
  let path = req.path
  if (req.path.indexOf('/@') === 0) {
    try {
      const domain = req.path.slice(2).split('/')[0]
      const dhash = await dns.resolve(`_onchfs.${domain}`, 'TXT')
      path = path.replace(`@${domain}`, dhash[0][0].split('onchfs://')[1])
    } catch(e) {
      console.log(e)
      return res.status(404).send('DNS resolution failed')
    }
  }  
  console.log(path)
  const response = await resolver(path)
  return res
    .header(response.headers)
    .status(response.status)
    .send(Buffer.from(response.content))
})

app.listen(HTTP_PORT, () => {
  console.log(`Listening to ${HTTP_PORT}`)
})
