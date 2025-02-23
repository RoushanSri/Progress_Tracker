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
        projects: [],
        past5: [0,0,0,0,0],
        leetcode:{
            url: '',
            solvedProblems: '',
            calendar: '',
            username: ''
        }
    });

    return (
        <userContext.Provider value={{user, setUser, data, setData}}>
            {children}
        </userContext.Provider>
        )
        
}

export default UserContextProvider;