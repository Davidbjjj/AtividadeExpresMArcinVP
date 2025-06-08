const express = require('express');
const app = express();
const indexRouter = require('./src/routes/index');

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});