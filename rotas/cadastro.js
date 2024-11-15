const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose(); // Importando sqlite3 diretamente aqui
const router = express.Router();

// Conectando ao banco de dados
const db = new sqlite3.Database('./database.db');

router.post('/', (req, res) => {
  const { nome, email, senha } = req.body;

  // Gerando o hash da senha antes de salvar no banco de dados
  const hash = bcrypt.hashSync(senha, 10);

  // Inserindo o novo usuário no banco de dados
  db.run(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, hash],
    (err) => {
      if (err) return res.status(500).send('Erro ao cadastrar usuário.');
      res.send('Usuário cadastrado com sucesso!');
    }
  );
});

module.exports = router;
