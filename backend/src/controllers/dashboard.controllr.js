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
    res.json(dashboard);
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
  const { editedLang } = req.body;
  try {
    const dashboard = await Dashboard.findOneAndUpdate({ user: req.user._id },{
      languageForDsa: editedLang,
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

const updateLeetcode = async (req, res) => {
  const {data, leetcodeUsername} = req.body;
  
  try {
    const dashboard = await Dashboard.findOneAndUpdate({ user: req.user._id },{
      leetcode: {
        url: "https://leetcode.com/u/"+leetcodeUsername,
        solvedProblems: data.submitStats.acSubmissionNum[0].count,
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

export { getDashboard, createDashboard, addSkill, editLanguage, getLeetcode, updateLeetcode };
