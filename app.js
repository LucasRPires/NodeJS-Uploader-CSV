const express = require('express');
const routes = require('./src/routes');
const swaggerDoc = require('./src/lib/swagger/swaggerDoc');
const bodyParser = require('body-parser');

const app = express(express);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

routes(app);
swaggerDoc(app);

app.listen(3000);
console.log('Servidor rodando na porta 3000');