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
  let rhash = ''
  let domain = ''
  let resolved = false
  if (req.path === '/') {
    return res
      .header({ Location: '/@onchfs.io/'})
      .status(307)i
      .send('REDIRECT')
  }
  if (req.path.indexOf('/@') === 0) {
    try {
      domain = req.path.slice(2).split('/')[0]
      const dhash = await dns.resolve(`_onchfs.${domain}`, 'TXT')
      rhash = dhash[0][0].split('onchfs://')[1]
      path = path.replace(`@${domain}`, rhash)
      resolved = true
    } catch(e) {
      console.log(e)
      return res.status(404).send('DNS resolution failed')
    }
  }  
  console.log(path)
  const response = await resolver(path)
  if (response.status === 308 && resolved) {
    response.headers['Location'] = response.headers['Location'].replace(rhash, `@${domain}`)
  }
  console.log(response.headers, response.status)
  return res
    .header(response.headers)
    .status(response.status)
    .send(Buffer.from(response.content))
})

app.listen(HTTP_PORT, () => {
  console.log(`Listening to ${HTTP_PORT}`)
})
