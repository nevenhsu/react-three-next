import _ from 'lodash'
import { format } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import Counter from 'utils/counter'
import colors from 'utils/colors'
import { env } from 'utils/env'

export type TRetryOption<T = any> = {
  name?: string
  ms?: number
  count?: boolean
  fallback?: T
  throwError?: boolean
  hideError?: boolean
}

export function formatDate(timestamp: number, pattern = 'MM/dd/yyyy HH:mm:ss') {
  const timeStr = `${timestamp}`
  const time = timeStr.length === 13 ? timestamp : timestamp * 1000

  const date = zonedTimeToUtc(new Date(time), env.timezone)
  return format(date, pattern)
}

export function print(title: string, ...rest: any) {
  const time = formatDate(Date.now())
  const logs = _.compact([...rest])

  console.group(`${title}, ${time}`)
  logs.forEach((el) => console.log(el))
  console.groupEnd()
  console.log('\n')
}

export function wait(milliseconds = 500, any: any = undefined) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(any)
    }, milliseconds)
  })
}

export async function retryFn<T = any>(
  promise: Promise<T>,
  option?: TRetryOption<T>,
  retry = 2
): Promise<T | undefined> {
  const { name = 'fn', ms = 1000, count, fallback, throwError } = option || {}

  const counter = new Counter()

  try {
    const result = await promise

    if (count) {
      const info = `${colors.fg.green}name: ${name}, sec: ${counter.diffSec}${colors.reset}`
      print(`Successfully in ${info}`)
    }

    return result
  } catch (err: any) {
    await wait(ms)

    if (retry >= 0) {
      return retryFn(promise, option, retry - 1)
    }

    const info = `${colors.fg.red}name: ${name}, sec: ${counter.diffSec}${colors.reset}`
    err.stack = `${err.stack} \n    ${info}`

    if (throwError) {
      throw err
    }

    return fallback
  }
}
