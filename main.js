let express = require('express');
let bodyParser = require('body-parser');
let apiRouter = require('./routes/api_router').router;

let server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/api', apiRouter);
server.listen(8080, function () {
    console.log('Server en marche et écoute le port 8080');
});