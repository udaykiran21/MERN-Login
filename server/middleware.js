const jwt = require('jsonwebtoken')

module.exports = function(req,res,next) {
    try{
        let token = req.header('x-token')
        if(!token){
            return res.send('token not found')
        }
        let decode = jwt.verify(token,'jwtKey');
        req.User=decode.User
        next()
    }
    catch(err){
        console.log(err)
        return res.send('server error')
    }
}