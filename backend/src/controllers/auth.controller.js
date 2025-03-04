import User from "../models/user.model.js";
import cloudinary from '../lib/cloudinary.js';
import axios from 'axios';

const signUp=async(req, res)=>{
    const {username, email, password} = req.body;

    try {
        if(!username || !email || !password){
            return res.status(404).json({msg: 'Please enter all fields'});
        }
    
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(404).json({msg: 'User already exists'});
        }     
        // try {
        //     const response = await axios.get(
        //         `${process.env.ABSTRACT_API}${email}`
        //     );
            
        //     const { is_valid_format, deliverability } = response.data;
            
        //     if (!is_valid_format.value) {
        //         return res.status(400).json({ exists: false, message: "Invalid email format." });
        //     }
            
        //     if (deliverability === "UNDELIVERABLE") {
        //         return res.status(404).json({ exists: false, message: "Email does not exist or is unreachable." });
        //     }
        // } catch (error) {
        //     console.log(error);
        //     return res.status(500).json({ exists: false, message: "Email verification failed." });
            
        // }
        const user = await User.create({username, email, password});
    
        const token = await user.generateToken();
    
        res
        .status(201)
        .cookie('token', token)
        .json({user, token});
    
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
        
    }
}

const logIn = async(req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({msg: 'Please enter all fields'});
        }
    
        const user = await User.findOne({
            email
        });
        if(!user ||!(await user.matchPassword(password))){
            return res.status(400).json({msg: 'Invalid credentials'});
        }
        const token = await user.generateToken();

        res
        .status(200)
        .cookie('token', token)
        .json({user, token});
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
        
    }
}

const logOut = async(req, res)=>{

    res
    .clearCookie('token')
    .status(200)
    .json({msg: 'Logged out'});
}

const getUserProfile = async(req, res)=>{   
    res.status(200).json(req.user);
}

const updateAvatar = async(req, res)=>{
    const {avatar} = req.body;
    if(!avatar)
        return res.status(400).json({msg: 'Please upload an image'});
    
    try {
        const uploadResponse = await cloudinary.uploader.upload(avatar);
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {avatar: uploadResponse.url}, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

const updateUsername= async(req, res)=>{
    const {username} = req.body;
    if(!username)
        return res.status(400).json({msg: 'Please enter a username'});
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {username}, {new: true});
        res.status(200).json(updatedUser);
        
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

const updatePassword= async(req, res)=>{
    const {oldPassword, newPassword} = req.body;

    try {
        const user = await User.findById(req.user._id);
        
        if(!user||!(await user.matchPassword(oldPassword))){
            return res.status(400).json({msg: 'Invalid current password'});
        }
        
        user.password = newPassword;
        await user.save();
        res.status(200).json({msg: 'Password updated successfully'});
        
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

export {signUp, logIn, logOut, getUserProfile, updateAvatar, updateUsername, updatePassword};