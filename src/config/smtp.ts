import dotenv from 'dotenv'

dotenv.config()
export default {
  host: process.env.AUTH_SMTP_HOST,
  port: process.env.AUTH_SMTP_PORT,
  user: process.env.AUTH_SMTP_USER,
  pass: process.env.AUTH_SMTP_PASS,
}