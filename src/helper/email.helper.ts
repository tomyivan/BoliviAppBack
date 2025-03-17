// import nodemailer from 'nodemailer';
import 'dotenv/config';
export const msg = (email:string, code:string)  => ({
    to: email, // Campo "to" es obligatorio
    from: `${String(process.env.SENDGRID_EMAIL)}`, // Correo verificado en SendGrid
    subject: 'Código de verificación',
    text: `Tu código de verificación es: ${code}`,
    html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`
  })
// export const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: Number(process.env.EMAIL_PORT),
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });
