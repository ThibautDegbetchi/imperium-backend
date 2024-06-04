let jwt= require('jsonwebtoken');

const SECRETE_KEY="H7$yK*3@tW&i9^rD1%lZ#5MqP!vX6+uL4NfT2sB8EgJ@aYwGhFnVcQ*pRjUo0^Sxd$Iz";
module.exports={
    generateToken: function(userId,isAdmin){
        console.log("generating token");
        return jwt.sign(
            {
                userId:userId,
                isAdmin:isAdmin??false
            },
            SECRETE_KEY,
            {expiresIn:'7d'}
        );
    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace("Bearer ", '').replace(/"/g, '') : null;
    },
    getUserId: function (authorization, userSecretKey) {
        let id = -1;
        let token = module.exports.parseAuthorization(authorization);
        let jwtToken;
        if (token != null) {
            try {
                jwtToken = jwt.verify(token, userSecretKey?? secretKey);
                //console.log(JSON.stringify(jwtToken))
                console.log(JSON.parse(JSON.stringify(jwtToken)))
                if(jwtToken !=null){
                console.log(`je suis dans le if`);
                id = jwtToken.userId;
                console.log(`id :${id}`);
                }
            } catch (err) {
                return err;
            }
        }
        return id;
    }
}