import React, { useContext } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'
import { CiEdit } from "react-icons/ci";
export default function Account() {

    const {userData}=useContext(AuthContext)

  return (
    <div className='font-nunito'>
        <div className="text-[3vh] lg:text-[5vh] text-center h-full font-semibold ">
            Account Information
            <div className="w-[20vh] h-[20vh] mx-auto lg:mx-0 mt-4 flex">
                <img src="https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png" alt="" /> <div className="text-[3vh] cursor-pointer"><CiEdit></CiEdit></div>
            </div>
        </div>
        <div className="flex flex-col justify-start gap-10 mt-[5vh] p-4 ">
        <div className='border-b-2 border-gray-200 w-[90%] lg:w-[80%] '>
            <span className='font-bold'>Name:</span> {userData?.userName}
           
        </div>
        <div className="border-b-2 border-gray-200 w-[90%]  lg:w-[80%]">
            <span className='font-bold'>Email:</span> {userData?.email}
        </div>
        <div className={`border-b-2 border-gray-200 w-[90%] lg:w-[80%]  ${userData?.userType=='Restaurant Owner'?'block':'hidden'}`}>
            <span className='font-bold'>Business Name:</span> {userData?.businessName}
        </div>
        <div className={`border-b-2 border-gray-200 w-[90%] lg:w-[80%]  ${userData?.userType=='Restaurant Owner'?'block':'hidden'}`}>
            <span className='font-bold'>Business Location:</span> {userData?.location}
        </div>
        <div className={`border-b-2 border-gray-200 w-[90%] lg:w-[80%]  ${userData?.userType=='Restaurant Owner'?'block':'hidden'}`}>
            <span className='font-bold'>Full Address:</span> {userData?.businessAddress}
        </div>
        <div className={` w-[90%] lg:w-[80%] `}>
            <button className='btn bg-gray-500 text-white'>Edit Details</button>
        </div>
        </div>
       


    </div>
  )
}
