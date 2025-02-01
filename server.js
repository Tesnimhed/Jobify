const express = require('express');
const app = express();

app.get('/', (req,res) => {  console.log(req);    });

app.listen('5000', () =>{console.log('Listening the port 5000')});