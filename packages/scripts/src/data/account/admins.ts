import { randomBytes } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { hashSync } from '@node-rs/argon2'
import dayjs from 'dayjs'
import { ulid } from 'ulidx'
import { argon2Options, rawPassword } from '../../argon2.js'
import { NewAccountNames, type NewAccounts } from '../../types/index.js'

export const generateAdmins = (): Array<{
  accounts: NewAccounts
  account_names: NewAccountNames
}> => {
  return Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const createdAt = dayjs().toISOString()
    const accountId = ulid()

    return {
      accounts: {
        id: accountId,
        username: (
          faker.internet.userName({ firstName, lastName }) + randomBytes(4).toString('hex')
        ).substring(0, 30),
        email: faker.internet.email({ firstName, lastName }),
        password: hashSync(rawPassword, argon2Options),
        role: 'admin',
        birthdate: dayjs(
          faker.date.between({
            from: dayjs().subtract(50, 'years').toDate(),
            to: dayjs().subtract(18, 'years').toDate()
          })
        ).toISOString(),
        created_at: createdAt,
        updated_at: null
      },
      account_names: {
        id: ulid(),
        account_id: accountId,
        name_language: 'en',
        first_name: firstName,
        middle_name: '',
        last_name: lastName
      }
    }
  })
}
