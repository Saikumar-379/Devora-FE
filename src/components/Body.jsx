import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { BASEURL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Body = () => {

    const user = useSelector(store => store.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        if (user) return;
        try {
            const userData = await axios.get(BASEURL + '/api/profile', { withCredentials: true });
            dispatch(addUser(userData.data.data));

        } catch (error) {

            if (error.response.status === 401) {
                dispatch(addUser(null));
                navigate('/login');
            }

            console.log(`Error fetching user data: ${error}`); ``
        }

    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow bg-base-300">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Body
