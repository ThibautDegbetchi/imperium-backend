const express = require('express');
const connexionCtrl=require('../controller/auth');

exports.router=(function () {
    const apiRouter = express.Router();
    apiRouter.route('/register').post(connexionCtrl.register);
    apiRouter.route('/login').post(connexionCtrl.login);
    return apiRouter;
})();