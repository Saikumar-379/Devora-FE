import React, { useState } from 'react'
import loginImage from '../assets/devora.png'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

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
                        <input type="email" placeholder="Enter your email" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="input input-bordered w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1 text-lg"
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>

                    <div className="form-control mt-6 flex justify-center">
                        <button className="btn btn-primary">Sumbit</button>
                    </div>

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
