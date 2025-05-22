const express = require('express');
const router = express.Router();
// Import userController 
const userController= require('../controllers/usersController')

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// get API READ
router.get("/user",userController.getUsers); 

// post API CREATE
router.post("/user", jsonParser,userController.postUser); 

// Put API Update
router.put("/user", jsonParser,userController.updateUser); 


// Delete API delete
router.delete("/user/:id", jsonParser,userController.deleteUser); 



module.exports = router;
