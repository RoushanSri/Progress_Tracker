import cloudinary from "../lib/cloudinary.js";
import Material from "../models/Material.model.js"

const addMaterial = async (req, res)=>{
    const {title, tag, base64Image, type}=req.body;
    try {
        if(!title ||!tag ||!base64Image ||!type){
            return res.status(400).json({msg: 'Please fill all the fields'});
        }
        const response = await cloudinary.uploader.upload(base64Image);

        const link = response.url;
        
        const material = await Material.create({title, tag, link, type, author: req.user._id});
        res.status(201).json({material});

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getMaterials = async (req, res) => {
    try {
        const materials = await Material.find({author: req.user._id}).populate('author');
        res.json(materials);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export { addMaterial, getMaterials}