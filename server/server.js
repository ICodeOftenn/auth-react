const express = require('express');
const authRouter = require('./routers/auth-router');
require('./database/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res, next)=>{
  console.log('GET request');
  res.set('Content-Type', 'text/plain');
  res.send('hello');
});

app.get('/sex', (req, res)=>{
  res.send('BRAH');
})

app.use(authRouter);

app.get('*', (_, res)=>{
  res.send('Not Found');
})

app.listen(8000, ()=>{
  console.log('Serfer is ready on port 8000');
});