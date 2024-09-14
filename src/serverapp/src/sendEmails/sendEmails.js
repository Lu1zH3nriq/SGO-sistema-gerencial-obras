const nodemailer = require('nodemailer');

// Configuração do transporte de e-mail (usando Gmail neste exemplo)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Seu endereço de e-mail
    pass: process.env.EMAIL_PASS, // Sua senha ou app password
  },
});

// Função para enviar e-mail
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // De quem é o e-mail
    to: to, // Para quem vai o e-mail
    subject: subject, // Assunto do e-mail
    text: text, // Corpo do e-mail (texto plano)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};

module.exports = sendEmail;