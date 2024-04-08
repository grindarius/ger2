import dayjs from 'dayjs'
import type {
  Adapter,
  DatabaseSession,
  DatabaseUser,
  RegisteredDatabaseSessionAttributes,
  RegisteredDatabaseUserAttributes
} from 'lucia'
import type { Sql } from 'postgres'
import type { RedisClientType } from 'redis'

export interface Config {
  userTableName: string
  prefixes: {
    session?: string
    userSessions?: string
  }
}

interface SessionSchema extends RegisteredDatabaseSessionAttributes {
  id: string
  user_id: string
  expires_at: Date
}

interface UserSchema extends RegisteredDatabaseUserAttributes {
  id: string
}

export class PostgresKeydbSessionAdapter implements Adapter {
  private postgres: Sql
  // biome-ignore lint/suspicious/noExplicitAny: fuck redis type system
  private redis: RedisClientType<any, any, any>

  private userTableName: string
  private sessionPrefix: string
  private userSessionsPrefix: string

  // biome-ignore lint/suspicious/noExplicitAny: fuck redis type system
  constructor(postgres: Sql, redis: RedisClientType<any, any, any>, config?: Config) {
    this.postgres = postgres
    this.redis = redis

    this.userTableName = config?.userTableName || 'users'
    this.sessionPrefix = config?.prefixes?.session ?? 'sessions'
    this.userSessionsPrefix = config?.prefixes?.userSessions ?? 'user_sessions'
  }

  private sessionKey(sessionId: string): string {
    return `${this.sessionPrefix}:${sessionId}`
  }

  private userSessionsKey(userId: string): string {
    return `${this.userSessionsPrefix}:${userId}`
  }

  public async deleteSession(sessionId: string): Promise<void> {
    const sessionData = await this.redis.get(this.sessionKey(sessionId))
    if (sessionData == null || sessionData === '') {
      return
    }

    const sessionSchema: SessionSchema = JSON.parse(sessionData)
    const session = this.transformIntoDatabaseSession(sessionSchema)
    await Promise.all([
      this.redis.del(this.sessionKey(sessionId)),
      this.redis.sRem(this.userSessionsKey(session.userId), sessionId)
    ])
  }

  public async deleteExpiredSessions(): Promise<void> {
    // INFO: Since using redis/keydb as session storage, you can
    // set the object's `EXAT` time since the session has been created,
    // then the session will be taken care of by the database
    return
  }

  public async deleteUserSessions(userId: string): Promise<void> {
    const sessionIds = await this.redis.sMembers(this.userSessionsKey(userId))
    await Promise.all([
      ...sessionIds.map(sessionId => this.redis.del(this.sessionKey(sessionId))),
      this.redis.del(this.userSessionsKey(userId))
    ])
  }

  private async getSession(sessionId: string): Promise<DatabaseSession | null> {
    const sessionResult = await this.redis.get(this.sessionKey(sessionId))
    if (sessionResult == null || sessionResult === '') {
      return null
    }

    const session: SessionSchema = JSON.parse(sessionResult)
    console.info(session)
    return this.transformIntoDatabaseSession(session)
  }

  public async getSessionAndUser(
    sessionId: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const session = await this.getSession(sessionId)
    // There's no way you can get user data if there is no session at all.
    if (session == null) {
      return [null, null]
    }

    const userResult = await this.postgres<Array<UserSchema>>`select * from ${this.postgres(
      this.userTableName
    )} where id = ${session.userId}`
    if (userResult.length === 0) {
      return [null, null]
    }

    return [session, this.transformIntoDatabaseUser(userResult[0]) ?? null]
  }

  public async getUserSessions(userId: string): Promise<Array<DatabaseSession>> {
    const sessionIds = await this.redis.sMembers(this.userSessionsKey(userId))
    if (sessionIds == null) {
      return []
    }

    const sessionData = await Promise.all(
      sessionIds.map(sessionId => this.redis.get(this.sessionKey(sessionId)))
    )
    const sessions = sessionData
      .filter((value): value is NonNullable<typeof value> => value != null)
      .map(value => {
        const json: SessionSchema = JSON.parse(value)
        return this.transformIntoDatabaseSession(json)
      })

    return sessions
  }

  public async setSession(session: DatabaseSession): Promise<void> {
    const value: SessionSchema = {
      id: session.id,
      user_id: session.userId,
      expires_at: session.expiresAt,
      ...session.attributes
    }

    await Promise.all([
      this.redis.sAdd(this.userSessionsKey(session.userId), session.id),
      this.redis.set(this.sessionKey(session.id), JSON.stringify(value), {
        EXAT: Math.floor(session.expiresAt.getTime() / 1000)
      })
    ])
  }

  public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    const sessionData = await this.redis.get(this.sessionKey(sessionId))
    if (sessionData == null) {
      return
    }
    const session: SessionSchema = JSON.parse(sessionData)
    const updatedSession: SessionSchema = {
      ...session,
      expires_at: expiresAt
    }
    await this.redis.set(this.sessionKey(sessionId), JSON.stringify(updatedSession), {
      EXAT: Math.floor(expiresAt.getTime() / 1000)
    })
  }

  private transformIntoDatabaseSession(raw: SessionSchema): DatabaseSession {
    const { id, user_id: userId, expires_at: expiresAt, ...attributes } = raw
    return {
      id,
      userId,
      expiresAt: dayjs(expiresAt).toDate(),
      attributes
    }
  }

  private transformIntoDatabaseUser(raw: UserSchema): DatabaseUser {
    const { id, ...attributes } = raw
    return {
      id,
      attributes
    }
  }
}
