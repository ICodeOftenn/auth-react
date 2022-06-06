const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/auth').then(()=>{
  console.log('DATABASE CONNECTED');
});

console.log('aljdaksljdasd');

const user = new User({
  name: 'Gand',
  email: 'dasddadh@x.com',
  password: 'abcabc',
});

// user.save().then((user)=>{
//  console.log(user);
// }).catch(err=>console.log(err));