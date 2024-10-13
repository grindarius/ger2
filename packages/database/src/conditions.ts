import { type BinaryOperator, type SQL, type SQLWrapper, bindIfParam, sql } from 'drizzle-orm'

/**
 * Perform full text search operation on pgroonga.
 */
export const fts: BinaryOperator = (left: SQLWrapper, right: unknown): SQL => {
  return sql`${left} &@ ${bindIfParam(right, left)}`
}
