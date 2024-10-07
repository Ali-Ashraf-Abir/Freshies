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



    const [navShow,setNavShow]=useState('hidden')
    const {user,auth,setUser,setUserData}=useContext(AuthContext)

    // handles the navbar for mobile
    const handleNavbar=()=>{

        if(navShow=='hidden'){
            setNavShow('block')
        }
        else{
            setNavShow('hidden')
        }
    }
    // handles the logout functionality

    const handleLogout=()=>{
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
                        <Link to='/'><li className='ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer'>Home</li></Link>
                        <li className='ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer'>Dishes</li>
                        <li className='ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer'>About</li>
                        <li className='ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer flex justify-center items-center gap-2'><CiShoppingCart></CiShoppingCart> Cart</li>
                        <Link to='/profile/dashboard'><li className={`ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer ${user?'block':'hidden'}`}><span className='flex justify-center items-center gap-2'><CgProfile></CgProfile> Profile</span></li></Link>
                        <Link to='/login'><li className={`ml-[2vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer ${user?'hidden':'block'}`}>Login</li></Link>
                        <li onClick={handleLogout} className={`ml-[2vw] py-2 px-4 rounded-lg cursor-pointer btn bg-yellow-400 ${user?'':'hidden'}`}>Logout</li>
                        
                    </ul>
                </div>


                <div className="dropdown menu lg:hidden text-[2vh]">
                    <BiMenu onClick={handleNavbar}></BiMenu>


                </div>

            </div>
            {/* code for the mobile navbar */}
            <div className={`text-[5vw] ${navShow} block lg:hidden p-4 border-b-4`}>
                    <ul className='flex justify-around font-nunito items-center'>
                        <Link to='/'><li className='ml-[2vw]'><IoIosHome></IoIosHome></li></Link>
                        <li className='ml-[2vw]'><MdFastfood /></li>
                        <li className='ml-[2vw] flex justify-center items-center gap-2'><CiShoppingCart></CiShoppingCart></li>
                        <Link to='/profile/dashboard'><li className={`ml-[2vw] flex justify-center items-center gap-2 ${user?'block':'hidden'}`}><CgProfile></CgProfile></li></Link>
                        <Link to='/login'><li className={`ml-[2vw]  ${user?'hidden':'block'}`}>Login</li></Link>
                        <li onClick={handleLogout} className={`ml-[3vw] hover:bg-gray-200 py-2 px-4 rounded-lg cursor-pointer btn btn-ghost text-[1.2vh] lg:text-[1.5vh] ${user?'':'hidden'}`}>Logout <FiLogOut></FiLogOut></li>
                    </ul>
                    </div>
        </div>
    )
}
