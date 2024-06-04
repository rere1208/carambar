const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json'); // Assurez-vous d'ajuster le chemin en conséquence

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;
