import { databaseUser, testAdapter } from '@lucia-auth/adapter-test'
import postgres from 'postgres'
import { createClient } from 'redis'
import { type Config, PostgresKeydbSessionAdapter } from '../src/index.js'

const sql = postgres('http://postgres:postgres@localhost:8475/ger2_lucia')

// biome-ignore lint/suspicious/noExplicitAny: fuck redis type system
const redis = createClient<any, any, any>({
  url: 'redis://localhost:6958'
})

redis.on('error', err => {
  console.error('Redis client error', err)
})

await sql`drop table if exists public.users`

await sql`create table if not exists users (
  id varchar(32) not null unique,
  username varchar(255) not null unique,
  primary key (id)
)`

// @ts-expect-error username is there
await sql`insert into users (id, username) values (${databaseUser.id}, ${databaseUser.attributes.username})`

const config: Config = {
  userTableName: 'users',
  prefixes: {
    session: 'session',
    userSessions: 'user_sessions'
  }
}

await redis.connect()
const adapter = new PostgresKeydbSessionAdapter(sql, redis, config)

await testAdapter(adapter)

await sql`drop table users`
await redis.disconnect()
