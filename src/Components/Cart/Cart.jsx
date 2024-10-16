import React, { useCallback, useContext, useEffect } from 'react'
import { AuthContext } from '../ContextApi/ContextApi'

export default function Cart() {

    const { userData,setItemsAdded } = useContext(AuthContext)

    useEffect(()=>{
        setItemsAdded(false)
    },[])


    return (
        <div>
            <div className="w-full text-center font-nunito  text-[2.8vh] font-semibold">Your Orders</div>
            <div className="border-2 shadow max-w-[1024px] mx-auto p-4 font-nunito text-[1.4vh] lg:text-[1.8vh] flex min-h-[70vh] flex-col mt-6 mb-2">
                <div className='grid grid-cols-4 mb-4 mt-4 text-[1.8vh] lg:text-[2.2vh] border-b-2 border-gray-200 gap-4 items-center'>

                    <div className="">Name</div>
                    <div className="">Price</div>
                    <div className="">status</div>
 




                </div>
                {userData?.cart?.map(item => <div className='grid grid-cols-4 mb-4 mt-4 border-b-2 border-gray-200 gap-4 items-center pb-2 font-semibold'>

                    <div className="">{item.foodName} <sup className='font-bold'>{item.quantity}</sup> </div>
                    <div className="">{item.foodPrice} Taka</div>

                    <div className="badge badge-primary">secondary</div>
                    <div className="bg-yellow-400 text-center lg:w-[40%] py-4 rounded-lg">Details</div>




                </div>)}
            </div>
        </div>
    )
}
