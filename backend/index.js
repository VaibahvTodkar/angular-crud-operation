const express = require('express');
const app  = express();
require('dotenv').config()
const PORT = process.env.PORT;

require('./config/dbConnection')
app.get("/", (req,res)=>{
  res.send("API Working");
});


const users = require('./routes/users');

 app.use('/api',users);


app.listen(PORT, ()=>{
  console.log("Server Runing! on port ", PORT);
}); 