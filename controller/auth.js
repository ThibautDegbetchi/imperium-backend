let bcrypt = require('bcrypt');
let models = require('../models');
let jwtUtils = require('../utils/jwt.util');
const { Op, where } = require('sequelize');

module.exports = {
    login: function (req, res) {
        if (req.body.password == null || (req.body.email == null && req.body.phoneNumber == null)) {
            return res.status(400).json({ error: "missing parameter" });
        }
        let email = req.body.email;
        let password = req.body.password;
        let phoneNumber;
        let token;


        models.User.findOne({
            where: { email: email }
        }).then(function (user) {
           if(user){
            bcrypt.compare(password, user.password, function (errBycrypt, resBycrypt) {
                if (resBycrypt) {
                    token = jwtUtils.generateToken(user.id);
                    console.log("after generating token");
                    models.User.update( { token: token },
                        {where: {
                                email: email
                            }
                        }).then(function (nUser) {
                            return res.status(200).json(nUser);
                        }).catch(function (e) {
                            return res.status(400).json(e);
                        });
                }else{
                    return res.status(403).json({error:"invalid password"});
                }
            });
           }else{
            return res.status(404).json({error:"user not exist in db"});
           }
        }).catch(function(){
            return res.status(500).json({error:"unable to verify user"});
        })


    },
    register: function (req, res) {
        if (req.body.name == null ||
            req.body.email == null ||
            req.body.phoneNumber == null ||
            req.body.password == null) {
            console.log("verification\n");
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
        }).then(function (user) {
            if (user) {
                console.log("dans le if du premier then");
                return res.status(409).json({ error: 'User already exist' });
            } else {
                console.log("dans le else du premier then");
                bcrypt.hash(password, 7, function (err, hash) {
                    models.User.create({
                        email: email,
                        name: name,
                        phoneNumber: phoneNumber,
                        password: hash
                    }).then(function (userCreate) {
                        if (userCreate) {
                            console.log("dans le if du deuxieme then");
                            return res.status(200).json({ userId: userCreate.id });
                        } else
                            console.log("dans le else du dexieme then");
                        return res.status(500).json({ error: 'cannot create user' });
                    })
                });
            }
        }).catch(function (e) {
            console.log("dans le catch\n");
            return res.status(500).json(e);
        })

    }
}