//custom middleware to check the token is vaild


const jwt = require('jsonwebtoken');


  const auth = (request , response, next)=> {
  try{
   const token = request.header('x-auth-token');
   console.log("token", token);
   jwt.verify(token , process.env.SECRET);
   next();
  } catch(err){
    response.status(401).send({error: err.message});
  }
}

module.exports = auth;