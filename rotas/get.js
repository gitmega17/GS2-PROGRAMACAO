const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Conectando ao banco de dados
const db = new sqlite3.Database('./database.db');

// Rota para obter todos os dados de sensores
router.get('/dados', (req, res) => {
  db.all('SELECT * FROM sensores ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).send('Erro ao consultar dados do banco.');
    }
    res.status(200).json(rows);
  });
});

// Rota para obter um sensor específico por ID
router.get('/dados/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM sensores WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).send('Erro ao consultar dados do banco.');
    }
    if (!row) {
      return res.status(404).send('Dado não encontrado.');
    }
    res.status(200).json(row);
  });
});

// Rota para obter todos os usuários
router.get('/usuarios', (req, res) => {
  db.all('SELECT id, nome, email FROM usuarios', [], (err, rows) => {
    if (err) {
      return res.status(500).send('Erro ao consultar usuários.');
    }
    res.status(200).json(rows);
  });
});

// Rota para obter um usuário específico por ID
router.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT id, nome, email FROM usuarios WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).send('Erro ao consultar dados do banco.');
    }
    if (!row) {
      return res.status(404).send('Usuário não encontrado.');
    }
    res.status(200).json(row);
  });
});

module.exports = router;
