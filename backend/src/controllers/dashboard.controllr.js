import cloudinary from "../lib/cloudinary.js";
import Dashboard from "../models/dashboard.model.js";
import axios from 'axios'
import Project from "../models/projects.model.js";

const createDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ user: req.user._id });
    if (dashboard)
      return res.status(400).json({ msg: "Dashboard already exists" });

    const newDashboard = Dashboard.create({
      user: req.user._id,
    });
    res.status(200).json({ msg: "Dashboard created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ user: req.user._id }).populate(
      "user projects"
    );
    
    if (!dashboard) return res.status(404).json({ msg: "Dashboard not found" });

    const data={
      dsaLanguage:dashboard.languageForDsa,
      rank:dashboard.rank===0?"N/A":dashboard.rank,
      skills:dashboard.skills,
      projects:dashboard.projects,
      past5:dashboard.past5,
      leetcode:{
        url:dashboard.leetcode.url,
        solvedProblems:dashboard.leetcode.solvedProblems,
        easy:dashboard.leetcode.easy,
        medium:dashboard.leetcode.medium,
        hard:dashboard.leetcode.hard,
        calendar:dashboard.leetcode.calendar,
        username:dashboard.leetcode.username
      },
      github:{
        url:dashboard.github.url,
        contributions:dashboard.github.contributions,
        prs:dashboard.github.prs,
        repos:dashboard.github.repos,
        username:dashboard.github.username
      },
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getTargetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const dashboard = await Dashboard.findOne({ user: id }).populate("user");
    if (!dashboard) return res.status(404).json({ msg: "User not found" });
    const data={
      avatar: dashboard.user.avatar,
      name: dashboard.user.username,
      email: dashboard.user.email,
      dsaLanguage:dashboard.languageForDsa,
      rank:dashboard.rank===0?"N/A":dashboard.rank,
      skills:dashboard.skills,
      projects:dashboard.projects,
      past5:dashboard.past5,
      leetcode:{
        url:dashboard.leetcode.url,
        solvedProblems:dashboard.leetcode.solvedProblems,
        easy:dashboard.leetcode.easy,
        medium:dashboard.leetcode.medium,
        hard:dashboard.leetcode.hard,
        calendar:dashboard.leetcode.calendar,
        username:dashboard.leetcode.username
      },
      github:{
        url:dashboard.github.url,
        contributions:dashboard.github.contributions,
        prs:dashboard.github.prs,
        repos:dashboard.github.repos,
        username:dashboard.github.username
      }
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

const addSkill = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOneAndUpdate({ user: req.user._id },{
      $push: { skills: req.body.skill }
    },
    { new: true });
    
    if (!dashboard) return res.status(404).json({ msg: "Dashboard not found" });

    res.status(200).json(dashboard);
    } catch (err) {
    res.status(500).json({ msg: "Server error" });
    }
};

const editLanguage = async (req, res) => {
  const { language } = req.body;
  try {
    const dashboard = await Dashboard.findOneAndUpdate({ user: req.user._id },{
      languageForDsa: language,
    },{
      new: true
    });
    res.status(200).json(dashboard);
}catch(err){
  res.status(500).json({ msg: "Server error" });
}
}

const getLeetcode = async (req, res) => {
  const {leetcodeUsername}=req.body;
  try {
    const leetcode = await axios.get(`https://leetcode.com/graphql?query=query%20{%20matchedUser(username:%22${leetcodeUsername}%22)%20{%20submissionCalendar%20submitStats%20{%20acSubmissionNum%20{%20count%20}%20}%20}%20}`)
    res.status(200).json(leetcode.data);
  } catch (error) {
    console.log(error);
    
  }
}
const getPastFiveDays= ()=> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pastFiveDays = [];

  for (let i = 4; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);   
    const utcTimestamp = Date.UTC(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate());
    pastFiveDays.push( utcTimestamp/1000);
  }    
  return pastFiveDays;
}  

const check=async (matchDate, dbHistory)=> {      
  const dbObject=JSON.parse(dbHistory);      
  const set = new Set(Object.keys(dbObject).map(Number));
  const finalDate = [0,0,0,0,0]
  for(let i=4; i>=0; i--) {
      if(set.has(matchDate[i])) {             
        finalDate[i]=1                  
      }}      
  return finalDate;
}

const updateLeetcode = async (req, res) => {
  const {data, leetcodeUsername} = req.body;
  
  try {   
    const pastFiveDays=getPastFiveDays();
    const record=await check(pastFiveDays, data.submissionCalendar);
    
    const dashboard = await Dashboard.findOneAndUpdate({ user: req.user._id },{
      past5: record,
      leetcode: {
        url: "https://leetcode.com/u/"+leetcodeUsername,
        solvedProblems: data.submitStats.acSubmissionNum[0].count,
        easy: data.submitStats.acSubmissionNum[1].count,
        medium: data.submitStats.acSubmissionNum[2].count,
        hard: data.submitStats.acSubmissionNum[3].count,
        calendar: data.submissionCalendar,
        username: leetcodeUsername
      }
    },
  { new: true });
  
    if (!dashboard) return res.status(404).json({ msg: "Dashboard not found" });
  
    res.status(200).json(dashboard);

}catch (err) {
  res.status(500).json({ msg: "Server error" });
}
}

