import axios from "axios";
import Dashboard from "../models/dashboard.model.js";

const githubStats = async(req, res)=>{
    const {username} = req.body;

    try {
        const response = await axios.post("https://api.github.com/graphql",{
            query: `query {user(login: "${username}") {contributionsCollection {contributionCalendar {totalContributions}}pullRequests {totalCount}repositories(privacy: PUBLIC) {totalCount}}}`
        },{
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
        })        
        
        const totalContributions = response.data.data.user.contributionsCollection.contributionCalendar.totalContributions;
        const totalPullRequests = response.data.data.user.pullRequests.totalCount;
        const totalRepositories = response.data.data.user.repositories.totalCount;

        res.status(200).json({ totalContributions, totalPullRequests, totalRepositories });
    }
    catch (error) { 
        res.status(500).json({ msg: "Server error" });
    }
}

const updateGithub = async(req, res) => {
    const {data, username} = req.body;
    const {totalContributions, totalPullRequests, totalRepositories} = data;
    try {
        const user = await Dashboard.findOneAndUpdate({user:req.user._id},
            {
                github:{
                    url:`https://github.com/${username}`,
                    contributions:totalContributions,
                    prs:totalPullRequests,
                    repos:totalRepositories,
                    username
                }
            },{
                new:true
            }
        )

        if(!user) 
            return res.status(404).json({msg:"User not found"});
        
        res.status(200).json({msg:"Github updated successfully", user});


    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

export { githubStats, updateGithub};