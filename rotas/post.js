const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Conectando ao banco de dados
const db = new sqlite3.Database('./database.db');

// Rota para criar um novo registro de dados (Exemplo: sensor)
router.post('/dados', (req, res) => {
  const { tipo, valor } = req.body;

  // Verificar se os dados necessários estão presentes
  if (!tipo || !valor) {
    return res.status(400).send('Tipo e valor são obrigatórios.');
  }

  // Inserindo o novo dado de sensor no banco de dados
  db.run(
    'INSERT INTO sensores (tipo, valor) VALUES (?, ?)',
    [tipo, valor],
    function (err) {
      if (err) {
        return res.status(500).send('Erro ao inserir dados no banco.');
      }
      res.status(201).send({ id: this.lastID, tipo, valor });
    }
  );
});

module.exports = router;
