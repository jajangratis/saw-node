  
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const port = 7777;

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const router = require('./router/router')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router)

app.listen(port, () => {
	console.log('server runing on port ' + port);
});