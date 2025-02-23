const checkInstagram =async (req, res)=>{
    const {username} = req.body;

    try {
        const response = await fetch(`https://www.instagram.com/${username}`);
        res.status(200).json({ msg: "User found" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

const checkFacebook = async (req, res)=>{
    const {username} = req.body;
     try {
        const response = await fetch(`https://www.facebook.com/${username}`);
        res.status(200).json({ msg: "User found" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

const checkTwitter = async (req, res)=>{
    const {username} = req.body;
    try {
        const response = await fetch(`https://www.twitter.com/${username}`);
        res.status(200).json({ msg: "User found" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

const checkLinkedIn = async (req, res)=>{
    const {username} = req.body;
    try {
        const response = await fetch(`https://www.linkedin.com/in/${username}`);
        res.status(200).json({ msg: "User found" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

export {checkInstagram,checkFacebook,checkLinkedIn, checkTwitter}