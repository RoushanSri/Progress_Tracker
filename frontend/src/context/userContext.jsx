import { createContext, useState } from 'react';

export const userContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        avtar:'',
    });
    const [data, setData]=useState({
        dsaLanguage:'',
        rank: '',
        skills: [],
        projects: [
            {
                base64Image:'',
                projectName:'',
                githubUrl:'',
                description:'',
                websiteUrl:''
            }
        ],
        past5: [0,0,0,0,0],
        leetcode:{
            url: '',
            solvedProblems: '',
            easy:'',
            medium:'',
            hard:'',
            calendar: '',
            username: ''
        },
        github:{
            url: '',
            contributions: 0,
            prs: 0,
            repos: 0,
            username: ''
        },
    });

    return (
        <userContext.Provider value={{user, setUser, data, setData}}>
            {children}
        </userContext.Provider>
        )
        
}

export default UserContextProvider;