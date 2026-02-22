import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { BASEURL } from '../utils/constants'

const Navbar = () => {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LogoutUser = async () => {

        try {
            await axios.post(BASEURL + '/api/logout', {}, { withCredentials: true });
            dispatch(addUser(null));
            navigate('/login');

        } catch (error) {
            console.error('Error logging out:', error);

        }

    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Devora</Link>
            </div>
            {user && <div className="flex gap-2">
                <div className="form-control flex items-center">Welcome, {user.firstName}</div>
                <div className="dropdown dropdown-end mx-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user avatar"
                                src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={LogoutUser}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default Navbar
