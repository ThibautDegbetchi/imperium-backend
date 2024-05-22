const bcrypt = require('bcrypt');
const models = require('../models');
const jwtUtils = require('../utils/jwt.util');

module.exports = {
    login: function (req, res) {
        if (req.body.email == null || (req.body.password == null && req.body.phoneNumber == null)) {
            return res.status(400).json({ error: "missing parameter" });
        }
        let email = req.body.email;
        let password;
        let phoneNumber;
        let token;
        if (req.body.password != null)
            password = req.body.password;
        models.User.findOne(
            {
                where: {
                    password: password
                }
            })
        if (req.body.phoneNumber != null) {
            phoneNumber = req.body.phoneNumber;
            models.User.findOne(
                {
                    where: {
                        phoneNumber: phoneNumber
                    }
                }).then(function (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result) {
                            //create user toke;
                            token = jwtUtils.generateToken(user.id);
                            models.User.update(
                                {
                                    attributes: { token: token },
                                    where: {
                                        phoneNumber: phoneNumber
                                    }
                                }).then(function (nUser) {
                                    return res.status(200).json(nUser);
                                }).catch(function (e) {
                                    return res.status(400).json(e);
                                });
                        }
                    });
                }).catch(function (e) {
                    return res.status(500).json(e);
                })
        }


    },
    register: function (req, res) {
        if (req.body.name == null ||
            req.body.email == null ||
            req.body.phoneNumber == null ||
            req.body.password == null) {
            return res.status(400).json({ error: "missing parameter" });
        }

        let name = req.body.name;
        let email = req.body.email;
        let phoneNumber = req.body.phoneNumber;
        let password = req.body.password;

        models.User.findOne({
            where: {
                [Op.or]: [{ email: req.body.email },
                { phoneNumber: req.body.phoneNumber }]
            }
        }).then(function(user){
            if(user){
                return res.status(409).json({error:'User already exist'});
            }else{
                bcrypt . hash ( password ,  7 ,  function ( err ,  hash )  { 
                    models.User.create({
                        email:email,
                        name:name,
                        phoneNumber:phoneNumber,
                        password:hash
                    }).then(function(userCreate){
                        if(userCreate){
                            return res.status(200).json({userId:userCreate.id});
                        }else
                        return res.status(500).json({error:'cannot create user'});
                    })
                } ) ;     
            }
        }).catch(function(e){
            return res.status(500).json(e);
        })

    }
}