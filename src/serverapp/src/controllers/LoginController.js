const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../sendEmails/sendEmails");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gerar novo token JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retornar o usuário e o token
    res.status(200).json({ message: 'Login bem-sucedido', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};

const redefSenha = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Gerar nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualizar a senha do usuário
    await User.update({ password: hashedPassword }, { where: { email } });


    // Enviar e-mail com a nova senha
    const subject = "Sua senha foi redefinida com sucesso!";
    const text = `Olá ${user.nome},\n\nSua senha foi redefinida com sucesso!\n\nFaça login no sistema com seu email e sua nova senha!\n\nObrigado!`;
    await sendEmail(email, subject, text);



    // Retornar a mensagem de sucesso
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  }
  catch (error) {
    res.status(500).json({ message: 'Erro ao redefinir a senha', error });
  }
  
};

module.exports = { login, redefSenha };