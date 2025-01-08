const mongoose = require('mongoose');
const User = require('../models/Users.js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
exports.signup = async (req, res) => {
    try {
        const { firstName, 
                lastName, 
                email, 
                password, 
                rating,
                lc_username,
                cf_username } = req.body;

        if(!firstName || !lastName || !email || !password || !rating || !lc_username || !cf_username){
            return res.status(400).json(
                { message: "Please fill in all fields" }
            );
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            rating,
            lc_username,
            cf_username
        });

        return res.status(200).json({
            success: true,
            message: 'User registered successfully'
        });
    } catch(err){
        return res.status(500).json({
            success: true,
            message: "Something went wrong"
        })
    }
}

exports.login = async(req, res)=>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please Fill up All the Required Fields'
            })
        } 
        
        const user = await User.findOne({ email });
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User doesn\'t exist.'
            })
        }

        if(await bcrypt.compare(user.password, password)){
            const token = jwt.sign(
                {email: user.email, id: user._id},
                process.env.SECRET_KEY,
                {
                    expiresIn: "24h"
                }
            );

            user.token = token;
            user.password = undefined;

            return res.status(200).json({
                success: true,
                user,
                message: "User login success"
            });
        }
        return res.status(400).json({
            success: false,
            message: "Wrong password"
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}