const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose(); // Importando sqlite3 diretamente aqui
const router = express.Router();

// Conectando ao banco de dados
const db = new sqlite3.Database('./database.db');

router.post('/', (req, res) => {
  const { email, senha } = req.body;

  // Consultando o banco de dados para verificar se o usuário existe
  db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).send('Erro no servidor.');
    if (!user) return res.status(400).send('Usuário não encontrado.');

    // Verificando se a senha fornecida é válida
    const senhaValida = bcrypt.compareSync(senha, user.senha);
    if (!senhaValida) return res.status(400).send('Senha inválida.');

    // Gerando o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ token });
  });
});

module.exports = router;
