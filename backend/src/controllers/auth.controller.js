import User from "../models/user.model.js";

const signUp=async(req, res)=>{
    const {username, email, password} = req.body;

    try {
        if(!username || !email || !password){
            return res.status(400).json({msg: 'Please enter all fields'});
        }
    
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(400).json({msg: 'User already exists'});
        }
    
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

export {signUp, logIn, logOut, getUserProfile};