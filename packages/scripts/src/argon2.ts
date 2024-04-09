import { Argon2id } from 'oslo/password'

export const argon2Options = {
  memorySize: 20_000,
  iterations: 2,
  parallelism: 1,
  tagLength: 64
}

export const rawPassword = 'aryastark'

export const argon2 = new Argon2id(argon2Options)
