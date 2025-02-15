import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';
import { FiLoader } from'react-icons/fi';

const UserProtector = ({children}) => {

    const navigate = useNavigate();

    const {user, setUser, data, setData} = useContext(userContext);

    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('token');
    
    if(!token) {
        useEffect(() =>
        navigate('/login')
    )
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/auth/profile',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setUser(res.data);
            setIsLoading(false);
        }).catch(() => {
            localStorage.removeItem('token');
            navigate('/login');
        })

        axios.get("http://localhost:8080/api/dashboard/getDashboard",{
            headers: {
                'Authorization': `Bearer ${token}`
            }}).then((res) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            })
},[token])

    if(isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-950">
                <FiLoader size={40} color='white' className='animate-spin'/>
            </div>
        )
    }else{
    return (
        <>
            {children}
        </>
    )}
}

export default UserProtector
