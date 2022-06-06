const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../database/models/User');
const auth = require('../middleware/auth')
require('dotenv').config();

const router = express.Router();

router.post('/signin', (req, res)=>{
  if(!req.body.email || !req.body.password || !req.body.name) return res.sendStatus(400);

  bcrypt.hash(req.body.password, 8).then(hashedPass=>{
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass
    });

    return User.create(user)
  }).then(createdUser=>{
    console.log(createdUser);
    res.status(200);
    res.send(createdUser);
  }).catch(error=>{
    console.log('😘😘'+error+'😘😘');
    res.status(400);
    res.send({
      error: 'Email already exists',
    })
  });
  
  // res.send('2ND ROUTE WOHOOOO');
});

router.post('/login', function(req, res){
  console.log('post req on /login')
  if(!req.body.email || !req.body.password) return res.status(400).send({
    error: 'Invalid request'
  });

  User.findOne({email: req.body.email}).then((user)=>{
    console.log(user);
    if(!user) return res.status(400).send({error: 'Account not found'})
    bcrypt.compare(req.body.password, user.password, function(error, result){
      if(error) return res.sendStatus(500);
      if(result){
        const token = jwt.sign({_id: user._id,}, process.env.JWT_SECRET);
        res.status(200).send({
          user,
          token,
        });
      } else {
        return res.status(400).json({
          error: 'Wrong Password'
        })
      }
    })
  })
});

router.patch('/password', auth, function(req, res){
  console.log('❤️');
  if(!req.body.newPassword) return res.sendStatus(400);
  const newPass = req.body.newPassword;

  bcrypt.hash(newPass, 8, function(error, hashed){
    if(error) return res.send(400);

    User.findByIdAndUpdate(req.user._id, {password: hashed}, {
      new: true,
      runValidators: true,
    }).then(user=>{
      console.log(user);
      res.status(200).json({user,});
    }).catch(error=>{
      console.log(error);
      res.status(400).send({error: 'Invalid Password'});
    });

  });
});

module.exports = router;