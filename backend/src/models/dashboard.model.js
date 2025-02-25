import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    past5:{
        type: Array,
        default:[0,0,0,0,0]
    },
    leetcode:{
        url:{
            type: String,
            default:""
        },
        username:{
            type: String,
            default:""
        },
        solvedProblems:{
            type: Number,
            default:-1
        },
        easy:{
            type: Number,
            default:0
        },
        medium:{
            type: Number,
            default:0
        },
        hard:{
            type: Number,
            default:0
        },
        calendar:{
            type: Object,
            default:{}
        }
    },
    geeksForGeeks:{
        url:{
            type: String,
            default:""
        },
        solvedProblems:{
            type: Number,
            default:0
        },
        calendar:{
            type: Object,
            default:{}
        }
    },
    rank:{
        type: Number,
        default:0
    },
    skills:{
        type: Array,
        default:[]
    },
    github:{
        url:{
            type: String,
            default:""
        },
        contributions:{
            type: Number,
            default:0
        }
    },
    languageForDsa:{
        type: String,
        default:""
    },
    projects:{
        type: Array,
        default:[]
    }
})

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

export default Dashboard;