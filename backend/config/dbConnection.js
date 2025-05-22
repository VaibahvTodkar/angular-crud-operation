const mongoose = require('mongoose');
const connectdb = mongoose.connect(process.env.CON_STR)
  .then(() => console.log('Connected!'))

  .catch((e)=>{
    console.log("database not connected", e)
  })

module.exports = connectdb; 
