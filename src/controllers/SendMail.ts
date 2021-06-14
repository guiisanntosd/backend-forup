import { Request, Response } from "express";
import { resolve } from 'path'
import SendMailService from "../services/SendMailService";
import * as Yup from 'yup'

class SendMail {
  async execute(req: Request, res: Response) {
    const { name, office, email, phone, segment, role, subject, message } = req.body

    const data = {
      name, office, email, phone, segment, role, subject, message 
    }

    const phoneRegex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

    const schema = Yup.object().shape({
      name: Yup.string().required('Digite seu nome completo'),
      office: Yup.string(),
      email: Yup.string().email('Campo de email inválido').required(),
      phone: Yup.string().matches(phoneRegex, 'Número de telefone inválido').min(11, 'Preencha o número de telefone corretamente com o DDD'),
      segment: Yup.string(),
      role: Yup.string(),
      subject: Yup.string().required('Selecione um assunto'),
      message: Yup.string().required('Conte um pouco em como podemos ajudar'),
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const npsPath = (template: string) => resolve(__dirname, '..', 'views', 'emails', `${template}.hbs`)

    await SendMailService.execute(process.env.EMAIL_HOST, 'Lead - Agência ForUp', data, npsPath('lead'))
    await SendMailService.execute(email, 'Contato - Agência ForUp', data, npsPath('contact'))

    return res.json({
      message: 'Email enviado com sucesso!'
    })
  }
}

export default new SendMail