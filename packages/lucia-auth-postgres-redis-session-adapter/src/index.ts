import {
  Adapter,
  DatabaseSession,
  DatabaseSessionAttributes,
  DatabaseUser,
  DatabaseUserAttributes,
} from 'lucia'
import { type Sql } from 'postgres'
import { RedisClientType } from 'redis'

export interface TableNames {
  user: string
  session: string
}

interface SessionSchema extends DatabaseSessionAttributes {
  id: string
  user_id: string
  expires_at: Date
}

interface UserSchema extends DatabaseUserAttributes {
  id: string
}

export class PostgresRedisSessionAdapter implements Adapter {
  private postgres: Sql
  private redis: RedisClientType

  private escapedUserTableName: string
  private escapedSessiontableName: string

  constructor(postgres: Sql, redis: RedisClientType, tableNames: TableNames) {
    this.postgres = postgres
    this.redis = redis

    this.escapedUserTableName = escapeName(tableNames.user)
    this.escapedSessiontableName = escapeName(tableNames.session)
  }

  private sessionKey(sessionId: string): string {
    return `session:${sessionId}`
  }

  private userSessionsKey(userId: string): string {
    return `user_sessions:${userId}`
  }

  public async deleteSession(sessionId: string): Promise<void> {
    const sessionData = await this.redis.get(this.sessionKey(sessionId))
    if (sessionData == null || sessionData === '') {
      return
    }

    const session = JSON.parse(sessionData) as DatabaseSession
    await Promise.all([
      this.redis.del(this.sessionKey(sessionId)),
      this.redis.sRem(this.userSessionsKey(session.userId), sessionId),
    ])
  }

  public async deleteUserSessions(userId: string): Promise<void> {
    const sessionIds = await this.redis.sMembers(this.userSessionsKey(userId))
    await Promise.all([
      ...sessionIds.map(sessionId => this.redis.del(this.sessionKey(sessionId))),
      this.redis.del(this.userSessionsKey(userId)),
    ])
  }

  private async getSession(sessionId: string): Promise<DatabaseSession | null> {
    const sessionResult = await this.redis.get(this.sessionKey(sessionId))
    if (sessionResult == null) {
      return null
    }

    const session: DatabaseSession = JSON.parse(sessionResult)
    return session
  }

  public async getSessionAndUser(
    sessionId: string,
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const session = await this.getSession(sessionId)
    // There's no way you can get user data if there is no session at all.
    if (session == null) {
      return [null, null]
    }

    const userResult = await this.postgres<
      Array<DatabaseUser>
    >`select * from ${this.escapedUserTableName} where user_id = ${session.userId}`
    if (userResult.length === 0) {
      return [null, null]
    }

    return [session, userResult[0] ?? null]
  }

  public async getUserSessions(userId: string): Promise<Array<DatabaseSession>> {
    const sessionIds = await this.redis.sMembers(this.userSessionsKey(userId))
    if (sessionIds == null) {
      return []
    }

    const sessionData = await Promise.all(
      sessionIds.map(sessionId => this.redis.get(this.sessionKey(sessionId))),
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
      ...session.attributes,
    }

    await Promise.all([
      this.redis.sAdd(this.userSessionsKey(session.userId), session.id),
      this.redis.set(this.sessionKey(session.id), JSON.stringify(value), {
        EXAT: Math.floor(session.expiresAt.getTime() / 1000),
      }),
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
      expires_at: expiresAt,
    }
    await this.redis.set(this.sessionKey(sessionId), JSON.stringify(updatedSession), {
      EXAT: Math.floor(expiresAt.getTime() / 1000),
    })
  }

  private transformIntoDatabaseSession(raw: SessionSchema): DatabaseSession {
    const { id, user_id: userId, expires_at: expiresAt, ...attributes } = raw
    return {
      userId,
      id,
      expiresAt,
      attributes,
    }
  }

  private transformIntoDatabaseUser(raw: UserSchema): DatabaseUser {
    const { id, ...attributes } = raw
    return {
      id,
      attributes,
    }
  }
}

const escapeName = (value: string): string => {
  if (value.includes('.')) {
    return value
  }

  return `"${value}"`
}
