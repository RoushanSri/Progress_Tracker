import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    websiteUrl: {
        type: String
    },
    githubUrl:{
        type: String,
        required: true
    },
    coverImage:{
        type: String,
        required:true
    }
    },{
    timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;