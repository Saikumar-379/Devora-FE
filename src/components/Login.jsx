import React, { useState } from 'react'
import loginImage from '../assets/devora.png'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASEURL } from '../utils/constants'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('test@gmail.com')
    const [password, setPassword] = useState('test@123')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateForm = () => {
        const newErrors = {}

        if (!email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required'
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long'
        }

        setErrors(newErrors)

        // Clear errors after 3 seconds
        if (Object.keys(newErrors).length > 0) {
            setTimeout(() => {
                setErrors({})
            }, 2000)
        }

        return Object.keys(newErrors).length === 0
    }

    // Handle successful login here
    const handleLogin = async () => {
        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        try {
            const loginData = {
                email,
                password
            };

            const loginRes = await axios.post(BASEURL + '/api/login', loginData, { withCredentials: true });
            console.log(loginRes.data);

            dispatch(addUser(loginRes.data.data))

            navigate('/')
        } catch (error) {
            console.error('Login failed:', error);
            setErrors({ general: error.response?.data?.message || error.message || 'Login failed. Please try again.' })

            // Clear general error after 3 seconds
            setTimeout(() => {
                setErrors(prev => ({ ...prev, general: undefined }))
            }, 2000)
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="flex items-start justify-center w-full py-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={loginImage}
                        alt="devora"
                        className='w-full h-48 object-cover' />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-center w-full">Login</h2>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Enter your email" className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1 text-lg"
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                        {errors.password && <span className="text-error text-sm mt-1">{errors.password}</span>}
                    </div>

                    <div className="form-control mt-6 flex justify-center">
                        <button className={`btn btn-primary ${isLoading ? 'loading' : ''}`} onClick={handleLogin} disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Submit'}
                        </button>
                    </div>

                    {errors.general && (
                        <div className="alert alert-error mt-4">
                            <span>{errors.general}</span>
                        </div>
                    )}

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Not registered? <a href="/signup" className="link link-primary font-semibold">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
