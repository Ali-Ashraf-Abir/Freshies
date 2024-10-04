import React, { useContext, useState } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova'
import Swal from 'sweetalert2'

export default function Register() {

    const { user, auth } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const [passError, setPassError] = useState(null)
    const [registrationType, setRegistrationType] = useState('Customer')
    const [businessLocation, setBusinessLocation] = useState('Dhaka')

    // checking the password length
    const checkPassLength = (password) => {
        if (password.length < 8) {
            setPassError('Password must be atleast 8 character')
        }
        else {
            setPassError(null)
        }
    }

    //handle the firebase api for new use registration for customer

    const handleSignInCustomer = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value.toLowerCase()
        const password = form.password.value
        const userName = form.userName.value

        const userData = {
            email, password, userName
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setError(null)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError('Email is already registered!')
                console.log(errorMessage)
            });

    }


    const handleSignInBusiness = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value.toLowerCase()
        const password = form.password.value
        const userName = form.userName.value
        const businessName = form.businessName.value
        const location = businessLocation
        const businessAddress = form.businessAddress.value
        const userType = registrationType
        const userData = {
            email, password, userName, businessAddress, location, businessName, userType
        }

        console.log(userData)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setError(null)
                // ...

                fetch('http://localhost:5000/owners', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userData),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })

                // alert sweet

                let timerInterval;
                Swal.fire({
                    title: "Successful!",
                    html: "Registration Successful.",
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError('Email is already registered!')
                console.log(errorMessage)
            });

    }

    // handling the dropdown for registration kind
    const handleRegistrationType = (userType) => {

        setRegistrationType(userType)
    }


    const handleBusinessLocation = (businessLocation) => {

        setBusinessLocation(businessLocation)
        console.log(businessLocation)

    }
    return (
        <div className="flex flex-col justify-center items-center min-h-[80vh] font-nunito mt-0 lg:mt-4">

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className=" p-4 flex flex-col justify-center items-center">
                    <label className='label'>
                        <span className='label-text text-[1.5vh] lg:text-[2vh]'>You are opening the account as a</span>
                    </label>
                    <select onChange={(e) => handleRegistrationType(e.target.value)} className='dropdown border-2 border-black text-[1.5vh] lg:text-[1.2vh]'><option>Customer</option>
                        <option>Restaurant Owner</option>
                    </select>
                </div>
                {/* registration form for customer */}
                <form onSubmit={handleSignInCustomer} className={`card-body ${registrationType == 'Customer' ? 'block' : 'hidden'}`} >
                    <div className="text-[3vh]">Register Now!</div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input name="userName" type="text" placeholder="Full Name" className="input input-bordered" required />
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input onKeyDown={(e) => checkPassLength(e.target.value)} name='password' type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <span className="label-text text-red-400">{error ? error : ''}</span>
                        </label>
                        <label className="label">
                            <span className="label-text text-red-400">{passError ? passError : ''}</span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className={`btn btn-primary ${passError ? 'disabled bg-gray-600' : ''}`}>Register</button>
                    </div>
                </form>

                {/* registration form for restaurant owner */}
                <form onSubmit={handleSignInBusiness} className={`card-body ${registrationType == 'Restaurant Owner' ? 'block' : 'hidden'}`} >
                    <div className="text-[3vh]">Register Now!</div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input name="userName" type="text" placeholder="Full Name" className="input input-bordered" required />

                        <label className="label">
                            <span className="label-text">Business Name</span>
                        </label>
                        <input name="businessName" type="text" placeholder="Business Name" className="input input-bordered" required />

                        <label className="label">
                            <span className="label-text">Business Location</span>
                        </label>
                        <select onChange={(e) => handleBusinessLocation(e.target.value)} className='dropdown border-2 border-gray-200 rounded-lg text-[1.5vh] lg:text-[1.6vh] p-4'><option>Dhaka</option>
                            <option>Chittagong</option>
                            <option>Cumilla</option>
                            <option>Sylhet</option>
                            <option>Rajshahi</option>
                            <option>Rangpur</option>

                        </select>
                        <label className="label">
                            <span className="label-text">Business Address</span>
                        </label>
                        <textarea name='businessAddress' className=' rounded-lg p-5 border-gray-200 border-2' placeholder='full address'></textarea>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input onKeyDown={(e) => checkPassLength(e.target.value)} name='password' type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <span className="label-text text-red-400">{error ? error : ''}</span>
                        </label>
                        <label className="label">
                            <span className="label-text text-red-400">{passError ? passError : ''}</span>
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button className={`btn btn-primary ${passError ? 'disabled bg-gray-600' : ''}`}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
