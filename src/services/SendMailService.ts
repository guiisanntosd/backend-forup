import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

import SMTP_CONFIG from '../config/smtp'

class SendMailService {

  private client: Transporter

  constructor() {
    const transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: false,
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    this.client = transporter
  }

  async execute(to: string, subject: string, variables: object, path: string) {

    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const mailTemplateParse = handlebars.compile(templateFileContent)
    
    const html = mailTemplateParse(variables)

    const message = await this.client.sendMail({
      from: '"Agência ForUp" <contato@agenciaforup.com.br>',
      to: to,
      subject,
      html
    })

    console.log(message)
  }
}

export default new SendMailService()