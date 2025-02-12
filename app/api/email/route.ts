import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    /*
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth:    {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD
    }
  });

  const emailForUsOptions: Mail.Options = {
    from:    process.env.NODEMAILER_EMAIL,
    to:      process.env.NODEMAILER_EMAIL,
    subject: `Nuevo mensaje del contacto de El hornito. ${name} (${email})`,
    text:    `Has recibido un nuevo mensaje del contacto de El horno de la abuelita Maruja: \n\n${message}`
  };

  const emailForCustomerOptions: Mail.Options = {
    from:    process.env.NODEMAILER_EMAIL,
    to:      email,
    subject: `Hola ${name} 👋🏽, hemos recibido tu mensaje`,
    text:    `Hola ${name} y muchas gracias por escribir al El horno de la abuelita Maruja, esperamos que tengas un muy buen día!`
  };

  const sendMailPromise = (mailOptions: Mail.Options) =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("El formulario se envió con éxito, gracias por escribirnos 🥳");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise(emailForUsOptions);
    await sendMailPromise(emailForCustomerOptions);
    return NextResponse.json({
      success: true,
      message: "El formulario se envió con éxito, gracias por escribirnos 🥳"
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Ha habido un problema al enviar el mail. Por favor, intentalo de nuevo en unos minutos"
    }, {
      status: 500
    });
  }
}