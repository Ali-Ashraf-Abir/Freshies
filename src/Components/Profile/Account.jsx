import React, { useContext } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'
import { CiEdit } from "react-icons/ci";
export default function Account() {

    const { userData,setAction } = useContext(AuthContext) || {}

    const handleEditProfileImage = (event) => {


        event.preventDefault()

        const form = event.target
        const image = form.image.value

        const body = {
            userData, image
        }


        fetch(`https://freshies-server-aliashrafabirs-projects.vercel.app/addimage`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(data => console.log(data))
        alert('image updated')
        setAction(true)
        form.reset()

    }
    console.log(userData)
    return (
        <div className='font-nunito'>
            <div className="text-[3vh] lg:text-[5vh] text-center h-full font-semibold ">
                Account Information
                <div className="w-[20vh] h-[20vh] mx-auto lg:mx-0 mt-4 flex">
                    <img className='rounded-lg ' src={userData?.image==null?"https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png":userData?.image} alt="" /> <div className="ml-2 text-[3vh] cursor-pointer">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={() => document.getElementById(userData?._id).showModal()}><CiEdit></CiEdit></button>
                        <dialog id={userData?._id} className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Update or add an image</h3>
                                <form onSubmit={handleEditProfileImage}>
                                    <p className="py-4"><input type='text' name='image' placeholder="insert image url" className='px-4 py-2 border-black border-2 rounded-lg'></input></p>
                                    <p className="py-4"><button  className='btn bg-yellow-400'>Update</button></p>
                                </form>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-start gap-10 mt-[5vh] p-4 ">
                <div className='border-b-2 border-gray-200 w-[90%] lg:w-[80%] '>
                    <span className='font-bold'>Name:</span> {userData?.userName}

                </div>
                <div className="border-b-2 border-gray-200 w-[90%]  lg:w-[80%]">
                    <span className='font-bold'>Email:</span> {userData?.email}
                </div>
                <div className={`border-b-2 border-gray-200 w-[90%] lg:w-[80%]  ${userData?.userType == 'Restaurant Owner' ? 'block' : 'hidden'}`}>
                    <span className='font-bold'>Business Name:</span> {userData?.businessName}
                </div>
                <div className={`border-b-2 border-gray-200 w-[90%] lg:w-[80%]  ${userData?.userType == 'Restaurant Owner' ? 'block' : 'hidden'}`}>
                    <span className='font-bold'>Business Location:</span> {userData?.location}
                </div>
                <div className={`border-b-2 border-gray-200 w-[90%] lg:w-[80%]  ${userData?.userType == 'Restaurant Owner' ? 'block' : 'hidden'}`}>
                    <span className='font-bold'>Full Address:</span> {userData?.businessAddress}
                </div>
                <div className={` w-[90%] lg:w-[80%] `}>
                    <button className='btn bg-gray-500 text-white'>Edit Details</button>
                </div>
            </div>



        </div>
    )
}
