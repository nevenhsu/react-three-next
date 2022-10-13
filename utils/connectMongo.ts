import mongoose from 'mongoose'
import tunnel from 'tunnel-ssh'
import tcpPortUsed from 'tcp-port-used'
import path from 'path'
import fs from 'fs/promises'
import { env } from 'utils/env'
import type { Server } from 'net'

const dstHost = process.env.SSH_DST_HOST
const dstPort = Number(process.env.SSH_DST_PORT)

const sshConfig: tunnel.Config = {
  username: process.env.SSH_USERNAME,
  host: process.env.SSH_HOST,
  port: Number(process.env.SSH_PORT),
  dstHost,
  dstPort,
  keepAlive: true,
}

const dbOptions: mongoose.ConnectOptions = {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  retryWrites: true,
  directConnection: true,
}

let server: Server

const connectMongo = () => mongoose.connect(process.env.DB_URL, dbOptions)

const connectMongoBySsh = async () => {
  const privateKey = await getPrivateKey()

  if (!privateKey) {
    throw new Error('no private key for ssh')
  }

  const used = await tcpPortUsed.check(dstPort, dstHost)

  if (!used) {
    await connectSsh(privateKey)
  }

  return connectMongo()
}

function connectSsh(privateKey: Buffer) {
  const config = {
    ...sshConfig,
    privateKey,
  }

  return new Promise((res, rej) => {
    if (server) {
      res(server)
    } else {
      tunnel(config, async (error, result) => {
        if (error) {
          rej(error)
          return
        }

        server = result
        res(server)
      })
    }
  })
}

async function getPrivateKey() {
  const url = process.env.SSH_KEY_FILEPATH
  const resolvedUrl = path.isAbsolute(`${url}`) ? url : path.resolve(url)

  try {
    return fs.readFile(resolvedUrl)
  } catch (err) {
    return undefined
  }
}

export default env.dbDirect ? connectMongo : connectMongoBySsh
