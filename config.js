import { config } from 'tiny-env-config'

export const RPCS = config('RPCS', '["https://ghostnet.smartpy.io"]', JSON.parse)
export const BLOCKCHAIN = config('BLOCKCHAIN', 'tezos:ghostnet')
