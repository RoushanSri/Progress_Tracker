import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJwt =async(req, res, next)=>{

    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({msg: 'Token expired, authorization denied'});
        }        
        
        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({msg: 'User not found'});
        }        
        req.user = user;
        next();

    } catch(err){
        res.status(401).json({msg: 'Token is invalid'});
    }
}

export default verifyJwt;