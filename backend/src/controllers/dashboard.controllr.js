import Dashboard from "../models/dashboard.model.js";
import axios from 'axios'

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
      "user"
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
      }
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

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
              dashData.forEach(async item => {
              if (item.leetcode.url != "") {                  
                  const data = await axios.post(
                      "http://localhost:8080/api/dashboard/leetcode",
                      { leetcodeUsername: item.leetcode.username }
                  );

                  const matchedUser = await data.data.data.matchedUser;
                  item.past5 = await check(getPastFiveDays(), matchedUser.submissionCalendar);                  
                  item.leetcode.solvedProblems = matchedUser.submitStats.acSubmissionNum[0].count;
                  item.leetcode.easy = matchedUser.submitStats.acSubmissionNum[1].count;
                  item.leetcode.medium = matchedUser.submitStats.acSubmissionNum[2].count;
                  item.leetcode.hard = matchedUser.submitStats.acSubmissionNum[3].count;
                  item.leetcode.calendar = matchedUser.submissionCalendar;
                  item.save();
              }})
  } catch (error) {
    console.log(error);
  }
  
}

const getAll= async (req, res) => {
  try {
    const collection= await Dashboard.find({}).populate('user');
    const ds=collection.map((item, key) => {
      
      return { name: item.user.username, score: item.leetcode.solvedProblems, language: item.languageForDsa, previous: item.past5 };
    })
    res.status(200).json(ds);
  } catch (error) {
    console.log(error);
  }
}

export { getDashboard, createDashboard, addSkill, editLanguage, getLeetcode, updateLeetcode, refreshAll, getAll};
