const sqlite3 = require('sqlite3').verbose(); // Conectando diretamente ao sqlite3 aqui

// Conectando ao banco de dados
const db = new sqlite3.Database('./database.db');

// Função que ajusta o consumo de energia com base no tipo de dado
const ajustarEnergia = (tipo, valor) => {
  if (tipo === 'temperatura' && valor > 25) {
    console.log('Climatização ajustada para economizar energia.');
  } else if (tipo === 'iluminacao' && valor < 300) {
    console.log('Iluminação ajustada para otimizar consumo.');
  }
};

// Função que processa os dados dos sensores e ajusta automaticamente
const processarDados = () => {
  db.all('SELECT * FROM sensores', [], (err, rows) => {
    if (err) {
      console.error('Erro ao consultar os dados dos sensores:', err.message);
      return;
    }

    // Itera sobre os sensores e chama a função de ajuste
    rows.forEach((row) => {
      ajustarEnergia(row.tipo, row.valor);
    });
  });
};

module.exports = { processarDados };
