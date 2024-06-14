import { customType } from 'drizzle-orm/pg-core'

/**
 * Matches a string in the form of `(1.22, 94)` with any whitespaces.
 */
const pointRegexp = /^\s*\(\s*(\d+|\d+\.\d+)\s*,\s*(\d+|\d+\.\d+)\s*\)\s*$/

export const point = customType<{ data: { x: number; y: number }; driverData: string }>({
  dataType() {
    return 'point'
  },
  toDriver(value) {
    return `point(${value.x}, ${value.y})`
  },
  fromDriver(value) {
    const values = pointRegexp.exec(value)

    // If there's already a value insde postgres,
    // this case would not happen.
    if (values == null) {
      return { x: 0, y: 0 }
    }

    const x = Number(values[1])
    const y = Number(values[2])

    return { x, y }
  }
})
