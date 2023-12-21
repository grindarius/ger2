import { Version } from '@node-rs/argon2'

export const argon2Options = {
  memoryCost: 20_000,
  timeCost: 2,
  parallelism: 1,
  version: Version.V0x13,
  outputLen: 64,
}

export const rawPassword = 'aryastark'
