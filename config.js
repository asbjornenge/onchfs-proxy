import { config } from 'tiny-env-config'

export const RPCS = config('RPCS', '["https://ghostnet.smartpy.io"]', JSON.parse)
export const HTTP_PORT = config('HTTP_PORT', '4000')
export const BLOCKCHAIN = config('BLOCKCHAIN', 'tezos:ghostnet')
