const jwt = require('jsonwebtoken');
const User = require('../database/models/User');
require('dotenv').config();

const auth = function(req, res, next){
  let token = req.header('Authorization');
  if(!token) return res.status(400).send({error: 'Unauthorized'});
  token = token.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, function(error, decoded){
    if(error){
      return res.status(400).send({error: 'Unauthorized'});
    }
    console.log(decoded);
    User.findById(decoded._id).then(user=>{
      console.log(user);
      req.user = user;
      req.token = token;
      next();
    }).catch(error=>{
      console.log(error);
      return res.status(400).send({error: 'Unauthorized'})
    })
  });
};

module.exports = auth;