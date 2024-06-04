
let connexionCtrl=require('../controller/auth');
let express = require('express');
exports.router=(function () {
    let apiRouter = express.Router();

    apiRouter.route('/register').post(connexionCtrl.register);
    apiRouter.route('/login').post(connexionCtrl.login);

    return apiRouter;
})();