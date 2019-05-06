const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    swaggerDefinition: {
        info: {
            title: 'API PGmais',
            version: '1.0',
            description: 'API para aplicação de teste em NodeJS - PGmais',
        },
        basePath: '/',
    },
    apis: [path.dirname(require.main.filename) + '/src/routes.js'],
};

const specs = swaggerJsdoc(options);

module.exports = function (app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};