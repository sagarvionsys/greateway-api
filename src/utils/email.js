import { ApiError } from "./ApiError.js"
import nodemailer from "nodemailer"
import fs from "fs"

const SendMailWithAttachment = async ({ name, email, number, role, ResumePath, filename }) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const config = {
            from: "worksagar20@gmail.com",
            to: "sagaryenkure@vionsys.com",
            subject: `Job Application for ${role}`,
            html: `<p><strong>Name : </strong> ${name}</p>
            <p><strong>Email : </strong> ${email}</p>
            <p><strong>Role : </strong> ${role}</p>
          <p><strong>Number : </strong> ${number}</p>
          `,
            attachments: [{
                filename: filename,
                path: ResumePath

            }]
        }
        const mailResult = await transport.sendMail(config)
        return mailResult

    } catch (error) {
        fs.unlinkSync(ResumePath)
        throw new ApiError(500, "failed to send Email")
    }
}

const SendMailWithOutAttachment = async ({ name, email, number, subject, message }) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const config = {
            from: "worksagar20@gmail.com",
            to: "sagaryenkure@vionsys.com",
            subject: `User Queiry about ${subject}`,
            html: `<p><strong>Name : </strong> ${name}</p>
            <p><strong>Email : </strong> ${email}</p>
            <p><strong>Number : </strong> ${number}</p>
            <p><strong>message : </strong> ${message}</p>
          `
        }
        const mailResult = await transport.sendMail(config)
        return mailResult
    } catch (error) {
        throw new ApiError(500, "failed to send Email")
    }
}


export {
    SendMailWithAttachment,
    SendMailWithOutAttachment
}