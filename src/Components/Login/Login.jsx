import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../ContextApi/ContextApi'
import { signInWithEmailAndPassword } from 'firebase/auth/cordova'

export default function Login() {

    const [error,setError]=useState(null)
    const {auth}=useContext(AuthContext) || {}
    const navigate=useNavigate()
    const handleLogin = (event) => {

        event.preventDefault()
        const form=event.target
        const email=form.email.value
        const password=form.password.value


        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
                alert('loging successful')
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <div>

            <div className="hero bg-base-200 min-h-[80vh] font-nunito">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            To Unlock New Amazing Experiences You Are Just One Step Away
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <label className="label">
                                    <Link to='/register'><p className="label-text-alt link link-hover text-blue-400">Don't have an account? Register Now</p></Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}
