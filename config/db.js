import dotenv from 'dotenv'
import pkg from 'pg'
let { Pool } = pkg

dotenv.config()

export let pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})