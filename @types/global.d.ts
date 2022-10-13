declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // env
      NODE_ENV: 'production' | 'development'
      TIMEZONE: string
      URL: string
      NEXT_PUBLIC_GOOGLE_ANALYTICS: string
      // ssh
      SSH_USERNAME: string
      SSH_KEY_FILEPATH: string
      SSH_HOST: string
      SSH_PORT: string
      SSH_DST_HOST: string
      SSH_DST_PORT: string
      // database
      DB_URL: string
      DB_NAME: string
      DB_USER: string
      DB_PASS: string
      DB_DIRECT: string
    }
  }
}

export {}
