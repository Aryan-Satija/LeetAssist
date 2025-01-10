const mongoose = require('mongoose');
const User = require('../models/Users.js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcrypt');
dotenv.config();
exports.signup = async (req, res) => {
    try {
        const { firstName, 
                lastName, 
                email, 
                password, 
                lc_username,
                cf_username } = req.body;

        if(!firstName || !lastName || !password || !lc_username || !cf_username){
            return res.status(400).json(
                { message: "Please fill in all fields" }
            );
        }
        try{
            let url = `https://codeforces.com/api/user.rating?handle=${cf_username}`
            await axios.get(url)
        } catch(err){
            console.log(err);
            return res.status(400).json(
                { message: "Invalid Codeforces username" }
            );
        }
          try{
            let url = "https://leetcode.com/graphql"
            const query = `
              query {
                userContestRanking(username: "${lc_username}") {
                  rating  
                }
              }
            `;
            const response = await axios.post(
              url,
              { query },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response.data);
            if(response.data?.errors){
                return res.status(400).json(
                    { message: "Invalid Leetcode username" }
                );
            }
        } catch(err){
            return res.status(400).json(
                { message: "Invalid Leetcode username" }
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
            lc_username,
            cf_username
        });

        return res.status(200).json({
            success: true,
            message: 'User registered successfully'
        });
    } catch(err){
        console.log(err);
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
        
        const tmp = await bcrypt.compare(password, user.password)
        
        console.log(tmp)
        
        if(tmp){
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