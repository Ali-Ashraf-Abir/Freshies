import React, { useContext, useState } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'
import { Link, Outlet } from 'react-router-dom'

export default function Profile() {

    const { userData } = useContext(AuthContext)
    const [currentActive, setActive] = useState('dashboard')

    const handleActive = (active) => {
        setActive(active)
    }

    return (
        <div>
            <div className="flex flex-col gap-4 items-start justify-center lg:grid grid-cols-4 font-nunito">
                <div className="">
                    <div className="drawer hidden lg:block lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button hidden lg:hidden">
                                Open drawer
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-[16vw] p-4 text-[1.8vh] flex flex-col items-end jutify-end gap-20">
                                {/* Sidebar content here */}
                                <div className="text-[2.5vh] border-b-2 border-gray-400 w-[100%] text-center py-5">
                                    {userData?.userName}
                                </div>
                                <Link to='/profile/dashboard'> <span onClick={() => handleActive('dashboard')} className={`h-full font-semibold p-2 ${currentActive == 'dashboard' ? 'text-yellow-400 underline' : ''}`}>Dashboard</span></Link>
                        <Link to='/profile/security'><span onClick={() => handleActive('security')} className={` h-full font-semibold p-2 ${currentActive == 'security' ? 'text-yellow-400 underline' : ''}`}>Security</span></Link>
                        <Link to='/profile/account'><span onClick={() => handleActive('account')} className={`h-full font-semibold p-2 ${currentActive == 'account' ? 'text-yellow-400 underline' : ''}`}>Account</span></Link>
                        <Link to='/profile/orders'><span onClick={() => handleActive('business')} className={` h-full font-semibold p-2 ${currentActive == 'business' ? 'text-yellow-400 underline' : ''} ${userData?.userType=='Customer'?'block':'hidden'}`}>My Orders</span></Link>
                        <Link to='/profile/myitems'><span onClick={() => handleActive('myitems')} className={` h-full font-semibold p-2 ${currentActive == 'myitems' ? 'text-yellow-400 underline' : ''} ${userData?.userType=='Restaurant Owner'?'block':'hidden'}`}>My Items</span></Link>
                        <Link to='/profile/business'><span onClick={() => handleActive('business')} className={` h-full font-semibold p-2 ${currentActive == 'business' ? 'text-yellow-400 underline' : ''} ${userData?.userType=='Restaurant Owner'?'block':'hidden'}`}>Business</span></Link>

                            </ul>
                        </div>
                    </div>
                    {/* navigation menu profile for mobile */}
                    <div className={`grid ${userData?.userType=='business'?'grid-cols-5':'grid-cols-4'} text-[1.5vh] border-b-2 border-gray-200 text-center py-4 lg:hidden items-center justify-center w-full`}>
                       <Link to='/profile/dashboard'> <span onClick={() => handleActive('dashboard')} className={`border-r-2 border-gray-200 h-full font-semibold p-2 ${currentActive == 'dashboard' ? 'text-yellow-400 underline' : ''}`}>Dashboard</span></Link>
                        <Link to='/profile/security'><span onClick={() => handleActive('security')} className={`border-r-2 border-gray-200 h-full font-semibold p-2 ${currentActive == 'security' ? 'text-yellow-400 underline' : ''}`}>Security</span></Link>
                        <Link to='/profile/account'><span onClick={() => handleActive('account')} className={`border-r-2 border-gray-200 h-full font-semibold p-2 ${currentActive == 'account' ? 'text-yellow-400 underline' : ''}`}>Account</span></Link>
                        <Link to='/profile/orders'><span onClick={() => handleActive('business')} className={` h-full font-semibold p-2 ${currentActive == 'business' ? 'text-yellow-400 underline' : ''} ${userData?.userType=='Customer'?'block':'hidden'}`}>My Orders</span></Link>
                        <Link to='/profile/myitems'><span onClick={() => handleActive('myitems')} className={`border-r-2 border-gray-200 h-full font-semibold p-2 ${currentActive == 'myitems' ? 'text-yellow-400 underline' : ''} ${userData?.userType=='Restaurant Owner'?'block':'hidden'}`}>My Items</span></Link>
                        <Link to='/profile/business'><span onClick={() => handleActive('business')} className={` h-full font-semibold p-2 ${currentActive == 'business' ? 'text-yellow-400 underline' : ''} ${userData?.userType=='Restaurant Owner'?'block':'hidden'}`}>Business</span></Link>
                    
                    </div>
                </div>



                <div className="col-span-3 items-center h-full">
                    <Outlet></Outlet>
                </div>

            </div>


        </div>
    )
}
