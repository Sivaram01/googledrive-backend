const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const auth = require('../middleware/auth.js')


router.post('/sign-up', [
  check('firstname', 'firstname should have min 3 char').isLength({min: 3}),
  check('lastname', 'lastname should have min 3 char').isLength({min: 3}),
  check('email', 'valid email is required').isEmail(),
  check('password', 'password should atleast have min 8 char').isLength({min: 8}),
],
   async(request , response)=> {

    const errors = validationResult(request);
     if(!errors.isEmpty()){
       return response.status(422).json({
         error: errors.array()[0].msg
       });
     }
     const {email} = request.body
     userModel.findOne({email}, (err , user)=>{
      if(user){
        return response.status(400).json({
          error: "user email already exists"
        })
      }
    });
     
   const saltPasswordd = await bcrypt.genSalt(10);
   const securePassword = await bcrypt.hash(request.body.password, saltPasswordd);

     

  const signedUpUser = new userModel({
    firstname:request.body.firstname,
    lastname:request.body.lastname,
    email:request.body.email,
    password:securePassword,
  })
  signedUpUser.save()
  .then(data => {
      response.json(data)
  })
  .catch(error => {
    response.json(error)
  })
})


router.post('/login' , async(request , response)=> {
 
  const {email , password} = request.body
  const errors = validationResult(request);
  if(!errors.isEmpty()){ 
    return response.status(422).json({
      error: errors.array()[0].msg
    });
  } 
  userModel.findOne({email}, async(err , user)=>{
 
    if(err || !user){
      return response.status(400).json({
        error: "user email does not exists"
      })
    }
    console.log(user)
    console.log(password);
  
    // if(user.password !== password){
    //   return response.status(401).json({
    //     error: "Invalid credentials"
    //   })}
    if(await bcrypt.compare(password , user.password)){
      // return response.status(200).json({
        // message: "success"
      // })
          //create tokens
      const token = jwt.sign({_id: user._id}, process.env.SECRET)
      // put token in cookie
       //  response.cookie("token", token, {expire: new Date() + 9999});
      //send response to front end
      const {_id , firstname , email} = user;
      return response.json({token , user:{_id, firstname , email}})
    } else {
      response.status(400).json({error: "invalid credentials"})
    }  
   
  });
})

module.exports = router;