const { request } = require('express');
const User =require('../models/users');

// get API Read All
exports.getUsers = async(req, res)=>{
    try{
        const result = await User.find({})
        // console.log(result);
        if(result){
            res.status(200).json({result})
        }else{
            res.status(400).json({msg:'Records Not Found'})
        }
    }catch(e){
        console.log(e);
        res.status(500).json({msg:'Internal Server Error'})
    }
}

// post API CREATE
exports.postUser = async(req, res)=>{
    try{
        const {firstName, lastName, email, contact, gender, skill} = req.body;
        const newForm = new User({
            firstName,
            lastName, 
            email,
            contact, 
            gender, 
            skill
        })

        await newForm.save();
        console.log(req.body);
        res.status(201).json({msg:"New User Registered Successfully!"})
    }catch(e){
        console.log(e);
        res.status(500).json({msg:'Internal Server Error'})
    }
}

// put API UPDATE
exports.updateUser = async (req, res) => {
    try {
        const { id, firstName, lastName, email, contact, gender, skill, age } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    contact,
                    age,
                    gender,
                    skill
                }
            },
            { new: true }
        );

        res.status(200).json({ msg: "User Updated Successfully!", User: updatedUser });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


// Delete API Delete User
// Delete API - Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "User Deleted Successfully!", user: deletedUser });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
