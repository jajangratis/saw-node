  
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const port = 7777;

const router = require('./router/router')
app.use('/api', router)

app.listen(port, () => {
	console.log('server runing on port ' + port);
});