let bodyParser = require('body-parser');
let express = require('express');
let apiRouter = require('./routes/apiRouter').router;

let server = express();
const PORT = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/api', apiRouter);

server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon server</h1>');
});
server.listen(PORT, function () {
    console.log(`Server en marche et écoute le port ${PORT}`);
});