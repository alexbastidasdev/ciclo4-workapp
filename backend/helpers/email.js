import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

    // informacion del email
    const info = await transport.sendMail({
        from: '"workApp - Administrador de Proyectos" <cuentas@workapp.com>',
        to: email,
        subject: 'workApp - Confirma tu Cuenta',
        text: 'Comprueba tu Cuenta en workApp',
        html: `
            <p>Hola: ${nombre}, Comprueba tu Cuenta en workApp</p>
            <p>Tu Cuenta ya Está Casi Lista, Solo Debes Comprobarla Dando Click en el Siguiente Enlace:</p>

            <a href="${process.env.FRONTEND_URL}/auth/confirmar/${token}">Comprobar Cuenta</a> 

            <p>Si tu no Creaste Esta Cuenta, Puedes Ignorar el Mensaje</p>
        `,
    });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

  // informacion del email
  const info = await transport.sendMail({
      from: '"workApp - Administrador de Proyectos" <cuentas@workapp.com>',
      to: email,
      subject: 'workApp - Reestablece tu Password',
      text: 'Reestablece tu Password',
      html: `<p>Hola: ${nombre}, Haz Solicitado Reestablecer tu Password</p>

          <p>Sigue el Siguiente Enlace Para Generar un NUevo Password:</p>

          <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Reestablecer Password</a> 

          <p>Si tu no Solicitaste Este Email, Puedes Ignorar el Mensaje</p>
      `,
  });
};
  