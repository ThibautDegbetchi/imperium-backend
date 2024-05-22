const jwt= require('jsonwebtoken');

const SECRETE_KEY="";
module.exports={
    generateToken: function(userId){
        return jwt.sign(
            {
                userId:userId,
                isAdmin:false
            },
            SECRETE_KEY,
            {dexpireAt:"7d"}
        );
    }
}