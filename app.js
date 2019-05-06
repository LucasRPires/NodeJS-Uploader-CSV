const express = require('express');
const routes = require('./src/routes');
const swaggerDoc = require('./src/lib/swagger/swaggerDoc');

const app = express(express);

routes(app);
swaggerDoc(app);

app.listen(3000);
console.log('Servidor rodando na porta 3000');

// const bodyParser = require('body-parser');

// var app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


