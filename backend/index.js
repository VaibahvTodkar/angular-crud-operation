const express = require('express');
const app  = express();
require('dotenv').config()
const PORT = process.env.PORT;

const cors = require('cors');

require('./config/dbConnection')

app.use(cors({
  origin:'http://localhost:4200'
}))

app.get("/", (req,res)=>{
  res.send("API Working");
});


const users = require('./routes/users');

 app.use('/api',users);


app.listen(PORT, ()=>{
  console.log("Server Runing! on port ", PORT);
}); 