const refreshAll = async (req, res) => {
  try {
    const dashData= await Dashboard.find({});
              await Promise.all(dashData.map(async (entry) => {
              if (entry.leetcode.url != "") {                  
                const leetcode = await axios.get(
                `https://leetcode.com/graphql?query=query%20{%20matchedUser(username:%22${entry.leetcode.username}%22)%20{%20submissionCalendar%20submitStats%20{%20acSubmissionNum%20{%20count%20}%20}%20}%20}`
                );

                  const matchedUser = await leetcode.data.data.matchedUser;
                  if(!matchedUser) return;
                  entry.past5 = await check(getPastFiveDays(), matchedUser.submissionCalendar);                  
                  entry.leetcode.solvedProblems = matchedUser.submitStats.acSubmissionNum[0].count;
                  entry.leetcode.easy = matchedUser.submitStats.acSubmissionNum[1].count;
                  entry.leetcode.medium = matchedUser.submitStats.acSubmissionNum[2].count;
                  entry.leetcode.hard = matchedUser.submitStats.acSubmissionNum[3].count;
                  entry.leetcode.calendar = matchedUser.submissionCalendar;
                  await entry.save();
              }
              if (entry.github.url != "") {
                const response = await axios.post(
                "https://api.github.com/graphql",
                {
                  query: `query {user(login: "${entry.username}") {contributionsCollection {contributionCalendar {totalContributions}}pullRequests {totalCount}repositories(privacy: PUBLIC) {totalCount}}}`,
                },
                {
                  headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                  },
                }
                );
                  const data = response.data.data.user;
                  if (!data) return;
                  entry.github.contributions = data.contributionsCollection.contributionCalendar.totalContributions;
                  entry.github.prs = data.pullRequests.totalCount;
                  entry.github.repos = data.repositories.totalCount;
                  await entry.save();
              }

            })
          )
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    message: "All LeetCode and Github entries refreshed successfully",
  });
}

const getAll= async (req, res) => {
  try {
    const collection= await Dashboard.find({}).populate('user');
    const ds = collection
      .filter(item => item.leetcode && item.leetcode.url !== "")
      .map(item => {
      return {
        user: item.user,
        name: item.user.username,
        avatar: item.user.avatar,
        score: item.leetcode.solvedProblems,
        language: item.languageForDsa,
        previous: item.past5
      };
      });
    ds.sort((a, b) => b.score - a.score);
    ds.map(async(item, key) => {
      await Dashboard.findOneAndUpdate({ user: item.user }, { rank: key + 1 });
    });
    res.status(200).json(ds);
  } catch (error) {
    console.log(error);
  }
}

const deleteSkill = async(req, res) => {
  try {
    const dashboard = await Dashboard.findOneAndUpdate({ user: req.user._id },{
      $pull: { skills: req.body.skill }
    },
    { new: true });
    
    if (!dashboard) return res.status(404).json({ msg: "Dashboard not found" });

    res.status(200).json(dashboard);
    } catch (err) {
    res.status(500).json({ msg: "Server error" });
    }
}

const addProject = async(req, res) => {
  const {base64Image, projectName, githubUrl, description, websiteUrl}=req.body;
  if(!githubUrl||!base64Image||!projectName||!description) return res.status(400).json({msg: 'Please fill all the fields'});
  try {
    const coverImage = await cloudinary.uploader.upload(base64Image);
    const project={
      coverImage: coverImage.url,
      projectName,
      githubUrl,
      description,
      websiteUrl
    }
    const newProject = await Project.create({
      ...project, 
    });

    if (!newProject) return res.status(500).json({ msg: "Failed to create project" });

    const dashboard = await Dashboard.findOneAndUpdate({ user: req.user._id }, {
      $push: { projects: newProject._id }
    }, { new: true });

    if (!dashboard) return res.status(404).json({ msg: "Dashboard not found" });
    res.status(200).json({ msg: "Project added successfully", project: newProject });
    } catch (err) {
    res.status(500).json({ msg: "Server error" });
    }
}

const removeProject = async(req, res)=>{
  const { projectId } = req.query;

  if (!projectId) {
    throw new Error("Project ID is required", 400);
  }

  const deletedProject = await Project.findByIdAndDelete(projectId);

   if (deletedProject.coverImage) {
          const publicId = deletedProject.coverImage.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
  }

  const dash = await Dashboard.findOne({ user: req.user._id }).populate("projects");

  if (!dash) {
    return res.status(404).json({ msg: "Dashboard not found" });
  }

  return res.status(200).json(dash.projects);
}

export { getDashboard, createDashboard, addSkill, editLanguage, getLeetcode, updateLeetcode, refreshAll, getAll, deleteSkill, getTargetUser,addProject, removeProject };
