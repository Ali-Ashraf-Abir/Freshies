import React, { useContext, useState } from 'react'
import { BiMenu } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { AuthContext } from '../ContextApi/ContextApi';
import { signOut } from 'firebase/auth/cordova';
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosHome } from "react-icons/io";
import { MdFastfood } from "react-icons/md";
export default function Navigation() {


    const [active, setActive] = useState('home')
    const [navShow, setNavShow] = useState('hidden')
    const { user, auth, setUser, setUserData,itemsAdded } = useContext(AuthContext)
    const activeCss = 'underline font-bold text-blue-400 pointer'
    // handles active navbar
    const handleActive = (current) => {

        setActive(current)


    }
    // handles the navbar for mobile
    const handleNavbar = () => {

        if (navShow == 'hidden') {
            setNavShow('block')
        }
        else {
            setNavShow('hidden')
        }
    }
    // handles the logout functionality

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser(null)
            setUserData(null)
            alert('logged out')

        }).catch((error) => {
            // An error happened.
        });
    }

    return (

        <div className="Navigation">

            {/* main navigation */}
            <div className="navigation-items flex justify-between text-[2vh] items-center w-full px-[10vw] py-5  shadow border-b-2">

                <div className="text-[3vh] font-playWrite">Freshies</div>

                <div className="hidden lg:block">
                    <ul className='flex justify-end font-nunito'>
                        <Link to='/'><li onClick={() => handleActive('home')} className={`ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer ${active=='home'?activeCss:''}`}>Home</li></Link>
                        <li onClick={() => handleActive('dishes')} className={`ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer ${active=='dishes'?activeCss:''}`}>Dishes</li>
                        <li onClick={() => handleActive('about')} className={`ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer ${active=='about'?activeCss:''}`}>About</li>
                        <Link to='/cart'>  <li onClick={() => handleActive('cart')} className={`ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer flex justify-center items-center gap-2 ${active=='cart'?activeCss:''}`}><CiShoppingCart></CiShoppingCart> Cart {itemsAdded?<sup><div className="badge badge-primary bg-green-400 badge-xs text-black font-bold font-nunito">1</div></sup>:''}</li></Link>
                        <Link onClick={() => handleActive('profile')} to='/profile/dashboard'><li className={`ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer ${user ? 'block' : 'hidden'} ${active=='profile'?activeCss:''}`}><span className='flex justify-center items-center gap-2'><CgProfile></CgProfile> Profile</span></li></Link>
                        <Link to='/login'><li className={`ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer ${user ? 'hidden' : 'block'}`}>Login</li></Link>
                        <li onClick={handleLogout} className={`ml-[2vw] py-2 px-4 rounded-lg cursor-pointer btn bg-green-400 ${user ? '' : 'hidden'}`}>Logout</li>

                    </ul>
                </div>


                <div className="dropdown menu lg:hidden text-[2vh]">
                    <BiMenu onClick={handleNavbar}></BiMenu>


                </div>

            </div>
            {/* code for the mobile navbar */}
            <div className={`text-[5vw] ${navShow} block lg:hidden p-4 border-b-4`}>
                <ul className='flex justify-around font-nunito items-center'>
                    <Link to='/'><li onClick={() => handleActive('home')} className={`ml-[2vw] ${active=='home'?activeCss:''}`}><IoIosHome></IoIosHome></li></Link>
                    <li onClick={() => handleActive('dishes')} className={`ml-[2vw] ${active=='dishes'?activeCss:''}`}><MdFastfood /></li>
                    <Link to='/cart'><li onClick={() => handleActive('cart')} className={`ml-[2vw] flex justify-center items-center gap-2 ${active=='cart'?activeCss:''}`}><CiShoppingCart></CiShoppingCart> {itemsAdded?<sup><div className="badge badge-primary bg-green-400 badge-xs text-black font-bold font-nunito">1</div></sup>:''}</li></Link>
                    <Link onClick={() => handleActive('profile')} to='/profile/dashboard'><li className={`ml-[2vw] flex justify-center items-center gap-2 ${user ? 'block' : 'hidden'} ${active=='profile'?activeCss:''}`}><CgProfile></CgProfile></li></Link>
                    <Link to='/login'><li className={`ml-[2vw]  ${user ? 'hidden' : 'block'}`}>Login</li></Link>
                    <li onClick={handleLogout} className={`ml-[3vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer btn btn-ghost text-[1.2vh] lg:text-[1.5vh] border-2 border-gray-200 ${user ? '' : 'hidden'} text-green-400`}>Logout <FiLogOut></FiLogOut></li>
                </ul>
            </div>
        </div>
    )
}
