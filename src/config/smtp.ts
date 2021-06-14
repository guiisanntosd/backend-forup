import dotenv from 'dotenv'

dotenv.config()
export default {
  user: process.env.AUTH_SMTP_USER,
  pass: process.env.AUTH_SMTP_PASS,
}